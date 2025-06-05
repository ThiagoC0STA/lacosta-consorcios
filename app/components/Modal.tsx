"use client";

import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
      <div
        className={`bg-white/95 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in border border-[color:var(--primary-5)] ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[color:var(--primary-1)] text-3xl font-bold transition-all"
          aria-label="Fechar"
        >
          ×
        </button>
        {title && (
          <h4
            className="text-xl font-bold mb-4 text-center"
            style={{ color: "var(--primary-2)" }}
          >
            {title}
          </h4>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
