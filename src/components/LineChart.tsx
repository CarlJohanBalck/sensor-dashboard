import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, ChartOptions } from 'chart.js/auto';

interface LineChartProps {
  data: number[];
  labels: string[];
  unit: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, unit }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartContainer.current) {
      // Ensure the previous chart instance is destroyed
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        const config: ChartConfiguration<'line'> = {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: unit,
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        const options: ChartOptions<'line'> = config.options || {};

        chartInstance.current = new Chart(ctx, config);

        return () => {
          // Cleanup: Destroy the chart instance before unmounting
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
        };
      }
    }
  }, [data, labels]);

  return <canvas ref={chartContainer} />;
};

export default LineChart;
