import type { ComponentType } from 'react';
import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';
import { cn } from '@/lib/utils';

export type WeatherCondition = 'sunny' | 'cloudy' | 'partlyCloudy' | 'rainy';

const conditionIcons: Record<WeatherCondition, ComponentType<{ className?: string }>> = {
    sunny: Sun,
    cloudy: Cloud,
    partlyCloudy: CloudSun,
    rainy: CloudRain,
};

const conditionLabels: Record<WeatherCondition, string> = {
    sunny: "แดดจัด",
    cloudy: "มีเมฆมาก",
    partlyCloudy: "มีเมฆบางส่วน",
    rainy: "ฝนตก",
};

// Colder readings trend blue, hotter readings trend red
const getTemperatureColor = (temperature: number) => {
    if (temperature < 20) return "text-sky-500";
    if (temperature < 30) return "text-emerald-500";
    if (temperature < 35) return "text-amber-500";
    return "text-red-500";
};

export interface WeatherCardProps {
    condition?: WeatherCondition;
    temperature?: number; // Celsius
    humidity?: number; // Percentage
    className?: string;
}

export const WeatherCard = ({
    condition = 'sunny',
    temperature = 32,
    humidity = 65,
    className,
}: WeatherCardProps) => {
    const Icon = conditionIcons[condition];

    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100",
            className
        )}>
            <Icon className="w-6 h-6 text-amber-400 shrink-0" />

            <div className="flex flex-col leading-1.5">
                <span className="text-sm font-semibold text-slate-600">{conditionLabels[condition]}</span>
                <span className="text-[10px] text-slate-400">ความชื้น {humidity}%</span>
            </div>

            <span className={cn("text-xl font-bold", getTemperatureColor(temperature))}>{temperature}°C</span>
        </div>
    );
};

export default WeatherCard;
