import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Brain,
  MessageSquare,
  Search,
  Server,
  Cpu,
  Cloud,
  CheckCircle2,
  Play,
  Mic,
  Zap,
  HardDrive,
} from "lucide-react";
import { ArchitectureNode } from "./ArchitectureNode";

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
    if (!isSimulating) return;

    if (activeStep >= PIPELINE_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setIsSimulating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 1500); // 1.5s per step

    return () => clearTimeout(timer);
  }, [activeStep, isSimulating]);

  const handleStepClick = (index: number) => {
    // Allow manual navigation when not simulating or after simulation completes
    if (!isSimulating) {
      setActiveStep(index);
    }
  };

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
                    onClick={() => handleStepClick(index)}
                    whileHover={{ scale: !isSimulating ? 1.02 : 1 }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      opacity:
                        index > activeStep && activeStep !== -1 ? 0.5 : 1,
                      borderColor:
                        isActive || isCompleted
                          ? "rgba(var(--accent), 0.5)"
                          : "rgba(var(--border), 1)",
                    }}
                    className={`relative z-10 flex flex-col items-center gap-4 rounded-xl border p-4 text-center transition-all duration-300 ${
                      isActive
                        ? "bg-[rgb(var(--bg-secondary))] shadow-xl ring-1 ring-[rgb(var(--accent))]/50"
                        : "bg-[rgb(var(--bg-primary))]"
                    } ${!isSimulating ? "cursor-pointer hover:bg-[rgb(var(--bg-secondary))]/50" : ""}`}
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

          {/* Helper Text */}
          {!isSimulating && activeStep !== -1 && (
            <p className="text-center text-sm text-[rgb(var(--text-secondary))]/80 mt-4">
              Click on any step to view its details
            </p>
          )}

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
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const flows = [
    {
      id: "chat",
      label: "Chat Flow",
      path: ["frontend", "gateway", "lambda", "chroma", "openai"],
    },
    {
      id: "voice",
      label: "Voice Flow",
      path: ["frontend", "gateway", "lambda", "s3", "transcribe", "eventbridge", "sns"],
    },
    {
      id: "upload",
      label: "Upload Flow",
      path: ["frontend", "gateway", "lambda", "s3"],
    },
  ];

  const components = [
    {
      id: "frontend",
      title: "React Frontend",
      desc: "Netlify hosted SPA",
      icon: Cloud,
      category: "client",
      url: "https://react.dev",
    },
    {
      id: "gateway",
      title: "API Gateway",
      desc: "WebSocket & REST APIs",
      icon: Server,
      category: "aws",
      url: "https://aws.amazon.com/api-gateway/",
    },
    {
      id: "lambda",
      title: "Lambda Functions",
      desc: "Docker containers (FastAPI)",
      icon: Cpu,
      category: "aws",
      url: "https://aws.amazon.com/lambda/",
    },
    {
      id: "chroma",
      title: "ChromaDB",
      desc: "Vector embeddings storage",
      icon: Database,
      category: "database",
      url: "https://docs.trychroma.com",
    },
    {
      id: "openai",
      title: "OpenAI API",
      desc: "GPT-3.5 Turbo",
      icon: Brain,
      category: "external",
      url: "https://platform.openai.com/docs/introduction",
    },
    {
      id: "s3",
      title: "S3 Storage",
      desc: "Documents & audio files",
      icon: HardDrive,
      category: "aws",
      url: "https://aws.amazon.com/s3/",
    },
    {
      id: "transcribe",
      title: "AWS Transcribe",
      desc: "Speech-to-text",
      icon: Mic,
      category: "aws",
      url: "https://aws.amazon.com/transcribe/",
    },
    {
      id: "eventbridge",
      title: "EventBridge",
      desc: "Event orchestration",
      icon: Zap,
      category: "aws",
      url: "https://aws.amazon.com/eventbridge/",
    },
    {
      id: "sns",
      title: "SNS",
      desc: "Notification service",
      icon: MessageSquare,
      category: "aws",
      url: "https://aws.amazon.com/sns/",
    },
    {
      id: "rds",
      title: "RDS PostgreSQL",
      desc: "User authentication DB",
      icon: Database,
      category: "database",
      url: "https://aws.amazon.com/rds/postgresql/",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Flow Selector */}
      {/* Interactive Architecture Diagram */}
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/20 p-4 md:p-8">
        {/* Flow Selector - Sticky on Mobile */}
        <div className="sticky top-0 z-20 bg-[rgb(var(--bg-secondary))] md:bg-transparent -mx-4 px-4 py-4 md:p-0 md:static border-b md:border-0 border-[rgb(var(--border))] mb-6 md:mb-8 backdrop-blur-md md:backdrop-blur-none bg-opacity-90 md:bg-opacity-100">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedFlow(null)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                selectedFlow === null
                  ? "bg-[rgb(var(--accent))] text-white shadow-lg shadow-[rgb(var(--accent))]/20"
                  : "bg-[rgb(var(--bg-primary))] md:bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 border border-[rgb(var(--border))]"
              }`}
            >
              All
            </button>
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => setSelectedFlow(flow.id)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  selectedFlow === flow.id
                    ? "bg-[rgb(var(--accent))] text-white shadow-lg shadow-[rgb(var(--accent))]/20"
                    : "bg-[rgb(var(--bg-primary))] md:bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 border border-[rgb(var(--border))]"
                }`}
              >
                {flow.label}
              </button>
            ))}
          </div>
          {/* Mobile Helper Text */}
          <p className="md:hidden text-[10px] text-center text-[rgb(var(--text-secondary))] mt-2 opacity-80">
            Select a flow to highlight components
          </p>
        </div>

        {/* Desktop View - Full Layered Diagram */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Client Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Client Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "frontend")!}
                  isHighlighted={
                    hoveredComponent === "frontend" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("frontend"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* AWS Gateway Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                API Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "gateway")!}
                  isHighlighted={
                    hoveredComponent === "gateway" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("gateway"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* Compute Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Compute Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "lambda")!}
                  isHighlighted={
                    hoveredComponent === "lambda" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("lambda"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Lines to Services */}
            <div className="relative h-16 mb-8">
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                {/* Main trunk */}
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="50%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
                {/* Branches */}
                <line
                  x1="50%"
                  y1="50%"
                  x2="16.66%"
                  y2="100%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="33.33%"
                  y2="100%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="100%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="66.66%"
                  y2="100%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="83.33%"
                  y2="100%"
                  stroke="rgb(var(--border))"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Services Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Services & Data Layer
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {["chroma", "openai", "s3", "rds", "transcribe"].map((id) => {
                  const component = components.find((c) => c.id === id)!;
                  return (
                    <ArchitectureNode
                      key={id}
                      component={component}
                      isHighlighted={
                        hoveredComponent === id ||
                        Boolean(selectedFlow !== null &&
                          flows
                            .find((f) => f.id === selectedFlow)
                            ?.path.includes(id))
                      }
                      onHover={setHoveredComponent}
                      compact
                    />
                  );
                })}
              </div>
            </div>

            {/* Event Processing Layer */}
            <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Event Processing (Voice Flow)
              </h4>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {["eventbridge", "sns"].map((id) => {
                  const component = components.find((c) => c.id === id)!;
                  return (
                    <ArchitectureNode
                      key={id}
                      component={component}
                      isHighlighted={
                        hoveredComponent === id ||
                        Boolean(selectedFlow !== null &&
                          flows
                            .find((f) => f.id === selectedFlow)
                            ?.path.includes(id))
                      }
                      onHover={setHoveredComponent}
                      compact
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Layered List */}
        <div className="md:hidden space-y-8">
          {/* Client Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Client Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "frontend")!}
              isHighlighted={
                hoveredComponent === "frontend" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("frontend"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* API Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              API Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "gateway")!}
              isHighlighted={
                hoveredComponent === "gateway" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("gateway"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* Compute Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Compute Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "lambda")!}
              isHighlighted={
                hoveredComponent === "lambda" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("lambda"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* Services Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Services & Data
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {["chroma", "openai", "s3", "rds", "transcribe"].map((id) => {
                const component = components.find((c) => c.id === id)!;
                const isHighlighted = hoveredComponent === id ||
                  Boolean(selectedFlow !== null &&
                    flows
                      .find((f) => f.id === selectedFlow)
                      ?.path.includes(id));
                
                // Only show relevant services when a flow is selected to reduce clutter
                if (selectedFlow && !isHighlighted) return null;

                return (
                  <ArchitectureNode
                    key={id}
                    component={component}
                    isHighlighted={isHighlighted}
                    onHover={setHoveredComponent}
                    compact={false}
                  />
                );
              })}
              {/* Show placeholder if all items are hidden */}
              {selectedFlow && !["chroma", "openai", "s3", "rds", "transcribe"].some(id => 
                flows.find(f => f.id === selectedFlow)?.path.includes(id)
              ) && (
                <div className="text-center py-4 text-xs text-[rgb(var(--text-secondary))] italic">
                  No services involved in this flow
                </div>
              )}
              {/* Show all if no flow selected - Logic handled by the block below */}
              {!selectedFlow && null}
            </div>
            {/* Re-render for 'All' case to avoid complex logic above */}

          </div>

          {/* Event Processing Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Event Processing
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {["eventbridge", "sns"].map((id) => {
                const component = components.find((c) => c.id === id)!;
                const isHighlighted = hoveredComponent === id ||
                  Boolean(selectedFlow !== null &&
                    flows
                      .find((f) => f.id === selectedFlow)
                      ?.path.includes(id));
                
                if (selectedFlow && !isHighlighted) return null;

                return (
                  <ArchitectureNode
                    key={id}
                    component={component}
                    isHighlighted={isHighlighted}
                    onHover={setHoveredComponent}
                    compact={false}
                  />
                );
              })}

            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Client</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">AWS Services</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Databases</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500/20 border border-purple-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">External APIs</span>
        </div>
      </div>
    </div>
  );
}

