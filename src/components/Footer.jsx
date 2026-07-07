function Footer({ navItems }) {
  return (
    <footer
      className="bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/assets/images/footer.png')" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-black uppercase">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-plum-300">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          Designed by <strong>Pingbull AS</strong>, rebuilt for portfolio practice
        </p>
      </div>
    </footer>
  )
}

export default Footer
