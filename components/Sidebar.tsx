"use client";

import { useState } from "react";

type NavKey = "home" | "explore" | "profile";

type NavItem = {
  key: NavKey;
  label: string;
  icon: React.ReactNode;
};

const items: NavItem[] = [
  {
    key: "home",
    label: "Trang chủ",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
      </svg>
    ),
  },
  {
    key: "explore",
    label: "Khám phá",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5-5 2 2-5 5-2z" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Hồ sơ",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-9 2-9 6v2h18v-2c0-4-5-6-9-6z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [active, setActive] = useState<NavKey>("home");

  return (
    <>
      {/* Desktop: sidebar bên trái */}
      <aside className="hidden md:flex fixed top-0 left-0 z-20 h-screen w-60 flex-col border-r border-white/10 bg-black/80 backdrop-blur px-4 py-6 text-white">
        <h1 className="px-2 mb-8 text-2xl font-bold tracking-tight">VideoFeed</h1>
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  isActive
                    ? "bg-white/15 font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile: bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-white/10 bg-black/85 backdrop-blur pb-[env(safe-area-inset-bottom)] text-white">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 transition ${
                isActive ? "text-white" : "text-white/60"
              }`}
            >
              {item.icon}
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
