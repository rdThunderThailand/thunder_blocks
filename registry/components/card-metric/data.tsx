import { ArrowUpRight, Cloud, Recycle, RefreshCw, Sprout, Trash2, Wallet } from 'lucide-react';

export const wasteData = [
    {
        // Minimal card: just title + value + unit, nothing else
        title: "ปริมาณขยะรวม",
        value: 1240.78,
        unit: "kg",
        icon: Wallet,
        date: new Date(),
    },
    {
        // Trend only (subValue/subUnit), no subtitle/status
        title: "อัตราการนำกลับมาใช้",
        value: 87.8,
        unit: "%",
        icon: Recycle,
        subValue: 17,
        subUnit: "% จากเดือนก่อน",
        positiveData: true, // เพิ่มขึ้น = ดี ใช้สีเขียว
        date: new Date(),
    },
    {
        // Subtitle only, no status/trend
        title: "ต้นทุนการจัดการ",
        subtitle: "รวมค่าขนส่งและค่ากำจัด",
        value: "1,240.78",
        unit: "VND",
        icon: Wallet,
        date: new Date(),
        classNameForIcon: "text-red-500 bg-red-50",
        className: "border-l-4 border-l-red-500",
    },
    {
        // Status text only, no subtitle/trend
        title: "สถานะการชำระเงิน",
        value: 3200,
        unit: "VND",
        icon: Wallet,
        status: "จ่ายแล้ว 80%",
        positiveData: false,
        date: new Date(),
    },
    {
        // Subtitle + status + chevron, custom accent styling
        title: "อัตราการรีไซเคิล",
        subtitle: "เป้าหมายไตรมาสนี้: 90%",
        value: 87.8,
        unit: "%",
        icon: Recycle,
        status: (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                ใกล้ถึงเป้าหมายแล้ว
            </span>
        ), // ใช้ ReactNode ใน status
        positiveData: true,
        date: new Date(),
        showChevron: true,
        className: "bg-emerald-50/30",
        classNameForIcon: "text-emerald-600 bg-emerald-100",
    },
    {
        // Trend + action button, no subtitle/status
        title: "ปริมาณขยะฝังกลบ",
        value: 842.35,
        unit: "kg",
        icon: Trash2,
        subValue: -910.2,
        subUnit: "kg (เดือนก่อน)",
        positiveData: false, // ลดลง = ดี ใช้สีเขียว
        date: new Date(),
        classNameForIcon: "text-slate-600 bg-slate-100",
        action: (
            <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                ดูรายงาน <ArrowUpRight className="w-3 h-3" />
            </button>
        ),
    },
    {
        // Trend + subtitle, no status/action
        title: "ลดการปล่อย Carbon",
        subtitle: "เทียบกับเป้าหมายปีนี้",
        value: 532.4,
        unit: "kg CO2e",
        icon: Cloud,
        subValue: 48.2,
        subUnit: "kg ประหยัดได้เพิ่ม",
        positiveData: true,
        date: new Date(),
        classNameForIcon: "text-sky-500 bg-sky-50",
    },
    {
        // Subtitle + status + chevron + action icon button (the "fully loaded" layout)
        title: "ขยะอินทรีย์ (Compost)",
        subtitle: "แปลงเป็นปุ๋ยหมักแล้ว",
        value: 340.2,
        unit: "kg",
        icon: Sprout,
        status: "อัปเดตล่าสุดวันนี้",
        positiveData: true,
        date: new Date(),
        showChevron: true,
        classNameForIcon: "text-green-600 bg-green-50",
        action: (
            <button className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                <RefreshCw className="w-3 h-3" />
            </button>
        ),
    },
];
