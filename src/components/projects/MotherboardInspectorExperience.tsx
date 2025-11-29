import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  Scan, 
  CheckCircle2, 
  Eye,
  EyeOff
} from 'lucide-react';

// Mock Logs
const LOG_SEQUENCE = [
  { text: '> Initializing OpenCV pipeline...', delay: 500 },
  { text: '> Loading YOLOv8 weights [24.5MB]...', delay: 1200 },
  { text: '> Camera feed established (1080p)', delay: 1800 },
  { text: '> Preprocessing: Grayscale conversion...', delay: 2500 },
  { text: '> Preprocessing: Adaptive Thresholding...', delay: 3000 },
  { text: '> Running inference...', delay: 3800 },
  { text: '> Detected: CPU_SOCKET (Conf: 0.98)', delay: 4500 },
  { text: '> Detected: RAM_SLOT_A (Conf: 0.95)', delay: 4800 },
  { text: '> Detected: RAM_SLOT_B (Conf: 0.96)', delay: 5100 },
  { text: '> OCR Extraction: "ASUS ROG STRIX"', delay: 5800 },
  { text: '> Inspection Complete: PASS', delay: 6500, type: 'success' },
];

export default function MotherboardInspectorExperience() {
  const [isInspecting, setIsInspecting] = useState(false);
  const [logs, setLogs] = useState<{text: string, type?: string}[]>([]);
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
        setLogs(prev => [...prev, log]);
        
        // Trigger visual effects based on logs
        if (log.text.includes('Preprocessing')) setProgress(30);
        if (log.text.includes('Inference')) setProgress(60);
        if (log.text.includes('Detected: CPU')) setDetectedItems(prev => [...prev, 'cpu']);
        if (log.text.includes('Detected: RAM')) setDetectedItems(prev => [...prev, 'ram']);
        if (log.text.includes('OCR')) setDetectedItems(prev => [...prev, 'label']);
        if (log.text.includes('Complete')) {
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
            {showOverlay ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
          </button>
          <button
            onClick={startInspection}
            disabled={isInspecting}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all ${
              isInspecting 
                ? 'bg-blue-500/50 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
            }`}
          >
            {isInspecting ? <Scan className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {isInspecting ? 'Inspecting...' : 'Run Inspection'}
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
              isInspecting && progress > 20 && progress < 60 ? 'grayscale contrast-150' : ''
            }`}
          />

          {/* Scanning Laser */}
          <AnimatePresence>
            {isInspecting && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
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
                {detectedItems.includes('cpu') && (
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
                {detectedItems.includes('ram') && (
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
                {detectedItems.includes('label') && (
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
              <div className={`h-2 w-2 rounded-full ${isInspecting ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              {isInspecting ? 'LIVE FEED' : 'STANDBY'}
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
            <div className="text-gray-500"># System Ready. Waiting for input...</div>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  log.type === 'success' ? 'text-green-400 font-bold' : 
                  log.text.includes('Detected') ? 'text-blue-400' : 
                  log.text.includes('OCR') ? 'text-yellow-400' : ''
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
    </div>
  );
}
