<script>
    import {Chart} from "chart.js/auto";
    import {onMount} from "svelte";

    export let id;
    export let label, data, max;

    let createChart = () => {
        let ctx = document.getElementById(`doughnutChart${id}`).getContext('2d');

         let gradient = ctx.createLinearGradient(0, 0, 200, 0);

         gradient.addColorStop(0, 'rgb(15,255,0)'); // End color
        gradient.addColorStop(1, 'rgb(255,0,0)'); // Start color

        const config = {
            type: 'doughnut',
            data: {
                labels: [label],
                datasets: [{
                    data: [data, max-data],
                    backgroundColor: [gradient, "rgba(0,0,0,0.5)"],
                    borderColor: ['', 'transparent'],
                }]
            },
            options: {
                // cutoutPercentage: 80, // Adjust the cutout percentage to create a doughnut effect
                responsive: false,
                maintainAspectRatio: true,
                circumference: 360,
                rotation: -90,
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

        let myChart = new Chart(ctx, config);
    }

    onMount(createChart)
</script>

<canvas id={`doughnutChart${id}`} style="width: 100%"></canvas>