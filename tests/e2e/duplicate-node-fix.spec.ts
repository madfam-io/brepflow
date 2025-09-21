import { test, expect } from '@playwright/test';

test.describe('Duplicate Node Bug Fix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Wait for the app to load completely
    await page.waitForSelector('[data-testid="node-editor"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="node-palette"]', { timeout: 10000 });
    
    // Wait for nodes to load in the palette
    await page.waitForFunction(() => {
      const nodeCount = document.querySelectorAll('[draggable="true"]').length;
      return nodeCount > 0;
    }, { timeout: 15000 });
  });

  test('should not create duplicate nodes when dragging from palette', async ({ page }) => {
    // Get initial node count in editor
    const initialNodeCount = await page.evaluate(() => {
      const debugElement = document.querySelector('[data-testid="debug-node-count"]');
      if (debugElement) {
        return parseInt(debugElement.textContent || '0');
      }
      // Fallback: count nodes in ReactFlow
      return document.querySelectorAll('.react-flow__node').length;
    });

    // Find the first draggable node in the palette
    const firstDraggableNode = await page.locator('[draggable="true"]').first();
    await expect(firstDraggableNode).toBeVisible();

    // Get the node type for drag data
    const nodeType = await firstDraggableNode.getAttribute('data-node-type');
    expect(nodeType).toBeTruthy();

    // Get the ReactFlow editor area
    const reactFlowWrapper = page.locator('.react-flow');
    await expect(reactFlowWrapper).toBeVisible();

    // Simulate drag and drop
    await firstDraggableNode.dragTo(reactFlowWrapper, {
      targetPosition: { x: 400, y: 300 }
    });

    // Wait for parameter dialog to appear
    await page.waitForSelector('[data-testid="parameter-dialog"]', { timeout: 5000 });
    
    // Confirm the dialog with default parameters
    const confirmButton = page.locator('[data-testid="parameter-dialog-confirm"]');
    await confirmButton.click();
    
    // Wait for the dialog to close
    await page.waitForSelector('[data-testid="parameter-dialog"]', { state: 'hidden' });

    // Wait a moment for any potential duplicate creation
    await page.waitForTimeout(1000);

    // Check the final node count
    const finalNodeCount = await page.evaluate(() => {
      const debugElement = document.querySelector('[data-testid="debug-node-count"]');
      if (debugElement) {
        return parseInt(debugElement.textContent || '0');
      }
      // Fallback: count nodes in ReactFlow
      return document.querySelectorAll('.react-flow__node').length;
    });

    // Verify exactly one node was added
    expect(finalNodeCount).toBe(initialNodeCount + 1);

    // Verify no duplicate nodes by checking unique IDs
    const nodeIds = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.react-flow__node');
      return Array.from(nodes).map(node => node.getAttribute('data-id'));
    });

    const uniqueNodeIds = new Set(nodeIds);
    expect(uniqueNodeIds.size).toBe(nodeIds.length);
  });

  test('should maintain consistent state between graph store and ReactFlow', async ({ page }) => {
    // Listen for console logs to track sync behavior
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('DEBUG') || msg.text().includes('SYNC')) {
        consoleLogs.push(msg.text());
      }
    });

    // Drag a node to trigger sync
    const firstDraggableNode = page.locator('[draggable="true"]').first();
    const reactFlowWrapper = page.locator('.react-flow');
    
    await firstDraggableNode.dragTo(reactFlowWrapper, {
      targetPosition: { x: 400, y: 300 }
    });

    // Confirm parameter dialog
    await page.waitForSelector('[data-testid="parameter-dialog"]', { timeout: 5000 });
    const confirmButton = page.locator('[data-testid="parameter-dialog-confirm"]');
    await confirmButton.click();
    
    // Wait for sync to complete
    await page.waitForTimeout(1000);

    // Verify no force sync messages indicating problematic behavior
    const forceSyncMessages = consoleLogs.filter(log => log.includes('FORCE SYNC'));
    expect(forceSyncMessages.length).toBe(0);

    // Verify proper sync messages
    const syncMessages = consoleLogs.filter(log => log.includes('Syncing nodes'));
    expect(syncMessages.length).toBeGreaterThan(0);
  });

  test('should handle multiple rapid drag operations without duplication', async ({ page }) => {
    const initialNodeCount = await page.evaluate(() => 
      document.querySelectorAll('.react-flow__node').length
    );

    // Perform rapid drag operations
    for (let i = 0; i < 3; i++) {
      const draggableNode = page.locator('[draggable="true"]').nth(i % 2); // Alternate between first two nodes
      const reactFlowWrapper = page.locator('.react-flow');
      
      await draggableNode.dragTo(reactFlowWrapper, {
        targetPosition: { x: 300 + i * 100, y: 200 + i * 50 }
      });

      // Quickly confirm dialog
      await page.waitForSelector('[data-testid="parameter-dialog"]', { timeout: 3000 });
      const confirmButton = page.locator('[data-testid="parameter-dialog-confirm"]');
      await confirmButton.click();
      
      // Brief wait between operations
      await page.waitForTimeout(200);
    }

    // Final wait for all operations to complete
    await page.waitForTimeout(1000);

    // Verify exactly 3 nodes were added
    const finalNodeCount = await page.evaluate(() => 
      document.querySelectorAll('.react-flow__node').length
    );
    
    expect(finalNodeCount).toBe(initialNodeCount + 3);
  });
});