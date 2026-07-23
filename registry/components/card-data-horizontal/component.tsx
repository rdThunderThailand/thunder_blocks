import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { Box } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { metricSourceData } from './data';

export interface CardDataHorizontalItemProps {
    title: string;
    subtitle?: string;
    icon?: ComponentType<{ className?: string }>;
    statusLabel?: string;
    isOnline?: boolean;
}

export const CardDataHorizontalItem = ({
    title,
    subtitle,
    icon: Icon = Box,
    statusLabel,
    isOnline,
}: CardDataHorizontalItemProps) => {
    return (
        <div className="flex flex-col items-center text-center flex-1 min-w-0 font-sans">
            {/* Circular Icon Wrapper matching the dashboard design */}
            <div className="flex items-center justify-center w-11 h-11 bg-slate-50 text-slate-700 rounded-full border border-slate-100/70 shrink-0 transition-transform duration-200 hover:scale-105">
                <Icon className="w-5 h-5" />
            </div>

            {/* Text details stacked underneath */}
            <div className="flex flex-col items-center mt-2 w-full px-1">
                <span className="text-xs font-bold text-slate-800 truncate w-full">
                    {title}
                </span>
                {subtitle && (
                    <span className="text-[11px] text-slate-400 font-medium truncate w-full mt-0.5">
                        {subtitle}
                    </span>
                )}
            </div>

            {/* Optional Status Badge if used in other dynamic views */}
            {statusLabel && (
                <span
                    className={cn(
                        "mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0",
                        isOnline === undefined
                            ? "bg-slate-50 text-slate-600"
                            : isOnline
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                    )}
                >
                    {statusLabel}
                </span>
            )}
        </div>
    );
};

export interface CardDataHorizontalProps {
    heading: string;
    allDataHref?: string;
    items: CardDataHorizontalItemProps[];
    className?: string;
    count?: number;
    maxItems?: number;
}

export const CardDataHorizontal = ({
    heading,
    allDataHref = "#",
    items = [],
    className,
    count,
    maxItems,
    ...props
}: CardDataHorizontalProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 border border-slate-100 rounded-xl shadow-sm w-full font-sans bg-white",
                className
            )}
            {...props}
        >
            {/* Header section layout */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                <h3 className="text-sm font-semibold text-slate-800 truncate">
                    {count !== undefined ? `${heading} (${count})` : heading}
                </h3>
                <a
                    href={allDataHref}
                    className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-600 transition-colors duration-150 shrink-0"
                >
                    ดูทั้งหมด
                    <ChevronRight className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* Horizontal Flex Grid matching the image's row arrangement */}
            <div className="flex items-start justify-between w-full gap-2 pt-1">
                {items.slice(0, maxItems).map((item, index) => (
                    <CardDataHorizontalItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default function CardDataHorizontalDemo() {
    return <CardDataHorizontal {...metricSourceData} />;
}