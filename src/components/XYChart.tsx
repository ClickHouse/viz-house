import { ReactElement, useEffect, useRef } from 'react';
import { HighCharts, HighchartsReact } from '@/lib/highchartsInitialization';
import { Loading } from '@/components/Loading';
import { XYChartProps, XYSeriesDescriptor } from '@/components/XYChartTypes';
import { getXYChartOptions } from '@/components/XYChartOptions.ts';
import { Chart } from '@/types/chartTypes';

export type { XYChartProps, XYSeriesDescriptor };

export function XYChart({
  highChartsPropsOverrides,
  isLoading = false,
  width = '100%',
  height = '100%',
  zoom,
  ...options
}: XYChartProps): ReactElement {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const chart = useRef<Chart>();

  const chartCallback = (chartHandle: Chart) => {
    chart.current = chartHandle;
  };

  useEffect(() => {
    if (chart?.current && Array.isArray(chart.current.xAxis)) {
      chart.current.xAxis[0].setExtremes(zoom?.min, zoom?.max);
    }
  }, [chart.current, zoom?.max, zoom?.min]);

  const { chartRefCallback } = options;
  useEffect(() => {
    if (chartRefCallback) {
      chartRefCallback(chart);
    }
  }, [chartRefCallback, chart]);

  if (isLoading) {
    return <Loading height={height} width={width} />;
  }

  const config = getXYChartOptions({
    ...options,
    highChartsPropsOverrides
  });

  return (
    <HighchartsReact
      options={config}
      ref={chartComponentRef}
      highcharts={HighCharts}
      containerProps={{ style: { width, height } }}
      callback={chartCallback}
    />
  );
}
