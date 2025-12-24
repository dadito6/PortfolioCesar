/* app.tsx */

"use client"
import { motion, useScroll, useTransform, useReducedMotion, useAnimation } from "framer-motion"
import { useRef } from "react"
import { Projects } from "./components/projects"
import { Footer } from "./components/footer"
import { useState } from "react";
import { Comentarios } from "./components/comentarios"
import {Snowfall} from "react-snowfall"
import "../styles/globals.css"

import Link from "next/link"
import LoginModal from "./components/LoginModal"
import RegisterModal from "./components/RegisterModal"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })



  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.8])

  const handleAvatarClick = async () => {
    if (shouldReduceMotion) return
    // run one spin
    await controls.start({
      rotateY: 360,
      rotateX: [0, 15, 0],
      filter: [
        'drop-shadow(0px 5px 4px rgba(255,255,255,0.1))',
        'drop-shadow(0px 20px 20px rgba(255,255,255,0.15))',
        'drop-shadow(0px 5px 4px rgba(255,255,255,0.1))'
      ],
      transition: {
        duration: 1,
        ease: [0.47, 0, 0.745, 0.715]
      }
    })
    // reset to initial pose
    controls.set({ rotateY: 0, rotateX: 0, filter: 'drop-shadow(0px 5px 4px rgba(255,255,255,0.1))' })
  }

  return (
    <div ref={containerRef} className="bg-[#0a051c]">
      <motion.section
        style={{ opacity, scale }}
        className="h-screen relative flex flex-col items-center justify-center md:h-300"
      >
<Snowfall></Snowfall>

        <figure className="relative z-10 mb-4 avatar-container">
          <motion.img
            src="/cesar-compu3.JPEG"
            alt="Retrato giratorio de Cesar Rea, desarrollador Fullstack"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white object-cover cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, filter'
            }}
            initial={{ rotateY: 0, rotateX: 0, filter: 'drop-shadow(0px 5px 4px rgba(255,255,255,0.1))' }}
            animate={shouldReduceMotion ? {} : controls}
            onClick={handleAvatarClick}
            whileHover={ shouldReduceMotion ? {} : { scale: 1.05 }}
          />
          <figcaption className="sr-only">Retrato giratorio de Cesar Rea</figcaption>
        </figure>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white bg-clip-padding text-center"
        >
          👋 Hola, soy{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/cesar-rea-706667373/"
            className="enlace-linkedin"
            aria-label="Visitar perfil de LinkedIn de Cesar Rea"
          >
            Cesar Rea
          </a>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-2xl md:text-3xl text-gray-400 mt-4 text-center"
        >
          ⬇ Desarrollador : soluciones web seguras y escalables.
        </motion.h2>
      </motion.section>


      <Projects    />
      
      <div className="relative w-full">
        <svg viewBox="0 0 1440 120" className="fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80 C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
      <Comentarios/>
      <Footer />
    </div>
  )
}

/* globals.css (additions) */



