import { render, screen } from '@testing-library/react';

import {
  TimeSeriesChart,
  TimeSeriesSeriesDescriptor
} from '@/components/TimeSeriesChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

describe('TimeSeriesChart', () => {
  it('renders without crashing', () => {
    const date1 = new Date('January 1, 2024');
    const date2 = new Date('February 01, 2024');

    const series: Array<TimeSeriesSeriesDescriptor> = [
      {
        name: 'Test Series',
        type: 'line',
        values: [
          { x: date1.valueOf(), y: 10928 },
          { x: date2.valueOf(), y: 22873 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <TimeSeriesChart series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByText(formatDate(date1))).toBeInTheDocument();
    expect(screen.getByText(formatDate(date2))).toBeInTheDocument();
  });

  it('displays loading when isLoading is true', () => {
    const series = [
      {
        name: 'Test Series',
        values: [
          { x: '2024-01-01', y: 10928 },
          { x: '2024-02-05', y: 22873 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <TimeSeriesChart series={series} isLoading />
      </ClickUIWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
