import type { ProvinceCode } from '../../lib/types'

const fleur = 'M0 -2.1c1 .3 1.3 1.7 0 1.8 .7 .7 .5 1.8 0 2.1 -.5-.3 -.7-1.4 0-2.1 -1.3-.1 -1-1.5 0-1.8z'

function Jack({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#1e3a8a" />
      <path d={`M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}`} stroke="#fff" strokeWidth={h * 0.22} />
      <path d={`M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}`} stroke="#b91c1c" strokeWidth={h * 0.1} />
      <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke="#fff" strokeWidth={h * 0.3} />
      <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke="#b91c1c" strokeWidth={h * 0.18} />
    </g>
  )
}

export default function ProvinceFlag({ code, className }: { code: ProvinceCode; className?: string }) {
  const clipId = `fc-${code}`
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}><rect width="30" height="20" rx="3" /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {code === 'bc' && (
          <>
            <rect width="30" height="20" fill="#1e40af" />
            <Jack x={0} y={0} w={30} h={8.5} />
            <path d="M0 10 h30 M0 12.5 h30 M0 15 h30" stroke="#fff" strokeWidth="1.4" />
            <path d="M15 16 l-6.5 4 a8 8 0 0 1 13 0 z" fill="#facc15" />
          </>
        )}
        {code === 'ab' && (
          <>
            <rect width="30" height="20" fill="#0b3d91" />
            <g transform="translate(10.4 3)">
              <path d="M0 0 h9.2 v7 c0 3.4-2.8 5.9-4.6 6.9-1.8-1-4.6-3.5-4.6-6.9z" fill="#fff" />
              <path d="M0 0 h9.2 v3.2 h-9.2z" fill="#dc2626" />
              <path d="M4.1 0 h1 v3.2 h-1z" fill="#fff" />
              <path d="M0 3.2 h9.2 v6 c0 2.8-2.3 5.2-4.6 6.1-2.3-.9-4.6-3.3-4.6-6.1z" fill="#fde047" />
              <path d="M0 5.4 l2.4-2 2.2 1.6 2.3-1.6 2.3 2 v-1.6 l-2.3-1.4-2.3 1.6-2.2-1.6-2.4 1.6z" fill="#16a34a" />
            </g>
          </>
        )}
        {code === 'on' && (
          <>
            <rect width="30" height="20" fill="#dc2626" />
            <Jack x={0} y={0} w={14} h={10} />
            <g transform="translate(19 4.5)">
              <path d="M0 0 h8 v5 c0 2.8-2.4 4.8-4 5.7-1.6-.9-4-2.9-4-5.7z" fill="#15803d" />
              <path d="M0 0 h8 v4.6 h-8z" fill="#fff" />
              <path d="M3.5 0 h1 v4.6 h-1z M0 1.8 h8 v1 h-8z" fill="#15803d" />
              <path d="M4 6.2 l-1.6 2.2 h1.1 l-0.9 1.5 h2.8 l-0.9-1.5 h1.1z" fill="#dc2626" />
            </g>
          </>
        )}
        {code === 'qc' && (
          <>
            <rect width="30" height="20" fill="#1e40af" />
            <rect x="12.5" width="5" height="20" fill="#fff" />
            <rect y="7.5" width="30" height="5" fill="#fff" />
            {[[6.2, 5], [23.8, 5], [6.2, 15], [23.8, 15]].map(([x, y], i) => (
              <path key={i} transform={`translate(${x} ${y})`} fill="#fff" d={fleur} />
            ))}
          </>
        )}
      </g>
    </svg>
  )
}
