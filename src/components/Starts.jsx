const filters = ['All', 'Product', 'Story', 'Design']

function Starts({ updateFilter, filteredUpdates, onFilterChange }) {
  return (
    <section id="starts" className="bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <article
          className="relative min-h-[290px] bg-no-repeat pl-8 pt-7 sm:pl-12"
          style={{ backgroundImage: "url('/assets/images/box-com.png')" }}
        >
          <img
            src="/assets/images/Layer.png"
            alt="Community member"
            className="absolute -left-2 top-5 h-12 w-12 rounded-full"
          />
          <h2 className="text-2xl font-black uppercase text-black">
            Pingbuller <span className="text-plum-300">starts here</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7">
            "We wanted our portfolio case to feel like a real product, not a museum piece. Pingbuller
            became a tiny launch workshop: part mobile app, part content engine, part invitation to
            keep building after the first screen."
          </p>
          <div className="mt-7 flex gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-3 w-3 rounded-full border border-plum-700 ${
                  dot === 0 ? 'bg-plum-700' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </article>

        <aside>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black uppercase text-black">Recent updates</h2>
            <div className="flex rounded-full bg-white p-1 shadow-sm">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    updateFilter === filter ? 'bg-plum-700 text-white' : 'text-ink hover:bg-plum-300/25'
                  }`}
                  onClick={() => onFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-4 grid gap-4">
            {filteredUpdates.map((update) => (
              <li key={update.title} className="flex gap-4">
                <img src="/assets/images/recent-icon.png" alt="" className="h-12 w-12 shrink-0" />
                <p className="text-sm leading-6">
                  <strong className="block text-base text-black">{update.title}</strong>
                  {update.meta}
                </p>
              </li>
            ))}
          </ul>
          <a href="#products" className="mt-5 block text-right text-sm font-black uppercase text-black hover:text-plum-700">
            Read more here
          </a>
        </aside>
      </div>

      <div className="border-y border-[#e6e6e6] bg-white">
        <img
          src="/assets/images/partners.png"
          alt="Partner brands"
          className="mx-auto max-h-24 w-full max-w-4xl object-contain px-5 py-6"
        />
      </div>
    </section>
  )
}

export default Starts
