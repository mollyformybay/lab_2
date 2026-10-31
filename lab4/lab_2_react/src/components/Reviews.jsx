import { useEffect, useState } from 'react';
import { REVIEWS_URL } from '../config.js';
export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState('Завантаження…');
    const [attempt, setAttempt] = useState(0);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        let active = true;
        const timer = setTimeout(() => controller.abort(), 15000);
        async function load() {
            try {
                const response = await fetch(REVIEWS_URL, { signal: controller.signal });
                if (!response.ok) throw new Error('HTTP ' + response.status);
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error('Некоректна відповідь');
                if (active) { setReviews(data); setStatus(data.length ? `Отримано відгуків: ${data.length}` : 'Відгуків поки немає.'); }
            } catch {
                if (active) { setStatus('Не вдалося отримати відгуки. Перевірте з’єднання.'); setFailed(true); }
            } finally { clearTimeout(timer); }
        }
        load();
        return () => { active = false; clearTimeout(timer); controller.abort(); };
    }, [attempt]);
    return <section id="reviews" className="card wide"><h2>Відгуки роботодавців</h2><p>Навчальні вигадані відгуки з JSONPlaceholder · варіант 15.</p><p role="status">{status}</p>
        {failed && <button onClick={() => { setFailed(false); setStatus('Завантаження…'); setAttempt(attempt + 1); }}>Спробувати ще раз</button>}
        {reviews.map(review => <article className="review" key={review.id}><h3>{review.name}</h3><p className="review-email">{review.email}</p><p>{review.body}</p></article>)}
    </section>;
}
