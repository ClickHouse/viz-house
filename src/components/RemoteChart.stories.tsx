import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { BasicAuthenticationScheme, RemoteChart } from '@/components/RemoteChart';
import { XYChart } from '@/components/XYChart';
import { Title, useCUITheme } from '@clickhouse/click-ui';
import { HeatmapChartValue, PieChartValue, XYChartValue } from '@/types/chartTypes';
import { DonutChart } from '@/components/DonutChart';
import { HeatmapChart } from '@/components/HeatmapChart';

const meta: Meta = {
  title: 'components/RemoteChart',
  component: RemoteChart,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
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
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

const responseUrl = '/.api/query-endpoints/response-id/run';
const errorUrl = '/.api/query-endpoints/error-id/run';

const createReadableStreamFromData = (data: Array<unknown>): ReadableStream => {
  return new ReadableStream({
    start: (controller) => {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(
          data.map((dataObject: unknown) => JSON.stringify(dataObject)).join('\n')
        )
      );
      controller.close();
    }
  });
};

const generateRandomInteger = (min: number, max: number) => {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
  );
};

export const Basic: Story = {
  args: {
    height: '400px',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(responseUrl, () => {
          return new HttpResponse(
            createReadableStreamFromData([
              {
                event_time: '2020-01-01',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 30
              },
              {
                event_time: '2020-01-02',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 42
              },
              {
                event_time: '2020-01-03',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 89
              },
              {
                event_time: '2020-01-04',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 26
              },
              {
                event_time: '2020-01-05',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 12
              },
              {
                event_time: '2020-01-06',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 88
              },
              {
                event_time: '2020-01-07',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 78
              },
              {
                event_time: '2020-01-08',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 75
              },
              {
                event_time: '2020-01-09',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 89
              },
              {
                event_time: '2020-01-10',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 92
              },
              {
                event_time: '2020-01-11',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 94
              },
              {
                event_time: '2020-01-12',
                irrelevant_column: 'this is irrelevant because of chartConfig',
                read_bytes: 56
              }
            ])
          );
        })
      ]
    }
  },
  render: () => {
    return (
      <RemoteChart
        authentication={
          {
            type: 'basic',
            username: 'foo',
            password: 'bar'
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
        url={responseUrl}
      >
        {({ height, isLoading, series, width }) => {
          return (
            <XYChart
              height={height}
              isLoading={isLoading}
              series={series.map((serie) => {
                return {
                  name: `${serie.name}`,
                  values: serie.values as Array<XYChartValue>
                };
              })}
              title="Basic Remote Chart"
              width={width}
            />
          );
        }}
      </RemoteChart>
    );
  }
};

export const RemoteChartMultipleSeries: Story = {
  args: {
    height: '400px',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(responseUrl, () => {
          return new HttpResponse(
            createReadableStreamFromData([
              {
                event_time: '2020-01-01',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 300000,
                written_bytes: 17000
              },
              {
                event_time: '2020-01-02',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 420000,
                written_bytes: 24000
              },
              {
                event_time: '2020-01-03',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 890000,
                written_bytes: 67000
              },
              {
                event_time: '2020-01-04',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 260000,
                written_bytes: 10000
              },
              {
                event_time: '2020-01-05',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 120000,
                written_bytes: 90000
              },
              {
                event_time: '2020-01-06',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 880000,
                written_bytes: 83000
              },
              {
                event_time: '2020-01-07',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 780000,
                written_bytes: 75000
              },
              {
                event_time: '2020-01-08',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 750000,
                written_bytes: 55000
              },
              {
                event_time: '2020-01-09',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 890000,
                written_bytes: 35000
              },
              {
                event_time: '2020-01-10',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 920000,
                written_bytes: 88000
              },
              {
                event_time: '2020-01-11',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 940000,
                written_bytes: 11000
              },
              {
                event_time: '2020-01-12',
                irrelevant_row: 'this is irrelevant because of chartConfig',
                read_bytes: 560000,
                written_bytes: 44000
              }
            ])
          );
        })
      ]
    }
  },
  render: () => {
    return (
      <RemoteChart
        authentication={
          {
            type: 'basic',
            username: 'foo',
            password: 'bar'
          } as BasicAuthenticationScheme
        }
        chartConfig={{
          series: [
            {
              name: 'Bytes read',
              xAxis: { column: 'event_time', type: 'string' },
              yAxis: { column: 'read_bytes' }
            },
            {
              name: 'Bytes written',
              xAxis: { column: 'event_time', type: 'string' },
              yAxis: { column: 'written_bytes' }
            }
          ]
        }}
        url={responseUrl}
      >
        {({ height, isLoading, series, width }) => {
          return (
            <XYChart
              height={height}
              isLoading={isLoading}
              series={series.map((serie) => {
                return {
                  name: `${serie.name}`,
                  values: serie.values as Array<XYChartValue>
                };
              })}
              title="Remote Chart with Multiple Series"
              width={width}
            />
          );
        }}
      </RemoteChart>
    );
  },
  tags: ['autodocs']
};

const RemoteHeatmapChartWrapper = () => {
  return (
    <RemoteChart
      authentication={
        {
          type: 'basic',
          username: 'foo',
          password: 'bar'
        } as BasicAuthenticationScheme
      }
      chartConfig={{
        series: [
          {
            xAxis: { column: 'event', type: 'string' },
            yAxis: { column: 'country' },
            value: 'medals'
          }
        ]
      }}
      url={responseUrl}
    >
      {({ errorMessage, isLoading, series }) => {
        if (errorMessage) {
          return (
            <Title type="h2" size="xl">
              {errorMessage}
            </Title>
          );
        }

        return (
          <HeatmapChart
            isLoading={isLoading}
            series={series.map((serie) => {
              return {
                values: serie.values as Array<HeatmapChartValue>
              };
            })}
            title="Remote Heatmap Chart"
            yAxis={{
              categories: ['USA', 'China', 'Japan', 'Great Britain']
            }}
          />
        );
      }}
    </RemoteChart>
  );
};

export const RemoteHeatmapChart: Story = {
  args: {
    height: '400px',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(responseUrl, () => {
          return new HttpResponse(
            createReadableStreamFromData([
              { event: 'Gold Medals', country: 0, medals: 39 },
              { event: 'Gold Medals', country: 1, medals: 38 },
              { event: 'Gold Medals', country: 2, medals: 27 },
              { event: 'Gold Medals', country: 3, medals: 22 },
              { event: 'Silver medals', country: 0, medals: 40 },
              { event: 'Silver medals', country: 1, medals: 32 },
              { event: 'Silver medals', country: 2, medals: 14 },
              { event: 'Silver medals', country: 3, medals: 20 },
              { event: 'Bronze medals', country: 0, medals: 33 },
              { event: 'Bronze medals', country: 1, medals: 19 },
              { event: 'Bronze medals', country: 2, medals: 17 },
              { event: 'Bronze medals', country: 3, medals: 22 }
            ])
          );
        })
      ]
    }
  },
  render: () => <RemoteHeatmapChartWrapper />
};

const RemoteDonutChartWrapper = () => {
  return (
    <RemoteChart
      authentication={
        {
          type: 'basic',
          username: 'foo',
          password: 'bar'
        } as BasicAuthenticationScheme
      }
      chartConfig={{
        series: [
          {
            name: 'Browser share',
            xAxis: { column: 'browser', type: 'string' },
            yAxis: { column: 'share' }
          }
        ]
      }}
      url={responseUrl}
    >
      {({ errorMessage, isLoading, series }) => {
        if (errorMessage) {
          return (
            <Title type="h2" size="xl">
              {errorMessage}
            </Title>
          );
        }

        return (
          <DonutChart
            isLoading={isLoading}
            series={series.map((serie) => {
              return {
                values: serie.values.map((value) => {
                  const coercedValue = value as XYChartValue;
                  return { name: coercedValue.x, y: coercedValue.y };
                }) as Array<PieChartValue>
              };
            })}
            title="Remote Donut Chart"
          />
        );
      }}
    </RemoteChart>
  );
};

export const RemoteDonutChart: Story = {
  args: {
    height: '400px',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(responseUrl, () => {
          return new HttpResponse(
            createReadableStreamFromData([
              { browser: 'Chrome', share: 61.41 },
              { browser: 'IE', share: 11.84 },
              { browser: 'Firefox', share: 10.85 },
              { browser: 'Edge', share: 4.67 },
              { browser: 'Safari', share: 4.18 },
              { browser: 'Other', share: 7.05 }
            ])
          );
        })
      ]
    }
  },
  render: () => <RemoteDonutChartWrapper />
};

export const RemoteChartAutorefresh: Story = {
  args: {
    height: '400px',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(responseUrl, () => {
          return new HttpResponse(
            createReadableStreamFromData([
              {
                event_time: '2024-07-01',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-02',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-03',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-04',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-05',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-06',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-07',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-08',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-09',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-10',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-11',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-12',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-13',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-14',
                value: generateRandomInteger(100, 100_000)
              },
              {
                event_time: '2024-07-15',
                value: generateRandomInteger(100, 100_000)
              }
            ])
          );
        })
      ]
    }
  },
  render: () => {
    const cuiTheme = useCUITheme();
    return (
      <RemoteChart
        authentication={
          {
            type: 'basic',
            username: 'foo',
            password: 'bar'
          } as BasicAuthenticationScheme
        }
        autoRefresh="5s"
        chartConfig={{
          series: [
            {
              name: 'Bytes read',
              xAxis: { column: 'event_time', type: 'string' },
              yAxis: { column: 'value' }
            }
          ]
        }}
        url={responseUrl}
      >
        {({ height, isLoading, series, width }) => {
          return (
            <XYChart
              height={height}
              isLoading={isLoading}
              series={series.map((serie) => {
                return {
                  color: cuiTheme.global.color.chart.bars.green,
                  name: `${serie.name}`,
                  values: serie.values as Array<XYChartValue>
                };
              })}
              title="Autorefreshing Remote Chart"
              width={width}
            />
          );
        }}
      </RemoteChart>
    );
  }
};

const RemoteChartErrorWrapper = () => {
  return (
    <RemoteChart
      authentication={
        {
          type: 'basic',
          username: 'foo',
          password: 'bar'
        } as BasicAuthenticationScheme
      }
      chartConfig={{
        series: [
          {
            name: 'Random value',
            xAxis: { column: 'event_time', type: 'string' },
            yAxis: { column: 'read_bytes' }
          }
        ]
      }}
      url={errorUrl}
    >
      {({ errorMessage, isLoading, series }) => {
        if (errorMessage) {
          return (
            <Title type="h2" size="xl">
              {errorMessage}
            </Title>
          );
        }

        return (
          <XYChart
            isLoading={isLoading}
            series={series.map((serie) => {
              return {
                name: `${serie.name}`,
                values: serie.values as Array<XYChartValue>
              };
            })}
          />
        );
      }}
    </RemoteChart>
  );
};

export const Error: Story = {
  args: {
    height: '400px',
    title: 'RemoteChart with an error',
    width: '500px'
  },
  parameters: {
    msw: {
      handlers: [
        http.post(errorUrl, () => {
          return HttpResponse.error();
        })
      ]
    }
  },
  render: () => <RemoteChartErrorWrapper />
};
