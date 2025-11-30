import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Brain,
  MessageSquare,
  Search,
  FileText,
  Server,
  Cpu,
  Cloud,
  CheckCircle2,
  Play,
} from "lucide-react";

const PIPELINE_STEPS = [
  {
    id: "query",
    label: "User Query",
    icon: MessageSquare,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    id: "embedding",
    label: "Embedding",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    id: "search",
    label: "Vector Search",
    icon: Search,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    id: "context",
    label: "Context Retrieval",
    icon: Database,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    id: "generation",
    label: "LLM Generation",
    icon: Brain,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  {
    id: "response",
    label: "Final Response",
    icon: MessageSquare,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
];

const DEMO_QUERY = "What is the QoLT lab's mission?";
const DEMO_RESPONSE =
  "The Quality of Life Technology (QoLT) Laboratory's mission is to explore technological advancements and design intelligent systems for personalized health care, vital signs monitoring, and disease prevention.";

export default function QoltBotExperience() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
  };

  useEffect(() => {
    if (!isSimulating || activeStep >= PIPELINE_STEPS.length) {
      if (activeStep >= PIPELINE_STEPS.length) {
        setTimeout(() => setIsSimulating(false), 3000);
      }
      return;
    }

    const timer = setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 1500); // 1.5s per step

    return () => clearTimeout(timer);
  }, [activeStep, isSimulating]);

  return (
    <div className="w-full space-y-16 py-8">
      {/* Interactive RAG Pipeline Visualization */}
      <section className="relative rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="relative z-10">
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
                RAG Pipeline Visualization
              </h3>
              <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-xl">
                Watch how QoltBot processes your question using Retrieval
                Augmented Generation.
              </p>
            </div>
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-all ${
                isSimulating
                  ? "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] cursor-not-allowed"
                  : "bg-[rgb(var(--accent))] text-white hover:scale-105 shadow-lg shadow-blue-500/20"
              }`}
            >
              {isSimulating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Cpu className="h-5 w-5" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-current" />
                  Simulate Query
                </>
              )}
            </button>
          </div>

          {/* Pipeline Steps */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PIPELINE_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative">
                  {/* Connector Line */}
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[rgb(var(--border))] z-0">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: isCompleted ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-[rgb(var(--accent))]"
                      />
                    </div>
                  )}

                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      opacity:
                        index > activeStep && activeStep !== -1 ? 0.5 : 1,
                      borderColor:
                        isActive || isCompleted
                          ? "rgba(var(--accent), 0.5)"
                          : "rgba(var(--border), 1)",
                    }}
                    className={`relative z-10 flex flex-col items-center gap-4 rounded-xl border p-4 text-center transition-colors duration-300 ${
                      isActive
                        ? "bg-[rgb(var(--bg-secondary))] shadow-xl ring-1 ring-[rgb(var(--accent))]/50"
                        : "bg-[rgb(var(--bg-primary))]"
                    }`}
                  >
                    <div
                      className={`rounded-full p-3 ${step.bg} ${step.color} ring-1 ring-inset ${step.border}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-1">
                        Step {index + 1}
                      </div>
                      <div className="font-bold text-[rgb(var(--text-primary))] text-sm">
                        {step.label}
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-2 right-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : isActive ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]"
                        />
                      ) : null}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Content Display */}
          <div className="mt-8 min-h-[120px] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] p-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <span className="font-bold">U</span>
                  </div>
                  <p className="text-lg font-medium text-[rgb(var(--text-primary))]">
                    "{DEMO_QUERY}"
                  </p>
                </motion.div>
              )}
              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <p className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Generating Embeddings...
                  </p>
                  <div className="font-mono text-xs text-[rgb(var(--accent))] break-all">
                    [0.023, -0.145, 0.892, 0.331, -0.567, 0.112, ... 384
                    dimensions]
                  </div>
                </motion.div>
              )}
              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <Search className="h-5 w-5 text-yellow-500" />
                  <p className="text-[rgb(var(--text-primary))]">
                    Searching ChromaDB for nearest neighbors...
                  </p>
                </motion.div>
              )}
              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Retrieved Context
                  </p>
                  <div className="rounded bg-[rgb(var(--bg-secondary))] p-3 text-sm text-[rgb(var(--text-secondary))] border-l-4 border-green-500 italic">
                    "...Quality of Life Technology Laboratory’s mission is to
                    explore technological advancements..."
                  </div>
                </motion.div>
              )}
              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <Brain className="h-5 w-5 text-pink-500 animate-pulse" />
                  <p className="text-[rgb(var(--text-primary))]">
                    Synthesizing answer with GPT-3.5...
                  </p>
                </motion.div>
              )}
              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-[rgb(var(--accent))]/10 flex items-center justify-center text-[rgb(var(--accent))] shrink-0">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg text-[rgb(var(--text-primary))] leading-relaxed">
                      {DEMO_RESPONSE}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))]">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span>Generated in 1.2s</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Architecture Walkthrough */}
      {/* Architecture Walkthrough */}
      <section>
        <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))] mb-8">
          System Architecture
        </h3>
        <ArchitectureDiagram />
      </section>
    </div>
  );
}

function ArchitectureDiagram() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const components = [
    {
      id: "frontend",
      title: "Frontend",
      desc: "React + Vite hosted on Netlify",
      icon: Cloud,
    },
    {
      id: "gateway",
      title: "API Gateway",
      desc: "AWS API Gateway for WebSocket & REST",
      icon: Server,
    },
    {
      id: "lambda",
      title: "Compute",
      desc: "AWS Lambda (Serverless Python)",
      icon: Cpu,
    },
    {
      id: "chroma",
      title: "Vector DB",
      desc: "ChromaDB running in Docker",
      icon: Database,
    },
    {
      id: "s3",
      title: "Storage",
      desc: "AWS S3 for documents & audio",
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {components.map((item) => (
          <motion.div
            key={item.id}
            onHoverStart={() => setHoveredComponent(item.id)}
            onHoverEnd={() => setHoveredComponent(null)}
            whileHover={{
              x: 10,
              backgroundColor: "rgba(var(--bg-secondary), 0.5)",
            }}
            className={`flex items-center gap-4 rounded-xl border p-4 transition-colors cursor-default ${
              hoveredComponent === item.id
                ? "border-[rgb(var(--accent))] bg-[rgb(var(--bg-secondary))]/50"
                : "border-[rgb(var(--border))]"
            }`}
          >
            <div
              className={`rounded-lg p-2 transition-colors ${
                hoveredComponent === item.id
                  ? "bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))]"
                  : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]"
              }`}
            >
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <h4
                className={`font-bold transition-colors ${hoveredComponent === item.id ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]"}`}
              >
                {item.title}
              </h4>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Diagram */}
      <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/20 p-8 flex items-center justify-center min-h-[400px] overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        {/* Diagram Nodes */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
          {/* Frontend Node */}
          <DiagramNode
            id="frontend"
            icon={Cloud}
            label="Frontend"
            isActive={hoveredComponent === "frontend"}
          />

          <div className="h-8 w-0.5 bg-[rgb(var(--border))]" />

          {/* Gateway Node */}
          <DiagramNode
            id="gateway"
            icon={Server}
            label="API Gateway"
            isActive={hoveredComponent === "gateway"}
          />

          <div className="h-8 w-0.5 bg-[rgb(var(--border))]" />

          {/* Lambda Node */}
          <DiagramNode
            id="lambda"
            icon={Cpu}
            label="AWS Lambda"
            isActive={hoveredComponent === "lambda"}
          />

          <div className="grid grid-cols-2 gap-16 w-full max-w-xs relative">
            {/* Connecting Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-full h-4 border-t-2 border-x-2 border-[rgb(var(--border))] rounded-t-xl" />

            {/* Chroma Node */}
            <div className="flex flex-col items-center gap-2 pt-4">
              <DiagramNode
                id="chroma"
                icon={Database}
                label="ChromaDB"
                isActive={hoveredComponent === "chroma"}
              />
            </div>

            {/* S3 Node */}
            <div className="flex flex-col items-center gap-2 pt-4">
              <DiagramNode
                id="s3"
                icon={FileText}
                label="S3 Storage"
                isActive={hoveredComponent === "s3"}
              />
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-[rgb(var(--text-secondary))]/60">
            Hover over components list to highlight architecture
          </p>
        </div>
      </div>
    </div>
  );
}

function DiagramNode({
  icon: Icon,
  label,
  isActive,
}: {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  id?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.1 : 1,
        borderColor: isActive
          ? "rgba(var(--accent), 1)"
          : "rgba(var(--border), 1)",
        backgroundColor: isActive
          ? "rgba(var(--bg-primary), 1)"
          : "rgba(var(--bg-secondary), 0.5)",
        boxShadow: isActive ? "0 0 20px rgba(var(--accent), 0.2)" : "none",
      }}
      className="flex flex-col items-center gap-2 rounded-xl border p-4 min-w-[120px] transition-colors"
    >
      <div
        className={`rounded-full p-2 ${isActive ? "text-[rgb(var(--accent))] bg-[rgb(var(--accent))]/10" : "text-[rgb(var(--text-secondary))]"}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <span
        className={`text-sm font-bold ${isActive ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]"}`}
      >
        {label}
      </span>
    </motion.div>
  );
}
