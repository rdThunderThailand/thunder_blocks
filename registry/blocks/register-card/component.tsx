"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/registry/components/input/component';
import { Button } from '@/registry/components/button/component';
import { GoogleIcon, MicrosoftIcon, EyeIcon, EyeOffIcon } from '../../../icons/SocialIcons';

export interface RegisterCardValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterCardProps {
    title?: string;
    subtitle?: string;
    className?: string;
    onSubmit?: (values: RegisterCardValues) => void | Promise<void>;
    onGoogleSignUp?: () => void;
    onMicrosoftSignUp?: () => void;
    onSwitchToLogin?: () => void;
}

export const RegisterCard = ({
    title = 'Create an account',
    subtitle = 'Sign up to get started',
    className,
    onSubmit,
    onGoogleSignUp,
    onMicrosoftSignUp,
    onSwitchToLogin,
}: RegisterCardProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError(null);

        setLoading(true);
        try {
            if (onSubmit) {
                await onSubmit({ name, email, password, confirmPassword });
            } else {
                console.log('[RegisterCard Mock Action] Submitted.', { name, email, password, confirmPassword });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        if (onGoogleSignUp) {
            onGoogleSignUp();
        } else {
            console.log('[RegisterCard Mock Action] Sign up with Google clicked.');
        }
    };

    const handleMicrosoftSignUp = () => {
        if (onMicrosoftSignUp) {
            onMicrosoftSignUp();
        } else {
            console.log('[RegisterCard Mock Action] Sign up with Microsoft clicked.');
        }
    };

    const handleSwitchToLogin = () => {
        if (onSwitchToLogin) {
            onSwitchToLogin();
        } else {
            console.log('[RegisterCard Mock Action] Switch to login clicked.');
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
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                />
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
                        autoComplete="new-password"
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
                <div className="relative w-[328px]">
                    <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        className={cn('w-full pr-10', error ? 'mb-2' : undefined)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 -mt-2 text-slate-400 hover:text-slate-600 transition-colors duration-150 cursor-pointer"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                        {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                </div>

                {error && (
                    <p className="w-[328px] -mt-2 mb-4 text-xs font-medium text-rose-600">{error}</p>
                )}

                <Button type="submit" isLoading={loading} className='rounded-lg'>
                    Create account
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
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 select-none cursor-pointer"
                >
                    <GoogleIcon className="w-4 h-4" />
                    Sign up with Google
                </button>
                <button
                    type="button"
                    onClick={handleMicrosoftSignUp}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 select-none cursor-pointer"
                >
                    <MicrosoftIcon className="w-4 h-4" />
                    Sign up with Microsoft
                </button>
            </div>

            <p className="text-sm text-slate-500 mt-6">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-150 select-none cursor-pointer"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default RegisterCard;
