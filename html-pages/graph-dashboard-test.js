const chart1 = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(chart1, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Hrs of Coaching',
        data: [12, 19, 3, 5, 2, 3, 6],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 3,
        borderRadius: 15,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
          },
        },
      },
      // added this to get a 'goal' line accross the graph!
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 6,
            yMax: 6,
            borderColor: 'rgb(95,214,0)',
          },
        },
      },
    },
  },
});
