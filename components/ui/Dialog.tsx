import { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function SimpleModal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
