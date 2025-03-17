import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '@/components/PieChart';

// Define meta for the PieChart component
const meta: Meta<typeof PieChart> = {
  title: 'components/PieChart',
  component: PieChart,
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
    legendPosition: {
      control: 'radio',
      options: ['hidden', 'top', 'bottom']
    }
  },
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof meta>;

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

// Primary story
export const Primary: Story = {
  args: {
    series: sampleSeries,
    width: '800px',
    height: '400px',
    title: 'Browser Market Shares',
    isLoading: false,
    legendPosition: 'bottom'
  }
};

// Story with loading state
export const Loading: Story = {
  args: {
    series: [],
    width: '500px',
    height: '400px',
    title: 'Loading...',
    isLoading: true,
    legendPosition: 'bottom'
  }
};

// Large chart story
export const Large: Story = {
  args: {
    series: sampleSeries,
    width: '800px',
    height: '600px',
    title: 'Browser Market Shares - Large',
    isLoading: false,
    legendPosition: 'bottom'
  }
};

// Small chart story
export const Small: Story = {
  args: {
    series: sampleSeries,
    width: '800px',
    height: '200px',
    title: 'Browser Market Shares - Small',
    isLoading: false,
    legendPosition: 'bottom'
  }
};
