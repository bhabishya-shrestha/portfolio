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
    start: "Oct 2025",
    end: "Present",
    role: "Site Reliability Engineer (SRE)",
    company: "Visa",
    description: [
      "GenAI Initiative Lead: architecting an agentic AI framework using the Model Context Protocol (MCP) to automate database triage for large-scale incidents across MSSQL, PostgreSQL, Oracle, MySQL, MongoDB, Db2, and Cassandra, integrated with Grafana and centralized logging (ClickHouse).",
      "Incident Automation: combining the triage tooling with historical ServiceNow ticket data to surface similar past incidents and quick SOP resolution guides on every incident.",
      "Applied ML: exploring time-series forecasting models to support capacity planning (early stage).",
      "Database Reliability: managing high-availability MSSQL clusters, including patching, replication management, and access control governance for global distributed payment systems.",
      "Automation: building Python and Shell scripts for database reliability audits and smoke tests, supporting 99.99% availability for critical payment rails.",
    ],
    skills: [
      "MCP",
      "Agentic AI",
      "Incident Automation",
      "MSSQL",
      "Python",
      "SRE",
    ],
    link: "https://www.visa.com",
  },
  {
    start: "May 2025",
    end: "Oct 2025",
    role: "Solutions Engineer",
    company: "Allegion US",
    description: [
      "Served as the technical SME for mobile credential platforms, onboarding B2B customers on REST APIs and SDK integrations.",
      "Conducted deep-dive root cause analysis for escalated issues across distributed cloud and mobile platforms, working with engineering to define permanent fixes.",
      "Refined API documentation based on developer feedback to streamline partner integrations.",
    ],
    skills: ["REST APIs", "SDKs", "Mobile Security", "B2B Support"],
    link: "https://www.allegion.com",
  },
  {
    start: "Jun 2024",
    end: "Aug 2024",
    role: "Mobile Engineer Intern — Accessibility Team",
    company: "Fidelity Investments",
    description: [
      "Produced reusable Jetpack Compose components and automated accessibility lint rules, improving UI consistency and secure-coding standards across an internal Android app.",
      "Delivered a technical pitch to the VP of Engineering advocating enterprise-wide adoption of Jetpack Compose for improved security and development efficiency.",
      "Drove Agile story refinement with product and QA teams; led peer reviews emphasizing performance and WCAG compliance.",
    ],
    skills: ["Kotlin", "Jetpack Compose", "Accessibility", "WCAG", "Agile"],
    link: "https://www.fidelity.com",
  },
  {
    start: "May 2023",
    end: "Aug 2023",
    role: "Enterprise Technology Platform Intern",
    company: "Southern Glazer's Wine & Spirits",
    description: [
      "Strengthened CI/CD pipelines using Jenkins and JUnit to automate testing, increasing code coverage from 65% to 88%.",
      "Presented sentiment analysis research to leadership, focusing on data privacy, secure data handling, and customer feedback loops to optimize product distribution.",
      "Performed root cause analysis for REST API defects in production Java microservices.",
    ],
    skills: ["Java", "Spring Boot", "Jenkins", "JUnit", "CI/CD"],
    link: "https://www.southernglazers.com",
  },
  {
    start: "Aug 2022",
    end: "Mar 2024",
    role: "Co‑Founder & Full Stack Developer",
    company: "Hidden Gems (Startup)",
    description: [
      "Architected a cloud-native marketplace connecting local restaurants with corporate catering clients, owning the full SDLC.",
      "Designed the GraphQL schema and REST endpoints, implemented order management flows, and enforced role-based access with AWS Cognito.",
      "Engineered and maintained a resilient AWS backend (DynamoDB/Lambda) and built CloudWatch dashboards to monitor system health.",
    ],
    skills: ["React", "GraphQL", "AWS", "Cognito", "DynamoDB", "Startup"],
    link: "#",
  },
];
