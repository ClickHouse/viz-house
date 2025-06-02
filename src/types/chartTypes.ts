import {
  HeatmapSeriesDescriptor,
  PieSeriesDescriptor,
  XYSeriesDescriptor
} from '@/components';
import { HighCharts } from '@/lib/highchartsInitialization';

export type AxisLabelsFormatterContext = HighCharts.AxisLabelsFormatterContextObject;

export type Annotation = Pick<
  HighCharts.AxisPlotLinesOptions,
  'color' | 'dashStyle' | 'label' | 'value' | 'width' | 'zIndex'
>;

export type BoostOptions = HighCharts.BoostOptions;

export type Chart = HighCharts.Chart;

export type ColumnType = 'date' | 'number' | 'string';

export interface xAxisColumn {
  column: string;
  type: ColumnType;
}

export interface yAxisColumn {
  column: string;
}

export interface SeriesValue {
  name?: string;
  xAxis: xAxisColumn;
  yAxis: yAxisColumn;
  value?: string;
}

export interface ChartConfig {
  series: Array<SeriesValue>;
}

export type ColorAxis = HighCharts.ColorAxisOptions;

export type EventCallbackFunction<T> = HighCharts.EventCallbackFunction<T>;
export type EventOptionsObject = HighCharts.EventOptionsObject;

export type HeatmapChartValue = { x: XValue; y: HeatmapYValue; value: YValue };

export interface Legend {
  enabled: boolean;
}

// Todo: this should be cleaned up
// https://github.com/ClickHouse/viz-house/issues/6
export type Options = HighCharts.Options;

// PieChartValue is a type that represents the data for a single slice of a pie chart.
export type PieChartValue = {
  name: string;
  y: YValue;
  color?: string;
};

export type Series = HighCharts.Series;

export type SeriesDescriptor =
  | HeatmapSeriesDescriptor
  | PieSeriesDescriptor
  | XYSeriesDescriptor;

export type SeriesName = string;

export type SeriesOptionsType = HighCharts.SeriesOptionsType;

// Todo: this should be cleaned up
// https://github.com/ClickHouse/viz-house/issues/6
export type SeriesPieOptions = HighCharts.SeriesPieOptions;

export type TimePeriod =
  | 'LAST_HOUR'
  | 'LAST_DAY'
  | 'LAST_WEEK'
  | 'LAST_MONTH'
  | 'LAST_YEAR'
  | string;

// Maps to HighCharts.Tooltip
export interface Tooltip {
  outside?: boolean; // When set to true, allows the tooltip to be rendered outside of the chart container
  shared?: boolean; // When set to true, all sereies at that x-axis location will be shown. When set to false, only the currentely hovered series will be shown in the tooltip.
  split?: boolean; // When set to true, every series will be rendered in a different tooltip. When set to false, all series will share the same tooltip
}

export type TooltipFormatter = HighCharts.TooltipFormatterCallbackFunction;

export interface TooltipPointFormatterArgs {
  seriesName?: SeriesName;
  yValue?: number | null;
  xValue?: string | number | Date;
}

export type TooltipPointFormatter = (args: TooltipPointFormatterArgs) => string;

export type XValue = string | number | Date;

export interface xAxis {
  domain?: Array<string | number | Date>;
  labelsFormatter?: (ctx: AxisLabelsFormatterContext) => string;
  min?: number;
  max?: number;
  onZoom?: (event: ZoomEvent) => boolean;
  title?: string;
  type?: HighCharts.AxisTypeValue;
  verticalLabels?: boolean;
}

export type XYChartValue = { x: XValue; y: YValue | null; name?: string };

export type YValue = number;

export type HeatmapYValue = YValue | string;

export interface yAxis {
  title?: string;
  ticks?: Array<number>;
  min?: number;
  max?: number;
  labelsFormatter?: (ctx: AxisLabelsFormatterContext) => string;
  verticalLabels?: boolean;
}

export type YAxisCategories = HighCharts.YAxisOptions['categories'];
export type XAxisCategories = HighCharts.XAxisOptions['categories'];
export type YAxisReversed = HighCharts.YAxisOptions['reversed'];

export type ZoomEvent = HighCharts.ExtremesObject;

export type LegendHorizontalPosition = 'hidden' | 'left' | 'right';
export type LegendVerticalPosition = 'hidden' | 'top' | 'bottom';
