"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Objekt", href: "#objekt" },
  { label: "Details", href: "#details" },
  { label: "Lage", href: "#lage" },
  { label: "Kontakt", href: "#kontakt" },
];

const FEATURES = [
  {
    icon: "▭",
    title: "Großzügige Fläche",
    body: "Weitläufige Grundfläche, die Raum für Maschinen, Tiere und Erntegut bietet.",
  },
  {
    icon: "⬡",
    title: "Stabile Bausubstanz",
    body: "Solides Gebäude in gepflegtem Zustand – bereit für den sofortigen Einsatz.",
  },
  {
    icon: "◎",
    title: "Strom & Wasser",
    body: "Strom- und Wasseranschlüsse vorhanden. Weitere Versorgungsleitungen nach Absprache.",
  },
  {
    icon: "↔",
    title: "Gute Zufahrt",
    body: "Breite Zufahrt für landwirtschaftliche Fahrzeuge und LKW.",
  },
];

export default function Home() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    // Replace with your own form handler / email service (e.g. Resend, Formspree)
    setSubmitted(true);
  }

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f6f0]/90 backdrop-blur border-b border-stone-200">
        <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-stone-800">
            Scheune Jonathal
          </span>
          <ul className="hidden sm:flex gap-7 text-sm text-stone-600">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-stone-900 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            className="text-sm bg-stone-800 text-stone-50 px-4 py-1.5 rounded-full hover:bg-stone-700 transition-colors"
          >
            Anfrage senden
          </a>
        </nav>
      </header>

      <main className="pt-14">
        {/* ── HERO ────────────────────────────────────────── */}
        <section
          id="objekt"
          className="relative min-h-[92vh] flex items-end bg-stone-800 overflow-hidden"
        >
          {/* Placeholder bg — replace src with a real photo once available */}
          <div
            aria-hidden
            className="absolute inset-0 bg-stone-700"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(0,0,0,.04) 40px, rgba(0,0,0,.04) 80px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
            <p className="text-stone-300 text-sm uppercase tracking-widest mb-3">
              Jonathal, Wald ZH
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight max-w-2xl">
              Scheune zur<br />Vermietung
            </h1>
            <p className="mt-5 text-stone-300 text-lg max-w-xl leading-relaxed">
              Geräumige, gut erhaltene Scheune im Jonathal bei Wald ZH — ideal
              für Landwirtschaft, Lagerung und mehr. Langfristige Vermietung
              bevorzugt.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="bg-white text-stone-900 px-6 py-3 rounded-full font-medium hover:bg-stone-100 transition-colors"
              >
                Jetzt anfragen
              </a>
              <a
                href="#details"
                className="border border-white/40 text-white px-6 py-3 rounded-full font-medium hover:border-white/80 transition-colors"
              >
                Details ansehen
              </a>
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────── */}
        <section id="details" className="py-24 bg-[#f8f6f0]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">
              Ausstattung
            </p>
            <h2 className="text-3xl font-bold text-stone-800 mb-12">
              Was Sie erwartet
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl text-stone-400 mb-4 block">
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
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl p-5 border border-stone-100"
                >
                  <p className="text-2xl font-bold text-stone-800">{s.value}</p>
                  <p className="text-stone-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION ────────────────────────────────────── */}
        <section id="lage" className="py-24 bg-stone-100">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">
                Lage
              </p>
              <h2 className="text-3xl font-bold text-stone-800 mb-5">
                Idyllische Lage im Jonathal
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Das Jonathal liegt in der Gemeinde Wald im Zürcher Oberland —
                eingebettet in die hügelige Landschaft des Kantons Zürich, ruhig
                und doch gut erreichbar.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Die ländliche Lage bietet optimale Voraussetzungen für
                landwirtschaftliche Betriebe und schafft genug Abstand zu
                Wohnbebauung für einen störungsfreien Betrieb.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-video">
              <iframe
                title="Karte Jonathal, Wald ZH"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.87%2C47.26%2C8.98%2C47.30&layer=mapnik"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────── */}
        <section id="kontakt" className="py-24 bg-[#f8f6f0]">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">
                Kontakt
              </p>
              <h2 className="text-3xl font-bold text-stone-800 mb-5">
                Interesse geweckt?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                Senden Sie uns Ihre Anfrage — wir melden uns innerhalb von 24
                Stunden. Besichtigungen sind selbstverständlich möglich.
              </p>
              <div className="space-y-4 text-stone-700 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-base">
                    @
                  </span>
                  <span>info@scheune-jonathal.ch</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-base">
                    ✆
                  </span>
                  <span>Telefonnummer auf Anfrage</span>
                </div>
              </div>
            </div>

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
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 transition-colors bg-stone-50"
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
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 transition-colors bg-stone-50"
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
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 transition-colors bg-stone-50"
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
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-stone-400 transition-colors bg-stone-50 resize-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full bg-stone-800 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-colors text-sm"
                >
                  Anfrage absenden
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="py-8 bg-stone-900 text-stone-400 text-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} Scheune Jonathal</span>
          <span>Jonathal, Wald ZH, Schweiz</span>
        </div>
      </footer>
    </>
  );
}
