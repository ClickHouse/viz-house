import { MutableRefObject, ReactElement } from 'react';
import { HighCharts, HighchartsReact } from '@/lib/highchartsInitialization';
import { GradientColor } from '@/lib/gradients';
import {
  Chart,
  LegendVerticalPosition,
  PieChartValue,
  TooltipFormatter,
  TooltipPointFormatter
} from '@/types/chartTypes';
import { getDefaultLegendOptions } from '@/lib/chartUtils';
import { getDefaultTooltipOptions } from '@/lib/tooltip';
import merge from 'lodash/merge';
import { Loading } from '@/components/Loading';
import { useChartRef } from 'src/lib/useChartRef';

// Description of a single series in a pie chart.
export type PieSeriesDescriptor = {
  name?: string;
  values: Array<PieChartValue>;
  fillColor?: string | GradientColor;
};

/**
 * Properties for the Pie/Donut chart components.
 */
export interface PieChartProps {
  /**
   * Array of data series to display in the pie chart.
   * Note: Highcharts PieChart support multiple series, however they overlap by default and don't look nice.
   */
  series: Array<PieSeriesDescriptor>;

  /**
   * Width of the chart. Should be a CSS string like 'inherit' or '85%'.
   */
  width?: string;

  /**
   * Height of the chart. Should be a CSS string like 'inherit' or '400px'.
   */
  height?: string;

  /**
   * Flag to indicate if the chart is loading.
   */
  isLoading?: boolean;

  /**
   * Highcharts props to override the default options.
   */
  highChartsPropsOverrides?: HighchartsReact.Props;

  /**
   * Title and subtitle of the chart.
   */
  subtitle?: string;
  title?: string;

  /**
   * Function to format the entire tooltip
   */
  tooltipFormatter?: TooltipFormatter;

  /**
   * Function to format the content of an individual tooltip point (automatically applied to all points).
   */
  tooltipPointFormatter?: TooltipPointFormatter;

  /**
   * Position of the legend, hidden by default.
   */
  legendPosition?: LegendVerticalPosition;
  /** A function for that passes a handle to the HighCharts chart as its argument */
  chartRefCallback?: (ref: MutableRefObject<Chart | undefined>) => void;
}
/**
 * Convert viz-house PieChart options to Highcharts tooltip options.
 * @param {PieChartProps} options - The properties of the pie chart.
 * @returns {Highcharts.TooltipOptions} - The tooltip options for the pie chart.
 */
const getTooltipOptions = (options: PieChartProps): Highcharts.TooltipOptions => {
  const tooltipOptions = getDefaultTooltipOptions(
    options.tooltipPointFormatter,
    options.tooltipFormatter
  );

  if (options?.highChartsPropsOverrides?.tooltip) {
    return merge(tooltipOptions, options.highChartsPropsOverrides.tooltip);
  }

  return tooltipOptions;
};

/**
 * Convert viz-house PieChart options to Highcharts legend options.
 * @param {PieChartProps} options - The properties of the pie chart.
 * @returns {Highcharts.LegendOptions} - The legend options for the pie chart.
 */
const getLegendOptions = (options: PieChartProps): HighCharts.LegendOptions => {
  const legendOptions = getDefaultLegendOptions();
  if (options.legendPosition) {
    legendOptions.enabled = options.legendPosition !== 'hidden';
    legendOptions.verticalAlign = options.legendPosition === 'top' ? 'top' : 'bottom';
  }

  if (options?.highChartsPropsOverrides?.legend) {
    return merge(legendOptions, options.highChartsPropsOverrides.legend);
  }

  return legendOptions;
};

/**
 * Convert viz-house PieChart series to Highcharts series.
 * @param {PieChartProps} options - The properties of the pie chart.
 * @returns {Highcharts.SeriesPieOptions[]} - The series options for the pie chart.
 */
const getHighchartSeries = (options: PieChartProps): HighCharts.SeriesPieOptions[] => {
  return options.series.map(({ name, values, fillColor }) => {
    const data = values.map((value) => {
      return {
        name: value.name,
        y: value.y,
        color: value.color,
        fillColor: fillColor
      };
    });

    return {
      type: 'pie',
      name,
      data,
      // If legend is enabled, all series should be shown in the legend.
      showInLegend: true,
      innerSize: options.highChartsPropsOverrides?.innerSize
    };
  }) as HighCharts.SeriesPieOptions[];
};

/**
 * Get the HighCharts options for the pie chart.
 * @param {PieChartProps} additionalOptions - The properties of the pie chart in viz-house format.
 * @returns {Partial<HighCharts.Options>} - The HighCharts options for the pie chart.
 */
const getPieChartOptions = (additionalOptions: PieChartProps) => {
  const options: Partial<HighCharts.Options> = {};

  if (additionalOptions.title) {
    options.title = { text: additionalOptions.title };
  } else {
    options.title = { text: '' };
  }

  options.tooltip = getTooltipOptions(additionalOptions);
  options.legend = getLegendOptions(additionalOptions);
  options.series = getHighchartSeries(additionalOptions);
  // Show data values instead of category names on the pie chart.
  options.plotOptions = {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.y}'
      }
    }
  };

  const { highChartsPropsOverrides } = additionalOptions;
  return {
    ...highChartsPropsOverrides,
    ...options
  };
};

/**
 * PieChart component.
 * @param {PieChartProps} props - The properties of the pie chart.
 * @returns {ReactElement} - The pie chart component.
 */
export const PieChart = ({
  height = 'inherit',
  width = 'inherit',
  isLoading = false,
  ...additionalOptions
}: PieChartProps): ReactElement => {
  const { chartRefCallback } = additionalOptions;

  const { chartComponentRef, chartCallback } = useChartRef(chartRefCallback);

  if (isLoading) {
    return <Loading height={height} width={width} />;
  }

  const options = getPieChartOptions(additionalOptions);
  const containerProps = { style: { height, width } };
  return (
    <HighchartsReact
      options={options}
      ref={chartComponentRef}
      highcharts={HighCharts}
      containerProps={containerProps}
      callback={chartCallback}
    />
  );
};
