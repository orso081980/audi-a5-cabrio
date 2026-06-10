import { useState, useEffect, useRef } from "react";
import carData from "./data/car.json";

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    display: <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>,
    map: <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>,
    wifi: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></>,
    lightbulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>,
    speaker: <><rect width="16" height="20" x="4" y="2" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" x2="12.01" y1="6" y2="6"/></>,
    smartphone: <><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></>,
    chair: <><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></>,
    thermometer: <><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></>,
    fire: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    key: <><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></>,
    wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></>,
    palette: <><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    parking: <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>,
    camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>,
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    battery: <><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/><line x1="6" x2="6" y1="11" y2="13"/><line x1="10" x2="10" y1="11" y2="13"/></>,
    gauge: <><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></>,
    wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    circle: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    badge: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17.5Z"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    menu: <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></>,
    check: <polyline points="20 6 9 12 4 9"/>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || icons.info}
    </svg>
  );
};

// ─── Category tab labels ─────────────────────────────────────────────────────
const CATEGORY_LABELS = {
  technology: "Tecnologia",
  comfort: "Comfort",
  safety: "Sicurezza",
  driving: "Guida",
  warranty: "Garanzia",
};

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ value, label, sub }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    {sub && <div className="stat-sub">{sub}</div>}
  </div>
);

// ─── Feature Card ────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`feature-card ${open ? "open" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => setOpen(!open)}
    >
      <div className="feature-card-header">
        <div className="feature-icon-wrap">
          <Icon name={feature.icon} size={18} />
        </div>
        <span className="feature-name">{feature.name}</span>
        <span className={`chevron ${open ? "rotated" : ""}`}>
          <Icon name="chevronDown" size={16} />
        </span>
      </div>
      {open && (
        <div className="feature-desc">{feature.description}</div>
      )}
    </div>
  );
};

// ─── Photo Placeholder ───────────────────────────────────────────────────────
const PhotoSlot = ({ label, index }) => (
  <div className="photo-slot" style={{ animationDelay: `${index * 80}ms` }}>
    <div className="photo-placeholder">
      <Icon name="image" size={28} />
      <span>{label}</span>
    </div>
  </div>
);

// ─── Section heading ─────────────────────────────────────────────────────────
const SectionHeading = ({ eyebrow, title }) => (
  <div className="section-heading">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <div className="heading-rule" />
  </div>
);

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("technology");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const car = carData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specifiche" },
    { id: "features", label: "Dotazioni" },
    { id: "gallery", label: "Galleria" },
    { id: "contact", label: "Contatto" },
  ];

  return (
    <div className="app">
      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-brand">
            <span className="brand-rings">⬡</span>
            <span className="brand-text">A5 Cabriolet</span>
          </div>
          <ul className="nav-links desktop">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollTo(l.id)}>{l.label}</button>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollTo("contact")}>
            Richiedi Info
          </button>
          <button className="nav-burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="hero" id="overview">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Icon name="star" size={13} />
            <span>Immatricolata 2025 · Km 0 Usata</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-make">Audi</span>
            <span className="hero-model">A5 Cabriolet</span>
            <span className="hero-variant">Business Edition S line</span>
          </h1>
          <p className="hero-tagline">
            Nero mythos metallizzato · Capote rossa · MHEV 150 CV S tronic
          </p>
          <div className="hero-pills">
            {car.standard_equipment_highlights.slice(0, 6).map((h) => (
              <span key={h} className="pill">{h}</span>
            ))}
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              <Icon name="phone" size={16} />
              Contattami
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("features")}>
              Scopri le Dotazioni
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scorri</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── QUICK STATS ─────────────────────────────────────────── */}
      <section className="stats-bar">
        <StatCard value="150 CV" label="Potenza" sub="110 kW · 35 TFSI" />
        <StatCard value="MHEV" label="Tecnologia" sub="Mild Hybrid" />
        <StatCard value="7.2 L" label="Consumo" sub="per 100 km (WLTP)" />
        <StatCard value="S tronic" label="Cambio" sub="Doppia frizione" />
        <StatCard value={'19"'} label="Cerchi" sub="Parallel lega leggerà" />
        <StatCard value="2025" label="Immatricolazione" sub="Prima registrazione" />
      </section>

      {/* ── SPECS ───────────────────────────────────────────────── */}
      <section className="section specs-section" id="specs">
        <div className="container">
          <SectionHeading eyebrow="Motore & Tecnica" title="Specifiche Tecniche" />
          <div className="specs-grid">
            {/* Engine */}
            <div className="specs-block">
              <h3 className="specs-block-title">Motore</h3>
              <dl className="specs-list">
                <div className="spec-row"><dt>Codice motore</dt><dd>{car.engine.code}</dd></div>
                <div className="spec-row"><dt>Cilindrata</dt><dd>{car.engine.displacement}</dd></div>
                <div className="spec-row"><dt>Potenza</dt><dd>{car.engine.power_kw} kW / {car.engine.power_hp} CV</dd></div>
                <div className="spec-row"><dt>Cambio</dt><dd>{car.engine.transmission}</dd></div>
                <div className="spec-row"><dt>Tecnologia</dt><dd>{car.engine.technology}</dd></div>
                <div className="spec-row"><dt>Alimentazione</dt><dd>{car.engine.fuel}</dd></div>
                <div className="spec-row"><dt>Euro</dt><dd>{car.engine.emission_standard}</dd></div>
              </dl>
            </div>

            {/* Consumptions */}
            <div className="specs-block">
              <h3 className="specs-block-title">Consumi & Emissioni (WLTP)</h3>
              <dl className="specs-list">
                <div className="spec-row"><dt>Consumo combinato</dt><dd>{car.performance.fuel_consumption_combined}</dd></div>
                <div className="spec-row"><dt>CO₂ combinato</dt><dd>{car.performance.co2_emissions_combined}</dd></div>
                <div className="spec-row"><dt>Serbatoio</dt><dd>{car.performance.fuel_tank_litres} L</dd></div>
              </dl>

              <h3 className="specs-block-title" style={{ marginTop: "2rem" }}>Carrozzeria</h3>
              <dl className="specs-list">
                <div className="spec-row"><dt>Tipo</dt><dd>Cabriolet</dd></div>
                <div className="spec-row"><dt>Anno modello</dt><dd>{car.year}</dd></div>
                <div className="spec-row"><dt>Immatricolazione</dt><dd>{car.immatriculation}</dd></div>
                <div className="spec-row"><dt>Variante</dt><dd>{car.variant}</dd></div>
              </dl>
            </div>

            {/* Exterior + Interior */}
            <div className="specs-block">
              <h3 className="specs-block-title">Colori & Interni</h3>
              <dl className="specs-list">
                <div className="spec-row"><dt>Colore esterno</dt><dd>{car.exterior.color}</dd></div>
                <div className="spec-row"><dt>Capote</dt><dd>{car.exterior.roof}</dd></div>
                <div className="spec-row"><dt>Cornici finestre</dt><dd>{car.exterior.window_frames}</dd></div>
                <div className="spec-row highlight"><dt>Sedili</dt><dd>{car.interior.seat_material}</dd></div>
                <div className="spec-row"><dt>Rivestimento</dt><dd>{car.interior.seats}</dd></div>
                <div className="spec-row"><dt>Cruscotto</dt><dd>{car.interior.dashboard}</dd></div>
                <div className="spec-row"><dt>Moquette</dt><dd>{car.interior.carpet}</dd></div>
                <div className="spec-row"><dt>Cielo</dt><dd>{car.interior.headliner}</dd></div>
                <div className="spec-row"><dt>Inserti decorativi</dt><dd>{car.interior.decorative_inserts}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section className="section features-section" id="features">
        <div className="container">
          <SectionHeading eyebrow="Dotazioni di Serie e Optional" title="Equipaggiamento Completo" />

          {/* Category Tabs */}
          <div className="category-tabs">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`tab-btn ${activeCategory === key ? "active" : ""}`}
                onClick={() => setActiveCategory(key)}
              >
                {label}
                <span className="tab-count">{car.features[key]?.length}</span>
              </button>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="features-grid">
            {(car.features[activeCategory] || []).map((feat, i) => (
              <FeatureCard key={feat.name} feature={feat} index={i} />
            ))}
          </div>

          {/* All highlights strip */}
          <div className="highlights-strip">
            {car.standard_equipment_highlights.map((h) => (
              <div key={h} className="highlight-item">
                <Icon name="check" size={14} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────── */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <SectionHeading eyebrow="Foto del Veicolo" title="Galleria Fotografica" />
          <p className="gallery-note">
            <Icon name="info" size={15} />
            Carica qui le tue foto — gli slot sono pronti ad accoglierle.
          </p>
          <div className="gallery-grid">
            <PhotoSlot label="Vista frontale" index={0} />
            <PhotoSlot label="Vista laterale S" index={1} />
            <PhotoSlot label="Vista posteriore" index={2} />
            <PhotoSlot label="Abitacolo" index={3} />
            <PhotoSlot label="Cruscotto" index={4} />
            <PhotoSlot label="Capote aperta" index={5} />
            <PhotoSlot label={'Cerchi 19"'} index={6} />
            <PhotoSlot label="Dettaglio S line" index={7} />
          </div>
        </div>
      </section>

      {/* ── CONDITION ───────────────────────────────────────────── */}
      <section className="section condition-section">
        <div className="container">
          <SectionHeading eyebrow="Stato del Veicolo" title="Condizioni" />
          <div className="condition-grid">
            {[
              { label: "Chilometraggio", value: "— km", note: "Inserisci i km attuali" },
              { label: "Stato carrozzeria", value: "Eccellente", note: "Nessun graffio / ammaccatura" },
              { label: "Tagliandi", value: "In regola", note: "Libro tagliandi disponibile" },
              { label: "Pneumatici", value: "Perfetti", note: "255/35 R19 96Y XL" },
              { label: "Revisione", value: "—", note: "Inserisci la data" },
              { label: "Garanzia", value: "3 anni / 120.000 km", note: "Garanzia costruttore attiva" },
            ].map((item) => (
              <div key={item.label} className="condition-card">
                <div className="condition-dot" />
                <div className="condition-label">{item.label}</div>
                <div className="condition-value">{item.value}</div>
                <div className="condition-note">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section className="section contact-section" id="contact">
        <div className="container contact-inner">
          <div className="contact-left">
            <SectionHeading eyebrow="Sei interessato?" title="Parliamone" />
            <p className="contact-desc">
              Sono disponibile per rispondere a ogni domanda, organizzare un test drive
              o concordare la visione del veicolo. Contattami direttamente.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Icon name="phone" size={18} />
                <span>+39 392 644 9095</span>
              </div>
              <div className="contact-info-item">
                <Icon name="mail" size={18} />
                <span>ctn.marco@hotmail.it</span>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-card">
              <div className="contact-car-summary">
                <div className="contact-car-name">
                  <strong>Audi A5 Cabriolet</strong> · {car.year}
                </div>
                <div className="contact-car-detail">
                  {car.variant} · {car.engine.power_hp} CV · {car.engine.technology}
                </div>
                <div className="contact-car-color">
                  <span className="color-swatch" />
                  {car.exterior.color}
                </div>
              </div>
              <div className="price-area">
                <div className="price-label">Prezzo</div>
                <div className="price-value">Su richiesta</div>
                <div className="price-sub">Trattativa riservata · IVA inclusa</div>
              </div>
              <a href="mailto:ctn.marco@hotmail.it" className="btn-primary full-width">
                <Icon name="mail" size={16} />
                Invia una email
              </a>
              <a href="tel:+393926449095" className="btn-ghost full-width">
                <Icon name="phone" size={16} />
                Chiama ora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-rings">⬡</span>
            <span>Audi A5 Cabriolet · 2023</span>
          </div>
          <div className="footer-note">
            Annuncio privato · Documento originale disponibile · Immatricolata 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
