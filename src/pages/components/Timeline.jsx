const items = [
  { y: "2004", t: "آغاز فعالیت رسمی", d: "اولین آلبوم و اجراهای کوچک." },
  { y: "2010", t: "تور بین‌المللی", d: "گسترش اجراها در اروپا و آمریکا." },
  { y: "2016", t: "همکاری ارکسترال", d: "پروژه‌های بزرگ با ارکستر." },
  { y: "2022", t: "جوایز و تقدیرها", d: "دریافت چند جایزه موسیقی." },
];

export default function Timeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="mb-10 text-2xl font-light text-white">دستاوردها</h3>
        <ol className="relative border-s border-white/10">
          {items.map((it, i) => (
            <li key={i} className="relative ps-6 py-6">
              <span className="absolute -start-[5px] top-7 h-2 w-2 rounded-full bg-white" />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs tracking-widest text-slate-400">{it.y}</span>
                <h4 className="text-lg text-white">{it.t}</h4>
              </div>
              <p className="mt-2 text-slate-300">{it.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
