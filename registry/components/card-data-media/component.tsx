import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { cctvMediaData } from './data';

export interface CardMediaItemProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    statusLabel?: string;
    isOnline?: boolean;
}

export const CardMediaItem = ({
    title,
    imageUrl,
    statusLabel,
    isOnline,
    ...props
}: CardMediaItemProps) => {
    return (
        <div className="flex flex-col w-full font-sans min-w-0" {...props}>
            {/* Panoramic Thumbnail Preview */}
            <div className="w-full aspect-[16/7] rounded-lg overflow-hidden bg-slate-100 border border-slate-100 shrink-0 transition-transform duration-200 hover:scale-[1.02] active:scale-100">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover select-none"
                />
            </div>

            {/* Label and Status Row underneath the thumbnail */}
            <div className="flex items-center justify-between gap-1.5 mt-2 w-full px-0.5">
                <span className="text-xs font-bold text-slate-700 truncate flex-1 min-w-0">
                    {title}
                </span>

                {statusLabel && (
                    <span
                        className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 transition-colors",
                            isOnline === undefined
                                ? "bg-slate-50 text-slate-500"
                                : isOnline
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-rose-50 text-rose-600"
                        )}
                    >
                        {/* Live Indicator Dot */}
                        {isOnline !== undefined && (
                            <span
                                className={cn(
                                    "w-1 h-1 rounded-full shrink-0",
                                    isOnline ? "bg-emerald-500" : "bg-rose-500"
                                )}
                            />
                        )}
                        {statusLabel}
                    </span>
                )}
            </div>
        </div>
    );
};

export interface CardDataMediaProps {
    heading: string;
    allDataHref?: string;
    items: CardMediaItemProps[];
    className?: string;
    count?: number;
    maxItems?: number;
}

export const CardDataMedia = ({
    heading,
    allDataHref = "#",
    items = [],
    className,
    count,
    maxItems = 3, // Defaults cleanly to 3 visible thumbnails matching the grid image layout
    ...props
}: CardDataMediaProps) => {
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

            {/* Horizontal Grid System matching the reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1">
                {items.slice(0, maxItems).map((item, index) => (
                    <CardMediaItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default function CardDataMediaDemo() {
    return <CardDataMedia {...cctvMediaData} />;
}