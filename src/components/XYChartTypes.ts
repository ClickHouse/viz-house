import HighchartsReact from 'highcharts-react-official';
import { GradientColor } from '@/lib/gradients';
import {
  Chart,
  LegendVerticalPosition,
  SeriesName,
  TooltipFormatter,
  TooltipPointFormatter,
  xAxis,
  XYChartValue,
  yAxis,
  YValue
} from '@/types/chartTypes';
import { MutableRefObject } from 'react';

/** The type of XY chart. */
export type XYSeriesType = 'area' | 'bar' | 'bellcurve' | 'column' | 'line' | 'scatter';

export type XYSeriesDescriptor = {
  /** The name of the series displayed in the legend. */
  name?: SeriesName;
  /** The type of the series, defining how it will be rendered. */
  type?: XYSeriesType;
  /** An array of data points for the series. */
  values: Array<XYChartValue> | Array<YValue>;
  /** The color of the series. */
  color?: string;
  /** The fill color of the series, which can be a gradient. */
  fillColor?: string | GradientColor;
};

export interface XYChartProps {
  /** The series data to be displayed on the chart. */
  series: Array<XYSeriesDescriptor>;
  /** A function for that passes a handle to the HighCharts chart as its argument */
  chartRefCallback?: (ref: MutableRefObject<Chart | undefined>) => void;
  /** If true, logs the chart configuration to the console for debugging. */
  debug?: boolean;
  /** If true, shows data labels next to each data point. */
  hasDataLabels?: boolean;
  /** The height of the chart container, can be any valid CSS height value. */
  height?: string;
  /** Allows overriding the default HighchartsReact props. */
  highChartsPropsOverrides?: HighchartsReact.Props;
  /** If true, displays a loading spinner instead of the chart. */
  isLoading?: boolean;
  /** The position of the legend, hidden by default. */
  legendPosition?: LegendVerticalPosition;
  /** Function to format y-axis values in the tooltip. */
  numberFormatter?: (value: number) => string;
  /** If true, stacks the chart series (applies to bar and column types). */
  stacked?: boolean;
  /** The subtitle of the chart. */
  subtitle?: string;
  /** The title of the chart. */
  title?: string;
  /** Function to format the entire tooltip */
  tooltipFormatter?: TooltipFormatter;
  /** Function to format the content of an individual tooltip point (automatically applied to all points). */
  tooltipPointFormatter?: TooltipPointFormatter;
  /* If true, shows vertical grid lines on the chart. */
  verticalGridLines?: boolean;
  /** The width of the chart container, can be any valid CSS width value. */
  width?: string;
  /** Configuration options for the x-axis. */
  xAxis?: xAxis;
  /**
   * Configuration options for the y-axis. Contains either one `yAxis` object or an array of `yAxis` objects.
   * In the case of multiple y-axes, number of series must correspond to the number of y-axes.
   */
  yAxis?: yAxis | yAxis[];
  /** Configuration for zooming, defining minimum and maximum zoom levels. */
  zoom?: { max?: number; min?: number };
}

export const isBarChart = (series: XYSeriesDescriptor[]): boolean => {
  return series.every((s) => s.type === 'bar');
};

export const isColumnChart = (series: XYSeriesDescriptor[]): boolean => {
  return series.every((s) => s.type === 'column');
};
