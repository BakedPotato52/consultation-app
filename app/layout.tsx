import { Inter } from "next/font/google"
import { NextAuthProvider } from "./components/providers/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} max-sm:mb-16 sm:max-w-screen`}>
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster position="top-center" />
        </body>
      </ThemeProvider>
    </html>
  )
}

