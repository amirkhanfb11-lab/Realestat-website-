import type { ChartPoint } from "@/lib/dashboardMock";

const WIDTH = 480;
const HEIGHT = 220;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 28;
const BAR_GAP = 16;

export function AnalyticsChart({ data, title }: { data: ChartPoint[]; title: string }) {
  const max = Math.max(...data.map((point) => point.value));
  const chartHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const barWidth = (WIDTH - BAR_GAP * (data.length - 1)) / data.length;

  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold text-navy-950">{title}</h3>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-6 w-full" role="img" aria-label={title}>
        <line
          x1="0"
          y1={HEIGHT - PADDING_BOTTOM}
          x2={WIDTH}
          y2={HEIGHT - PADDING_BOTTOM}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        {data.map((point, index) => {
          const barHeight = max === 0 ? 0 : (point.value / max) * chartHeight;
          const x = index * (barWidth + BAR_GAP);
          const y = HEIGHT - PADDING_BOTTOM - barHeight;
          return (
            <g key={point.label}>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx="6" className="fill-gold-500" />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-navy-950 text-[11px] font-medium"
              >
                {point.value}
              </text>
              <text
                x={x + barWidth / 2}
                y={HEIGHT - 8}
                textAnchor="middle"
                className="fill-gray-500 text-[11px]"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
