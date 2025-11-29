import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeftPanel() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-[rgb(var(--text-primary))] sm:text-5xl"
        >
          <a href="/">Bhabishya Shrestha</a>
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-lg font-medium tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          Engineer 
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-xs leading-normal text-[rgb(var(--text-secondary))]"
        >
          I build accessible, pixel-perfect, and performant experiences for the web and mobile.
        </motion.p>

        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center py-3 active"
                >
                  <span className="nav-indicator mr-4 h-px w-8 bg-[rgb(var(--text-secondary))] transition-all group-hover:w-16 group-hover:bg-[rgb(var(--text-primary))] group-focus-visible:w-16 group-focus-visible:bg-[rgb(var(--text-primary))] motion-reduce:transition-none"></span>
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] group-focus-visible:text-[rgb(var(--text-primary))]">
                    {item.name}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.ul 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="ml-1 mt-8 flex items-center gap-5 lg:mt-0" 
        aria-label="Social media"
      >
        <li className="mr-5 text-xs">
          <a className="block hover:text-[rgb(var(--text-primary))] text-[rgb(var(--text-secondary))]" href="https://github.com/bhabishya-shrestha" target="_blank" rel="noreferrer">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
        </li>
        <li className="mr-5 text-xs">
          <a className="block hover:text-[rgb(var(--text-primary))] text-[rgb(var(--text-secondary))]" href="https://linkedin.com/in/shrestha-bhabishya" target="_blank" rel="noreferrer">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </li>
        <li className="mr-5 text-xs">
          <a className="block hover:text-[rgb(var(--text-primary))] text-[rgb(var(--text-secondary))]" href="mailto:bhabishya.k.shrestha@gmail.com" target="_blank" rel="noreferrer">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </a>
        </li>
        <li className="mr-5 text-xs">
          <a className="block hover:text-[rgb(var(--text-primary))] text-[rgb(var(--text-secondary))]" href="/resume.pdf" target="_blank" rel="noreferrer">
            <span className="sr-only">Resume</span>
            <FileText className="h-6 w-6" />
          </a>
        </li>
      </motion.ul>
    </header>
  );
}
