import { ReactElement, useEffect } from 'react';
import { HighCharts, HighchartsReact } from '@/lib/highchartsInitialization';
import { Loading } from '@/components/Loading';
import { XYChartProps, XYSeriesDescriptor } from '@/components/XYChartTypes';
import { getXYChartOptions } from '@/components/XYChartOptions.ts';
import { useChartRef } from 'src/lib/useChartRef';

export type { XYChartProps, XYSeriesDescriptor };

export function XYChart({
  highChartsPropsOverrides,
  isLoading = false,
  width = '100%',
  height = '100%',
  zoom,
  ...options
}: XYChartProps): ReactElement {
  const { chartRefCallback } = options;

  const { chartComponentRef, chartRef, chartCallback } = useChartRef(chartRefCallback);

  useEffect(() => {
    if (chartRef?.current && Array.isArray(chartRef.current.xAxis)) {
      chartRef.current.xAxis[0].setExtremes(zoom?.min, zoom?.max);
    }
  }, [chartRef, zoom?.max, zoom?.min]);

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
