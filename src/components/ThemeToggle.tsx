"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";

const themes = {
  dark: "sunset",
  light: "fantasy",
};

function ThemeToggle() {
  const [theme, setTheme] = useState(themes.dark);

  const handleToggleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  console.log(theme)

  return (
    <div>
      <button
        onClick={handleToggleTheme}
        className="btn btn-outline btn-sm ml-5 mt-2 rounded-lg bg-base-100 "
      >
        {theme === themes.dark ? (
          <BsSunFill className="h-5 w-5" />
        ) : (
          <BsMoonFill className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
