import { useEffect, useState } from 'react';
import Reviews from './components/Reviews.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import { timeTheme } from './config.js';
export default function App() {
    const [theme, setTheme] = useState(timeTheme);
    const [automatic, setAutomatic] = useState(true);
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);
    useEffect(() => {
        if (!automatic) return;
        const timer = setInterval(() => setTheme(timeTheme()), 1000);
        return () => clearInterval(timer);
    }, [automatic]);
    return <>
        <header id="top" className="profile-header">
            <p className="eyebrow">Резюме / Особистий профіль · React</p>
            <h1>Остап Левинець</h1><p className="subtitle">Студент кібербезпеки</p>
            <div className="controls">
                <button onClick={() => { setAutomatic(false); setTheme(theme === 'dark' ? 'light' : 'dark'); }}>{theme === 'dark' ? 'Світла тема' : 'Темна тема'}</button>
                <button onClick={() => { setAutomatic(true); setTheme(timeTheme()); }}>Тема за часом</button>
                <span>{automatic ? 'Автоматично за часом' : 'Ручний режим'}</span>
            </div>
            <nav aria-label="Розділи резюме"><ul>{[['about','Про мене'], ['education','Освіта'], ['skills','Навички'], ['experience','Практичний досвід'], ['reviews','Відгуки']].map(([id, name]) => <li key={id}><a href={'#' + id}>{name}</a></li>)}</ul></nav>
        </header>
        <main>
            <section id="about" className="card"><h2>Про мене</h2><p>Я — Остап Левинець, студент Національного університету «Львівська політехніка». Навчаюся за напрямом кібербезпеки. Вмію працювати з Python та C#, вивчав вебтехнології та пробував розробляти сайти.</p></section>
            <section id="education" className="card"><h2>Освіта</h2><h3>Національний університет «Львівська політехніка»</h3><p>Напрям навчання: кібербезпека.</p><p>Статус: навчаюся.</p></section>
            <section id="skills" className="card"><h2>Навички</h2><h3>Мови програмування</h3><ul><li>Python</li><li>C#</li></ul><h3>Вебтехнології та бази даних</h3><ul><li>HTML</li><li>CSS</li><li>PHP</li><li>MySQL</li></ul></section>
            <section id="experience" className="card"><h2>Практичний досвід</h2><h3>Навчальна практика веброзробки</h3><p>Під час вивчення вебтехнологій пробував розробляти сайти. Маю початковий досвід створення вебсторінок.</p></section>
            <Reviews />
        </main>
        <ContactForm /><Footer />
    </>;
}
