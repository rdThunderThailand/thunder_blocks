import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, FileX, ChevronDown } from 'lucide-react';
import { defaultMockData } from './data';

export interface HistoryRowItem {
    id: string;
    dateTime: { date: string; time: string };
    organicType: { primary: string; subText?: string };
    location: { primary: string; subText?: string };
    amount: number;
    unit: string;
    management: { label: string; statusType: 'success' | 'info' | 'warning' | 'danger' };
    operator: { name: string; role?: string };
    hasDocument: boolean;
}

export interface HistoryTableProps extends React.HTMLAttributes<HTMLDivElement> {
    data: HistoryRowItem[];
    onLoadMore?: () => void;
}

const statusBadgeStyles: Record<HistoryRowItem['management']['statusType'], string> = {
    success: 'bg-emerald-50 text-emerald-600',
    info: 'bg-sky-50 text-sky-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-rose-50 text-rose-600',
};

const statusDotStyles: Record<HistoryRowItem['management']['statusType'], string> = {
    success: 'bg-emerald-500',
    info: 'bg-sky-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
};


function getInitial(name: string) {
    return name.trim().charAt(0).toUpperCase();
}

export function HistoryTable({
    data = defaultMockData,
    onLoadMore,
    className,
    ...props
}: HistoryTableProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm w-full font-sans",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">History</h3>
                <span className="text-xs text-slate-400">{data.length} records</span>
            </div>

            <div className="overflow-x-auto -mx-5">
                <table className="w-full min-w-[880px] text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Date & Time</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Organic Type</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Location</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Amount</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Management</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Operator</th>
                            <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap text-center">Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                                    No history records found.
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors duration-150"
                                >
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-700">{row.dateTime.date}</span>
                                            <span className="text-xs text-slate-400">{row.dateTime.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-700">{row.organicType.primary}</span>
                                            {row.organicType.subText && (
                                                <span className="text-xs text-slate-400">{row.organicType.subText}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-700">{row.location.primary}</span>
                                            {row.location.subText && (
                                                <span className="text-xs text-slate-400">{row.location.subText}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-slate-800">
                                            {row.amount.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                        </span>
                                        <span className="text-xs text-slate-400 ml-1">{row.unit}</span>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                                                statusBadgeStyles[row.management.statusType]
                                            )}
                                        >
                                            <span className={cn("w-1.5 h-1.5 rounded-full", statusDotStyles[row.management.statusType])} />
                                            {row.management.label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold shrink-0">
                                                {getInitial(row.operator.name)}
                                            </span>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-medium text-slate-700 truncate">{row.operator.name}</span>
                                                {row.operator.role && (
                                                    <span className="text-xs text-slate-400 truncate">{row.operator.role}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap text-center">
                                        {row.hasDocument ? (
                                            <FileText className="w-4 h-4 text-emerald-600 inline-block" />
                                        ) : (
                                            <FileX className="w-4 h-4 text-slate-300 inline-block" />
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {onLoadMore && data.length > 0 && (
                <div className="flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={onLoadMore}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-600 border border-gray-300 rounded-lg hover:bg-slate-50 transition-colors duration-150 select-none cursor-pointer"
                    >
                        Load more
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function HistoryTableDemo() {
    return <HistoryTable data={defaultMockData} />;
}
