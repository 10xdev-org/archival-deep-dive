"use client";

import { useEffect, useState } from "react";
import { useScreensaverContext } from "../ScreensaverContext";

const Screensaver = ({ idleTimeout = 100000 }) => {
  const { screensaverDisabled } = useScreensaverContext();
  const [isIdle, setIsIdle] = useState(false);

  // Idle detection logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [idleTimeout]);

  if (screensaverDisabled) return null;

  return (
    <>
      {isIdle && (
        <div className="fixed inset-0 z-50">
          {/* Video background with opacity */}
          <video
            className="w-full h-full object-cover opacity-100"
            src="./screensaver.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay */}
          {/* Main Title */}
          <h1 className="absolute text-center left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-gray-900">
            Archival <span className="text-yellow-500">Deep-dive</span>
          </h1>
        </div>
      )}
    </>
  );
};

export default Screensaver;
