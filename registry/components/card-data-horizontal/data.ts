import { Video, Gauge, AreaChart, ClipboardCheck } from 'lucide-react';
import type { CardDataHorizontalItemProps } from './component';

export const metricSourceData = {
    heading: 'แหล่งข้อมูลสำคัญ',
    allDataHref: '#',
    items: [
        {
            title: 'CCTV',
            subtitle: '128 ตัว',
            icon: Video,
        },
        {
            title: 'สถานีวัดน้ำ',
            subtitle: '12 สถานี',
            icon: Gauge,
        },
        {
            title: 'เรดาร์ฝน',
            subtitle: '3 สถานี',
            icon: AreaChart,
        },
        {
            title: 'รายงาน อปท.',
            subtitle: '15 หน่วยงาน',
            icon: ClipboardCheck,
        },
    ] as CardDataHorizontalItemProps[]
};