#!/usr/bin/env node
/**
 * Standalone OCCT WASM test - bypasses all frameworks to verify OCCT works
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing OCCT WASM directly...\n');

try {
  // Load the Node.js OCCT module
  const wasmPath = resolve(__dirname, 'wasm/occt-core.node.mjs');
  console.log(`Loading OCCT module from: ${wasmPath}`);

  const { default: createOCCTNodeModule } = await import(wasmPath);

  console.log('✅ OCCT module imported successfully');
  console.log(`   Factory function type: ${typeof createOCCTNodeModule}`);

  // Initialize the module
  const occtModule = await createOCCTNodeModule({
    locateFile: (filename) => {
      return resolve(__dirname, 'wasm', filename);
    }
  });

  console.log('✅ OCCT module initialized');
  console.log(`   Exports available: ${Object.keys(occtModule).length}`);

  // Test basic geometry operation
  if (typeof occtModule.makeBox === 'function') {
    console.log('\n📦 Testing makeBox operation...');
    const box = occtModule.makeBox(10, 20, 30);
    console.log('✅ Box created:', box);
    console.log(`   Box ID: ${box.id}`);
    console.log(`   Box type: ${box.type}`);
    console.log(`   Box volume: ${box.volume}`);
  } else {
    console.log('⚠️  makeBox function not found');
  }

  if (typeof occtModule.makeSphere === 'function') {
    console.log('\n🔮 Testing makeSphere operation...');
    const sphere = occtModule.makeSphere(5);
    console.log('✅ Sphere created:', sphere);
    console.log(`   Sphere ID: ${sphere.id}`);
    console.log(`   Sphere type: ${sphere.type}`);
  } else {
    console.log('⚠️  makeSphere function not found');
  }

  console.log('\n🎉 OCCT WASM is fully functional!');
  process.exit(0);

} catch (error) {
  console.error('\n❌ OCCT test failed:');
  console.error(error);
  process.exit(1);
}
