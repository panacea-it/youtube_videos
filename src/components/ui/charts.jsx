import { cn } from '../../utils/cn'

function toNumber(value) {
  if (typeof value === 'number') return value
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function getScale(data, series) {
  const values = data.flatMap((item) => series.map(({ key }) => toNumber(item[key])))
  const min = Math.min(0, ...values)
  const max = Math.max(1, ...values)
  return { min, max, range: max - min || 1 }
}

function formatValue(value) {
  const number = toNumber(value)
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number >= 1000) return `${(number / 1000).toFixed(0)}K`
  return String(value)
}

export function LineChartPanel({ data, xKey, series, area = false, className }) {
  const { min, range } = getScale(data, series)
  const pointsFor = (key) =>
    data
      .map((item, index) => {
        const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100
        const y = 52 - ((toNumber(item[key]) - min) / range) * 42
        return `${x},${y}`
      })
      .join(' ')

  const firstSeries = series[0]
  const areaPoints = firstSeries ? `0,54 ${pointsFor(firstSeries.key)} 100,54` : ''

  return (
    <div className={cn('flex h-full min-h-64 flex-col justify-between', className)}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full min-h-56 w-full overflow-visible">
        {[14, 28, 42, 54].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(148 163 184 / 0.24)" strokeDasharray="1 2" />
        ))}
        {area && firstSeries && (
          <polygon points={areaPoints} fill={firstSeries.color} opacity="0.12" />
        )}
        {series.map((item) => (
          <polyline
            key={item.key}
            fill="none"
            points={pointsFor(item.key)}
            stroke={item.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[rgb(var(--muted-foreground))]">
        <div className="flex flex-wrap gap-3">
          {series.map((item) => (
            <span key={item.key} className="inline-flex items-center gap-1.5 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
        <span>{data[0]?.[xKey]} - {data[data.length - 1]?.[xKey]}</span>
      </div>
    </div>
  )
}

export function BarChartPanel({ data, xKey, bars, className }) {
  const { min, range } = getScale(data, bars)
  const groupWidth = 100 / Math.max(data.length, 1)
  const barWidth = Math.min(6, groupWidth / (bars.length + 1.2))

  return (
    <div className={cn('flex h-full min-h-64 flex-col justify-between', className)}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full min-h-56 w-full overflow-visible">
        {[14, 28, 42, 54].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(148 163 184 / 0.24)" strokeDasharray="1 2" />
        ))}
        {data.map((item, itemIndex) =>
          bars.map((bar, barIndex) => {
            const height = Math.max(2, ((toNumber(item[bar.key]) - min) / range) * 44)
            const x = itemIndex * groupWidth + groupWidth / 2 - (bars.length * barWidth) / 2 + barIndex * barWidth
            return (
              <rect
                key={`${item[xKey]}-${bar.key}`}
                x={x}
                y={54 - height}
                width={barWidth * 0.78}
                height={height}
                rx="1.8"
                fill={bar.color}
              />
            )
          }),
        )}
      </svg>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-[rgb(var(--muted-foreground))]">
        {bars.map((bar) => (
          <span key={bar.key} className="inline-flex items-center gap-1.5 font-semibold">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bar.color }} />
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DonutChartPanel({ data, colors, className }) {
  const total = data.reduce((sum, item) => sum + toNumber(item.value), 0) || 1
  const stops = data.reduce(
    (acc, item, index) => {
      const start = acc.current
      const next = start + (toNumber(item.value) / total) * 100
      return {
        current: next,
        values: [...acc.values, `${colors[index % colors.length]} ${start}% ${next}%`],
      }
    },
    { current: 0, values: [] },
  ).values

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className="relative h-40 w-40 rounded-full"
        style={{ background: `conic-gradient(${stops.join(', ')})` }}
      >
        <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-[rgb(var(--card))] text-center">
          <span className="text-2xl font-black">{formatValue(total)}%</span>
          <span className="text-xs font-semibold text-[rgb(var(--muted-foreground))]">Share</span>
        </div>
      </div>
    </div>
  )
}

export function HorizontalBars({ data, labelKey, valueKey, color = '#2563eb' }) {
  const max = Math.max(1, ...data.map((item) => toNumber(item[valueKey])))
  return (
    <div className="space-y-3">
      {data.map((item) => {
        const value = toNumber(item[valueKey])
        return (
          <div key={item[labelKey]} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-xs font-bold">
              <span className="truncate">{item[labelKey]}</span>
              <span>{value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
