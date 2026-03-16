import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: Toast = { ...toast, id, duration: toast.duration ?? 5000 };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const typeStyles = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-600",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-600",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-600",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-600",
      icon: <Info className="w-5 h-5" />,
    },
  };

  const style = typeStyles[toast.type];

  return (
    <div
      className={`toast-enter ${style.bg} border ${style.border} rounded-lg p-4 flex gap-3 pointer-events-auto max-w-sm`}
    >
      <div className={`${style.text} flex-shrink-0 mt-0.5`}>{style.icon}</div>
      <div className="flex-1">
        {toast.title && (
          <h4 className={`font-semibold ${style.text} mb-1`}>{toast.title}</h4>
        )}
        <p className={`text-sm ${style.text}`}>{toast.message}</p>
      </div>
      <button
        onClick={onRemove}
        className={`${style.text}/60 hover:${style.text} flex-shrink-0`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Convenience hooks
export const useSuccessToast = () => {
  const { addToast } = useToast();
  return (message: string, title?: string) =>
    addToast({ type: "success", message, title });
};

export const useErrorToast = () => {
  const { addToast } = useToast();
  return (message: string, title?: string) =>
    addToast({ type: "error", message, title });
};

export const useWarningToast = () => {
  const { addToast } = useToast();
  return (message: string, title?: string) =>
    addToast({ type: "warning", message, title });
};

export const useInfoToast = () => {
  const { addToast } = useToast();
  return (message: string, title?: string) =>
    addToast({ type: "info", message, title });
};
