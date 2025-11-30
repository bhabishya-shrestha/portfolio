import { useState } from 'react';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import Section from '../components/Section';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import { projects, type Project } from '../data/projects';

// Skill URL Mapping
const SKILL_URLS: Record<string, string> = {
  'Python': 'https://www.python.org',
  'JavaScript/TypeScript': 'https://www.typescriptlang.org',
  'Kotlin': 'https://kotlinlang.org',
  'NodeJS': 'https://nodejs.org',
  'React': 'https://react.dev',
  'Jetpack Compose': 'https://developer.android.com/jetpack/compose',
  'GraphQL': 'https://graphql.org',
  'AWS (Lambda, S3, DynamoDB, Cognito)': 'https://aws.amazon.com',
  'Git': 'https://git-scm.com',
  'Jenkins': 'https://www.jenkins.io',
  'CI/CD': 'https://www.redhat.com/en/topics/devops/what-is-ci-cd',
  'Linux/UNIX': 'https://www.kernel.org',
  'PostgreSQL': 'https://www.postgresql.org',
  'MSSQL': 'https://www.microsoft.com/sql-server',
  'DynamoDB': 'https://aws.amazon.com/dynamodb',
  'MongoDB': 'https://www.mongodb.com',
};

import Layout from '../components/Layout';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Layout>
      <LeftPanel />
      <RightPanel>
        <Section id="about" title="About" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
          {/* Education & Certifications */}
          <div className="mb-12">
            <div className="flex flex-col gap-6">
              {/* Degree */}
              <div className="grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-secondary))] sm:col-span-2" aria-label="2021 to 2025">
                  2021 — 2025
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-[rgb(var(--text-primary))]">
                    <div>
                      <span className="inline-flex items-baseline font-medium leading-tight text-[rgb(var(--text-primary))] text-base">
                        The University of Texas at Dallas
                      </span>
                    </div>
                    <div className="text-[rgb(var(--text-secondary))] mt-1">
                      Richardson, TX
                    </div>
                  </h3>
                  <ul className="mt-2 text-sm leading-normal text-[rgb(var(--text-secondary))] space-y-1">
                    <li>
                      <span className="font-medium text-[rgb(var(--text-primary))]">Master of Science in Computer Engineering</span>
                      <span className="text-[rgb(var(--text-secondary))]"> • May 2025</span>
                    </li>
                    <li>
                      <span className="font-medium text-[rgb(var(--text-primary))]">Bachelor of Science in Computer Engineering</span>
                      <span className="text-[rgb(var(--text-secondary))]"> • May 2024</span>
                    </li>
                  </ul>
                  
                  {/* Certifications Inline */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="https://www.credly.com/badges/59ad26c1-c90c-47e5-9d9f-c05bcd1ff2b3/linked_in_profile" target="_blank" rel="noreferrer" className="relative z-20 inline-flex items-center gap-1 text-xs font-medium text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent))]">
                      <span className="border-b border-[rgb(var(--border))] pb-0.5 transition-colors group-hover:border-[rgb(var(--accent))]">AWS Certified Cloud Practitioner</span>
                    </a>
                    <a href="https://www.linkedin.com/learning/certificates/e5920d7beb2b72f008a412221267e9c77c770bb611490e8d9352582c914ab99d" target="_blank" rel="noreferrer" className="relative z-20 inline-flex items-center gap-1 text-xs font-medium text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent))]">
                      <span className="border-b border-[rgb(var(--border))] pb-0.5 transition-colors group-hover:border-[rgb(var(--accent))]">Android Accessibility</span>
                    </a>
                    <a href="https://www.linkedin.com/learning/certificates/f19f38b13fbe0a9115b25d150e1c4d924aaf0ab2091a57f71249a89ed8631086" target="_blank" rel="noreferrer" className="relative z-20 inline-flex items-center gap-1 text-xs font-medium text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent))]">
                      <span className="border-b border-[rgb(var(--border))] pb-0.5 transition-colors group-hover:border-[rgb(var(--accent))]">UX Accessibility</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
          <ExperienceTimeline />
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
                  {["Python", "JavaScript/TypeScript", "Kotlin", "NodeJS", "React", "Jetpack Compose", "GraphQL"].map(skill => {
                    const url = SKILL_URLS[skill];
                    const Tag = url ? 'a' : 'span';
                    return (
                      <Tag 
                        key={skill} 
                        href={url}
                        target={url ? "_blank" : undefined}
                        rel={url ? "noopener noreferrer" : undefined}
                        className={`rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))] transition-all ${
                          url ? 'hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))] hover:scale-105 cursor-pointer' : ''
                        }`}
                      >
                        {skill}
                      </Tag>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider mb-2">Cloud & DevOps</h4>
                <div className="flex flex-wrap gap-2">
                  {["AWS (Lambda, S3, DynamoDB, Cognito)", "Git", "Jenkins", "CI/CD", "Linux/UNIX"].map(skill => {
                    const url = SKILL_URLS[skill];
                    const Tag = url ? 'a' : 'span';
                    return (
                      <Tag 
                        key={skill} 
                        href={url}
                        target={url ? "_blank" : undefined}
                        rel={url ? "noopener noreferrer" : undefined}
                        className={`rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))] transition-all ${
                          url ? 'hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))] hover:scale-105 cursor-pointer' : ''
                        }`}
                      >
                        {skill}
                      </Tag>
                    );
                  })}
                </div>
              </div>
               <div>
                <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider mb-2">Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "MSSQL", "DynamoDB", "MongoDB"].map(skill => {
                    const url = SKILL_URLS[skill];
                    const Tag = url ? 'a' : 'span';
                    return (
                      <Tag 
                        key={skill} 
                        href={url}
                        target={url ? "_blank" : undefined}
                        rel={url ? "noopener noreferrer" : undefined}
                        className={`rounded-full bg-[rgb(var(--bg-secondary))] px-3 py-1 text-sm text-[rgb(var(--text-primary))] transition-all ${
                          url ? 'hover:bg-[rgb(var(--accent))]/10 hover:text-[rgb(var(--accent))] hover:scale-105 cursor-pointer' : ''
                        }`}
                      >
                        {skill}
                      </Tag>
                    );
                  })}
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
