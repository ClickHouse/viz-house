import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import bellcurve from 'highcharts/modules/histogram-bellcurve';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import boost from 'highcharts/modules/boost';

bellcurve(HighCharts);
highchartsAccessibility(HighCharts);
HighchartsHeatmap(HighCharts);
boost(HighCharts);

export { HighchartsReact, HighCharts };
