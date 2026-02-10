import { NavLink } from 'react-router-dom'

export default function Nav() {
  const link = (to, label, user) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-pharo-blue to-pharo-purple text-white shadow-lg shadow-pharo-blue/25'
            : 'text-novartis-text hover:text-white hover:bg-white/5'
        }`
      }
    >
      <span className="opacity-60 mr-1.5">{user}</span> {label}
    </NavLink>
  )

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-novartis-dark/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pharo-blue to-pharo-purple flex items-center justify-center text-white font-bold text-sm">P</div>
        <span className="text-white font-semibold tracking-tight">Pharo</span>
        <span className="text-novartis-text/40 text-xs ml-1">× BeSure Demo</span>
      </div>
      <div className="flex gap-2">
        {link('/borja', 'Event Creation', '👤 Borja')}
        {link('/eduardo', 'Audit & Reconciliation', '👤 Eduardo')}
      </div>
    </nav>
  )
}
