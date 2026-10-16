"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// React warns when a client render produces a <script>. Mark the theme script
// as text/plain on the client so it only runs from the server HTML.
const scriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
