import { useEffect, useRef, useState } from 'react';
import { FORMSPREE_ENDPOINT, MODAL_DELAY, sendContact } from '../config.js';
export default function ContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);
    const dialog = useRef(null);
    const timer = useRef(null);
    useEffect(() => {
        timer.current = setTimeout(() => setIsOpen(true), MODAL_DELAY);
        return () => clearTimeout(timer.current);
    }, []);
    useEffect(() => {
        if (isOpen && !dialog.current.open) dialog.current.showModal();
        if (!isOpen && dialog.current.open) dialog.current.close();
    }, [isOpen]);
    async function submit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        setSending(true); setStatus('Надсилання…');
        try { await sendContact(form); setStatus('Повідомлення надіслано!'); form.reset(); }
        catch (error) { setStatus(error.message); }
        finally { setSending(false); }
    }
    return <><button onClick={() => { clearTimeout(timer.current); setIsOpen(true); }}>Зв’язатися</button>
        <dialog ref={dialog} aria-labelledby="contact-title" onClose={() => setIsOpen(false)}>
            <button className="close" aria-label="Закрити" onClick={() => setIsOpen(false)}>×</button>
            <h2 id="contact-title">Зворотний зв’язок</h2><p>Залиш повідомлення для Остапа.</p>
            <form action={FORMSPREE_ENDPOINT || undefined} method="POST" onSubmit={submit}>
                <label>Ім’я<input name="name" autoComplete="name" required maxLength={100} /></label>
                <label>Email<input type="email" name="email" autoComplete="email" required /></label>
                <label>Номер телефону<input type="tel" name="phone" autoComplete="tel" required pattern="[+0-9() .-]{7,25}" title="Від 7 до 25 символів: цифри, +, пробіли, дужки або дефіс" /></label>
                <label>Повідомлення<textarea name="message" rows={4} required maxLength={5000} /></label>
                <button type="submit" disabled={sending}>Надіслати</button><p role="status">{status}</p>
            </form>
        </dialog>
    </>;
}
