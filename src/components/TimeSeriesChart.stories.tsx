import { TimeSeriesChart } from '@/components/TimeSeriesChart.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const data1 = [
  { x: '2020-01-01', y: 30000 },
  { x: '2020-01-02', y: 42000 },
  { x: '2020-01-03', y: 89000 },
  { x: '2020-01-04', y: 26 },
  { x: '2020-01-05', y: 12 },
  { x: '2020-01-06', y: 88 },
  { x: '2020-01-07', y: 78 },
  { x: '2020-01-08', y: 75 },
  { x: '2020-01-09', y: 890000 },
  { x: '2020-01-10', y: 92 },
  { x: '2020-01-11', y: 94 },
  { x: '2020-01-12', y: 56 }
];

const meta: Meta<typeof TimeSeriesChart> = {
  title: 'components/TimeSeriesChart',
  component: TimeSeriesChart,
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

export const Line: Story = {
  args: {
    isLoading: false,
    height: '400px',
    series: [{ type: 'line', values: data1 }],
    title: 'Time series chart',
    width: '500px'
  }
};
