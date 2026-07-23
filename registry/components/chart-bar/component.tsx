import { cn } from '@/lib/utils';
import { SquareArrowOutUpRight } from 'lucide-react';

export interface BarChartDataPoint {
    label: string;
    value: number;
}

export interface BarChartProps {
    title?: string;
    subtitle?: string;
    data?: BarChartDataPoint[];
    unit?: string;
    className?: string;
}

const defaultMockData: BarChartDataPoint[] = [
    { label: 'Mon', value: 42 },
    { label: 'Tue', value: 68 },
    { label: 'Wed', value: 35 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 90 },
    { label: 'Sun', value: 61 },
];

export const BarChart = ({
    title = 'Weekly Waste Volume',
    subtitle = 'Compared to last week',
    data = defaultMockData,
    unit = 'kg',
    className,
}: BarChartProps) => {
    const maxValue = Math.max(...data.map((d) => d.value), 1);
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const average = total / data.length;

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

            <div className="flex items-end justify-between gap-2 h-40 px-1">
                {data.map((point) => {
                    const heightPercent = Math.max((point.value / maxValue) * 100, 4);
                    return (
                        <div
                            key={point.label}
                            className="group flex flex-col items-center justify-end gap-2 h-full flex-1"
                        >
                            <span className="text-[11px] font-medium text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                {point.value}
                            </span>
                            <div
                                className="w-full max-w-[28px] rounded-t-md bg-emerald-500 group-hover:bg-emerald-600 transition-all duration-200"
                                style={{ height: `${heightPercent}%` }}
                            />
                            <span className="text-xs text-slate-500">{point.label}</span>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">Total</span>
                    <span className="font-semibold text-slate-800">{total.toLocaleString()} {unit}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">Average</span>
                    <span className="font-semibold text-slate-800">{average.toFixed(1)} {unit}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">Peak</span>
                    <span className="font-semibold text-slate-800">{maxValue.toLocaleString()} {unit}</span>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
