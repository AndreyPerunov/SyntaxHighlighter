import type { Metadata } from "next"
import "./globals.css"
import { Roboto } from "next/font/google"

export const metadata: Metadata = {
  title: "Syntax Highlighter",
  description: "A syntax highlighter for code"
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400"
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
