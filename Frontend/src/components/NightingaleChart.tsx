    import React, { useEffect, useRef } from 'react';
    import * as echarts from 'echarts';

    interface NightingaleChartProps {
      data: { value: number; name: string }[];
    }

    const NightingaleChart: React.FC<NightingaleChartProps> = ({ data }) => {
      const chartRef = useRef<HTMLDivElement>(null);
      let myChart: echarts.ECharts | null = null;

      useEffect(() => {
        if (chartRef.current) {
          myChart = echarts.init(chartRef.current);

          const option: echarts.EChartsOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 200], 
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 5,
                },
                data: data,
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                },
              },
            ],
          };

          myChart.setOption(option);
        }

      
        return () => {
          if (myChart) {
            myChart.dispose();
          }
        };
      }, [data])

      useEffect(() => {
        const handleResize = () => {
          if (myChart) {
            myChart.resize();
          }
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
    };

    export default NightingaleChart;