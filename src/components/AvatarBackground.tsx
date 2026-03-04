import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function Avatar() {
    const groupRef = useRef<THREE.Group>(null!)
    const leftPupilRef = useRef<THREE.Mesh>(null!)
    const rightPupilRef = useRef<THREE.Mesh>(null!)
    const { viewport } = useThree()

    useFrame((state) => {
        // Mouse tracking - smooth interpolation towards target rotation
        const targetX = (state.pointer.x * Math.PI) / 4
        const targetY = (state.pointer.y * Math.PI) / 4

        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1)
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1)
        }

        // Extra eye pupil movement for parallax effect
        if (leftPupilRef.current && rightPupilRef.current) {
            const pupilX = state.pointer.x * 0.1
            const pupilY = state.pointer.y * 0.1
            leftPupilRef.current.position.x = THREE.MathUtils.lerp(leftPupilRef.current.position.x, pupilX, 0.2)
            leftPupilRef.current.position.y = THREE.MathUtils.lerp(leftPupilRef.current.position.y, pupilY, 0.2)
            rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, pupilX, 0.2)
            rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, pupilY, 0.2)
        }
    })

    // Cool dark, glossy metallic material for the head to match the site aesthetic
    const skinMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.2, metalness: 0.8 })
    const whiteMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.1 })
    const blackMaterial = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.1 })

    // Scale down the avatar on smaller viewports (mobile responsiveness)
    const responsiveScale = Math.min(1, viewport.width / 6)

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={groupRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
                {/* Head */}
                <mesh castShadow receiveShadow material={skinMaterial}>
                    <boxGeometry args={[2, 2, 2]} />
                </mesh>

                {/* Left Eye */}
                <group position={[-0.4, 0.2, 1.01]}>
                    <mesh material={whiteMaterial} castShadow>
                        <sphereGeometry args={[0.3, 32, 32]} />
                    </mesh>
                    <mesh ref={leftPupilRef} position={[0, 0, 0.25]} material={blackMaterial}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                    </mesh>
                </group>

                {/* Right Eye */}
                <group position={[0.4, 0.2, 1.01]}>
                    <mesh material={whiteMaterial} castShadow>
                        <sphereGeometry args={[0.3, 32, 32]} />
                    </mesh>
                    <mesh ref={rightPupilRef} position={[0, 0, 0.25]} material={blackMaterial}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                    </mesh>
                </group>

                {/* Mouth */}
                <mesh position={[0, -0.4, 1.01]} material={blackMaterial}>
                    <boxGeometry args={[0.5, 0.05, 0.05]} />
                </mesh>
            </group>
        </Float>
    )
}

export default function AvatarBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas eventSource={document.getElementById('root') || document.body} eventPrefix="client" camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <Avatar />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
