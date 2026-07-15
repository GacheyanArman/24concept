"use client";

import { useEffect } from "react";

export function ScrollTitle({ dict }: { dict: Record<string, string> }) {
  useEffect(() => {
    const sections = [
      { id: "top", title: dict.top },
      { id: "shop", title: dict.shop },
      { id: "collections", title: dict.collections },
      { id: "lookbook", title: dict.lookbook },
      { id: "concept", title: dict.concept },
      { id: "store", title: dict.store },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section;
        }
      }
      
      if (document.title !== currentSection.title) {
        document.title = currentSection.title;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
