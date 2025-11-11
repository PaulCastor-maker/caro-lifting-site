import React, { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./components/Reveal";

// deinen Formspree-Endpoint hier eintragen:
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";

export default function App() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Header />
      <main id="start">
        <Hero />
        <Stats />
        <Marquee />
        <Nutzen />
        <Leistungen />
        <Prozess />
        <Kontakt sent={sent} setSent={setSent} />
      </main>
      <StickyCTA />
      <Footer />
    </>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  const nav = useMemo(
    () => [
      { href: "#leistungen", label: "Leistungen" },
      { href: "#prozess", label: "Prozess" },
      { href: "#kontakt", label: "Kontakt" },
      { href: "/impressum.html", label: "Impressum" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <KaroLogo className="h-8 w-8" />
            <span className="font-semibold tracking-tight text-lg text-ink">CaRo Lifting</span>
          </a>

        <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link">
                {n.label}
              </a>
            ))}
            <a href="#kontakt" className="btn">Richtpreis anfragen</a>
          </nav>

          <button
            aria-label="Menü"
            className="md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 py-3">
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
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
  );
}

/* ---------- Hero mit Bayern-Herz-Wasserzeichen ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2a66] via-[#0b2a66]/10 to-white" />
      <div className="absolute inset-0 -z-10 bg-bavaria" />

      <div className="container py-18 lg:py-28 grid lg:grid-cols-2 gap-14 items-start">
        <Reveal y={12}>
          <span className="badge">Made in Bavaria — Handhabungstechnik</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-tight">
            Seil- &amp; Handlingsgeräte für Industrie &amp; Gewerbe
          </h1>
          <p className="mt-5 lead max-w-xl">
            Ergonomische Handlingssysteme: Auslegung, Konstruktion, Beschaffung, Montage &amp; Inbetriebnahme – aus einer Hand.
          </p>

          <div className="card mt-7 text-sm text-slate-700">
            <div className="font-semibold text-ink">CaRo Lifting (i. Gr.)</div>
            <div><span className="text-slate-500">E-Mail:</span> info@caro-lifting.com</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#leistungen" className="btn">Leistungen ansehen</a>
            <a href="#kontakt" className="btn-secondary">Richtpreis anfragen</a>
          </div>
        </Reveal>

        <Reveal delay={120} y={18}>
          <div className="card">
            <h2 className="text-lg font-semibold mb-2">Richtpreis in 24&nbsp;Stunden</h2>
            <p className="text-slate-600 mb-4">
              Schicken Sie uns kurz die Eckdaten – wir melden uns schnell mit einer ersten Einschätzung.
            </p>
            <a href="#kontakt" className="btn">Zum Anfrageformular</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Kleine KPI-Stats mit Count-Up ---------- */
function useCounter(triggerRef, to = 100, duration = 1200) {
  // start counting when container is in view
  const [val, setVal] = useState(0);
  const seen = useInView(triggerRef, { threshold: 0.2, once: true });

  useEffect(() => {
    if (!seen) return;
    let start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.floor(to * (0.5 - 0.5 * Math.cos(Math.PI * p)))); // smooth ease
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return val;
}

function Stats() {
  const ref = useRef(null);
  const a = useCounter(ref, 24);   // 24h
  const b = useCounter(ref, 12);   // Jahre/Erfahrung – Beispiel
  const c = useCounter(ref, 120);  // Projekte – Beispiel

  return (
    <section ref={ref} className="container py-12">
      <div className="grid sm:grid-cols-3 gap-6">
        <Reveal className="card text-center" y={10}>
          <div className="stat">{a}h</div>
          <div className="text-slate-600">Richtpreis</div>
        </Reveal>
        <Reveal className="card text-center" y={10} delay={80}>
          <div className="stat">{b}+</div>
          <div className="text-slate-600">Jahre Team-Erfahrung</div>
        </Reveal>
        <Reveal className="card text-center" y={10} delay={160}>
          <div className="stat">{c}+</div>
          <div className="text-slate-600">realisierte Lösungen</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Laufband/Marquee für Branchen/Partner ---------- */
function Marquee() {
  const items = ["Automotive", "Maschinenbau", "Logistik", "Batterie", "Elektronik", "MedTech", "Aftermarket", "OEM/Line-Retrofit"];
  const row = [...items, ...items]; // doppelt, damit’s looped
  return (
    <section aria-label="Branchen" className="py-6 bg-slate-50 border-y border-slate-200/70">
      <div className="container">
        <div className="marquee">
          <div className="marquee__track">
            {row.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Nutzen ---------- */
function Nutzen() {
  const usps = [
    ["Richtpreis in 24 h", "Schnelle Machbarkeit & Preisindikator."],
    ["Bauteilschutz", "Greifer & Aufnahmen passend zu Ihrem Bauteil."],
    ["Schlüsselfertig", "Konstruktion, Beschaffung, Montage, Inbetriebnahme."],
    ["Dokumentation & CE", "Normgerecht, sicher, nachvollziehbar."],
  ];
  return (
    <section className="container py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {usps.map(([t, d], i) => (
          <Reveal key={i} className="card" delay={i * 80}>
            <div className="font-semibold">{t}</div>
            <p className="text-slate-600">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
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
  ];
  return (
    <section id="leistungen" className="container py-18 scroll-mt-24">
      <h2 className="section">Leistungen</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <Reveal key={i} className="card hover:shadow-lg transition" delay={i * 80}>
            <div className="text-lg font-semibold mb-2">{it.title}</div>
            <p className="text-slate-600">{it.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Prozess ---------- */
function Prozess() {
  const steps = [
    ["Anfrage",       "Kurzbeschreibung, Traglast, Hubweg, Umgebung (Foto/Skizze ideal)."],
    ["Richtpreis",    "Binnen 24 h Preisindikator & Lieferzeit."],
    ["Angebot",       "Konzeptskizze, Lieferumfang, Termine."],
    ["Umsetzung",     "Konstruktion, Einkauf, Montage."],
    ["Inbetriebnahme","Vor-Ort, Dokumentation & Übergabe."],
  ];
  return (
    <section id="prozess" className="container py-18 scroll-mt-24">
      <h2 className="section">Projektablauf</h2>
      <ol className="grid lg:grid-cols-5 gap-4">
        {steps.map(([t, d], i) => (
          <Reveal key={i} className="card" delay={i * 80}>
            <div className="text-xs text-slate-500">Schritt {i + 1}</div>
            <div className="font-semibold">{t}</div>
            <p className="text-slate-600">{d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Kontakt (Formular) ---------- */
function Kontakt({ sent, setSent }) {
  return (
    <section id="kontakt" className="container py-18 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <Reveal>
          <h2 className="section">Kontakt</h2>
          <p className="lead">Senden Sie uns kurz die Eckdaten – wir melden uns schnell mit einem Richtpreis.</p>
          <div className="card mt-6 text-sm text-slate-700">
            <div><span className="text-slate-500">E-Mail:</span> info@caro-lifting.com</div>
          </div>
        </Reveal>

        <Reveal delay={100} y={14} className="card">
          {sent ? (
            <p className="text-green-600">Danke! Ihre Anfrage wurde übermittelt.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                fetch(FORM_ENDPOINT, {
                  method: "POST",
                  body: new FormData(form),
                  headers: { Accept: "application/json" },
                })
                  .then((r) => (r.ok ? setSent(true) : alert("Fehler beim Senden")))
                  .catch(() => alert("Fehler beim Senden"));
              }}
              className="grid gap-4"
            >
              <Label title="Name"><input name="name" required className="input" /></Label>
              <Label title="E-Mail"><input type="email" name="email" required className="input" /></Label>
              <Label title="Nachricht"><textarea name="message" rows="4" required className="input" /></Label>
              <input type="hidden" name="_subject" value="Kontakt – CaRo Lifting" />
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
              <button className="btn self-start" type="submit">Absenden</button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Sticky CTA (mobil) ---------- */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-40 md:hidden px-4 transition ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      aria-hidden={!show}
    >
      <a href="#kontakt" className="w-full btn shadow-soft flex items-center justify-center py-3 rounded-2xl">
        Richtpreis anfragen
      </a>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-slate-200 py-10 overflow-hidden">
      {/* optionales Wasserzeichen im Footer */}
      <img
        src="/bavaria-heart.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 -bottom-10 w-[280px] opacity-10 hidden md:block"
      />
      <div className="container relative z-10 text-sm text-slate-500 flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between">
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
  );
}

/* ---------- UI-Helfer ---------- */
function Label({ title, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {title}
      <div className="mt-1">{children}</div>
    </label>
  );
}

/* 4-Kästchen-Logo (wie bisher) */
function KaroLogo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="CaRo Logo" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#0b5bd3" />
          <stop offset="1" stopColor="#0843a6" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="22" height="22" rx="5" fill="url(#g)" />
      <rect x="36" y="6" width="22" height="22" rx="5" fill="url(#g)" />
      <rect x="6" y="36" width="22" height="22" rx="5" fill="url(#g)" />
      <rect x="36" y="36" width="22" height="22" rx="5" fill="url(#g)" />
    </svg>
  );
}

/* kleiner interner Hook für Stats */
function useInView(ref, opts) {
  // lokale Kopie, damit App.jsx alleine funktioniert, alternative: aus hooks/useInView importieren
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true);
        if (!opts || opts.once !== false) obs.disconnect();
      } else if (opts && opts.once === false) {
        setV(false);
      }
    }, { threshold: (opts && opts.threshold) || 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, opts]);
  return v;
}
