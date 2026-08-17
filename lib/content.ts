import {
  Bot,
  Braces,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Network,
  Search,
  ServerCog,
  Workflow,
  Zap
} from "lucide-react";

export const contact = {
  email: "",
  github: "https://github.com/smitgadhiya",
  linkedin: "https://linkedin.com/in/smitgadhiya",
  availability: true
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const capabilities = [
  "Full-Stack",
  "Backend",
  "AI Integration",
  "Automation",
  "System Architecture",
  "Search",
  "Cloud"
];

export const builds = [
  {
    title: "Full-Stack Web Applications",
    icon: Layers3,
    description:
      "Build complete web applications with modern frontend, backend APIs, databases, authentication, authorization, and integrations.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB"]
  },
  {
    title: "Backend & API Systems",
    icon: ServerCog,
    description:
      "Design REST APIs, modular backend services, authentication systems, background processing, and scalable backend architecture.",
    tech: ["Node.js", "Express", "REST", "Redis", "WebSockets"]
  },
  {
    title: "AI-Powered Applications",
    icon: Bot,
    description:
      "Integrate AI into existing products or build AI-first applications for parsing, generation, RAG search, recommendations, and assisted workflows.",
    tech: ["OpenAI API", "RAG", "Vector DB", "Elasticsearch"]
  },
  {
    title: "Automation & Workflows",
    icon: Workflow,
    description:
      "Automate repetitive business processes and connect different systems using APIs, webhooks, workflow tools, and AI.",
    tech: ["n8n", "APIs", "Webhooks", "OpenAI"]
  },
  {
    title: "Scalable Systems",
    icon: Network,
    description:
      "Build systems using asynchronous processing, queues, event-driven architecture, caching, and service-oriented boundaries.",
    tech: ["RabbitMQ", "BullMQ", "AWS SQS/SNS", "Redis"]
  },
  {
    title: "Search & Data Retrieval",
    icon: Search,
    description:
      "Build fast and relevant search experiences using traditional indexing, semantic search, and practical retrieval design.",
    tech: ["Elasticsearch", "Vector DB", "Chroma"]
  }
];

export type Project = {
  name: string;
  badge: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  highlights: string[];
  outcomes: string[];
  architecture: string[][];
  secondaryArchitecture?: string[][];
  focus: string;
};

export const projects: Project[] = [
  {
    name: "Levelios",
    badge: "Project Management System",
    description:
      "A role-based project management platform designed to manage organizations, projects, teams, employees, and skill progression.",
    problem:
      "Organizations needed structured project, team, employee, and skill management with scoped access for different roles.",
    solution:
      "Built a full-stack SaaS-style platform with RBAC, organization-level dashboards, approval workflows, and AI-assisted employee and candidate workflows.",
    tech: [
      "Next.js",
      "Node.js",
      "Express",
      "Redis",
      "OpenAI API",
      "Event-Driven Architecture",
      "Opalstack"
    ],
    highlights: [
      "Full-stack RBAC architecture",
      "Admin, Manager, and Employee roles",
      "Scoped data access",
      "Project and team management",
      "Intelligent employee and team recommendations",
      "Resume upload and automatic resume parsing",
      "AI-powered candidate information extraction",
      "Skill progression tracking",
      "Manager approval workflows",
      "Organization-level dashboards"
    ],
    outcomes: ["Made organization, project, team, and skill workflows manageable in one SaaS-style system."],
    architecture: [["Frontend", "API", "Backend", "Redis", "Database"]],
    secondaryArchitecture: [["Resume", "OpenAI", "Structured Candidate Data"]],
    focus: "Product architecture, RBAC, AI extraction, and team workflow design."
  },
  {
    name: "My Ayur",
    badge: "Healthcare Platform",
    description:
      "A healthcare platform backend designed to serve thousands of users while processing large volumes of notifications.",
    problem:
      "The platform needed reliable backend services, authorization, notifications, and faster API responses at meaningful usage scale.",
    solution:
      "Designed service boundaries, queue-based notification processing, Redis caching, JWT authentication, RBAC, Docker workflows, and CI/CD.",
    tech: ["Node.js", "Microservices", "Docker", "AWS SNS/SQS", "Redis", "GitHub Actions"],
    highlights: [
      "4-5 microservices",
      "AWS SNS/SQS",
      "Redis caching",
      "JWT authentication",
      "RBAC",
      "Docker",
      "CI/CD with GitHub Actions",
      "Backend API optimization"
    ],
    outcomes: [
      "7,000+ users",
      "20,000+ notifications/day",
      "40-50% API response-time improvement through Redis caching"
    ],
    architecture: [["API Gateway / Backend", "Microservices", "Queue", "Notification Workers", "AWS SNS/SQS"]],
    secondaryArchitecture: [["Redis", "Caching"]],
    focus: "Backend architecture, asynchronous processing, caching, and operational throughput."
  },
  {
    name: "Quiz Prep",
    badge: "AI-Powered Exam Practice Platform",
    description:
      "An exam preparation platform where administrators manage hundreds of question categories and automatically generate new questions using AI-powered workflows.",
    problem:
      "Admins needed a practical way to maintain a large question taxonomy and generate fresh practice questions without repetitive manual work.",
    solution:
      "Built role-based exam management with category workflows and an n8n to OpenAI automation pipeline for generated questions.",
    tech: ["Next.js", "Node.js", "Express", "n8n", "OpenAI API"],
    highlights: [
      "Admin/User roles",
      "Around 400 question categories",
      "Category and subcategory management",
      "Practice exams",
      "Automated question generation",
      "n8n workflow",
      "OpenAI API integration"
    ],
    outcomes: ["Reduced manual question creation through an AI-powered workflow controlled by admins."],
    architecture: [["Category + Subcategory + Count", "n8n Workflow", "OpenAI", "Generated Questions", "Database"]],
    focus: "AI workflow automation, admin UX, and structured exam content management."
  },
  {
    name: "NancyPackes",
    badge: "Building Management System",
    description:
      "A modern React-based building management system handling property, lease, and agent data across 40+ residential properties.",
    problem:
      "A legacy property management workflow needed a cleaner frontend and reusable components for dense operational data.",
    solution:
      "Migrated the interface into reusable React components with flexible tables, exports, infinite scrolling, and role-based rendering.",
    tech: ["React.js"],
    highlights: [
      "Migrated a legacy property management system",
      "40+ residential properties",
      "Reusable data table",
      "Pagination",
      "Sorting",
      "Dynamic columns",
      "Universal Excel export",
      "Infinite scrolling",
      "Role-based UI rendering",
      "Four user roles"
    ],
    outcomes: ["Created reusable frontend patterns for property, lease, and agent data workflows."],
    architecture: [["Role-Based UI", "Reusable Table", "Property Data", "Lease Data", "Excel Export"]],
    focus: "Frontend engineering, reusable component architecture, and operational data interfaces."
  }
];

export const principles = [
  {
    title: "Build for maintainability",
    icon: Braces,
    text: "Prefer modular architecture, reusable components, clean APIs, and understandable code."
  },
  {
    title: "Design for scale",
    icon: GitBranch,
    text: "Use caching, queues, asynchronous processing, and appropriate architecture when the workload requires it."
  },
  {
    title: "Automate repetitive work",
    icon: Zap,
    text: "Use n8n and APIs to remove unnecessary manual processes."
  },
  {
    title: "Use AI where it creates value",
    icon: Bot,
    text: "AI should solve a real product problem rather than being added simply because it is popular."
  },
  {
    title: "Ship end-to-end",
    icon: Cloud,
    text: "Frontend, backend, database, integrations, deployment, and production considerations."
  }
];

export const stackGroups = [
  ["Frontend", ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "RTK Query", "TanStack Query", "Vite", "Radix UI"]],
  ["Backend", ["Node.js", "Express", "REST APIs", "Microservices", "WebSockets", "SSE", "Event-Driven Architecture"]],
  ["Databases & Search", ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Chroma", "Vector Databases"]],
  ["Messaging", ["RabbitMQ", "BullMQ", "AWS SQS", "AWS SNS"]],
  ["AI & Automation", ["OpenAI API", "RAG", "n8n"]],
  ["Cloud & DevOps", ["AWS", "Docker", "GitHub Actions", "Nginx", "Cloudflare", "Opalstack"]],
  ["Languages", ["JavaScript", "TypeScript", "Go"]]
] as const;

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Empiric Infotech LLP",
    period: "Aug 2025 - Present",
    points: [
      "RESTful backend services with Node.js and Express.js",
      "MongoDB and PostgreSQL",
      "Event-driven and queue-based systems",
      "Background jobs and asynchronous processing",
      "n8n workflow automation",
      "Vector database and Elasticsearch search",
      "AI-assisted development",
      "Modular and maintainable architecture"
    ]
  },
  {
    role: "Frontend Developer",
    company: "Bigscal Technologies Pvt Ltd.",
    period: "Jan 2025 - Jul 2025",
    points: [
      "React.js",
      "Next.js",
      "Material UI",
      "Tailwind CSS",
      "Context API",
      "Redux Toolkit",
      "RTK Query",
      "Reusable UI components",
      "Responsive applications",
      "Data-fetching optimization"
    ]
  }
];

export const education = {
  degree: "Bachelor of Engineering - Computer Engineering",
  school: "Shree Swami Atmanand Saraswati Institute of Technology",
  period: "2021 - 2025",
  cgpa: "CGPA: 8.17/10.0"
};

export const visualNodes = [
  { label: "Client", icon: Code2 },
  { label: "Frontend", icon: Layers3 },
  { label: "API", icon: ServerCog },
  { label: "Services", icon: Network },
  { label: "Database", icon: Database }
];
