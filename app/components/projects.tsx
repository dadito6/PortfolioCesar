"use client"

import { motion } from "framer-motion"
import { link } from "fs"
import Image from "next/image"
import Link from "next/link"
import Snowfall from "react-snowfall"

const projects = [
  {
    title: "Centro LAM",
    description: "Desarrollo de página web responsive para centro de kinesiología",
    image: "/centroLam.png",
    link: "https://centrolam.vercel.app/",
    tech: ["Next.js", "React", "Tailwind CSS", "CSS"],
  },
  {
    title: "Juego de Memoria Python",
    description: "Aplicación interactiva desarrollada con PySimpleGUI",
    image: "/PyGame.png",
    link:"https://github.com/dadito6/juego_memoria" ,
    tech: ["Python", "PySimpleGUI", "CSV", "Pandas"],
  },
  {
    title: "Aplicación Django",
    description: "Sistema de gestión con autenticación y formularios",
    image: "/MateYate.png",
    link:"https://github.com/carrera7/YateMate",
    tech: ["Django", "Python", "SQLite"],
  },
  {
    title: "Sitios Historicos Argentina",
    description: "Sistema integral de gestion de Sitios Historicos",
    image: "/efimero.jpg",
    link:"https://grupo17.proyecto2025.linti.unlp.edu.ar/",
    tech: ["Vue", "Flask", "PostgresSQl", "Oauth Google"],
  },
]

export function Projects() {
  return (
    
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Proyectos
        </motion.h2>
    
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </div>
      <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech &&
            project.tech.map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                {tech}
              </span>
            ))}
        </div>
        {project.link && (
          <Link target="_blank"
            href={project.link}
            className="inline-block px-6 py-2 bg-white hover:bg-slate-500 rounded-full text-sky-950 transition-colors"
          >
            Ver proyecto
          </Link>
        )}
      </div>
    </motion.div>
  )
}

