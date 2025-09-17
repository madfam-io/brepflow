import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    const { container } = render(<Icon name="settings" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  it('renders with custom size', () => {
    const { container } = render(<Icon name="save" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="close" className="custom-icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('icon');
    expect(svg).toHaveClass('custom-icon');
  });

  it('renders different icon names', () => {
    const icons = ['save', 'close', 'settings', 'warning', 'error', 'success'];

    icons.forEach(iconName => {
      const { container } = render(<Icon name={iconName as any} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('handles unknown icon names gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Icon name={'unknown' as any} />);

    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Icon "unknown" not found');

    consoleSpy.mockRestore();
  });

  it('applies title for accessibility', () => {
    const { container } = render(<Icon name="settings" title="Settings" />);
    const svg = container.querySelector('svg');
    const title = svg?.querySelector('title');

    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Settings');
    expect(svg).toHaveAttribute('aria-hidden', 'false');
    expect(svg).toHaveAttribute('role', 'img');
  });

  it('has correct default accessibility attributes', () => {
    const { container } = render(<Icon name="settings" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('role', 'presentation');
  });

  it('has correct viewBox', () => {
    const { container } = render(<Icon name="settings" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders SVG path content', () => {
    const { container } = render(<Icon name="close" />);
    const svg = container.querySelector('svg');
    const g = svg?.querySelector('g');

    expect(g).toBeInTheDocument();
    // Check that the SVG path content is rendered
    expect(g?.innerHTML).toContain('stroke="currentColor"');
    expect(g?.innerHTML).toContain('stroke-width="2"');
  });

  it('applies default icon class', () => {
    const { container } = render(<Icon name="settings" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('icon');
  });
});