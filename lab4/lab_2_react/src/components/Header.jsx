export default function Header() {
    return (
        <header id="top" className="rounded-[20px] border border-purple-800 bg-linear-to-br from-[#211033] to-[#15111f] px-6 py-8 text-white sm:p-10">
            <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-purple-300 uppercase">Резюме / Особистий профіль</p>
            <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-5xl">Остап Левинець</h1>
            <p className="text-lg tracking-wide text-purple-300">Студент кібербезпеки</p>

            <nav aria-label="Розділи резюме">
                <ul className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {[
                        ['about', 'Про мене'],
                        ['education', 'Освіта'],
                        ['skills', 'Навички'],
                        ['experience', 'Практичний досвід'],
                    ].map(([id, label]) => (
                        <li key={id}>
                            <a href={`#${id}`} className="block rounded-lg border border-purple-400/40 px-3.5 py-2 text-purple-100 transition-colors hover:bg-purple-300 hover:text-purple-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 motion-reduce:transition-none">{label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
