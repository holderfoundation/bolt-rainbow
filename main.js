import Chart from 'chart.js/auto';

const ctx = document.getElementById('btcRainbowChart').getContext('2d');

// Generate sample data (replace with actual historical BTC price data)
const generateData = (start, end, step) => {
  const data = [];
  for (let i = start; i <= end; i += step) {
    data.push({
      x: new Date(i, 0, 1),
      y: Math.exp(0.00005 * (i - start) ** 2) * (1 + Math.random() * 0.5)
    });
  }
  return data;
};

const data = generateData(2010, 2023, 0.1);

// Define rainbow colors
const rainbowColors = [
  'rgba(255, 0, 0, 0.1)',
  'rgba(255, 127, 0, 0.1)',
  'rgba(255, 255, 0, 0.1)',
  'rgba(0, 255, 0, 0.1)',
  'rgba(0, 0, 255, 0.1)',
  'rgba(75, 0, 130, 0.1)',
  'rgba(143, 0, 255, 0.1)',
];

// Create datasets for rainbow bands
const datasets = rainbowColors.map((color, index) => ({
  label: `Band ${index + 1}`,
  data: data.map(point => ({
    x: point.x,
    y: point.y * Math.pow(1.5, index - 3)
  })),
  backgroundColor: color,
  borderColor: color.replace('0.1', '1'),
  borderWidth: 1,
  pointRadius: 0,
  fill: '+1',
}));

// Add actual price line
datasets.push({
  label: 'BTC Price',
  data: data,
  borderColor: 'rgba(255, 255, 255, 1)',
  borderWidth: 2,
  pointRadius: 0,
  fill: false,
});

new Chart(ctx, {
  type: 'line',
  data: {
    datasets: datasets
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year'
        },
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Price (USD)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Bitcoin Rainbow Chart',
        font: {
          size: 20
        }
      },
      legend: {
        display: false
      }
    }
  }
});