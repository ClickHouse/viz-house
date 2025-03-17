import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from '@/components/DonutChart';

// Sample data for the stories
const sampleSeries = [
  {
    name: 'Browsers Market Share',
    values: [
      { name: 'Chrome', y: 61.41 },
      { name: 'IE', y: 11.84 },
      { name: 'Firefox', y: 10.85 },
      { name: 'Edge', y: 4.67 },
      { name: 'Safari', y: 4.18 },
      { name: 'Other', y: 7.05 }
    ]
  }
];

// Define meta for the DonutChart component
const meta: Meta<typeof DonutChart> = {
  title: 'components/DonutChart',
  component: DonutChart,
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
    innerSize: {
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
    legendPosition: {
      control: 'radio',
      options: ['hidden', 'top', 'bottom']
    }
  },
  args: {
    series: sampleSeries,
    height: '500px',
    innerSize: '85%',
    width: '500px'
  },
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof meta>;

// Primary story with default innerSize
export const Primary: Story = {
  args: {
    series: sampleSeries,
    isLoading: false,
    title: 'Browser Market Shares',
    height: '500px',
    width: '800px',
    legendPosition: 'bottom'
  }
};

// Story with loading state
export const Loading: Story = {
  args: {
    series: [],
    isLoading: true,
    height: '500px',
    title: 'Loading...',
    width: '500px'
  }
};

// Large chart story
export const SmallInnnerSize: Story = {
  args: {
    series: sampleSeries,
    height: '500px',
    innerSize: 65,
    isLoading: false,
    title: 'Browser Market Shares - 65px innerSize',
    width: '800px',
    legendPosition: 'bottom'
  }
};
