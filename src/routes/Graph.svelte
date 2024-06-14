<script>
    import {onMount} from "svelte";
    import {Chart} from "chart.js/auto";

    export let id;
    export let labels;
    export let values;

    let config = {
        type: 'line',
        data: {
            labels: [...labels],
            datasets: [{
                data: [...values],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            aspectRatio: 2.5,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 150
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };



    export const update_trigger = () => {
        config.data.labels = labels.slice(-200);
        config.data.datasets[0].data = values.slice(-200);
        charty.update('none')
    }

    let charty;

    let createChart = () => {
        let chart = document.getElementById(`lineChart${id}`);
        let ctx = chart.getContext('2d')

        let gradient = ctx.createLinearGradient(0, 0, 0, 200);

        gradient.addColorStop(0.8, 'rgb(15,255,0)'); // Start color
        gradient.addColorStop(0.5, 'rgb(255,204,0)'); // Mid color
        gradient.addColorStop(0, 'rgb(255,0,0)'); // End color

        config.data.datasets[0].backgroundColor = gradient;
        config.data.datasets[0].borderColor = gradient;

        charty = new Chart(chart, config);
    }

    onMount(createChart)
</script>

<canvas id={`lineChart${id}`} style="width:30vw"></canvas>