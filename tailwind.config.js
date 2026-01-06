/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // ⚡ 固定暗色
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true  // auto-center container
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: "hsl(var(--card))",
                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground))",
                coral: "hsl(var(--coral))",
                "coral-dark": "hsl(var(--coral-dark))",
            },
        },
    },
    plugins: [],
}