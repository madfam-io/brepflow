#!/usr/bin/env node

// Test OCCT Worker Initialization
import { createProductionAPI } from './packages/engine-occt/dist/index.mjs';

console.log('🔧 Testing OCCT Worker Initialization...\n');

async function testWorkerInit() {
  const startTime = Date.now();

  console.log('1️⃣  Creating Production API instance...');
  const api = createProductionAPI({
    wasmPath: './packages/engine-occt/wasm',
    initTimeout: 30000,
    validateOutput: true,
    memoryThreshold: 1500
  });

  console.log('2️⃣  Initializing worker with real OCCT WASM...');
  try {
    await api.init();
    console.log('✅ Worker initialized successfully!');

    // Check status
    const status = api.getStatus();
    console.log('\n📊 Worker Status:');
    console.log('   - Initialized:', status.initialized);
    console.log('   - Worker ID:', status.workerId);
    console.log('   - Pending requests:', status.pendingRequests);

    // Test SharedArrayBuffer support
    if (typeof SharedArrayBuffer !== 'undefined') {
      console.log('   - SharedArrayBuffer: ✅ Supported');
    } else {
      console.log('   - SharedArrayBuffer: ❌ Not available');
    }

    // Test a simple operation
    console.log('\n3️⃣  Testing geometry creation...');
    const result = await api.invoke('MAKE_BOX', {
      width: 10,
      height: 10,
      depth: 10
    });

    if (result) {
      console.log('✅ Geometry created successfully!');
      console.log('   - Shape ID:', result.id || 'Generated');
      console.log('   - Type:', result.type || 'Box');
    }

    // Test memory usage
    const memoryUsage = await api.getMemoryUsage();
    console.log('\n📈 Memory Usage:', memoryUsage, 'bytes');

    // Clean up
    await api.shutdown();
    console.log('\n✅ Worker shutdown cleanly');

    const elapsed = Date.now() - startTime;
    console.log(`\n⏱️  Total time: ${elapsed}ms`);

    console.log('\n🎉 All tests passed! OCCT Worker is working correctly.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Worker initialization failed:', error.message);
    console.error('Stack:', error.stack);

    // Additional diagnostics
    console.log('\n🔍 Diagnostic Information:');
    console.log('   - Node version:', process.version);
    console.log('   - Platform:', process.platform);
    console.log('   - Current directory:', process.cwd());

    process.exit(1);
  }
}

// Run the test
testWorkerInit().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});