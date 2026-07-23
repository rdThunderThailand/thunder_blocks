import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Box, MapPin, UsersRound } from 'lucide-react';
import { accentVariantData, iconVariantData, numberVariantData, timeVariantData } from './data';

export type CardDataStatusKey =
    | 'increasing'
    | 'decreasing'
    | 'stable'
    | 'critical'
    | 'high_warning'
    | 'warning'
    | 'high_risk'
    | 'urgent'
    | 'urgent_soft'
    | 'normal';

export type CardDataTone = 'rose' | 'amber' | 'blue' | 'emerald';

export interface CardDataItemProps {
    title: string;
    subtitle?: string;
    icon?: ComponentType<{ className?: string }>;
    status?: CardDataStatusKey;
    description?: string;
    locations?: string[];
    effectedPeople?: string;
    time?: string;
    tone?: CardDataTone;
}

export interface CardDataProps {
    heading: string;
    allDataHref?: string;
    items: CardDataItemProps[];
    className?: string;
    variant?: 'icon' | 'accent' | 'number' | 'time';
    maxItems?: number;
}

const statusConfig: Record<CardDataStatusKey, { label: string; badgeClass: string; dotClass: string; textClass: string }> = {
    increasing: { label: 'เพิ่มขึ้น', badgeClass: 'bg-emerald-50 text-emerald-600', dotClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
    decreasing: { label: 'ลดลง', badgeClass: 'bg-emerald-50 text-emerald-600', dotClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
    stable: { label: 'คงที่', badgeClass: 'bg-sky-50 text-sky-600', dotClass: 'bg-sky-500', textClass: 'text-sky-500' },
    critical: { label: 'วิกฤต', badgeClass: 'bg-rose-50 text-rose-600', dotClass: 'bg-rose-500', textClass: 'text-rose-500' },
    high_warning: { label: 'เฝ้าระวังสูง', badgeClass: 'bg-amber-50 text-amber-600', dotClass: 'bg-amber-500', textClass: 'text-amber-500' },
    warning: { label: 'เฝ้าระวัง', badgeClass: 'bg-amber-50 text-amber-500', dotClass: 'bg-amber-400', textClass: 'text-amber-500' },
    high_risk: { label: 'เสี่ยงสูง', badgeClass: 'bg-rose-50 text-rose-600', dotClass: 'bg-rose-500', textClass: 'text-rose-500' },
    urgent: { label: 'เร่งด่วน', badgeClass: 'bg-rose-50 text-rose-600', dotClass: 'bg-rose-500', textClass: 'text-rose-500' },
    urgent_soft: { label: 'เร่งด่วน', badgeClass: 'bg-amber-50 text-amber-600', dotClass: 'bg-amber-500', textClass: 'text-amber-500' },
    normal: { label: 'ปกติ', badgeClass: 'bg-emerald-50 text-emerald-600', dotClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
};

const toneConfig: Record<CardDataTone, { borderClass: string; bgClass: string }> = {
    rose: { borderClass: 'border-rose-500', bgClass: 'bg-rose-500' },
    amber: { borderClass: 'border-amber-500', bgClass: 'bg-amber-500' },
    blue: { borderClass: 'border-blue-500', bgClass: 'bg-blue-500' },
    emerald: { borderClass: 'border-emerald-500', bgClass: 'bg-emerald-500' },
};

const IconItem = ({ item }: { item: CardDataItemProps }) => {
    const IconComponent = item.icon || Box; // ป้องกันกรณีไม่มี icon ส่งมา
    return (
        <div className="flex items-center justify-between gap-3 py-1">
            <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-9 h-9 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                    <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-800 truncate">{item.title}</span>
                    {item.subtitle && (
                        <span className="text-xs text-slate-400 truncate">{item.subtitle}</span>
                    )}
                </div>
            </div>

            {item.status && statusConfig[item.status] && (
                <span
                    className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0",
                        statusConfig[item.status].badgeClass
                    )}
                >
                    {statusConfig[item.status].label}
                </span>
            )}
        </div>
    );
};

const AccentItem = ({ item }: { item: CardDataItemProps }) => {
    const tone = toneConfig[item.tone ?? 'rose'];
    const metaLine = [item.subtitle, item.description].filter(Boolean).join(' | ');
    return (
        <div className={cn("border-l-4 rounded pl-3 min-w-0", tone.borderClass)}>
            <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] truncate">{item.title}</p>
                {item.status && statusConfig[item.status] && (
                    <span className={cn("text-xs font-semibold shrink-0", statusConfig[item.status].textClass)}>
                        {statusConfig[item.status].label}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1 -mt-2">
                {metaLine && (
                    <p className="text-xs text-slate-400 truncate">{metaLine}</p>
                )}
                {item.locations && item.locations.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 min-w-0">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.locations.join(', ')}</span>
                    </div>
                )}
                {item.effectedPeople && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 min-w-0">
                        <UsersRound className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.effectedPeople}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const NumberItem = ({ item, index }: { item: CardDataItemProps; index: number }) => {
    const tone = toneConfig[item.tone ?? 'blue'];
    return (
        <div className="flex items-center justify-between gap-3">
            <div className={cn("w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0", tone.bgClass)}>
                {index + 1}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-slate-800 truncate">{item.title}</span>
                {item.subtitle && (
                    <span className="text-xs text-slate-400 truncate">{item.subtitle}</span>
                )}
            </div>
            <div className="flex flex-col items-end shrink-0">
                {item.status && statusConfig[item.status] && (
                    <span className={cn("text-xs font-semibold", statusConfig[item.status].textClass)}>
                        {statusConfig[item.status].label}
                    </span>
                )}
                {item.time && (
                    <span className="text-xs text-slate-400">{item.time}</span>
                )}
            </div>
        </div>
    );
};

const TimeItem = ({ item }: { item: CardDataItemProps }) => {
    return (
        <div className="flex items-center gap-3 py-1">
            <span className="w-16 text-sm text-slate-500 shrink-0">
                {item.time}
            </span>
            <div className="flex flex-col min-w-0 border-l border-slate-200 pl-3">
                <span className="text-sm font-bold text-slate-900 truncate">{item.title}</span>
                {item.subtitle && (
                    <span className="text-xs text-slate-400 truncate">{item.subtitle}</span>
                )}
            </div>
        </div>
    );
};

export const CardData = ({
    heading,
    allDataHref = "#",
    items = [],
    className,
    variant = 'icon',
    maxItems,
    ...props
}: CardDataProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 border border-slate-100 rounded-xl shadow-sm w-full min-h-0 font-sans bg-white overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Header section */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <h3 className="text-sm font-semibold text-slate-800 truncate">
                    {items.length > 0 ? `${heading} (${items.length})` : heading}
                </h3>
                <a
                    href={allDataHref}
                    className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                >
                    ดูทั้งหมด
                    <ChevronRight className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* List items section - ตรงนี้คือจุดที่ Map ข้อมูลออกมา */}
            <div className="flex flex-col gap-3">
                {items.slice(0, maxItems).map((item, index) => {
                    if (variant === 'accent') {
                        return <AccentItem key={index} item={item} />;
                    }
                    if (variant === 'number') {
                        return <NumberItem key={index} item={item} index={index} />;
                    }
                    if (variant === 'time') {
                        return <TimeItem key={index} item={item} />;
                    }
                    return <IconItem key={index} item={item} />;
                })}
            </div>
        </div>
    );
};

export default function CardDataGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CardData {...iconVariantData} />
            <CardData {...accentVariantData} />
            <CardData {...numberVariantData} />
            <CardData {...timeVariantData} />
        </div>
    );
}
