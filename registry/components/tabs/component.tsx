"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
    value: string | number;
    title: string;
    content?: () => ReactNode;
}

export interface TabsProps {
    tabs?: TabItem[];
    activeValue?: string | number;
    onChange?: (value: string | number) => void;
    className?: string;
}

const defaultMockTabs: TabItem[] = [
    { value: 'overview', title: 'Overview', content: () => 'This is the overview tab. It gives a quick summary of the current data.' },
    { value: 'activity', title: 'Activity', content: () => 'This is the activity tab. Recent actions and events would be listed here.' },
    { value: 'settings', title: 'Settings', content: () => 'This is the settings tab. Configuration options would be shown here.' },
    { value: 'ทดลอง', title: 'ทดลอง', content: () => 'This is the ทดลอง tab. Configuration options would be shown here.' },
];

export const Tabs = ({
    tabs = defaultMockTabs,
    activeValue,
    onChange,
    className,
}: TabsProps) => {
    const [active, setActive] = useState<string | number>(
        activeValue ?? tabs[0]?.value
    );

    useEffect(() => {
        if (activeValue !== undefined) {
            setActive(activeValue);
        }
    }, [activeValue]);

    const handleSelect = (tab: TabItem) => {
        setActive(tab.value);
        if (onChange) {
            onChange(tab.value);
        } else {
            console.log(`[Tabs Mock Action] Selected: ${tab.title} (${tab.value})`);
        }
    };

    const activeTab = tabs.find((tab) => tab.value === active);

    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center gap-1 border-b border-gray-200">
                {tabs.map((tab) => {
                    const isActive = active === tab.value;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => handleSelect(tab)}
                            className={cn(
                                "relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 select-none cursor-pointer",
                                isActive
                                    ? "text-emerald-600"
                                    : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {tab.title}
                            {isActive && (
                                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-emerald-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {activeTab?.content && (
                <div className="px-4 py-4 text-sm text-slate-600">
                    {activeTab.content()}
                </div>
            )}
        </div>
    );
};

export default Tabs;
