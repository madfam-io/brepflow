import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Enhanced3DViewport } from './Enhanced3DViewport';

describe('Enhanced3DViewport', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('triggers tool change callbacks and toggles active state', () => {
    const onToolChange = vi.fn();

    render(<Enhanced3DViewport onToolChange={onToolChange} />);

    const panButton = screen.getByRole('button', { name: /Pan \(P\)/i });
    fireEvent.click(panButton);

    expect(onToolChange).toHaveBeenCalledWith('pan');
    expect(panButton).toHaveClass('active');
  });

  it('opens measurement panel when selecting measurement tools', () => {
    render(<Enhanced3DViewport />);

    const distanceButton = screen.getByRole('button', { name: /Distance/i });
    fireEvent.click(distanceButton);

    expect(screen.getByRole('heading', { name: /Measurements/i })).toBeInTheDocument();

    // Hidden helper button still available for tests
    act(() => {
      fireEvent.click(screen.getByText('Add Distance'));
    });

    expect(screen.queryByText(/No measurements/i)).not.toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /Delete measurement/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText(/No measurements/i)).toBeInTheDocument();
  });

  it('responds to keyboard shortcuts for tool switching', () => {
    const onToolChange = vi.fn();

    render(<Enhanced3DViewport onToolChange={onToolChange} />);

    act(() => {
      fireEvent.keyDown(window, { key: 'S' });
    });

    expect(onToolChange).toHaveBeenCalledWith('shaded');
    const shadedButton = screen.getByRole('button', { name: /Shaded \(S\)/i });
    expect(shadedButton).toHaveClass('active');
  });

  it('invokes view change callback when selecting navigation cube faces', () => {
    const onViewChange = vi.fn();

    render(<Enhanced3DViewport onViewChange={onViewChange} />);

    const frontButton = screen.getAllByRole('button', { name: /Front/i })[0];
    fireEvent.click(frontButton);

    expect(onViewChange).toHaveBeenCalledWith('front');
  });
});
