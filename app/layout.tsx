import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cesar Rea 🤗 |  Dev",
  description:
    "Portfolio personal de Cesar Rea, desarrollador frontend especializado en React y tecnologías web modernas.",
  icons: "/cesar.png",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

