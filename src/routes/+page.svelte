<script>
    import {time, arduino_data} from "../stores.js";
    import Graph from "./Graph.svelte";
    import Map from "./Map.svelte";
    import Doughnut from "./Doughnut.svelte";
    import {onMount, afterUpdate} from "svelte";

    let dataGraph = {time: [], celsius: [], fahrenheit: [], tds: [], ph: [], turbidity: []};

    let loaded = false;

    let doughnutUpdate = {
        celsius: () => {},
        fahrenheit: () => {},
        tds: () => {},
        ph: () => {},
        turbidity: () => {}
    }
    let graphUpdate = {
        celsius: () => {},
        fahrenheit: () => {},
        tds: () => {},
        ph: () => {},
        turbidity: () => {}
    }


    onMount(() => {
        dataGraph = {time: [], celsius: [], fahrenheit: [], tds: [], ph: [], turbidity: []}

        const loadInterval = setInterval(() => {
            if ($arduino_data.celsius !== undefined) {
                loaded = true;
                clearInterval(loadInterval)
            }
        }, 100);
    })

    $: $arduino_data, updateGraph();
    function updateGraph() {
        if (loaded) {
            dataGraph.time.push(new Date($arduino_data.time * 1000).toLocaleTimeString())
            dataGraph.celsius.push($arduino_data.celsius)
            dataGraph.fahrenheit.push($arduino_data.fahrenheit)
            dataGraph.tds.push($arduino_data.tds)
            dataGraph.ph.push($arduino_data.ph)
            dataGraph.turbidity.push($arduino_data.turbidity)

            if (dataGraph.time.length >= 100) {
                for (const i of Object.keys(dataGraph)) {
                    dataGraph[i] = dataGraph[i].slice(-100);
                }
            }

            for (const i of Object.keys(doughnutUpdate)) {
                doughnutUpdate[i]()
            }
            for (const i of Object.keys(graphUpdate)) {
                graphUpdate[i]()
            }
        }
    }


    const formatter = new Intl.DateTimeFormat('en', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });

    let clickHandle = () => {

        alert("Button!");
    }
</script>

{#if loaded}
<div class="home-header">
    <header class="home-navbar">
        <span class="home-logo">AquaMeter</span>
            <div class="home-buttons">
                <nav class="home-interaction">
                    <button type="button" class="home-button button" on:click={clickHandle}>Save Data</button>
                    <button type="button" class="home-button1 button">Import Data</button>
                    <button type="button" class="home-button2 button">Export Data</button>
                    <button type="button" class="home-button3 button">Delete Data</button>
                </nav>
            </div>

    </header>
</div>

<div class="home-footer"></div>

<div class="home-features">
    <div class="data-bar">
        <h1 class="home-text">Data:</h1>
        <div class="doughnutValues">
            <div class="doughnutDiv">
                <h4>Temp. (oC)</h4>
                <Doughnut id={"0"} label="Celsius" value={$arduino_data.celsius} max={50} bind:update_trigger={doughnutUpdate.celsius}/>
                <h3 class="doughnutText">{$arduino_data.celsius}</h3>
            </div>
            <div class="doughnutDiv">
                <h4>Temp. (oF)</h4>
                <Doughnut id={"1"} label="Fahrenheit" value={$arduino_data.fahrenheit} max={162} bind:update_trigger={doughnutUpdate.fahrenheit}/>
                <h3 class="doughnutText">{$arduino_data.fahrenheit}</h3>
            </div>
            <div class="doughnutDiv">
                <h4>pH</h4>
                <Doughnut id={"2"} label="pH" value={$arduino_data.ph} max={14} bind:update_trigger={doughnutUpdate.ph}/>
                <h3 class="doughnutText">{$arduino_data.ph}</h3>
            </div>
            <div class="doughnutDiv">
                <h4>Turb.</h4>
                <Doughnut id={"3"} label="Turb" value={$arduino_data.turbidity} max={5000} bind:update_trigger={doughnutUpdate.turbidity}/>
                <h3 class="doughnutTextSmaller">{$arduino_data.turbidity}</h3>
            </div>
            <div class="doughnutDiv">
                <h4>TDS.</h4>
                <Doughnut id={"4"} label="TDS" value={$arduino_data.tds} max={200} bind:update_trigger={doughnutUpdate.tds}/>
                <h3 class="doughnutText">{$arduino_data.tds}</h3>
            </div>
        </div>
    </div>


    <div class="home-container1">
        <div class="grid-databox">
            <h3>Temperature</h3>
            <Graph id={"0"} labels={dataGraph.time} values={dataGraph.celsius} bind:update_trigger={graphUpdate.celsius}/>
        </div>
        <div class="grid-databox">
            <h3>pH Level</h3>
            <Graph id={"1"} labels={dataGraph.time} values={dataGraph.ph} bind:update_trigger={graphUpdate.ph}/>
        </div>
        <div class="grid-databox">
            <h3>Turbidity</h3>
            <Graph id={"2"} labels={dataGraph.time} values={dataGraph.turbidity} bind:update_trigger={graphUpdate.turbidity}/>
        </div>
        <div class="grid-databox">
            <h3>TDS</h3>
            <Graph id={"3"} labels={dataGraph.time} values={dataGraph.tds} bind:update_trigger={graphUpdate.tds}/>
        </div>
    </div>

    <h1>The time is {formatter.format($time)}</h1>
    <h3>Map</h3>
    <Map lon={$arduino_data.longitude} lat={$arduino_data.latitude} />
</div>

<footer class="home-footer1">
    <div class="home-container2">
        <span class="home-logo1">Group F Design</span>
    </div>
    <div class="home-container3">
        <span class="home-text1">© 2023 Group F, All Rights Reserved.</span>
        <div class="home-icon-group">
            <svg viewBox="0 0 950.8571428571428 1024" class="home-icon">
                <path
                    d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
                ></path>
            </svg>
            <svg viewBox="0 0 877.7142857142857 1024" class="home-icon2">
                <path
                    d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
                ></path>
            </svg>
            <svg viewBox="0 0 602.2582857142856 1024" class="home-icon4">
                <path
                    d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"
                ></path>
            </svg>
        </div>
    </div>
</footer>

{/if}

<style>

    .home-header {
        width: 100vw;
        display: flex;
        position: fixed;
        align-items: center;
        padding-top: var(--dl-space-space-oneandhalfunits);
        flex-direction: column;
        padding-bottom: var(--dl-space-space-oneandhalfunits);
        background-color: rgb(48, 48, 48);
        z-index: 100;
        border-bottom: rgb(38, 40, 40) 2px solid;
    }
    .home-navbar {
        width: 95.5vw;
        display: flex;
        position: sticky;
        min-height: 3vh;
        align-items: center;
        align-self: start;
        background: rgb(89 129 161);
        background: linear-gradient(108deg, rgba(140,82,255,1) 0%, rgba(92,225,230,1) 100%);
        border-radius: 0 50px 50px 0;
        padding: 0.5rem var(--dl-space-space-threeunits) 0.5rem var(--dl-space-space-twounits);
        justify-content: space-between;
    }
    .home-logo {
        font-size: calc(2vw + 2vh);
        font-family: 'MonaKo',sans-serif;
        font-weight: bold;
        text-transform: capitalize;
    }
    .home-buttons {
        display: flex;
        width: 60vw;
        padding-left: 0;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        & nav button {
            font-size: 1.25vw;
            width: max-content;
            text-wrap: nowrap;
        };
    }

    .home-footer {
        flex: 0 0 auto;
        width: 100%;
        border: 2px solid rgba(103, 95, 95, 0.4);
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--dl-color-gray-black);
        margin-top: 10vh;
    }
    .data-bar {
        display: flex;
        padding-top: 5vh;
        padding-left: 5vw;
    }

    .home-features {
        width: 100vw;
        align-self: center;
        display: flex;
        padding: var(--dl-space-space-unit) var(--dl-space-space-threeunits);
        margin-bottom: var(--dl-space-space-fourunits);
        position: relative;
        flex-direction: column;
    }
    .home-text {
        color: rgb(255, 255, 255);
        font-size: calc(1.2vw + 1.2vh);
        text-decoration: underline;
        margin-bottom: 0;
    }
    .home-interaction {
        width: 100%;
        display: flex;
        column-gap: 5%;
        min-height: 5vh;
        align-items: center;
        justify-content: center;
        grid-auto-columns: 25% 25% 25% 25%;
    }
    .button {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-width: 1px;
        border-radius: 4px;
        min-height: 4vh;
        background-color: rgb(48, 48, 48);
        color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
    }
    .home-button {
        border-radius: 1rem;
    }
    .home-button1 {
        border-radius: 1rem;
    }
    .home-button2 {
        border-radius: 1rem;
    }
    .home-button3 {
        border-radius: 1rem;
    }
    .home-container1 {
        display: grid;
        align-self: center;
        width: 80vw;
        grid-gap: 2vw;
        position: relative;
        justify-content: center;
        align-content: center;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 3vh;
    }
    .grid-databox {
        text-align: center;
        width: 40vw;
        height: 25vh;
        margin-bottom: 5vh;
        align-items: center;

    }

    .doughnutValues {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 1vw;
        width: 60vw;
        padding-left: 5vw;
        align-self: center;
    }

    .doughnutDiv {
        text-align: -webkit-center;
        display: grid;
        height: fit-content;
        width: 8vw;
        align-items: center;
        padding: 0 2vw 0 2vw;
        grid-auto-columns: 1fr 1fr;
        & canvas {
            grid-column: 1;
            grid-row: 1;
            position: relative;
            top: -2vh;
        };
        & h4 {
            position: relative;
            top: -5vh;
        };
    }

    .doughnutText {
        grid-column: 1;
        grid-row: 1;
        font-size: 1.5vw;
    }

    .doughnutTextSmaller {
        grid-column: 1;
        grid-row: 1;
        font-size: 1.0vw;
    }

    .home-footer1 {
        width: 100vw;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: var(--dl-space-space-fourunits) var(--dl-space-space-twounits);
        justify-content: space-between;
        background-color: rgb(24, 30, 33);
    }
    .home-container2 {
        gap: var(--dl-space-space-oneandhalfunits);
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
    }
    .home-logo1 {
        font-size: 2em;
        font-style: italic;
        font-family: Verdana, serif;
        font-weight: bold;
    }
    .home-container3 {
        flex: 0 0 auto;
        width: 95%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }
    .home-text1 {
        color: var(--dl-color-secondary-gray500);
    }
    .home-icon-group {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }
    .home-icon {
        fill: var(--dl-color-secondary-gray500);
        width: 24px;
        height: 24px;
        margin-right: var(--dl-space-space-twounits);
    }
    .home-icon2 {
        fill: var(--dl-color-secondary-gray500);
        width: 24px;
        height: 24px;
        margin-right: var(--dl-space-space-twounits);
    }
    .home-icon4 {
        fill: var(--dl-color-secondary-gray500);
        width: 24px;
        height: 24px;
    }
    @media screen and (max-width: 600px) {
        .home-navbar {
            width: 90vw;
            padding: 0 10vw 0 1vw;
        }

        .home-logo {
            padding-right: 4vw;
        }

        .home-buttons nav button {
            font-size: 0.6rem;
            text-wrap: wrap;
        }
        .home-buttons nav {
            padding-left: 1vw;
        }

        .home-features {
            width: 90vw;
        }
        .data-bar {
            padding-top: 0;
            padding-left: 2vw;
        }
        .doughnutDiv {
            width: 12vw;
        }
        .home-container1 {
            width: 90vw;
            align-self: center;
        }
    }

</style>


