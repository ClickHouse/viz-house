import { HighCharts } from '@/lib/highchartsInitialization';
import {
  Chart,
  EventCallbackFunction,
  EventOptionsObject,
  LegendHorizontalPosition,
  LegendVerticalPosition,
  TimePeriod
} from '@/types/chartTypes';

export const getDefaultXAxisOptions = (): HighCharts.XAxisOptions => {
  return {
    type: 'category',
    uniqueNames: false, // Do not show two different values with the same category at the same x-axis position
    labels: {
      style: {
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  };
};

export const getDefaultYAxisOptions = (): HighCharts.YAxisOptions => {
  return {
    title: {
      text: ''
    }
  };
};

export const getDefaultLegendOptions = (): HighCharts.LegendOptions => {
  return {
    enabled: false
  };
};

export const isLegendHorizontalPosition = (
  legendPosition: string
): legendPosition is LegendHorizontalPosition => {
  return (
    legendPosition === 'hidden' || legendPosition === 'left' || legendPosition === 'right'
  );
};

export const isLegendVerticalPosition = (
  legendPosition: string
): legendPosition is LegendVerticalPosition => {
  return (
    legendPosition === 'hidden' || legendPosition === 'top' || legendPosition === 'bottom'
  );
};

export const addEvent = (
  chart: Chart,
  eventType: string,
  callbackFn: EventCallbackFunction<Chart>,
  options?: EventOptionsObject
): void => {
  HighCharts.addEvent(chart, eventType, callbackFn, options);
};

export const removeEvent = (
  chart: Chart,
  eventType: string,
  callbackFn: EventCallbackFunction<Chart>
): void => {
  HighCharts.removeEvent(chart, eventType, callbackFn);
};

export const getTooltipDateFormat = (timePeriod?: TimePeriod): string => {
  // See https://api.highcharts.com/class-reference/Highcharts.Time#dateFormat.
  switch (timePeriod) {
    case 'LAST_HOUR': {
      return '%B%e, %l:%M:%S %p'; // Up to minutes: April 24, 4:20:35 PM
    }
    case 'LAST_DAY': {
      return '%B%e, %l:%M %p'; // Up to minutes: April 24, 4:20 PM.
    }

    case 'LAST_WEEK':
    case 'LAST_MONTH': {
      return '%B%e, %l %p'; // Up to hours: April 24, 4 PM.
    }

    case 'LAST_YEAR': {
      return '%B%e, %Y'; // Up to days: April 24, 2022.
    }
    default:
      return '%Y-%m-%d';
  }
};
