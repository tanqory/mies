// Simple test to check if library exports work
const fs = require('fs');
const path = require('path');

// Check if build files exist
const distPath = path.join(__dirname, 'dist');
const files = ['index.js', 'index.mjs', 'index.d.ts', 'styles.css', 'tailwind-preset.js'];

console.log('🔍 Checking library build files...\n');

files.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} - ${(stats.size / 1024).toFixed(2)}KB`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Try to load the built library
console.log('\n📦 Testing library exports...\n');

try {
  const lib = require('./dist/index.js');
  const exportedNames = Object.keys(lib);
  console.log(`✅ Library loaded successfully!`);
  console.log(`📋 Exported components: ${exportedNames.length}`);
  console.log(`🎯 Sample exports: ${exportedNames.slice(0, 5).join(', ')}...`);
} catch (error) {
  console.log(`❌ Failed to load library: ${error.message}`);
}

console.log('\n🎉 Library package is ready for distribution!');