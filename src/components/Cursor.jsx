import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      const isClickable =
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList?.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isVisible, cursorX, cursorY]);

  if (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  ) {
    return null;
  }

  return (
    <>
      {/* Dot Utama */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform
          w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Outline Ring (Besar & Delay) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform
          border border-primary/50 rounded-full 
          bg-primary/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: "2rem",
          height: "2rem",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 10,
            mass: 0.8,
          },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  );
}
