import { render, screen } from '@testing-library/react';
import { test, describe, expect } from 'vitest';

import { PieChart } from '@/components/PieChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';

const series = [
  {
    name: 'Test Series',
    values: [
      { name: 'Slice 1', y: 1 },
      { name: 'Slice 2', y: 2 }
    ]
  }
];

describe('PieChart', () => {
  test('renders without crashing', () => {
    const series = [
      {
        name: 'Test Series',
        values: [
          { name: 'Slice 1', y: 10928 },
          { name: 'Slice 2', y: 22873 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <PieChart series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByText('10928')).toBeInTheDocument();
    expect(screen.getByText('22873')).toBeInTheDocument();
  });

  test('displays loading when isLoading is true', () => {
    render(
      <ClickUIWrapper>
        <PieChart series={series} isLoading />
      </ClickUIWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('calls chartRefCallback with chart reference', () => {
    const mockChartRefCallback = vi.fn();

    render(
      <ClickUIWrapper>
        <PieChart series={series} chartRefCallback={mockChartRefCallback} />
      </ClickUIWrapper>
    );

    expect(mockChartRefCallback).toHaveBeenCalled();

    const callArg = mockChartRefCallback.mock.calls[0][0];
    expect(callArg).toBeDefined();

    if (callArg.current) {
      expect(callArg).toHaveProperty('current');
    }
  });

  it('works correctly without a chartRefCallback', () => {
    render(
      <ClickUIWrapper>
        <PieChart series={series} />
      </ClickUIWrapper>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
