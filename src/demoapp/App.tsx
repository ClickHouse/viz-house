import { ReactElement } from 'react';
import { XYChart } from '@/components';
import { ChartsThemeProvider } from '@/components/ChartsThemeProvider';
import {
  ClickUIProvider,
  Container,
  GridContainer,
  Separator,
  Title,
  useCUITheme
} from '@clickhouse/click-ui';
import { Gradients } from '@/lib/gradients';
import { HeatmapChart } from '@/components/HeatmapChart';
import { PieChart } from '@/components/PieChart';
import { ResponsiveContainer } from '@/demoapp/ResponsiveContainer';
import { DonutChart } from '@/components/DonutChart';

function Charts(): ReactElement {
  const cuiTheme = useCUITheme();
  const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 }
  ];

  const data2 = [
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 }
  ];

  const data3 = [
    { x: '2020-01-01', y: 95 },
    { x: '2020-01-02', y: 24 },
    { x: '2020-01-03', y: 40 }
  ];

  const data4 = [
    { x: '2020-01-01', y: 75 },
    { x: '2020-01-02', y: 36 },
    { x: '2020-01-03', y: 93 }
  ];

  const heatmapData = [
    { x: '2020-01-01', y: 0, value: 10 },
    { x: '2020-01-01', y: 1, value: 20 },
    { x: '2020-01-01', y: 2, value: 80 },
    { x: '2020-01-01', y: 3, value: 60 },
    { x: '2020-01-02', y: 0, value: 50 },
    { x: '2020-01-02', y: 1, value: 35 },
    { x: '2020-01-02', y: 2, value: 75 },
    { x: '2020-01-02', y: 3, value: 45 },
    { x: '2020-01-03', y: 0, value: 15 },
    { x: '2020-01-03', y: 1, value: 75 },
    { x: '2020-01-03', y: 2, value: 100 },
    { x: '2020-01-03', y: 3, value: 66 }
  ];

  const chartColors = cuiTheme.global.color.chart.bars;

  const pieDataSeries = [
    {
      name: 'Per 100 unicorns',
      values: [
        { name: 'Rainbow Sprinkles', y: 50, color: chartColors.orange },
        { name: 'Glitter Berries', y: 30, color: chartColors.fuchsia },
        { name: 'Moonbeams', y: 20, color: chartColors.teal }
      ]
    }
  ];

  return (
    <Container orientation="vertical" gap="md">
      <Title type="h1" size="xl">
        Vizhouse charts
      </Title>
      <GridContainer gridTemplateColumns="repeat(3, 1fr)" gap="md">
        <Container orientation="vertical" gap="md">
          <Title type="h1">Column chart with bellcurve on top</Title>
          <XYChart
            series={[
              { type: 'column', values: data1 },
              { type: 'bellcurve', values: data1 }
            ]}
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Column group</Title>
          <XYChart
            series={[
              { type: 'column', values: data1 },
              { type: 'column', values: data2 },
              { type: 'column', values: data3 }
            ]}
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Stacked Columns</Title>
          <XYChart
            series={[
              { type: 'column', values: data1, name: 'My First series' },
              { type: 'column', values: data2, name: 'My Second series' },
              { type: 'column', values: data3, name: 'My Third series' }
            ]}
            stacked
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Bars</Title>
          <XYChart
            series={[
              { type: 'bar', values: data1, name: 'My First series' },
              { type: 'bar', values: data2, name: 'My Second series' },
              { type: 'bar', values: data3, name: 'My Third series' }
            ]}
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Stacked Bars</Title>
          <XYChart
            series={[
              { type: 'bar', values: data1, name: 'My First series' },
              { type: 'bar', values: data2, name: 'My Second series' },
              { type: 'bar', values: data3, name: 'My Third series' }
            ]}
            stacked
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Area charts with a gradient</Title>
          <XYChart
            series={[
              { type: 'area', values: data1, color: chartColors.blue },
              {
                type: 'area',
                values: data2,
                color: chartColors.orange,
                fillColor: Gradients.linear(chartColors.orange)
              }
            ]}
          />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Simple bell curve</Title>
          <XYChart series={[{ type: 'bellcurve', values: data1 }]} />
        </Container>

        <Container orientation="vertical" gap="md">
          <Title type="h1">Bellcurve with custom gradient</Title>
          <XYChart
            series={[
              {
                type: 'bellcurve',
                values: data1,
                fillColor: Gradients.linear(cuiTheme.global.color.chart.bars.orange),
                color: cuiTheme.global.color.chart.bars.orange
              }
            ]}
          />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">XY Scatter Chart</Title>
          <XYChart
            series={[
              { type: 'scatter', values: data1, name: 'My First series' },
              { type: 'scatter', values: data2, name: 'My Second series' },
              { type: 'scatter', values: data3, name: 'My Third series' },
              { type: 'scatter', values: data4, name: 'My Fourth series' }
            ]}
          />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">XY Chart with loading state</Title>
          <XYChart
            isLoading
            series={[
              {
                type: 'bellcurve',
                values: data1,
                fillColor: Gradients.linear(cuiTheme.global.color.chart.bars.orange),
                color: cuiTheme.global.color.chart.bars.orange
              }
            ]}
          />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Heatmap</Title>
          <HeatmapChart
            series={[{ values: heatmapData, color: chartColors.blue }]}
            yAxis={{
              categories: ['John', 'Paul', 'George', 'Ringo'],
              reversed: true
            }}
          />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Heatmap with overrides</Title>
          <HeatmapChart
            series={[{ values: heatmapData, color: chartColors.blue }]}
            colorAxis={{
              minColor: cuiTheme.global.color.chart.bars.fuchsia,
              maxColor: cuiTheme.global.color.chart.bars.green
            }}
            yAxis={{
              categories: ['John', 'Paul', 'George', 'Ringo'],
              reversed: true
            }}
          />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Pie Chart</Title>
          <PieChart series={pieDataSeries} title="Unicorns Favorite Foods" />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Pie Chart in Loading State</Title>
          <PieChart series={pieDataSeries} title="Unicorns Favorite Foods" isLoading />
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Donut Chart</Title>
          <DonutChart series={pieDataSeries} title="Unicorns Favorite Foods" />
        </Container>
      </GridContainer>
      <Separator size="md" />
      <Title type="h1" size="xl">
        Responsive Charts with Highcharts
      </Title>
      <GridContainer gridTemplateColumns="repeat(1, 1fr)" gap="md">
        <Container orientation="vertical" gap="md">
          <Title type="h1">Area charts with a gradient</Title>
          <ResponsiveContainer>
            <XYChart
              series={[
                { type: 'area', values: data1, color: chartColors.blue },
                {
                  type: 'area',
                  values: data2,
                  color: chartColors.orange,
                  fillColor: Gradients.linear(chartColors.orange)
                }
              ]}
            />
          </ResponsiveContainer>
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Heatmap</Title>
          <ResponsiveContainer>
            <HeatmapChart
              series={[{ values: heatmapData, color: chartColors.blue }]}
              yAxis={{
                categories: ['John', 'Paul', 'George', 'Ringo'],
                reversed: true
              }}
            />
          </ResponsiveContainer>
        </Container>
        <Container orientation="vertical" gap="md">
          <Title type="h1">Pie Chart</Title>
          <ResponsiveContainer>
            <PieChart series={pieDataSeries} title="Unicorns Favorite Foods" />
          </ResponsiveContainer>
        </Container>
      </GridContainer>
    </Container>
  );
}

export function App(): ReactElement {
  return (
    <ClickUIProvider theme="dark">
      <ChartsThemeProvider>
        <Charts />
      </ChartsThemeProvider>
    </ClickUIProvider>
  );
}
