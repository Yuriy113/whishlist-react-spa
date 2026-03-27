import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import cn from "clsx";
import { createPortal } from "react-dom";

import styles from "./toast.module.css";

export type ToastVariant = "default" | "success" | "error";

export type ShowToastOptions = {
    variant?: ToastVariant;
    /** мс; 0 = не закрывать автоматически */
    duration?: number;
};

type ToastRecord = {
    id: string;
    message: string;
    variant: ToastVariant;
    duration: number;
};

type ToastContextValue = {
    showToast: (message: string, options?: ShowToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function newToastId(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const ToastItemView = ({
    toast,
    onDismiss,
}: {
    toast: ToastRecord;
    onDismiss: (id: string) => void;
}) => {
    useEffect(() => {
        if (toast.duration <= 0) {
            return;
        }
        const timer = window.setTimeout(() => {
            onDismiss(toast.id);
        }, toast.duration);
        return () => window.clearTimeout(timer);
    }, [toast.duration, toast.id, onDismiss]);

    return (
        <div className={cn(styles.toast, styles[toast.variant])} role="status">
            {toast.message}
        </div>
    );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastRecord[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, options?: ShowToastOptions) => {
            const id = newToastId();
            const variant = options?.variant ?? "default";
            const duration = options?.duration ?? 4000;

            setToasts((prev) => [...prev, { id, message, variant, duration }]);
        },
        [],
    );

    const value = useMemo(
        () => ({
            showToast,
        }),
        [showToast],
    );

    const portal =
        typeof document !== "undefined"
            ? createPortal(
                  <div
                      className={styles.root}
                      role="region"
                      aria-label="Уведомления"
                      aria-live="polite"
                  >
                      {toasts.map((toast) => (
                          <ToastItemView
                              key={toast.id}
                              toast={toast}
                              onDismiss={dismiss}
                          />
                      ))}
                  </div>,
                  document.body,
              )
            : null;

    return (
        <ToastContext.Provider value={value}>
            {children}
            {portal}
        </ToastContext.Provider>
    );
};
export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return ctx;
}
