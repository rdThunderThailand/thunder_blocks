import type { CardMediaItemProps } from './component';

export const cctvMediaData = {
    heading: 'กล้อง CCTV สด (ตัวอย่าง)',
    allDataHref: '#',
    items: [
        {
            title: 'แยกตลาดน้อย',
            imageUrl: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&auto=format&fit=crop&q=60', // Updated to a classic Bangkok old town alley street scene
            statusLabel: 'ออนไลน์',
            isOnline: true,
        },
        {
            title: 'คลองบางใหญ่ (กะทู้)',
            imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=500&auto=format&fit=crop&q=60', // Replace with real camera stream/image URL
            statusLabel: 'ออนไลน์',
            isOnline: true,
        },
        {
            title: 'หาดป่าตอง',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60', // Replace with real camera stream/image URL
            statusLabel: 'ออนไลน์',
            isOnline: true,
        },
    ] as CardMediaItemProps[]
};