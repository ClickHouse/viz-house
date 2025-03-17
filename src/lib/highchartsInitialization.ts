import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import bellcurve from 'highcharts/modules/histogram-bellcurve';
import HighchartsHeatmap from 'highcharts/modules/heatmap';

bellcurve(HighCharts);
highchartsAccessibility(HighCharts);
HighchartsHeatmap(HighCharts);

export { HighchartsReact, HighCharts };
