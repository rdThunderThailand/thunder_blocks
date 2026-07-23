"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface InputSearchProps {
    suggestions?: string[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    maxSuggestions?: number;
    className?: string;
}

const defaultMockSuggestions: string[] = [
    'ขยะอินทรีย์',
    'ขยะรีไซเคิล',
    'ขยะทั่วไป',
    'ขยะอันตราย',
    'ขยะอิเล็กทรอนิกส์',
    'เศษอาหาร',
    'เศษผักผลไม้',
    'ใบไม้แห้ง',
    'ขวดพลาสติก',
    'ถุงพลาสติก',
    'กล่องนม',
    'กระดาษลัง',
    'เศษแก้ว',
    'กระป๋องอลูมิเนียม',
    'กระป๋องสีและสารเคมี',
    'ถ่านไฟฉาย',
    'แบตเตอรี่มือถือ',
    'หลอดไฟ',
    'น้ำมันเครื่องใช้แล้ว',
    'ยางรถยนต์เก่า',
    'เข็มฉีดยา',
    'หน้ากากอนามัยใช้แล้ว',
    'ผ้าอ้อมสำเร็จรูป',
    'โฟมและพลาสติกกันกระแทก',
    'ซากเครื่องใช้ไฟฟ้า',
];

const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    return (
        <>
            {text.slice(0, index)}
            <span className="text-emerald-600 font-semibold">
                {text.slice(index, index + query.length)}
            </span>
            {text.slice(index + query.length)}
        </>
    );
};

export const InputSearch = ({
    suggestions = defaultMockSuggestions,
    placeholder = 'ค้นหาประเภทขยะ...',
    value,
    onChange,
    onSelect,
    maxSuggestions = 8,
    className,
}: InputSearchProps) => {
    const [query, setQuery] = useState(value ?? '');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            setQuery(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return [];
        return suggestions
            .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
            .slice(0, maxSuggestions);
    }, [query, suggestions, maxSuggestions]);

    const updateQuery = (next: string) => {
        setQuery(next);
        setActiveIndex(-1);
        setIsOpen(true);
        if (onChange) {
            onChange(next);
        } else {
            console.log(`[InputSearch Mock Action] Query changed: ${next}`);
        }
    };

    const handleSelect = (item: string) => {
        setQuery(item);
        setIsOpen(false);
        setActiveIndex(-1);
        if (onSelect) {
            onSelect(item);
        } else {
            console.log(`[InputSearch Mock Action] Selected: ${item}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || filteredSuggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev <= 0 ? filteredSuggestions.length - 1 : prev - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0) {
                handleSelect(filteredSuggestions[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        updateQuery('');
        containerRef.current?.querySelector('input')?.focus();
    };

    return (
        <div ref={containerRef} className={cn('relative w-[328px] font-sans', className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => updateQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-8 bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-gray-900 rounded-xs py-2 pl-9 pr-9 transition-all duration-200"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isOpen && query.trim() && (
                <div className="absolute right-0 left-0 mt-1.5 bg-white border border-gray-300 rounded-lg shadow-sm z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    {filteredSuggestions.length > 0 ? (
                        <ul className="max-h-60 overflow-y-auto scrollbar-none">
                            {filteredSuggestions.map((item, index) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className={cn(
                                            'flex items-center w-full px-4 py-2.5 text-sm text-left transition-colors duration-150 select-none cursor-pointer',
                                            activeIndex === index
                                                ? 'bg-emerald-50/80 text-emerald-600'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        )}
                                    >
                                        <span className="truncate">{highlightMatch(item, query)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-4 py-2.5 text-sm text-slate-400 select-none">ไม่พบผลลัพธ์ที่ตรงกัน</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputSearch;
