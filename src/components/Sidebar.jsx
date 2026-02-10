export default function Sidebar({ children }) {
  return (
    <div className="w-[400px] h-full glass flex flex-col border-l border-white/5 overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-pharo-blue to-pharo-purple flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <span className="text-white text-sm font-semibold">Pharo Intelligence</span>
            <span className="text-[10px] text-pharo-blue ml-2 font-medium">LIVE</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-5 space-y-5">
        {children}
      </div>
    </div>
  )
}
