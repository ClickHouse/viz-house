import { CUIThemeType, useCUITheme } from '@clickhouse/click-ui';
import HighCharts from 'highcharts';
import React from 'react';

const buildHighchartsTheme = (cuiTheme: CUIThemeType): HighCharts.Options => {
  const bars = cuiTheme.global.color.chart.bars;

  // These properties are ordered alphabetically. When adding new ones, please maintain alphabetical order
  return {
    chart: {
      animation: false,
      backgroundColor: cuiTheme.global.color.background.default,
      borderRadius: 0,
      borderWidth: 0,
      plotBackgroundColor: undefined,
      plotBorderWidth: 0,
      plotShadow: false
    },
    tooltip: {
      backgroundColor: cuiTheme.global.color.background.muted,
      borderColor: cuiTheme.global.color.stroke.muted,
      borderRadius: 4,
      style: {
        color: cuiTheme.global.color.text.default,
        fontWeight: '400',
        opacity: 0.9,
        fontSize: '12px'
      },
      shared: true,
      useHTML: true,
      headerFormat: `<table><tr><th colspan="2" style="fontWeight: normal; font-size: 12px; color: ${cuiTheme.global.color.text.default}">{point.key}</th></tr>`,
      footerFormat: '</table>',
      pointFormat: `<tr><td><span style="color:{point.color}">●</span> {series.name}:</td><td style="text-align: right"><b>{point.y}</b></td></tr>`
    },
    colors: [bars.blue, bars.orange, bars.fuchsia, bars.violet, bars.teal, bars.green],
    credits: {
      enabled: false
    },
    legend: {
      itemHiddenStyle: {
        color: cuiTheme.global.color.text.muted,
        font: '9pt Inter, Verdana, sans-serif'
      },
      itemHoverStyle: {
        color: cuiTheme.global.color.text.default,
        font: '9pt Inter, Verdana, sans-serif'
      },
      itemStyle: {
        color: cuiTheme.global.color.text.default,
        font: '9pt Inter, Verdana, sans-serif'
      }
    },
    plotOptions: {
      candlestick: {
        lineColor: cuiTheme.global.color.stroke.muted
      },
      line: {
        dataLabels: {
          color: cuiTheme.global.color.text.muted
        },
        marker: {
          lineColor: cuiTheme.global.color.stroke.muted
        }
      },
      pie: {
        dataLabels: {
          style: {
            color: cuiTheme.global.color.text.muted
          }
        },
        borderColor: cuiTheme.global.color.stroke.muted,
        borderWidth: 1
      },
      scatter: {
        marker: {
          lineColor: cuiTheme.global.color.stroke.muted
        }
      },
      series: {
        animation: false
      },
      spline: {
        marker: {
          lineColor: cuiTheme.global.color.stroke.muted
        }
      }
    },
    responsive: {
      rules: [
        {
          chartOptions: {
            chart: {
              className: 'chart-sm'
            }
          },
          condition: {
            maxWidth: 640
          }
        },
        {
          chartOptions: {
            chart: {
              className: 'chart-md'
            }
          },
          condition: {
            minWidth: 641,
            maxWidth: 768
          }
        },
        {
          chartOptions: {
            chart: {
              className: 'chart-lg'
            }
          },
          condition: {
            minWidth: 769,
            maxWidth: 1024
          }
        },
        {
          chartOptions: {
            chart: {
              className: 'chart-xl'
            }
          },
          condition: {
            minWidth: 1025,
            maxWidth: 1280
          }
        },
        {
          chartOptions: {
            chart: {
              className: 'chart-2xl'
            }
          },
          condition: {
            minWidth: 1281
          }
        }
      ]
    },
    subtitle: {
      style: {
        color: cuiTheme.global.color.text.muted,
        font: '12px "Inter", sans-serif'
      }
    },
    title: {
      style: {
        color: cuiTheme.global.color.text.muted,
        font: `400 0.875rem/1.5 "Inter",'"SF Pro Display"',-apple-system,BlinkMacSystemFont,'"Segoe UI"',Roboto,Oxygen,Ubuntu,Cantarell,'"Open Sans"','"Helvetica Neue"',sans-serif`
      }
    },
    xAxis: {
      gridLineColor: cuiTheme.global.color.stroke.muted,
      gridLineWidth: 0,
      labels: {
        style: {
          color: cuiTheme.global.color.text.muted,
          fontSize: cuiTheme.sizes[4]
        }
      },
      lineColor: cuiTheme.global.color.stroke.muted,
      tickColor: cuiTheme.global.color.stroke.muted,
      tickWidth: 1
    },
    yAxis: {
      alternateGridColor: undefined,
      gridLineColor: cuiTheme.global.color.stroke.muted,
      labels: {
        style: {
          color: cuiTheme.global.color.text.muted,
          fontSize: cuiTheme.sizes[4]
        }
      },
      lineWidth: 0,
      minorGridLineColor: cuiTheme.global.color.stroke.muted,
      minorTickInterval: undefined,
      tickColor: cuiTheme.global.color.stroke.muted,
      tickPosition: 'inside',
      tickWidth: 1,
      title: {
        style: {
          font: '"Inter", sans-serif',
          color: cuiTheme.global.color.text.muted,
          fontSize: cuiTheme.sizes[4]
        }
      }
    }
  };
};

export function ChartsThemeProvider({ children }: { children: React.ReactNode }) {
  const cuiTheme = useCUITheme();
  const theme = buildHighchartsTheme(cuiTheme);
  HighCharts.setOptions(theme);

  return <>{children}</>;
}
