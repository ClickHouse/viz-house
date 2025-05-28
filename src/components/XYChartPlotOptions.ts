// getPlotOptions.ts
import * as HighCharts from 'highcharts';
import merge from 'lodash/merge';
import { XYChartProps, isBarChart, isColumnChart } from '@/components/XYChartTypes';

/**
 * Generates and returns the plot options for a HighCharts chart based on the provided viz-house chart properties.
 * @param {Object} params - The viz-house parameters:
 * @param {Array} params.series - The series data for the chart.
 * @param {boolean} [params.hasDataLabels] - Indicates whether data labels should be visible or not.
 * @param {boolean} [params.stacked] - Indicates whether the chart data series should be stacked as bars or columns.
 * @returns {HighCharts.PlotOptions} The plot options to be applied to the HighCharts chart.
 */
export function getPlotOptions({
  series,
  hasDataLabels,
  stacked
}: XYChartProps): HighCharts.PlotOptions {
  const defaultPlotOptions: HighCharts.PlotOptions = {
    series: {
      stacking: undefined
    },
    column: {
      stacking: undefined
    }
  };

  const isBellCurve = series.some((s) => s.type === 'bellcurve');
  if (isBellCurve) {
    defaultPlotOptions.column = {
      ...defaultPlotOptions.column,
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
      shadow: false
    };
  }

  if (hasDataLabels !== undefined) {
    defaultPlotOptions.series = {
      ...defaultPlotOptions.series,
      dataLabels: {
        enabled: hasDataLabels
      }
    };
  }

  const hasBarsOrColumns = stacked && (isBarChart(series) || isColumnChart(series));
  if (!hasBarsOrColumns) {
    return defaultPlotOptions;
  }

  // Bar/columns or stacked bar/columns chart
  const plotOptions: HighCharts.PlotOptions = {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: hasDataLabels,
        inside: true
      }
    },
    series: {
      stacking: 'normal',
      dataLabels: {
        enabled: hasDataLabels,
        inside: true
      }
    }
  };

  return merge(defaultPlotOptions, plotOptions);
}
