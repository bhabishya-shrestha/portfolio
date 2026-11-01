export interface Skill {
  name: string;
  url?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "LLMs" },
      { name: "RAG Architectures" },
      {
        name: "Agentic Frameworks (MCP)",
        url: "https://modelcontextprotocol.io",
      },
      { name: "OpenCV", url: "https://opencv.org" },
      {
        name: "Tesseract",
        url: "https://github.com/tesseract-ocr/tesseract",
      },
      { name: "Time-Series Forecasting" },
    ],
  },
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Python", url: "https://www.python.org" },
      { name: "C++", url: "https://isocpp.org" },
      { name: "Java", url: "https://www.java.com" },
      {
        name: "JavaScript/TypeScript",
        url: "https://www.typescriptlang.org",
      },
      { name: "SQL" },
      { name: "GraphQL", url: "https://graphql.org" },
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "FastAPI", url: "https://fastapi.tiangolo.com" },
      { name: "Kotlin", url: "https://kotlinlang.org" },
      {
        name: "Jetpack Compose",
        url: "https://developer.android.com/jetpack/compose",
      },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      {
        name: "AWS (Lambda, DynamoDB, S3, Cognito)",
        url: "https://aws.amazon.com",
      },
      { name: "Azure", url: "https://azure.microsoft.com" },
      { name: "Docker", url: "https://www.docker.com" },
      { name: "Kubernetes", url: "https://kubernetes.io" },
      { name: "Jenkins", url: "https://www.jenkins.io" },
      {
        name: "CI/CD",
        url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
      },
      { name: "Git", url: "https://git-scm.com" },
      { name: "Linux/UNIX", url: "https://www.kernel.org" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MSSQL", url: "https://www.microsoft.com/sql-server" },
      { name: "PostgreSQL", url: "https://www.postgresql.org" },
      { name: "MySQL", url: "https://www.mysql.com" },
      { name: "DynamoDB", url: "https://aws.amazon.com/dynamodb" },
      { name: "MongoDB", url: "https://www.mongodb.com" },
      { name: "Database Administration (SSMS)" },
    ],
  },
];
