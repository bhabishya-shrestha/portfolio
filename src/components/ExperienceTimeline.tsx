import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "../data/experience";

export default function ExperienceTimeline() {
  return (
    <div className="relative space-y-12">
      {/* Vertical Timeline Line */}
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 bg-[rgb(var(--border))] hidden md:block md:left-[9.5rem]"
        aria-hidden="true"
      ></div>

      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ExperienceCard {...experience} />
        </motion.div>
      ))}
    </div>
  );
}
