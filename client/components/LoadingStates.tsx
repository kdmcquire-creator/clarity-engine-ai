import React from "react";
import { Loader2, BarChart3, FileText, Zap } from "lucide-react";

/**
 * Generic Loading Spinner
 * Used for small loading indicators
 */
export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
};

/**
 * Full Page Loading State
 * Used when loading entire page content
 */
export const PageLoadingState: React.FC = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
    <Loader2 className="w-16 h-16 animate-spin text-primary" />
    <p className="text-foreground/60 text-lg">Loading...</p>
  </div>
);

/**
 * Content Skeleton Loader
 * Used for individual content blocks
 */
export const ContentSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton h-4 rounded-md"
        style={{
          width: i === lines - 1 ? "80%" : "100%",
        }}
      />
    ))}
  </div>
);

/**
 * Card Skeleton Loader
 * Used for card-based content
 */
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-card rounded-lg p-4 space-y-3">
        <div className="skeleton h-6 rounded-md w-3/4" />
        <div className="skeleton h-4 rounded-md" />
        <div className="skeleton h-4 rounded-md w-5/6" />
        <div className="skeleton h-10 rounded-md w-full" />
      </div>
    ))}
  </div>
);

/**
 * Table Skeleton Loader
 * Used for table-based content
 */
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 5,
  cols = 4,
}) => (
  <div className="w-full space-y-2">
    {/* Header */}
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={`header-${i}`} className="skeleton h-10 rounded-md" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div
        key={`row-${rowIdx}`}
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: cols }).map((_, colIdx) => (
          <div key={`cell-${rowIdx}-${colIdx}`} className="skeleton h-8 rounded-md" />
        ))}
      </div>
    ))}
  </div>
);

/**
 * Dashboard Widget Skeleton
 * Used for dashboard-style widgets
 */
export const WidgetSkeleton: React.FC = () => (
  <div className="bg-card rounded-lg p-6 space-y-4">
    <div className="skeleton h-6 w-1/3 rounded-md" />
    <div className="space-y-2">
      <div className="skeleton h-4 rounded-md" />
      <div className="skeleton h-4 rounded-md w-5/6" />
    </div>
    <div className="skeleton h-32 rounded-md" />
  </div>
);

/**
 * List Item Skeleton
 * Used for list-based content
 */
export const ListItemSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex gap-4 p-3 bg-card rounded-lg">
        <div className="skeleton h-12 w-12 rounded-md flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-1/3 rounded-md" />
          <div className="skeleton h-3 w-2/3 rounded-md" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Chart Skeleton Loader
 * Used for chart/graph content
 */
export const ChartSkeleton: React.FC = () => (
  <div className="w-full h-64 bg-card rounded-lg p-6 flex flex-col gap-4">
    <div className="skeleton h-6 w-1/4 rounded-md" />
    <div className="flex-1 flex items-end gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="skeleton flex-1 rounded-t-md"
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  </div>
);

/**
 * Form Skeleton Loader
 * Used for form content
 */
export const FormSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="skeleton h-4 w-1/4 rounded-md" />
        <div className="skeleton h-10 w-full rounded-md" />
      </div>
    ))}
    <div className="skeleton h-10 w-1/3 rounded-md" />
  </div>
);

/**
 * Loading Overlay
 * Used to show loading state over existing content
 */
export const LoadingOverlay: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-card rounded-lg p-8 flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-foreground text-lg">Processing...</p>
      </div>
    </div>
  );
};

/**
 * Inline Loading State
 * Used for inline loading indicators
 */
export const InlineLoading: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => (
  <div className="flex items-center gap-2 text-foreground/60">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>{message}</span>
  </div>
);

/**
 * Skeleton Pulse Animation Wrapper
 * Wraps any component with skeleton effect
 */
export const SkeletonWrapper: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}> = ({ isLoading, children, skeleton = <ContentSkeleton /> }) => {
  if (isLoading) {
    return <div className="skeleton-wrapper">{skeleton}</div>;
  }

  return <>{children}</>;
};

/**
 * Progressive Loading State
 * Shows progressive loading with multiple stages
 */
export const ProgressiveLoading: React.FC<{ progress: number }> = ({
  progress,
}) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between text-sm text-foreground/60">
      <span>Loading</span>
      <span>{Math.round(progress)}%</span>
    </div>
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

/**
 * Animated Loading Dots
 * Cute animated dots for loading
 */
export const AnimatedDots: React.FC<{ message?: string }> = ({
  message = "Loading",
}) => (
  <div className="flex items-center gap-1">
    <span>{message}</span>
    <span className="flex gap-1">
      <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
      <span className="w-1 h-1 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <span className="w-1 h-1 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </span>
  </div>
);

/**
 * Skeleton with Icon
 * Skeleton with icon placeholder
 */
export const SkeletonWithIcon: React.FC<{ icon: React.ReactNode; lines?: number }> = ({
  icon,
  lines = 2,
}) => (
  <div className="flex gap-4">
    <div className="skeleton w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1 space-y-2">
      <div className="skeleton h-4 w-1/3 rounded-md" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-3 rounded-md" />
      ))}
    </div>
  </div>
);
