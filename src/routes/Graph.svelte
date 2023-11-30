<script>
    import {onMount} from "svelte";
    import {Chart} from "chart.js/auto";

    export let id;

    const config = {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };



    let createChart = () => {
        let ctx = document.getElementById(`myChart${id}`);
        let myChart = new Chart(ctx, config);
    }

    onMount(createChart)
</script>

<canvas id={`myChart${id}`}></canvas>