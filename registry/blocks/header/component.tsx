"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Scan, ChevronDown, Settings, Info, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeatherCard } from "@/registry/components/weather-card/component";
import { defaultUser } from "./data";

export interface HeaderProps {
    navigationText?: string;
}

function AvatarInitials({ name, className }: { name: string; className?: string }) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className={cn(
                "flex shrink-0 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white",
                className
            )}
        >
            {initials}
        </div>
    );
}

export const Header = ({ navigationText = "สวัสดี" }: HeaderProps) => {
    const [now, setNow] = useState(new Date());
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Live clock, ticks every second
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close the profile dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dateText = now.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const timeText = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="flex h-[60px] w-full items-center justify-between px-4 shadow-md">
            <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold leading-tight text-slate-800">{navigationText}</h3>
                <p className="text-xs text-slate-400">
                    {dateText} | {timeText}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <WeatherCard />

                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <AvatarInitials name={defaultUser.name} className="h-11 w-11 text-sm" />
                        <div className="text-left leading-tight">
                            <p className="text-sm font-bold">{defaultUser.name}</p>
                            <p className="text-[11px] text-slate-400">{defaultUser.role}</p>
                        </div>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 text-slate-400 transition-transform duration-200",
                                isProfileOpen ? "rotate-180" : ""
                            )}
                        />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                            {/* Company info */}
                            <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-2">
                                <AvatarInitials
                                    name={defaultUser.companyName}
                                    className="h-9 w-9 rounded-lg text-xs"
                                />
                                <p className="truncate text-sm font-semibold text-slate-800">
                                    {defaultUser.companyName}
                                </p>
                            </div>

                            <button
                                onClick={() => console.log("Settings clicked")}
                                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                            >
                                <Settings className="h-4 w-4" />
                                <span>ตั้งค่า</span>
                            </button>

                            <button
                                onClick={() => console.log("Information clicked")}
                                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                            >
                                <Info className="h-4 w-4" />
                                <span>ข้อมูล</span>
                            </button>

                            <button
                                onClick={() => console.log("Logout clicked")}
                                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>ออกจากระบบ</span>
                            </button>
                        </div>
                    )}
                </div>

                <Bell className="h-6 w-6 text-slate-600" />
                <Scan className="h-6 w-6 text-slate-600" />
            </div>
        </div>
    );
};

export default Header;
