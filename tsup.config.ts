import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/index': 'src/theme/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";'
  },
  splitting: false,
  sourcemap: true,
  minify: false,
  treeshake: true,
  outDir: 'dist'
})