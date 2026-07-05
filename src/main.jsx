import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#starts' },
  { label: 'Products', href: '#products' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' }
]

const features = [
  {
    title: 'Mood-first planning',
    text:
      'Shape releases around the feeling you want users to remember: calm onboarding, playful wins, and one clean path to the next action.'
  },
  {
    title: 'Mobile rituals',
    text:
      'Turn everyday check-ins into quick, tactile moments with progress cues, reminders, and tiny celebrations that never get in the way.'
  },
  {
    title: 'Launch studio',
    text:
      'Prototype campaign pages, feature notes, and app screens from the same content kit, so a small team can move with one voice.'
  }
]

const updates = [
  {
    title: 'A softer notification flow is now live',
    meta: 'Posted by Mira on July 5, 2026 in Product Notes',
    category: 'Product'
  },
  {
    title: 'How we prototype micro-stories for mobile apps',
    meta: 'Posted by Anton on June 28, 2026 in Studio Journal',
    category: 'Story'
  },
  {
    title: 'New creator dashboard pairs metrics with prompts',
    meta: 'Posted by Lena on June 18, 2026 in Design Lab',
    category: 'Design'
  }
]

const products = [
  {
    name: 'Pulse Kit',
    tag: 'For product teams',
    copy:
      'A lightweight set of screens for launches, changelogs, and user feedback loops. Built for teams that want their roadmap to feel alive.'
  },
  {
    name: 'Dream Deck',
    tag: 'For creators',
    copy:
      'Prompt cards, mood boards, and campaign snippets that help creators turn half-formed ideas into a publishable mobile story.'
  },
  {
    name: 'Signal Room',
    tag: 'For founders',
    copy:
      'A calm dashboard concept for tracking launch signals: signups, comments, support themes, and the next experiment worth trying.'
  }
]

const showcase = [
  { value: '18k', label: 'prototype taps tested' },
  { value: '42', label: 'launch stories drafted' },
  { value: '9', label: 'mobile flows bundled' }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [expandedFeature, setExpandedFeature] = useState(0)
  const [updateFilter, setUpdateFilter] = useState('All')
  const [email, setEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [showTop, setShowTop] = useState(false)

  const filteredUpdates = useMemo(() => {
    if (updateFilter === 'All') return updates
    return updates.filter((update) => update.category === updateFilter)
  }, [updateFilter])

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSubscribe(event) {
    event.preventDefault()
    const cleanEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormMessage('Enter a working email and the demo invite will unlock.')
      return
    }
    setFormMessage(`Invite reserved for ${cleanEmail}. Your portfolio demo is ready to shine.`)
    setEmail('')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-mist font-roboto text-ink">
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onLinkClick={closeMenu}
      />

      <main>
        <About
          expandedFeature={expandedFeature}
          onToggleFeature={setExpandedFeature}
        />
        <Starts
          updateFilter={updateFilter}
          filteredUpdates={filteredUpdates}
          onFilterChange={setUpdateFilter}
        />
        <Products />
        <Showcase />
        <Contact
          email={email}
          formMessage={formMessage}
          onEmailChange={setEmail}
          onSubmit={handleSubscribe}
        />
      </main>

      <Footer />

      <button
        type="button"
        aria-label="Scroll to top"
        className={`fixed bottom-5 right-5 z-40 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-[#82ca9c] ${
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ^
      </button>
    </div>
  )
}

function Header({ activeSection, menuOpen, onMenuToggle, onLinkClick }) {
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

function About({ expandedFeature, onToggleFeature }) {
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

function Starts({ updateFilter, filteredUpdates, onFilterChange }) {
  const filters = ['All', 'Product', 'Story', 'Design']

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

function Products() {
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

function Showcase() {
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

function Contact({ email, formMessage, onEmailChange, onSubmit }) {
  return (
    <section id="contact" className="bg-about-gradient text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-plum-300">Dolor sit amet, upgraded</p>
          <h2 className="mt-3 text-3xl font-light leading-tight sm:text-4xl">
            Want to see the concept as a real workflow?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/86">
            Leave an email in the demo form and the interface responds instantly. In a production
            app this could connect to a CRM, but for the portfolio case it proves the page is alive.
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-white/10 p-5 shadow-glow backdrop-blur">
          <label htmlFor="email" className="block text-sm font-bold uppercase text-white">
            Demo invite
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              className="min-h-12 flex-1 border border-white/20 bg-white px-4 text-base text-black outline-none focus:border-plum-300"
            />
            <button type="submit" className="btn-primary min-h-12">
              Send
            </button>
          </div>
          {formMessage && <p className="mt-3 text-sm text-white/90">{formMessage}</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
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

createRoot(document.getElementById('root')).render(<App />)
