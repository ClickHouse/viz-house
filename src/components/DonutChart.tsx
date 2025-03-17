import { ReactElement } from 'react';
import { HighCharts } from '@/lib/highchartsInitialization';

import { PieChart, PieChartProps } from '@/components/PieChart';
import { Loading } from '@/components/Loading';

const DEFAULT_INNER_SIZE = '85%';

interface DonutChartProps extends PieChartProps {
  // Specify an inner size to create a donut chart. Can be a number representing pixes like 250 or a percentage like 80%
  innerSize?: HighCharts.PlotPieOptions['innerSize'];
}

export const DonutChart = ({
  height = 'inherit',
  innerSize = DEFAULT_INNER_SIZE,
  isLoading = false,
  width = 'inherit',
  highChartsPropsOverrides,
  ...additionalOptions
}: DonutChartProps): ReactElement => {
  if (isLoading) {
    return <Loading height={height} width={width} />;
  }

  return (
    <PieChart
      {...additionalOptions}
      series={additionalOptions.series}
      height={height}
      isLoading={isLoading}
      width={width}
      highChartsPropsOverrides={{
        ...highChartsPropsOverrides,
        innerSize
      }}
    />
  );
};
