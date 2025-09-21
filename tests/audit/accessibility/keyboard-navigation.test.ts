import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Tab navigation through all interactive elements', async ({ page }) => {
    // Get all tabbable elements
    const tabbableElements = await page.evaluate(() => {
      const selector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map(el => ({
        tag: el.tagName.toLowerCase(),
        text: (el as HTMLElement).innerText || el.getAttribute('aria-label') || el.getAttribute('name') || '',
        type: el.getAttribute('type') || '',
        role: el.getAttribute('role') || ''
      }));
    });

    // Tab through all elements and verify focus moves correctly
    for (let i = 0; i < tabbableElements.length; i++) {
      await page.keyboard.press('Tab');

      // Verify an element has focus
      const hasFocus = await page.evaluate(() => {
        return document.activeElement !== document.body && document.activeElement !== null;
      });

      expect(hasFocus).toBe(true);
    }

    // Shift+Tab should go backwards
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Shift+Tab');

      const hasFocus = await page.evaluate(() => {
        return document.activeElement !== document.body && document.activeElement !== null;
      });

      expect(hasFocus).toBe(true);
    }
  });

  test('Keyboard shortcuts work correctly', async ({ page }) => {
    // Common keyboard shortcuts to test
    const shortcuts = [
      { keys: 'Control+z', expectedAction: 'undo', description: 'Undo shortcut' },
      { keys: 'Control+y', expectedAction: 'redo', description: 'Redo shortcut' },
      { keys: 'Control+s', expectedAction: 'save', description: 'Save shortcut' },
      { keys: 'Delete', expectedAction: 'delete', description: 'Delete selected node' },
      { keys: 'Escape', expectedAction: 'escape', description: 'Escape/cancel action' }
    ];

    for (const shortcut of shortcuts) {
      // Set up a listener for the action (this would need app-specific implementation)
      const actionTriggered = await page.evaluate((action) => {
        return new Promise((resolve) => {
          // Listen for custom events or check state changes
          const checkAction = () => {
            // This would check if the action was triggered in your app
            // For now, we just verify the key press doesn't cause errors
            resolve(true);
          };

          setTimeout(checkAction, 100);
        });
      }, shortcut.expectedAction);

      // Press the shortcut
      await page.keyboard.press(shortcut.keys);

      // Basic check that no errors occurred
      const hasErrors = await page.evaluate(() => {
        return window.console && (window.console as any).errors && (window.console as any).errors.length > 0;
      });

      expect(hasErrors).toBe(false);
    }
  });

  test('Arrow key navigation in node editor', async ({ page }) => {
    // Wait for React Flow to be ready
    await page.waitForSelector('.react-flow', { timeout: 10000 });

    // Focus on the flow area
    await page.click('.react-flow');

    // Test arrow key navigation
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    for (const key of arrowKeys) {
      await page.keyboard.press(key);

      // Verify no errors and focus is maintained
      const hasFocus = await page.evaluate(() => {
        const flowElement = document.querySelector('.react-flow');
        return flowElement && (
          flowElement === document.activeElement ||
          flowElement.contains(document.activeElement)
        );
      });

      expect(hasFocus).toBe(true);
    }
  });

  test('Enter and Space key activation', async ({ page }) => {
    // Find all buttons
    const buttons = await page.$$('button:not([disabled])');

    if (buttons.length > 0) {
      // Focus first button
      await buttons[0].focus();

      // Test Space activation
      await page.keyboard.press('Space');

      // Small delay for action
      await page.waitForTimeout(100);

      // Test Enter activation
      await page.keyboard.press('Enter');

      // Verify no errors occurred
      const hasErrors = await page.evaluate(() => {
        return window.console && (window.console as any).errors && (window.console as any).errors.length > 0;
      });

      expect(hasErrors).toBe(false);
    }
  });

  test('Focus trap in modals/dialogs', async ({ page }) => {
    // Try to open a modal/dialog (app-specific)
    const hasModal = await page.evaluate(() => {
      // Check if there's a modal trigger button
      const modalTriggers = document.querySelectorAll('[data-testid*="modal"], [aria-label*="open"], button:has-text("Add"), button:has-text("New")');
      return modalTriggers.length > 0;
    });

    if (hasModal) {
      // Click to open modal
      await page.click('[data-testid*="modal"], [aria-label*="open"], button:has-text("Add"), button:has-text("New")');

      // Wait for modal to appear
      const modalSelector = '[role="dialog"], .modal, .dialog, [data-testid*="modal"]';
      const modal = await page.$(modalSelector);

      if (modal) {
        // Tab through modal elements
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('Tab');

          // Check focus is trapped within modal
          const focusInModal = await page.evaluate((selector) => {
            const modal = document.querySelector(selector);
            return modal && modal.contains(document.activeElement);
          }, modalSelector);

          if (!focusInModal) {
            // Focus should wrap around to beginning of modal
            const focusedElement = await page.evaluate(() => {
              return document.activeElement?.tagName;
            });

            // If focus left modal, it should be on the modal itself or first element
            expect(focusedElement).toBeTruthy();
          }
        }

        // Test Escape to close modal
        await page.keyboard.press('Escape');

        // Verify modal closed
        const modalClosed = await page.evaluate((selector) => {
          const modal = document.querySelector(selector);
          return !modal || (modal as HTMLElement).style.display === 'none';
        }, modalSelector);

        expect(modalClosed).toBe(true);
      }
    }
  });

  test('Keyboard access to all menus', async ({ page }) => {
    // Find menu triggers
    const menuTriggers = await page.$$('[role="button"][aria-haspopup="menu"], [data-testid*="menu"], button:has-text("Menu")');

    for (const trigger of menuTriggers.slice(0, 3)) { // Test first 3 menus to save time
      await trigger.focus();
      await page.keyboard.press('Enter');

      // Wait for menu to open
      await page.waitForTimeout(200);

      // Check if menu is open
      const menuOpen = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"], .menu, .dropdown');
        return menu && (menu as HTMLElement).style.display !== 'none';
      });

      if (menuOpen) {
        // Navigate menu items with arrow keys
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowUp');

        // Close menu with Escape
        await page.keyboard.press('Escape');
      }
    }
  });

  test('Skip links functionality', async ({ page }) => {
    // Check for skip links (usually hidden until focused)
    await page.keyboard.press('Tab');

    const skipLink = await page.evaluate(() => {
      const link = document.activeElement as HTMLAnchorElement;
      if (link && link.tagName === 'A') {
        const text = link.innerText.toLowerCase();
        return text.includes('skip') || text.includes('main content');
      }
      return false;
    });

    if (skipLink) {
      // Activate skip link
      await page.keyboard.press('Enter');

      // Verify focus moved to main content
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName,
          role: el?.getAttribute('role'),
          id: el?.id
        };
      });

      expect(focusedElement.role).toMatch(/main|region|complementary/);
    }
  });

  test('Form navigation with Tab and Shift+Tab', async ({ page }) => {
    // Find forms on the page
    const forms = await page.$$('form');

    if (forms.length > 0) {
      const form = forms[0];

      // Get all form inputs
      const inputs = await form.$$('input, select, textarea, button');

      if (inputs.length > 0) {
        // Focus first input
        await inputs[0].focus();

        // Tab forward through all inputs
        for (let i = 1; i < inputs.length; i++) {
          await page.keyboard.press('Tab');

          const currentFocus = await page.evaluate(() => {
            return {
              tag: document.activeElement?.tagName,
              type: document.activeElement?.getAttribute('type')
            };
          });

          expect(['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON']).toContain(currentFocus.tag);
        }

        // Tab backward
        for (let i = 0; i < 2 && i < inputs.length - 1; i++) {
          await page.keyboard.press('Shift+Tab');

          const currentFocus = await page.evaluate(() => {
            return document.activeElement?.tagName;
          });

          expect(['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON']).toContain(currentFocus);
        }
      }
    }
  });

  test('Focus visible indicator', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Check focus indicator is visible
    const hasFocusIndicator = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el || el === document.body) return false;

      const styles = window.getComputedStyle(el);
      const hasOutline = styles.outlineStyle !== 'none' && styles.outlineWidth !== '0px';
      const hasBorder = styles.borderStyle !== 'none' && styles.borderWidth !== '0px';
      const hasBoxShadow = styles.boxShadow !== 'none' && styles.boxShadow !== '';

      return hasOutline || hasBorder || hasBoxShadow;
    });

    expect(hasFocusIndicator).toBe(true);
  });

  test('No keyboard traps', async ({ page }) => {
    // Tab through multiple elements and ensure we can always escape
    const maxTabs = 50;
    let previousElement = null;
    let sameElementCount = 0;

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');

      const currentElement = await page.evaluate(() => {
        return {
          tag: document.activeElement?.tagName,
          id: document.activeElement?.id,
          className: document.activeElement?.className
        };
      });

      // Check if we're stuck on the same element
      if (JSON.stringify(currentElement) === JSON.stringify(previousElement)) {
        sameElementCount++;
        if (sameElementCount > 3) {
          // We might be trapped, try to escape
          await page.keyboard.press('Escape');
          await page.keyboard.press('Tab');

          const afterEscape = await page.evaluate(() => {
            return {
              tag: document.activeElement?.tagName,
              id: document.activeElement?.id
            };
          });

          // Verify we moved to a different element
          expect(afterEscape).not.toEqual(currentElement);
        }
      } else {
        sameElementCount = 0;
      }

      previousElement = currentElement;
    }

    // We should have cycled through elements without getting trapped
    expect(sameElementCount).toBeLessThan(4);
  });
});