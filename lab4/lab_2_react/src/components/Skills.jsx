export default function Skills() {
    return (
        <section id="skills" className="min-w-0 scroll-mt-6 rounded-2xl border border-[#33283f] bg-[#15131c] p-6 shadow-sm sm:p-7">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-purple-50">Навички</h2>

            <h3 className="mt-5 mb-2 text-base font-semibold text-purple-200">Мови програмування</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-purple-400">
                <li>Python — вмію працювати з мовою.</li>
                <li>C# — вмію працювати з мовою.</li>
            </ul>

            <h3 className="mt-5 mb-2 text-base font-semibold text-purple-200">Вивчені вебтехнології та бази даних</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-purple-400">
                <li>HTML — розмітка вебсторінок.</li>
                <li>CSS — оформлення вебсторінок.</li>
                <li>PHP — програмування серверної частини сайтів.</li>
                <li>MySQL — реляційні бази даних.</li>
            </ul>
        </section>
    );
}