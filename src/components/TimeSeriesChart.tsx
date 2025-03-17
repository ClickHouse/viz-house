import { Chart, TimePeriod, XYChartValue, YValue } from '@/types/chartTypes';
import merge from 'lodash/merge';
import React, { MutableRefObject, ReactElement } from 'react';
import {
  XYChart,
  XYChartProps,
  XYSeriesDescriptor
} from '@/components/XYChart';

import { HighchartsReact } from '@/lib/highchartsInitialization';
import { getTooltipDateFormat } from '@/lib/chartUtils';

/**
 * Describes the series data structure for a time series chart.
 * Extends `XYSeriesDescriptor` but replaces the `values` field with an array of `XYChartValue`.
 */
export type TimeSeriesSeriesDescriptor = Omit<XYSeriesDescriptor, 'values'> & {
  /** An array of data points for the series, each containing an X and Y value. */
  values: Array<XYChartValue>;
};

/**
 * Describes the properties for the `TimeSeriesChart` component.
 * Extends `XYChartProps` but replaces the `series` field with an array of `TimeSeriesSeriesDescriptor`.
 */
export type TimeSeriesChartProps = Omit<XYChartProps, 'series'> & {
  /** An array of series descriptors, each representing a series in the chart. */
  series: Array<TimeSeriesSeriesDescriptor>;

  /** A function for getting a chart handle */
  chartRefCallback?: (ref: MutableRefObject<Chart | undefined>) => void;

  /** Optional time period that determines the date format in the tooltip. */
  period?: TimePeriod | string;
};

/**
 * This function calculates the height of chart ticks on the y axis so that the points of the graph
 * fit nicely within the space of the graph.
 *
 * It calculates the highest tick as a function of the maximum value of all points.
 * It then calculates the middle tick as a function of the highest tick.
 *
 * @see https://api.highcharts.com/highstock/yAxis.tickPositioner
 **/
const calculateTickPosition = (maxValue: number): Array<number> => {
  if (maxValue <= 0) {
    return [0];
  }

  const base = 10;
  const exponent = Math.floor(Math.log(maxValue) / Math.log(base));
  const topTick =
    Math.ceil(maxValue / Math.pow(base, exponent)) * Math.pow(base, exponent);
  const middleTick = topTick / 2;
  return [0, middleTick, topTick];
};

const tickPositioner = (seriesData: Array<YValue | null>): Array<number> => {
  const maxValue: number =
    seriesData.length > 1
      ? seriesData.reduce((max: number, value: number | null): number => {
          return Math.max(max, value ?? 0);
        }, 0)
      : seriesData[0] ?? 0;

  return calculateTickPosition(maxValue);
};

const defaultXAxis: XYChartProps['xAxis'] = {
  type: 'datetime',
  verticalLabels: true,
  labelsFormatter: (ctx) => {
    return new Date(ctx.value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
};

/**
 * TimeSeriesChart component.
 * It renders a time series chart using the default settings appropriate for the time series data with correct formatting.
 * @param {TimeSeriesChartProps} props - The properties of the time series chart.
 * @returns {ReactElement} - The pie chart component.
 */
const TimeSeriesChart = ({
  period,
  series,
  xAxis,
  ...props
}: TimeSeriesChartProps): ReactElement => {
  const highchartsOverrides: HighchartsReact.Props = {
    xAxis: {
      type: 'datetime',
      showEmpty: false,
      // See https://api.highcharts.com/highstock/xAxis.dateTimeLabelFormats for defaults.
      // We have 'millis' rounded to 'seconds' to make 1-point mode
      // (when Highcharts can't detect the correct rounding interval) do not show millis at all.
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e. %b',
        week: '%e. %b',
        month: "%b '%y",
        year: '%Y'
      },
      yAxis: {
        tickPositioner: function (): Array<number> {
          const positioners = series
            .map((sd) => sd.values)
            .map((values: Array<XYChartValue> | Array<YValue>) => {
              if (values.length === 0) {
                return [0, 0];
              } else if (typeof values[0] === 'number') {
                return tickPositioner(values as Array<YValue>);
              } else {
                const arrayOfXYValues = values as Array<XYChartValue>;
                return tickPositioner(arrayOfXYValues.map((v) => v.y));
              }
            });

          let maxTopTick = -1;
          let maxTopTickIdx = -1;

          for (let i = 0; i < positioners.length; i++) {
            if (positioners[i][0] > maxTopTick) {
              maxTopTick = positioners[i][2];
              maxTopTickIdx = i;
            }
          }

          return positioners[maxTopTickIdx];
        }
      }
    },
    tooltip: {
      xDateFormat: getTooltipDateFormat(period)
    },
    time: {
      useUTC: false
    }
  };

  const overrides = props.highChartsPropsOverrides
    ? merge(highchartsOverrides, props.highChartsPropsOverrides)
    : highchartsOverrides;

  const timeSeries = series.map((s) => {
    return {
      ...s,
      values: s.values.map((v) => {
        return {
          x: new Date(v.x).getTime(),
          y: v.y
        };
      })
    };
  });

  const customXAxis = xAxis ? merge(defaultXAxis, xAxis) : defaultXAxis;

  return (
    <XYChart
      series={timeSeries}
      xAxis={customXAxis}
      {...props}
      highChartsPropsOverrides={overrides}
    />
  );
};

const MemoizedTimeSeriesChart = React.memo(TimeSeriesChart);
MemoizedTimeSeriesChart.displayName = 'TimeSeriesChart';
export { MemoizedTimeSeriesChart as TimeSeriesChart };
