"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const NAV_LINKS = [
  { label: "Objekt", href: "#objekt" },
  { label: "Details", href: "#details" },
  { label: "Grundstück", href: "#grundstueck" },
  { label: "Lage", href: "#lage" },
  { label: "Kontakt", href: "#kontakt" },
];

const IconArea = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconTruck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const FEATURES = [
  {
    icon: <IconArea />,
    title: "Großzügige Fläche",
    body: "Weitläufige Grundfläche, die Raum für Maschinen, Tiere und Erntegut bietet.",
  },
  {
    icon: <IconBuilding />,
    title: "Stabile Bausubstanz",
    body: "Solides Gebäude in gepflegtem Zustand – bereit für den sofortigen Einsatz.",
  },
  {
    icon: <IconZap />,
    title: "Strom & Wasser",
    body: "Strom- und Wasseranschlüsse vorhanden. Weitere Versorgungsleitungen nach Absprache.",
  },
  {
    icon: <IconTruck />,
    title: "Gute Zufahrt",
    body: "Breite Zufahrt für landwirtschaftliche Fahrzeuge und LKW.",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    setSubmitting(false);

    if (!res.ok) {
      const { error } = await res.json();
      setSubmitError(error ?? "Unbekannter Fehler. Bitte versuchen Sie es erneut.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <>
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f6f0]/90 backdrop-blur border-b border-stone-200">
        <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-stone-800">
            Scheune Jonatal
          </span>
          <ul className="hidden sm:flex gap-7 text-sm text-stone-600">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative pb-0.5 hover:text-stone-900 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className="text-sm bg-stone-800 text-stone-50 px-4 py-1.5 rounded-full hover:bg-stone-700 active:scale-95 transition-all duration-200"
            >
              Anfrage senden
            </a>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Menü öffnen"
              className="sm:hidden relative w-6 h-5 flex flex-col justify-between"
            >
              <span className={`block h-0.5 w-6 bg-stone-800 transition-all duration-300 origin-center ${mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-stone-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-stone-800 transition-all duration-300 origin-center ${mobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
          <ul className="flex flex-col px-6 py-4 gap-4 text-sm text-stone-700 border-t border-stone-100">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-stone-900 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="pt-14">
        {/* HERO */}
        <section
          id="objekt"
          className="relative min-h-[92vh] flex items-end bg-stone-800 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-stone-700"
            style={{
              backgroundImage: `url('/placeholder-scheune.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
            <p
              className="animate-fade-in text-stone-300 text-sm uppercase tracking-widest mb-3"
              style={{ animationDelay: "0.15s" }}
            >
              Jonatal, Wald ZH
            </p>
            <h1
              className="animate-fade-up text-4xl sm:text-6xl font-bold text-white leading-tight max-w-2xl"
              style={{ animationDelay: "0.28s" }}
            >
              Scheune zur
              <br />
              Vermietung
            </h1>
            <p
              className="animate-fade-up mt-5 text-stone-300 text-lg max-w-xl leading-relaxed"
              style={{ animationDelay: "0.42s" }}
            >
              Geräumige, gut erhaltene Scheune im Jonatal bei Wald ZH — ideal
              für Landwirtschaft, Lagerung und mehr. Langfristige Vermietung
              bevorzugt.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: "0.56s" }}
            >
              <a
                href="#kontakt"
                className="bg-white text-stone-900 px-6 py-3 rounded-full font-medium hover:bg-stone-100 active:scale-95 transition-all duration-200"
              >
                Jetzt anfragen
              </a>
              <a
                href="#details"
                className="border border-white/40 text-white px-6 py-3 rounded-full font-medium hover:border-white/80 hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                Details ansehen
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="animate-bounce-y flex flex-col items-center text-white/40">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="details" className="py-24 bg-[#f8f6f0]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal text-stone-500 text-sm uppercase tracking-widest mb-2">
              Ausstattung
            </p>
            <h2 className="reveal reveal-d1 text-3xl font-bold text-stone-800 mb-12">
              Was Sie erwartet
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`reveal reveal-d${i + 1} group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                >
                  <span className="text-stone-400 mb-4 block group-hover:text-stone-600 transition-colors duration-300">
                    {f.icon}
                  </span>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick-stats bar */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { value: "~400 m²", label: "Grundfläche" },
                { value: "~6 m", label: "Firsthöhe" },
                { value: "Sofort", label: "Verfügbar" },
                { value: "VHB", label: "Kaltmiete" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`reveal reveal-d${i + 1} bg-white rounded-xl p-5 border border-stone-100 hover:-translate-y-0.5 transition-transform duration-200`}
                >
                  <p className="text-2xl font-bold text-stone-800">{s.value}</p>
                  <p className="text-stone-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRUNDSTÜCK */}
        <section id="grundstueck" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal text-stone-500 text-sm uppercase tracking-widest mb-2">
              Grundstück
            </p>
            <h2 className="reveal reveal-d1 text-3xl font-bold text-stone-800 mb-12">
              Zwei angrenzende Parzellen
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="reveal reveal-d1 rounded-2xl border border-stone-100 bg-stone-50 p-8 hover:shadow-sm transition-shadow duration-300">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">
                  Parzelle 1
                </p>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">
                  Bauland
                </h3>
                <div className="rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center h-24">
                  <p className="text-stone-400 text-sm">Details folgen demnächst.</p>
                </div>
              </div>
              <div className="reveal reveal-d2 rounded-2xl border border-stone-100 bg-stone-50 p-8 hover:shadow-sm transition-shadow duration-300">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">
                  Parzelle 2
                </p>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">
                  Landwirtschaftsland
                </h3>
                <div className="rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center h-24">
                  <p className="text-stone-400 text-sm">Details folgen demnächst.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="lage" className="py-24 bg-stone-100">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="reveal text-stone-500 text-sm uppercase tracking-widest mb-2">
                Lage
              </p>
              <h2 className="reveal reveal-d1 text-3xl font-bold text-stone-800 mb-5">
                Idyllische Lage im Jonatal
              </h2>
              <p className="reveal reveal-d2 text-stone-600 leading-relaxed mb-4">
                Das Jonatal liegt in der Gemeinde Wald im Zürcher Oberland -
                eingebettet in die hügelige Landschaft des Kantons Zürich, ruhig
                und doch gut erreichbar.
              </p>
              <p className="reveal reveal-d3 text-stone-600 leading-relaxed">
                Die ländliche Lage bietet optimale Voraussetzungen für
                landwirtschaftliche Betriebe und schafft genug Abstand zu
                Wohnbebauung für einen störungsfreien Betrieb.
              </p>
            </div>
            <div className="reveal reveal-d2 rounded-2xl overflow-hidden border border-stone-200 aspect-video">
              <LeafletMap />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="kontakt" className="py-24 bg-[#f8f6f0]">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="reveal text-stone-500 text-sm uppercase tracking-widest mb-2">
                Kontakt
              </p>
              <h2 className="reveal reveal-d1 text-3xl font-bold text-stone-800 mb-5">
                Interesse geweckt?
              </h2>
              <p className="reveal reveal-d2 text-stone-600 leading-relaxed mb-8">
                Senden Sie uns Ihre Anfrage. Besichtigungen sind selbstverständlich möglich.
              </p>
              <div className="reveal reveal-d3 space-y-4 text-stone-700 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-base">
                    @
                  </span>
                  <span>info@scheune-jonatal.ch</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-base">
                    ✆
                  </span>
                  <span>Telefonnummer auf Anfrage</span>
                </div>
              </div>
            </div>

            <div className="reveal reveal-d2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[360px]">
                  <span className="text-4xl text-stone-400">✓</span>
                  <h3 className="text-xl font-semibold text-stone-800">
                    Nachricht erhalten!
                  </h3>
                  <p className="text-stone-500 text-sm">
                    Wir melden uns so schnell wie möglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-xs text-stone-500 uppercase tracking-wider mb-1.5 block">
                        Name *
                      </span>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Max Mustermann"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-200 bg-stone-50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-stone-500 uppercase tracking-wider mb-1.5 block">
                        Telefon
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+41 …"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-200 bg-stone-50"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs text-stone-500 uppercase tracking-wider mb-1.5 block">
                      E-Mail *
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="name@beispiel.de"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-200 bg-stone-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-stone-500 uppercase tracking-wider mb-1.5 block">
                      Nachricht *
                    </span>
                    <textarea
                      required
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Ich interessiere mich für die Scheune …"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-all duration-200 bg-stone-50 resize-none"
                    />
                  </label>
                  {submitError && (
                    <p className="text-red-600 text-sm">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-stone-800 text-white py-3 rounded-xl font-medium hover:bg-stone-700 active:scale-[0.98] transition-all duration-200 text-sm disabled:opacity-50"
                  >
                    {submitting ? "Wird gesendet…" : "Anfrage absenden"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pt-14 pb-8 bg-stone-900 text-stone-400 text-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-stone-800">
            <div>
              <p className="text-stone-200 font-semibold mb-2">Scheune Jonatal</p>
              <p className="text-stone-500 text-xs leading-relaxed">
                Geräumige Scheune zur Vermietung im<br />Jonatal, Wald ZH, Schweiz.
              </p>
            </div>
            <div>
              <p className="text-stone-500 text-xs uppercase tracking-widest mb-3">Navigation</p>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-stone-200 transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-stone-500 text-xs uppercase tracking-widest mb-3">Kontakt</p>
              <a
                href="mailto:info@scheune-jonatal.ch"
                className="hover:text-stone-200 transition-colors duration-200"
              >
                info@scheune-jonatal.ch
              </a>
            </div>
          </div>
          <p className="pt-6 text-stone-600 text-xs">
            © {new Date().getFullYear()} Scheune Jonatal
          </p>
        </div>
      </footer>
    </>
  );
}
