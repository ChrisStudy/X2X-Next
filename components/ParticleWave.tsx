'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min'  // 现在 TS 认得了！

export default function WavesBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const effectRef = useRef<ReturnType<typeof WAVES> | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        effectRef.current = WAVES({
            el: containerRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            color: 0x1a2b44,
            shininess: 35,
            waveHeight: 18,
            waveSpeed: 0.4,
            zoom: 1.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0a1421,
        })

        return () => {
            effectRef.current?.destroy()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        />
    )
}