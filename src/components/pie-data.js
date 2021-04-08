export const pieChartData = {
    type: "pie",
    data: {
        datasets: [{
            data: [25, 100, 30, 50],
            backgroundColor: ['#FFCC80','#81D4FA','#FFAB91', '#B39DDB'],
            borderColor: "#fff",
        }],
        labels: [
            'No initial data',
            'Initial sequence',
            'Only flanking',
            'Flanking + Initial sequence'
        ],
    },
    options: {
        responsive: true,
        legend: {
            align: 'start',
            position: 'right',
            labels: {
                boxWidth: 30,
                padding: 15,
                fontStyle:'bold'
            }
        },
        plugins: {
            datalabels: {
                formatter: function(value, ctx) {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(0)+"%";
                    return percentage;
                },
                color: '#fff',
                font: {
                    weight: "bold",
                    size: 20
                },
                anchor: 'center'
            }
        },
    }
};

export default pieChartData;