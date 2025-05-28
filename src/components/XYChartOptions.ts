import { HighCharts } from '@/lib/highchartsInitialization';
import merge from 'lodash/merge';
import { GradientColor } from '@/lib/gradients';
import {
  getDefaultLegendOptions,
  getDefaultXAxisOptions,
  getDefaultYAxisOptions
} from '@/lib/chartUtils';
import { getDefaultTooltipOptions } from '@/lib/tooltip';
import { getPlotOptions } from '@/components/XYChartPlotOptions';
import { isBarChart, XYChartProps } from '@/components/XYChartTypes';
import { SeriesOptionsType } from '@/types/chartTypes';
import isEmpty from 'lodash/isEmpty';

function getXAxisOptions(props: XYChartProps): HighCharts.XAxisOptions {
  const xAxisOptions = getDefaultXAxisOptions();

  const { domain, onZoom, title, type, min, max } = props?.xAxis ?? {};

  xAxisOptions.labels = xAxisOptions.labels ?? {};
  xAxisOptions.labels.rotation = props?.xAxis?.verticalLabels ? -45 : undefined;
  xAxisOptions.labels.autoRotation = props?.labelAutoRotation ?? undefined;
  // Default rotation for x-axis labels when there is not enough space to show every label.
  // It must be set to non-zero value in order to enable automatic skipping of labels
  // in case when there is not enough space.
  // Lower value like -9 degree forces it to prefer non-rotated labels when possible.
  xAxisOptions.labels.autoRotation = [-9];
  xAxisOptions.labels.formatter =
    props?.xAxis?.labelsFormatter || xAxisOptions.labels.formatter;

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

  if (min !== undefined) {
    xAxisOptions.min = min;
  }

  if (max !== undefined) {
    xAxisOptions.max = max;
  }

  if (onZoom) {
    xAxisOptions.events = {
      setExtremes: onZoom
    };
  }

  xAxisOptions.gridLineWidth = props.verticalGridLines ? 1 : undefined;

  if (Array.isArray(props.verticalAnnotations)) {
    xAxisOptions.plotLines = props.verticalAnnotations.map((annotation) => {
      return {
        color: annotation.color ?? '#00FFD4',
        dashStyle: annotation.dashStyle ?? 'Solid',
        label: annotation.label,
        value: annotation.value,
        width: 1,
        zIndex: annotation.zIndex ?? 2 // above gridlines but below chart lines
      };
    });
  }

  return xAxisOptions;
}

export function getYAxisOptions(
  props: XYChartProps
): HighCharts.YAxisOptions | HighCharts.YAxisOptions[] {
  const yAxisOptionsArray: HighCharts.YAxisOptions[] = [];

  if (Array.isArray(props.yAxis) && props.series.length !== props.yAxis.length) {
    console.warn('Number of series must correspond to the number of y-axes');
  }

  const yAxisPropsArray = Array.isArray(props.yAxis) ? props.yAxis : [props.yAxis];

  yAxisPropsArray.forEach((yAxisProps, index) => {
    const yAxisOptions = getDefaultYAxisOptions();

    const { title, ticks, min, max } = yAxisProps ?? {};

    if (title) {
      yAxisOptions.title = {
        text: title
      };
    }

    yAxisOptions.labels = yAxisOptions.labels ?? {};
    yAxisOptions.labels.formatter =
      yAxisProps?.labelsFormatter || yAxisOptions.labels.formatter;
    yAxisOptions.labels.rotation = yAxisProps?.verticalLabels ? -45 : 0;

    if (ticks) {
      yAxisOptions.tickPositions = ticks;
    }

    if (min !== undefined) {
      yAxisOptions.min = min;
    }

    if (max !== undefined) {
      yAxisOptions.max = max;
    }

    if (index % 2) {
      yAxisOptions.opposite = true;
    }

    if (Array.isArray(props.horizontalAnnotations)) {
      yAxisOptions.plotLines = props.horizontalAnnotations.map((annotation) => {
        return {
          color: annotation.color ?? '#00FFD4',
          dashStyle: annotation.dashStyle ?? 'Solid',
          label: annotation.label,
          value: annotation.value,
          width: 1,
          zIndex: annotation.zIndex ?? 2 // above gridlines but below chart lines
        };
      });
    }

    yAxisOptionsArray.push(yAxisOptions);
  });

  return yAxisOptionsArray.length === 1 ? yAxisOptionsArray[0] : yAxisOptionsArray;
}

function getChartOptions(props: XYChartProps): HighCharts.ChartOptions {
  return {
    zooming: {
      type: 'x'
    },
    numberFormatter: props.numberFormatter ? props.numberFormatter : undefined
  };
}

function getTooltipOptions(props: XYChartProps): HighCharts.TooltipOptions {
  const tooltipOptions = getDefaultTooltipOptions(
    props.tooltipPointFormatter,
    props.tooltipFormatter
  );

  if (!isEmpty(props.tooltip)) {
    if (props.tooltip.outside !== undefined) {
      tooltipOptions.outside = props.tooltip.outside;
    }

    if (props.tooltip.shared !== undefined) {
      tooltipOptions.shared = props.tooltip.shared;
    }

    if (props.tooltip.split !== undefined) {
      tooltipOptions.split = props.tooltip.split;
    }
  }

  return tooltipOptions;
}

function getLegendOptions(props: XYChartProps): HighCharts.LegendOptions {
  const legendOptions = getDefaultLegendOptions();

  if (isBarChart(props.series)) {
    legendOptions.reversed = true;
  }

  switch (props.legendPosition) {
    case 'hidden':
      legendOptions.enabled = false;
      break;
    case 'top':
      legendOptions.enabled = true;
      legendOptions.verticalAlign = 'top';
      break;
    case 'bottom':
      legendOptions.enabled = true;
      legendOptions.verticalAlign = 'bottom';
      break;
    default:
      legendOptions.enabled = false;
  }

  return legendOptions;
}

function getHighchartSeries(props: XYChartProps): SeriesOptionsType[] {
  const series = props.series;

  const getFillColor = (color: string | GradientColor) => {
    if (typeof color === 'string') {
      return color;
    }

    return {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: color
    };
  };

  return series.map(({ name, type, values, color, fillColor }, idx) => {
    const data = values.map((value) => {
      if (typeof value === 'number') {
        return value;
      }

      return value.name !== undefined ? value : [value.x, value.y];
    });

    if (type === 'bellcurve') {
      return {
        type: 'bellcurve',
        zIndex: idx + 1,
        color,
        name,
        marker: {
          enabled: false
        },
        fillColor: fillColor ? getFillColor(fillColor) : 'transparent',
        data
      };
    }
    const yAxisCount = Array.isArray(props.yAxis) ? props.yAxis.length : 1;
    const result = {
      name,
      type: type ?? 'line',
      data,
      color,
      marker: {
        enabled: type === 'scatter'
      },
      // Assign the series to the first yAxis if there are more series than yAxes
      yAxis: idx < yAxisCount ? idx : 0,
      fillColor: fillColor ? getFillColor(fillColor) : undefined,
      borderColor: color
    };
    if (result.fillColor === undefined) {
      delete result.fillColor;
    }
    return result;
  }) as SeriesOptionsType[];
}

const getTitleOptions = (props: XYChartProps): HighCharts.TitleOptions => {
  return {
    text: props?.title ?? ''
  };
};

export function getXYChartOptions(props: XYChartProps): HighCharts.Options {
  let result: Partial<HighCharts.Options> = {};
  if (props.title) {
    result.title = { text: props.title };
  } else {
    result.title = { text: '' };
  }

  if (!isEmpty(props.boost)) {
    result.boost = props.boost;
  }

  result.chart = getChartOptions(props);
  result.legend = getLegendOptions(props);
  result.plotOptions = getPlotOptions(props);
  result.series = getHighchartSeries(props);
  result.title = getTitleOptions(props);
  result.tooltip = getTooltipOptions(props);
  result.xAxis = getXAxisOptions(props);
  result.yAxis = getYAxisOptions(props);

  if (props.highChartsPropsOverrides) {
    result = merge(result, props.highChartsPropsOverrides);
  }

  if (props.debug) {
    console.log(result);
  }

  return result as HighCharts.Options;
}
