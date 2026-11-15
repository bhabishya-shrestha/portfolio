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
      { name: "Deep Learning (PyTorch)", url: "https://pytorch.org" },
      { name: "Natural Language Processing (NLP)" },
      { name: "Computer Vision (OpenCV)", url: "https://opencv.org" },
      {
        name: "Tesseract OCR",
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
      { name: "Shell/Bash" },
      { name: "SQL" },
      { name: "GraphQL", url: "https://graphql.org" },
      { name: "React", url: "https://react.dev" },
      { name: "React Native (Expo)", url: "https://reactnative.dev" },
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
    title: "Cloud, DevOps & Systems",
    skills: [
      {
        name: "AWS (Lambda, DynamoDB, S3, Cognito)",
        url: "https://aws.amazon.com",
      },
      { name: "Azure", url: "https://azure.microsoft.com" },
      { name: "Docker", url: "https://www.docker.com" },
      { name: "Kubernetes", url: "https://kubernetes.io" },
      { name: "CI/CD (Jenkins, GitHub Actions)" },
      { name: "Grafana & Prometheus", url: "https://grafana.com" },
      { name: "ClickHouse", url: "https://clickhouse.com" },
      { name: "Tailscale & WireGuard", url: "https://tailscale.com" },
      { name: "Linux Administration (Ubuntu Server)" },
      { name: "Git", url: "https://git-scm.com" },
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "MSSQL", url: "https://www.microsoft.com/sql-server" },
      { name: "PostgreSQL", url: "https://www.postgresql.org" },
      { name: "Oracle Database", url: "https://www.oracle.com/database" },
      { name: "MySQL", url: "https://www.mysql.com" },
      { name: "DynamoDB", url: "https://aws.amazon.com/dynamodb" },
      { name: "MongoDB", url: "https://www.mongodb.com" },
      { name: "IBM Db2", url: "https://www.ibm.com/products/db2" },
      { name: "Apache Cassandra", url: "https://cassandra.apache.org" },
      { name: "Database Administration (SSMS)" },
    ],
  },
];
