const chart1 = document.getElementById('myChart').getContext('2d');
// const chart2 = document.getElementById('myChart2').getContext('2d');
// TODO hit an api to get data object then reference below when building object/Class

const buildChart = async () => {
  try {
    const data = await axios.get('/api/user/mygraphdata');
    console.log('data', data);
    const myChart = new Chart(chart1, {
      type: 'bar',
      data: {
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Hrs of Coaching',
            // TODO TEST WITH DATA BELOW, THEN PARSE IN DATA FROM AXIOS
            // data: [
            //   { month: 'Jan', hours: 12 },
            //   { month: 'Feb', hours: 19 },
            //   { month: 'Mar', hours: 3 },
            //   { month: 'Apr', hours: 5 },
            //   { month: 'May', hours: 2 },
            //   { month: 'Jun', hours: 3 },
            //   { month: 'Jul', hours: 6 },
            //   { month: 'Aug', hours: 20 },
            //   { month: 'Sep', hours: 15 },
            //   { month: 'Oct', hours: 14 },
            //   { month: 'Nov', hours: 10 },
            //   { month: 'Dec', hours: 11 },
            // ],
            data: data.data,
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
          yAxisKey: 'minutes',
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
                yMin: 9,
                yMax: 9,
                borderColor: 'rgba(95,214,0, .6)',
                borderWidth: 6,
              },
            },
          },
        },
      },
    });

    // const myChart2 = new Chart(chart2, {
    //   type: 'doughnut',
    //   data: {
    //     labels: [
    //       'Training Type 1',
    //       'Training Type 2',
    //       'Training Type 3',
    //       'Training Type 4',
    //       'Training Type 5',
    //       'Training Type 6',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Coaching Type',
    //         data: [0, 3, 8, 9, 15, 6],
    //         // ! DH - rank colours! Need to changed!!!
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.6)',
    //           'rgba(54, 162, 235, 0.6)',
    //           'rgba(255, 205, 86, 0.6)',
    //           'rgba(152, 85, 86, 0.6)',
    //           'rgba(54, 65, 186, 0.6)',
    //           'rgba(202, 128, 66, 0.6)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 205, 86, 1)',
    //           'rgba(152, 85, 86, 1)',
    //           'rgba(54, 65, 186, 1)',
    //           'rgba(202, 128, 66, 1)',
    //         ],
    //         hoverOffset: 30,
    //         borderWidth: 3,
    //         borderRadius: 2,
    //       },
    //     ],
    //   },
    //   options: {
    //     layout: {
    //       padding: 50,
    //     },
    //     plugins: {
    //       // ! DH - Not sure about the legend?
    //       legend: {
    //         display: false,
    //         position: 'right',
    //         labels: {
    //           // This more specific font property overrides the global property
    //           font: {
    //             size: 14,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  } catch (error) {
    console.error(error);
  }
};

buildChart();
