import { MutableRefObject, ReactElement } from 'react';
import { HighCharts, HighchartsReact } from '@/lib/highchartsInitialization';

import { GradientColor } from '@/lib/gradients';
import {
  ColorAxis,
  HeatmapChartValue,
  LegendHorizontalPosition,
  SeriesOptionsType,
  TooltipFormatter,
  TooltipPointFormatter,
  YAxisCategories,
  XAxisCategories,
  YAxisReversed,
  YValue,
  xAxis,
  yAxis,
  Chart,
  PropsOverrides
} from '@/types/chartTypes';
import {
  getDefaultLegendOptions,
  getDefaultXAxisOptions,
  getDefaultYAxisOptions
} from '@/lib/chartUtils';
import { getDefaultTooltipOptions } from '@/lib/tooltip';
import merge from 'lodash/merge';
import { CUIThemeType, useCUITheme } from '@clickhouse/click-ui';
import { Loading } from '@/components/Loading';
import { useChartRef } from 'src/lib/useChartRef';

/**
 * Interface representing the Y-axis configuration for a heatmap chart.
 */
export interface HeatmapYAxis extends yAxis {
  /** Category names for the Y-axis. */
  categories?: YAxisCategories;

  /** Indicates whether the Y-axis is reversed. */
  reversed?: YAxisReversed;
}

/**
 * Interface representing the X-axis configuration for a heatmap chart.
 */
export interface HeatmapXAxis extends xAxis {
  /** Category names for the X-axis. */
  categories?: XAxisCategories;
}

/**
 * Type representing a series descriptor for a heatmap chart.
 */
export type HeatmapSeriesDescriptor = {
  /** Name of the series. */
  name?: string;

  /** Type of the series, which should always be 'heatmap' for a heatmap chart. */
  type?: 'heatmap';

  /** Array of values for the heatmap series. */
  values: Array<HeatmapChartValue> | Array<YValue>;

  /** Color of the series. */
  color?: string;

  /** Fill color of the series, which can be a string or a gradient color object. */
  fillColor?: string | GradientColor;
};

/**
 * Interface representing the properties for a heatmap chart component.
 */
export interface HeatmapChartProps {
  /** Array of series descriptors for the heatmap chart. */
  series: Array<HeatmapSeriesDescriptor>;

  /** Configuration for the color axis of the heatmap. */
  colorAxis?: ColorAxis;

  /** Height of the heatmap chart. */
  height?: string;

  /** Overrides for the Highcharts React properties. */
  highChartsPropsOverrides?: PropsOverrides;

  /** Indicates whether the chart is in a loading state. */
  isLoading?: boolean;

  /** Subtitle of the heatmap chart. */
  subtitle?: string;

  /** Title of the heatmap chart. */
  title?: string;

  /** Function to format the entire tooltip */
  tooltipFormatter?: TooltipFormatter;

  /** Function to format the content of an individual tooltip point (automatically applied to all points). */
  tooltipPointFormatter?: TooltipPointFormatter;

  /** Width of the heatmap chart. */
  width?: string;

  /** Configuration for the X-axis of the heatmap chart. */
  xAxis?: xAxis;

  /** Configuration for the Y-axis of the heatmap chart. */
  yAxis?: HeatmapYAxis;

  /** Indicates whether data labels are displayed on the heatmap. */
  hasDataLabels?: boolean;

  /** Position of the legend. */
  legendPosition?: LegendHorizontalPosition;

  /** A function for that passes a handle to the HighCharts chart as its argument */
  chartRefCallback?: (ref: MutableRefObject<Chart | undefined>) => void;
}

const getMaxSeriesValue = (series: Array<HeatmapSeriesDescriptor>): number => {
  return series.reduce((allSeriesMax: number, s) => {
    return Math.max(
      allSeriesMax,
      s.values.reduce((max: number, seriesValue) => {
        const value = Array.isArray(seriesValue)
          ? seriesValue[2]
          : (seriesValue as HeatmapChartValue).value;
        return Math.max(max, value);
      }, 0)
    );
  }, 0);
};

const getMinSeriesValue = (series: Array<HeatmapSeriesDescriptor>): number => {
  return series.reduce((allSeriesMin: number, s) => {
    return Math.min(
      allSeriesMin,
      s.values.reduce((min: number, seriesValue) => {
        const value = Array.isArray(seriesValue)
          ? seriesValue[2]
          : (seriesValue as HeatmapChartValue).value;
        return Math.min(min, value);
      }, 0)
    );
  }, 0);
};

const getXAxisOptions = (options: HeatmapChartProps): HighCharts.XAxisOptions => {
  const xAxisOptions = getDefaultXAxisOptions();

  const { title, domain, type } = options?.xAxis ?? {};

  if (title) {
    xAxisOptions.title = {
      text: title
    };
  }

  if (domain) {
    xAxisOptions.categories = domain.map((d) => d.toString());
  }

  if (type) {
    xAxisOptions.type = type;
  }

  xAxisOptions.labels = xAxisOptions.labels ?? {};
  xAxisOptions.labels.rotation = options?.xAxis?.verticalLabels ? -45 : 0;

  if (options?.highChartsPropsOverrides?.xAxis) {
    return merge(xAxisOptions, options.highChartsPropsOverrides.xAxis);
  }

  return xAxisOptions;
};

const getYAxisOptions = (options: HeatmapChartProps): HighCharts.YAxisOptions => {
  const yAxisOptions = getDefaultYAxisOptions();

  const { categories, max, min, reversed, ticks, title } = options?.yAxis ?? {};

  if (title) {
    yAxisOptions.title = {
      text: title
    };
  }

  if (categories) {
    yAxisOptions.categories = categories;
  }

  if (reversed) {
    yAxisOptions.reversed = reversed;
  }

  if (ticks) {
    yAxisOptions.tickPositions = ticks;
  }

  if (min) {
    yAxisOptions.min = min;
  }

  if (max) {
    yAxisOptions.max = max;
  }

  if (options?.highChartsPropsOverrides?.yAxis) {
    return merge(yAxisOptions, options.highChartsPropsOverrides.yAxis);
  }

  return yAxisOptions;
};

const getTooltipOptions = (options: HeatmapChartProps): Highcharts.TooltipOptions => {
  const tooltipOptions = getDefaultTooltipOptions(
    options.tooltipPointFormatter,
    options.tooltipFormatter
  );

  if (options?.highChartsPropsOverrides?.tooltip) {
    return merge(tooltipOptions, options.highChartsPropsOverrides.tooltip);
  }

  return tooltipOptions;
};

const getLegendOptions = (options: HeatmapChartProps): HighCharts.LegendOptions => {
  const legendOptions = getDefaultLegendOptions();

  if (options.legendPosition) {
    if (options.legendPosition === 'hidden') {
      legendOptions.enabled = false;
    } else {
      legendOptions.enabled = true;
      legendOptions.align = options.legendPosition === 'left' ? 'left' : 'right';
      legendOptions.layout = 'vertical';
      legendOptions.verticalAlign = 'middle';
    }
  }

  return legendOptions;
};

const processCategories = (
  value: number | string | Date,
  categories: string[],
  indices: Record<string, number>
): number | Date => {
  if (typeof value === 'string' || value instanceof Date) {
    const key = value.toString();
    if (indices[key] === undefined) {
      indices[key] = categories.length;
      categories.push(value.toString());
    }

    return indices[key];
  }

  // Return int value, no need to categorize
  return value;
};

interface HighchartSeriesProps {
  series: SeriesOptionsType[];
  xAxisCategories: string[] | undefined;
  yAxisCategories: string[] | undefined;
}

const getHighchartSeries = (options: HeatmapChartProps): HighchartSeriesProps => {
  const getFillColor = (color: string | GradientColor) => {
    if (typeof color === 'string') {
      return color;
    }

    return {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: color
    };
  };

  const xCategories: string[] = [];
  const yCategories: string[] = [];
  const xIndices: Record<string, number> = {};
  const yIndices: Record<string, number> = {};

  const processedSeries = options.series.map(({ name, values, color, fillColor }) => {
    const data = values.map((value) => {
      if (typeof value === 'number') {
        return value;
      }

      const x = processCategories(value.x, xCategories, xIndices);
      const y = processCategories(value.y, yCategories, yIndices);

      return [x, y, value.value];
    });

    return {
      name,
      type: 'heatmap',
      data,
      color,
      fillColor: fillColor ? getFillColor(fillColor) : undefined,
      borderColor: color
    };
  }) as SeriesOptionsType[];

  return {
    series: processedSeries,
    xAxisCategories: xCategories.length > 0 ? xCategories : undefined,
    yAxisCategories: yCategories.length > 0 ? yCategories : undefined
  };
};

const getColorAxisOptions = (
  options: HeatmapChartProps,
  cuiTheme: CUIThemeType
): HighCharts.ColorAxisOptions => {
  const colorAxisOptions: Highcharts.ColorAxisOptions = {
    min: getMinSeriesValue(options.series),
    max: getMaxSeriesValue(options.series),
    labels: {
      style: {
        color: cuiTheme.global.color.text.muted
      }
    },
    minColor: cuiTheme.global.color.background.default,
    maxColor: cuiTheme.global.color.chart.bars.orange
  };

  if (options?.highChartsPropsOverrides?.colorAxis) {
    return merge(colorAxisOptions, options.highChartsPropsOverrides.colorAxis);
  }

  return colorAxisOptions;
};

function getPlotOptions(props: HeatmapChartProps): HighCharts.PlotOptions {
  const plotOptions: HighCharts.PlotOptions = {};
  if (props.hasDataLabels !== undefined) {
    plotOptions.series = {
      dataLabels: {
        enabled: props.hasDataLabels
      }
    };
  }

  return plotOptions;
}

interface GetHeatmapChartOptionsProps {
  additionalOptions: HeatmapChartProps;
  cuiTheme: CUIThemeType;
}

const getHeatmapChartOptions = ({
  additionalOptions,
  cuiTheme
}: GetHeatmapChartOptionsProps) => {
  const options: Partial<HighCharts.Options> = {};

  if (additionalOptions.title) {
    options.title = { text: additionalOptions.title };
  } else {
    options.title = { text: '' };
  }

  const { series, xAxisCategories, yAxisCategories } =
    getHighchartSeries(additionalOptions);

  options.series = series;
  options.xAxis = getXAxisOptions(additionalOptions);
  options.yAxis = getYAxisOptions(additionalOptions);
  options.tooltip = getTooltipOptions(additionalOptions);
  options.legend = getLegendOptions(additionalOptions);
  options.colorAxis = getColorAxisOptions({ ...additionalOptions }, cuiTheme);
  options.plotOptions = getPlotOptions(additionalOptions);

  if (xAxisCategories) {
    options.xAxis.categories = xAxisCategories;
  }

  if (yAxisCategories) {
    options.yAxis.categories = yAxisCategories;
  }

  // Merge with any overrides from highChartsPropsOverrides
  if (additionalOptions.highChartsPropsOverrides) {
    return merge(options, additionalOptions.highChartsPropsOverrides);
  }

  return options;
};

export const HeatmapChart = ({
  height = 'inherit',
  isLoading = false,
  width = 'inherit',
  ...additionalOptions
}: HeatmapChartProps): ReactElement => {
  const cuiTheme = useCUITheme();
  const { chartRefCallback } = additionalOptions;

  const { chartComponentRef, chartCallback } = useChartRef(chartRefCallback);

  if (isLoading) {
    return <Loading height={height} width={width} />;
  }

  const options = getHeatmapChartOptions({
    additionalOptions,
    cuiTheme
  });

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
