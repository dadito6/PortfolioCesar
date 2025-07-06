import Link from "next/link"
import { Github, Linkedin, MessageCircle, Download } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a051c] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-6">
          <Link
            href="https://github.com/dadito6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Github size={40} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/cesar-rea-706667373/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Linkedin size={40} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://wa.me/542243407426"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <MessageCircle size={40} />
            <span className="sr-only">WhatsApp</span>
          </Link>


          <Link
  href="/cesar.rea.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-gray-400 transition-colors"
>
  <Download size={40} />
  <span className="sr-only" >Descargar</span>
</Link>


        </div>


        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Desarrollado por Cesar Rea.</p>
        </div>
      </div>
    </footer>
  )
}