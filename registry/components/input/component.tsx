import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            placeholder = 'Enter text',
            type = 'text',
            disabled,
            ...props
        },
        ref
    ) => {

        const defaultStyle = "bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm text-gray-900 rounded-lg p-2 w-[328px] mb-4 transition-all duration-200 select-none disabled:bg-gray-100 disabled:pointer-events-none";

        return (
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(defaultStyle, className)}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
export default Input;
