import React, { useState } from "react"

// TODO: Deinen echten Formspree-Endpoint eintragen
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx"

export default function App() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Nutzen />
        <Leistungen />
        <Prozess />
        <Kontakt sent={sent} setSent={setSent} />
      </main>
      <Footer />
    </>
  )
}

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    { href: "#leistungen", label: "Leistungen" },
    { href: "#prozess",    label: "Prozess" },
    { href: "#kontakt",    label: "Kontakt" },
    { href: "/impressum.html", label: "Impressum" },
  ]
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <KaroLogo className="h-8 w-8" />
            <span className="font-semibold tracking-tight text-lg text-ink">CaRo Lifting</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => <a key={n.href} href={n.href} className="link">{n.label}</a>)}
            <a href="#kontakt" className="btn">Richtpreis anfragen</a>
          </nav>

          <button
            aria-label="Menü"
            className="md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setOpen(v => !v)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 py-3">
            <div className="flex flex-col gap-3">
              {nav.map(n => (
                <a key={n.href} href={n.href} className="link" onClick={() => setOpen(false)}>{n.label}</a>
              ))}
              <a href="#kontakt" className="btn" onClick={() => setOpen(false)}>Richtpreis anfragen</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

/* ---------- Hero (ohne Formular, mit CTA zu #kontakt) ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden scroll-mt-24">
      {/* dunkelblauer Verlauf */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2a66] via-[#0b2a66]/10 to-white" />
      <div className="container py-18 lg:py-28 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <span className="badge">Made in Bavaria — Handhabungstechnik</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-tight">
            Seil- &amp; Handlingsgeräte für Industrie &amp; Gewerbe
          </h1>
          <p className="mt-5 lead max-w-xl">
            Ergonomische Handlingssysteme: Auslegung, Konstruktion, Beschaffung, Montage &amp; Inbetriebnahme – aus einer Hand.
          </p>

          {/* Info-Karte ohne Adresse */}
          <div className="card mt-7 text-sm text-slate-700">
            <div className="font-semibold text-ink">CaRo Lifting (i. Gr.)</div>
            <div><span className="text-slate-500">E-Mail:</span> info@caro-lifting.com</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#leistungen" className="btn">Leistungen ansehen</a>
            <a href="#kontakt" className="btn-secondary">Richtpreis anfragen</a>
          </div>
        </div>

        {/* Statt zweitem Formular: kompakter CTA-Teaser */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Richtpreis in 24&nbsp;Stunden</h2>
          <p className="text-slate-600 mb-4">
            Schicken Sie uns kurz die Eckdaten – wir melden uns schnell mit einer ersten Einschätzung.
          </p>
          <a href="#kontakt" className="btn">Zum Anfrageformular</a>
        </div>
      </div>
    </section>
  )
}

/* ---------- Nutzen ---------- */
function Nutzen() {
  const usps = [
    ["Richtpreis in 24 h", "Schnelle Machbarkeit & Preisindikator."],
    ["Bauteilschutz", "Greifer & Aufnahmen passend zu Ihrem Bauteil."],
    ["Schlüsselfertig", "Konstruktion, Beschaffung, Montage, Inbetriebnahme."],
    ["Dokumentation & CE", "Normgerecht, sicher, nachvollziehbar."],
  ]
  return (
    <section className="container py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {usps.map(([t, d], i) => (
          <div key={i} className="card">
            <div className="font-semibold">{t}</div>
            <p className="text-slate-600">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Leistungen ---------- */
function Leistungen() {
  const items = [
    { title: "Seilzug-Handlingsgeräte", desc: "Ergonomische Entlastung in Montage & Logistik. Traglast, Hubweg, Endschalter nach Bedarf." },
    { title: "Greifer & Aufnahmen",     desc: "Schnellwechsel, Dreh/Schwenk, Bauteilschutz – exakt auf Ihr Bauteil ausgelegt." },
    { title: "Schienensysteme",          desc: "Leichtlaufschienen und Ausleger für flexible Arbeitsbereiche." },
    { title: "Montage & Inbetriebnahme", desc: "Vor-Ort-Aufbau, Funktionsprüfung, Unterweisung." },
    { title: "Dokumentation & CE",       desc: "Risikobeurteilung, Betriebsanleitung, Kennzeichnung." },
    { title: "Service",                  desc: "Wartung, Ersatzteile, Erweiterungen." },
  ]
  return (
    <section id="leistungen" className="container py-18 scroll-mt-24">
      <h2 className="section">Leistungen</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="card hover:shadow-lg transition">
            <div className="text-lg font-semibold mb-2">{it.title}</div>
            <p className="text-slate-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Prozess ---------- */
function Prozess() {
  const steps = [
    ["Anfrage",       "Kurzbeschreibung, Traglast, Hubweg, Umgebung (Foto/Skizze ideal)."],
    ["Richtpreis",    "Binnen 24 h Preisindikator & Lieferzeit."],
    ["Angebot",       "Konzeptskizze, Lieferumfang, Termine."],
    ["Umsetzung",     "Konstruktion, Einkauf, Montage."],
    ["Inbetriebnahme","Vor-Ort, Dokumentation & Übergabe."],
  ]
  return (
    <section id="prozess" className="container py-18 scroll-mt-24">
      <h2 className="section">Projektablauf</h2>
      <ol className="grid lg:grid-cols-5 gap-4">
        {steps.map(([t, d], i) => (
          <li key={i} className="card">
            <div className="text-xs text-slate-500">Schritt {i + 1}</div>
            <div className="font-semibold">{t}</div>
            <p className="text-slate-600">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Kontakt (einziges Formular) ---------- */
function Kontakt({ sent, setSent }) {
  return (
    <section id="kontakt" className="container py-18 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="section">Kontakt</h2>
          <p className="lead">Senden Sie uns kurz die Eckdaten – wir melden uns schnell mit einem Richtpreis.</p>
          <div className="card mt-6 text-sm text-slate-700">
            <div><span className="text-slate-500">E-Mail:</span> info@caro-lifting.com</div>
            {/* keine Adresse auf der Startseite */}
          </div>
        </div>

        <div className="card">
          {sent ? (
            <p className="text-green-600">Danke! Ihre Anfrage wurde übermittelt.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                fetch(FORM_ENDPOINT, {
                  method: "POST",
                  body: new FormData(form),
                  headers: { Accept: "application/json" },
                })
                  .then(r => r.ok ? setSent(true) : alert("Fehler beim Senden"))
                  .catch(() => alert("Fehler beim Senden"))
              }}
              className="grid gap-4"
            >
              <Label title="Name"><input name="name" required className="input" /></Label>
              <Label title="E-Mail"><input type="email" name="email" required className="input" /></Label>
              <Label title="Nachricht"><textarea name="message" rows="4" required className="input" /></Label>
              <input type="hidden" name="_subject" value="Kontakt – CaRo Lifting" />
              <input type="text" name="_gotcha" style={{display:"none"}} tabIndex="-1" autoComplete="off" />
              <button className="btn self-start" type="submit">Absenden</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6">
      <div className="container text-sm text-slate-500 flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between">
        <span>© {new Date().getFullYear()} CaRo Lifting – Castor & Rosenfeld</span>
        <span className="opacity-80">
          Made with <span aria-hidden="true">❤</span> in Bavaria
        </span>
        <div className="flex items-center gap-4">
          <a className="link" href="/impressum.html">Impressum</a>
          <a className="link" href="/datenschutz.html">Datenschutz</a>
        </div>
      </div>
    </footer>
  )
}

/* ---------- UI-Bausteine ---------- */
function Label({ title, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {title}
      <div className="mt-1">{children}</div>
    </label>
  )
}

/* 4-Kästchen-Logo, vollständig und sauber skaliert */
function KaroLogo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="CaRo Logo" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#0b5bd3"/>
          <stop offset="1" stopColor="#0843a6"/>
        </linearGradient>
      </defs>
      <rect x="6"  y="6"  width="22" height="22" rx="5" fill="url(#g)"/>
      <rect x="36" y="6"  width="22" height="22" rx="5" fill="url(#g)"/>
      <rect x="6"  y="36" width="22" height="22" rx="5" fill="url(#g)"/>
      <rect x="36" y="36" width="22" height="22" rx="5" fill="url(#g)"/>
    </svg>
  )
}
