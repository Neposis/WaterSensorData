<script>
    import {onMount} from "svelte";
    import {Chart} from "chart.js/auto";

    export let id;
    export let labels;
    export let values;


    const config = {
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
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };


    let createChart = () => {
        let ctx = document.getElementById(`lineChart${id}`);
        let myChart = new Chart(ctx, config);
    }

    onMount(createChart)
</script>

<canvas id={`lineChart${id}`} style="width:30vw"></canvas>