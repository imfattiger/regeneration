"use client";

import { useState } from "react";

type Props = {
  zhTW?: string;
  en?: string;
  defaultLang: "zhTW" | "en";
};

export default function DescriptionTabs({ zhTW, en, defaultLang }: Props) {
  const [active, setActive] = useState<"zhTW" | "en">(
    defaultLang === "en" && en ? "en" : zhTW ? "zhTW" : "en"
  );

  const hasBoth = !!zhTW && !!en;
  const text = active === "zhTW" ? zhTW : en;

  if (!text) return null;

  return (
    <div className="mb-8">
      {hasBoth && (
        <div className="flex gap-4 mb-3">
          <button
            onClick={() => setActive("zhTW")}
            className={`text-xs tracking-widest uppercase transition-opacity ${
              active === "zhTW" ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
          >
            中文
          </button>
          <button
            onClick={() => setActive("en")}
            className={`text-xs tracking-widest uppercase transition-opacity ${
              active === "en" ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
          >
            EN
          </button>
        </div>
      )}
      <p className="text-sm leading-relaxed text-foreground/70 whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}
