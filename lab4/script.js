import { FORMSPREE_ENDPOINT, REVIEWS_URL, MODAL_DELAY, timeTheme, saveSystemInfo, readStorage, sendContact } from './config.js';
let automatic = true;
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('#theme-toggle').textContent = theme === 'dark' ? 'Світла тема' : 'Темна тема';
    document.querySelector('#theme-status').textContent = automatic ? 'Автоматично за часом' : 'Ручний режим';
}
applyTheme(timeTheme());
document.querySelector('#theme-toggle').addEventListener('click', () => {
    automatic = false;
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});
document.querySelector('#theme-auto').addEventListener('click', () => { automatic = true; applyTheme(timeTheme()); });
setInterval(() => { if (automatic) applyTheme(timeTheme()); }, 1000);
function renderStorage(entries) {
    const container = document.querySelector('#storage-info');
    container.replaceChildren();
    for (const {key, value} of entries) {
        const heading = document.createElement('h3'); heading.textContent = key;
        const pre = document.createElement('pre');
        try { pre.textContent = JSON.stringify(JSON.parse(value), null, 2); } catch { pre.textContent = value; }
        container.append(heading, pre);
    }
}
saveSystemInfo().then(renderStorage).catch(() => {
    document.querySelector('#storage-info').textContent = 'Браузер заборонив доступ до localStorage.';
});
window.addEventListener('storage', () => { try { renderStorage(readStorage()); } catch { /* Доступ обмежено. */ } });
async function loadReviews() {
    const status = document.querySelector('#reviews-status');
    const retry = document.querySelector('#reviews-retry');
    retry.hidden = true; status.textContent = 'Завантаження…';
    try {
        const response = await fetch(REVIEWS_URL, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const comments = await response.json();
        if (!Array.isArray(comments)) throw new Error('Некоректна відповідь');
        const cards = comments.map(comment => {
            const card = document.createElement('article'); card.className = 'review';
            const title = document.createElement('h3'); title.textContent = comment.name;
            const email = document.createElement('p'); email.className = 'review-email'; email.textContent = comment.email;
            const body = document.createElement('p'); body.textContent = comment.body;
            card.append(title, email, body); return card;
        });
        document.querySelector('#reviews-list').replaceChildren(...cards);
        status.textContent = comments.length ? `Отримано відгуків: ${comments.length}` : 'Відгуків поки немає.';
    } catch { status.textContent = 'Не вдалося отримати відгуки. Перевірте з’єднання.'; retry.hidden = false; }
}
document.querySelector('#reviews-retry').addEventListener('click', loadReviews);
loadReviews();
const dialog = document.querySelector('#contact-dialog');
function openContact() { if (!dialog.open) dialog.showModal(); }
const modalTimer = setTimeout(openContact, MODAL_DELAY);
document.querySelector('#contact-open').addEventListener('click', () => { clearTimeout(modalTimer); openContact(); });
document.querySelector('#contact-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const form = document.querySelector('#contact-form');
if (FORMSPREE_ENDPOINT) form.action = FORMSPREE_ENDPOINT;
form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true; status.textContent = 'Надсилання…';
    try { await sendContact(form); status.textContent = 'Повідомлення надіслано!'; form.reset(); }
    catch (error) { status.textContent = error.message; }
    finally { button.disabled = false; }
});
