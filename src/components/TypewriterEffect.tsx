"use client";

import { useEffect, useState } from "react";
import OpenAi from "openai";

interface TypewriterEffect {
  text?: string | null 
  delay: number;


}

function TypewriterEffect({ text, delay }: TypewriterEffect) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text !== null && text !== undefined && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return currentText
}

export default TypewriterEffect;
