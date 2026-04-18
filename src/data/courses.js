// src/data/courses.js
// Source unique de vérité pour toutes les formations
// Utilisé par CataloguePage ET CourseDetailPage

export const COURSES = [
  {
    id: 1,
    tag: "FREE",
    tagColor: "#1a7a4a",
    level: "BEGINNER",
    levelLabel: "Débutant",
    duration: "4 WEEKS",
    title: "Créer son site web de A à Z",
    shortDesc: "Maîtrise les bases du développement web moderne. De zéro à ton premier site en ligne.",
    price: "GRATUIT",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    category: "DÉVELOPPEMENT WEB",
    tagline: "De zéro à ton premier site web professionnel en ligne.",
    lang: "Français",
    certificate: "Certificat inclus",
    rating: 4.9,
    reviews: 1240,
    instructor: { name: "Jean-Claude Kamga", title: "Senior Web Developer", initials: "JK" },
    description: "Cette formation intensive est conçue pour les débutants souhaitant apprendre le développement web. Tu partiras de zéro et arriveras à créer des sites web modernes et responsives.",
    objectives: [
      "Maîtriser la structure HTML d'une page web.",
      "Styliser avec CSS et créer des designs responsives.",
      "Ajouter des interactions avec JavaScript.",
      "Publier ton site sur internet.",
    ],
    includes: [
      "32h de vidéo à la demande",
      "15 ressources téléchargeables",
      "Accès illimité à vie",
      "Certificat de complétion",
    ],
    modules: [
      {
        id: 1, order: "01", title: "Introduction au développement web",
        lessons: [
          { id: 1, title: "Qu'est-ce qu'un site web ?", type: "video", duration: "8:00", free: true },
          { id: 2, title: "Les outils du développeur", type: "text", duration: "5:00", free: false },
          { id: 3, title: "Ton premier fichier HTML", type: "video", duration: "12:00", free: false },
        ],
      },
      {
        id: 2, order: "02", title: "HTML — Structure du contenu",
        lessons: [
          { id: 4, title: "Les balises essentielles", type: "video", duration: "15:00", free: false },
          { id: 5, title: "Formulaires et liens", type: "video", duration: "18:00", free: false },
          { id: 6, title: "Quiz — HTML", type: "quiz", duration: "10:00", free: false },
        ],
      },
      {
        id: 3, order: "03", title: "CSS — Mise en forme",
        lessons: [
          { id: 7, title: "Sélecteurs et propriétés CSS", type: "video", duration: "20:00", free: false },
          { id: 8, title: "Flexbox et Grid Layout", type: "video", duration: "25:00", free: false },
          { id: 9, title: "Design responsive", type: "video", duration: "18:00", free: false },
        ],
      },
    ],
  },

  {
    id: 2,
    tag: "PREMIUM",
    tagColor: "#c8a84b",
    level: "INTERMEDIATE",
    levelLabel: "Intermédiaire",
    duration: "8 WEEKS",
    title: "Lancer et gérer son business",
    shortDesc: "Business plan, financement, marketing digital et stratégie d'entreprise.",
    price: "15 000 XAF",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    category: "ENTREPRENEURIAT",
    tagline: "Tout ce qu'il faut pour lancer et faire grandir ton activité.",
    lang: "Français",
    certificate: "Certificat inclus",
    rating: 4.7,
    reviews: 876,
    instructor: { name: "Marie Essomba", title: "Business Coach & Entrepreneur", initials: "ME" },
    description: "Une formation complète pour transformer ton idée en business viable. Tu apprendras à rédiger un business plan, trouver des financements et attirer tes premiers clients.",
    objectives: [
      "Rédiger un business plan solide.",
      "Identifier les sources de financement locales.",
      "Mettre en place une stratégie marketing digital.",
      "Gérer la comptabilité de base de ton activité.",
    ],
    includes: [
      "24h de vidéo à la demande",
      "Templates business plan",
      "Accès illimité à vie",
      "Certificat de complétion",
    ],
    modules: [
      {
        id: 1, order: "01", title: "Valider ton idée de business",
        lessons: [
          { id: 1, title: "Analyse de marché", type: "video", duration: "12:00", free: true },
          { id: 2, title: "Identifier ton client idéal", type: "video", duration: "10:00", free: false },
        ],
      },
      {
        id: 2, order: "02", title: "Business Plan & Financement",
        lessons: [
          { id: 3, title: "Rédiger son business plan", type: "text", duration: "20:00", free: false },
          { id: 4, title: "Sources de financement au Cameroun", type: "video", duration: "15:00", free: false },
          { id: 5, title: "Quiz — Business Plan", type: "quiz", duration: "10:00", free: false },
        ],
      },
      {
        id: 3, order: "03", title: "Marketing Digital",
        lessons: [
          { id: 6, title: "Stratégie réseaux sociaux", type: "video", duration: "18:00", free: false },
          { id: 7, title: "Créer sa page Facebook Business", type: "video", duration: "14:00", free: false },
        ],
      },
    ],
  },

  {
    id: 3,
    tag: "FREE",
    tagColor: "#1a7a4a",
    level: "BEGINNER",
    levelLabel: "Débutant",
    duration: "6 WEEKS",
    title: "Design graphique & communication visuelle",
    shortDesc: "Canva, bases du design, création de supports visuels professionnels.",
    price: "GRATUIT",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
    category: "DESIGN GRAPHIQUE",
    tagline: "Crée des visuels professionnels même sans expérience en design.",
    lang: "Français",
    certificate: "Certificat inclus",
    rating: 4.8,
    reviews: 654,
    instructor: { name: "Sophie Nkeng", title: "Graphic Designer & UI/UX", initials: "SN" },
    description: "Apprends les bases du design graphique et crée des supports visuels accrocheurs pour ton activité ou tes clients, en utilisant des outils accessibles comme Canva.",
    objectives: [
      "Maîtriser les principes de base du design.",
      "Créer des flyers, affiches et posts réseaux sociaux.",
      "Utiliser Canva de manière professionnelle.",
      "Construire une identité visuelle cohérente.",
    ],
    includes: [
      "18h de vidéo à la demande",
      "Templates Canva inclus",
      "Accès illimité à vie",
      "Certificat de complétion",
    ],
    modules: [
      {
        id: 1, order: "01", title: "Les bases du design",
        lessons: [
          { id: 1, title: "Couleurs, typographie et composition", type: "video", duration: "14:00", free: true },
          { id: 2, title: "Principes du design visuel", type: "text", duration: "8:00", free: false },
        ],
      },
      {
        id: 2, order: "02", title: "Canva — Prise en main",
        lessons: [
          { id: 3, title: "Interface et outils de Canva", type: "video", duration: "18:00", free: false },
          { id: 4, title: "Créer un flyer professionnel", type: "video", duration: "22:00", free: false },
          { id: 5, title: "Quiz — Design de base", type: "quiz", duration: "10:00", free: false },
        ],
      },
      {
        id: 3, order: "03", title: "Identité visuelle",
        lessons: [
          { id: 6, title: "Créer un logo simple", type: "video", duration: "20:00", free: false },
          { id: 7, title: "Charte graphique basique", type: "text", duration: "12:00", free: false },
        ],
      },
    ],
  },
];
