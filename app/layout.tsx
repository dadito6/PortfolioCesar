import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cesar Rea 🤗 |  Dev",
  description:
    "Portfolio personal de Cesar Rea, desarrollador frontend especializado en React y tecnologías web modernas.",
  icons: "/cesar.png",
}

export default function RootLayout({children,}: { children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        <Header/>
        <main style={{ paddingTop: "64px" /* Ajusta según la altura de tu header */ }}>
          {children}
        </main>
      </body>
    </html>
  )
}

