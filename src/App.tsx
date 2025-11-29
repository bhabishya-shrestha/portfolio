import { useState } from 'react';
import Layout from './components/Layout';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Section from './components/Section';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import { projects, type Project } from './data/projects';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Layout>
      <LeftPanel />
      <RightPanel>
        <Section id="about" title="About" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
           <p className="mb-4 text-[rgb(var(--text-secondary))] leading-relaxed">
            I am a computer engineer with a strong foundation in both <strong>mobile and full-stack development</strong>. 
            Currently, I work as a <strong>Site Reliability Engineer at Visa</strong>, where I focus on AI-driven predictive analytics to forecast database health anomalies and optimize system reliability.
          </p>
          <p className="mb-4 text-[rgb(var(--text-secondary))] leading-relaxed">
            Previously, I worked as a <strong>Solutions Engineer at Allegion US</strong> and built accessible mobile apps at <strong>Fidelity Investments</strong>. 
            My journey also includes optimizing enterprise platforms at <strong>Southern Glazer's Wine & Spirits</strong> and co-founding <strong>Hidden Gems</strong>.
          </p>
          <p className="mb-4 text-[rgb(var(--text-secondary))] leading-relaxed">
            I specialize in building scalable, secure, and user-centric applications using modern technologies like <strong>React, Kotlin, AWS, and GraphQL</strong>. 
            I'm passionate about solving complex problems and delivering high-quality software that makes a real impact.
          </p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="flex flex-col gap-12">
            <ExperienceCard 
              start="Sep 2025"
              end="Present"
              role="Site Reliability Engineer"
              company="Visa"
              description={[
                "Developing AI-driven predictive analytics to forecast database health anomalies.",
                "Analyzing volume of incoming workloads to optimize system performance and reliability.",
                "Ensuring high availability and scalability of critical financial infrastructure."
              ]}
              skills={["AI/ML", "Predictive Analytics", "SRE", "Database", "System Design"]}
              link="https://www.visa.com"
            />
            <ExperienceCard 
              start="May 2025"
              end="Sep 2025"
              role="Solutions Engineer"
              company="Allegion US"
              description={[
                "Onboarded and trained B2B customers on REST APIs and SDKs for security solutions.",
                "Performed root cause analysis for customer-escalated issues across distributed cloud and mobile platforms.",
                "Enhanced API and SDK documentation based on client feedback to improve developer experience."
              ]}
              skills={["REST APIs", "SDKs", "Mobile Security", "B2B Support"]}
              link="https://www.allegion.com"
            />
            <ExperienceCard 
              start="Jun 2024"
              end="Aug 2024"
              role="Mobile Engineer Intern — Accessibility Team"
              company="Fidelity Investments"
              description={[
                "Produced reusable Jetpack Compose components and automated accessibility lint rules.",
                "Collaborated cross-functionally to triage accessibility issues.",
                "Drove Agile story refinement and led peer reviews emphasizing WCAG compliance."
              ]}
              skills={["Kotlin", "Jetpack Compose", "Accessibility", "WCAG", "Agile"]}
              link="https://www.fidelity.com"
            />
            <ExperienceCard 
              start="May 2023"
              end="Aug 2023"
              role="Enterprise Technology Platform Intern"
              company="Southern Glazer's Wine & Spirits"
              description={[
                "Performed root cause analysis for REST API defects in Java microservices.",
                "Strengthened CI/CD pipelines using Jenkins and JUnit, increasing code coverage from 65% to 88%.",
                "Pioneered a sentiment analysis proof-of-concept using weather and social media data."
              ]}
              skills={["Java", "Spring Boot", "Jenkins", "JUnit", "CI/CD"]}
              link="https://www.southernglazers.com"
            />
            <ExperienceCard 
              start="Aug 2022"
              end="Mar 2024"
              role="Co‑Founder & Full Stack Developer"
              company="Hidden Gems (Startup)"
              description={[
                "Architected a cloud‑native marketplace handling full lifecycle from concept to launch.",
                "Designed GraphQL schema and REST endpoints, implemented order management flows.",
                "Engineered a resilient AWS backend with Cognito for auth and CloudWatch for monitoring."
              ]}
              skills={["React", "GraphQL", "AWS", "Cognito", "DynamoDB", "Startup"]}
              link="#"
            />
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="flex flex-col gap-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                skills={project.techStack}
                image={project.media.heroImage}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="rounded-2xl border border-[rgb(var(--border))] p-6 glass">
            <h3 className="mb-4 text-lg font-semibold text-[rgb(var(--text-primary))]">Technical Skills</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider mb-2">Languages & Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript/TypeScript", "Kotlin", "NodeJS", "React", "Jetpack Compose", "GraphQL"].map(skill => (
                    <span key={skill} className="rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider mb-2">Cloud & DevOps</h4>
                <div className="flex flex-wrap gap-2">
                  {["AWS (Lambda, S3, DynamoDB, Cognito)", "Git", "Jenkins", "CI/CD", "Linux/UNIX"].map(skill => (
                    <span key={skill} className="rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
               <div>
                <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider mb-2">Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "MySQL", "DynamoDB", "MongoDB"].map(skill => (
                    <span key={skill} className="rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <footer className="max-w-md pb-16 text-sm text-[rgb(var(--text-secondary))] sm:pb-0">
          <p>
            Designed in <span className="font-medium text-[rgb(var(--text-primary))]">Figma</span> and coded in <span className="font-medium text-[rgb(var(--text-primary))]">Visual Studio Code</span> by yours truly. Built with <span className="font-medium text-[rgb(var(--text-primary))]">React</span> and <span className="font-medium text-[rgb(var(--text-primary))]">Tailwind CSS</span>, deployed with <span className="font-medium text-[rgb(var(--text-primary))]">Vercel</span>.
          </p>
        </footer>
      </RightPanel>
      
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </Layout>
  );
}

export default App;
