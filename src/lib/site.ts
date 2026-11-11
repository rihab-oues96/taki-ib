export const SITE = {
  name: "Taki Academy International School",
  short: "Taki Academy",
  url: "https://ibtakiacademyschool.com",
  phone: "70 024 835",
  phoneHref: "tel:+21670024835",
  email: "contact@ibtakiacademyschool.com",
  address: "Sahloul 4, Sousse, Tunisie",
  mapQuery: "Taki Academy International School Sahloul Sousse",
  preRegistration: "https://ibtakiacademyschool.com/en/admission",
  studentPortal: "https://ib.webschool.tn/student/login",
  parentPortal: "https://ib.webschool.tn/parent/login",
  heroVideoId: "JKW2o7yF1es",
  filmVideoId: "qPMY26lwvew",
  social: {
    facebook: "https://www.facebook.com/TakiAcademy.International/",
    instagram: "https://www.instagram.com/takiacademy.international/",
    youtube: "https://www.youtube.com/@TakiAcademy.International",
    linkedin: "https://www.linkedin.com/company/takiacademy-international-school",
  },
} as const;

export const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Notre mission", href: "/mission" },
  {
    label: "Programmes",
    href: "/middle-education-program",
    children: [
      { label: "Programme d'éducation intermédiaire (PEI)", href: "/middle-education-program" },
      { label: "Programme du diplôme (DP)", href: "/diploma-program" },
    ],
  },
  { label: "Vie scolaire", href: "/scholar-life" },
  { label: "Notre équipe", href: "/notre-equipe" },
  { label: "Politiques", href: "/establishment-policies" },
  { label: "Actualités", href: "/actuality" },
  { label: "Contact", href: "/contact-us" },
] as const;

export const FACILITIES = [
  "28 salles de classe sur 4 étages",
  "Cour centrale",
  "Bibliothèque",
  "Salle d'arts plastiques",
  "Salle multimédia",
  "Salle de sport",
  "Laboratoires",
  "Cantine",
];

export const SUBJECT_GROUPS = [
  "Langue et littérature",
  "Acquisition de langues",
  "Individus et sociétés",
  "Sciences",
  "Mathématiques",
  "Arts",
  "Design",
  "Éducation physique et à la santé",
];

export const LEARNER_PROFILE = [
  "Chercheurs",
  "Informés",
  "Penseurs",
  "Communicatifs",
  "Intègres",
  "Ouverts d'esprit",
  "Altruistes",
  "Audacieux",
  "Équilibrés",
  "Réfléchis",
];

export const FAQ = [
  {
    q: "Qu'est-ce que Taki Academy International School ?",
    a: "Un collège et lycée privé situé à Sahloul, Sousse, construit autour du Baccalauréat International (IB). Il propose le Programme d'éducation intermédiaire (PEI) et le Programme du diplôme de l'IB (DP) dans un cadre multiculturel.",
  },
  {
    q: "Qu'est-ce que l'IB ?",
    a: "Le Baccalauréat International est une fondation éducative à but non lucratif. Ses programmes visent à développer chez les jeunes la curiosité intellectuelle, les connaissances et la sensibilité, et à les aider à bâtir un monde plus juste et plus pacifique grâce au respect interculturel.",
  },
  {
    q: "Quels programmes de l'IB Taki Academy propose-t-elle ?",
    a: "Le Programme d'éducation intermédiaire (PEI) pour les élèves de 11 à 16 ans, et le Programme du diplôme (DP).",
  },
  {
    q: "Comment suivre les progrès de mon enfant ?",
    a: "Grâce à la plateforme Web School de l'établissement, les parents et les élèves peuvent suivre les présences, les notes et les bulletins, les devoirs, ainsi que les messages échangés avec l'équipe.",
  },
  {
    q: "Comment inscrire mon enfant ?",
    a: "Commencez par la pré-inscription en ligne : choisissez le type d'inscription, remplissez la fiche de renseignements de votre enfant et celle du premier responsable légal, puis envoyez les données. Vous pouvez aussi contacter l'équipe des admissions ou réserver d'abord une visite de l'école.",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  /** "L'essentiel" box shown above the text. */
  keyPoints?: string[];
  readMinutes?: number;
  sections: {
    heading: string;
    body: string[];
    table?: { head: [string, string]; rows: [string, string, string][] };
  }[];
  /** Pull quote shown after the last section. */
  quote?: string;
};

export const POSTS: Post[] = [
  {
    slug: "preparation-optimale-au-bac",
    title: "Une préparation optimale au baccalauréat",
    date: "2023-01-14",
    category: "Conseils d'étude",
    excerpt:
      "Technologie, bien-être et gestion du temps : des idées pratiques pour les élèves et les professionnels qui veulent rester concentrés et adaptables.",
    image: "/media/building.jpg",
    sections: [
      {
        heading: "Les tendances technologiques",
        body: [
          "Des avancées comme l'intelligence artificielle, la réalité augmentée et la 5G transforment le quotidien et des secteurs comme la santé et l'éducation.",
          "La technologie évoluant très vite, rester informé et savoir s'adapter est la meilleure préparation, pour les individus comme pour les organisations.",
        ],
      },
      {
        heading: "La méditation pour les élèves",
        body: [
          "La méditation peut aider les élèves à gérer le stress, à affiner leur concentration et à préserver leur santé physique et mentale.",
          "Commencez par quelques minutes par jour, installez l'habitude progressivement et aménagez un espace calme pour la pratique.",
        ],
      },
      {
        heading: "Apprentissage en ligne et gestion du temps",
        body: [
          "L'apprentissage en ligne offre souplesse et personnalisation, même si l'isolement et l'automotivation restent de vrais défis.",
          "Des objectifs clairs, une planification quotidienne, des pauses régulières et des techniques comme Pomodoro ou la matrice d'Eisenhower aident à transformer les bonnes intentions en habitudes durables.",
        ],
      },
    ],
  },
  {
    slug: "la-rentree-scolaire-2024-2025",
    title: "Bien préparer la rentrée scolaire",
    date: "2023-01-14",
    category: "Guide des familles",
    excerpt:
      "Comment se préparer mentalement, matériellement et pratiquement pour aborder la rentrée en toute confiance.",
    image: "/media/atrium.jpg",
    sections: [
      {
        heading: "Se préparer mentalement",
        body: [
          "Facilitez progressivement la transition depuis les vacances, avec des horaires réguliers de sommeil et de repas et suffisamment de repos.",
        ],
      },
      {
        heading: "Se préparer matériellement",
        body: [
          "Fournitures, livres et vêtements représentent un budget conséquent ; anticiper aide les familles à étaler l'effort et le coût.",
        ],
      },
      {
        heading: "Se fixer des objectifs",
        body: [
          "Définissez ce que l'élève souhaite accomplir, puis construisez un emploi du temps clair pour les révisions. Commencer tôt par une relecture des leçons du trimestre précédent pose des bases solides et réduit le stress.",
        ],
      },
    ],
  },
  {
    slug: "vie-etudiante-et-bien-etre",
    title: "Équilibre et bien-être au quotidien",
    date: "2023-01-14",
    category: "Vie scolaire",
    excerpt:
      "Sport, clubs, créativité et temps de repos : comment trouver l'équilibre entre exigence scolaire et épanouissement personnel.",
    image: "/media/students.jpg",
    sections: [
      {
        heading: "Un emploi du temps équilibré",
        body: [
          "Alterner temps d'étude, activités et moments de repos aide les élèves à rester motivés et à mieux retenir ce qu'ils apprennent.",
        ],
      },
      {
        heading: "Clubs et activités",
        body: [
          "Sport, arts, service à la communauté : les activités extrascolaires développent la confiance en soi, le sens du collectif et la curiosité.",
        ],
      },
      {
        heading: "Le rôle des familles",
        body: [
          "Un dialogue régulier avec l'école et un cadre serein à la maison permettent d'accompagner chaque élève dans la durée et de repérer tôt les difficultés.",
        ],
      },
    ],
  },
  {
    slug: "choisir-le-programme-du-diplome",
    title: "Le IB est-il le bon choix pour votre enfant ?",
    date: "2023-01-14",
    category: "Articles",
    excerpt:
      "Choisir le parcours éducatif idéal est une décision cruciale pour les parents. Au-delà des options traditionnelles, le Baccalauréat International offre une approche unique qui mérite d'être considérée.",
    image: "/media/about/classes.jpg",
    readMinutes: 4,
    keyPoints: [
      "Un apprentissage basé sur la recherche, pas sur la mémorisation.",
      "Des élèves ouverts sur le monde et sûrs d'eux.",
      "Des matières reliées entre elles, comme dans la vraie vie.",
    ],
    sections: [
      {
        heading: "La différence IB\u00a0: une approche holistique",
        body: [
          "Les écoles IB privilégient le développement d'individus complets, et pas seulement l'obtention de bonnes notes. Le programme encourage la pensée critique, la citoyenneté mondiale et l'amour de l'apprentissage tout au long de la vie.",
          "Au lieu de la mémorisation par cœur, les élèves s'engagent dans un apprentissage basé sur la recherche\u00a0: ils explorent leur curiosité et relient les matières de manière significative.",
        ],
      },
      {
        heading: "IB ou enseignement traditionnel\u00a0?",
        body: [],
        table: {
          head: ["Programme IB", "Enseignement traditionnel"],
          rows: [
            ["Style d'apprentissage", "Recherche active, exploration dirigée par l'élève", "Enseignement direct, programme fixe"],
            ["Conscience mondiale", "Perspectives internationales et interculturelles", "Orientation souvent plus locale"],
            ["Compétences", "Pensée critique, résolution de problèmes, communication", "Connaissances théoriques, tests standardisés"],
            ["Développement personnel", "Apprentissage socio-émotionnel, éthique, responsabilité", "Surtout la réussite scolaire"],
            ["Programme", "Matières reliées, apprentissage cohérent", "Matières enseignées séparément"],
          ],
        },
      },
      {
        heading: "Choisir la meilleure option",
        body: [
          "Les écoles traditionnelles offrent une base solide, mais le IB permet aux élèves de devenir des apprenants curieux et ouverts sur le monde. Tenez compte du style d'apprentissage de votre enfant, de ses intérêts et de ses aspirations.",
        ],
      },
    ],
    quote:
      "Une éducation IB dote les élèves non seulement de connaissances, mais aussi des compétences et de l'état d'esprit nécessaires pour s'épanouir dans un monde en constante évolution.",
  },
  {
    slug: "lire-et-rechercher-a-la-bibliotheque",
    title: "La bibliothèque, au cœur de l'apprentissage",
    date: "2023-01-14",
    category: "Ressources",
    excerpt:
      "Lecture, recherche documentaire et travail en autonomie : comment tirer le meilleur parti de la bibliothèque.",
    image: "/media/about/library.jpg",
    sections: [
      {
        heading: "Un lieu de calme",
        body: [
          "Un espace propice à la concentration, pour lire, réviser et préparer les travaux de recherche.",
        ],
      },
      {
        heading: "Apprendre à chercher",
        body: [
          "Savoir trouver, évaluer et citer ses sources est une compétence essentielle, notamment pour le mémoire.",
        ],
      },
    ],
  },
  {
    slug: "sciences-et-laboratoires",
    title: "Les sciences par l'expérience",
    date: "2023-01-14",
    category: "Vie scolaire",
    excerpt:
      "Observer, manipuler, comprendre : les laboratoires rendent les sciences concrètes et stimulantes.",
    image: "/media/about/labs.jpg",
    sections: [
      {
        heading: "Apprendre en manipulant",
        body: [
          "Les travaux pratiques donnent du sens aux notions vues en classe et développent la rigueur scientifique.",
        ],
      },
      {
        heading: "Des projets collaboratifs",
        body: [
          "Les élèves apprennent à formuler des hypothèses, à travailler en équipe et à présenter leurs résultats.",
        ],
      },
    ],
  },
  {
    slug: "sport-et-creativite",
    title: "Sport et créativité : deux atouts pour réussir",
    date: "2023-01-14",
    category: "Vie scolaire",
    excerpt:
      "Activités sportives et artistiques contribuent à la confiance en soi et à la réussite scolaire.",
    image: "/media/about/sport.jpg",
    sections: [
      {
        heading: "Bouger pour mieux apprendre",
        body: [
          "L'activité physique améliore la concentration, réduit le stress et renforce l'esprit d'équipe.",
        ],
      },
      {
        heading: "Exprimer sa créativité",
        body: [
          "Arts plastiques, musique et théâtre permettent aux élèves de s'exprimer et de découvrir de nouveaux talents.",
        ],
      },
    ],
  },
];

export const TESTIMONIAL_VIDEOS = [
  { id: "TjrD83svhS4", title: "Témoignage vidéo - Taki Academy", vertical: false },
  { id: "f97IE_F4wMY", title: "Témoignage vidéo (short) - Taki Academy", vertical: true },
  { id: "S561rHrh4Nw", title: "Témoignage vidéo (short 2) - Taki Academy", vertical: true },
];

export const TESTIMONIALS = [
  {
    name: "Said Ben Amor",
    photo: null as string | null, // photo réelle à ajouter plus tard
    quote: "Excellent collège IB, avec un programme rigoureux et un accompagnement exceptionnel.",
  },
  {
    name: "Nadia Ben Hadj Ali",
    photo: null as string | null, // photo réelle à ajouter plus tard
    quote:
      "Une éducation équilibrée qui encourage la curiosité, l'esprit critique et la responsabilité sociale.",
  },
  {
    name: "Donia Mili",
    photo: null as string | null, // photo réelle à ajouter plus tard
    quote: "Une école qui offre un apprentissage moderne et un impact remarquable sur le développement des élèves.",
  },
];

/**
 * Organigramme de l'école, du haut vers le bas.
 * `name` est laissé vide : renseignez-le (et ajoutez `photo`) plus tard.
 */
export type TeamMember = { role: string; desc?: string; name?: string; photo?: string };
export type TeamLevel = { title: string; intro: string; members: TeamMember[] };

export const TEAM: TeamLevel[] = [
  {
    title: "Direction générale",
    intro: "Elle porte la vision de l'école et garantit la fidélité aux valeurs de l'IB.",
    members: [
      { role: "Directeur / Directrice générale", desc: "Pilotage stratégique et représentation de l'établissement." },
    ],
  },
  {
    title: "Direction de l'établissement",
    intro: "Elle assure la bonne marche pédagogique et administrative de l'école.",
    members: [
      { role: "Directeur pédagogique", desc: "Qualité de l'enseignement et suivi des équipes." },
      { role: "Directeur administratif et financier", desc: "Gestion administrative, financière et ressources humaines." },
    ],
  },
  {
    title: "Coordination IB",
    intro: "Elle met en œuvre les programmes de l'IB et accompagne les enseignants.",
    members: [
      { role: "Coordinateur du PEI", desc: "Programme d'éducation intermédiaire, de 11 à 16 ans." },
      { role: "Coordinateur du DP", desc: "Programme du diplôme, tronc commun et évaluations." },
      { role: "Coordinateur CAS", desc: "Créativité, activité, service et projets des élèves." },
    ],
  },
  {
    title: "Vie scolaire et services aux élèves",
    intro: "Ils accompagnent chaque élève et chaque famille au quotidien.",
    members: [
      { role: "Conseiller principal d'éducation", desc: "Vie scolaire, discipline et présences." },
      { role: "Conseiller d'orientation", desc: "Orientation et préparation aux études supérieures." },
      { role: "Responsable des admissions", desc: "Accueil des familles, visites et inscriptions." },
      { role: "Bibliothécaire", desc: "Ressources, recherche documentaire et lecture." },
      { role: "Infirmier / Infirmière", desc: "Santé et bien-être des élèves." },
    ],
  },
  {
    title: "Équipe enseignante",
    intro: "Des enseignants répartis dans les huit groupes de matières de l'IB.",
    members: [
      "Langue et littérature",
      "Acquisition de langues",
      "Individus et sociétés",
      "Sciences",
      "Mathématiques",
      "Arts",
      "Design",
      "Éducation physique et santé",
    ].map((role) => ({ role })),
  },
  {
    title: "Administration et soutien",
    intro: "Ils font vivre l'école jour après jour.",
    members: [
      { role: "Secrétariat" },
      { role: "Comptabilité" },
      { role: "Informatique et multimédia" },
      { role: "Restauration" },
      { role: "Entretien et sécurité" },
    ],
  },
];

/**
 * Galeries de la page « Vie scolaire ».
 * Tant que `src` (photo / vidéo) ou `youtubeId` n'est pas renseigné, une vignette
 * « à ajouter » s'affiche. Déposez les fichiers dans public/media/sorties,
 * public/media/clubs ou public/media/campus, puis renseignez `src`, par exemple
 * `src: "/media/sorties/musee.jpg"`. Pour une vidéo : `kind: "video"`, `src: "/media/clubs/club.mp4"`
 * (+ `poster`), ou `kind: "youtube"` avec `youtubeId`.
 * `feature: true` agrandit la vignette (2×2).
 */
export type MediaItem = {
  kind: "image" | "video" | "youtube";
  title: string;
  caption?: string;
  src?: string;
  poster?: string;
  youtubeId?: string;
  feature?: boolean;
};

export const OUTINGS: MediaItem[] = [
  { kind: "image", title: "Sorties culturelles et musées", caption: "Visites tout au long de l'année", feature: true },
  { kind: "video", title: "Une sortie en vidéo" },
  { kind: "image", title: "Découverte de la nature" },
  { kind: "image", title: "Visites du patrimoine" },
  { kind: "image", title: "Actions humanitaires" },
];

export const CLUBS: MediaItem[] = [
  { kind: "youtube", youtubeId: "x5IyEv4z2Ik", title: "Tournoi de ping-pong", caption: "Notre événement de ping-pong en vidéo", feature: true },
  { kind: "image", title: "Club théâtre" },
  { kind: "image", title: "Club sciences" },
  { kind: "image", title: "Club numérique" },
  { kind: "image", title: "Activités sportives" },
];

export const CAMPUS_MEDIA: MediaItem[] = [
  { kind: "image", title: "La cantine", caption: "Des repas équilibrés, dans un espace convivial", feature: true },
  { kind: "image", title: "Salles de classe" },
  { kind: "image", title: "Laboratoires" },
  { kind: "image", title: "Salle de sport" },
  { kind: "image", title: "Salle multimédia" },
  { kind: "image", title: "Bibliothèque" },
  { kind: "image", title: "Salle d'arts plastiques" },
  { kind: "image", title: "La cour centrale", src: "/media/atrium.jpg" },
  { kind: "image", title: "La façade de l'école", src: "/media/building.jpg" },
];
