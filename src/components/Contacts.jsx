import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

function Contacts() {
  const formRef = useRef(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formMessage, setFormMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanEmail = email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormMessage('Enter a working email and we will get back to you shortly.')
      return
    }

    if (!message.trim()) {
      setFormMessage('Please add a short message so we can help you better.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setFormMessage('EmailJS is not configured yet. The form is ready, and the message will be sent once the keys are provided.')
      setEmail('')
      setMessage('')
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setFormMessage(`Thanks! We will reach out to ${cleanEmail} soon.`)
      setEmail('')
      setMessage('')
      event.target.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setFormMessage('The message could not be sent right now. Please try again later.')
    }
  }

  return (
    <section id="contact" className="bg-about-gradient text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-glow backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-plum-300">Contact us</p>
          <h2 className="mt-3 text-3xl font-light leading-tight sm:text-4xl">
            Let&apos;s build something memorable together
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/86">
            Share your idea and we will help shape it into a polished product story. The form below is
            connected with a ready-to-use email flow pattern for a classic React contact experience.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="contact-email" className="block text-sm font-bold uppercase text-white">
                Email
              </label>
              <input
                id="contact-email"
                name="user_email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 min-h-12 w-full border border-white/20 bg-white px-4 text-base text-black outline-none focus:border-plum-300"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold uppercase text-white">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about your project..."
                className="mt-2 w-full border border-white/20 bg-white px-4 py-3 text-base text-black outline-none focus:border-plum-300"
              />
            </div>
            <button type="submit" className="btn-primary min-h-12">
              Send message
            </button>
            {formMessage && <p className="text-sm text-white/90">{formMessage}</p>}
          </form>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/10 p-8 shadow-glow backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-plum-300">Reach us</p>
          <h3 className="mt-3 text-2xl font-light uppercase text-white">Contact details</h3>
          <div className="mt-8 space-y-5 text-lg text-white/90">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-plum-200">Email</p>
              <a href="mailto:hello@pingbuller.dev" className="mt-1 inline-block hover:text-[#82ca9c]">
                hello@pingbuller.dev
              </a>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-plum-200">Phone</p>
              <a href="tel:+380501112233" className="mt-1 inline-block hover:text-[#82ca9c]">
                +38 (050) 111-22-33
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
