"use client";

import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";

const themes = {
  night: "night",
  fantasy: "fantasy",
};

function ThemeToggle() {
  const [theme, setTheme] = useState(themes.night);

  const handleToggleTheme = () => {
    const newTheme = theme === themes.night ? themes.fantasy : themes.night;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={handleToggleTheme} className="btn btn-sm btn-outline ">
      {theme === "night" ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
}

export default ThemeToggle;
