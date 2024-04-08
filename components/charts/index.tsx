// pages/my-chart.tsx

import { ChartData } from '@types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

interface Props {
  chartData: ChartData;
  height?:string;
}

const HighChart = ({ chartData , height}: Props) => {
  const { categories ,chartType, chartTitle, subTitle, xAxis, seriesData } = chartData;

  const xAxisOptions = xAxis ? xAxis : {};
  const seriesOptions = seriesData ? seriesData : [];
  const xAxisCategories = categories || [];
  const chartOptions = {
    chart: {
      type: chartType
    },

    title: {
      text: chartTitle
    },

    subtitle: {
      text: subTitle
    },

    xAxis: {
      ...xAxisOptions,
      categories:xAxisCategories // Assign categories from xAxis if available
    },
    yAxis: {
      title: {
        text: chartData.yAxisTitle
      }
    },

    credits: {
      enabled: false
    },

    series: seriesOptions
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps = {{ style:{height:height}}}/>;
};

export default HighChart;
