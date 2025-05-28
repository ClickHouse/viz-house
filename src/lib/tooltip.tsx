import { TimePeriod, TooltipFormatter, TooltipPointFormatter } from '@/types/chartTypes';
import { HighCharts } from '@/lib/highchartsInitialization';
import { formatDate, getTooltipDateFormat } from '@/lib/chartUtils';

export const getDefaultTooltipOptions = (
  tooltipPointFormatter?: TooltipPointFormatter,
  tooltipFormatter?: TooltipFormatter
): HighCharts.TooltipOptions => {
  return {
    formatter: tooltipFormatter,
    pointFormatter: tooltipPointFormatter
      ? function (): string {
          const seriesName = this.series.name;
          const xValue = this.x;
          const yValue = this.y;
          const seriesColor = this.series.color;
          const formattedValue = tooltipPointFormatter
            ? tooltipPointFormatter({ seriesName, xValue, yValue })
            : yValue;

          return `
            <tr>
              <td><span style="color:${seriesColor}">●</span> ${seriesName}:</td>
              <td style="text-align: right"><b>${formattedValue}</b></td>
             </tr>`;
        }
      : undefined
  };
};

const renderTooltipPoint = (
  pointColor: string,
  pointName: string,
  pointValue: string
): string => {
  return `<td><span style="color:${pointColor}">●</span>${pointName}:</td>
          <td style="text-align: right"><b>${pointValue}</b></td>`;
};

const POINTS_PER_COLUMN = 8;

export type FormatYValue = (yValue: number | null | undefined) => string;

export const getExpandingWidthTooltipFormatter = (
  timePeriod: TimePeriod,
  formatYValue: FormatYValue
): TooltipFormatter => {
  const expandingWidthTooltip: TooltipFormatter = function () {
    const filteredPoints = (this.points ?? []).filter(
      (point) => point && point.y && point.y > 0
    );
    const filteredPointsCount = filteredPoints.length;

    let tooltip = `
        <span>${formatDate(getTooltipDateFormat(timePeriod), this.x as number)}</span>`;

    if (filteredPointsCount === 0) {
      return tooltip;
    }

    tooltip = `${tooltip}<table>`;

    const columnCount = Math.ceil(filteredPointsCount / POINTS_PER_COLUMN);

    let i = 0;
    while (i < filteredPointsCount) {
      for (let currentColumn = 0; currentColumn < columnCount; currentColumn++) {
        const point = filteredPoints[i];

        if (!point) {
          if (currentColumn + 1 === columnCount) {
            tooltip = `${tooltip}</tr>`;
          }
          continue;
        }

        if (currentColumn === 0) {
          tooltip = `${tooltip}<tr>`;
        }

        const formattedValue = formatYValue(point.y);

        tooltip = `${tooltip}${renderTooltipPoint(
          point.color as string,
          point.series.name,
          formattedValue
        )}`;

        i++;
        if (currentColumn + 1 === columnCount) {
          tooltip = `${tooltip}</tr>`;
        }
      }
    }
    tooltip = `${tooltip}</table>`;
    return tooltip;
  };

  return expandingWidthTooltip;
};
