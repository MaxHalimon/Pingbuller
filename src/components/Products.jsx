function Products({ products }) {
  return (
    <section id="products" className="bg-[#ececec] text-[#787878]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-7 md:grid-cols-3">
          <article>
            <h2 className="text-3xl font-black uppercase text-black">Pingbuller</h2>
            <p className="mt-1 italic text-[#b8b8b8]">Portfolio concept, rebuilt in React</p>
            <p className="mt-4 leading-7">
              A nostalgic one-page layout reshaped into a responsive app case: same purple glow,
              cleaner structure, richer copy, and real interactions for visitors to try.
            </p>
          </article>

          {products.slice(0, 2).map((product) => (
            <article key={product.name}>
              <p className="text-sm font-bold uppercase text-plum-700">{product.tag}</p>
              <h3 className="mt-1 text-2xl font-black uppercase text-black">{product.name}</h3>
              <p className="mt-4 leading-7">{product.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
