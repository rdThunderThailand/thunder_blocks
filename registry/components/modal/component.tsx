"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOk?: () => void;
    onCancel?: () => void;
    title?: string;
    children?: React.ReactNode;
    okText?: string;
    cancelText?: string;
    className?: string;
    closeOnOverlayClick?: boolean;
}

export const Modal = ({
    isOpen,
    onClose,
    onOk,
    onCancel,
    title = 'Confirm',
    children = 'Are you sure you want to proceed with this action?',
    okText = 'OK',
    cancelText = 'Cancel',
    className,
    closeOnOverlayClick = true,
}: ModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOk = () => {
        if (onOk) {
            onOk();
        } else {
            console.log('[Modal Mock Action] OK clicked.');
        }
        onClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            console.log('[Modal Mock Action] Cancel clicked.');
        }
        onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-150"
            onClick={() => closeOnOverlayClick && onClose()}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200",
                    className
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 transition-colors duration-150 select-none cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {title && (
                    <h2 className="text-lg font-semibold text-slate-900 pr-8 mb-2">{title}</h2>
                )}

                <div className="text-sm text-slate-600 mb-6">{children}</div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-slate-700 hover:bg-slate-50 transition-colors duration-150 select-none cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={handleOk}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 hover:bg-emerald-700 text-white transition-colors duration-150 select-none cursor-pointer"
                    >
                        {okText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 hover:bg-emerald-700 text-white transition-colors duration-150 select-none cursor-pointer"
            >
                เปิด Modal
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="ยืนยันการดำเนินการ"
                okText="ยืนยัน"
                cancelText="ยกเลิก"
            >
                คุณต้องการดำเนินการต่อหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </Modal>
        </>
    );
}
