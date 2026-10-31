// Єдине налаштування для обох версій. Endpoint форми студента підключено.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrppypwd';
export const REVIEWS_URL = 'https://jsonplaceholder.typicode.com/posts/15/comments';
export const MODAL_DELAY = 60000;
export function timeTheme(date = new Date()) {
    const hour = date.getHours();
    return hour >= 7 && hour < 21 ? 'light' : 'dark';
}
export async function saveSystemInfo() {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        appVersion: navigator.appVersion,
        vendor: navigator.vendor,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency ?? 'Недоступно',
        deviceMemory: navigator.deviceMemory ?? 'Недоступно',
        maxTouchPoints: navigator.maxTouchPoints,
        screen: { width: screen.width, height: screen.height, colorDepth: screen.colorDepth },
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    if (navigator.userAgentData) {
        info.userAgentData = navigator.userAgentData.toJSON();
        try {
            info.details = await navigator.userAgentData.getHighEntropyValues(
                ['architecture', 'bitness', 'model', 'platformVersion', 'fullVersionList']);
        } catch { /* Браузер може обмежувати доступ до цих даних. */ }
    }
    localStorage.setItem('lab4.systemInfo', JSON.stringify(info));
    return readStorage();
}
export function readStorage() {
    return Object.keys(localStorage).sort().map(key => ({ key, value: localStorage.getItem(key) }));
}
export async function sendContact(form) {
    if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(FORMSPREE_ENDPOINT)) {
        throw new Error('Спочатку додайте endpoint Formspree у файлі config.js.');
    }
    const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Не вдалося надіслати повідомлення. Спробуйте пізніше.');
}
