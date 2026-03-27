'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Wireframe icosahedron — the "AI brain" ──────────────────────────
function AIBrainSphere() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.elapsedTime * 0.12
      outerRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.08
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -clock.elapsedTime * 0.08
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#2D9CDB" wireframe transparent opacity={0.55} />
      </mesh>
      {/* Inner wireframe */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#00FCE2" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Soft core glow */}
      <Sphere args={[1.0, 16, 16]}>
        <meshStandardMaterial
          color="#2D9CDB"
          emissive="#0a3a5c"
          emissiveIntensity={2}
          transparent
          opacity={0.12}
        />
      </Sphere>
    </Float>
  )
}

// ── Orbiting rings (using native torusGeometry) ─────────────────────
function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.18
      ring1.current.rotation.x = 1.1
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.13
      ring2.current.rotation.x = 0.4
      ring2.current.rotation.y = t * 0.1
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.09
      ring3.current.rotation.x = 0.8
      ring3.current.rotation.y = -t * 0.07
    }
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[3.2, 0.012, 8, 90]} />
        <meshBasicMaterial color="#2D9CDB" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.7, 0.008, 8, 90]} />
        <meshBasicMaterial color="#00FCE2" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3.7, 0.006, 8, 90]} />
        <meshBasicMaterial color="#2D9CDB" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

// ── Floating particle cloud ─────────────────────────────────────────
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 320
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.04
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color="#00FCE2"
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </Points>
  )
}

// ── Small floating data-node dots ───────────────────────────────────
function DataNodes() {
  const data = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        base: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5] as const,
        speed: 0.3 + Math.random() * 0.5,
        offset: (i / 12) * Math.PI * 2,
        color: i % 2 === 0 ? '#2D9CDB' : '#00FCE2',
      })),
    []
  )

  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    data.forEach((d, i) => {
      const mesh = refs.current[i]
      if (mesh) {
        mesh.position.y = d.base[1] + Math.sin(clock.elapsedTime * d.speed + d.offset) * 0.4
        mesh.position.x = d.base[0] + Math.cos(clock.elapsedTime * d.speed * 0.7 + d.offset) * 0.25
      }
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el }} position={[...d.base]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </>
  )
}

// ── Main canvas ─────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#2D9CDB" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#00FCE2" />

      <AIBrainSphere />
      <OrbitalRings />
      <ParticleCloud />
      <DataNodes />
    </Canvas>
  )
}
