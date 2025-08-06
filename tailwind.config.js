/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'firework': 'firework 1.5s ease-out forwards',
        'sparkle': 'sparkle 2s ease-out forwards',
        'burst': 'burst 0.8s ease-out forwards'
      },
      keyframes: {
        firework: {
          '0%': { 
            transform: 'translateY(100vh) scale(0)', 
            opacity: '1' 
          },
          '15%': { 
            transform: 'translateY(-20vh) scale(0)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(-20vh) scale(1)', 
            opacity: '0' 
          }
        },
        sparkle: {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(0) rotate(360deg)', 
            opacity: '0' 
          }
        },
        burst: {
          '0%': { 
            transform: 'scale(0)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'scale(1.5)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(2)', 
            opacity: '0' 
          }
        }
      }
    },
  },
  plugins: [],
}