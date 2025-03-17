import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

import {
  BasicAuthenticationScheme,
  RemoteChart
} from '@/components/RemoteChart';
import { XYChart } from '@/components/XYChart';
import ClickUIWrapper from '@/lib/ClickUIWrapper';
import { XYChartValue } from '@/types/chartTypes';

const mockRequestUrl =
  'http://localhost:8911/.api/query-endpoints/d98c0b84-0b12-4777-b90b-79e22098acac/run';
const mockUsername = 'foo';
const mockPassword = 'bar';

const handlers = [
  http.post(mockRequestUrl, () => {
    return new HttpResponse(
      new ReadableStream({
        start: (controller) => {
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(
              [
                {
                  event_time: '2020-01-01',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 30
                },
                {
                  event_time: '2020-01-02',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 42
                },
                {
                  event_time: '2020-01-03',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 89
                },
                {
                  event_time: '2020-01-04',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 26
                },
                {
                  event_time: '2020-01-05',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 12
                },
                {
                  event_time: '2020-01-06',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 88
                },
                {
                  event_time: '2020-01-07',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 78
                },
                {
                  event_time: '2020-01-08',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 75
                },
                {
                  event_time: '2020-01-09',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 89
                },
                {
                  event_time: '2020-01-10',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 92
                },
                {
                  event_time: '2020-01-11',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 94
                },
                {
                  event_time: '2020-01-12',
                  irrelevant_column:
                    'this is irrelevant because of chartConfig',
                  read_bytes: 56
                }
              ]
                .map((dataObject: unknown) => JSON.stringify(dataObject))
                .join('\n')
            )
          );
          controller.close();
        }
      })
    );
  })
];

const mockServer = setupServer(...handlers);

describe('The Remote Chart', () => {
  beforeAll(() => {
    mockServer.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    mockServer.close();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('renders a remote chart', async () => {
    render(
      <ClickUIWrapper>
        <RemoteChart
          authentication={
            {
              type: 'basic',
              username: mockUsername,
              password: mockPassword
            } as BasicAuthenticationScheme
          }
          chartConfig={{
            series: [
              {
                name: 'Bytes read',
                xAxis: { column: 'event_time', type: 'string' },
                yAxis: { column: 'read_bytes' }
              }
            ]
          }}
          url={mockRequestUrl}
        >
          {({ isLoading, series }) => {
            return (
              <XYChart
                isLoading={isLoading}
                series={series.map((serie, i) => {
                  return {
                    name: serie?.name ? `${serie.name}` : `Series ${i}`,
                    values: serie.values as Array<XYChartValue>
                  };
                })}
                title="Remote chart"
              />
            );
          }}
        </RemoteChart>
      </ClickUIWrapper>
    );

    await waitFor(() => {
      expect(screen.getAllByText('Remote chart')[0]).toBeInTheDocument();
    });
  });

  describe('auto refresh', () => {
    it('handles numerical auto refresh intervals', () => {
      const mockSetInterval = vi.fn();
      vi.stubGlobal('setInterval', mockSetInterval);

      render(
        <ClickUIWrapper>
          <RemoteChart
            authentication={
              {
                type: 'basic',
                username: mockUsername,
                password: mockPassword
              } as BasicAuthenticationScheme
            }
            autoRefresh={250}
            chartConfig={{
              series: [
                {
                  name: 'Bytes read',
                  xAxis: { column: 'event_time', type: 'string' },
                  yAxis: { column: 'read_bytes' }
                }
              ]
            }}
            url={mockRequestUrl}
          >
            {({ isLoading, series }) => {
              return (
                <XYChart
                  isLoading={isLoading}
                  series={series.map((serie, i) => {
                    return {
                      name: serie?.name ? `${serie.name}` : `Series ${i}`,
                      values: serie.values as Array<XYChartValue>
                    };
                  })}
                  title="Remote chart"
                />
              );
            }}
          </RemoteChart>
        </ClickUIWrapper>
      );

      const [[, interval]] = mockSetInterval.mock.calls;
      expect(interval).toBe(250);
    });

    it('converts an AutoRefreshInterval into milliseconds', () => {
      const mockSetInterval = vi.fn();
      vi.stubGlobal('setInterval', mockSetInterval);

      render(
        <ClickUIWrapper>
          <RemoteChart
            authentication={
              {
                type: 'basic',
                username: mockUsername,
                password: mockPassword
              } as BasicAuthenticationScheme
            }
            autoRefresh="30s"
            chartConfig={{
              series: [
                {
                  name: 'Bytes read',
                  xAxis: { column: 'event_time', type: 'string' },
                  yAxis: { column: 'read_bytes' }
                }
              ]
            }}
            url={mockRequestUrl}
          >
            {({ isLoading, series }) => {
              return (
                <XYChart
                  isLoading={isLoading}
                  series={series.map((serie, i) => {
                    return {
                      name: serie?.name ? `${serie.name}` : `Series ${i}`,
                      values: serie.values as Array<XYChartValue>
                    };
                  })}
                  title="Remote chart"
                />
              );
            }}
          </RemoteChart>
        </ClickUIWrapper>
      );

      const [[, interval]] = mockSetInterval.mock.calls;
      expect(interval).toBe(30_000);
    });
  });
});
