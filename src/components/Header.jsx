function Header({ activeSection, menuOpen, onMenuToggle, onLinkClick, navItems }) {
  return (
    <header
      id="home"
      className="relative min-h-[720px] overflow-hidden bg-cover bg-[50%_96%] text-white md:min-h-[845px]"
      style={{ backgroundImage: "url('/assets/images/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-8 md:py-12">
        <a href="#home" className="block" aria-label="Pingbuller home">
          <img src="/assets/images/ER.png" alt="Pingbuller" className="h-10 w-[155px] object-contain" />
        </a>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="grid h-11 w-11 place-items-center rounded border border-white/25 bg-plum-950/30 md:hidden"
          onClick={onMenuToggle}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </span>
        </button>

        <ul className="hidden items-center gap-7 text-[17px] font-bold uppercase md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`border-b-2 py-2 transition hover:text-[#82ca9c] ${
                  activeSection === item.href.slice(1)
                    ? 'border-plum-300 text-white'
                    : 'border-transparent'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`relative z-30 mx-5 rounded-2xl bg-plum-950/90 p-4 shadow-glow transition md:hidden ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="grid gap-2 text-center text-sm font-bold uppercase">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="block py-2 text-white" onClick={onLinkClick}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section className="relative z-10 mt-24 bg-black/30 md:mt-28">
        <div className="mx-auto flex min-h-[360px] max-w-6xl items-center justify-between gap-8 px-5 py-10 md:min-h-[400px]">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-plum-300">
              Creative mobile studio
            </p>
            <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Build a product story people want to open again
            </h1>
            <h2 className="mt-3 text-xl font-light uppercase text-plum-300 md:text-2xl">
              Pingbuller turns rough ideas into launch-ready mobile moments
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
              A dreamy landing experience for teams that sketch, test, and ship little digital sparks:
              reminders, campaigns, onboarding flows, and community updates with personality.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#products" className="btn-primary">
                Explore Kits
              </a>
              <a href="#contact" className="btn-secondary">
                Book Demo
              </a>
            </div>
          </div>

          <img
            src="/assets/images/Iphone.png"
            alt="Pingbuller mobile app preview"
            className="hidden max-h-[430px] w-auto drop-shadow-2xl sm:block sm:max-w-[34%] lg:max-w-[330px]"
          />
        </div>
      </section>
    </header>
  )
}

export default Header
