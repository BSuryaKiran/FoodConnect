// Import Vite's configuration function
import { defineConfig } from 'vite'
// Import React plugin for Vite to enable React Fast Refresh and JSX support
import react from '@vitejs/plugin-react'

/**
 * Vite Configuration
 * Official documentation: https://vitejs.dev/config/
 * This file configures the build tool and development server settings
 */
export default defineConfig({
  // Plugins array - enables React support in Vite
  plugins: [react()],
  
  // Base public path for the application
  // Used when deploying to GitHub Pages or subdirectories
  base: '/FoodConnect/',
  
  // Development server configuration
  server: {
    // Port number for the development server
    port: 3000,
    // Automatically open the browser when server starts
    open: true,
    // Proxy API requests to backend server
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
