"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Cookies from "js-cookie";

interface LanguageChangerProps {
  className?: string;
  currentLocale?: string;
}

export function LanguageChanger({
  className,
  currentLocale = "id",
}: LanguageChangerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: "id", flag: "🇮🇩", name: "ID" },
    { code: "en", flag: "🇺🇸", name: "EN" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
    Cookies.set("locale", languageCode);
    window.location.reload();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % languages.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex(
          (prev) => (prev - 1 + languages.length) % languages.length
        );
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleLanguageSelect(languages[focusedIndex].code);
        }
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setFocusedIndex(0);
          } else {
            setFocusedIndex(-1);
          }
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="flex items-center gap-2 min-w-[80px] justify-between"
      >
        <span className="flex items-center gap-1">
          <span>{currentLang.flag}</span>
          <span className="text-sm">{currentLang.name}</span>
        </span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 min-w-[80px]"
          role="listbox"
          aria-label="Language options"
        >
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              onKeyDown={handleKeyDown}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors flex items-center gap-2 ${
                currentLocale === language.code ? "bg-primary-700" : ""
              } ${focusedIndex === index ? "bg-accent" : ""}`}
              role="option"
              aria-selected={currentLocale === language.code}
              tabIndex={-1}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
