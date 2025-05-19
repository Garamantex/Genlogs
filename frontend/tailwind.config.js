/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                // Puedes agregar colores personalizados aquí si es necesario
            },
        },
    },
    plugins: [],
}