"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/registry/components/input/component';
import { Button } from '@/registry/components/button/component';
import { GoogleIcon, MicrosoftIcon, EyeIcon, EyeOffIcon } from '../../../icons/SocialIcons';
import logo from "./logo.png";

export interface LoginCardValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginCardProps {
    brandLogo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    onSubmit?: (values: LoginCardValues) => void | Promise<void>;
    onGoogleSignIn?: () => void;
    onMicrosoftSignIn?: () => void;
    onForgotPassword?: () => void;
    onSwitchToRegister?: () => void;
}

export const LoginCard = ({
    brandLogo = <img src={logo.src} alt="brand-logo" className="w-full h-full object-contain" />,
    title = 'Welcome back',
    subtitle = 'Sign in to your account to continue',
    className,
    onSubmit,
    onGoogleSignIn,
    onMicrosoftSignIn,
    onForgotPassword,
    onSwitchToRegister,
}: LoginCardProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (onSubmit) {
                await onSubmit({ email, password, rememberMe });
            } else {
                console.log('[LoginCard Mock Action] Submitted.', { email, password, rememberMe });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        if (onGoogleSignIn) {
            onGoogleSignIn();
        } else {
            console.log('[LoginCard Mock Action] Sign in with Google clicked.');
        }
    };

    const handleMicrosoftSignIn = () => {
        if (onMicrosoftSignIn) {
            onMicrosoftSignIn();
        } else {
            console.log('[LoginCard Mock Action] Sign in with Microsoft clicked.');
        }
    };

    const handleForgotPassword = () => {
        if (onForgotPassword) {
            onForgotPassword();
        } else {
            console.log('[LoginCard Mock Action] Forgot password clicked.');
        }
    };

    const handleSwitchToRegister = () => {
        if (onSwitchToRegister) {
            onSwitchToRegister();
        } else {
            console.log('[LoginCard Mock Action] Switch to register clicked.');
        }
    };

    return (
        <div
            className={cn(
                'flex flex-col items-center p-8 border border-slate-100 rounded-2xl shadow-sm w-full max-w-[400px] font-sans bg-white',
                className
            )}
        >
            <div className="flex flex-col items-center mb-6 text-center">
                <div className={`shrink-0 flex items-center justify-center h-14 mb-6`}>
                    {brandLogo}
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />
                <div className="relative w-[328px]">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="w-full pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 -mt-2 text-slate-400 hover:text-slate-600 transition-colors duration-150 cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex items-center justify-between w-[328px] -mt-2 mb-4">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-500 select-none cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        Remember me
                    </label>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-150 select-none cursor-pointer"
                    >
                        Forgot password?
                    </button>
                </div>

                <Button type="submit" isLoading={loading} className='rounded-lg'>
                    Sign in
                </Button>
            </form>

            <div className="flex items-center w-[328px] mb-4 gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 select-none">or continue with</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="flex flex-col w-[328px] gap-3">
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 select-none cursor-pointer"
                >
                    <GoogleIcon className="w-4 h-4" />
                    Sign in with Google
                </button>
                <button
                    type="button"
                    onClick={handleMicrosoftSignIn}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 select-none cursor-pointer"
                >
                    <MicrosoftIcon className="w-4 h-4" />
                    Sign in with Microsoft
                </button>
            </div>

            <p className="text-sm text-slate-500 mt-6">
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={handleSwitchToRegister}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-150 select-none cursor-pointer"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
};

export default LoginCard;

