import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Mail, MapPin, Calendar, Users, Plane, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Star, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import './App.css';
import { IMAGES } from './images';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'voyages', name: 'Voyages', tagline: 'Explorer la Tunisie',
    icon: <Plane size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'v1',
        title: 'Le Sud Tunisien en Couleurs',
        description: 'Découvrez le sud de la Tunisie, un autre monde, un autre voyage — ses couleurs, son calme et sa sérénité. Entre calme et authenticité, partez dans un voyage en couleurs, une découverte, un dépaysement. De Tunis à El Jem, de Matmata à Douz, du Chott El Djérid à Tozeur et de Gafsa à Kairouan.',
        price: 'Sur devis',
        duration: '2 jours / 1 nuit',
        seats: 12,
        rating: 4.9,
        reviews: 54,
        image: IMAGES.sahrazarzis,
        highlights: [
          'Transport aller-retour depuis votre hôtel (Grand Tunis ou Hammamet)',
          'Guide professionnel obligatoire',
          'Visite guidée Colisée Romain d\'El Jem (ancienne Tysdrus)',
          'Maison troglodyte à Matmata — découverte du mode de vie berbère',
          'Dîner & nuit à l\'hôtel Sun Palm (ou similaire)',
          'Arrêt photo au Chott El Djérid — le plus grand lac salé de Tunisie',
          'Excursion en calèche dans la Palmeraie de Tozeur',
          'Visite libre à Kairouan',
          'Repas selon programme (Hôtel les Berbères & Restaurant le Soleil)',
          'Excursion facultative à dos de dromadaire (option)',
        ],
        itinerary: [
          'Jour 1 — Départ de votre hôtel → El Jem (Colisée romain) → Matmata via Gabès (maison troglodyte, déjeuner Hôtel les Berbères) → Douz, capitale du désert (dîner & nuit Hôtel Sun Palm)',
          'Jour 2 — Départ tôt → Chott El Djérid (arrêt photo) → Tozeur (calèche oasis, médina, déjeuner Restaurant le Soleil) → Kairouan (visite libre) → Retour hôtel',
        ],
        notIncluded: [
          'Activités ou services supplémentaires non mentionnés dans le programme',
          'Dépenses personnelles (boissons, souvenirs, pourboires)',
          'Assurance voyage ou frais médicaux',
          'Excursion à dos de dromadaire (option)',
        ],
      },
      {
        id: 'v2',
        title: 'Sur les Pas d\'Hannibal Barca',
        description: 'Hannibal, le grand général carthaginois, a fait de l\'histoire entre Rome et Carthage un mystère, une légende et une leçon dans l\'histoire des guerres. Un circuit qui retrace le parcours de ce général — de Carthage à Zama, de Kérkouané à Dougga, de Bullaregia à Zaghouan. La Tunisie punique et romaine dans toute sa splendeur.',
        price: 'Sur devis',
        duration: 'Circuit personnalisé',
        seats: 10,
        rating: 4.8,
        reviews: 31,
        image: IMAGES.mounument1,
        highlights: [
          'Circuit sur les traces d\'Hannibal Barca',
          'Carthage, Zama, Kérkouané, Dougga, Bullaregia, Zaghouan',
          'La Tunisie punique et romaine : Dougga, Thuburbo Majus, Ondna, Jektis, Tyna, Tysdrus, Sicavenera',
          'Mausolées et Saints : Sidi Bougaroun, Sidi Mehrez, Sidi Belhassen, Sidi Ben Arous, Sidi Ibrahim Erriahi',
          'La Tunisie Romano-Musulmane : de Hadrumète à Ruspina, Kairouan, Sabra El Mansouria',
          'Guide expert en histoire punique et romaine',
          'Patrimoine de l\'ancienne Ifriqiya — potentiel unique en Méditerranée',
        ],
      },
      {
        id: 'v3',
        title: 'Du Nord au Sud — La Tunisie vous Accueille',
        description: 'Un patrimoine, une culture, une découverte, un dépaysement. Avec plus de 3000 ans d\'histoire, la Tunisie vous propose une panoplie de circuits culturels, entre archéologie et arts et traditions populaires. De Tunis à Zaghouan, de Oudna à El Fahs, de Chenini à Ksar Ghilane, de Nefza à Ouchtata, de Zraoua à Zmorten, de Ksar Halouf à Ksar Ezzahra, de Sounini à Sejnane, de Menzel Bourguiba à Ousja.',
        price: 'Sur devis',
        duration: 'Multi-jours',
        seats: 15,
        rating: 4.9,
        reviews: 42,
        image: IMAGES.gelta,
        highlights: [
          'Plus de 3000 ans d\'histoire à travers tout le pays',
          'Archéologie & arts et traditions populaires',
          'Circuits Sejnane, Nefza, Menzel Bourguiba',
          'Ksour du sud : Ksar Ghilane, Ksar Halouf, Ksar Ezzahra',
          'De Tunis à Zaghouan, Oudna, El Fahs',
          'Guide spécialisé patrimoine & culture',
          'Hébergements sélectionnés',
        ],
      },
      {
        id: 'v4',
        title: 'La Tunisie Punique et Romaine',
        description: 'Le patrimoine de l\'ancienne Ifriqiya reste un potentiel unique, par rapport à la situation géographique unique du pays. De Dougga à Thuburbo Majus, de Kérkouané à Ondna, de Jektis à Tyna, de Tysdrus à Sicavenera — un circuit qui nous amène vers la découverte et le loisir.',
        price: 'Sur devis',
        duration: 'Circuit personnalisé',
        seats: 12,
        rating: 4.7,
        reviews: 27,
        image: IMAGES.mounument2,
        highlights: [
          'Sites archéologiques majeurs : Dougga, Thuburbo Majus',
          'Kérkouané, Ondna, Jektis, Tyna',
          'Tysdrus (El Jem) et Sicavenera',
          'Guide expert archéologie',
          'Transport inclus',
          'Dégustation cuisine locale',
          'Musées & mosaïques romaines',
          'Itinéraire sur-mesure',
        ],
      },
    ],
  },
  {
    id: 'excursions', name: 'Excursions', tagline: 'Découverte locale',
    icon: <MapPin size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'e1',
        title: 'Tunis Ville Vivante — 1 Journée',
        description: 'Découvrez la capitale avec son charme, ses couleurs et ses monuments. Un voyage dans le temps et dans l\'espace : la plus belle médina du pays, le musée national du Bardo avec la plus grande collection de mosaïques romaines dans le monde, Carthage où Alyssa vous attend, et le pittoresque village de Sidi Bousaïd entre bleu et blanc — le Saint-Tropez de la Tunisie.',
        price: 'Sur devis',
        duration: '1 journée',
        seats: 20,
        rating: 4.9,
        reviews: 89,
        image: IMAGES.mounument4,
        highlights: [
          'Transport aller-retour depuis votre hôtel (Grand Tunis)',
          'Guide professionnel pour toute l\'excursion',
          'Médina de Tunis : souks, labyrinthes, artisans, demeure beylicale',
          'Musée national du Bardo : mosaïques de Dionysos, Ulysse et légendes romaines',
          'Site archéologique de Carthage : amphithéâtre, thermes, quartier punique',
          'Village de Sidi Bousaïd : balade libre, thé à la menthe au Café des Délices',
          'Déjeuner à La Goulette selon programme',
          'Coordination et vérification par le guide',
        ],
        itinerary: [
          'Matin — Départ hôtel → Médina de Tunis (ruelles, souks, demeure beylicale, temps libre)',
          'Midi — Ville du Bardo : visite guidée du Musée national',
          'Après-midi — Départ banlieue nord → Déjeuner La Goulette → Carthage (vestiges puniques)',
          'Fin d\'après-midi — Sidi Bousaïd (balade libre) → Retour hôtel',
        ],
        notIncluded: [
          'Activités ou services supplémentaires non mentionnés',
          'Dépenses personnelles (boissons, souvenirs, pourboires)',
          'Assurance voyage ou frais médicaux',
        ],
      },
      {
        id: 'e2',
        title: 'Médina au Cœur — Demi-Journée',
        description: 'Découvrez notre médina avec ses couleurs et ses parfums, ses impasses et ses labyrinthes, ses ateliers et ses boutiques, ses medersas et ses palais, ses mosquées et ses mausolées, ses artisans et ses artistes. La médina de Tunis, un mystère. Une pause thé avec pâtisserie tunisienne incluse.',
        price: 'Sur devis',
        duration: 'Demi-journée',
        seats: 15,
        rating: 4.8,
        reviews: 64,
        image: IMAGES.bebazrak,
        highlights: [
          'Transport aller-retour depuis votre hôtel (Grand Tunis)',
          'Guide expert médina',
          'Marché central : étals, criées, architecture coloniale',
          'Médina : ruelles, souks, vestiges extérieurs',
          'Accès unique à une demeure beylicale',
          'Pause thé à la menthe & makroud en plein cœur des souks',
          'Découverte du mode de vie et des artisans tunisiens',
        ],
        itinerary: [
          'Départ matin → Marché central (architecture coloniale, ambiance locale)',
          'Médina de Tunis (ruelles, souks, demeure beylicale)',
          'Pause thé & pâtisserie tunisienne dans un café au cœur des souks',
          'Retour hôtel',
        ],
        notIncluded: [
          'Activités ou services supplémentaires non mentionnés',
          'Dépenses personnelles (boissons, souvenirs, pourboires)',
          'Assurance voyage ou frais médicaux',
        ],
      },
      {
        id: 'e3',
        title: 'La Banlieue de Tunis — Carthage & Sidi Bousaïd',
        description: '« Tunis, fille de Carthage » — Retrouvons les traces des Phéniciens carthaginois. Carthage, capitale d\'empire : ses ports puniques, son quartier Magon, sa cathédrale, son théâtre et amphithéâtre, ses thermes et ses vestiges. Entre Sidi Bousaïd el Béji et La Marsa, le bleu méditerranéen, le safsaf et Marsa cube vous attendent.',
        price: 'Sur devis',
        duration: '1 journée',
        seats: 18,
        rating: 4.9,
        reviews: 72,
        image: IMAGES.mounumentjaune,
        highlights: [
          'Transport inclus',
          'Guide archéologue spécialisé',
          'Carthage : ports puniques, quartier Magon, amphithéâtre, thermes',
          'Sidi Bousaïd el Béji : ruelles bleues et blanches, terrasses',
          'La Marsa : le safsaf, Marsa cube, front de mer',
          'Cuisine locale authentique',
          'Temps libre & balade',
        ],
      },
      {
        id: 'e4',
        title: 'Tunis Capitale Culturelle',
        description: 'Un voyage entre sites et monuments, avenues et ruelles, impasses et détours pour découvrir l\'âme de cette belle capitale. De la médina de Tunis à la Cité de la Culture, du Palais Khair-Eddine et la place de la Kasbah, du musée militaire de la Manouba au musée national du Bardo, du marché central à Bab Dzira. De Bab Béhar et Bir Lahjar, de Bab Bnet à Bab Lakwas.',
        price: 'Sur devis',
        duration: '1 journée',
        seats: 20,
        rating: 4.8,
        reviews: 56,
        image: IMAGES.mounument3,
        highlights: [
          'Cité de la Culture',
          'Palais Khair-Eddine & Place de la Kasbah',
          'Musée militaire de la Manouba',
          'Musée national du Bardo',
          'Marché central → Bab Dzira',
          'Bab Béhar, Bir Lahjar, Bab Bnet, Bab Lakwas',
          'Cuisine locale authentique',
          'Guide culturel spécialisé',
        ],
      },
    ],
  },
  {
    id: 'evenement', name: 'Événements', tagline: 'Moments uniques',
    icon: <Calendar size={20} strokeWidth={1.6} />,
    items: [
      { id: 'ev1', title: 'Mariage de Rêve', description: 'De la salle de cérémonie au dîner de gala — chaque détail orchestré avec raffinement pour votre plus beau jour.', price: 'Sur devis', duration: '1 journée', seats: 50, rating: 5.0, reviews: 28, image: IMAGES.fleurbidha, highlights: ['Décoration complète', 'Traiteur partenaire', 'Photographe', 'Coordination totale'] },
      { id: 'ev2', title: 'Conférence Corporate', description: "Espaces équipés, logistique impeccable et gestion de bout en bout pour vos événements d'entreprise.", price: '3 000 TND', duration: '1-3 jours', seats: 100, rating: 4.8, reviews: 19, image: IMAGES.hotelsahra, highlights: ['Matériel AV', 'Catering', 'Accueil', 'Salle premium'] },
      { id: 'ev3', title: 'Anniversaire Privé', description: "Ambiance sur-mesure, DJ, buffet et animations — une célébration que vos invités ne sont pas près d'oublier.", price: '1 500 TND', duration: 'Soirée', seats: 30, rating: 4.9, reviews: 35, image: IMAGES.feudecamp, highlights: ['DJ live', 'Décoration', 'Buffet', 'Animation'] },
      { id: 'ev4', title: 'Gala de Charité', description: 'Collecte de fonds ou soirée de prestige — nous créons un événement qui marque les esprits et les cœurs.', price: '4 000 TND', duration: 'Soirée', seats: 80, rating: 4.7, reviews: 14, image: IMAGES.sahrabidha, highlights: ['Salle prestige', 'Traiteur 5★', 'Animation', 'Logistique'] },
    ],
  },
  {
    id: 'team-building', name: 'Team Building', tagline: 'Cohésion & performance',
    icon: <Users size={20} strokeWidth={1.6} />,
    items: [
      { id: 'tb1', title: 'Aventure Outdoor', description: 'Défis nature, tyroliennes et bivouac — ressoudez votre équipe dans un cadre sauvage et inoubliable.', price: '200 TND/pers', duration: '1-2 jours', seats: 20, rating: 4.8, reviews: 41, image: IMAGES.tawa, highlights: ['Moniteurs certifiés', 'Équipement complet', 'Repas inclus', 'Hébergement optionnel'] },
      { id: 'tb2', title: 'Escape Game Géant', description: "Énigmes, collaboration et adrénaline — un escape game géant qui révèle les leaders et soude les équipes.", price: '150 TND/pers', duration: 'Demi-journée', seats: 30, rating: 4.9, reviews: 67, image: IMAGES.hbal, highlights: ['Scénario exclusif', 'Facilitateur', 'Débriefing', 'Cocktail inclus'] },
      { id: 'tb3', title: 'Cuisine Collaborative', description: "Sous la direction d'un chef, vos équipes cuisinent et partagent un repas gastronomique tunisien ensemble.", price: '120 TND/pers', duration: '3 heures', seats: 25, rating: 4.8, reviews: 53, image: IMAGES.no9ba, highlights: ['Chef expert', 'Tabliers fournis', 'Repas inclus', 'Cuisine locale'] },
      { id: 'tb4', title: 'Challenge Sportif', description: 'Olympiades, relais et tournois — une journée sportive et festive qui transcende les hiérarchies.', price: '180 TND/pers', duration: '1 journée', seats: 50, rating: 4.7, reviews: 38, image: IMAGES.rajel, highlights: ['Animateurs', 'Équipement sport', 'Repas BBQ', 'Trophées'] },
    ],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const SAND = '#C9963E';

const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="stars-row">
    {[1,2,3,4,5].map(i => (
      <Star
        key={i}
        size={size}
        fill={i <= Math.round(rating) ? SAND : 'none'}
        stroke={SAND}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────── */
const EventCard = ({ item, onView, index = 0 }: any) => (
  <div
    className={`event-card anim-fade-up stagger-${Math.min(index + 1, 5)}`}
    onClick={() => onView(item)}
  >
    <div className="card-img-wrapper aspect-4-3">
      <img src={item.image} alt={item.title} className="card-img" />
      <div className="card-img-overlay" />
      <div className="card-badges">
        {item.seats <= 8 && (
          <span className="badge badge-limited">
            <AlertCircle size={10} />
            {item.seats} places restantes
          </span>
        )}
      </div>
      <div className="card-price-tag">
        <span className="card-price-value">{item.price}</span>
        {item.duration && (
          <span className="card-price-duration">/ {item.duration}</span>
        )}
      </div>
    </div>

    <div className="card-body">
      <div className="card-rating-row">
        <Stars rating={item.rating} />
        <span className="card-rating-text">{item.rating} ({item.reviews})</span>
      </div>
      <h3 className="card-title">{item.title}</h3>
      <p className="card-description">
        {item.description.length > 90 ? item.description.slice(0, 90) + '…' : item.description}
      </p>
      <div className="card-meta-row">
        <div className="card-meta-item">
          <Clock size={13} />
          {item.duration}
        </div>
        <div className="card-meta-dot" />
        <div className="card-meta-item">
          <Users size={13} />
          {item.seats} places
        </div>
      </div>
      <button
        className="btn btn-primary card-btn-full"
        onClick={e => { e.stopPropagation(); onView(item); }}
      >
        Voir les détails
        <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   EVENT DETAIL PAGE
───────────────────────────────────────────── */
const EventDetailPage = ({ item, service, onBack, onReserve }: any) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const metaPills = [
    { icon: <Clock size={14} />, label: item.duration },
    { icon: <Users size={14} />, label: `${item.seats} places disponibles` },
    { icon: <Shield size={14} />, label: 'Annulation gratuite 48h' },
    { icon: <CheckCircle size={14} />, label: 'Confirmation immédiate' },
  ];

  const trustItems = [
    { icon: <Shield size={13} />, text: 'Annulation gratuite sous 48h' },
    { icon: <CheckCircle size={13} />, text: 'Confirmation immédiate' },
    { icon: <Star size={13} />, text: `${item.rating}/5 · ${item.reviews} voyageurs satisfaits` },
  ];

  return (
    <div className="detail-page">
      <div className="detail-topbar">
        <button className="btn btn-outline detail-back-btn" onClick={onBack}>
          <ArrowLeft size={14} />
          Retour
        </button>
        <div>
          <span className="badge badge-category">{service.name}</span>
        </div>
      </div>

      <div className="scroll-area detail-scroll">
        <div className="detail-content">
          <div className="detail-hero-img-wrapper aspect-16-9 anim-scale-in">
            <img
              src={item.image}
              alt={item.title}
              onLoad={() => setImgLoaded(true)}
              className={`detail-hero-img ${imgLoaded ? 'detail-hero-img--visible' : 'detail-hero-img--hidden'}`}
            />
          </div>

          <div className="detail-grid">
            <div className="anim-fade-up">
              <div className="detail-rating-row">
                <Stars rating={item.rating} size={14} />
                <span className="detail-rating-value">{item.rating}</span>
                <span className="detail-rating-count">({item.reviews} avis)</span>
              </div>

              <h1 className="detail-title">{item.title}</h1>
              <div className="divider detail-divider" />
              <p className="detail-description">{item.description}</p>

              {item.itinerary && (
                <>
                  <h3 className="detail-highlights-title">Itinéraire</h3>
                  <div className="detail-highlights-grid">
                    {item.itinerary.map((step: string) => (
                      <div key={step} className="detail-highlight-item">
                        <MapPin size={14} className="icon-sand" />
                        {step}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="detail-meta-pills">
                {metaPills.map(({ icon, label }) => (
                  <div key={label} className="detail-meta-pill">
                    <span className="detail-meta-pill-icon">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              <h3 className="detail-highlights-title">Ce qui est inclus</h3>
              <div className="detail-highlights-grid">
                {item.highlights.map((h: string) => (
                  <div key={h} className="detail-highlight-item">
                    <CheckCircle size={14} className="icon-success" />
                    {h}
                  </div>
                ))}
              </div>

              {item.notIncluded && (
                <>
                  <h3 className="detail-highlights-title detail-highlights-title--excluded">Ce qui n'est pas inclus</h3>
                  <div className="detail-highlights-grid">
                    {item.notIncluded.map((h: string) => (
                      <div key={h} className="detail-highlight-item detail-highlight-item--excluded">
                        <AlertCircle size={14} className="icon-muted" />
                        {h}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT — booking card */}
            <div className="booking-card anim-fade-up stagger-2">
              <div className="booking-price-block">
                <div className="booking-price-eyebrow">À partir de</div>
                <div className="booking-price-value">{item.price}</div>
                {item.duration && (
                  <div className="booking-price-sub">par personne · {item.duration}</div>
                )}
              </div>

              {item.seats <= 8 && (
                <div className="booking-limited-alert">
                  <AlertCircle size={15} className="icon-sand" />
                  <span className="booking-limited-text">
                    Plus que {item.seats} places disponibles !
                  </span>
                </div>
              )}

              <button className="btn btn-gold booking-cta-btn" onClick={() => onReserve(item)}>
                <Calendar size={16} />
                Réserver ma place
              </button>

              <button className="btn btn-sky-light" onClick={() => onReserve(item)}>
                <Phone size={14} />
                Demande d'information
              </button>

              <div className="booking-trust">
                {trustItems.map(({ icon, text }) => (
                  <div key={text} className="booking-trust-item">
                    <span className="icon-success">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICE LIST PAGE
───────────────────────────────────────────── */
const ServiceListPage = ({ service, onBack, onViewEvent, onContact, onReserve }: any) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const GAP = 20;
  const items = service.items;
  const maxIdx = Math.max(0, items.length - cardsPerView);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const cols = w >= 960 ? 3 : w >= 620 ? 2 : 1;
      setCardsPerView(cols);
      setCardWidth((w - GAP * (cols - 1)) / cols);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const resolvedCardWidth = cardWidth || 280;

  return (
    <div className="service-page">
      <div className={`service-header service-header--${service.id}`}>
        <div className="service-header-deco" />
        <div className="service-header-inner">
          <div className="service-header-left">
            <button className="btn btn-ghost btn-sm" onClick={onBack}>
              <ArrowLeft size={14} />
              Accueil
            </button>
            <div className="service-header-meta">
              <div className="service-header-eyebrow">Nos offres</div>
              <div className="service-header-title">{service.name}</div>
            </div>
          </div>
          <div className="service-header-actions">
            <button className="btn btn-ghost btn-sm" onClick={onContact}>
              <Phone size={13} />
              Contact
            </button>
            <button className="btn btn-white-accent" onClick={() => onReserve()}>
              <Calendar size={13} />
              Réserver
            </button>
          </div>
        </div>
      </div>

      <div className="service-body">
        <div className="service-controls-row">
          <div className="service-tagline-row">
            <div className="divider" />
            <span className="service-tagline-text">{service.tagline}</span>
          </div>
          <div className="service-nav-arrows">
            <button className="btn btn-icon" onClick={() => setActiveIdx(i => Math.max(i - 1, 0))} disabled={activeIdx === 0}>
              <ChevronLeft size={16} />
            </button>
            <button className="btn btn-icon" onClick={() => setActiveIdx(i => Math.min(i + 1, maxIdx))} disabled={activeIdx >= maxIdx}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              gap: GAP,
              transform: `translateX(-${activeIdx * (resolvedCardWidth + GAP)}px)`,
            }}
          >
            {items.map((item: any, i: number) => (
              <div
                key={item.id}
                className="carousel-slide"
                style={{ width: resolvedCardWidth }}
              >
                <EventCard
                  item={item}
                  onView={onViewEvent}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {items.map((_: any, i: number) => (
            <button
              key={i}
              className={`dot ${i === activeIdx ? 'dot--active' : 'dot--inactive'}`}
              onClick={() => setActiveIdx(Math.min(i, maxIdx))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const HomePage = ({ services, onNavigate, onContact, onReserve }: any) => {
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <div className="home-page">
      <div className="home-overlay" />

      <header className="home-header">
        <img src="/assets/nom.png" alt="CLOUD Travel" className="home-logo" />
        <img src="/assets/slogan.png" alt="Take me there" className="home-slogan" />
        <div className="home-header-divider" />
      </header>

      <main className="home-main">
        <div className="home-categories-grid">
          {services.map((svc: any, i: number) => (
            <div key={svc.id} className={`category-item anim-fade-up stagger-${i + 1}`}>
              <div
                className={`category-sphere category-sphere--${svc.id}`}
                onClick={() => onNavigate(svc.id)}
              >
                {svc.icon}
              </div>
              <span className="category-label">
                {svc.id === 'team-building' ? <>Team<br />Building</> : svc.name}
              </span>
            </div>
          ))}
        </div>

        <div className="home-info-card anim-fade-up stagger-5">
          <div className="home-info-inner">
            <div className="home-info-controls">
              {[
                { fn: () => textRef.current && (textRef.current.scrollTop -= 50), icon: <ChevronLeft size={13} className="rotate-90" /> },
                { fn: () => textRef.current && (textRef.current.scrollTop += 50), icon: <ChevronRight size={13} className="rotate-90" /> },
              ].map(({ fn, icon }, i) => (
                <button key={i} className="home-info-scroll-btn" onClick={fn}>{icon}</button>
              ))}
            </div>
            <div ref={textRef} className="home-info-text-area no-scrollbar">
              <p className="home-info-eyebrow">Services touristiques · El Menzah 6</p>
              <p className="home-info-body">
                CLOUD Travel est une agence de voyage et d'événementiels spécialisée dans les prestations haut de gamme pour particuliers et entreprises.
              </p>
              <p className="home-info-tagline">
                Votre satisfaction est notre priorité — des voyages personnalisés à votre image.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <button className="btn btn-ghost btn-sm" onClick={onContact}>
          <Phone size={13} />
          Contact
        </button>
        <span className="home-footer-phone hide-sm">50 223 232</span>
        <button className="btn btn-primary btn-sm" onClick={onReserve}>
          <Calendar size={13} />
          Réservation
        </button>
      </footer>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONTACT MODAL
───────────────────────────────────────────── */
const ContactModal = ({ onClose }: any) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-box modal-contact" onClick={e => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={onClose}>
        <X size={15} />
      </button>

      <p className="modal-eyebrow">Nous trouver</p>
      <h2 className="modal-title">Contact & Informations</h2>

      <div className="contact-info-list">
        {[
          { icon: <MapPin size={16} />, label: 'Adresse', value: "52, av. d'Afrique El Menzah5-Ariana", colorClass: 'contact-icon-box--sky' },
          { icon: <Phone size={16} />, label: 'Téléphone', value: '50 223 232', colorClass: 'contact-icon-box--green' },
          { icon: <Mail size={16} />, label: 'Email', value: 'contact@cloudtravel.tn', colorClass: 'contact-icon-box--sand' },
        ].map(({ icon, label, value, colorClass }) => (
          <div key={label} className="contact-info-item">
            <div className={`contact-icon-box ${colorClass}`}>{icon}</div>
            <div>
              <p className="contact-label">{label}</p>
              <p className="contact-value">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-note">
        <p>
          Agence spécialisée dans les voyages, excursions, événements et team building — services personnalisés pour particuliers et entreprises.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   RESERVATION MODAL
───────────────────────────────────────────── */
const ReservationModal = ({ onClose, formData, setFormData, onSubmit }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-reservation" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={15} />
        </button>

        <p className="modal-eyebrow">Planifier votre expérience</p>
        <h2 className="reservation-title">Demande de Réservation</h2>

        {formData.eventTitle && (
          <div className="badge-event-title">
            <CheckCircle size={12} />
            {formData.eventTitle}
          </div>
        )}

        <form onSubmit={onSubmit} className="reservation-form">
          <div className="form-row-2">
            <div>
              <label className="field-label field-label-required">Nom complet</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Votre nom" className="field-input" />
            </div>
            <div>
              <label className="field-label field-label-required">Téléphone</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+216 XX XXX" className="field-input" />
            </div>
          </div>

          <div>
            <label className="field-label field-label-required">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" className="field-input" />
          </div>

          <div className="form-row-2">
            <div>
              <label className="field-label field-label-required">Service</label>
              <select name="service" value={formData.service} onChange={handleChange} required className="field-input">
                <option value="">Choisir…</option>
                {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label field-label-required">Participants</label>
              <input name="participants" type="number" min="1" max="100" value={formData.participants} onChange={handleChange} required placeholder="1" className="field-input" />
            </div>
          </div>

          <div>
            <label className="field-label field-label-required">Date souhaitée</label>
            <input  name="date" type="date" value={formData.date} onChange={handleChange} required className="field-input" />
          </div>

          <div>
            <label className="field-label">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Précisez vos attentes, contraintes particulières…" className="field-input field-textarea" />
          </div>

          <div className="form-trust-row">
            <span className="form-trust-item">
              <Shield size={12} className="icon-success" /> Annulation gratuite
            </span>
            <span className="form-trust-item">
              <CheckCircle size={12} className="icon-success" /> Réponse sous 24h
            </span>
          </div>

          <button type="submit" className="btn btn-gold form-submit-btn">
            <Calendar size={16} />
            Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
function App() {
  const [page, setPage] = useState('home');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showContact, setShowContact] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: '', participants: 1, eventTitle: '',
  });

  const openReservation = useCallback((item: any) => {
    if (item && typeof item === 'object') {
      setFormData(prev => ({
        ...prev,
        service: selectedService?.id || '',
        eventTitle: item.title || '',
      }));
    } else if (typeof item === 'string') {
      setFormData(prev => ({ ...prev, service: item, eventTitle: '' }));
    }
    setShowReservation(true);
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demande envoyée ! Nous vous contacterons sous 24h.');
    setShowReservation(false);
    setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '', participants: 1, eventTitle: '' });
  };

  const goToService = (id: string) => {
    setSelectedService(SERVICES.find(s => s.id === id));
    setPage('service');
  };

  const goToDetail = (item: any) => {
    setSelectedEvent(item);
    setPage('detail');
  };

  const goHome = () => {
    setPage('home');
    setSelectedService(null);
    setSelectedEvent(null);
  };

  const goBackToService = () => {
    setPage('service');
    setSelectedEvent(null);
  };

  return (
    <div className="app-root">
      {page === 'home' && (
        <HomePage
          services={SERVICES}
          onNavigate={goToService}
          onContact={() => setShowContact(true)}
          onReserve={() => openReservation(null)}
        />
      )}

      {page === 'service' && selectedService && (
        <ServiceListPage
          service={selectedService}
          onBack={goHome}
          onViewEvent={goToDetail}
          onContact={() => setShowContact(true)}
          onReserve={() => openReservation(selectedService.id)}
        />
      )}

      {page === 'detail' && selectedEvent && selectedService && (
        <EventDetailPage
          item={selectedEvent}
          service={selectedService}
          onBack={goBackToService}
          onReserve={openReservation}
        />
      )}

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showReservation && (
        <ReservationModal
          onClose={() => setShowReservation(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;