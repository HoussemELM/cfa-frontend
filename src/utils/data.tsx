import { t1, t2, t3, t4 } from "./assets";
import EmployeeModel from "@/models/EmployeeModel";
import FaqModel from "@/models/FaqModel";


export const navElements = [
  { name: "Accueil", href: "/" },
  { name: "Formations", href: "/formations" },
  { name: "Qui sommes nous?", href: "/apropos" },
  { name: "Financement", href: "/financement" },
  { name: "CFA", href: "/cfa" },
  { name: "Support", href: "/support" },
];
export const faqs: FaqModel[] = [
  {
    id: 1,
    question: "Quels documents sont nécessaires pour m’inscrire ?",
    content: `Pour vous inscrire, vous devrez fournir une pièce d’identité, un CV à jour, une lettre de motivation
(facultative pour certaines formations), et tout justificatif spécifique demandé par la formation
choisie.`
  },
  {
    id: 2,
    question: "Est-ce que je peux changer de formation en cours de parcours ?",
    content: `Oui, il est possible de changer de formation sous certaines conditions. Cela dépend de la durée
écoulée dans votre parcours actuel et des places disponibles dans la nouvelle formation. Nos
conseillers sont là pour vous accompagner dans cette démarche.`
  },
  {
    id: 3,
    question: "Quelle est la différence entre une formation initiale et une formation en alternance ?",
    content: `La formation initiale est 100% en centre de formation, tandis que l’alternance combine des périodes
en entreprise et des cours théoriques, vous permettant d’acquérir de l’expérience professionnelle
tout en apprenant`
  },
  {
    id: 4,
    question: "Les formations sont-elles adaptées aux personnes en reconversion professionnelle ?",
    content: `Absolument ! Nos formations sont conçues pour les apprenants de tous horizons, y compris ceux en
reconversion professionnelle. Elles intègrent des outils pratiques et un accompagnement
personnalisé pour faciliter votre transition.`
  },
  {
    id: 5,
    question:  "Puis-je m’inscrire à une formation si je suis encore salarié(e) ?",
    content: "Oui, de nombreuses formations sont flexibles et compatibles avec un emploi, notamment grâce àl’alternance ou aux cours en ligne."
  },
  
];
export const teachers: EmployeeModel[] = [
  {
    fullname: "John Doe",
    role: "Teacher",
    img: t1
  },
  {
    fullname: "Emma Davis",
    role: "Teacher",
    img:t2
  },
  {
    fullname: "Robert Johnson",
    role: "Teacher",
    img: t3
  },
 
  {
    fullname: "Sophia Martinez",
    role: "Teacher",
    img: t4
  },
 
 ]

// export const popularFormations: CourseModel[] = [
//   {
//     id: 1,
//     thumbnail: formation1,
//     title: "Complete Guide to JavaScript",
//     name: "John Doe",
//     profile: a7,
//     review: { rating: 4.8, count: 1250 },
//     course_count: 15,
//     category: "IT & Data",
//     duration: "12h 30m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 8000,
//     language: "English",
//     isCertified: true,
//     description: "An in-depth guide to JavaScript programming covering all fundamental concepts.",
//     learn: "JavaScript basics, ES6 features, DOM manipulation, async programming",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 2,
//     thumbnail: formation2,
//     title: "Python for Data Science",
//     name: "Jane Smith",
//     profile: a6,
//     review: { rating: 4.6, count: 900 },
//     course_count: 10,
//     category: "IT & Data",
//     duration: "10h",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 6500,
//     language: "English",
//     isCertified: true,
//     description: "Learn Python for data science, from the basics to advanced data analysis.",
//     learn: "Data cleaning, visualization, NumPy, pandas, machine learning basics",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 3,
//     thumbnail: formation3,
//     title: "Web Development with React",
//     name: "Mark Johnson",
//     profile: a5,
//     review: { rating: 4.9, count: 2000 },
//     course_count: 12,
//     category: "IT & Data",
//     duration: "15h 45m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 12000,
//     language: "English",
//     isCertified: true,
//     description: "Master React and build interactive web applications.",
//     learn: "React components, hooks, state management, routing, Redux",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 4,
//     thumbnail: formation4,
//     title: "Machine Learning Essentials",
//     name: "Emily Davis",
//     profile: a1,
//     review: { rating: 4.7, count: 1600 },
//     course_count: 18,
//     category: "IT & Data",
//     duration: "20h",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 9500,
//     language: "English",
//     isCertified: true,
//     description: "Fundamentals of machine learning and its applications.",
//     learn: "Supervised and unsupervised learning, model evaluation, scikit-learn",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 5,
//     img: fromation5,
//     title: "Intro to Cloud Computing",
//     name: "William Brown",
//     profile: a2,
//     review: { rating: 4.5, count: 750 },
//     course_count: 8,
//     category: "IT & Data",
//     duration: "8h 20m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 5000,
//     language: "English",
//     isCertified: false,
//     description: "An introductory course on cloud computing concepts and services.",
//     learn: "Cloud service models, virtualization, cloud providers, deployment",
//     price:200,
//     certification: "Completion Badge"
//   }
// ];

// export const formations: CourseModel[] = [
//   ...popularFormations,
//   {
//     id: 6,
//     thumbnail: formation1,
//     title: "Complete Guide to JavaScript",
//     name: "John Doe",
//     profile: a3,
//     review: { rating: 4.8, count: 1250 },
//     course_count: 15,
//     category: "IT & Data",
//     duration: "12h 30m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 8000,
//     language: "French",
//     isCertified: true,
//     description: "A comprehensive guide to JavaScript development.",
//     learn: "JS basics, advanced topics, best practices",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 7,
//     thumbnail: formation1,
//     title: "Complete Guide to JavaScript",
//     name: "John Doe",
//     profile: a7,
//     review: { rating: 4.8, count: 1250 },
//     course_count: 15,
//     category: "IT & Data",
//     duration: "12h 30m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 8000,
//     language: "English",
//     isCertified: true,
//     description: "An in-depth guide to JavaScript programming covering all fundamental concepts.",
//     learn: "JavaScript basics, ES6 features, DOM manipulation, async programming",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 8,
//     thumbnail: formation2,
//     title: "Python for Data Science",
//     name: "Jane Smith",
//     profile: a6,
//     review: { rating: 4.6, count: 900 },
//     course_count: 10,
//     category: "IT & Data",
//     duration: "10h",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 6500,
//     language: "English",
//     isCertified: true,
//     description: "Learn Python for data science, from the basics to advanced data analysis.",
//     learn: "Data cleaning, visualization, NumPy, pandas, machine learning basics",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 9,
//     thumbnail: formation3,
//     title: "Web Development with React",
//     name: "Mark Johnson",
//     profile: a5,
//     review: { rating: 4.9, count: 2000 },
//     course_count: 12,
//     category: "IT & Data",
//     duration: "15h 45m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 12000,
//     language: "English",
//     isCertified: true,
//     description: "Master React and build interactive web applications.",
//     learn: "React components, hooks, state management, routing, Redux",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 10,
//     thumbnail: formation4,
//     title: "Machine Learning Essentials",
//     name: "Emily Davis",
//     profile: a1,
//     review: { rating: 4.7, count: 1600 },
//     course_count: 18,
//     category: "IT & Data",
//     duration: "20h",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 9500,
//     language: "English",
//     isCertified: true,
//     description: "Fundamentals of machine learning and its applications.",
//     learn: "Supervised and unsupervised learning, model evaluation, scikit-learn",
//     price:200,
//     certification: "Certificate of Completion"
//   },
//   {
//     id: 11,
//     img: fromation5,
//     title: "Intro to Cloud Computing",
//     name: "William Brown",
//     profile: a2,
//     review: { rating: 4.5, count: 750 },
//     course_count: 8,
//     category: "IT & Data",
//     duration: "8h 20m",
//     subtitle:"Devenez un formateur expert en accompagnement d'adultes !"
//     ,subscribers: 5000,
//     language: "English",
//     isCertified: false,
//     description: "An introductory course on cloud computing concepts and services.",
//     learn: "Cloud service models, virtualization, cloud providers, deployment",
//     price:200,
//     certification: "Completion Badge"
//   }
// ];
