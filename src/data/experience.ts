export interface Experience {
  start: string;
  end: string;
  role: string;
  company: string;
  description: string[];
  skills: string[];
  link?: string;
}

export const experiences: Experience[] = [
  {
    start: "Sep 2025",
    end: "Present",
    role: "Site Reliability Engineer",
    company: "Visa",
    description: [
      "Developing AI-driven predictive analytics to forecast database health anomalies.",
      "Analyzing volume of incoming workloads to optimize system performance and reliability.",
      "Ensuring high availability and scalability of critical financial infrastructure."
    ],
    skills: ["AI/ML", "Predictive Analytics", "SRE", "Database", "System Design"],
    link: "https://www.visa.com"
  },
  {
    start: "May 2025",
    end: "Sep 2025",
    role: "Solutions Engineer",
    company: "Allegion US",
    description: [
      "Onboarded and trained B2B customers on REST APIs and SDKs for security solutions.",
      "Performed root cause analysis for customer-escalated issues across distributed cloud and mobile platforms.",
      "Enhanced API and SDK documentation based on client feedback to improve developer experience."
    ],
    skills: ["REST APIs", "SDKs", "Mobile Security", "B2B Support"],
    link: "https://www.allegion.com"
  },
  {
    start: "Jun 2024",
    end: "Aug 2024",
    role: "Mobile Engineer Intern — Accessibility Team",
    company: "Fidelity Investments",
    description: [
      "Produced reusable Jetpack Compose components and automated accessibility lint rules.",
      "Collaborated cross-functionally to triage accessibility issues.",
      "Drove Agile story refinement and led peer reviews emphasizing WCAG compliance."
    ],
    skills: ["Kotlin", "Jetpack Compose", "Accessibility", "WCAG", "Agile"],
    link: "https://www.fidelity.com"
  },
  {
    start: "May 2023",
    end: "Aug 2023",
    role: "Enterprise Technology Platform Intern",
    company: "Southern Glazer's Wine & Spirits",
    description: [
      "Performed root cause analysis for REST API defects in Java microservices.",
      "Strengthened CI/CD pipelines using Jenkins and JUnit, increasing code coverage from 65% to 88%.",
      "Pioneered a sentiment analysis proof-of-concept using weather and social media data."
    ],
    skills: ["Java", "Spring Boot", "Jenkins", "JUnit", "CI/CD"],
    link: "https://www.southernglazers.com"
  },
  {
    start: "Aug 2022",
    end: "Mar 2024",
    role: "Co‑Founder & Full Stack Developer",
    company: "Hidden Gems (Startup)",
    description: [
      "Architected a cloud‑native marketplace handling full lifecycle from concept to launch.",
      "Designed GraphQL schema and REST endpoints, implemented order management flows.",
      "Engineered a resilient AWS backend with Cognito for auth and CloudWatch for monitoring."
    ],
    skills: ["React", "GraphQL", "AWS", "Cognito", "DynamoDB", "Startup"],
    link: "#"
  }
];
