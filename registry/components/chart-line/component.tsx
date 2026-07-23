"use client";

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export interface LineChartDataPoint {
    label: string;
    value: number;
}

export interface LineChartDataset {
    monthly: LineChartDataPoint[];
    halfYearly: LineChartDataPoint[];
    yearly: LineChartDataPoint[];
}

export interface LineChartProps {
    title?: string;
    subtitle?: string;
    data?: LineChartDataset;
    unit?: string;
    className?: string;
}

type TimeFilter = keyof LineChartDataset;

const TIME_FILTER_TABS: { key: TimeFilter; label: string }[] = [
    { key: 'monthly', label: 'รายเดือน' },
    { key: 'halfYearly', label: 'รายครึ่งปี' },
    { key: 'yearly', label: 'รายปี' },
];

const defaultMockData: LineChartDataset = {
    monthly: [
        { label: 'สัปดาห์ 1', value: 32 },
        { label: 'สัปดาห์ 2', value: 45 },
        { label: 'สัปดาห์ 3', value: 38 },
        { label: 'สัปดาห์ 4', value: 60 },
    ],
    halfYearly: [
        { label: 'ม.ค.', value: 32 },
        { label: 'ก.พ.', value: 45 },
        { label: 'มี.ค.', value: 38 },
        { label: 'เม.ย.', value: 60 },
        { label: 'พ.ค.', value: 52 },
        { label: 'มิ.ย.', value: 74 },
    ],
    yearly: [
        { label: 'ม.ค.', value: 32 },
        { label: 'ก.พ.', value: 45 },
        { label: 'มี.ค.', value: 38 },
        { label: 'เม.ย.', value: 60 },
        { label: 'พ.ค.', value: 52 },
        { label: 'มิ.ย.', value: 74 },
        { label: 'ก.ค.', value: 68 },
        { label: 'ส.ค.', value: 71 },
        { label: 'ก.ย.', value: 55 },
        { label: 'ต.ค.', value: 63 },
        { label: 'พ.ย.', value: 80 },
        { label: 'ธ.ค.', value: 90 },
    ],
};

const WIDTH = 560;
const CHART_HEIGHT = 160;
const LABEL_HEIGHT = 28;
const HEIGHT = CHART_HEIGHT + LABEL_HEIGHT;
const PADDING_X = 20;
const PADDING_Y = 16;
const GRID_LINE_COUNT = 4;

export const LineChart = ({
    title = 'Waste Trend',
    subtitle = 'ภาพรวมแนวโน้มปริมาณขยะ',
    data = defaultMockData,
    unit = 'kg',
    className,
}: LineChartProps) => {
    const [activeTab, setActiveTab] = useState<TimeFilter>('monthly');
    const activeData = data[activeTab];

    const { linePath, areaPath, points, gridLines } = useMemo(() => {
        const values = activeData.map((d) => d.value);
        const maxValue = Math.max(...values, 1);
        const minValue = Math.min(...values, 0);
        const range = maxValue - minValue || 1;

        const points = activeData.map((point, index) => {
            const x =
                PADDING_X +
                (index / (activeData.length - 1 || 1)) * (WIDTH - PADDING_X * 2);
            const y =
                CHART_HEIGHT -
                PADDING_Y -
                ((point.value - minValue) / range) * (CHART_HEIGHT - PADDING_Y * 2);
            return { ...point, x, y };
        });

        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_HEIGHT - PADDING_Y} L ${points[0].x} ${CHART_HEIGHT - PADDING_Y} Z`;

        const gridLines = Array.from({ length: GRID_LINE_COUNT + 1 }, (_, i) =>
            PADDING_Y + (i / GRID_LINE_COUNT) * (CHART_HEIGHT - PADDING_Y * 2)
        );

        return { linePath, areaPath, points, gridLines };
    }, [activeData]);

    return (
        <div
            className={cn(
                'flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm w-full max-w-2xl font-sans',
                className
            )}
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{title}</h3>
                    <p className="text-xs text-slate-500 truncate">{subtitle}</p>
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-lg shrink-0">
                    {TIME_FILTER_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                                activeTab === tab.key
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="w-full h-48"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="lineChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {gridLines.map((y, i) => (
                    <line
                        key={i}
                        x1={PADDING_X}
                        y1={y}
                        x2={WIDTH - PADDING_X}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                ))}

                <path d={areaPath} fill="url(#lineChartFill)" stroke="none" />
                <path
                    d={linePath}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {points.map((p, i) => (
                    <circle key={`${p.label}-${i}`} cx={p.x} cy={p.y} r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2">
                        <title>{`${p.label}: ${p.value.toLocaleString()} ${unit}`}</title>
                    </circle>
                ))}

                {points.map((p, i) => (
                    <text
                        key={`label-${p.label}-${i}`}
                        x={p.x}
                        y={CHART_HEIGHT + 18}
                        fontSize="10"
                        fill="#94a3b8"
                        textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                    >
                        {p.label}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default LineChart;