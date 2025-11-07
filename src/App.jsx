import React, { useState } from "react"

function App() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(() => setSent(true))
      .catch(() => alert("Fehler beim Senden"))
  }

  const nav = [
    { href: "#leistungen", label: "Leistungen" },
    { href: "#kontakt", label: "Kontakt" },
  ]

  return (
    <>
      <Header nav={nav} />
      <Hero onSubmit={onSubmit} sent={sent} />
      <Footer />
    </>
  )
}

function Header({ nav }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="font-semibold tracking-tight text-lg text-ink">
              CaRo Lifting
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-slate-700 hover:text-ink transition"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-[var(--brand)] text-white shadow hover:bg-[var(--brand-dark)]"
            >
              Richtpreis anfragen
            </a>
          </nav>

          <button
            className="md:hidden p-2 border border-slate-300 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center rounded-xl px-4 py-2 text-sm font-medium bg-[var(--brand)] text-white shadow hover:bg-[var(--brand-dark)]"
            >
              Richtpreis anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onSubmit, sent }) {
  return (
    <section className="relative overflow-hidden" id="kontakt">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-700 bg-sky-100 rounded-full px-3 py-1">
              Made in Bavaria – Handhabungstechnik
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">
              Seil- & Handlingsgeräte von CaRo Lifting
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Wir entwickeln, planen und fertigen hochwertige Handlingssysteme
              für Industrie und Gewerbe – individuell nach Kundenanforderung.
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              <div className="font-semibold text-ink">CaRo Lifting (i. Gr.)</div>
              <div>Am Bucklberg 10, 83620 Feldkirchen-Westerham</div>
              <div>info@caro-lifting.com</div>
              <div>p.castor@caro-lifting.com</div>
              <div>g.rosenfeld@caro-lifting.com</div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-ink mb-4">
              Richtpreis-Anfrage
            </h2>
            {sent ? (
              <p className="text-green-600">Danke! Ihre Anfrage wurde gesendet.</p>
            ) : (
              <>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  E-Mail
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block mb-4 text-sm font-medium text-slate-700">
                  Nachricht
                  <textarea
                    name="message"
                    rows="4"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    required
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-xl px-4 py-2 text-sm font-medium bg-[var(--brand)] text-white shadow hover:bg-[var(--brand-dark)]"
                >
                  Absenden
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} CaRo Lifting – Castor & Rosenfeld
    </footer>
  )
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="h-8 w-8 text-sky-600"
      fill="currentColor"
    >
      <rect x="10" y="10" width="35" height="35" rx="5" />
      <rect x="55" y="55" width="35" height="35" rx="5" />
    </svg>
  )
}

export default App
