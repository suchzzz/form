import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts'; 

interface LineChartProps {
  data: number[];
  categories: string[];
}

const BasicLineChart: React.FC<LineChartProps> = ({ data, categories }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chartInstance: echarts.ECharts | null = null;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      const option: echarts.EChartsOption = {
        xAxis: {
          type: 'category',
          data: categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data,
            type: 'line',
            smooth: true, 
          },
        ],
        tooltip: { 
          trigger: 'axis',
        },
      };
      chartInstance.setOption(option);
    }

    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, [data, categories]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BasicLineChart;