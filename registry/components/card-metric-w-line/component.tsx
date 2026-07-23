import { useId, type ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';
import { lineMetricsData } from './data';

export interface CardMetricLineProps {
    title: string;
    value: number | string;
    unit?: string;
    icon?: ComponentType<{ className?: string }>;
    data: number[];
    change?: number;
    positiveData?: boolean;
    className?: string;
}

const CHART_WIDTH = 100;
const CHART_HEIGHT = 32;

function buildLinePoints(data: number[]): string {
    if (data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = CHART_WIDTH / (data.length - 1 || 1);

    return data
        .map((value, index) => {
            const x = index * step;
            const y = CHART_HEIGHT - ((value - min) / range) * CHART_HEIGHT;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(' ');
}

export const CardMetricLine = ({
    title,
    value,
    unit,
    icon: Icon = Activity,
    data,
    change,
    positiveData = true,
    className,
    ...props
}: CardMetricLineProps) => {
    const gradientId = useId();
    const isTrendingUp = change !== undefined
        ? change >= 0
        : data.length > 1
            ? data[data.length - 1] >= data[0]
            : true;
    const isPositiveOutcome = positiveData ? isTrendingUp : !isTrendingUp;
    const trendColorClass = isPositiveOutcome ? 'text-emerald-500' : 'text-rose-500';
    const strokeColor = isPositiveOutcome ? '#10b981' : '#f43f5e';
    const points = buildLinePoints(data);
    const areaPoints = points ? `0,${CHART_HEIGHT} ${points} ${CHART_WIDTH},${CHART_HEIGHT}` : '';

    return (
        <div
            className={cn(
                "flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm w-full bg-white font-sans",
                className
            )}
            {...props}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 truncate">{title}</span>
                </div>

                {change !== undefined && (
                    <span className={cn("flex items-center gap-0.5 text-xs font-semibold shrink-0", trendColorClass)}>
                        {isTrendingUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(change)}%
                    </span>
                )}
            </div>

            <div className="flex items-end justify-between gap-3">
                <div className="flex gap-1 items-baseline shrink-0">
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </span>
                    {unit && <span className="text-xs font-light text-slate-500">{unit}</span>}
                </div>

                {points && (
                    <svg
                        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                        preserveAspectRatio="none"
                        className="w-24 h-9 shrink-0"
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                                <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polygon points={areaPoints} fill={`url(#${gradientId})`} stroke="none" />
                        <polyline
                            points={points}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default function CardMetricLineDemo() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lineMetricsData.map((item, index) => (
                <CardMetricLine key={index} {...item} />
            ))}
        </div>
    );
}
