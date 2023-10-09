import { Chart } from "chart.js";

function ChartTemplate(props, ctx) {
    const barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.label,
                    data: props.data,
                    backgroundColor: props.backgroundColor,
                    borderColor: props.borderColor,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                        },
                    },
                ],
            },
        },
    });

    return (
        <div>
            <canvas id="myChart" width="400" height="400">
                {barChart}
            </canvas>
        </div>
    );

}
export default ChartTemplate;