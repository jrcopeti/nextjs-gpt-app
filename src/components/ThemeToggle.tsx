"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

const themes = {
  dark: "sunset",
  light: "autumn",
};

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "theme",
  );

  const handleToggleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div>
      <button
        onClick={handleToggleTheme}
        className="btn btn-secondary btn-outline btn-sm ml-5 mt-2"
      >
        {theme === "dark" ? (
          <BsMoonFill className="h-4 w-4" />
        ) : (
          <BsSunFill className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
