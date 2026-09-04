export interface WorkItem {
  index: string;
  name: string;
  category: string;
  industry: string;
  year: string;
  palette: [string, string, string];
}

export const work: WorkItem[] = [
  {
    index: "01",
    name: "Noctuelle",
    category: "Markenwebsite & Reservierungen",
    industry: "Luxus-Restaurant",
    year: "2025",
    palette: ["#1a1210", "#c98a4b", "#f4e9d8"],
  },
  {
    index: "02",
    name: "Velar Motors",
    category: "Digitales Erlebnis",
    industry: "Automobilbranche",
    year: "2025",
    palette: ["#0b0e12", "#3a5a78", "#dfe6ea"],
  },
  {
    index: "03",
    name: "Meridian House",
    category: "Web-Plattform",
    industry: "Architektur & Immobilien",
    year: "2024",
    palette: ["#12110d", "#a68a5b", "#efe8da"],
  },
  {
    index: "04",
    name: "Auric",
    category: "E-Commerce-Erlebnis",
    industry: "Premium-Kosmetik",
    year: "2024",
    palette: ["#170f14", "#b3667f", "#f2dfe4"],
  },
  {
    index: "05",
    name: "Sator Systems",
    category: "Produkt & Web-App",
    industry: "Technologie",
    year: "2024",
    palette: ["#0a0d0c", "#3f7a63", "#dcece4"],
  },
];

export interface Service {
  index: string;
  name: string;
  short: string;
  description: string;
  tools: string[];
}

export const services: Service[] = [
  {
    index: "01",
    name: "Kreative Websites",
    short: "Websites",
    description:
      "Hochwertige Marketing- und Markenwebsites, aufgebaut um eine starke Idee — außergewöhnliches Design, Bewegung und Interaktion vom ersten Pixel an.",
    tools: ["Design-Systeme", "Next.js", "Art Direction", "CMS"],
  },
  {
    index: "02",
    name: "Digitale Erlebnisse",
    short: "Erlebnisse",
    description:
      "3D, WebGL und bewegungsgetriebene Markenerlebnisse, die aus einer Website etwas machen, an das man sich erinnert und worüber man spricht.",
    tools: ["WebGL", "Three.js", "GSAP", "Shader"],
  },
  {
    index: "03",
    name: "Web-Anwendungen",
    short: "Anwendungen",
    description:
      "Individuelle Plattformen, Konfiguratoren und digitale Produkte, gebaut für Wachstum — vom ersten Prototyp bis zum produktiven System.",
    tools: ["React", "TypeScript", "APIs", "Dashboards"],
  },
  {
    index: "04",
    name: "KI & Automatisierung",
    short: "Automatisierung",
    description:
      "KI-gestützte Workflows, Agenten und interne Tools, die Routinearbeit abnehmen und Teams auf ein neues Level heben.",
    tools: ["Agenten", "Workflows", "Integrationen", "LLMs"],
  },
];

export interface ProcessStep {
  index: string;
  name: string;
  description: string;
}

export const process: ProcessStep[] = [
  {
    index: "01",
    name: "Analyse",
    description:
      "Wir analysieren Ihre Marke, Ihren Markt und Ihren Wettbewerb, um den Ansatz zu finden, der Sie unübersehbar macht.",
  },
  {
    index: "02",
    name: "Design",
    description:
      "Eine eigenständige Bildsprache entsteht von Grund auf — Typografie, Layout, Bewegung und visuelle Sprache als ein System.",
  },
  {
    index: "03",
    name: "Umsetzung",
    description:
      "Entwicklung mit derselben Sorgfalt wie das Design. Schnell, zugänglich und auf einem Stack gebaut, der mit Ihrem Unternehmen wächst.",
  },
  {
    index: "04",
    name: "Launch",
    description:
      "Ein kontrollierter, getesteter Launch — Performance, SEO und jedes Endgerät geprüft, bevor die Welt es sieht.",
  },
  {
    index: "05",
    name: "Wachstum",
    description:
      "Wir iterieren auch nach dem Launch weiter — messen, verfeinern und treiben das Erlebnis voran, während Ihre Marke wächst.",
  },
];

export const projectTypes = [
  "Kreative Website",
  "Digitales Erlebnis",
  "Web-Anwendung",
  "KI & Automatisierung",
  "Noch unklar",
];
