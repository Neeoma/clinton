/** Custom SVG artwork used for the AI advertising capability tile. */
export default function AiVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#08090C] ${className}`}>
      <div className="bg-grid absolute inset-0 opacity-90" />
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[70px]" />
      <svg viewBox="0 0 640 420" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="aiGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9D3A4" />
            <stop offset="55%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#7A6030" />
          </linearGradient>
          <radialGradient id="aiGlow">
            <stop offset="0%" stopColor="#E9D3A4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E9D3A4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="320" cy="210" r="150" fill="url(#aiGlow)" opacity="0.5" />

        {/* Orbit ellipses */}
        {[0, 30, 60, 90, 120, 150].map((rot) => (
          <ellipse key={rot} cx="320" cy="210" rx="160" ry="58" transform={`rotate(${rot} 320 210)`} fill="none" stroke="url(#aiGold)" strokeWidth="0.9" opacity="0.5" />
        ))}
        <circle cx="320" cy="210" r="108" fill="none" stroke="url(#aiGold)" strokeWidth="1" opacity="0.35" strokeDasharray="3 7" />
        <circle cx="320" cy="210" r="70" fill="none" stroke="url(#aiGold)" strokeWidth="0.8" opacity="0.28" />

        {/* Connection lines */}
        <g stroke="url(#aiGold)" strokeWidth="0.8" opacity="0.45">
          <path d="M90 100 L210 170 L320 210 L440 150 L560 95" fill="none" />
          <path d="M80 320 L200 260 L320 210 L450 275 L570 330" fill="none" />
          <path d="M320 40 L320 210 L320 390" fill="none" opacity="0.5" />
        </g>

        {/* Nodes */}
        {[
          [90, 100], [210, 170], [320, 210], [440, 150], [560, 95],
          [80, 320], [200, 260], [450, 275], [570, 330], [320, 40], [320, 390],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={i === 2 ? 6 : 3} fill="#E9D3A4" opacity={i === 2 ? 0.95 : 0.7} />
            {i === 2 && <circle cx={cx} cy={cy} r="14" fill="none" stroke="#E9D3A4" strokeWidth="1" opacity="0.55" />}
          </g>
        ))}

        {/* Scan bars */}
        <g opacity="0.25" stroke="#E9D3A4" strokeWidth="0.6">
          <path d="M0 130 H640 M0 290 H640" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-none text-gold-light/90 drop-shadow-[0_0_35px_rgba(201,169,97,0.55)]">AI</span>
        <span className="mt-2 font-heading text-[9px] uppercase tracking-[0.3em] text-gold-light/70">Creative Studio</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
