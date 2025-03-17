import { render, screen } from '@testing-library/react';
import { test, describe, expect } from 'vitest';

import { PieChart } from '@/components/PieChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';

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
    const series = [
      {
        name: 'Test Series',
        values: [
          { name: 'Slice 1', y: 1 },
          { name: 'Slice 2', y: 2 }
        ]
      }
    ];

    render(
      <ClickUIWrapper>
        <PieChart series={series} isLoading />
      </ClickUIWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
