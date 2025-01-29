"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Projects } from "./components/projects"
import { Laptop } from "./components/laptop"
import { Footer } from "./components/footer" // Añade esta línea

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div ref={containerRef} className="bg-[#0a051c]">
      {/* Hero Section with 3D Model */}
      <motion.section
        style={{ opacity, scale }}
        className="h-screen relative flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Laptop />
          </Canvas>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white text-center z-10"
        >
          Cesar Rea
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl md:text-3xl text-gray-400 mt-4 text-center z-10"
        >
          ⬇ Desarrollador 
        </motion.h2>
      </motion.section>
      {/* Projects Section */}
      <Projects />
      {/* Curved divider */}
      <div className="relative w-full">
        <svg viewBox="0 0 1440 120" className="fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
      {/* Footer */}
      <Footer /> {/* Añade esta línea */}
    </div>
  )
}



