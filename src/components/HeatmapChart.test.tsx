import { render, screen } from '@testing-library/react';

import { HeatmapChart } from '@/components/HeatmapChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';

describe('The heatmap chart', () => {
  it('renders a heatmap chart', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '2024-01-01', y: 0, value: 230 },
          { x: '2024-01-01', y: 1, value: 313 },
          { x: '2024-01-02', y: 0, value: 184 },
          { x: '2024-01-02', y: 1, value: 521 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <HeatmapChart
          highChartsPropsOverrides={{
            yAxis: {
              categories: ['Column A', 'Column B'],
              reversed: true
            }
          }}
          series={series}
        />
      </ClickUIWrapper>
    );

    expect(screen.getByText('Column A')).toBeInTheDocument();
    expect(screen.getByText('Column B')).toBeInTheDocument();
  });

  it('displays a loading icon when loading', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '2024-01-01', y: 0, value: 230 },
          { x: '2024-01-01', y: 1, value: 313 },
          { x: '2024-01-02', y: 0, value: 184 },
          { x: '2024-01-02', y: 1, value: 521 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <HeatmapChart isLoading={true} series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
