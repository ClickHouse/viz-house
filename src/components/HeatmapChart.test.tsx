import { render, screen } from '@testing-library/react';

import { HeatmapChart } from '@/components/HeatmapChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';

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

  it('calls chartRefCallback with chart reference', () => {
    const mockChartRefCallback = vi.fn();

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
        <HeatmapChart series={series} chartRefCallback={mockChartRefCallback} />
      </ClickUIWrapper>
    );

    expect(mockChartRefCallback).toHaveBeenCalled();

    // Get the argument passed to the callback
    const callArg = mockChartRefCallback.mock.calls[0][0];
    expect(callArg).toBeDefined();

    if (callArg.current) {
      // If current exists, we can check for chart property
      expect(callArg).toHaveProperty('current');
    }
  });

  it('works correctly without a chartRefCallback', () => {
    // Should render without errors when no callback provided
    render(
      <ClickUIWrapper>
        <HeatmapChart series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('renders a heatmap chart with generated Y axis categories', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: 202405, y: 'sev-1', value: 9 },
          { x: 202405, y: 'sev-2', value: 6 },
          { x: 202406, y: 'sev-1', value: 1 },
          { x: 202406, y: 'sev-2', value: 10 },
          { x: 202407, y: 'sev-1', value: 2 },
          { x: 202407, y: 'sev-2', value: 10 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <HeatmapChart
          highChartsPropsOverrides={{
            yAxis: {
              reversed: true
            }
          }}
          series={series}
        />
      </ClickUIWrapper>
    );

    expect(screen.getByText('sev-1')).toBeInTheDocument();
    expect(screen.getByText('sev-2')).toBeInTheDocument();
  });

  it('renders a heatmap chart with generated X axis categories', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '1962', y: 0, value: 0 },
          { x: '1962', y: 1, value: 2 },
          { x: '1962', y: 2, value: 0 },
          { x: '1962', y: 3, value: 0 },
          { x: '1963', y: 0, value: 20 },
          { x: '1963', y: 1, value: 6 },
          { x: '1963', y: 2, value: 5 },
          { x: '1963', y: 3, value: 1 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <HeatmapChart
          highChartsPropsOverrides={{
            yAxis: {
              reversed: true
            }
          }}
          series={series}
        />
      </ClickUIWrapper>
    );

    expect(screen.getByText('1962')).toBeInTheDocument();
    expect(screen.getByText('1963')).toBeInTheDocument();
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
