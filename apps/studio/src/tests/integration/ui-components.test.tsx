import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Import enhanced UI components
import { Button, IconButton } from '../../components/ui/Button';
import { Panel, PanelSection } from '../../components/ui/Panel';
import { Input, NumberInput, CoordinateInput } from '../../components/ui/Input';
import { Enhanced3DViewport } from '../../components/viewport/Enhanced3DViewport';

describe('Enhanced UI Components Integration Tests', () => {
  describe('Button Component System', () => {
    it('renders all button variants with correct styling', () => {
      const { container } = render(
        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      );

      expect(container.querySelector('.btn-primary')).toBeInTheDocument();
      expect(container.querySelector('.btn-secondary')).toBeInTheDocument();
      expect(container.querySelector('.btn-tertiary')).toBeInTheDocument();
      expect(container.querySelector('.btn-ghost')).toBeInTheDocument();
      expect(container.querySelector('.btn-danger')).toBeInTheDocument();
    });

    it('handles loading state correctly', async () => {
      const { rerender } = render(<Button loading={false}>Click me</Button>);

      expect(screen.getByText('Click me')).toBeVisible();

      rerender(<Button loading={true}>Click me</Button>);

      expect(screen.queryByText('Click me')).not.toBeVisible();
      expect(document.querySelector('.btn-loading')).toBeInTheDocument();
    });

    it('supports icon integration with proper positioning', () => {
      render(
        <div>
          <Button icon="save" iconPosition="left">Save</Button>
          <Button icon="download" iconPosition="right">Download</Button>
          <IconButton icon="settings" aria-label="Settings" />
        </div>
      );

      expect(document.querySelector('.btn-icon-left')).toBeInTheDocument();
      expect(document.querySelector('.btn-icon-right')).toBeInTheDocument();
      expect(document.querySelector('.btn-icon')).toBeInTheDocument();
    });

    it('maintains accessibility with keyboard navigation', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Accessible Button</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();

      fireEvent.keyDown(button, { key: 'Enter' });
      expect(onClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(button, { key: ' ' });
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Panel System with Collapsible/Resizable', () => {
    it('toggles collapse state with animation', async () => {
      const onCollapse = vi.fn();
      render(
        <Panel
          title="Test Panel"
          collapsible
          onCollapse={onCollapse}
        >
          <div>Panel Content</div>
        </Panel>
      );

      const collapseBtn = screen.getByRole('button', { name: /collapse panel/i });
      const content = screen.getByText('Panel Content');

      expect(content).toBeVisible();

      await userEvent.click(collapseBtn);

      expect(onCollapse).toHaveBeenCalledWith(true);
      await waitFor(() => {
        expect(content.parentElement).toHaveClass('panel-content-collapsed');
      });
    });

    it('handles resize with constraints', () => {
      const onResize = vi.fn();
      const { container } = render(
        <Panel
          title="Resizable Panel"
          resizable
          minWidth={200}
          maxWidth={600}
          onResize={onResize}
        >
          Content
        </Panel>
      );

      const resizeHandle = container.querySelector('.panel-resize-handle');
      expect(resizeHandle).toBeInTheDocument();

      // Simulate resize drag
      fireEvent.mouseDown(resizeHandle!, { clientX: 300 });
      fireEvent.mouseMove(document, { clientX: 400 });
      fireEvent.mouseUp(document);

      expect(onResize).toHaveBeenCalled();
    });

    it('renders nested panel sections with independent collapse', async () => {
      render(
        <Panel title="Main Panel">
          <PanelSection title="Section 1" collapsible>
            <div>Section 1 Content</div>
          </PanelSection>
          <PanelSection title="Section 2" collapsible defaultCollapsed>
            <div>Section 2 Content</div>
          </PanelSection>
        </Panel>
      );

      expect(screen.getByText('Section 1 Content')).toBeVisible();
      expect(screen.getByText('Section 2 Content').parentElement).toHaveClass('panel-section-content-collapsed');

      const section1Btn = screen.getAllByRole('button', { name: /collapse section/i })[0];
      await userEvent.click(section1Btn);

      await waitFor(() => {
        expect(screen.getByText('Section 1 Content').parentElement).toHaveClass('panel-section-content-collapsed');
      });
    });

    it('supports floating variant with backdrop blur', () => {
      const { container } = render(
        <Panel variant="floating" title="Floating Panel">
          Floating content
        </Panel>
      );

      const panel = container.querySelector('.panel-floating');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveStyle({ position: 'absolute' });
    });
  });

  describe('Professional Input Controls', () => {
    it('renders input with validation states', async () => {
      const { rerender } = render(
        <Input
          label="Email"
          type="email"
          required
          helpText="Enter your email"
        />
      );

      expect(screen.getByText('Enter your email')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument(); // Required indicator

      rerender(
        <Input
          label="Email"
          type="email"
          errorText="Invalid email format"
        />
      );

      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email format');
      expect(document.querySelector('.form-input-error')).toBeInTheDocument();
    });

    it('handles NumberInput with precision and constraints', async () => {
      const onValueChange = vi.fn();
      render(
        <NumberInput
          label="Width"
          value={100}
          min={0}
          max={500}
          step={10}
          precision={2}
          unit="mm"
          onValueChange={onValueChange}
          showSteppers
        />
      );

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      // Test manual input
      await userEvent.clear(input);
      await userEvent.type(input, '150.555');

      // Should apply precision
      expect(onValueChange).toHaveBeenLastCalledWith(150.56);

      // Test steppers
      const upButton = screen.getByRole('button', { name: /increase/i });
      await userEvent.click(upButton);

      expect(onValueChange).toHaveBeenLastCalledWith(160.56);

      // Test max constraint
      await userEvent.clear(input);
      await userEvent.type(input, '600');

      expect(onValueChange).toHaveBeenLastCalledWith(500); // Clamped to max
    });

    it('handles CoordinateInput with 3D values', async () => {
      const onChange = vi.fn();
      render(
        <CoordinateInput
          value={{ x: 10, y: 20, z: 30 }}
          onChange={onChange}
          unit="mm"
          precision={1}
        />
      );

      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs).toHaveLength(3);

      // Modify X coordinate
      await userEvent.clear(inputs[0]);
      await userEvent.type(inputs[0], '15.5');

      expect(onChange).toHaveBeenLastCalledWith({ x: 15.5, y: 20, z: 30 });
    });

    it('supports clearable input with proper interaction', async () => {
      const onClear = vi.fn();
      const onChange = vi.fn();

      render(
        <Input
          value="Test value"
          clearable
          onClear={onClear}
          onChange={onChange}
        />
      );

      const clearBtn = screen.getByRole('button', { name: /clear/i });
      await userEvent.click(clearBtn);

      expect(onClear).toHaveBeenCalled();
    });
  });

  describe('Enhanced 3D Viewport', () => {
    it('renders viewport with all tool groups', () => {
      render(
        <Enhanced3DViewport
          onToolChange={vi.fn()}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      // Check for tool groups
      expect(document.querySelector('.viewport-toolbar')).toBeInTheDocument();
      expect(document.querySelector('.navigation-cube')).toBeInTheDocument();
      expect(document.querySelector('.coordinate-display')).toBeInTheDocument();
      expect(document.querySelector('.scale-indicator')).toBeInTheDocument();
      expect(document.querySelector('.performance-monitor')).toBeInTheDocument();
    });

    it('handles tool selection and activation', async () => {
      const onToolChange = vi.fn();
      render(
        <Enhanced3DViewport
          onToolChange={onToolChange}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      // Find pan tool button
      const panTool = screen.getByRole('button', { name: /Pan \(P\)/i });
      await userEvent.click(panTool);

      expect(onToolChange).toHaveBeenCalledWith('pan');
      expect(panTool.parentElement).toHaveClass('active');
    });

    it('supports keyboard shortcuts for tools', () => {
      const onToolChange = vi.fn();
      render(
        <Enhanced3DViewport
          onToolChange={onToolChange}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      // Simulate keyboard shortcut
      fireEvent.keyDown(window, { key: 'o' });
      expect(onToolChange).toHaveBeenCalledWith('orbit');

      fireEvent.keyDown(window, { key: 'f' });
      expect(onToolChange).toHaveBeenCalledWith('fit');
    });

    it('displays measurement panel when measurement tools active', async () => {
      const { container } = render(
        <Enhanced3DViewport
          onToolChange={vi.fn()}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      const measureTool = screen.getByRole('button', { name: /Distance/i });
      await userEvent.click(measureTool);

      await waitFor(() => {
        expect(container.querySelector('.measurement-panel')).toBeInTheDocument();
      });
    });

    it('updates coordinate display on mouse movement', async () => {
      const { container } = render(
        <Enhanced3DViewport
          onToolChange={vi.fn()}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      const viewport = container.querySelector('.enhanced-viewport');

      // Simulate mouse movement
      fireEvent.mouseMove(viewport!, { clientX: 100, clientY: 100 });

      await waitFor(() => {
        const coordDisplay = container.querySelector('.coordinate-display');
        expect(coordDisplay).toBeInTheDocument();
        expect(coordDisplay?.querySelector('.coord-value')).toBeInTheDocument();
      });
    });
  });

  describe('Component Integration Workflows', () => {
    it('integrates Panel with Input controls for property editing', async () => {
      const onParameterChange = vi.fn();

      render(
        <Panel title="Node Properties" collapsible>
          <PanelSection title="Geometry">
            <NumberInput
              label="Width"
              value={100}
              unit="mm"
              onValueChange={(v) => onParameterChange('width', v)}
            />
            <NumberInput
              label="Height"
              value={50}
              unit="mm"
              onValueChange={(v) => onParameterChange('height', v)}
            />
          </PanelSection>
          <PanelSection title="Position">
            <CoordinateInput
              value={{ x: 0, y: 0, z: 0 }}
              onChange={(coords) => onParameterChange('position', coords)}
            />
          </PanelSection>
        </Panel>
      );

      // Test integrated workflow
      const widthInput = screen.getByLabelText(/width/i) as HTMLInputElement;
      await userEvent.clear(widthInput);
      await userEvent.type(widthInput, '200');

      expect(onParameterChange).toHaveBeenCalledWith('width', 200);

      // Test coordinate input integration
      const coordInputs = screen.getAllByRole('spinbutton');
      await userEvent.clear(coordInputs[2]); // X coordinate
      await userEvent.type(coordInputs[2], '10');

      expect(onParameterChange).toHaveBeenCalledWith('position', { x: 10, y: 0, z: 0 });
    });

    it('maintains performance with multiple complex components', () => {
      const startTime = performance.now();

      const { container } = render(
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <Panel key={i} title={`Panel ${i}`} resizable collapsible>
              <PanelSection title="Section 1">
                <NumberInput label="Value 1" value={0} />
                <NumberInput label="Value 2" value={0} />
              </PanelSection>
              <PanelSection title="Section 2">
                <CoordinateInput value={{ x: 0, y: 0, z: 0 }} />
              </PanelSection>
            </Panel>
          ))}
        </div>
      );

      const renderTime = performance.now() - startTime;

      // Should render within reasonable time
      expect(renderTime).toBeLessThan(100);

      // All panels should be rendered
      expect(container.querySelectorAll('.panel')).toHaveLength(10);
    });
  });

  describe('Accessibility Compliance', () => {
    it('supports full keyboard navigation', async () => {
      render(
        <Panel title="Accessible Panel" collapsible>
          <Input label="Field 1" />
          <NumberInput label="Field 2" value={0} showSteppers />
          <Button>Submit</Button>
        </Panel>
      );

      // Tab through elements
      const collapseBtn = screen.getByRole('button', { name: /collapse/i });
      const input1 = screen.getByLabelText(/field 1/i);
      const input2 = screen.getByLabelText(/field 2/i);
      const submitBtn = screen.getByRole('button', { name: /submit/i });

      collapseBtn.focus();
      expect(collapseBtn).toHaveFocus();

      fireEvent.keyDown(collapseBtn, { key: 'Tab' });
      expect(input1).toHaveFocus();

      fireEvent.keyDown(input1, { key: 'Tab' });
      expect(input2).toHaveFocus();

      fireEvent.keyDown(input2, { key: 'Tab' });
      // Skip steppers (tabIndex=-1)
      expect(submitBtn).toHaveFocus();
    });

    it('provides proper ARIA labels and roles', () => {
      render(
        <div>
          <Panel title="ARIA Panel" role="region" aria-label="Properties panel">
            <Input label="Name" required aria-describedby="name-help" />
            <div id="name-help">Enter your full name</div>
          </Panel>
        </div>
      );

      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Properties panel');
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-describedby', 'name-help');
    });

    it('handles focus trap in floating panels', async () => {
      const { container } = render(
        <Panel variant="floating" title="Modal Panel">
          <Input label="Field 1" />
          <Input label="Field 2" />
          <Button>Close</Button>
        </Panel>
      );

      const panel = container.querySelector('.panel-floating');
      expect(panel).toBeInTheDocument();

      // Verify focus management
      const inputs = screen.getAllByRole('textbox');
      const button = screen.getByRole('button', { name: /close/i });

      inputs[0].focus();
      expect(inputs[0]).toHaveFocus();

      // Tab should cycle within panel
      fireEvent.keyDown(inputs[0], { key: 'Tab' });
      expect(inputs[1]).toHaveFocus();

      fireEvent.keyDown(inputs[1], { key: 'Tab' });
      expect(button).toHaveFocus();
    });
  });

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      // Mock dark mode preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
    });

    it('applies dark mode styles correctly', () => {
      const { container } = render(
        <div>
          <Panel title="Dark Mode Panel">
            <Input label="Dark Input" />
            <Button>Dark Button</Button>
          </Panel>
        </div>
      );

      // Verify dark mode CSS variables are applied
      const styles = getComputedStyle(document.documentElement);
      expect(styles.getPropertyValue('--color-bg-primary')).toBeTruthy();
    });
  });

  describe('Performance Monitoring', () => {
    it('monitors and reports viewport performance', async () => {
      const { container } = render(
        <Enhanced3DViewport
          onToolChange={vi.fn()}
          onViewChange={vi.fn()}
          onMeasurement={vi.fn()}
        />
      );

      const perfMonitor = container.querySelector('.performance-monitor');
      expect(perfMonitor).toBeInTheDocument();

      // Wait for performance update
      await waitFor(() => {
        const fpsValue = perfMonitor?.querySelector('.perf-value');
        expect(fpsValue).toBeInTheDocument();

        const fps = parseFloat(fpsValue?.textContent || '0');
        expect(fps).toBeGreaterThan(0);
        expect(fps).toBeLessThanOrEqual(60);
      }, { timeout: 2000 });
    });
  });
});