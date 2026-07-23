import { AlertTriangle, Droplets, Recycle, Trash2, Truck, Wind } from 'lucide-react';
import type { CardDataProps } from './component';

// variant="icon" — leading icon + title/subtitle + status badge
export const iconVariantData: CardDataProps = {
    heading: "แจ้งเตือนระบบ",
    variant: 'icon',
    items: [
        {
            title: "เซ็นเซอร์วัดค่า pH ขัดข้อง",
            subtitle: "โซนบำบัดน้ำเสีย A",
            icon: AlertTriangle,
            status: 'critical',
        },
        {
            title: "ปริมาณขยะเข้าสูงกว่าปกติ",
            subtitle: "จุดคัดแยกกลาง",
            icon: Trash2,
            status: 'high_warning',
        },
        {
            title: "รถขนส่งขยะคันที่ 3",
            icon: Truck,
            status: 'normal', // ไม่มี subtitle
        },
        {
            title: "ระบบรีไซเคิลพลาสติก",
            subtitle: "สายการผลิต 2",
            icon: Recycle,
            status: 'stable',
        },
        {
            title: "จุดตรวจวัดคุณภาพอากาศ",
            subtitle: "ยังไม่ได้ติดตั้งเซ็นเซอร์ IoT", // ไม่มี icon -> fallback เป็น Box, ไม่มี status
        },
    ],
};

// variant="accent" — colored left border + description/locations/effectedPeople
export const accentVariantData: CardDataProps = {
    heading: "เหตุการณ์เร่งด่วน",
    variant: 'accent',
    items: [
        {
            title: "น้ำเสียรั่วไหลจากบ่อบำบัด",
            subtitle: "ตรวจพบเมื่อ 08:15 น.",
            description: "ค่า BOD เกินมาตรฐาน 3 เท่า",
            locations: ["โซน A", "คลองระบายน้ำหลัก"],
            effectedPeople: "ประมาณ 120 ครัวเรือน",
            status: 'urgent',
            tone: 'rose',
            icon: Droplets,
        },
        {
            title: "ควันจากเตาเผาขยะเกินค่ามาตรฐาน",
            locations: ["โรงเผาขยะ 2"], // ไม่มี subtitle, description, effectedPeople
            status: 'high_risk',
            tone: 'amber',
            icon: Wind,
        },
        {
            title: "ปริมาณขยะพลาสติกสะสมเกินโควตา",
            subtitle: "คลังเก็บชั่วคราว",
            effectedPeople: "ทีมงาน 8 คน", // ไม่มี locations
            status: 'warning',
            tone: 'amber',
        },
        {
            title: "ระบบไฟฟ้าสำรองขัดข้อง",
            description: "แบตเตอรี่สำรองเหลือ 20%", // ไม่มี subtitle, locations, effectedPeople
            status: 'urgent_soft',
            tone: 'blue',
        },
    ],
};

// variant="number" — ranked list with tone-colored index + time
export const numberVariantData: CardDataProps = {
    heading: "อันดับพื้นที่ปล่อยขยะสูงสุด",
    variant: 'number',
    items: [
        {
            title: "เขตอุตสาหกรรมฝั่งเหนือ",
            subtitle: "โรงงาน 24 แห่ง",
            status: 'increasing',
            time: "อัปเดต 5 นาทีที่แล้ว",
            tone: 'rose',
        },
        {
            title: "ตลาดสดกลางเมือง",
            subtitle: "ขยะอินทรีย์เป็นหลัก",
            status: 'stable',
            tone: 'amber', // ไม่มี time
        },
        {
            title: "ย่านที่พักอาศัยฝั่งใต้",
            time: "อัปเดตเมื่อวานนี้", // ไม่มี subtitle, status
            tone: 'blue',
        },
        {
            title: "นิคมโลจิสติกส์",
            subtitle: "คลังสินค้า 12 แห่ง",
            status: 'decreasing',
            time: "อัปเดต 1 ชั่วโมงที่แล้ว",
            tone: 'emerald',
        },
    ],
};

// variant="time" — timeline rows, ordered by scheduled time
export const timeVariantData: CardDataProps = {
    heading: "ตารางเก็บขยะวันนี้",
    variant: 'time',
    items: [
        {
            title: "รถเก็บขยะทั่วไป",
            subtitle: "โซน A-C",
            time: "06:00",
        },
        {
            title: "รถเก็บขยะรีไซเคิล",
            time: "08:30", // ไม่มี subtitle
        },
        {
            title: "รถเก็บขยะอันตราย",
            subtitle: "นัดหมายล่วงหน้าเท่านั้น",
            time: "10:00",
        },
        {
            title: "ทีมเก็บขยะอินทรีย์",
            subtitle: "ตลาดสดและร้านอาหาร",
            time: "13:00",
        },
        {
            title: "รถบรรทุกขนถ่ายไปโรงกำจัด",
            time: "16:45",
        },
    ],
};
