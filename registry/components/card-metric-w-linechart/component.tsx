import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { CloudRain } from 'lucide-react';

export interface CardMetricWLineChartProps {
    title: string;
    icon?: ComponentType<{ className?: string }>;
    valueLabel: string;
    valueText: string;
    subLabel: string;
    percentage: number;
    positiveData: boolean;
    chartData: number[];
    chartColorClass?: string;
    className?: string;
}

export interface SparklinePoint {
    x: number;
    y: number;
}

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 40;
const VERTICAL_PADDING = 4;

export function getSparklinePoints(data: number[]): SparklinePoint[] {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    const usableHeight = VIEWBOX_HEIGHT - VERTICAL_PADDING * 2;

    return data.map((value, index) => {
        const x = data.length === 1 ? 0 : (index / (data.length - 1)) * VIEWBOX_WIDTH;
        const normalized = range === 0 ? 0.5 : (value - min) / range;
        const y = VERTICAL_PADDING + (1 - normalized) * usableHeight;

        return { x, y };
    });
}

const getTrendColorClass = (percentage: number, positiveData: boolean) => {
    const isTrendingUp = percentage > 0;
    const isPositiveOutcome = positiveData ? isTrendingUp : !isTrendingUp;

    return isPositiveOutcome ? 'text-emerald-500' : 'text-rose-500';
};

export const CardMetricWLineChart = ({
    title,
    icon: Icon = CloudRain,
    valueLabel,
    valueText,
    subLabel,
    percentage,
    positiveData,
    chartData,
    chartColorClass = 'text-blue-500',
    className,
    ...props
}: CardMetricWLineChartProps) => {
    const trendColorClass = getTrendColorClass(percentage, positiveData);
    const signedPercentage = `${percentage > 0 ? '+' : ''}${percentage}%`;

    const points = chartData.length >= 2 ? getSparklinePoints(chartData) : null;
    const polylinePoints = points?.map((point) => `${point.x},${point.y}`).join(' ');

    return (
        <div
            className={cn(
                "flex flex-col p-4 gap-1 w-full min-w-[200px] max-w-[240px] min-h-[280px] border border-slate-100 rounded-xl shadow-sm font-sans bg-white",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-2">
                <Icon className="text-slate-500 w-6 h-6" />
                <span className="text-sm font-semibold text-slate-600 truncate">{title}</span>
            </div>

            <div className="mt-3">
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {valueLabel} {valueText}
                </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
                <span className="text-slate-500">{subLabel}</span>
                <span className={cn("font-semibold whitespace-nowrap", trendColorClass)}>
                    {signedPercentage}
                </span>
            </div>

            <div className="flex-1" />

            <div className="-mx-1">
                {points ? (
                    <svg
                        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                        preserveAspectRatio="none"
                        className={cn("w-full h-[70px]", chartColorClass)}
                    >
                        <polyline
                            points={polylinePoints}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <div className="w-full h-[70px]" />
                )}
            </div>
        </div>
    );
};

export default CardMetricWLineChart;
