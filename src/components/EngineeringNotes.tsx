import { motion } from "framer-motion";
import NoteCard from "./NoteCard";
import { notes } from "../data/notes";

export default function EngineeringNotes() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NoteCard note={note} />
        </motion.div>
      ))}
    </div>
  );
}
