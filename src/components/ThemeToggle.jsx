import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

    setIsDark(initialDark);
    applyTheme(initialDark);
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = async (event) => {
    const newMode = !isDark;

    if (!document.startViewTransition) {
      setIsDark(newMode);
      applyTheme(newMode);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty("--reveal-x", `${x}px`);
    document.documentElement.style.setProperty("--reveal-y", `${y}px`);
    document.documentElement.style.setProperty(
      "--reveal-end-radius",
      `${endRadius}px`,
    );

    const transition = document.startViewTransition(() => {
      setIsDark(newMode);
      applyTheme(newMode);
    });

    try {
      await transition.finished;
    } finally {
      document.documentElement.style.removeProperty("--reveal-x");
      document.documentElement.style.removeProperty("--reveal-y");
      document.documentElement.style.removeProperty("--reveal-end-radius");
    }
  };

  return (
    <div className="fixed right-4 top-1/2 z-50 -translate-y-1/2">
      <button
        onClick={(e) => toggleTheme(e)}
        aria-label="Toggle Theme"
        className="group relative flex h-20 w-10 flex-col items-center rounded-full 
                   border border-border/40 bg-surface/30 p-1 
                   shadow-lg backdrop-blur-md transition-colors hover:border-primary/50">
        {/* Indikator Slider */}
        <div
          className={`absolute left-1/2 top-1 h-8 w-8 -translate-x-1/2 rounded-full bg-primary shadow-sm 
                      transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
                      ${isDark ? "translate-y-10" : "translate-y-0"}`}
        />

        {/* Sun Icon (Light Mode Area) */}
        <div className="z-10 flex flex-1 w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 transition-colors duration-300 ${
              !isDark
                ? "text-white"
                : "text-muted-foreground group-hover:text-foreground"
            }`}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41-1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </div>

        {/* Moon Icon (Dark Mode Area) */}
        <div className="z-10 flex flex-1 w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 transition-colors duration-300 ${
              isDark
                ? "text-white"
                : "text-muted-foreground group-hover:text-foreground"
            }`}>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </div>
      </button>
    </div>
  );
};
