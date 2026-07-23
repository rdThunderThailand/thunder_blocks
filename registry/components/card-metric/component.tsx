import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, ChevronRight, Leaf } from 'lucide-react';
import { wasteData } from './data';


export interface CardMetricProps {
    title?: string;
    subtitle?: string | ReactNode;
    value: number | string;
    unit?: string;
    icon?: ComponentType<{ className?: string }>;
    status?: string | ReactNode;
    subValue?: | number | null;
    subUnit?: string | ReactNode | null;
    positiveData?: boolean;
    showChevron?: boolean;
    className?: string;
    classNameForIcon?: string;
    action?: ReactNode;
}

export const CardMetric = ({
    title,
    subtitle,
    value,
    unit,
    icon: Icon = Leaf,
    status,
    subValue,
    subUnit,
    positiveData,
    showChevron = false,
    className,
    classNameForIcon,
    action,
    ...props
}: CardMetricProps) => {
    const hasTrend = subValue !== undefined && subValue !== null;
    const isTrendingUp = hasTrend ? subValue > 0 : false;
    const isPositiveOutcome = positiveData !== undefined
        ? (positiveData ? isTrendingUp : !isTrendingUp)
        : isTrendingUp;

    const trendColorClass = isPositiveOutcome ? 'text-green-500' : 'text-red-500';

    return (
        <div
            className={cn(
                "relative flex flex-row items-center gap-3 sm:gap-3 md:gap-4 p-3 border border-slate-100 rounded-xl shadow-sm w-full min-w-[160px] font-sans max-h-[140px]",
                showChevron && "pr-8",
                className
            )}
            {...props}
        >
            <div className="flex h-full">
                <div className={cn("flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full shrink-0", classNameForIcon)}>
                    <Icon className="w-4.5 h-4.5" />
                </div>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
                <div className='flex items-center gap-2'>
                    <span className="text-xs font-medium text-slate-500 truncate">{title}</span>
                </div>
                <div className="flex gap-1.5 items-baseline">
                    <span className="text-xl font-bold text-slate-800 tracking-tight">
                        {(value !== undefined && value !== null)
                            ? (typeof value === 'number' ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 0 }) : value)
                            : '-'}
                    </span>
                    {unit && <span className="text-[11px] font-light text-slate-500">{unit}</span>}
                </div>
                {(hasTrend || subUnit) && (
                    <div className="flex whitespace-nowrap items-center gap-1.5 sm:gap-2 text-xs">
                        {hasTrend && (
                            <span className={trendColorClass}>
                                {isTrendingUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                            </span>
                        )}
                        <p className={cn("font-semibold", hasTrend ? cn("-ml-2", trendColorClass) : "text-slate-500")}>
                            {hasTrend ? `${Math.abs(Number(subValue))} ` : ''}{subUnit}
                        </p>
                    </div>
                )}
                {status && <span className="text-xs font-medium text-black">{status}</span>}
                {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
                {action && <div className="mt-0.5">{action}</div>}
            </div>

            {showChevron && (
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 shrink-0 bg-gray-100 rounded-full" />
            )}
        </div>
    );
};


export default function CardMetricGrid() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {wasteData.map((item, index) => (
                <CardMetric key={index} {...item} className="bg-white hover:shadow-md transition-shadow duration-200" />
            ))}
        </div>
    )
}