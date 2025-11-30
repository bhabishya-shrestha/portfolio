import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Scan, CheckCircle2, Eye, EyeOff, Layout, Cpu, FileText, ShieldCheck, Camera } from "lucide-react";
import { ArchitectureNode } from "./ArchitectureNode";

// Mock Logs
const LOG_SEQUENCE = [
  { text: "> Initializing OpenCV pipeline...", delay: 500 },
  { text: "> Loading YOLOv8 weights [24.5MB]...", delay: 1200 },
  { text: "> Camera feed established (1080p)", delay: 1800 },
  { text: "> Preprocessing: Grayscale conversion...", delay: 2500 },
  { text: "> Preprocessing: Adaptive Thresholding...", delay: 3000 },
  { text: "> Running inference...", delay: 3800 },
  { text: "> Detected: CPU_SOCKET (Conf: 0.98)", delay: 4500 },
  { text: "> Detected: RAM_SLOT_A (Conf: 0.95)", delay: 4800 },
  { text: "> Detected: RAM_SLOT_B (Conf: 0.96)", delay: 5100 },
  { text: '> OCR Extraction: "ASUS ROG STRIX"', delay: 5800 },
  { text: "> Inspection Complete: PASS", delay: 6500, type: "success" },
];

export default function MotherboardInspectorExperience() {
  const [isInspecting, setIsInspecting] = useState(false);
  const [logs, setLogs] = useState<{ text: string; type?: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const startInspection = () => {
    if (isInspecting) return;

    setIsInspecting(true);
    setLogs([]);
    setDetectedItems([]);
    setProgress(0);

    LOG_SEQUENCE.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);

        // Trigger visual effects based on logs
        if (log.text.includes("Preprocessing")) setProgress(30);
        if (log.text.includes("Inference")) setProgress(60);
        if (log.text.includes("Detected: CPU"))
          setDetectedItems((prev) => [...prev, "cpu"]);
        if (log.text.includes("Detected: RAM"))
          setDetectedItems((prev) => [...prev, "ram"]);
        if (log.text.includes("OCR"))
          setDetectedItems((prev) => [...prev, "label"]);
        if (log.text.includes("Complete")) {
          setProgress(100);
          setIsInspecting(false);
        }
      }, log.delay);
    });
  };

  return (
    <div className="w-full space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            Computer Vision Pipeline
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2">
            Simulate the automated inspection process.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-2 text-sm font-medium hover:bg-[rgb(var(--bg-secondary))]"
          >
            {showOverlay ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            {showOverlay ? "Hide Overlay" : "Show Overlay"}
          </button>
          <button
            onClick={startInspection}
            disabled={isInspecting}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all ${
              isInspecting
                ? "bg-blue-500/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 active:scale-95"
            }`}
          >
            {isInspecting ? (
              <Scan className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isInspecting ? "Inspecting..." : "Run Inspection"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Visual Inspection Stage */}
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-black">
          {/* Motherboard Image */}
          <img
            src="/assets/motherboard-inspector/motherboard_cv_base.png"
            alt="Motherboard Inspection"
            className={`h-full w-full object-cover transition-all duration-1000 ${
              isInspecting && progress > 20 && progress < 60
                ? "grayscale contrast-150"
                : ""
            }`}
          />

          {/* Scanning Laser */}
          <AnimatePresence>
            {isInspecting && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "linear", repeat: 1 }}
                className="absolute left-0 right-0 h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] z-20"
              />
            )}
          </AnimatePresence>

          {/* Bounding Boxes */}
          {showOverlay && (
            <>
              {/* CPU Socket - Centered Upper */}
              <AnimatePresence>
                {detectedItems.includes("cpu") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-[42%] top-[25%] h-[22%] w-[16%] border-2 border-green-500 bg-green-500/10 z-10"
                  >
                    <div className="absolute -top-6 left-0 bg-green-500 px-2 py-0.5 text-xs font-bold text-black whitespace-nowrap">
                      CPU_SOCKET (0.98)
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RAM Slots - Right Side Vertical */}
              <AnimatePresence>
                {detectedItems.includes("ram") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-[65%] top-[15%] h-[45%] w-[12%] border-2 border-blue-500 bg-blue-500/10 z-10"
                  >
                    <div className="absolute -top-6 left-0 bg-blue-500 px-2 py-0.5 text-xs font-bold text-white whitespace-nowrap">
                      RAM_SLOTS (0.95)
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Label OCR - Bottom Left */}
              <AnimatePresence>
                {detectedItems.includes("label") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-[15%] top-[65%] h-[8%] w-[25%] border-2 border-yellow-500 bg-yellow-500/10 z-10"
                  >
                    <div className="absolute -top-6 left-0 bg-yellow-500 px-2 py-0.5 text-xs font-bold text-black whitespace-nowrap">
                      OCR: ASUS ROG STRIX
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Status Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-mono text-white backdrop-blur-md">
              <div
                className={`h-2 w-2 rounded-full ${isInspecting ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
              />
              {isInspecting ? "LIVE FEED" : "STANDBY"}
            </div>
            {detectedItems.length > 0 && (
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400 backdrop-blur-md border border-green-500/30">
                <CheckCircle2 className="h-3 w-3" />
                {detectedItems.length} Objects Detected
              </div>
            )}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[#1e1e1e] font-mono text-sm shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
            <Terminal className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">inspection_cli.exe</span>
          </div>
          <div
            ref={terminalRef}
            className="flex-1 space-y-1 overflow-y-auto p-4 text-gray-300 scrollbar-thin scrollbar-thumb-gray-700"
          >
            <div className="text-gray-500">
              # System Ready. Waiting for input...
            </div>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  log.type === "success"
                    ? "text-green-400 font-bold"
                    : log.text.includes("Detected")
                      ? "text-blue-400"
                      : log.text.includes("OCR")
                        ? "text-yellow-400"
                        : ""
                }`}
              >
                {log.text}
              </motion.div>
            ))}
            {isInspecting && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="h-4 w-2 bg-gray-500"
              />
            )}
          </div>
        </div>
      </div>

      <ArchitectureDiagram />
    </div>
  );
}

function ArchitectureDiagram() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const flows = [
    {
      id: "live",
      label: "Live Inspection",
      path: ["camera", "opencv", "yolo", "validation", "report"],
      description: "Real-time object detection pipeline",
    },
    {
      id: "ocr",
      label: "OCR Pipeline",
      path: ["camera", "opencv", "tesseract", "validation"],
      description: "Text extraction and verification",
    },
    {
      id: "validation",
      label: "Validation Rules",
      path: ["yolo", "tesseract", "validation", "report"],
      description: "Business logic and defect checking",
    },
  ];

  const components = [
    {
      id: "camera",
      title: "Camera Feed",
      desc: "1080p Stream Input",
      icon: Camera,
      category: "client",
    },
    {
      id: "opencv",
      title: "OpenCV",
      desc: "Preprocessing & Filters",
      icon: Scan,
      category: "client", // Running in browser via WebAssembly or similar context
      url: "https://opencv.org",
    },
    {
      id: "yolo",
      title: "YOLOv8",
      desc: "Object Detection",
      icon: Cpu,
      category: "service", // Assuming inference might be heavy or server-side, or just distinct
      url: "https://ultralytics.com",
    },
    {
      id: "tesseract",
      title: "Tesseract OCR",
      desc: "Text Recognition",
      icon: FileText,
      category: "service",
      url: "https://github.com/tesseract-ocr/tesseract",
    },
    {
      id: "validation",
      title: "Validation Logic",
      desc: "Rules Engine",
      icon: ShieldCheck,
      category: "client",
    },
    {
      id: "report",
      title: "Inspection Report",
      desc: "JSON Output",
      icon: Layout,
      category: "client",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            System Architecture
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-xl">
            Explore the computer vision pipeline powering the inspection system.
          </p>
        </div>
      </div>



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
            {/* Input Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Input Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "camera")!}
                  isHighlighted={
                    hoveredComponent === "camera" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("camera"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* Processing Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Processing Layer
              </h4>
              <div className="flex justify-center gap-8">
                <ArchitectureNode
                  component={components.find((c) => c.id === "opencv")!}
                  isHighlighted={
                    hoveredComponent === "opencv" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("opencv"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* AI Analysis Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                AI Analysis Layer
              </h4>
              <div className="flex justify-center gap-8">
                <ArchitectureNode
                  component={components.find((c) => c.id === "yolo")!}
                  isHighlighted={
                    hoveredComponent === "yolo" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("yolo"))
                  }
                  onHover={setHoveredComponent}
                />
                <ArchitectureNode
                  component={components.find((c) => c.id === "tesseract")!}
                  isHighlighted={
                    hoveredComponent === "tesseract" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("tesseract"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* Output Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Output Layer
              </h4>
              <div className="flex justify-center gap-8">
                <ArchitectureNode
                  component={components.find((c) => c.id === "validation")!}
                  isHighlighted={
                    hoveredComponent === "validation" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("validation"))
                  }
                  onHover={setHoveredComponent}
                />
                <ArchitectureNode
                  component={components.find((c) => c.id === "report")!}
                  isHighlighted={
                    hoveredComponent === "report" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("report"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Layered List */}
        <div className="md:hidden space-y-8">
          {/* Input Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Input Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "camera")!}
              isHighlighted={
                hoveredComponent === "camera" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("camera"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* Processing Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Processing Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "opencv")!}
              isHighlighted={
                hoveredComponent === "opencv" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("opencv"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* AI Analysis Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              AI Analysis Layer
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {["yolo", "tesseract"].map((id) => {
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

          {/* Output Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Output Layer
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {["validation", "report"].map((id) => {
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
      <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Client/Input</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">AI Services</span>
        </div>
      </div>
    </section>
  );
}
