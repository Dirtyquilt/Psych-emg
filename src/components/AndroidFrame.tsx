import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Download, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  enabled: boolean;
  onToggleFrame: () => void;
  onOpenApkModal: () => void;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  enabled,
  onToggleFrame,
  onOpenApkModal,
  children
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-200/80 dark:bg-slate-950 py-4 sm:py-6 px-2 flex flex-col items-center justify-center">
      {/* Top Frame Controls Bar */}
      <div className="w-full max-w-[430px] mb-3 flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
          <Smartphone className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          <span>Android Clinical App Preview (412px Viewport)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenApkModal}
            className="px-2.5 py-1 rounded-lg bg-teal-700 text-white hover:bg-teal-800 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>Get APK</span>
          </button>
          <button
            type="button"
            onClick={onToggleFrame}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Monitor className="w-3 h-3" />
            <span>Full Desktop</span>
          </button>
        </div>
      </div>

      {/* Android Hardware Bezel */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[90vh] rounded-[44px] bg-white dark:bg-slate-900 border-[8px] border-slate-800 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Android Status Bar */}
        <div className="h-9 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0 select-none z-30 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono tabular-nums font-medium text-slate-700 dark:text-slate-300">
            {currentTime}
          </span>

          {/* Front Camera Cutout */}
          <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-black" />

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          </div>
        </div>

        {/* Scrollable Android Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] relative scroll-smooth">
          {children}
        </div>

        {/* Android Gesture Navigation Pill */}
        <div className="h-5 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 z-30 border-t border-slate-100 dark:border-slate-800">
          <div className="w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
