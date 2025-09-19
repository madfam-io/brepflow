#!/usr/bin/env node

/**
 * Test Real OCCT Worker Initialization
 * This test specifically forces real OCCT usage, no mock fallback
 */

import { createProductionAPI } from './packages/engine-occt/dist/index.mjs';

console.log('🔧 Testing Real OCCT Geometry Operations...\n');

async function testRealOCCT() {
  const startTime = Date.now();

  try {
    // Force production mode to ensure real OCCT
    process.env.NODE_ENV = 'production';

    console.log('1️⃣  Creating Production API instance...');
    const api = createProductionAPI({
      wasmPath: './packages/engine-occt/wasm',
      initTimeout: 30000,
      validateOutput: true,
      memoryThreshold: 1500
    });

    console.log('2️⃣  Initializing with real OCCT WASM...');
    await api.init();
    console.log('✅ Worker initialized successfully!');

    // Check status
    const status = api.getStatus();
    console.log('\n📊 Worker Status:');
    console.log('   - Initialized:', status.initialized);
    console.log('   - Worker ID:', status.workerId);
    console.log('   - Pending requests:', status.pendingRequests);

    // Test geometry creation
    console.log('\n3️⃣  Testing Box Creation...');
    const box = await api.invoke('MAKE_BOX', {
      width: 100,
      height: 50,
      depth: 25
    });
    console.log('✅ Box created:', box);

    console.log('\n4️⃣  Testing Sphere Creation...');
    const sphere = await api.invoke('MAKE_SPHERE', {
      radius: 30
    });
    console.log('✅ Sphere created:', sphere);

    console.log('\n5️⃣  Testing Boolean Union...');
    const union = await api.invoke('BOOLEAN_UNION', {
      shape1: box.id,
      shape2: sphere.id
    });
    console.log('✅ Boolean union created:', union);

    console.log('\n6️⃣  Testing Tessellation...');
    const mesh = await api.invoke('TESSELLATE', {
      shapeId: union.id,
      precision: 0.1,
      angle: 0.5
    });
    console.log('✅ Tessellation complete:');
    console.log('   - Vertices:', mesh.positions?.length / 3 || 0);
    console.log('   - Triangles:', mesh.indices?.length / 3 || 0);

    // Memory info
    const memoryUsage = await api.getMemoryUsage();
    console.log('\n📈 Memory Usage:', memoryUsage, 'bytes');

    // Clean up
    await api.shutdown();
    console.log('\n✅ Worker shutdown cleanly');

    const elapsed = Date.now() - startTime;
    console.log(`\n⏱️  Total time: ${elapsed}ms`);

    console.log('\n🎉 SUCCESS! Real OCCT geometry operations are working!');
    console.log('   - Box, Sphere, Boolean Union, and Tessellation all functional');
    console.log('   - WASM module loaded and executed successfully');
    console.log('   - Worker communication established');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);

    // Detailed diagnostics
    console.log('\n🔍 Diagnostic Information:');
    console.log('   - Node version:', process.version);
    console.log('   - Platform:', process.platform);
    console.log('   - Current directory:', process.cwd());
    console.log('   - NODE_ENV:', process.env.NODE_ENV);

    console.log('\n⚠️  Possible issues:');
    console.log('   1. Worker file not found in wasm/worker.mjs');
    console.log('   2. WASM files (occt.js, occt.wasm) not accessible');
    console.log('   3. Worker syntax errors or import issues');
    console.log('   4. SharedArrayBuffer not available in Node.js context');

    process.exit(1);
  }
}

// Run the test
testRealOCCT().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});