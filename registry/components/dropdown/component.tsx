"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
    value: string | number;
    label: string;
}

export interface DropdownProps {
    options?: DropdownOption[];
    selectedValue?: string | number;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    className?: string;
}

const defaultMockOptions: DropdownOption[] = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'today', label: 'วันนี้' },
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'year', label: 'ปีนี้' },
];

export const Dropdown = ({
    options = defaultMockOptions,
    selectedValue,
    onChange,
    placeholder = 'เลือกช่วงเวลา',
    className,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState<DropdownOption | null>(() => {
        if (selectedValue) {
            return options.find(opt => opt.value === selectedValue) || null;
        }
        return null;
    });

    const selected = selectedValue !== undefined
        ? options.find(opt => opt.value === selectedValue) || null
        : internalSelected;

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: DropdownOption) => {
        setInternalSelected(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        } else {
            console.log(`[Dropdown Mock Action] Selected: ${option.label} (${option.value})`);
        }
    };

    return (
        <div ref={dropdownRef} className={cn("relative w-[200px] font-sans", className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-xs text-slate-700 hover:bg-slate-50 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 select-none cursor-pointer",
                    isOpen && "border-emerald-500 ring-2 ring-emerald-500/20"
                )}
            >
                <span className="truncate">{selected ? selected.label : placeholder}</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 left-0 mt-1.5 bg-white border border-gray-300 rounded-lg shadow-sm z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <ul className="max-h-60 overflow-y-auto scrollbar-none">
                        {options.map((option) => {
                            const isSelected = selected?.value === option.value;
                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors duration-150 select-none cursor-pointer",
                                            isSelected
                                                ? "bg-emerald-50/80 text-emerald-600 font-semibold"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <span className="truncate">{option.label}</span>
                                        {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
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

export default Dropdown;
