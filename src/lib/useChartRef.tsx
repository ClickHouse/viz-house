import { useRef, useEffect, MutableRefObject, useCallback } from 'react';
import { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/**
 * Hook to manage Highcharts chart references and callbacks
 *
 * @param chartRefCallback Optional callback to receive the chart reference
 * @returns Object containing chart refs and callback functions
 */
export function useChartRef(
  chartRefCallback?: (ref: MutableRefObject<Chart | undefined>) => void
) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const chartRef = useRef<Chart>();

  const chartCallback = useCallback(
    (chartHandle: Chart) => {
      chartRef.current = chartHandle;

      if (chartRefCallback) {
        chartRefCallback(chartRef);
      }
    },
    [chartRefCallback]
  );

  useEffect(() => {
    if (chartRef.current && chartRefCallback) {
      chartRefCallback(chartRef);
    }
  }, [chartRefCallback]);

  return {
    chartComponentRef,
    chartRef,
    chartCallback
  };
}
