function About({ features, expandedFeature, onToggleFeature }) {
  return (
    <section id="about" className="border-t border-plum-900 bg-about-gradient text-white">
      <div className="mx-auto grid max-w-6xl gap-7 px-5 py-16 md:grid-cols-3 md:py-20">
        {features.map((feature, index) => (
          <article key={feature.title} className="group flex gap-5">
            <span className={`about-sprite about-sprite-${index}`} aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-light uppercase leading-8">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-white/86">
                {expandedFeature === index
                  ? `${feature.text} Each pattern is reusable, responsive, and tuned for fast portfolio storytelling.`
                  : feature.text}
              </p>
              <button
                type="button"
                className="mt-4 block w-full text-right text-xs font-black uppercase transition group-hover:text-plum-300 group-hover:drop-shadow"
                onClick={() => onToggleFeature(expandedFeature === index ? -1 : index)}
              >
                {expandedFeature === index ? 'Show less' : 'Read more'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
