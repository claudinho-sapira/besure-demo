import { useEffect, useState } from 'react'

const STATES = {
  blue: { color: '#3b82f6', label: 'Analyzing', glow: 'rgba(59,130,246,0.4)' },
  yellow: { color: '#eab308', label: 'Attention', glow: 'rgba(234,179,8,0.4)' },
  amber: { color: '#f59e0b', label: 'Alert', glow: 'rgba(245,158,11,0.4)' },
  red: { color: '#ef4444', label: 'Violation', glow: 'rgba(239,68,68,0.4)' },
}

export default function ComplianceOrb({ state = 'blue', size = 80 }) {
  const s = STATES[state] || STATES.blue
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`rounded-full orb transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${s.color}dd, ${s.color}66)`,
          '--glow-color': s.glow,
          boxShadow: `0 0 20px ${s.glow}, 0 0 60px ${s.glow}, inset 0 -10px 20px rgba(0,0,0,0.3)`,
        }}
      />
      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: s.color }}>
        {s.label}
      </span>
    </div>
  )
}
