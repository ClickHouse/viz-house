import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapChart } from '@/components/HeatmapChart';
import { ResponsiveContainer } from '@/demoapp/ResponsiveContainer';

const exampleSeriesValues = [
  { x: '1962', y: 0, value: 0 },
  { x: '1962', y: 1, value: 2 },
  { x: '1962', y: 2, value: 0 },
  { x: '1962', y: 3, value: 0 },
  { x: '1963', y: 0, value: 20 },
  { x: '1963', y: 1, value: 6 },
  { x: '1963', y: 2, value: 5 },
  { x: '1963', y: 3, value: 1 },
  { x: '1964', y: 0, value: 23 },
  { x: '1964', y: 1, value: 12 },
  { x: '1964', y: 2, value: 2 },
  { x: '1964', y: 3, value: 2 },
  { x: '1965', y: 0, value: 15 },
  { x: '1965', y: 1, value: 13 },
  { x: '1965', y: 2, value: 4 },
  { x: '1965', y: 3, value: 2 },
  { x: '1966', y: 0, value: 6 },
  { x: '1966', y: 1, value: 6 },
  { x: '1966', y: 2, value: 3 },
  { x: '1966', y: 3, value: 1 },
  { x: '1967', y: 0, value: 10 },
  { x: '1967', y: 1, value: 13 },
  { x: '1967', y: 2, value: 3 },
  { x: '1967', y: 3, value: 1 },
  { x: '1968', y: 0, value: 13 },
  { x: '1968', y: 1, value: 14 },
  { x: '1968', y: 2, value: 3 },
  { x: '1968', y: 3, value: 4 },
  { x: '1969', y: 0, value: 10 },
  { x: '1969', y: 1, value: 10 },
  { x: '1969', y: 2, value: 5 },
  { x: '1969', y: 3, value: 1 },
  { x: '1970', y: 0, value: 5 },
  { x: '1970', y: 1, value: 10 },
  { x: '1970', y: 2, value: 5 },
  { x: '1970', y: 3, value: 0 }
];

const yCategoriesData = [
  { x: 202405, y: 'sev-1', value: 9 },
  { x: 202405, y: 'sev-2', value: 6 },
  { x: 202405, y: 'sev-3', value: 25 },
  { x: 202406, y: 'sev-1', value: 1 },
  { x: 202406, y: 'sev-2', value: 10 },
  { x: 202406, y: 'sev-3', value: 30 },
  { x: 202407, y: 'sev-1', value: 2 },
  { x: 202407, y: 'sev-2', value: 10 },
  { x: 202407, y: 'sev-3', value: 18 }
];

const xAndYCategoriesData = [
  { x: new Date('2024-01-01'), y: 'sev-1', value: 9 },
  { x: new Date('2024-01-02'), y: 'sev-2', value: 6 },
  { x: new Date('2024-01-02'), y: 'sev-3', value: 25 },
  { x: new Date('2024-01-03'), y: 'sev-1', value: 1 },
  { x: new Date('2024-01-03'), y: 'sev-2', value: 10 },
  { x: new Date('2024-01-03'), y: 'sev-3', value: 30 },
  { x: new Date('2024-01-04'), y: 'sev-1', value: 2 },
  { x: new Date('2024-01-05'), y: 'sev-2', value: 10 },
  { x: new Date('2024-01-05'), y: 'sev-3', value: 18 }
];

const meta: Meta<typeof HeatmapChart> = {
  title: 'components/HeatmapChart',
  component: HeatmapChart,
  decorators: [
    (Story) => {
      return (
        <ResponsiveContainer>
          <Story />
        </ResponsiveContainer>
      );
    }
  ],
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
  args: {
    series: [
      {
        values: exampleSeriesValues
      }
    ],
    height: 'inherit',
    width: 'inherit',
    yAxis: {
      categories: ['John', 'Paul', 'George', 'Ringo'],
      reversed: true
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    series: [],
    height: '400px',
    isLoading: true,
    title: 'Loading'
  }
};

export const Primary: Story = {
  args: {
    series: [
      {
        values: exampleSeriesValues
      }
    ],
    height: '400px',
    title: 'Number of songs each Beatle sang lead vocals on by year',
    yAxis: {
      categories: ['John', 'Paul', 'George', 'Ringo'],
      reversed: true
    },
    hasDataLabels: false
  }
};

export const yAxisCategories: Story = {
  args: {
    series: [
      {
        values: yCategoriesData
      }
    ],
    height: '400px',
    title: 'Number of support cases each month by severity',
    yAxis: {
      reversed: true
    },
    hasDataLabels: false
  }
};

export const XAndYAxisCategories: Story = {
  args: {
    series: [
      {
        values: xAndYCategoriesData
      }
    ],
    height: '400px',
    title: 'Number of support cases each month by severity',
    subtitle: 'X axis date generated categories, y axis string generated categories',
    yAxis: {
      reversed: true
    },
    hasDataLabels: false
  }
};
