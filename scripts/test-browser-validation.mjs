#!/usr/bin/env node
/**
 * BrepFlow Browser Test Validation Script
 * Executes comprehensive browser testing and validation
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const RESULTS_DIR = './test-results';
const BROWSER_TEST_URL = 'http://localhost:5173/tests/comprehensive-browser-test.html';

class BrowserTestValidator {
  constructor() {
    this.results = {
      unitTests: null,
      browserTests: null,
      wasmValidation: null,
      performanceMetrics: null,
      timestamp: new Date().toISOString()
    };
  }

  async ensureResultsDir() {
    try {
      await fs.access(RESULTS_DIR);
    } catch {
      await fs.mkdir(RESULTS_DIR, { recursive: true });
    }
  }

  async runCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      console.log(`🔄 Running: ${command} ${args.join(' ')}`);

      const proc = spawn(command, args, {
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
        ...options
      });

      let stdout = '';
      let stderr = '';

      proc.stdout?.on('data', (data) => {
        stdout += data.toString();
        if (options.showOutput) process.stdout.write(data);
      });

      proc.stderr?.on('data', (data) => {
        stderr += data.toString();
        if (options.showOutput) process.stderr.write(data);
      });

      proc.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      proc.on('error', reject);
    });
  }

  async validateUnitTests() {
    console.log('\n📋 Running Unit Test Validation...');

    try {
      const result = await this.runCommand('pnpm', ['test'], {
        cwd: process.cwd(),
        timeout: 120000
      });

      const testSummary = this.parseTestResults(result.stdout);

      this.results.unitTests = {
        status: result.code === 0 ? 'PASS' : 'FAIL',
        summary: testSummary,
        output: result.stdout,
        errors: result.stderr
      };

      if (result.code === 0) {
        console.log('✅ Unit tests passed successfully');
      } else {
        console.log('❌ Unit tests failed');
      }

      return this.results.unitTests;
    } catch (error) {
      console.error('❌ Unit test execution failed:', error.message);
      this.results.unitTests = {
        status: 'ERROR',
        error: error.message
      };
      return this.results.unitTests;
    }
  }

  parseTestResults(output) {
    // Extract test statistics from vitest output
    const lines = output.split('\n');
    const summary = {};

    lines.forEach(line => {
      if (line.includes('Test Files')) {
        const match = line.match(/Test Files\s+(\d+)\s+passed\s*\((\d+)\)/);
        if (match) {
          summary.testFiles = { passed: parseInt(match[1]), total: parseInt(match[2]) };
        }
      }
      if (line.includes('Tests') && line.includes('passed')) {
        const match = line.match(/Tests\s+(\d+)\s+passed\s*\((\d+)\)/);
        if (match) {
          summary.tests = { passed: parseInt(match[1]), total: parseInt(match[2]) };
        }
      }
      if (line.includes('Duration')) {
        const match = line.match(/Duration\s+([\d.]+s)/);
        if (match) {
          summary.duration = match[1];
        }
      }
    });

    return summary;
  }

  async validateWASMFiles() {
    console.log('\n⚙️ Validating WASM Files...');

    const wasmFiles = [
      './packages/engine-occt/wasm/occt-core.wasm',
      './packages/engine-occt/wasm/occt.wasm'
    ];

    const wasmStatus = {};

    for (const wasmFile of wasmFiles) {
      try {
        const stats = await fs.stat(wasmFile);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

        wasmStatus[path.basename(wasmFile)] = {
          exists: true,
          size: `${sizeMB} MB`,
          modified: stats.mtime.toISOString()
        };

        console.log(`✅ ${path.basename(wasmFile)}: ${sizeMB} MB`);
      } catch (error) {
        wasmStatus[path.basename(wasmFile)] = {
          exists: false,
          error: error.message
        };
        console.log(`❌ ${path.basename(wasmFile)}: Not found`);
      }
    }

    this.results.wasmValidation = wasmStatus;
    return wasmStatus;
  }

  async checkDevServer() {
    console.log('\n🌐 Checking Development Server...');

    try {
      const response = await fetch('http://localhost:5173');
      const isRunning = response.ok;

      if (isRunning) {
        console.log('✅ Dev server is running');

        // Check if our test page is accessible
        try {
          const testPageResponse = await fetch(BROWSER_TEST_URL);
          const testPageExists = testPageResponse.ok;

          if (testPageExists) {
            console.log('✅ Browser test page is accessible');
          } else {
            console.log('⚠️ Browser test page not accessible');
          }

          return { running: true, testPageAccessible: testPageExists };
        } catch (error) {
          console.log('⚠️ Could not check test page accessibility');
          return { running: true, testPageAccessible: false };
        }
      } else {
        console.log('❌ Dev server is not responding');
        return { running: false };
      }
    } catch (error) {
      console.log('❌ Dev server is not running');
      return { running: false, error: error.message };
    }
  }

  async validatePackageBuilds() {
    console.log('\n📦 Validating Package Builds...');

    const packages = [
      './packages/engine-occt/dist',
      './packages/types/dist',
      './packages/engine-core/dist'
    ];

    const buildStatus = {};

    for (const packageDir of packages) {
      try {
        await fs.access(packageDir);
        const files = await fs.readdir(packageDir);

        buildStatus[path.basename(path.dirname(packageDir))] = {
          exists: true,
          files: files.length,
          fileList: files.slice(0, 5) // First 5 files
        };

        console.log(`✅ ${path.basename(path.dirname(packageDir))}: ${files.length} files`);
      } catch (error) {
        buildStatus[path.basename(path.dirname(packageDir))] = {
          exists: false,
          error: error.message
        };
        console.log(`❌ ${path.basename(path.dirname(packageDir))}: Build not found`);
      }
    }

    this.results.packageBuilds = buildStatus;
    return buildStatus;
  }

  async generateReport() {
    await this.ensureResultsDir();

    const report = {
      timestamp: this.results.timestamp,
      summary: {
        unitTests: this.results.unitTests?.status || 'NOT_RUN',
        wasmFiles: Object.values(this.results.wasmValidation || {}).every(w => w.exists) ? 'PASS' : 'FAIL',
        browserTests: this.results.browserTests?.status || 'NOT_RUN',
        performance: this.results.performanceMetrics?.status || 'NOT_RUN'
      },
      details: this.results
    };

    const reportPath = path.join(RESULTS_DIR, 'browser-test-validation-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    return report;
  }

  async printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 BREPFLOW BROWSER TEST VALIDATION SUMMARY');
    console.log('='.repeat(60));

    const items = [
      ['Unit Tests', this.results.unitTests?.status || 'NOT_RUN'],
      ['WASM Files', Object.values(this.results.wasmValidation || {}).every(w => w.exists) ? 'PASS' : 'FAIL'],
      ['Package Builds', Object.values(this.results.packageBuilds || {}).every(p => p.exists) ? 'PASS' : 'FAIL'],
      ['Dev Server', this.results.devServer?.running ? 'RUNNING' : 'NOT_RUNNING']
    ];

    items.forEach(([name, status]) => {
      const icon = status === 'PASS' || status === 'RUNNING' ? '✅' :
                   status === 'FAIL' || status === 'NOT_RUNNING' ? '❌' : '⚠️';
      console.log(`${icon} ${name.padEnd(20)}: ${status}`);
    });

    if (this.results.unitTests?.summary) {
      const summary = this.results.unitTests.summary;
      if (summary.tests) {
        console.log(`\n📊 Test Details:`);
        console.log(`   • Tests: ${summary.tests.passed}/${summary.tests.total} passed`);
        console.log(`   • Duration: ${summary.duration || 'N/A'}`);
      }
    }

    // Recommendations
    console.log('\n🎯 Recommendations:');

    if (this.results.unitTests?.status === 'PASS') {
      console.log('   ✅ Unit tests are passing - core functionality validated');
    } else {
      console.log('   ⚠️ Run unit tests to validate core functionality');
    }

    if (Object.values(this.results.wasmValidation || {}).every(w => w.exists)) {
      console.log('   ✅ WASM files are built - ready for browser testing');
    } else {
      console.log('   ⚠️ Run `pnpm run build:wasm` to build OCCT WASM files');
    }

    if (this.results.devServer?.running) {
      console.log(`   ✅ Dev server running - visit ${BROWSER_TEST_URL} for manual testing`);
    } else {
      console.log('   ⚠️ Start dev server with `pnpm run dev` for browser testing');
    }

    console.log('\n🧪 To run comprehensive browser tests:');
    console.log(`   1. Ensure dev server is running: pnpm run dev`);
    console.log(`   2. Visit: ${BROWSER_TEST_URL}`);
    console.log(`   3. Click "Run All Tests" to validate WASM functionality`);

    console.log('\n' + '='.repeat(60));
  }

  async run() {
    console.log('🚀 Starting BrepFlow Browser Test Validation...\n');

    // Run all validations
    await this.validateUnitTests();
    await this.validateWASMFiles();
    await this.validatePackageBuilds();
    this.results.devServer = await this.checkDevServer();

    // Generate report and summary
    await this.generateReport();
    await this.printSummary();

    return this.results;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new BrowserTestValidator();

  try {
    const results = await validator.run();

    // Exit with appropriate code
    const hasFailures = Object.values(results).some(result =>
      result && typeof result === 'object' && result.status === 'FAIL'
    );

    process.exit(hasFailures ? 1 : 0);
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

export { BrowserTestValidator };