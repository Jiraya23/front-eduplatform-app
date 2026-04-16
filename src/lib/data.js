// Mock data for EduPlattform courses and lessons

export const courses = [
  {
    id: 1,
    title: "Introduction à JavaScript",
    description: "Apprenez les bases du JavaScript, le langage de programmation web le plus populaire.",
    image: "/images/courses/javascript.jpg",
    level: "Débutant",
    duration: "4 heures",
    rating: 4.8,
    students: 1250,
    instructor: "Jean Kameni",
    price: "Gratuit",
    modules: [
      {
        id: 1,
        title: "Module 1: Fondamentaux",
        lessons: [
          { id: 1, title: "Qu'est-ce que JavaScript ?", duration: "8 min" },
          { id: 2, title: "Variables et types de données", duration: "12 min" },
          { id: 3, title: "Opérateurs", duration: "10 min" }
        ]
      },
      {
        id: 2,
        title: "Module 2: Contrôle de flux",
        lessons: [
          { id: 4, title: "Conditions (if, else)", duration: "15 min" },
          { id: 5, title: "Boucles (for, while)", duration: "18 min" }
        ]
      }
    ],
    objectives: [
      "Comprendre les bases de JavaScript",
      "Maîtriser les variables et les types de données",
      "Utiliser les conditions et les boucles",
      "Créer des fonctions réutilisables"
    ],
    teaser: "/videos/teaser-javascript.mp4"
  },
  {
    id: 2,
    title: "Web Design avec Tailwind CSS",
    description: "Créez des interfaces web magnifiques et modernes avec le framework Tailwind CSS.",
    image: "/images/courses/tailwind.jpg",
    level: "Intermédiaire",
    duration: "6 heures",
    rating: 4.9,
    students: 890,
    instructor: "Marie Nkada",
    price: "4 999 FCFA",
    modules: [
      {
        id: 1,
        title: "Module 1: Fondamentaux de Tailwind",
        lessons: [
          { id: 1, title: "Installation et configuration", duration: "10 min" },
          { id: 2, title: "Utilité et concepts clés", duration: "15 min" },
          { id: 3, title: "Spacing et sizing", duration: "12 min" }
        ]
      },
      {
        id: 2,
        title: "Module 2: Composants avancés",
        lessons: [
          { id: 4, title: "Flexbox et Grid", duration: "20 min" },
          { id: 5, title: "Responsive design", duration: "18 min" }
        ]
      }
    ],
    objectives: [
      "Installer et configurer Tailwind CSS",
      "Comprendre l'approche utility-first",
      "Créer des layouts responsifs",
      "Personnaliser Tailwind pour vos projets"
    ],
    teaser: "/videos/teaser-tailwind.mp4"
  },
  {
    id: 3,
    title: "React pour les débutants",
    description: "Découvrez React, la librairie JavaScript pour créer des interfaces utilisateur interactives.",
    image: "/images/courses/react.jpg",
    level: "Intermédiaire",
    duration: "8 heures",
    rating: 4.7,
    students: 2100,
    instructor: "Paul Essomba",
    price: "9 999 FCFA",
    modules: [
      {
        id: 1,
        title: "Module 1: Les bases de React",
        lessons: [
          { id: 1, title: "Qu'est-ce que React ?", duration: "12 min" },
          { id: 2, title: "JSX et composants", duration: "20 min" },
          { id: 3, title: "Props et state", duration: "18 min" }
        ]
      }
    ],
    objectives: [
      "Comprendre les concepts fondamentaux de React",
      "Créer des composants réutilisables",
      "Gérer l'état avec hooks",
      "Créer des applications React interactives"
    ],
    teaser: "/videos/teaser-react.mp4"
  },
  {
    id: 4,
    title: "Développement Web Full-Stack",
    description: "Maîtrisez le développement web complet : frontend, backend et base de données.",
    image: "/images/courses/fullstack.jpg",
    level: "Avancé",
    duration: "24 heures",
    rating: 4.6,
    students: 567,
    instructor: "Antoine Ting",
    price: "24 999 FCFA",
    modules: [],
    objectives: [
      "Développer des applications web complètes",
      "Gérer les serveurs et les bases de données",
      "Déployer des applications productives"
    ],
    teaser: "/videos/teaser-fullstack.mp4"
  },
  {
    id: 5,
    title: "UX/UI Design Principles",
    description: "Apprenez les principes fondamentaux du design utilisateur et de l'interface.",
    image: "/images/courses/design.jpg",
    level: "Débutant",
    duration: "5 heures",
    rating: 4.8,
    students: 1456,
    instructor: "Sophie Meyer",
    price: "Gratuit",
    modules: [],
    objectives: [
      "Comprendre les principes de UX/UI",
      "Créer des interfaces intuives",
      "Utiliser les tools de design modernes"
    ],
    teaser: "/videos/teaser-design.mp4"
  },
  {
    id: 6,
    title: "Digital Marketing Essentials",
    description: "Maîtrisez les bases du marketing digital et augmentez votre présence en ligne.",
    image: "/images/courses/marketing.jpg",
    level: "Débutant",
    duration: "7 heures",
    rating: 4.5,
    students: 2340,
    instructor: "Amara Diop",
    price: "Gratuit",
    modules: [],
    objectives: [
      "Comprendre les stratégies de marketing digital",
      "Utiliser les médias sociaux efficacement",
      "Analyser les données marketing"
    ],
    teaser: "/videos/teaser-marketing.mp4"
  }
];

export const lessons = [
  {
    id: 1,
    courseId: 1,
    moduleId: 1,
    title: "Qu'est-ce que JavaScript ?",
    duration: "8 min",
    videoUrl: "/videos/lessons/javascript-intro.mp4",
    content: `
      <h2>Introduction à JavaScript</h2>
      <p>JavaScript est un langage de programmation interprété utilisé principalement pour créer des interactions dans les navigateurs web.</p>
      
      <h3>Caractéristiques principales :</h3>
      <ul>
        <li>Langage côté client (exécuté dans le navigateur)</li>
        <li>Orienté objet et fonctionnel</li>
        <li>Dynamique et faiblement typé</li>
        <li>Suporte les événements et animations</li>
      </ul>

      <h3>Utilisation de JavaScript :</h3>
      <p>Vous pouvez utiliser JavaScript pour :</p>
      <ul>
        <li>Valider les formulaires</li>
        <li>Créer des interactions utilisateur dynamiques</li>
        <li>Manipuler le DOM (Document Object Model)</li>
        <li>Créer des applications web modernes (SPAs)</li>
      </ul>
    `,
    completed: false
  },
  {
    id: 2,
    courseId: 1,
    moduleId: 1,
    title: "Variables et types de données",
    duration: "12 min",
    videoUrl: "/videos/lessons/variables.mp4",
    content: `
      <h2>Variables et Types de Données</h2>
      <p>Les variables sont des conteneurs pour stocker des valeurs. JavaScript a plusieurs types de données.</p>

      <h3>Déclaration de variables :</h3>
      <pre><code>
let nom = "Jean";              // Chaîne de caractères
const age = 25;                // Nombre
var adresse = "Yaoundé";       // Notation ancienne
      </code></pre>

      <h3>Types de données :</h3>
      <ul>
        <li><strong>String :</strong> "Texte"</li>
        <li><strong>Number :</strong> 42, 3.14</li>
        <li><strong>Boolean :</strong> true, false</li>
        <li><strong>Object :</strong> { clé: valeur }</li>
        <li><strong>Array :</strong> [1, 2, 3]</li>
        <li><strong>Undefined :</strong> variable non définie</li>
        <li><strong>Null :</strong> absence intentionnelle de valeur</li>
      </ul>
    `,
    completed: false
  }
];

export const quizzes = [
  {
    id: 1,
    courseId: 1,
    moduleId: 1,
    title: "Quiz: Fondamentaux JavaScript",
    questions: [
      {
        id: 1,
        question: "Quel est le bon moyen de déclarer une variable en JavaScript ?",
        options: [
          "var x = 5;",
          "declare x = 5;",
          "variable x = 5;",
          "x := 5;"
        ],
        correctAnswer: 0,
        explanation: "Les trois façons valides de déclarer une variable en JavaScript sont : var, let, et const."
      },
      {
        id: 2,
        question: "Quel est le type de données de la valeur 'true' ?",
        options: [
          "String",
          "Number",
          "Boolean",
          "Object"
        ],
        correctAnswer: 2,
        explanation: "true et false sont des valeurs booléennes en JavaScript."
      },
      {
        id: 3,
        question: "Comment accédez-vous à l'élement d'un array ?",
        options: [
          "array(0)",
          "array[0]",
          "array{0}",
          "array.0"
        ],
        correctAnswer: 1,
        explanation: "En JavaScript, on accède aux éléments d'un array en utilisant des crochets array[index]."
      }
    ]
  }
];

export const adminFormations = [
  {
    id: 1,
    title: "Introduction à JavaScript",
    description: "Apprenez les bases du JavaScript...",
    level: "Débutant",
    duration: "4 heures",
    status: "Publiée",
    createdAt: "2025-01-15",
    studentsCount: 1250
  },
  {
    id: 2,
    title: "Web Design avec Tailwind CSS",
    description: "Créez des interfaces web magnifiques...",
    level: "Intermédiaire",
    duration: "6 heures",
    status: "Publiée",
    createdAt: "2025-01-20",
    studentsCount: 890
  }
];
