"use client";

import React, { forwardRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children = 'Continue',
            className,
            isLoading = false,
            disabled,
            onClick,
            type = 'button',
            ...props
        },
        ref
    ) => {

        const defaultStyle = "bg-emerald-500 hover:bg-emerald-700 text-white rounded-[18px] p-2 w-[328px] transition-all duration-200 flex items-center justify-center gap-2 select-none cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none";

        const handleMockClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(e);
            } else {
                console.log('[Button Mock Action] Button clicked.');
            }
        };

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                className={cn(defaultStyle, className)}
                onClick={handleMockClick}
                {...props}
            >
                {children}
                {isLoading && <LoaderCircle className="w-4 h-4 animate-spin" />}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;
