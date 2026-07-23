import { cn } from '@/lib/utils';
import { waterQualityScore, airQualityScore, sensorUptimeScore } from './data';

export type ScoreBandKey = 'good' | 'moderate' | 'poor';

export interface CardScoreGaugeProps {
    title: string;
    score: number;
    maxScore?: number;
    statusLabel: string;
    band?: ScoreBandKey;
    className?: string;
}

const scoreBandConfig: Record<ScoreBandKey, { arcClass: string; labelClass: string }> = {
    good: { arcClass: 'text-emerald-500', labelClass: 'text-emerald-500' },
    moderate: { arcClass: 'text-amber-500', labelClass: 'text-amber-500' },
    poor: { arcClass: 'text-rose-500', labelClass: 'text-rose-500' },
};

const getBandFromScore = (score: number): ScoreBandKey => {
    if (score >= 70) return 'good';
    if (score >= 40) return 'moderate';
    return 'poor';
};

const GAUGE_RADIUS = 50;
const SEMICIRCLE_LENGTH = Math.PI * GAUGE_RADIUS;
const ARC_PATH = `M 10 60 A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 110 60`;

export const CardScoreGauge = ({
    title,
    score,
    maxScore = 100,
    statusLabel,
    band,
    className,
    ...props
}: CardScoreGaugeProps) => {
    const resolvedBand = band ?? getBandFromScore(score);
    const bandStyle = scoreBandConfig[resolvedBand];
    const ratio = Math.min(Math.max(score / maxScore, 0), 1);
    const dashOffset = SEMICIRCLE_LENGTH * (1 - ratio);

    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm",
                className
            )}
            {...props}
        >
            <span className="text-sm font-semibold text-slate-800">{title}</span>

            <svg viewBox="0 0 120 70" className="w-full">
                <path
                    d={ARC_PATH}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                    className="text-slate-100"
                />
                <path
                    d={ARC_PATH}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                    strokeDasharray={SEMICIRCLE_LENGTH}
                    strokeDashoffset={dashOffset}
                    className={bandStyle.arcClass}
                />
                <text
                    x="60"
                    y="60"
                    textAnchor="middle"
                    fontSize="22"
                    className="font-bold fill-slate-800"
                >
                    {score}
                </text>
            </svg>

            <span className={cn("text-sm font-semibold", bandStyle.labelClass)}>{statusLabel}</span>
        </div>
    );
};

export default function CardScoreGaugeDemo() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CardScoreGauge {...waterQualityScore} />
            <CardScoreGauge {...airQualityScore} />
            <CardScoreGauge {...sensorUptimeScore} />
        </div>
    );
}
