import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*'],
      outDir: 'dist',
      copyDtsFiles: false,
      staticImport: true,
      rollupTypes: false
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'x/index': resolve(__dirname, 'src/x/index.ts')
      },
      name: 'TanqoryMies',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (entryName === 'x/index') {
          return `x/index.${format === 'es' ? 'mjs' : 'js'}`
        }
        return `index.${format === 'es' ? 'mjs' : 'js'}`
      }
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        /^@radix-ui/,
        /^@dnd-kit/,
        /^@tanstack/,
        'class-variance-authority',
        'clsx',
        'cmdk',
        'date-fns',
        'embla-carousel-react',
        'input-otp',
        'lucide-react',
        'next-themes',
        'react-day-picker',
        'react-hook-form',
        'react-resizable-panels',
        'recharts',
        'sonner',
        'tailwind-merge',
        'vaul'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})