import {
  ChartConfig,
  ColumnType,
  HeatmapChartValue,
  SeriesDescriptor
} from '@/types/chartTypes';
import { ReactElement, useEffect, useState } from 'react';
import { StreamingJsonResult } from '@/types/queryTypes';
import {
  JSONLinesTransformStream,
  streamToAsyncIterator
} from '@/lib/JSONLinesTransformStream';

/**
 * Different authentication methods available.
 */
type AuthenticationType = 'basic'; // todo: add more authentication types

/**
 * Generic authentication scheme.
 */
export interface AuthenticationScheme {
  /** Type of the authentication scheme. */
  type: AuthenticationType;
}

/**
 * Basic authentication scheme with a username and password.
 */
export interface BasicAuthenticationScheme extends AuthenticationScheme {
  /** Username for basic authentication. */
  username: string;
  /** Password for basic authentication. */
  password: string;
}

/**
 * Type representing the intervals for auto-refresh in the chart.
 * It can be a string with predefined intervals or a number (in milliseconds).
 */
export type AutoRefreshInterval =
  | '5s'
  | '30s'
  | '1m'
  | '5m'
  | '30m'
  | '1h'
  | number;

/**
 * Remote chart component properties.
 */
export interface RemoteChartProps {
  /** Authentication scheme for accessing the remote data. */
  authentication: AuthenticationScheme;

  /** Interval for auto-refreshing the chart data. */
  autoRefresh?: AutoRefreshInterval;

  /** Configuration for the chart to be rendered. */
  chartConfig: ChartConfig;

  /** A render function that receives chart dimensions, loading state, error message, and series data. */
  children: (props: {
    height: string;
    isLoading: boolean;
    errorMessage: string;
    series: Array<SeriesDescriptor>;
    width: string;
  }) => ReactElement;

  /** Height of the chart. Defaults to 'inherit'. */
  height?: string;

  /** URL from which the chart data is fetched. */
  url: string;

  /** Width of the chart. Defaults to 'inherit'. */
  width?: string;
}

const getIntervalFromAutoRefreshInterval = (
  interval: AutoRefreshInterval
): number => {
  if (typeof interval === 'number') {
    return interval;
  }

  switch (interval) {
    case '5s': {
      return 5_000;
    }
    case '30s': {
      return 30_000;
    }
    case '1m': {
      return 60_000;
    }
    case '5m': {
      return 5 * 60 * 1_000;
    }
    case '30m': {
      return 30 * 60 * 1_000;
    }
    case '1h': {
      return 60 * 60 * 1_000;
    }
    default: {
      return 30_000;
    }
  }
};

const fetchQueryResults = (
  url: string,
  authenticationScheme: AuthenticationScheme
): Promise<void | Array<StreamingJsonResult>> => {
  const streamTransformer = new JSONLinesTransformStream();

  const scheme = authenticationScheme as BasicAuthenticationScheme;
  const authString = `${scheme.username}:${scheme.password}`;

  return fetch(url, {
    body: JSON.stringify({
      format: 'JSONEachRow'
    }),
    headers: new Headers({
      Authorization: `Basic ${btoa(authString)}`,
      'x-clickhouse-endpoint-version': '2'
    }),
    method: 'POST',
    mode: 'cors'
  })
    .then(async (response): Promise<Array<StreamingJsonResult>> => {
      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const pipedStream = (
        response.body as ReadableStream<Uint8Array>
      ).pipeThrough(streamTransformer);

      const parsedJsonObjects: Array<StreamingJsonResult> = [];
      for await (const parsedJsonObject of streamToAsyncIterator(pipedStream)) {
        parsedJsonObjects.push(parsedJsonObject);
      }

      return parsedJsonObjects;
    })
    .catch(console.error);
};

const transformXValueByType = (
  value: string,
  type: ColumnType
): Date | number | string => {
  if (type === 'date') {
    return new Date(value);
  }

  if (type === 'number') {
    return parseFloat(value);
  }

  return `${value}`;
};

const transformQueryResults = (
  queryResults: Array<StreamingJsonResult>,
  chartConfig: ChartConfig
): Array<SeriesDescriptor> => {
  return chartConfig.series.map(({ name, xAxis, yAxis, value }) => {
    const values = queryResults.map((result) => {
      const xValue = result[xAxis.column];
      if (xValue === undefined) {
        throw new Error(
          `The provided x axis column ${xAxis.column} isn't a part of this query's results.`
        );
      }

      const yValue = result[yAxis.column];
      if (yValue === undefined) {
        throw new Error(
          `The provided y axis column ${yAxis.column} isn't a part of this query's results.`
        );
      }

      const chartValue = {
        x: transformXValueByType(xValue as string, xAxis.type),
        y: parseFloat(yValue as string)
      };

      if (value) {
        if (result[value] === undefined) {
          throw new Error(
            `The provided value column ${value} isn't a part of this query's results.`
          );
        }

        (chartValue as HeatmapChartValue).value = Number(result[value]);
      }

      return chartValue;
    });

    return {
      name,
      values
    };
  });
};
/**
 * Component that fetches data from a URL and renders a chart.
 */
export const RemoteChart = ({
  authentication,
  autoRefresh,
  children,
  chartConfig,
  height = 'inherit',
  url,
  width = 'inherit'
}: RemoteChartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<Array<SeriesDescriptor>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setIsLoading(true);

    const performFetch = async () => {
      try {
        const queryResults = await fetchQueryResults(url, authentication);
        if (queryResults) {
          setSeries(transformQueryResults(queryResults, chartConfig));
          setErrorMessage('');
        } else {
          setSeries([]);
          setErrorMessage('There was a problem running that query');
        }
      } catch (error) {
        setSeries([]);
        setErrorMessage((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    void performFetch();

    if (autoRefresh && !intervalId) {
      const id = setInterval(() => {
        void performFetch();
      }, getIntervalFromAutoRefreshInterval(autoRefresh));

      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return children({ height, isLoading, errorMessage, series, width });
};
