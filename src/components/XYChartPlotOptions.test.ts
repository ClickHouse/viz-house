import { getPlotOptions } from '@/components/XYChartPlotOptions';
import { XYChartProps } from '@/components/XYChartTypes';
import * as HighCharts from 'highcharts';

describe('getPlotOptions', () => {
  it('should return default plot options for bellcurve series', () => {
    const props: XYChartProps = {
      series: [{ type: 'bellcurve', values: [] }]
    };

    const expected: HighCharts.PlotOptions = {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
        stacking: undefined
      },
      series: {
        stacking: undefined
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });

  it('should enable data labels if hasDataLabels is true', () => {
    const props: XYChartProps = {
      series: [{ type: 'line', values: [] }],
      hasDataLabels: true
    };

    const expected: HighCharts.PlotOptions = {
      series: {
        stacking: undefined,
        dataLabels: {
          enabled: true
        }
      },
      column: {
        stacking: undefined
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });

  it('should return default plot options if stacked is false', () => {
    const props: XYChartProps = {
      series: [{ type: 'line', values: [] }],
      stacked: false
    };

    const expected: HighCharts.PlotOptions = {
      column: {
        stacking: undefined
      },
      series: {
        stacking: undefined
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });

  it('should return plot options for stacked bar chart', () => {
    const props: XYChartProps = {
      series: [{ type: 'bar', values: [] }],
      stacked: true,
      hasDataLabels: true
    };

    const expected: HighCharts.PlotOptions = {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          inside: true
        }
      },
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          inside: true
        }
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });

  it('should return plot options for stacked column chart', () => {
    const props: XYChartProps = {
      series: [{ type: 'column', values: [] }],
      stacked: true,
      hasDataLabels: true
    };

    const expected: HighCharts.PlotOptions = {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          inside: true
        }
      },
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          inside: true
        }
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });

  it('should return default plot options if series type is not bar or column', () => {
    const props: XYChartProps = {
      series: [{ type: 'line', values: [] }],
      stacked: true
    };

    const expected: HighCharts.PlotOptions = {
      column: {
        stacking: undefined
      },
      series: {
        stacking: undefined
      }
    };

    const result = getPlotOptions(props);
    expect(result).toEqual(expected);
  });
});
