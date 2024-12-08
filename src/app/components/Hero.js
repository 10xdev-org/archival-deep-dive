"use client";

import { useEffect, useState } from "react";
import Overlay from "./Overlay";

const Hero = ({ videoSrc, isFocused, overlayOpts = {} }) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.min(scrollY / window.innerHeight, 1);
    setOverlayOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero-section fixed inset-0 h-screen overflow-hidden">
      <video
        className="w-full h-full object-cover opacity-30"
        src={videoSrc}
        autoPlay
        loop
        muted={!isFocused}
        playsInline
      />
      <Overlay
        animateIn={!isFocused}
        animateOut={isFocused}
        animationDuration={1}
        mainOpacity={0}
        {...overlayOpts}
      />
      {/** */}
    </section>
  );
};

export default Hero;
