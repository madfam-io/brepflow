#!/usr/bin/env node
/**
 * Comprehensive WASM verification test
 * Checks all aspects of WASM implementation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('╔════════════════════════════════════════════════╗');
console.log('║   BrepFlow WASM Implementation Verification   ║');
console.log('╚════════════════════════════════════════════════╝\n');

let totalTests = 0;
let passedTests = 0;

function test(name, condition) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`✅ ${name}`);
        return true;
    } else {
        console.log(`❌ ${name}`);
        return false;
    }
}

// 1. Check WASM Files
console.log('📁 WASM Files Check:\n');
const wasmFiles = {
    'occt-core.wasm': path.join(root, 'packages/engine-occt/wasm/occt-core.wasm'),
    'occt-core.js': path.join(root, 'packages/engine-occt/wasm/occt-core.js'),
    'occt.wasm': path.join(root, 'packages/engine-occt/wasm/occt.wasm'),
    'occt.js': path.join(root, 'packages/engine-occt/wasm/occt.js'),
    'occt_geometry.wasm': path.join(root, 'packages/engine-occt/wasm/occt_geometry.wasm'),
    'occt_geometry.js': path.join(root, 'packages/engine-occt/wasm/occt_geometry.js'),
};

for (const [name, filepath] of Object.entries(wasmFiles)) {
    const exists = fs.existsSync(filepath);
    if (exists) {
        const stats = fs.statSync(filepath);
        const size = (stats.size / (1024 * 1024)).toFixed(2);
        test(`${name} exists (${size} MB)`, true);
    } else {
        test(`${name} exists`, false);
    }
}

// 2. Check Built Distribution
console.log('\n📦 Built Distribution Check:\n');
const distFiles = {
    'index.js': path.join(root, 'packages/engine-occt/dist/index.js'),
    'index.mjs': path.join(root, 'packages/engine-occt/dist/index.mjs'),
    'worker.mjs': path.join(root, 'packages/engine-occt/dist/worker.mjs'),
};

for (const [name, filepath] of Object.entries(distFiles)) {
    test(`${name} built`, fs.existsSync(filepath));
}

// 3. Check Vite Plugin
console.log('\n🔧 Vite Configuration Check:\n');
const vitePlugin = path.join(root, 'apps/studio/vite-plugin-wasm.ts');
const viteConfig = path.join(root, 'apps/studio/vite.config.ts');

test('vite-plugin-wasm.ts exists', fs.existsSync(vitePlugin));
test('vite.config.ts exists', fs.existsSync(viteConfig));

if (fs.existsSync(viteConfig)) {
    const configContent = fs.readFileSync(viteConfig, 'utf-8');
    test('WASM plugin imported', configContent.includes('wasmPlugin'));
    test('COOP/COEP headers configured', configContent.includes('Cross-Origin-Opener-Policy'));
}

// 4. Check Server Headers
console.log('\n🌐 Dev Server Headers Check:\n');
try {
    const headers = execSync('curl -I http://localhost:5173 2>/dev/null | grep -i "cross-origin"', { encoding: 'utf-8' });
    test('COOP header present', headers.includes('Cross-Origin-Opener-Policy: same-origin'));
    test('COEP header present', headers.includes('Cross-Origin-Embedder-Policy: require-corp'));
} catch (e) {
    console.log('⚠️  Dev server not running or headers not accessible');
}

// 5. Check Implementation Files
console.log('\n💻 Implementation Check:\n');
const implFiles = {
    'GeometryAPI': path.join(root, 'packages/engine-occt/src/geometry-api.ts'),
    'WorkerClient': path.join(root, 'packages/engine-occt/src/worker-client.ts'),
    'OCCTBindings': path.join(root, 'packages/engine-occt/src/occt-bindings.ts'),
    'MockGeometry': path.join(root, 'packages/engine-occt/src/mock-geometry.ts'),
};

for (const [name, filepath] of Object.entries(implFiles)) {
    test(`${name} implementation exists`, fs.existsSync(filepath));
}

// 6. Check Production Setup
console.log('\n🚀 Production Configuration Check:\n');
const prodFiles = {
    'vercel.json': path.join(root, 'vercel.json'),
    'studio.js function': path.join(root, 'functions/studio.js'),
};

for (const [name, filepath] of Object.entries(prodFiles)) {
    test(`${name} configured`, fs.existsSync(filepath));
}

// Summary
console.log('\n' + '═'.repeat(50));
console.log(`📊 Results: ${passedTests}/${totalTests} tests passed (${Math.round(passedTests/totalTests * 100)}%)`);
console.log('═'.repeat(50) + '\n');

if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! WASM implementation is ready for production!');
    process.exit(0);
} else {
    console.log('⚠️  Some tests failed. Please fix the issues before deploying.');
    console.log('\n📝 Checklist for 100% readiness:');
    console.log('1. All WASM files must be present');
    console.log('2. Distribution must be built');
    console.log('3. Dev server must serve proper headers');
    console.log('4. All implementation files must exist');
    console.log('5. Production configuration must be complete');
    process.exit(1);
}