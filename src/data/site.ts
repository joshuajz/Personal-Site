export const site = {
  name: "Josh Cowan",
  firstName: "Josh",
  lastName: "Cowan",
  title: "Full-Stack Developer",
  email: "cowanjzc@gmail.com",
  url: "https://joshcowan.com",
  github: "https://github.com/joshuajz",
  linkedin: "https://www.linkedin.com/in/josh-cowan6/",
  locale: "en_CA",
  language: "en-CA",
  socialImage: "/social-preview.png",
  socialImageType: "image/png",
  socialImageAlt: "Josh Cowan, Full-Stack Developer.",
  description:
    "Josh Cowan is a full-stack software developer building client-facing investing workflows with React, TypeScript, .NET, Go, and REST APIs.",
};

export const navigationLinks = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/#technical", label: "Work", sectionId: "technical" },
  { href: "/#projects", label: "Build", sectionId: "projects" },
  { href: "/#otherexperience", label: "Community", sectionId: "otherexperience" },
  { href: "/blog/", label: "Blog", sectionId: "blog" },
  { href: "/tools/", label: "Tools", sectionId: "tools" },
];

export const typewriterPhrases = [
  "Building @ RBC Direct Investing",
  "One project, too many browser tabs",
  "Building things I wish existed",
  "Photographing the world",
];

export const jobs = [
  {
    logo: "rbc",
    companyName: "Royal Bank of Canada - Direct Investing",
    title: "Full-Stack Software Developer",
    timeline: "July 2025 - Present",
    description: [
      "Led the frontend rebuild of the Account Open SPA using React, TypeScript, and Formik to support real-time account opening for over 1 million RBC Direct Investing clients.",
      "Built page-level validation, regulatory data lookups, PDF-generation API requests, final submission flows, and Google Analytics reporting.",
      "Partnered with backend and downstream teams to move Account Open from next-day processing toward real-time scaffolding and review, contributing to 80% straight-through processing and 70,000+ accounts opened.",
    ],
    techGridList: ["React", "TypeScript", "Formik", "C# .NET Core", "REST APIs", "Google Analytics"],
  },
  {
    logo: "rbc",
    companyName: "Royal Bank of Canada",
    title: "Fullstack Software Developer Intern",
    timeline: "Summer 2022, 2023, 2024",
    description: [
      "Completed the frontend development of a modernized Transfer Stock page to allow clients to transfer between accounts.",
      "Mentored high school interns by answering technical questions and helping them onboard smoothly onto the Direct Investing team.",
      "Refactored the Direct Investing notification page from a fullstack perspective to utilize modern technologies (React.js & C# .NET Core) to improve the user experience for all clients.",
      "Provided essential maintenance and support for the Account Open flow, including a significant overhaul of the joint account form in order to on board RBC clients.",
      "Demoed in-progress and finished projects to key business stakeholders."
    ],
    techGridList: ["Javascript + Typescript", "HTML/CSS", "React.js", "C# .NET Core"],
  },
  {
    logo: "queens",
    companyName: "Queen's University",
    title: "Teaching Assistant",
    timeline: "September 2023 - May 2025",
    description: [
      "Served as a Teaching Assistant for CISC102 (Discrete Math) for one term and CISC322 (Software Architecture) for two terms.",
      "Provided educational support through office hours, review sessions, and one-on-one sessions, aiding students in understanding complicated course material.",
      "Conducted timely and consistent grading of assignments and exams, delivering feedback for student growth.",
    ],
    techGridList: [],
  },
];

export const projects = [
  {
    emoji: "🛍️",
    name: "Uniqlo Price Tracker",
    preview: "prices" as const,
    description:
      "Tracks price changes across the Canadian Uniqlo online store, with automated scraping, a Go API, and a live React dashboard.",
    modalTitle: "Uniqlo Price Tracker",
    modalDescription:
      "A full-stack application that monitors pricing changes for products on the Canadian Uniqlo online store. A Python scraper runs on a schedule via GitHub Actions to collect up-to-date pricing data, a Go API serves and manages that data, and a React + TypeScript frontend displays current prices and historical trends. Deployed live on Vercel.",
    tech: ["React", "TypeScript", "Go", "Python", "PostgreSQL", "TanStack Query", "GitHub Actions", "Vite"],
    githubLink: "https://github.com/joshuajz/Uniqlo-Pricetracker",
    liveLink: "https://www.uniqlotracker.com/",
    modalTheme: "dark",
  },
  {
    emoji: "🤖",
    name: "Borg - A University Discord Bot",
    displayName: "Borg",
    preview: "community" as const,
    description:
      "A Discord bot for Canadian university students featuring admissions decision tracking, course lookups, and community tools for 2,000+ users.",
    modalTitle: "Borg - A University Discord Bot",
    modalDescription:
      "A multi-purpose Discord bot built for Canadian university students. Features include university admissions decision tracking (allowing students to log and view acceptance data), course information lookups for Canadian universities, and quality-of-life community tools. Served over 2,000 users across multiple university servers, with data persisted in PostgreSQL.",
    tech: ["Python", "PostgreSQL", "Discord.py"],
    githubLink: "https://github.com/joshuajz/Borg",
    liveLink: "",
    modalTheme: "light",
  },
  {
    emoji: "MCP",
    icon: "/google-tasks-icon.svg",
    name: "Google Tasks MCP",
    preview: "tasks" as const,
    description: "Manage Google Tasks from MCP-compatible AI clients.",
    modalTitle: "Google Tasks MCP",
    modalDescription:
      "A Model Context Protocol server that connects Google Tasks to MCP-compatible AI clients. It exposes task-list and task operations through OAuth-backed tools, including creating, updating, moving, completing, deleting, and clearing tasks from natural-language workflows.",
    tech: ["TypeScript", "Node.js", "Google Tasks API", "OAuth 2.0", "MCP"],
    githubLink: "https://github.com/joshuajz/Google-Tasks-MCP",
    liveLink: "",
    modalTheme: "orange",
  },
];

export const volunteerJobs = [
  {
    orgName: "Computing Student's Association",
    role: "Vice President of Operations",
    description:
      "Oversaw a $50,000+ annual budget and provided high-level operational leadership across a 100+ person organization, managing 4 direct reports and coordinating students across operations.",
    accentColor: "#0A6847",
  },
  {
    orgName: "Queen's Web Development Club",
    role: "Education Executive",
    description:
      "Led a team of four to create lessons, starter code, and assignments for HTML, CSS, React.js, and Node.js, presenting weekly lectures to 20-30 students.",
    accentColor: "#b9472d",
  },
];
