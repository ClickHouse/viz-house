import { getExpandingWidthTooltipFormatter } from '@/lib/tooltip';
import { HighCharts } from './highchartsInitialization';

describe('The expanding width tooltip formatter', () => {
  const date = new Date('July 4, 2024, 11:35:00 UTC');
  const points = [
    { x: date.valueOf(), y: 4500, color: '#FB32C9', series: { name: 'foo' } },
    { x: date.valueOf(), y: 7509, color: '#00E513', series: { name: 'bar' } }
  ];

  const formatYValue = vi.fn((yValue: number | null | undefined): string => {
    return `${yValue}`;
  });

  it('displays the formatted tooltip data', () => {
    const timePeriod = 'LAST_HOUR';
    const self = {
      points,
      x: date.valueOf()
    };
    const tooltipFormatter = getExpandingWidthTooltipFormatter(
      timePeriod,
      formatYValue
    );

    const formattedTooltip = tooltipFormatter.call(
      self as HighCharts.TooltipFormatterContextObject,
      {} as HighCharts.Tooltip
    );

    expect(formattedTooltip).toContain('July 4, 11:35:00 AM');
    expect(formattedTooltip).toContain('style="color:#FB32C9"');
    expect(formattedTooltip).toContain('style="color:#00E513"');
    expect(formattedTooltip).toContain('4500');
    expect(formattedTooltip).toContain('7509');
  });

  it('displays two columns when the number of points is between 8 and 16', () => {
    const manyPoints = [];
    for (let i = 0; i < 16; i++) {
      manyPoints.push({
        x: date.valueOf(),
        y: 4500,
        color: '#FB32C9',
        series: { name: `foo-${i}` }
      });
    }

    const timePeriod = 'LAST_HOUR';
    const self = {
      points: manyPoints,
      x: date.valueOf()
    };
    const tooltipFormatter = getExpandingWidthTooltipFormatter(
      timePeriod,
      formatYValue
    );

    const formattedTooltip = tooltipFormatter.call(
      self as unknown as HighCharts.TooltipFormatterContextObject,
      {} as HighCharts.Tooltip
    );

    const rowCount = ((formattedTooltip as string).match(/<tr>/g) || []).length;
    const columnCount = ((formattedTooltip as string).match(/<td>/g) || [])
      .length;
    expect(rowCount).toBe(8);
    expect(columnCount).toBe(16);
  });

  it('displays three columns when the number of points is between 16 and 24', () => {
    const manyPoints = [];
    for (let i = 0; i < 24; i++) {
      manyPoints.push({
        x: date.valueOf(),
        y: 4500,
        color: '#FB32C9',
        series: { name: `foo-${i}` }
      });
    }

    const timePeriod = 'LAST_HOUR';
    const self = {
      points: manyPoints,
      x: date.valueOf()
    };
    const tooltipFormatter = getExpandingWidthTooltipFormatter(
      timePeriod,
      formatYValue
    );

    const formattedTooltip = tooltipFormatter.call(
      self as unknown as HighCharts.TooltipFormatterContextObject,
      {} as HighCharts.Tooltip
    );

    const rowCount = ((formattedTooltip as string).match(/<tr>/g) || []).length;
    const columnCount = ((formattedTooltip as string).match(/<td>/g) || [])
      .length;
    expect(rowCount).toBe(8);
    expect(columnCount).toBe(24);
  });

  describe('date formats', () => {
    const self = {
      points,
      x: date.valueOf()
    };
    it('formats dates for LAST_DAY periods', () => {
      const timePeriod = 'LAST_DAY';
      const tooltipFormatter = getExpandingWidthTooltipFormatter(
        timePeriod,
        formatYValue
      );
      const formattedTooltip = tooltipFormatter.call(
        self as HighCharts.TooltipFormatterContextObject,
        {} as HighCharts.Tooltip
      );

      expect(formattedTooltip).toContain('July 4, 11:35 AM');
    });

    it('formats dates for LAST_WEEK periods', () => {
      const timePeriod = 'LAST_WEEK';
      const tooltipFormatter = getExpandingWidthTooltipFormatter(
        timePeriod,
        formatYValue
      );
      const formattedTooltip = tooltipFormatter.call(
        self as HighCharts.TooltipFormatterContextObject,
        {} as HighCharts.Tooltip
      );

      expect(formattedTooltip).toContain('July 4, 11 AM');
    });

    it('formats dates for LAST_MONTH periods', () => {
      const timePeriod = 'LAST_MONTH';
      const tooltipFormatter = getExpandingWidthTooltipFormatter(
        timePeriod,
        formatYValue
      );
      const formattedTooltip = tooltipFormatter.call(
        self as HighCharts.TooltipFormatterContextObject,
        {} as HighCharts.Tooltip
      );

      expect(formattedTooltip).toContain('July 4, 11 AM');
    });

    it('formats dates for LAST_YEAR periods', () => {
      const timePeriod = 'LAST_YEAR';
      const tooltipFormatter = getExpandingWidthTooltipFormatter(
        timePeriod,
        formatYValue
      );
      const formattedTooltip = tooltipFormatter.call(
        self as HighCharts.TooltipFormatterContextObject,
        {} as HighCharts.Tooltip
      );

      expect(formattedTooltip).toContain('July 4, 2024');
    });
  });
});
