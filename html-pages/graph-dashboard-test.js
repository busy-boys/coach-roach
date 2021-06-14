const chart1 = document.getElementById('myChart').getContext('2d');
const chart2 = document.getElementById('myChart2').getContext('2d');
// TODO hit an api to get data object then reference below when building object/Class

const myChart = new Chart(chart1, {
  type: 'bar',
  data: {
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Hrs of Coaching',
        data: [
          { month: 'jan', hours: 12 },
          { month: 'feb', hours: 19 },
          { month: 'mar', hours: 3 },
          { month: 'apr', hours: 5 },
          { month: 'may', hours: 2 },
          { month: 'jun', hours: 3 },
          { month: 'jul', hours: 6 },
        ],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 3,
        borderRadius: 15,
      },
    ],
  },
  options: {
    parsing: {
      xAxisKey: 'month',
      yAxisKey: 'hours',
    },
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
            drawTime: 'afterDatasetsDraw',
            type: 'line',
            yMin: 6,
            yMax: 6,
            borderColor: 'rgba(95,214,0, .6)',
            borderWidth: 6,
          },
        },
      },
    },
  },
});

const myChart2 = new Chart(chart2, {
  type: 'doughnut',
  data: {
    labels: [
      'Training Type 1',
      'Training Type 2',
      'Training Type 3',
      'Training Type 4',
      'Training Type 5',
      'Training Type 6',
    ],
    datasets: [
      {
        label: 'Coaching Type',
        data: [0, 3, 8, 9, 15, 6],
        // ! DH - rank colours! Need to changed!!!
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(152, 85, 86, 0.6)',
          'rgba(54, 65, 186, 0.6)',
          'rgba(202, 128, 66, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(152, 85, 86, 1)',
          'rgba(54, 65, 186, 1)',
          'rgba(202, 128, 66, 1)',
        ],
        hoverOffset: 30,
        borderWidth: 3,
        borderRadius: 2,
      },
    ],
  },
  options: {
    layout: {
      padding: 50,
    },
    plugins: {
      // ! DH - Not sure about the legend?
      legend: {
        display: false,
        position: 'right',
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
          },
        },
      },
    },
  },
});
