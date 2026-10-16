"use client"

import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const themes = [
  { value: "light", label: "라이트", icon: SunIcon },
  { value: "system", label: "시스템", icon: MonitorIcon },
  { value: "dark", label: "다크", icon: MoonIcon },
]

const subscribe = () => () => {}

// The stored theme is only known on the client, so render no selection
// until hydration finishes to keep the server and client markup identical.
function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  return (
    <ToggleGroup
      type="single"
      spacing={1}
      aria-label="테마 선택"
      value={mounted ? theme : ""}
      onValueChange={(value) => {
        // Radix clears the value when the active item is clicked again.
        if (value) setTheme(value)
      }}
      className="rounded-full border p-1"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          size="sm"
          className="size-7 min-w-7 rounded-full px-0"
        >
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { ThemeSwitcher }
