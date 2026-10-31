import { useEffect, useState } from 'react';
import { saveSystemInfo, readStorage } from '../config.js';
export default function Footer() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        let active = true;
        saveSystemInfo().then(data => { if (active) setEntries(data); }).catch(() => { if (active) setError('Браузер заборонив доступ до localStorage.'); });
        function refresh() { try { setEntries(readStorage()); } catch { setError('Доступ до localStorage обмежено.'); } }
        window.addEventListener('storage', refresh);
        return () => { active = false; window.removeEventListener('storage', refresh); };
    }, []);
    return <footer><p>Остап Левинець. Лабораторна робота №4 · варіант 15 · React.</p><a href="#top">На початок сторінки ↑</a>
        <details className="wide"><summary>Системна інформація та localStorage</summary>{error && <p>{error}</p>}{entries.map(({key,value}) => <section key={key}><h3>{key}</h3><pre>{value}</pre></section>)}</details>
    </footer>;
}
