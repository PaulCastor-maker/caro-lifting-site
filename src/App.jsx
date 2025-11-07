import React, { useState } from "react"

const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx" // <- DEIN Formspree-Link

export default function App() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Logos />
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
    { href: "#prozess", label: "Prozess" },
    { href: "#kontakt", label: "Kontakt" },
    { href: "/impressum.html", label: "Impressum" },
  ]
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <KaroLogo className="h-8 w-8" />
            <span className="font-semibold tracking-tight text-lg text-ink">CaRo Lifting</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <a key={n.href} href={n.href} className="link">{n.label}</a>
            ))}
            <a href="#kontakt" className="btn">Richtpreis anfragen</a>
          </nav>

          <button
            aria-label="Menü"
            className="md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 py-3">
            <div className="flex flex-col gap-3">
              {nav.map(n => (
                <a key={n.href} href={n.href} className="link" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
              <a href="#kontakt" className="btn" onClick={() => setOpen(false)}>Richtpreis anfragen</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 to-white" />
      <div className="container py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="badge">Made in Bavaria — Handhabungstechnik</span>
          <h1 className="mt-6 text-4xl lg:text-5xl font-bold tracking-tight text-ink">
            Seil- & Handlingsgeräte von CaRo Lifting
          </h1>
          <p className="mt-4 lead">
            Wir entwickeln, planen und fertigen ergonomische Handlingssysteme – individuell nach
            Ihren Anforderungen. Von der Auslegung über Konstruktion und Beschaffung bis Montage &
            Inbetriebnahme.
          </p>

          <div className="card mt-6 text-sm text-slate-700">
            <div className="font-semibold text-ink">CaRo Lifting (i. Gr.)</div>
            <div>Am Bucklberg 10, 83620 Feldkirchen-Westerham</div>
            <div>info@caro-lifting.com</div>
            <div>p.castor@caro-lifting.com</div>
            <div>g.rosenfeld@caro-lifting.com</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#leistungen" className="btn">Leistungen ansehen</a>
            <a href="#kontakt" className="btn-secondary">Richtpreis anfragen</a>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Warum CaRo Lifting?</h2>
          <ul className="grid gap-3 text-slate-700">
            <li>• Richtpreis in 24 h</li>
            <li>• Traglast/Hubweg nach Bedarf, Bauteilschutz</li>
            <li>• Konstruktion, Beschaffung, Montage, Inbetriebnahme</li>
            <li>• Dokumentation & CE-Unterstützung</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- Logos / Trust ---------- */
function Logos() {
  return (
    <section className="container py-6">
      <div className="flex flex-wrap items-center gap-6 opacity-70">
        <MiniKaro /><span className="text-sm text-slate-500">Präzision • Ergonomie • Sicherheit</span>
      </div>
    </section>
  )
}

/* ---------- Leistungen ---------- */
function Leistungen() {
  const items = [
    { title: "Seilzug-Handlingsgeräte", desc: "Ergonomische Entlastung in Montage & Logistik. Traglasten, Hubwege, Endschalter nach Bedarf." },
    { title: "Greifer & Aufnahmen", desc: "Schnellwechsel, Dreh/Schwenk, Bauteilschutz – exakt auf Ihr Bauteil ausgelegt." },
    { title: "Schienensysteme", desc: "Leichtlaufschienen und Ausleger für flexible Arbeitsbereiche." },
    { title: "Montage & Inbetriebnahme", desc: "Vor-Ort-Aufbau, Funktionsprüfung und Unterweisung." },
    { title: "Dokumentation & CE", desc: "Risikobeurteilung, Betriebsanleitung, Kennzeichnung – normgerecht." },
    { title: "Service", desc: "Wartung, Ersatzteile, Erweiterungen." },
  ]
  return (
    <section id="leistungen" className="container py-16">
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
    ["Anfrage", "Kurzbeschreibung, Traglast, Hubweg, Umgebung (Foto/Skizze ideal)."],
    ["Richtpreis", "Binnen 24 h Preisindikator und Lieferzeit."],
    ["Angebot", "Konzeptskizze, Lieferumfang, Termine."],
    ["Umsetzung", "Konstruktion, Einkauf, Montage – alles aus einer Hand."],
    ["Inbetriebnahme", "Vor-Ort, Dokumentation & Übergabe."],
  ]
  return (
    <section id="prozess" className="container py-16">
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

/* ---------- Kontakt ---------- */
function Kontakt({ sent, setSent }) {
  return (
    <section id="kontakt" className="container py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="section">Kontakt & Richtpreisanfrage</h2>
          <p className="lead">Schicken Sie uns kurz die Eckdaten – wir melden uns schnell mit einem Richtpreis.</p>
        </div>

        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.target
            fetch(FORM_ENDPOINT, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" },
            })
              .then((r) => (r.ok ? setSent(true) : alert("Fehler beim Senden")))
              .catch(() => alert("Fehler beim Senden"))
          }}
        >
          {sent ? (
            <p className="text-green-600">Danke! Ihre Anfrage wurde übermittelt.</p>
          ) : (
            <>
              <Label title="Name">
                <input name="name" required className="input" />
              </Label>
              <Label title="E-Mail">
                <input type="email" name="email" required className="input" />
              </Label>
              <Label title="Nachricht">
                <textarea name="message" rows="4" required className="input" />
              </Label>
              <input type="hidden" name="_subject" value="Neue Richtpreisanfrage – CaRo Lifting" />
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
              <button className="btn" type="submit">Absenden</button>
            </>
          )}
        </form>
      </div>

      <div className="mt-10 text-sm text-slate-600">
        <a className="link" href="/impressum.html">Impressum</a>
        <span className="mx-2">•</span>
        <a className="link" href="/datenschutz.html">Datenschutz</a>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6">
      <div className="container text-sm text-slate-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} CaRo Lifting – Castor & Rosenfeld</span>
        <span className="opacity-70">Made with ❤ in Bavaria</span>
      </div>
    </footer>
  )
}

/* ---------- Kleine UI-Bausteine ---------- */
function Label({ title, children }) {
  return (
    <label className="block mb-4 text-sm font-medium text-slate-700">
      {title}
      <div className="mt-1">{children}</div>
    </label>
  )
}

function KaroLogo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="24" height="24" rx="4" fill="url(#g)" />
      <rect x="34" y="34" width="24" height="24" rx="4" fill="url(#g)" />
    </svg>
  )
}

function MiniKaro() {
  return <KaroLogo className="h-6 w-6" />
}
