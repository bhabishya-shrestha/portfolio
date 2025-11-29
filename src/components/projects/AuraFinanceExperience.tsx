import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  CheckCircle2, 
  Wallet, 
  TrendingUp, 
  DollarSign,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Smartphone,
  Cloud,
  RefreshCw
} from 'lucide-react';

// Mock Data for Dashboard
const CHART_DATA = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 48200 },
  { month: 'Mar', value: 47500 },
  { month: 'Apr', value: 52000 },
  { month: 'May', value: 55400 },
  { month: 'Jun', value: 59000 },
];

const TRANSACTIONS = [
  { id: 1, title: 'Apple Store', category: 'Tech', amount: -1299.00, date: 'Today', icon: ShoppingBagIcon },
  { id: 2, title: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Yesterday', icon: DollarSign },
  { id: 3, title: 'Whole Foods', category: 'Groceries', amount: -142.50, date: 'Yesterday', icon: ShoppingCartIcon },
];

function ShoppingBagIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
}

function ShoppingCartIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
}

export default function AuraFinanceExperience() {
  return (
    <div className="w-full space-y-16 py-8">
      <DashboardSimulation />
      <SyncArchitectureVisualization />
    </div>
  );
}

function DashboardSimulation() {
  const [isDark, setIsDark] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Calculate chart path
  const maxVal = Math.max(...CHART_DATA.map(d => d.value));
  const minVal = Math.min(...CHART_DATA.map(d => d.value));
  const range = maxVal - minVal;
  
  const points = CHART_DATA.map((d, i) => {
    const x = (i / (CHART_DATA.length - 1)) * 100;
    const y = 100 - ((d.value - minVal) / range) * 80 - 10; // 10% padding top/bottom
    return `${x},${y}`;
  }).join(' ');

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            Interactive Dashboard
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2">
            Experience the responsive, theme-aware UI design.
          </p>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-3xl border transition-colors duration-500 ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-gray-50 border-gray-200 text-gray-900'
      }`}>
        {/* App Header */}
        <div className={`flex items-center justify-between border-b px-6 py-4 ${
          isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight">Aura</span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`rounded-full p-2 transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* App Content */}
        <div className="p-6 md:p-8">
          {/* Net Worth Card */}
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-slate-800/50' : 'bg-white shadow-sm'
            }`}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Net Worth</p>
                  <h4 className="text-3xl font-bold">$59,000.00</h4>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-sm font-medium text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5%</span>
                </div>
              </div>

              {/* Custom Chart */}
              <div className="relative h-48 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={`M0,100 ${points.split(' ').map(p => `L${p}`).join(' ')} L100,100 Z`}
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Line */}
                  <motion.polyline
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    points={points}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Points */}
                  {CHART_DATA.map((d, i) => {
                    const [x, y] = points.split(' ')[i].split(',');
                    return (
                      <g key={i}>
                        <circle
                          cx={x}
                          cy={y}
                          r="6" // Invisible hit area
                          fill="transparent"
                          onMouseEnter={() => setHoveredPoint(i)}
                          onMouseLeave={() => setHoveredPoint(null)}
                          className="cursor-pointer"
                        />
                        <AnimatePresence>
                          {hoveredPoint === i && (
                            <motion.g
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                            >
                              <circle cx={x} cy={y} r="3" fill="#3b82f6" stroke="white" strokeWidth="1" />
                              <foreignObject x={parseFloat(x) - 15} y={parseFloat(y) - 20} width="60" height="30">
                                <div className={`rounded px-2 py-1 text-[8px] font-bold shadow-lg text-center ${
                                  isDark ? 'bg-slate-700 text-white' : 'bg-gray-800 text-white'
                                }`}>
                                  ${(d.value / 1000).toFixed(1)}k
                                </div>
                              </foreignObject>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-4">
              <h5 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                Recent Activity
              </h5>
              <div className="space-y-3">
                {TRANSACTIONS.map((tx) => (
                  <motion.div
                    key={tx.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`flex items-center justify-between rounded-xl p-3 transition-colors ${
                      isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${
                        isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <tx.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{tx.title}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{tx.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${
                        tx.amount > 0 ? 'text-green-500' : isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{tx.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SyncArchitectureVisualization() {
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'queued'>('idle');
  const [localData, setLocalData] = useState<number[]>([]);
  const [cloudData, setCloudData] = useState<number[]>([]);

  // Simulate user action
  const addData = () => {
    const newData = Date.now();
    setLocalData(prev => [...prev, newData]);
    
    if (isOffline) {
      setSyncStatus('queued');
    } else {
      setSyncStatus('syncing');
      setTimeout(() => {
        setCloudData(prev => [...prev, newData]);
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 1000);
      }, 1500);
    }
  };

  // Handle coming back online
  useEffect(() => {
    if (!isOffline && localData.length > cloudData.length) {
      setSyncStatus('syncing');
      const timeout = setTimeout(() => {
        setCloudData(localData);
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 1000);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isOffline, localData, cloudData]);

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            Local-First Architecture
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-xl">
            Aura uses <strong>Dexie.js (IndexedDB)</strong> for instant, offline-capable local storage, 
            and syncs to <strong>Firebase</strong> in the background when online.
          </p>
        </div>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            isOffline 
              ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
              : 'bg-green-500/10 text-green-500 border border-green-500/20'
          }`}
        >
          {isOffline ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
          {isOffline ? 'Offline Mode' : 'Online Mode'}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
        {/* Local Device */}
        <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <Smartphone className="h-8 w-8" />
          </div>
          <h4 className="font-bold text-[rgb(var(--text-primary))]">Local Device</h4>
          <p className="text-xs text-[rgb(var(--text-secondary))] mb-4">IndexedDB (Dexie.js)</p>
          
          <div className="space-y-2">
            <button
              onClick={addData}
              className="w-full rounded-lg bg-blue-500 py-2 text-sm font-bold text-white hover:bg-blue-600 active:scale-95 transition-all"
            >
              Add Transaction
            </button>
            <div className="h-32 overflow-y-auto rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] p-2 text-left">
              <AnimatePresence mode='popLayout'>
                {localData.map((id) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    layout
                    className="mb-1 flex items-center gap-2 rounded px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Data Saved</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {localData.length === 0 && (
                <p className="text-center text-xs text-[rgb(var(--text-secondary))] py-4">No data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex flex-col items-center justify-center gap-2 text-[rgb(var(--text-secondary))]">
          {syncStatus === 'syncing' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="h-8 w-8 text-blue-500" />
            </motion.div>
          )}
          {syncStatus === 'queued' && (
            <div className="flex flex-col items-center gap-1 text-orange-500">
              <Database className="h-8 w-8" />
              <span className="text-xs font-bold">Queued</span>
            </div>
          )}
          {syncStatus === 'synced' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
          )}
          {syncStatus === 'idle' && (
            <div className="h-8 w-8 rounded-full bg-[rgb(var(--border))]" />
          )}
          
          {/* Connection Line */}
          <div className={`h-1 w-24 rounded-full transition-colors ${
            isOffline ? 'bg-red-500/20' : 'bg-green-500/20'
          }`} />
        </div>

        {/* Cloud */}
        <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
            <Cloud className="h-8 w-8" />
          </div>
          <h4 className="font-bold text-[rgb(var(--text-primary))]">Cloud Backend</h4>
          <p className="text-xs text-[rgb(var(--text-secondary))] mb-4">Firebase / Firestore</p>
          
          <div className="h-42 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] p-2 text-left h-[170px] overflow-y-auto">
             <AnimatePresence mode='popLayout'>
                {cloudData.map((id) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    layout
                    className="mb-1 flex items-center gap-2 rounded px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-500"
                  >
                    <Database className="h-3 w-3" />
                    <span>Synced to Cloud</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {cloudData.length === 0 && (
                <p className="text-center text-xs text-[rgb(var(--text-secondary))] py-4">Waiting for sync...</p>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
