import { useState, useEffect, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import ComplianceOrb from '../components/ComplianceOrb'
import TypeWriter from '../components/TypeWriter'

const TABS = ['General', 'Location', 'Participantes', 'Finance', 'Justification']
const BLACKLIST = ['rapport', 'relationship', 'thank you', 'reward', 'loyalty', 'influence', 'incentive', 'frequent']

const BIO_TEXT = `Dr. Nuno Vau is a leading GU Oncology specialist based at Centro Hospitalar Universitário do Porto. He serves as Lead Investigator for the 177Lu-PSMA-617 radioligand therapy trials [CRM_HCP001], with over 15 years of clinical experience in prostate cancer treatment. His research contributions include 23 peer-reviewed publications on theranostics and molecular-targeted therapies. Dr. Vau's participation is justified by his direct clinical expertise in the Radioligand Therapy area, which is the primary therapeutic focus of this advisory board meeting.`

const JUSTIFICATION_TEXT = `This engagement is scientifically justified as Dr. Vau's expertise in 177Lu-PSMA-617 directly aligns with the meeting's objective of advancing radioligand therapy protocols in Portugal. His insights on patient selection criteria and treatment sequencing from ongoing Phase III trials [CRM_TRIAL_042] are essential for developing evidence-based clinical guidelines. Fair Market Value assessment confirms compensation within the approved tier for KOL-level engagement [FMV_REF_2024_PT].`

export default function ViewA() {
  const [activeTab, setActiveTab] = useState('Participantes')
  const [orbState, setOrbState] = useState('blue')
  const [showBio, setShowBio] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showJustification, setShowJustification] = useState(false)
  const [justificationInput, setJustificationInput] = useState('')
  const [showIntentBlock, setShowIntentBlock] = useState(false)
  const [intentConfirm, setIntentConfirm] = useState('')
  const [bioComplete, setBioComplete] = useState(false)
  const [selectedHcp, setSelectedHcp] = useState('HCP_001')

  // Demo sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => { setShowBio(true) }, 1500),
      setTimeout(() => { setOrbState('yellow') }, 4000),
      setTimeout(() => { setShowAlert(true); setOrbState('amber') }, 6000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleJustificationChange = useCallback((e) => {
    const val = e.target.value
    setJustificationInput(val)
    const found = BLACKLIST.some(w => val.toLowerCase().includes(w))
    if (found) {
      setShowIntentBlock(true)
      setOrbState('red')
    }
  }, [])

  return (
    <div className="flex h-full">
      {/* BeSure Legacy App */}
      <div className="flex-1 overflow-y-auto bg-[#1e1e2f]">
        {/* BeSure Header */}
        <div className="bg-[#252538] border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="#666"/>
                <text x="4" y="17" fontSize="12" fill="white" fontWeight="bold">N</text>
              </svg>
              <div>
                <div className="text-white text-sm font-semibold tracking-tight">BeSure</div>
                <div className="text-[10px] text-novartis-text/50">Event & Compliance Management</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-novartis-text/60">
            <span>Novartis Pharma AG</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Region: Portugal</span>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-novartis-mid flex items-center justify-center text-[10px] text-white font-medium">BM</div>
              <span>Borja Martínez</span>
            </div>
          </div>
        </div>

        {/* Event Header */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-novartis-text/40 mb-1">
            <span>Events</span><span>›</span><span>Advisory Board</span><span>›</span><span className="text-novartis-text/70">EVT-2024-PT-0847</span>
          </div>
          <h1 className="text-lg text-white font-semibold">Radioligand Therapy Advisory Board — Lisbon 2024</h1>
          <div className="flex gap-4 mt-2 text-xs text-novartis-text/50">
            <span>📍 Lisbon, Portugal</span>
            <span>📅 15 Mar 2024</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-medium">Draft</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 px-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-white/60 text-white'
                  : 'border-transparent text-novartis-text/40 hover:text-novartis-text/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'Participantes' && (
            <div className="fade-in-up space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-sm font-semibold">Healthcare Professionals</h2>
                <button className="text-xs px-3 py-1.5 rounded-md bg-white/5 text-novartis-text/60 hover:bg-white/10 transition">+ Add HCP</button>
              </div>

              {/* HCP Table */}
              <div className="rounded-lg border border-white/5 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.02] text-novartis-text/40 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium">Name</th>
                      <th className="text-left px-4 py-3 font-medium">City</th>
                      <th className="text-left px-4 py-3 font-medium">Specialty</th>
                      <th className="text-left px-4 py-3 font-medium">Role</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => setSelectedHcp('HCP_001')}
                      className={`cursor-pointer transition border-t border-white/5 ${
                        selectedHcp === 'HCP_001' ? 'bg-pharo-blue/5 border-l-2 border-l-pharo-blue' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xs text-white font-medium">NV</div>
                          <div>
                            <div className="text-white font-medium">Dr. Nuno Vau</div>
                            <div className="text-[10px] text-novartis-text/40">HCP_001 · CRM verified</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-novartis-text/60">Porto</td>
                      <td className="px-4 py-3 text-novartis-text/60">GU Oncology</td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Lead Speaker</span></td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400">Confirmed</span></td>
                    </tr>
                    <tr
                      onClick={() => setSelectedHcp('HCP_002')}
                      className={`cursor-pointer transition border-t border-white/5 ${
                        selectedHcp === 'HCP_002' ? 'bg-pharo-blue/5 border-l-2 border-l-pharo-blue' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center text-xs text-white font-medium">DC</div>
                          <div>
                            <div className="text-white font-medium">Dr. Débora Cardoso</div>
                            <div className="text-[10px] text-novartis-text/40">HCP_002 · CRM verified</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-novartis-text/60">Lisbon</td>
                      <td className="px-4 py-3 text-novartis-text/60">Oncology</td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-gray-500/10 text-gray-400">Attendee</span></td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Selected HCP Detail */}
              {selectedHcp === 'HCP_001' && (
                <div className="fade-in-up rounded-lg border border-white/5 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm">Dr. Nuno Vau — Profile</h3>
                    <span className="text-[10px] text-novartis-text/30 font-mono">HCP_001</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div><span className="text-novartis-text/40">Institution</span><div className="text-novartis-text mt-0.5">Centro Hospitalar Universitário do Porto</div></div>
                    <div><span className="text-novartis-text/40">Specialty</span><div className="text-novartis-text mt-0.5">GU Oncology</div></div>
                    <div><span className="text-novartis-text/40">City</span><div className="text-novartis-text mt-0.5">Porto, Portugal</div></div>
                    <div><span className="text-novartis-text/40">Research Focus</span><div className="text-novartis-text mt-0.5">177Lu-PSMA-617 Radioligand Therapy</div></div>
                    <div><span className="text-novartis-text/40">Publications</span><div className="text-novartis-text mt-0.5">23 peer-reviewed</div></div>
                    <div><span className="text-novartis-text/40">Distance to Event</span><div className="text-amber-400 mt-0.5 font-medium">313 km (Porto → Lisbon)</div></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'General' && (
            <div className="fade-in-up space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Event Name', 'Radioligand Therapy Advisory Board'],
                  ['Event Type', 'Advisory Board Meeting'],
                  ['Therapeutic Area', 'Radioligand Therapy'],
                  ['Country', 'Portugal'],
                  ['Date', '15 March 2024'],
                  ['Status', 'Draft'],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-1">
                    <label className="text-xs text-novartis-text/40">{label}</label>
                    <div className="px-3 py-2 rounded-md bg-white/[0.03] border border-white/5 text-sm text-novartis-text">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Location' && (
            <div className="fade-in-up space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Venue', 'Hotel Tivoli Avenida — Lisbon'],
                  ['City', 'Lisbon'],
                  ['Address', 'Av. da Liberdade 185, 1269-050 Lisboa'],
                  ['Country', 'Portugal'],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-1">
                    <label className="text-xs text-novartis-text/40">{label}</label>
                    <div className="px-3 py-2 rounded-md bg-white/[0.03] border border-white/5 text-sm text-novartis-text">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Finance' && (
            <div className="fade-in-up space-y-4">
              <h2 className="text-white text-sm font-semibold mb-3">Budget Breakdown</h2>
              <div className="rounded-lg border border-white/5 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.02] text-novartis-text/40 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium">Category</th>
                      <th className="text-right px-4 py-3 font-medium">Amount (EUR)</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-novartis-text/70">
                    {[
                      ['Speaker Fees', '€4,200.00', 'ok'],
                      ['Travel', '€890.00', 'ok'],
                      ['Accommodation', '€0.00', 'alert'],
                      ['Meals & Catering', '€720.00', 'ok'],
                      ['Venue Rental', '€1,500.00', 'ok'],
                      ['Agency Fee', '€850.00', 'ok'],
                    ].map(([cat, amt, status]) => (
                      <tr key={cat} className={`border-t border-white/5 ${status === 'alert' ? 'bg-amber-500/5' : ''}`}>
                        <td className="px-4 py-3">{cat}</td>
                        <td className={`px-4 py-3 text-right font-mono ${status === 'alert' ? 'text-amber-400 font-semibold' : ''}`}>{amt}</td>
                        <td className="px-4 py-3">
                          {status === 'alert'
                            ? <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">⚠ Missing</span>
                            : <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400">✓</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Justification' && (
            <div className="fade-in-up space-y-4">
              <h2 className="text-white text-sm font-semibold">Justification Details</h2>
              <textarea
                className="w-full h-40 rounded-lg bg-white/[0.03] border border-white/5 p-4 text-sm text-novartis-text resize-none focus:outline-none focus:border-pharo-blue/30 transition"
                placeholder="Enter justification for this engagement..."
                value={justificationInput}
                onChange={handleJustificationChange}
              />
              <p className="text-[10px] text-novartis-text/30">AI-assisted drafting available in sidebar →</p>
            </div>
          )}
        </div>
      </div>

      {/* Pharo Sidebar */}
      <Sidebar>
        <ComplianceOrb state={orbState} />

        {/* Status Line */}
        <div className="glass-light rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${orbState === 'blue' ? 'bg-blue-400' : orbState === 'amber' ? 'bg-amber-400' : orbState === 'red' ? 'bg-red-400' : 'bg-yellow-400'} animate-pulse`} />
            <span className="text-novartis-text/60">
              {orbState === 'blue' && 'Analyzing event context and HCP profiles...'}
              {orbState === 'yellow' && 'Cross-referencing compliance thresholds...'}
              {orbState === 'amber' && 'Travel compliance gap detected'}
              {orbState === 'red' && 'Intent keyword violation — action required'}
            </span>
          </div>
        </div>

        {/* Bio Section */}
        {showBio && (
          <div className="fade-in-up space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">AI-Generated Bio</h3>
              <span className="text-[10px] text-pharo-blue">Plan B Narrator</span>
            </div>
            <div className="glass-light rounded-lg p-4 text-xs text-novartis-text/80 leading-relaxed">
              <TypeWriter text={BIO_TEXT} speed={15} delay={500} onComplete={() => setBioComplete(true)} />
            </div>
            {bioComplete && (
              <div className="fade-in-up flex gap-2">
                <button className="flex-1 py-2 rounded-md bg-gradient-to-r from-pharo-blue to-pharo-purple text-white text-xs font-medium hover:opacity-90 transition">
                  ✓ Adopt Draft
                </button>
                <button className="py-2 px-3 rounded-md bg-white/5 text-novartis-text/60 text-xs hover:bg-white/10 transition">
                  Edit
                </button>
              </div>
            )}
          </div>
        )}

        {/* Justification Draft */}
        {showBio && bioComplete && (
          <div className="fade-in-up space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Justification Draft</h3>
              <span className="text-[10px] text-pharo-cyan">Auto-synthesis</span>
            </div>
            <div className="glass-light rounded-lg p-4 text-xs text-novartis-text/80 leading-relaxed">
              <TypeWriter text={JUSTIFICATION_TEXT} speed={15} delay={300} />
            </div>
          </div>
        )}

        {/* Travel Alert */}
        {showAlert && (
          <div className="fade-in-up">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">⚠</span>
                <span className="text-xs font-semibold text-amber-400">Travel Compliance Alert</span>
              </div>
              <p className="text-xs text-novartis-text/70 leading-relaxed">
                <strong className="text-white">Dr. Nuno Vau</strong> is based in <strong className="text-white">Porto</strong>, traveling to event in <strong className="text-white">Lisbon</strong>.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <div><span className="text-novartis-text/40">Distance:</span> <span className="text-amber-400 font-mono font-semibold">313 km</span></div>
                <div><span className="text-novartis-text/40">Accommodation:</span> <span className="text-red-400 font-mono font-semibold">€0.00</span></div>
              </div>
              <p className="text-[10px] text-novartis-text/40 mt-1">
                Policy GEO_01: Travel &gt;50km requires non-zero lodging budget. Please justify or update Finance tab.
              </p>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 py-1.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition">
                  Update Budget
                </button>
                <button className="flex-1 py-1.5 rounded-md bg-white/5 text-novartis-text/60 text-xs hover:bg-white/10 transition">
                  Add Justification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Intent Gatekeeper Modal */}
        {showIntentBlock && (
          <div className="fade-in-up">
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">🛑</span>
                <span className="text-xs font-semibold text-red-400">Intent Gatekeeper — Action Required</span>
              </div>
              <p className="text-xs text-novartis-text/70 leading-relaxed">
                Your entry contains terms suggesting <strong className="text-red-400">intent to influence</strong>. Submission is blocked until reviewed.
              </p>
              <div className="space-y-2">
                <label className="text-[10px] text-novartis-text/40">Type <strong className="text-white">CONFIRM MEDICAL NEED</strong> to proceed:</label>
                <input
                  type="text"
                  value={intentConfirm}
                  onChange={e => setIntentConfirm(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-red-500/20 text-sm text-white focus:outline-none focus:border-red-500/40"
                  placeholder="CONFIRM MEDICAL NEED"
                />
                {intentConfirm === 'CONFIRM MEDICAL NEED' && (
                  <button
                    onClick={() => { setShowIntentBlock(false); setOrbState('amber') }}
                    className="w-full py-2 rounded-md bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition"
                  >
                    Confirm & Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Audit Trail */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="text-[10px] text-novartis-text/30 space-y-1">
            <div>📋 Audit Trail: 3 actions logged</div>
            <div>🕐 Last sync: {new Date().toLocaleTimeString()}</div>
            <div>🔒 Session: EVT-2024-PT-0847</div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
