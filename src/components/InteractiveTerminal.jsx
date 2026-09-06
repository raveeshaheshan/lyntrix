import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Cpu, Cloud, CheckCircle2, Play, Activity, RotateCcw, Copy, Check } from 'lucide-react';

export default function InteractiveTerminal({ onOpenCalculator }) {
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'cluster' | 'security'
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  // Initial console history
  const [history, setHistory] = useState([
    {
      id: 1,
      type: 'system',
      text: 'Lyntrix Enterprise Infrastructure Console [Version 4.2.8-prod]'
    },
    {
      id: 2,
      type: 'system',
      text: 'Initializing zero-trust architecture & high-concurrency mesh...'
    },
    {
      id: 3,
      type: 'cmd',
      cmd: 'lyntrix cluster --inspect --region=global',
      outputs: [
        { label: 'STATUS', val: '100% OPERATIONAL', color: 'text-emerald-400' },
        { label: 'NODES', val: '64 AWS Graviton3 Instances', color: 'text-cyan-400' },
        { label: 'GATEWAY', val: 'Envoy Mesh / TLS 1.3 Strict', color: 'text-indigo-400' },
        { label: 'LATENCY', val: '14.2ms avg global p99', color: 'text-emerald-400' }
      ]
    },
    {
      id: 4,
      type: 'table',
      headers: ['MICROSERVICE', 'REGION', 'REPLICAS', 'STATUS'],
      rows: [
        ['api-gateway-edge', 'ap-southeast-1', '12 / 12', 'ACTIVE'],
        ['auth-zero-trust', 'ap-southeast-1', '8 / 8', 'HEALTHY'],
        ['distributed-db', 'us-east-1', '6 Multi-AZ', 'SYNCED'],
        ['soc-sentinel-ai', 'eu-central-1', '4 Replicas', 'ARMED']
      ]
    }
  ]);

  // Live periodic infrastructure events ticker
  useEffect(() => {
    const liveEvents = [
      'INF [k8s-scaler] Auto-scaled node group: +4 pods deployed in 1.2s',
      'OK  [tls-vault] Quantum-resistant TLS 1.3 handshake verified',
      'SEC [soc-sentinel] Zero-trust perimeter intact: 0 threats detected',
      'NET [cdn-edge] Edge caching hit-ratio: 99.4% across 42 POPs',
      'DB  [postgres-ha] Distributed sync completed: replication lag 0.4ms'
    ];

    let count = 0;
    const interval = setInterval(() => {
      const randomEvent = liveEvents[count % liveEvents.length];
      count++;
      setHistory(prev => [
        ...prev.slice(-18), // keep history bounded
        { id: Date.now() + Math.random(), type: 'log', text: `[${new Date().toLocaleTimeString()}] ${randomEvent}` }
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of terminal when history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear' || trimmed === 'cls') {
      setHistory([
        { id: Date.now(), type: 'system', text: 'Console cleared. Ready for input.' }
      ]);
      return;
    }

    if (trimmed === 'help') {
      setHistory(prev => [
        ...prev,
        { id: Date.now(), type: 'cmd', cmd: cmdText },
        {
          id: Date.now() + 1,
          type: 'help',
          commands: [
            { name: 'status', desc: 'Display global cloud & security health status' },
            { name: 'security', desc: 'Inspect SOC zero-trust shielding parameters' },
            { name: 'cluster', desc: 'Display Kubernetes & microservices matrix' },
            { name: 'calculator', desc: 'Launch interactive cost calculator' },
            { name: 'clear', desc: 'Clear the terminal screen' }
          ]
        }
      ]);
      return;
    }

    if (trimmed === 'calculator' || trimmed === 'calc') {
      if (onOpenCalculator) onOpenCalculator();
      setHistory(prev => [
        ...prev,
        { id: Date.now(), type: 'cmd', cmd: cmdText },
        { id: Date.now() + 1, type: 'system', text: '🚀 Launching Interactive Cost Calculator modal...' }
      ]);
      return;
    }

    if (trimmed === 'security' || trimmed === 'sec') {
      setActiveTab('security');
      setHistory(prev => [
        ...prev,
        { id: Date.now(), type: 'cmd', cmd: cmdText },
        {
          id: Date.now() + 1,
          type: 'cmd',
          cmd: 'lyntrix soc --audit-zero-trust',
          outputs: [
            { label: 'COMPLIANCE', val: 'ISO 27001 / SOC 2 Type II Certified', color: 'text-emerald-400' },
            { label: 'AUTHENTICATION', val: 'Hardware Security Key / FIDO2 / mTLS', color: 'text-cyan-400' },
            { label: 'INTRUSION SHIELD', val: 'Realtime AI Anomaly Detection Active', color: 'text-indigo-400' }
          ]
        }
      ]);
      return;
    }

    if (trimmed === 'cluster') {
      setActiveTab('cluster');
      setHistory(prev => [
        ...prev,
        { id: Date.now(), type: 'cmd', cmd: cmdText },
        {
          id: Date.now() + 1,
          type: 'table',
          headers: ['NODE POOL', 'TYPE', 'CPU/RAM', 'STATUS'],
          rows: [
            ['graviton3-prod-a', 'c7g.2xlarge', '8 vCPU / 16 GB', 'ONLINE'],
            ['graviton3-prod-b', 'c7g.2xlarge', '8 vCPU / 16 GB', 'ONLINE'],
            ['cache-redis-ha', 'r7g.xlarge', '4 vCPU / 32 GB', 'READY'],
            ['sentinel-threat-ai', 'g5.xlarge (GPU)', '24GB VRAM', 'ONLINE']
          ]
        }
      ]);
      return;
    }

    // Default status run
    setHistory(prev => [
      ...prev,
      { id: Date.now(), type: 'cmd', cmd: cmdText },
      {
        id: Date.now() + 1,
        type: 'cmd',
        cmd: `executing: ${cmdText}`,
        outputs: [
          { label: 'EXECUTION', val: 'SUCCESS [Code 0]', color: 'text-emerald-400' },
          { label: 'AUDIT LOG', val: `Tracked in Lyntrix Vault (${Math.floor(Math.random() * 8999 + 1000)})`, color: 'text-slate-300' }
        ]
      }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  const copyConsoleLogs = () => {
    const textToCopy = history.map(h => {
      if (h.text) return h.text;
      if (h.cmd) return `$ ${h.cmd}`;
      return '';
    }).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden font-mono flex flex-col transition-all duration-300">
      
      {/* Top Console Bar */}
      <div className="px-3 sm:px-4 py-3 bg-slate-900/90 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-2 select-none">
        
        {/* Window controls and Terminal Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 cursor-pointer transition-colors" />
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Console Tab Pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab('console');
                executeCommand('lyntrix status');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'console'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>console.sh</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('cluster');
                executeCommand('cluster');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'cluster'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>k8s-mesh</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('security');
                executeCommand('security');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'security'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>zero-trust</span>
            </button>
          </div>
        </div>

        {/* Live Status and Action Tools */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold tracking-wider">LIVE_SOC: ACTIVE</span>
          </div>

          <button
            onClick={copyConsoleLogs}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Main Terminal Shell Body */}
      <div className="p-4 sm:p-6 text-xs sm:text-sm text-slate-200 h-[340px] sm:h-[400px] overflow-y-auto space-y-3 font-mono selection:bg-cyan-500/30 selection:text-cyan-200 bg-[radial-gradient(ellipse_at_top,_rgba(15,23,42,0.6)_0%,_rgba(2,6,23,0.95)_100%)]">
        
        {/* Interactive Command Presets Banner */}
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-cyan-400">💡 Quick Commands:</span>
            <span>Click to run or type below</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => executeCommand('status')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-300 border border-slate-700/60 transition-colors text-[11px]"
            >
              $ status
            </button>
            <button
              onClick={() => executeCommand('security')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-indigo-950/60 hover:text-indigo-300 text-slate-300 border border-slate-700/60 transition-colors text-[11px]"
            >
              $ security
            </button>
            <button
              onClick={() => executeCommand('cluster')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-purple-950/60 hover:text-purple-300 text-slate-300 border border-slate-700/60 transition-colors text-[11px]"
            >
              $ cluster
            </button>
            <button
              onClick={() => executeCommand('calculator')}
              className="px-2 py-0.5 rounded bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors text-[11px] font-semibold"
            >
              $ calculator
            </button>
            <button
              onClick={() => executeCommand('clear')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 border border-slate-700/60 transition-colors text-[11px]"
            >
              clear
            </button>
          </div>
        </div>

        {/* Console History Output Stream */}
        {history.map((item) => {
          if (item.type === 'system') {
            return (
              <div key={item.id} className="text-slate-400 text-xs">
                {item.text}
              </div>
            );
          }

          if (item.type === 'log') {
            return (
              <div key={item.id} className="text-[11px] sm:text-xs text-slate-400 border-l-2 border-slate-800 pl-2">
                <span className="text-cyan-500/80">{item.text.split(']')[0]}]</span>
                <span className="text-slate-300">{item.text.substring(item.text.indexOf(']') + 1)}</span>
              </div>
            );
          }

          if (item.type === 'cmd') {
            return (
              <div key={item.id} className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="text-slate-500">lyntrix-admin@cloud:~$</span>
                  <span>{item.cmd}</span>
                </div>
                {item.outputs && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 py-1 text-xs">
                    {item.outputs.map((out, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold">{out.label}:</span>
                        <span className={`font-bold ${out.color}`}>{out.val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (item.type === 'table') {
            return (
              <div key={item.id} className="overflow-x-auto my-2 rounded-lg border border-slate-800/80 bg-slate-900/50 p-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-cyan-400 font-bold">
                      {item.headers.map((h, i) => (
                        <th key={i} className="pb-1.5 pr-4 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {item.rows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className="py-1.5 pr-4">
                            {cIdx === r.length - 1 ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                {cell}
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          if (item.type === 'help') {
            return (
              <div key={item.id} className="space-y-1 pl-4 text-xs border-l-2 border-cyan-500/40">
                <div className="text-cyan-300 font-bold mb-1">Available Interactive Commands:</div>
                {item.commands.map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-cyan-400 font-bold w-24">${c.name}</span>
                    <span className="text-slate-400">{c.desc}</span>
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        {/* Active Command Prompt Line */}
        <div className="flex items-center gap-2 pt-2 text-xs sm:text-sm">
          <span className="text-cyan-400 font-bold shrink-0">lyntrix-admin@cloud:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'status', 'security', or 'calculator'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono"
            autoFocus
          />
          <span className="w-2 h-4 bg-cyan-400 animate-pulse shrink-0" />
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Live Telemetry Footer Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>CPU: <strong className="text-slate-200">14.2%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>RAM: <strong className="text-slate-200">4.1 / 16 GB</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>TLS: <strong className="text-emerald-400">1.3 STRICT</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span>REGION: AP-SOUTHEAST-1</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">AWS EKS CLUSTER</span>
        </div>
      </div>

    </div>
  );
}
