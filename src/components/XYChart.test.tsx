import { render, screen } from '@testing-library/react';

import { XYChart, XYSeriesDescriptor } from '@/components/XYChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';
import { XYChartValue } from '@/types/chartTypes';

const numData: XYChartValue[] = [
  { x: 6, y: 321 },
  { x: 12, y: 958 },
  { x: 18, y: 331 },
  { x: 19, y: 133 }
];

const seriesDescriptor: XYSeriesDescriptor = { values: numData, type: 'line' };

describe('XYCharts', () => {
  it('renders an xy chart', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '2020-01-01', y: 50 },
          { x: '2020-01-02', y: 10 },
          { x: '2020-01-03', y: 20 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <XYChart series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
  });

  it('displays a loading state when the chart is loading', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '2020-01-01', y: 50 },
          { x: '2020-01-02', y: 10 },
          { x: '2020-01-03', y: 20 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <XYChart isLoading series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('allows the setting of zoom values', () => {
    const series = [
      {
        name: 'Test series',
        values: [
          { x: '2020-01-01', y: 50 },
          { x: '2020-01-02', y: 10 },
          { x: '2020-01-03', y: 20 }
        ]
      }
    ];

    const handleZoom = vi.fn();

    const min = 4;
    const max = 7;

    render(
      <ClickUIWrapper>
        <XYChart series={series} xAxis={{ onZoom: handleZoom }} zoom={{ min, max }} />
      </ClickUIWrapper>
    );

    expect(handleZoom).toHaveBeenCalled();

    const [lastCallArgs] = handleZoom?.mock?.lastCall ?? [];
    expect(lastCallArgs).toHaveProperty('min', min);
    expect(lastCallArgs).toHaveProperty('max', max);
  });

  test('renders without crashing', () => {
    const series = [seriesDescriptor];

    render(
      <ClickUIWrapper>
        <XYChart series={series} hasDataLabels />
      </ClickUIWrapper>
    );

    expect(screen.getByText('321')).toBeInTheDocument();
    expect(screen.getByText('958')).toBeInTheDocument();
    expect(screen.getByText('331')).toBeInTheDocument();
    expect(screen.getByText('133')).toBeInTheDocument();

    // Check that the x-axis labels are rendered
    expect(screen.getByText('6', { selector: 'text' })).toBeInTheDocument();
    expect(screen.getByText('12', { selector: 'text' })).toBeInTheDocument();
    expect(screen.getByText('18', { selector: 'text' })).toBeInTheDocument();
    expect(screen.getByText('19', { selector: 'text' })).toBeInTheDocument();
  });

  test('respects xAxis min and max properties', () => {
    const series = [seriesDescriptor];
    render(
      <ClickUIWrapper>
        <XYChart
          series={series}
          hasDataLabels
          xAxis={{ type: 'category', verticalLabels: false, min: 12, max: 18 }}
        />
      </ClickUIWrapper>
    );

    // Check that the x-axis labels are rendered only from 12 to 18
    expect(screen.queryByText('6', { selector: 'text' })).toBeNull();
    expect(screen.getByText('12', { selector: 'text' })).toBeInTheDocument();
    expect(screen.getByText('18', { selector: 'text' })).toBeInTheDocument();
    expect(screen.queryByText('19', { selector: 'text' })).toBeNull();
  });
});
