import React, { useRef } from "react";
import useInView from "../hooks/useInView";

/**
 * Sanfter Fade/Slide-In, triggert wenn Element ins Sichtfeld kommt.
 * Props: delay (ms), y (px), as (Tag), className
 */
export default function Reveal({ children, delay = 0, y = 16, as = "div", className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref, { threshold: 0.15, once: true });
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal--show" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` }}
    >
      {children}
    </Tag>
  );
}
