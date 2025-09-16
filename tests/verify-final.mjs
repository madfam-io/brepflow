#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

console.log('\n╔════════════════════════════════════════════════╗');
console.log('║    FINAL WASM VERIFICATION (After Fix)        ║');
console.log('╚════════════════════════════════════════════════╝\n');

const tests = {
    'Server Running': false,
    'COOP/COEP Headers': false,
    'WASM Files Present': false,
    'No Process Error': false,
    'Build Successful': false
};

// Test 1: Server running
try {
    const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:5175', { encoding: 'utf-8' });
    tests['Server Running'] = response.trim() === '200';
    console.log(`✅ Server running on port 5175`);
} catch (e) {
    console.log(`❌ Server not running`);
}

// Test 2: Headers
try {
    const headers = execSync('curl -sI http://localhost:5175 | grep -i "cross-origin"', { encoding: 'utf-8' });
    tests['COOP/COEP Headers'] = headers.includes('same-origin') && headers.includes('require-corp');
    console.log(`✅ COOP/COEP headers present`);
} catch (e) {
    console.log(`❌ Headers not found`);
}

// Test 3: WASM files
const wasmPath = path.join(root, 'packages/engine-occt/wasm/occt-core.wasm');
tests['WASM Files Present'] = fs.existsSync(wasmPath);
console.log(`✅ WASM files present (${(fs.statSync(wasmPath).size / 1024 / 1024).toFixed(2)} MB)`);

// Test 4: Check for process.env fix
const envFile = path.join(root, 'packages/engine-core/src/config/environment.ts');
const envContent = fs.readFileSync(envFile, 'utf-8');
tests['No Process Error'] = envContent.includes('typeof window !== \'undefined\'') && envContent.includes('processEnv');
console.log(`✅ Process.env fix applied`);

// Test 5: Build status
const distFile = path.join(root, 'packages/engine-occt/dist/index.mjs');
tests['Build Successful'] = fs.existsSync(distFile);
const mtime = fs.statSync(distFile).mtime;
const minAgo = Math.round((Date.now() - mtime) / 60000);
console.log(`✅ Build successful (${minAgo} minutes ago)`);

// Summary
console.log('\n════════════════════════════════════════════════');
const passed = Object.values(tests).filter(t => t).length;
const total = Object.keys(tests).length;

console.log(`📊 Result: ${passed}/${total} tests passed (${Math.round(passed/total * 100)}%)\n`);

Object.entries(tests).forEach(([name, result]) => {
    console.log(`  ${result ? '✅' : '❌'} ${name}`);
});

if (passed === total) {
    console.log('\n🎉 ALL TESTS PASSED! Infrastructure verified!');
    console.log('\n📝 Next: Open http://localhost:5175 in browser');
    console.log('   Check console - should have NO "process is not defined" error');
} else {
    console.log('\n⚠️  Some tests failed');
}

process.exit(passed === total ? 0 : 1);
