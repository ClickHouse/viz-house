import {
  getXYChartOptions,
  getYAxisOptions
} from '@/components/XYChartOptions';
import { XYChartProps } from '@/components/XYChartTypes';
import { HighCharts } from '@/lib/highchartsInitialization';
import { AxisLabelsFormatterContextObject, YAxisOptions } from 'highcharts';

const seriesValues = [
  {
    x: 0,
    y: -20
  },
  {
    x: 1,
    y: -10
  },
  {
    x: 2,
    y: -10
  }
];

describe('getXYChartOptions', () => {
  it("doesn't limit y-axis min and max values by default", () => {
    const props: XYChartProps = {
      series: [
        {
          name: 'negative',
          type: 'column',
          values: seriesValues
        }
      ]
    };

    const result = getXYChartOptions(props);
    expect(result.yAxis).toBeDefined();
    const options: YAxisOptions | YAxisOptions[] | undefined = result.yAxis;
    expect(Array.isArray(options) || options === undefined).toBe(false);

    // Make sure no min/max value is defined
    expect(options).not.toHaveProperty('min');
    expect(options).not.toHaveProperty('max');
  });

  it('contains y-axis min and max values when they provided to the chart', () => {
    const props: XYChartProps = {
      yAxis: {
        min: -98,
        max: 32
      },
      series: [
        {
          name: 'negative',
          type: 'column',
          values: seriesValues
        }
      ]
    };

    const result = getXYChartOptions(props);
    expect(result.yAxis).toBeDefined();
    const options: YAxisOptions | YAxisOptions[] | undefined = result.yAxis;
    expect(Array.isArray(options) || options === undefined).toBe(false);

    // Make sure correct min/max values are defined
    expect(options).toHaveProperty('min', -98);
    expect(options).toHaveProperty('max', 32);
  });

  it('should return a single YAxisOptions object when props.yAxis is a single value', () => {
    const labelsFormatter = (value: AxisLabelsFormatterContextObject) =>
      `Value: ${value}`;
    const props: XYChartProps = {
      yAxis: {
        title: 'Y Axis',
        min: 0,
        max: 10,
        verticalLabels: true,
        labelsFormatter
      },
      series: []
    };

    const result = getYAxisOptions(props) as HighCharts.YAxisOptions;

    expect(result).toBeDefined();
    expect(result.title?.text).toBe('Y Axis');
    expect(result.min).toBe(0);
    expect(result.max).toBe(10);
    expect(result.labels?.rotation).toBe(-45);
    expect(result.labels?.formatter).toBe(labelsFormatter);
  });

  it('should return an array of YAxisOptions objects when props.yAxis is an array', () => {
    const labelsFormatter1 = (value: AxisLabelsFormatterContextObject) =>
      `Value: ${value}`;
    const labelsFormatter2 = (value: AxisLabelsFormatterContextObject) =>
      `Formatted: ${value}`;

    const props: XYChartProps = {
      yAxis: [
        {
          title: 'Y Axis 1',
          min: 0,
          max: 10,
          verticalLabels: true,
          labelsFormatter: labelsFormatter1
        },
        {
          title: 'Y Axis 2',
          verticalLabels: false,
          labelsFormatter: labelsFormatter2
        }
      ],
      series: []
    };

    const result = getYAxisOptions(props) as HighCharts.YAxisOptions[];

    expect(result).toBeDefined();
    expect(result.length).toBe(2);

    expect(result[0].title?.text).toBe('Y Axis 1');
    expect(result[0].min).toBe(0);
    expect(result[0].max).toBe(10);
    expect(result[0].labels?.rotation).toBe(-45);
    expect(result[0].labels?.formatter).toBe(labelsFormatter1);

    expect(result[1].title?.text).toBe('Y Axis 2');
    expect(result[1].min).toBeUndefined();
    expect(result[1].max).toBeUndefined();
    expect(result[1].labels?.rotation).toBe(0);
    expect(result[1].labels?.formatter).toBe(labelsFormatter2);
    expect(result[1].opposite).toBe(true);
  });
});
