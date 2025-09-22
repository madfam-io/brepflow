import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { renderCommand } from '@brepflow/cli/src/commands/render';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const graphFixture = path.resolve('packages/examples/graphs/simple-box.bflow.json');

describe('CLI integration', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brepflow-cli-'));

  beforeAll(async () => {
    await fs.ensureDir(tempDir);
  });

  afterAll(async () => {
    await fs.remove(tempDir);
  });

  it('renders a graph and produces manifest using mock geometry', async () => {
    const command = renderCommand.clone();

    await command.parseAsync([
      'node',
      'render',
      graphFixture,
      '--out', tempDir,
      '--export', 'step',
      '--mock',
      '--manifest'
    ], { from: 'user' });

    const stepFile = path.join(tempDir, 'output.step');
    const manifestFile = path.join(tempDir, 'manifest.json');

    expect(await fs.pathExists(stepFile)).toBe(true);
    expect(await fs.pathExists(manifestFile)).toBe(true);

    const manifest = await fs.readJson(manifestFile);
    expect(manifest.graph).toBe(path.basename(graphFixture));
    expect(Array.isArray(manifest.exports)).toBe(true);
    expect(manifest.exports.length).toBeGreaterThan(0);
  });
});
