export interface WorkItem {
  index: string;
  name: string;
  category: string;
  industry: string;
  year: string;
  palette: [string, string, string];
  image?: string;
}

export const work: WorkItem[] = [
  {
    index: "01",
    name: "Café de Lokma",
    category: "Website · Digitale Speisekarte · Markenauftritt",
    industry: "Gastronomie",
    year: "Website",
    palette: ["#1c0c14", "#d94b7c", "#fdecf2"],
    image: "/images/projects/cafe-de-lokma.jpg",
  },
  {
    index: "02",
    name: "Autohaus",
    category: "Website · Fahrzeugpräsentation · Leadgenerierung",
    industry: "Automotive",
    year: "Website",
    palette: ["#0b0e12", "#3a5a78", "#dfe6ea"],
    image: "/images/projects/velar-motors.jpg",
  },
  {
    index: "03",
    name: "B2B Plattform",
    category: "Webanwendung · Prozesse · Automatisierung",
    industry: "Business Software",
    year: "Web-App",
    palette: ["#0a0d0c", "#3f7a63", "#dcece4"],
    image: "/images/projects/sator-systems.jpg",
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
    name: "Websites",
    short: "Websites",
    description:
      "Moderne, schnelle und conversion-orientierte Websites, die Ihre Marke klar positionieren und messbar besser verkaufen.",
    tools: ["Strategie", "UX & UI", "Next.js", "SEO"],
  },
  {
    index: "02",
    name: "Webanwendungen",
    short: "Webanwendungen",
    description:
      "Individuelle Software, Plattformen und Dashboards, die komplexe Abläufe vereinfachen und mit Ihrem Unternehmen wachsen.",
    tools: ["Business Software", "Dashboards", "APIs", "Portale"],
  },
  {
    index: "03",
    name: "KI-Automatisierung",
    short: "KI-Automatisierung",
    description:
      "AI Agents und intelligente Automationen, die Routinearbeit reduzieren, Systeme verbinden und Teams produktiver machen.",
    tools: ["AI Agents", "Workflows", "Integrationen", "Prozesse"],
  },
  {
    index: "04",
    name: "Wachstum",
    short: "Wachstum",
    description:
      "SEO, digitale Sichtbarkeit und datenbasierte Strategien, damit aus einer starken Lösung nachhaltiges Wachstum entsteht.",
    tools: ["SEO", "Sichtbarkeit", "Leads", "Strategie"],
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
    name: "Beratung",
    description:
      "Wir klären Ziele, Zielgruppen und Prozesse – und priorisieren, was für Ihr Unternehmen den größten Hebel hat.",
  },
  {
    index: "02",
    name: "Konzeption",
    description:
      "Strategie, Nutzerführung, Design und technische Architektur werden zu einem belastbaren Konzept.",
  },
  {
    index: "03",
    name: "Entwicklung",
    description:
      "Wir entwickeln performant, zugänglich und sauber – mit transparenten Zwischenständen und kurzen Wegen.",
  },
  {
    index: "04",
    name: "Launch & Wachstum",
    description:
      "Nach dem getesteten Launch optimieren wir Sichtbarkeit, Systeme und Wirkung kontinuierlich weiter.",
  },
];

export const projectTypes = [
  "Kreative Website",
  "Digitales Erlebnis",
  "Web-Anwendung",
  "KI & Automatisierung",
  "Noch unklar",
];
