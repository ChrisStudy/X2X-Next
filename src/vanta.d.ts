declare module 'vanta/dist/vanta.waves.min' {
    const initWaves: (options: Record<string, any>) => {
        destroy: () => void
        [key: string]: any
    }
    export default initWaves
}