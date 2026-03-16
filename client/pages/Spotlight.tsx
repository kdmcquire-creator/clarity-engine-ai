import { useEffect, useState } from "react";

interface SpotlightProps {
  targetSelector: string;
  isActive: boolean;
  padding?: number;
}

/**
 * Spotlight Component
 * 
 * Creates a visual spotlight/highlight effect that draws attention to a specific element.
 * Used during onboarding to guide users to relevant page sections.
 * 
 * Features:
 * - Smooth animations and transitions
 * - Glowing border around target element
 * - Dark overlay outside the spotlight
 * - Responsive positioning
 */
export function Spotlight({ targetSelector, isActive, padding = 12 }: SpotlightProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [elementFound, setElementFound] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setElementFound(false);
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
        setElementFound(true);
      } else {
        setElementFound(false);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [targetSelector, isActive, padding]);

  // Only render if active AND target element was found (or target is 'body')
  if (!isActive || (!elementFound && targetSelector !== "body")) return null;

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40 pointer-events-none" />

      {/* Spotlight highlight box */}
      <div
        className="fixed z-40 pointer-events-none transition-all duration-300 ease-out"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
          boxShadow: `
            0 0 0 2px rgba(59, 130, 246, 0.8),
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(59, 130, 246, 0.4),
            inset 0 0 20px rgba(59, 130, 246, 0.1)
          `,
          borderRadius: "8px",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      >
        {/* Animated pulse effect */}
        <style>{`
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow:
                0 0 0 2px rgba(59, 130, 246, 0.8),
                0 0 20px rgba(59, 130, 246, 0.6),
                0 0 40px rgba(59, 130, 246, 0.4),
                inset 0 0 20px rgba(59, 130, 246, 0.1);
            }
            50% {
              box-shadow:
                0 0 0 2px rgba(59, 130, 246, 1),
                0 0 30px rgba(59, 130, 246, 0.8),
                0 0 60px rgba(59, 130, 246, 0.6),
                inset 0 0 30px rgba(59, 130, 246, 0.2);
            }
          }
        `}</style>
      </div>
    </>
  );
}
