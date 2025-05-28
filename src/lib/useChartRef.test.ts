import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChartRef } from 'src/lib/useChartRef';
import { Chart } from 'highcharts';

const mockChart = {
  update: vi.fn(),
  options: {
    tooltip: {}
  }
} as unknown as Chart;

describe('useChartRef', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns required properties', () => {
    const mockCallback = vi.fn();

    const { result } = renderHook(() => useChartRef(mockCallback));

    expect(result.current).toHaveProperty('chartComponentRef');
    expect(result.current).toHaveProperty('chartRef');
    expect(result.current).toHaveProperty('chartCallback');
    expect(typeof result.current.chartCallback).toBe('function');
  });

  it('calls chartRefCallback when chart is created', () => {
    const mockCallback = vi.fn();

    const { result } = renderHook(() => useChartRef(mockCallback));

    act(() => {
      result.current.chartCallback(mockChart);
    });

    expect(mockCallback).toHaveBeenCalled();

    // Verify it was called with an object that has the 'current' property
    const callArgument = mockCallback.mock.calls[0][0];
    expect(callArgument).toHaveProperty('current', mockChart);
  });

  it('calls updated callback when it changes', async () => {
    const initialCallback = vi.fn();

    const { result, rerender } = renderHook(({ callback }) => useChartRef(callback), {
      initialProps: { callback: initialCallback }
    });

    act(() => {
      result.current.chartCallback(mockChart);
    });

    expect(initialCallback).toHaveBeenCalledTimes(1);

    initialCallback.mockClear();

    const newCallback = vi.fn();

    rerender({ callback: newCallback });
    expect(newCallback).toHaveBeenCalledTimes(1);
    expect(initialCallback).not.toHaveBeenCalled();
  });

  it('should handle undefined/null callback gracefully', () => {
    const { result: undefinedResult } = renderHook(() => useChartRef(undefined));

    expect(() => {
      act(() => {
        undefinedResult.current.chartCallback(mockChart);
      });
    }).not.toThrow();
  });
});
