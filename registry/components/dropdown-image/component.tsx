"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownIMGOption {
    value: string | number;
    title: string;
    description?: string;
    imageUrl?: string;
}

export interface DropdownIMGProps {
    options?: DropdownIMGOption[];
    selectedValue?: string | number;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    className?: string;
}

const defaultMockOptions: DropdownIMGOption[] = [
    {
        value: 'hotel_1',
        title: 'Sri Panwa Phuket',
        description: 'Hotel & Resort',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&auto=format&fit=crop&q=60',
    },
    {
        value: 'hotel_2',
        title: 'ซี บรีซ รีสอร์ท',
        description: 'สาขาภูเก็ต (ริมหาดป่าตอง)',
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=80&auto=format&fit=crop&q=60',
    },
    {
        value: 'hotel_3',
        title: 'เมาน์เทน แวลเลย์ ลอดจ์',
        description: 'สาขาเชียงใหม่ (เชิงดอยสุเทพ)',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&auto=format&fit=crop&q=60',
    },
];

export const DropdownIMG = ({
    options = defaultMockOptions,
    selectedValue,
    onChange,
    placeholder = 'เลือกประเภทอาคาร',
    className,
}: DropdownIMGProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState<DropdownIMGOption | null>(() => {
        if (selectedValue !== undefined) {
            return options.find(opt => opt.value === selectedValue) || null;
        }
        return options[0] || null;
    });

    const selected = selectedValue !== undefined
        ? options.find(opt => opt.value === selectedValue) || null
        : internalSelected;

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: DropdownIMGOption) => {
        setInternalSelected(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        } else {
            console.log(`[DropdownIMG Mock Action] Selected: ${option.title} (${option.value})`);
        }
    };

    return (
        <div ref={dropdownRef} className={cn("relative w-full font-sans", className)}>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-1 w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 select-none cursor-pointer text-left",
                    isOpen && "border-emerald-500 ring-2 ring-emerald-500/20"
                )}
            >
                {selected ? (
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {selected.imageUrl && (
                            <img
                                src={selected.imageUrl}
                                alt={selected.title}
                                className="w-10 h-10 rounded-lg object-cover ring-2 ring-slate-100 shrink-0"
                            />
                        )}
                        <div className="flex flex-col flex-1 min-w-0 leading-tight">
                            <span className="text-sm font-semibold text-slate-800 truncate">{selected.title}</span>
                            {selected.description && (
                                <span className="text-xs text-slate-400 truncate mt-0.5">{selected.description}</span>
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="text-sm text-slate-400 flex-1">{placeholder}</span>
                )}

                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 left-0 mt-2 bg-white shadow-sm border border-gray-300 rounded-lg z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <ul className="max-h-72 overflow-y-auto scrollbar-none flex flex-col gap-0.5">
                        {options.map((option) => {
                            const isSelected = selected?.value === option.value;
                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left transition-colors duration-150 select-none cursor-pointer relative",
                                            isSelected
                                                ? "bg-emerald-50/80 text-emerald-600 font-semibold"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        {option.imageUrl && (
                                            <img
                                                src={option.imageUrl}
                                                alt={option.title}
                                                className="w-10 h-10 rounded-lg object-cover ring-2 ring-slate-100/50 shrink-0"
                                            />
                                        )}
                                        <div className="flex flex-col flex-1 min-w-0 leading-tight">
                                            <span className={cn(
                                                "text-sm truncate",
                                                isSelected ? "text-emerald-700 font-semibold" : "text-slate-800 font-medium"
                                            )}>
                                                {option.title}
                                            </span>
                                            {option.description && (
                                                <span className="text-xs text-slate-400 truncate mt-0.5">{option.description}</span>
                                            )}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownIMG;
