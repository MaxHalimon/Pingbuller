import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Starts from '../components/Starts'
import Products from '../components/Products'
import Showcase from '../components/Showcase'
import Contacts from '../components/Contacts'
import Footer from '../components/Footer'

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

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [expandedFeature, setExpandedFeature] = useState(0)
  const [updateFilter, setUpdateFilter] = useState('All')
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
        navItems={navItems}
      />

      <main>
        <About
          features={features}
          expandedFeature={expandedFeature}
          onToggleFeature={setExpandedFeature}
        />
        <Starts
          updateFilter={updateFilter}
          filteredUpdates={filteredUpdates}
          onFilterChange={setUpdateFilter}
        />
        <Products products={products} />
        <Showcase showcase={showcase} />
        <Contacts />
      </main>

      <Footer navItems={navItems} />

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

export default HomePage
