import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ComplianceOrb from '../components/ComplianceOrb'

const QUEUE = [
  {
    id: 'EVT-2024-PT-0847',
    name: 'Radioligand Therapy Advisory Board — Lisbon 2024',
    submitter: 'Borja Martínez',
    date: '15 Mar 2024',
    risk: 'high',
    riskScore: 87,
    issues: 3,
    status: 'pending',
    mismatches: [
      { field: 'Accommodation', po: '€0.00', invoice: '€340.00', delta: '+€340.00', type: 'Missing Budget', confidence: null },
      { field: 'Agency Fee', po: '€850.00', invoice: '€920.00', delta: '+€70.00', type: 'Overcharge', confidence: '98%', match: '"Service Charge" → Agency Fee' },
      { field: 'Meals', po: '€720.00', invoice: '€780.00', delta: '+€60.00', type: 'Cap Exceeded', confidence: '95%', match: '"Catering Services" → Meals & Catering' },
    ],
    resolution: {
      root: 'Accommodation was omitted from original PO despite 313km HCP travel. Agency fee delta attributed to late-booking surcharge. Meal overage: €60 total across 12 attendees = €5/head above cap.',
      action: 'Approve with conditions: (1) Retroactive lodging PO amendment, (2) Agency surcharge flagged for vendor review, (3) Meal delta within tolerance.',
    },
  },
  {
    id: 'EVT-2024-PT-0821',
    name: 'Oncology Symposium — Porto 2024',
    submitter: 'Ana Ribeiro',
    date: '02 Mar 2024',
    risk: 'medium',
    riskScore: 54,
    issues: 1,
    status: 'pending',
  },
  {
    id: 'EVT-2024-PT-0809',
    name: 'Cardiology Workshop — Coimbra',
    submitter: 'Miguel Santos',
    date: '22 Feb 2024',
    risk: 'low',
    riskScore: 12,
    issues: 0,
    status: 'resolved',
  },
]

const SEMANTIC_MATCHES = [
  { invoice: 'Service Charge', besure: 'Agency Fee', confidence: 98 },
  { invoice: 'Catering Services', besure: 'Meals & Catering', confidence: 95 },
  { invoice: 'Registration Fee', besure: 'Registration Costs', confidence: 97 },
  { invoice: 'VAT (23%)', besure: 'Other Costs', confidence: 92 },
  { invoice: 'Management Fee', besure: 'Agency Fee', confidence: 96 },
]

export default function ViewB() {
  const [selected, setSelected] = useState(QUEUE[0])
  const [showResolution, setShowResolution] = useState(false)
  const [resolved, setResolved] = useState(false)

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#1e1e2f]">
        {/* Header */}
        <div className="bg-[#252538] border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#666"/>
              <text x="4" y="17" fontSize="12" fill="white" fontWeight="bold">N</text>
            </svg>
            <div>
              <div className="text-white text-sm font-semibold tracking-tight">BeSure</div>
              <div className="text-[10px] text-novartis-text/50">Audit & Reconciliation</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-novartis-text/60">
            <span>Novartis Pharma AG</span>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-novartis-mid flex items-center justify-center text-[10px] text-white font-medium">EP</div>
              <span>Eduardo Pereira</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              ['Pending Review', '7', 'text-amber-400', 'bg-amber-500/5 border-amber-500/10'],
              ['High Risk', '2', 'text-red-400', 'bg-red-500/5 border-red-500/10'],
              ['Resolved Today', '4', 'text-green-400', 'bg-green-500/5 border-green-500/10'],
              ['Avg Resolution', '2.3h', 'text-blue-400', 'bg-blue-500/5 border-blue-500/10'],
            ].map(([label, value, color, bg]) => (
              <div key={label} className={`rounded-lg border p-4 ${bg}`}>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-novartis-text/40 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Queue */}
          <div>
            <h2 className="text-white text-sm font-semibold mb-3">High Risk Queue</h2>
            <div className="space-y-2">
              {QUEUE.map(item => (
                <div
                  key={item.id}
                  onClick={() => { setSelected(item); setShowResolution(false); setResolved(false) }}
                  className={`rounded-lg border p-4 cursor-pointer transition-all ${
                    selected?.id === item.id
                      ? 'border-pharo-blue/30 bg-pharo-blue/5'
                      : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.risk === 'high' ? 'bg-red-400' : item.risk === 'medium' ? 'bg-amber-400' : 'bg-green-400'
                      }`} />
                      <div>
                        <div className="text-white text-sm font-medium">{item.name}</div>
                        <div className="text-[10px] text-novartis-text/40 mt-0.5">
                          {item.id} · {item.submitter} · {item.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-sm font-bold font-mono ${
                          item.riskScore > 70 ? 'text-red-400' : item.riskScore > 40 ? 'text-amber-400' : 'text-green-400'
                        }`}>{item.riskScore}</div>
                        <div className="text-[10px] text-novartis-text/30">Risk Score</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        item.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {item.issues} issue{item.issues !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail: Mismatches */}
          {selected?.mismatches && (
            <div className="fade-in-up space-y-4">
              <h2 className="text-white text-sm font-semibold">Invoice vs PO — Discrepancy Analysis</h2>
              <div className="rounded-lg border border-white/5 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.02] text-novartis-text/40 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium">Line Item</th>
                      <th className="text-right px-4 py-3 font-medium">PO Amount</th>
                      <th className="text-right px-4 py-3 font-medium">Invoice Amount</th>
                      <th className="text-right px-4 py-3 font-medium">Delta</th>
                      <th className="text-left px-4 py-3 font-medium">Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.mismatches.map((m, i) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="px-4 py-3 text-novartis-text/80">{m.field}</td>
                        <td className="px-4 py-3 text-right font-mono text-novartis-text/60">{m.po}</td>
                        <td className="px-4 py-3 text-right font-mono text-novartis-text/60">{m.invoice}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-mono font-semibold px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400">
                            {m.delta}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-amber-400">{m.type}</span>
                          {m.match && (
                            <div className="text-[10px] text-novartis-text/30 mt-0.5">
                              Matched: {m.match} ({m.confidence})
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Semantic Matching */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Semantic Fuzzy Matching</h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {SEMANTIC_MATCHES.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs glass-light rounded-md px-3 py-2">
                      <span className="text-novartis-text/50 w-36 truncate">"{m.invoice}"</span>
                      <span className="text-pharo-blue">→</span>
                      <span className="text-white/80 w-36">{m.besure}</span>
                      <div className="flex-1" />
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-pharo-blue to-pharo-purple" style={{ width: `${m.confidence}%` }} />
                        </div>
                        <span className="text-green-400 font-mono text-[10px]">{m.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              {!showResolution ? (
                <button
                  onClick={() => setShowResolution(true)}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-pharo-blue to-pharo-purple text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-pharo-blue/20"
                >
                  🔍 Generate Resolution Analysis
                </button>
              ) : (
                <div className="fade-in-up rounded-lg border border-pharo-blue/20 bg-pharo-blue/5 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-gradient-to-br from-pharo-blue to-pharo-purple flex items-center justify-center text-[10px]">✓</span>
                    AI Resolution Analysis
                  </h3>
                  <div>
                    <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">Root Cause</h4>
                    <p className="text-xs text-novartis-text/70 leading-relaxed">{selected.resolution.root}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">Recommended Action</h4>
                    <p className="text-xs text-novartis-text/70 leading-relaxed">{selected.resolution.action}</p>
                  </div>
                  {!resolved ? (
                    <button
                      onClick={() => setResolved(true)}
                      className="w-full py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition"
                    >
                      ✓ Approve & Reconcile
                    </button>
                  ) : (
                    <div className="text-center py-2 text-green-400 text-sm font-medium fade-in-up">
                      ✅ Reconciliation approved — Audit trail updated
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar>
        <ComplianceOrb state={selected?.risk === 'high' ? 'amber' : selected?.risk === 'medium' ? 'yellow' : 'blue'} />

        <div className="glass-light rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-novartis-text/60">
              {selected ? `Analyzing ${selected.id}...` : 'Select an event to analyze'}
            </span>
          </div>
        </div>

        {selected?.id === 'EVT-2024-PT-0847' && (
          <>
            {/* Event Summary */}
            <div className="fade-in-up space-y-2">
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Event Intelligence</h3>
              <div className="glass-light rounded-lg p-4 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-novartis-text/40">Submitted by</span>
                  <span className="text-white">Borja Martínez</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-novartis-text/40">Event</span>
                  <span className="text-white">Radioligand Advisory Board</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-novartis-text/40">Total PO</span>
                  <span className="text-white font-mono">€8,160.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-novartis-text/40">Total Invoice</span>
                  <span className="text-amber-400 font-mono">€8,630.00</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2">
                  <span className="text-novartis-text/40">Net Delta</span>
                  <span className="text-red-400 font-mono font-semibold">+€470.00 (5.8%)</span>
                </div>
              </div>
            </div>

            {/* Flags */}
            <div className="fade-in-up space-y-2" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Active Flags</h3>
              <div className="space-y-2">
                {[
                  { icon: '🏨', label: 'Missing accommodation budget (313km travel)', severity: 'high' },
                  { icon: '💰', label: 'Agency fee overcharge: +€70 vs PO', severity: 'medium' },
                  { icon: '🍽️', label: 'Meal cap exceeded by €60 aggregate', severity: 'low' },
                ].map((f, i) => (
                  <div key={i} className={`rounded-md p-2.5 text-xs flex items-start gap-2 ${
                    f.severity === 'high' ? 'bg-red-500/5 border border-red-500/10' :
                    f.severity === 'medium' ? 'bg-amber-500/5 border border-amber-500/10' :
                    'bg-yellow-500/5 border border-yellow-500/10'
                  }`}>
                    <span>{f.icon}</span>
                    <span className="text-novartis-text/70">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="text-[10px] text-novartis-text/30 space-y-1">
            <div>📋 Reconciliation Engine v2.1</div>
            <div>🕐 Last sync: {new Date().toLocaleTimeString()}</div>
            <div>🔒 Auditor: Eduardo Pereira</div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
