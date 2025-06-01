import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmotionFrequency = ({ sentimentData }) => {
  const emotionCounts = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    love: 0,
  };

  // Aggregate counts from sentimentData
  for (const date in sentimentData) {
    for (const emotion in sentimentData[date]) {
      emotionCounts[emotion] += sentimentData[date][emotion].count;
    }
  }

  const data = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        label: 'Frequency',
        data: Object.values(emotionCounts),
        backgroundColor: ['#E7E7A7', '#A7B0E7', '#E7A7A7', '#B5E7A7', '#E7A7D9'],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { font: { family: 'Nunito', size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Nunito', size: 12 } },
      },
    },
    plugins: { legend: { display: false } },
  };

  return <Bar data={data} options={options} />;
};

export default EmotionFrequency;