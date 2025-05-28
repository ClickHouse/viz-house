import type { Meta, StoryObj } from '@storybook/react';
import { XYChart } from '@/components/XYChart';
import { Gradients } from '@/lib/gradients';
import { Button, Container, useCUITheme } from '@clickhouse/click-ui';
import {
  AxisLabelsFormatterContext,
  TooltipPointFormatterArgs,
  ZoomEvent
} from '@/types/chartTypes';
import { useState } from 'react';

const generateRandomInteger = (min: number, max: number) => {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
  );
};

const generateRandomSeries = (min: number, max: number) => {
  return [
    { x: '2020-01-01', y: generateRandomInteger(min, max) },
    { x: '2020-01-02', y: generateRandomInteger(min, max) },
    { x: '2020-01-03', y: generateRandomInteger(min, max) },
    { x: '2020-01-04', y: generateRandomInteger(min, max) },
    { x: '2020-01-05', y: generateRandomInteger(min, max) },
    { x: '2020-01-06', y: generateRandomInteger(min, max) },
    { x: '2020-01-07', y: generateRandomInteger(min, max) },
    { x: '2020-01-08', y: generateRandomInteger(min, max) },
    { x: '2020-01-09', y: generateRandomInteger(min, max) },
    { x: '2020-01-10', y: generateRandomInteger(min, max) },
    { x: '2020-01-11', y: generateRandomInteger(min, max) },
    { x: '2020-01-12', y: generateRandomInteger(min, max) }
  ];
};

const lData = [
  { x: '2020-01-01', y: 52 },
  { x: '2020-01-02', y: -10 },
  { x: '2020-01-03', y: 20 }
];

const data1 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 42 },
  { x: '2020-01-03', y: 89 },
  { x: '2020-01-04', y: -26 },
  { x: '2020-01-05', y: -12 },
  { x: '2020-01-06', y: -88 },
  { x: '2020-01-07', y: -78 },
  { x: '2020-01-08', y: -75 },
  { x: '2020-01-09', y: -89 },
  { x: '2020-01-10', y: 92 },
  { x: '2020-01-11', y: 94 },
  { x: '2020-01-12', y: 56 }
];

const data2 = [
  { x: '2020-01-01', y: 20 },
  { x: '2020-01-02', y: 8 },
  { x: '2020-01-03', y: 33 },
  { x: '2020-01-04', y: 56 },
  { x: '2020-01-05', y: 52 },
  { x: '2020-01-06', y: 24 },
  { x: '2020-01-07', y: 45 },
  { x: '2020-01-08', y: 34 },
  { x: '2020-01-09', y: 19 },
  { x: '2020-01-10', y: 28 },
  { x: '2020-01-11', y: 34 },
  { x: '2020-01-12', y: 15 }
];

const data3 = [
  { x: '2020-01-01', y: 45 },
  { x: '2020-01-02', y: 77 },
  { x: '2020-01-03', y: 23 },
  { x: '2020-01-04', y: 78 },
  { x: '2020-01-05', y: 95 },
  { x: '2020-01-06', y: 93 },
  { x: '2020-01-07', y: 89 },
  { x: '2020-01-08', y: 76 },
  { x: '2020-01-09', y: 56 },
  { x: '2020-01-10', y: 35 },
  { x: '2020-01-11', y: 22 },
  { x: '2020-01-12', y: 11 }
];

const data10s = [
  { x: '2020-01-01', y: 10 },
  { x: '2020-01-02', y: 20 },
  { x: '2020-01-03', y: 30 }
];

const data100s = [
  { x: '2020-01-01', y: 200 },
  { x: '2020-01-02', y: 300 },
  { x: '2020-01-03', y: 100 }
];

const data1000s = [
  { x: '2020-01-01', y: 3000 },
  { x: '2020-01-02', y: 2000 },
  { x: '2020-01-03', y: 1000 }
];

const numData = [
  { x: 6, y: 45 },
  { x: 12, y: 77 },
  { x: 18, y: 23 },
  { x: 19, y: 78 }
];

const meta: Meta<typeof XYChart> = {
  title: 'components/XYChart',
  component: XYChart,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    series: {
      control: 'object'
    },
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    isLoading: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    },
    subtitle: {
      control: 'text'
    },
    highChartsPropsOverrides: {
      control: 'object'
    },
    hasDataLabels: {
      control: 'boolean'
    }
  },
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof meta>;

const customTooltipPointFormatter = function (args: TooltipPointFormatterArgs) {
  return `Date: ${args.seriesName}<br/>Value: ${args.yValue}`;
};

const customLabelsFormatter = function (ctx: AxisLabelsFormatterContext) {
  return `Custom label: ${ctx.value}`;
};

export const Line: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [{ values: lData }],
    title: 'Line Chart with values that look like the letter L',
    width: '500px',
    tooltipPointFormatter: customTooltipPointFormatter,
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    },
    verticalGridLines: true
  }
};

export const MultipleLineSeriesWithLegend: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) }
    ],
    title: 'Line chart with many series and a legend',
    width: '500px',
    tooltipPointFormatter: customTooltipPointFormatter,
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    },
    verticalGridLines: true,
    legendPosition: 'bottom'
  }
};

export const LineChartWithHorizontalAnnotation: Story = {
  args: {
    isLoading: false,
    height: '400px',
    horizontalAnnotations: [
      {
        color: 'whitesmoke',
        dashStyle: 'LongDash',
        label: { style: { color: '#FFF' }, text: 'Annotation label', y: -5 },
        value: generateRandomInteger(-25, 125)
      }
    ],
    series: [
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) }
    ],
    title: 'Line chart with a horizontal annotation',
    width: '500px',
    tooltipPointFormatter: customTooltipPointFormatter,
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    }
  }
};

export const LineChartWithVerticalAnnotation: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) },
      { values: generateRandomSeries(-50, 150) }
    ],
    title: 'Line chart with a horizontal annotation',
    width: '500px',
    tooltipPointFormatter: customTooltipPointFormatter,
    verticalAnnotations: [
      {
        color: 'dodgerblue',
        dashStyle: 'LongDash',
        label: { style: { color: '#FFF' }, text: 'Annotation label', y: -5 },
        value: generateRandomInteger(0, 11)
      }
    ],
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    }
  }
};

export const Scatter: Story = {
  args: {
    isLoading: false,
    series: [{ values: lData, type: 'scatter' }],
    title: 'Scatter Chart',
    tooltipPointFormatter: customTooltipPointFormatter,
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    }
  }
};

export const BellCurve: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [{ values: lData, type: 'bellcurve' }],
    title: 'Line Chart with values that look like the letter L',
    width: '500px',
    tooltipPointFormatter: customTooltipPointFormatter,
    xAxis: {
      type: 'datetime',
      verticalLabels: true,
      labelsFormatter: customLabelsFormatter
    }
  }
};

export const Bar: Story = {
  args: {
    isLoading: false,
    series: [{ type: 'bar', values: data1 }],
    title: 'Bar charts'
  }
};

export const StackedBar: Story = {
  args: {
    isLoading: false,

    series: [
      { type: 'bar', values: data1, name: 'First series' },
      { type: 'bar', values: data2, name: 'Second series' },
      { type: 'bar', values: data3, name: 'Third series' }
    ],
    yAxis: {
      verticalLabels: true
    },
    title: 'Stacked Bar charts',
    stacked: true,
    hasDataLabels: true,
    legendPosition: 'bottom'
  }
};

export const MultipleYAxisBars: Story = {
  args: {
    isLoading: false,
    series: [
      { type: 'bar', values: data10s, name: 'First series' },
      { type: 'bar', values: data100s, name: 'Second series' },
      { type: 'bar', values: data1000s, name: 'Third series' }
    ],
    title: 'Multiple Y-Axis Bars',
    yAxis: [
      {
        min: 0,
        max: 40
      },
      {
        min: 0,
        max: 400
      },
      {
        min: 0,
        max: 4000
      }
    ]
  }
};

export const Column: Story = {
  args: {
    isLoading: false,
    series: [{ type: 'column', values: data1 }],
    title: 'Column charts'
  }
};

export const StackedColumns: Story = {
  args: {
    isLoading: false,

    series: [
      { type: 'column', values: data1, name: 'First series' },
      { type: 'column', values: data2, name: 'Second series' },
      { type: 'column', values: data3, name: 'Third series' }
    ],
    xAxis: {
      verticalLabels: true
    },
    title: 'Stacked columns',
    stacked: true,
    hasDataLabels: true,
    legendPosition: 'bottom'
  }
};

export const MultipleYAxisColumns: Story = {
  args: {
    isLoading: false,
    series: [
      { type: 'column', values: data10s, name: 'First series' },
      { type: 'column', values: data100s, name: 'Second series' },
      { type: 'column', values: data1000s, name: 'Third series' }
    ],
    title: 'Multiple Y-Axis Bars',
    yAxis: [
      {
        min: 0,
        max: 40
      },
      {
        min: 0,
        max: 400
      },
      {
        min: 0,
        max: 4000
      }
    ]
  }
};

const AreaGraph = () => {
  const cuiTheme = useCUITheme();
  const chartColors = cuiTheme.global.color.chart.bars;

  return (
    <XYChart
      isLoading={false}
      series={[
        { type: 'area', values: data2, color: chartColors.blue },
        {
          type: 'area',
          values: data1,
          color: chartColors.orange,
          fillColor: Gradients.linear(chartColors.orange)
        }
      ]}
      title="Area charts with a gradient"
    />
  );
};

export const Area: Story = {
  render: () => <AreaGraph />,
  tags: ['!autodocs']
};

export const BoundCharts: Story = {
  render: () => {
    const cuiTheme = useCUITheme();
    const chartColors = cuiTheme.global.color.chart.bars;

    const [zoom, setZoom] = useState<{
      min?: number;
      max?: number;
    }>({});

    const zoomIn = () => {
      const min = 4;
      const max = 7;
      setZoom({
        min,
        max
      });
    };

    const resetZoom = () => {
      setZoom({});
    };

    return (
      <Container orientation="vertical" fillWidth minWidth="600px">
        {zoom.min && zoom.max ? (
          <Button onClick={resetZoom}>Reset Zoom</Button>
        ) : (
          <Button onClick={zoomIn}>Zoom</Button>
        )}

        <Container orientation="horizontal" fillWidth>
          <XYChart
            isLoading={false}
            series={[{ values: data2, color: chartColors.blue }]}
            title="Chart 1"
            xAxis={{
              onZoom: (event: ZoomEvent): boolean => {
                console.log(event.min, event.max);
                return true;
              }
            }}
            zoom={{ min: zoom.min, max: zoom.max }}
          />
          <XYChart
            isLoading={false}
            series={[
              {
                values: data2,
                color: chartColors.orange
              }
            ]}
            title="Chart 2"
            xAxis={{
              onZoom: (event: ZoomEvent): boolean => {
                console.log(event.min, event.max);
                return true;
              }
            }}
            zoom={{ min: zoom.min, max: zoom.max }}
          />
        </Container>
      </Container>
    );
  }
};

export const Loading: Story = {
  args: {
    isLoading: true,
    series: [],
    title: 'Loading...'
  }
};

export const ClippedAxesLine: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [{ values: numData }],
    title: 'Line Chart with x-axis and y-axis range settings',
    width: '500px',
    xAxis: {
      type: 'category',
      verticalLabels: true,
      min: 12,
      max: 17
    },
    yAxis: {
      min: 35,
      max: 65
    }
  }
};
