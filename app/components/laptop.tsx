"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function Laptop() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshStandardMaterial color="#4a4a4a" />
    </mesh>
  )
}

