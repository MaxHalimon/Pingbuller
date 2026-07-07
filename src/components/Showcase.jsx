function Showcase({ showcase }) {
  return (
    <section id="showcase" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-plum-700">Showcase</p>
          <h2 className="mt-2 text-3xl font-light leading-tight text-black sm:text-4xl">
            The old landing page now behaves like a portfolio-ready product demo
          </h2>
          <p className="mt-5 leading-7">
            Visitors can scan the idea, filter updates, open extra context, jump between sections,
            and submit a demo invite. The layout keeps the original airy rhythm while improving
            spacing, contrast, and mobile flow.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {showcase.map((item) => (
            <div key={item.label} className="border border-[#e6e6e6] bg-mist p-6 text-center">
              <strong className="block text-4xl font-black text-plum-700">{item.value}</strong>
              <span className="mt-2 block text-sm font-bold uppercase text-black">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Showcase
