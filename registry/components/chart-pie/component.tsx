import { cn } from '@/lib/utils';
import { SquareArrowOutUpRight } from 'lucide-react';

export interface PieChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface PieChartProps {
    title?: string;
    subtitle?: string;
    data?: PieChartDataPoint[];
    unit?: string;
    className?: string;
}

const defaultPalette = ['#10b981', '#0ea5e9', '#f59e0b', '#8b5cf6', '#f43f5e', '#64748b'];

const defaultMockData: PieChartDataPoint[] = [
    { label: 'Organic', value: 45 },
    { label: 'Plastic', value: 25 },
    { label: 'Paper', value: 15 },
    { label: 'Glass', value: 9 },
    { label: 'Other', value: 6 },
];

export const PieChart = ({
    title = 'Waste Composition',
    subtitle = 'Breakdown by category',
    data = defaultMockData,
    unit = 'kg',
    className,
}: PieChartProps) => {
    const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

    let cumulativePercent = 0;
    const segments = data.map((point, index) => {
        const color = point.color ?? defaultPalette[index % defaultPalette.length];
        const percent = (point.value / total) * 100;
        const start = cumulativePercent;
        cumulativePercent += percent;
        return { ...point, color, percent, start, end: cumulativePercent };
    });

    const gradient = segments
        .map((s) => `${s.color} ${s.start}% ${s.end}%`)
        .join(', ');

    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm w-full max-w-md font-sans",
                className
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{title}</h3>
                    <p className="text-xs text-slate-500 truncate">{subtitle}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 border border-slate-200 text-gray-500 rounded-lg shrink-0">
                    <SquareArrowOutUpRight className="w-4 h-4" />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div
                    className="relative w-32 h-32 shrink-0 rounded-full"
                    style={{ background: `conic-gradient(${gradient})` }}
                >
                    <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
                        <span className="text-base font-bold text-slate-800 tracking-tight">
                            {total.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500">{unit}</span>
                    </div>
                </div>

                <ul className="flex flex-col gap-2 min-w-0 flex-1">
                    {segments.map((s) => (
                        <li key={s.label} className="flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: s.color }}
                                />
                                <span className="text-slate-600 truncate">{s.label}</span>
                            </div>
                            <span className="font-semibold text-slate-800 shrink-0">
                                {s.percent.toFixed(0)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PieChart;
