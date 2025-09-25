#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🎨 ${packageJson.name}                            │
│   📦 Version: ${packageJson.version}                                        │
│   📝 ${packageJson.description}  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

📋 Package Information:
   • Name: ${packageJson.name}
   • Version: ${packageJson.version}
   • Main: ${packageJson.main}
   • Module: ${packageJson.module}
   • Types: ${packageJson.types}

📦 Distribution Files:
`);

const distFiles = fs.readdirSync('./dist');
distFiles.forEach(file => {
  const stats = fs.statSync(path.join('./dist', file));
  const size = stats.isDirectory() ? '[DIR]' : `${(stats.size / 1024).toFixed(1)}KB`;
  console.log(`   • ${file.padEnd(20)} ${size}`);
});

console.log(`
🚀 Ready to publish:
   npm publish --access public

📖 Installation:
   npm install ${packageJson.name}

🎯 Usage:
   import { Button, Card } from '${packageJson.name}'
   import '${packageJson.name}/styles.css'
`);

// Check if this is a dry run
if (process.argv.includes('--dry-run')) {
  console.log('🔍 Running npm pack (dry run)...\n');
  require('child_process').execSync('npm pack --dry-run', { stdio: 'inherit' });
}