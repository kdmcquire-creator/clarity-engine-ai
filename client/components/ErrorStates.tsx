import React from "react";
import { AlertCircle, RefreshCw, Home, Search, Lock, Server } from "lucide-react";
import { Button } from "./ui/button";

/**
 * Generic Error State
 * Used for general errors
 */
export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <AlertCircle className="w-16 h-16 text-destructive mb-4" />
    <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-foreground/60 text-center mb-6 max-w-md">{message}</p>
    <div className="flex gap-3">
      {onRetry && (
        <Button onClick={onRetry} variant="default" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
      <Button variant="outline" onClick={() => window.location.href = "/"}>
        Go Home
      </Button>
    </div>
  </div>
);

/**
 * 404 Not Found Error
 */
export const NotFoundError: React.FC<{ message?: string }> = ({
  message = "The page you're looking for doesn't exist.",
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <Search className="w-20 h-20 text-muted-foreground mb-4" />
    <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
    <p className="text-xl text-foreground/60 mb-8">{message}</p>
    <Button onClick={() => window.location.href = "/"} className="gap-2">
      <Home className="w-4 h-4" />
      Back to Home
    </Button>
  </div>
);

/**
 * 403 Forbidden Error
 */
export const ForbiddenError: React.FC<{ message?: string }> = ({
  message = "You don't have permission to access this resource.",
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <Lock className="w-20 h-20 text-destructive mb-4" />
    <h1 className="text-4xl font-bold text-foreground mb-2">403</h1>
    <p className="text-xl text-foreground/60 mb-8">{message}</p>
    <Button onClick={() => window.location.href = "/"} className="gap-2">
      <Home className="w-4 h-4" />
      Back to Home
    </Button>
  </div>
);

/**
 * 500 Server Error
 */
export const ServerError: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({
  message = "The server encountered an error. Please try again later.",
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <Server className="w-20 h-20 text-destructive mb-4" />
    <h1 className="text-4xl font-bold text-foreground mb-2">500</h1>
    <p className="text-xl text-foreground/60 mb-8">{message}</p>
    <div className="flex gap-3">
      {onRetry && (
        <Button onClick={onRetry} variant="default" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
      <Button variant="outline" onClick={() => window.location.href = "/"}>
        Go Home
      </Button>
    </div>
  </div>
);

/**
 * Empty State
 * Used when no data is available
 */
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}> = ({
  icon = <Search className="w-12 h-12 text-muted-foreground" />,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    {icon}
    <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{title}</h3>
    {description && (
      <p className="text-foreground/60 text-center max-w-md mb-6">{description}</p>
    )}
    {action && (
      <Button onClick={action.onClick} variant="default">
        {action.label}
      </Button>
    )}
  </div>
);

/**
 * Network Error State
 */
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorState
    title="Connection Error"
    message="Unable to connect to the server. Please check your internet connection and try again."
    onRetry={onRetry}
  />
);

/**
 * Timeout Error State
 */
export const TimeoutError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorState
    title="Request Timeout"
    message="The request took too long to complete. Please try again."
    onRetry={onRetry}
  />
);

/**
 * Validation Error State
 */
export const ValidationError: React.FC<{
  errors: Record<string, string>;
}> = ({ errors }) => (
  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
    <div className="flex gap-2 mb-3">
      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      <h4 className="font-semibold text-destructive">Validation Errors</h4>
    </div>
    <ul className="space-y-1 text-sm text-destructive/80">
      {Object.entries(errors).map(([field, error]) => (
        <li key={field}>
          <strong>{field}:</strong> {error}
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Alert Box
 * Generic alert component
 */
export const AlertBox: React.FC<{
  type: "error" | "warning" | "success" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
}> = ({ type, title, message, onClose }) => {
  const typeStyles = {
    error: "bg-destructive/10 border-destructive/20 text-destructive",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",
    success: "bg-green-500/10 border-green-500/20 text-green-600",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  };

  const icons = {
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    success: <AlertCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div className={`${typeStyles[type]} border rounded-lg p-4 flex gap-3`}>
      {icons[type]}
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-foreground/40 hover:text-foreground flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
};

/**
 * Error Boundary Fallback
 * Used when error boundary catches an error
 */
export const ErrorBoundaryFallback: React.FC<{
  error?: Error;
  resetError?: () => void;
}> = ({ error, resetError }) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <ErrorState
        title="Application Error"
        message={
          error?.message ||
          "An unexpected error occurred. Please refresh the page or contact support."
        }
        onRetry={resetError}
      />
      {error && (
        <details className="mt-8 text-xs text-foreground/40">
          <summary className="cursor-pointer mb-2">Error Details</summary>
          <pre className="bg-muted p-3 rounded overflow-auto max-h-40">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  </div>
);

/**
 * Retry Button
 * Standalone retry button
 */
export const RetryButton: React.FC<{
  onClick: () => void;
  isLoading?: boolean;
  label?: string;
}> = ({ onClick, isLoading = false, label = "Retry" }) => (
  <Button
    onClick={onClick}
    disabled={isLoading}
    variant="outline"
    className="gap-2"
  >
    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
    {label}
  </Button>
);

/**
 * Inline Error Message
 * Used for form field errors
 */
export const InlineError: React.FC<{ message: string }> = ({ message }) => (
  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
    <AlertCircle className="w-4 h-4" />
    {message}
  </p>
);

/**
 * Toast Error
 * Used for toast notifications
 */
export const ToastError: React.FC<{
  message: string;
  onClose?: () => void;
  autoClose?: number;
}> = ({ message, onClose, autoClose = 5000 }) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="toast-enter bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
      <p className="text-sm text-destructive flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-destructive/60 hover:text-destructive flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
};
