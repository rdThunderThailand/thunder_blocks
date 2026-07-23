import { Droplets, CloudRain, Trash2, Gauge } from 'lucide-react';
import type { CardMetricLineProps } from './component';

export const lineMetricsData: CardMetricLineProps[] = [
    {
        title: 'ระดับน้ำแม่น้ำเจ้าพระยา',
        value: 2.4,
        unit: 'ม.',
        icon: Droplets,
        data: [1.8, 1.9, 2.0, 2.1, 2.0, 2.2, 2.4],
        change: 12.5,
        positiveData: false,
    },
    {
        title: 'ปริมาณน้ำฝนสะสม',
        value: 68,
        unit: 'มม.',
        icon: CloudRain,
        data: [40, 45, 42, 50, 58, 60, 68],
        change: 8.2,
        positiveData: false,
    },
    {
        title: 'ปริมาณขยะที่จัดเก็บ',
        value: 312,
        unit: 'ตัน/วัน',
        icon: Trash2,
        data: [290, 300, 295, 305, 298, 308, 312],
        change: 1.4,
        positiveData: true,
    },
    {
        title: 'ความดันท่อส่งน้ำประปา',
        value: 3.1,
        unit: 'บาร์',
        icon: Gauge,
        data: [3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1],
        change: -6.5,
        positiveData: true,
    },
];
