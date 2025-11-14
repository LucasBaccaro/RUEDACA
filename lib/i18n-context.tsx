"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
    },
    hero: {
      welcome: "Te doy la bienvenida a mi portfolio",
      name: "Camila Rueda",
      title: "UX/UI Designer",
      description:
        "Creadora de experiencias digitales intuitivas y centradas en las personas, combinando investigación, empatía y diseño estratégico.",
      viewWork: "Ver Mi Trabajo",
      getInTouch: "Contáctame",
      scrollExplore: "Scroll para explorar",
    },
    about: {
      badge: "Sobre mí",
      title: "Creando Experiencias",
      titleHighlight: "Digitales",
      description:
        "Diseñadora en formación continua. Me capacité en Coderhouse y completé la Diplomatura en UX/UI en UTN. Disfruto crear experiencias digitales funcionales y centradas en las personas.",
      feature1Title: "Diseño Basado en Datos",
      feature1Desc:
        "Decisiones de diseño respaldadas por investigación cuantitativa y cualitativa, validadas con A/B testing y métricas de usabilidad.",
      feature2Title: "Experiencias Centradas en el Usuario",
      feature2Desc:
        "Empatía como eje central: desde personas y journey maps hasta tests de usabilidad que garantizan soluciones reales.",
      feature3Title: "Design Systems Escalables",
      feature3Desc:
        "Creación de sistemas de diseño coherentes con componentes reutilizables que aceleran el desarrollo y mantienen consistencia.",
      feature4Title: "Comunicación & Colaboración",
      feature4Desc:
        "UX Writing efectivo y facilitación de workshops que alinean stakeholders, developers y usuarios hacia objetivos comunes.",
      stat1: "Años de Experiencia",
      stat2: "Proyectos Completados",
      stat3: "Clientes Satisfechos",
      stat4: "Dedicación",
    },
    skills: {
      badge: "Habilidades & Expertise",
      title: "Competencias",
      titleHighlight: "Profesionales",
      description:
        "Un conjunto completo de habilidades en diseño UX/UI, perfeccionadas mediante práctica real y aprendizaje continuo.",
      category1: "Research & Strategy",
      skill1_1: "User Research & Insights",
      skill1_2: "Usability Testing & A/B Testing",
      skill1_3: "User Personas & Scenarios",
      skill1_4: "Competitive Analysis",
      skill1_5: "Information Architecture",
      category2: "Diseño UX/UI",
      skill2_1: "Wireframing & Prototyping",
      skill2_2: "Design Systems & Components",
      skill2_3: "Interaction Design",
      skill2_4: "Visual Design & Branding",
      skill2_5: "Responsive & Adaptive Design",
      category3: "Content & Accessibility",
      skill3_1: "UX Writing & Microcopy",
      skill3_2: "Content Strategy",
      skill3_3: "Accessibility (WCAG 2.1)",
      skill3_4: "User Journey Mapping",
      skill3_5: "Heuristic Evaluation",
      category4: "Herramientas & Metodologías",
      skill4_1: "Figma & FigJam",
      skill4_2: "Design Thinking & Double Diamond",
      skill4_3: "Agile / Scrum / Lean UX",
      skill4_4: "Workshop Facilitation",
      skill4_5: "Stakeholder Collaboration",
      category5: "Diseño + Desarrollo",
      skill5_1: "HTML/CSS & Responsive",
      skill5_2: "IA para Diseño (ChatGPT, Claude)",
      skill5_3: "Prototipado con Código",
      skill5_4: "Git & Control de Versiones",
      skill5_5: "Colaboración Dev-Design",
      footer: "Siempre aprendiendo y explorando nuevas tecnologías",
    },
    projects: {
      badge: "Portfolio",
      title: "Proyectos",
      titleHighlight: "Destacados",
      description:
        "Una selección curada de mi trabajo, mostrando soluciones centradas en el usuario y experiencias digitales.",
      project1Title: "Pausa Activa",
      project1Desc:
        "App de bienestar que promueve pausas saludables en el trabajo mediante ejercicios guiados, recordatorios y seguimiento de progreso.",
      project1Tags: ["UX/UI Design", "Mobile First", "Wellness", "Animation"],
      project2Title: "Airbnb Clone",
      project2Desc:
        "Plataforma completa de alquiler vacacional con búsqueda avanzada, mapas interactivos y una experiencia de reserva fluida.",
      project2Tags: ["UX/UI Design", "React", "Diseño Responsivo", "Prototipado"],
      project3Title: "Te Visito",
      project3Desc:
        "App para programar citas médicas con interfaz amigable, reservas en tiempo real y gestión integral de pacientes.",
      project3Tags: ["UX/UI Design", "Next.js", "Figma", "User Research"],
      project4Title: "Legere",
      project4Desc:
        "Plataforma moderna de lectura con UX intuitiva, recomendaciones personalizadas y navegación fluida para amantes de los libros.",
      project4Tags: ["UX/UI Design", "React", "TypeScript", "Design System"],
      viewOnBehance: "Ver en Behance",
      code: "Código",
      viewAllProjects: "Ver Todos los Proyectos en Behance",
    },
    contact: {
      badge: "Contacto",
      title: "Trabajemos",
      titleHighlight: "Juntos",
      description:
        "¿Tienes un proyecto en mente? Me encantaría saber más. Conversemos sobre cómo puedo ayudarte a crear experiencias digitales.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "Tu Email",
      messagePlaceholder: "Tu Mensaje",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      successMessage: "¡Mensaje enviado con éxito!",
      errorMessage: "Hubo un error. Por favor inténtalo nuevamente.",
      orReachOut: "O comunícate directamente a través de",
      email: "Email",
      location: "Ubicación",
    },
    chatbot: {
      welcomeMessage:
        "¡Hola! 👋 Soy el asistente virtual de Camila. Pregúntame sobre su experiencia, proyectos o habilidades.",
      status: "En línea ahora",
      placeholder: "Escribe tu mensaje...",
      footer: "Powered by ChatKit & OpenAI",
      prompt1Label: "Sobre Camila",
      prompt1: "Cuéntame sobre la experiencia profesional de Camila",
      prompt2Label: "Proyectos",
      prompt2: "Muéstrame los proyectos destacados de Camila",
      prompt3Label: "Habilidades",
      prompt3: "¿Qué tecnologías y herramientas domina Camila?",
      prompt4Label: "Contacto",
      prompt4: "¿Cómo puedo contactar a Camila?",
    },
    footer: {
      description:
        "Creando experiencias digitales a través del diseño centrado en el usuario.",
      quickLinks: "Enlaces Rápidos",
      connect: "Conecta",
      madeWith: "Hecho con",
      and: "y",
      code: "código",
      designedBy: "Diseñado & Desarrollado por Camila Rueda",
    },
  },

  /* ----------------------------------------------------------------------- */
  /* ---------------------------   ENGLISH  -------------------------------- */
  /* ----------------------------------------------------------------------- */

  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      welcome: "Welcome to my portfolio",
      name: "Camila Rueda",
      title: "UX/UI Designer",
      description:
        "UX/UI Designer specialized in crafting intuitive, user-centered digital experiences through research, empathy, and strategic design.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
      scrollExplore: "Scroll to explore",
    },
    about: {
      badge: "About Me",
      title: "Crafting Digital",
      titleHighlight: "Experiences",
      description:
        "Designer in continuous training. I studied at Coderhouse and completed the UX/UI Diploma at UTN. I enjoy creating functional, people-centered digital experiences.",
      feature1Title: "Data-Driven Design",
      feature1Desc:
        "Design decisions backed by quantitative and qualitative research, validated through A/B testing and usability metrics.",
      feature2Title: "User-Centered Experiences",
      feature2Desc:
        "Empathy as the core: from personas and journey maps to usability tests that guarantee real solutions.",
      feature3Title: "Scalable Design Systems",
      feature3Desc:
        "Creating coherent design systems with reusable components that accelerate development and maintain consistency.",
      feature4Title: "Communication & Collaboration",
      feature4Desc:
        "Effective UX Writing and workshop facilitation that align stakeholders, developers, and users towards common goals.",
      stat1: "Years Experience",
      stat2: "Projects Completed",
      stat3: "Happy Clients",
      stat4: "Dedication",
    },
    skills: {
      badge: "Skills & Expertise",
      title: "Professional",
      titleHighlight: "Competencies",
      description:
        "A comprehensive skill set in UX/UI design, refined through hands-on experience and continuous learning.",
      category1: "Research & Strategy",
      skill1_1: "User Research & Insights",
      skill1_2: "Usability Testing & A/B Testing",
      skill1_3: "User Personas & Scenarios",
      skill1_4: "Competitive Analysis",
      skill1_5: "Information Architecture",
      category2: "UX/UI Design",
      skill2_1: "Wireframing & Prototyping",
      skill2_2: "Design Systems & Components",
      skill2_3: "Interaction Design",
      skill2_4: "Visual Design & Branding",
      skill2_5: "Responsive & Adaptive Design",
      category3: "Content & Accessibility",
      skill3_1: "UX Writing & Microcopy",
      skill3_2: "Content Strategy",
      skill3_3: "Accessibility (WCAG 2.1)",
      skill3_4: "User Journey Mapping",
      skill3_5: "Heuristic Evaluation",
      category4: "Tools & Methodologies",
      skill4_1: "Figma & FigJam",
      skill4_2: "Design Thinking & Double Diamond",
      skill4_3: "Agile / Scrum / Lean UX",
      skill4_4: "Workshop Facilitation",
      skill4_5: "Stakeholder Collaboration",
      category5: "Design + Development",
      skill5_1: "HTML/CSS & Responsive",
      skill5_2: "AI for Design (ChatGPT, Claude)",
      skill5_3: "Code Prototyping",
      skill5_4: "Git & Version Control",
      skill5_5: "Dev-Design Collaboration",
      footer: "Always learning and exploring new technologies",
    },
    projects: {
      badge: "Portfolio",
      title: "Featured",
      titleHighlight: "Projects",
      description:
        "A curated selection of my work showcasing user-centered design solutions and digital experiences.",
      project1Title: "Pausa Activa",
      project1Desc:
        "Wellness app promoting healthy work breaks through guided exercises, reminders, and progress tracking.",
      project1Tags: ["UX/UI Design", "Mobile First", "Wellness", "Animation"],
      project2Title: "Airbnb Clone",
      project2Desc:
        "Full-featured vacation rental platform with advanced search, interactive maps, and a seamless booking experience.",
      project2Tags: [
        "UX/UI Design",
        "React",
        "Responsive Design",
        "Prototyping",
      ],
      project3Title: "Te Visito",
      project3Desc:
        "Medical appointment scheduling app with a user-friendly interface, real-time booking, and patient management tools.",
      project3Tags: ["UX/UI Design", "Next.js", "Figma", "User Research"],
      project4Title: "Legere",
      project4Desc:
        "Modern reading platform with intuitive UX, personalized recommendations, and smooth navigation for book lovers.",
      project4Tags: ["UX/UI Design", "React", "TypeScript", "Design System"],
      viewOnBehance: "View on Behance",
      code: "Code",
      viewAllProjects: "View All Projects on Behance",
    },
    contact: {
      badge: "Contact",
      title: "Let's Work",
      titleHighlight: "Together",
      description:
        "Have a project in mind? I'd love to hear about it. Let's discuss how I can help you create digital experiences.",
      nameLabel: "Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Message",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      sendMessage: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "There was an error. Please try again.",
      orReachOut: "Or reach out directly via",
      email: "Email",
      location: "Location",
    },
    chatbot: {
      welcomeMessage:
        "Hi! 👋 I'm Camila's virtual assistant. Ask me about her experience, projects, or skills.",
      status: "Online now",
      placeholder: "Type your message...",
      footer: "Powered by ChatKit & OpenAI",
      prompt1Label: "About Camila",
      prompt1: "Tell me about Camila's professional experience",
      prompt2Label: "Projects",
      prompt2: "Show me Camila's featured projects",
      prompt3Label: "Skills",
      prompt3: "What technologies and tools does Camila master?",
      prompt4Label: "Contact",
      prompt4: "How can I contact Camila?",
    },
    footer: {
      description:
        "Creating digital experiences through user-centered design.",
      quickLinks: "Quick Links",
      connect: "Connect",
      madeWith: "Made with",
      and: "and",
      code: "code",
      designedBy: "Designed & Developed by Camila Rueda",
    },
  },
};
