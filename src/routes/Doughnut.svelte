<script>
    import {Chart} from "chart.js/auto";
    import {onMount} from "svelte";


    export let id;
    export let label, value, max;

    export const update_trigger = () => {
        charty.data.datasets[0].data[0] = value;
        let x = max - value
        if (x < 0) {x = 0}
        charty.data.datasets[0].data[1] = x;
        charty.update();
    }


    let config;
    let charty;

    let createChart = () => {

        let canvas = document.getElementById(`doughnutChart${id}`);
        let ctx = canvas.getContext('2d')

        let gradient = ctx.createLinearGradient(0, 0, 180, 0);

        gradient.addColorStop(0, 'rgb(15,255,0)'); // Start color
        gradient.addColorStop(0.3, 'rgb(255,204,0)'); // Mid color
        gradient.addColorStop(0.8, 'rgb(255,0,0)'); // End color

        let x = max-value
        if (x < 0) {x = 0}

        config = {
            type: 'doughnut',
            data: {
                labels: [label],
                datasets: [{
                    data: [value, max-value],
                    backgroundColor: [gradient, "rgba(0,0,0,0.5)"],
                    borderColor: ['', 'transparent'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                circumference: 220,
                rotation: -110,
                cutout: "80%",
                events: [],
                tooltips: {
                    enabled: false
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };

        charty = new Chart(ctx, config);
    }

    onMount(createChart)

</script>

<canvas id={`doughnutChart${id}`} style="width: 100%"></canvas>