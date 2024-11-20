<script>
    import {onMount} from "svelte";
    import Draggable from './Draggable.svelte';

    export let id, value, max, initial;


    let current_colour = "rgb(0 255 0)";
    function hsv2rgb(h,s,v) {
        let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
        return [f(5),f(3),f(1)];
    }

    export const update_trigger = () => {
        if (typeof max === "string") {
            let h = 100 - (100 / max * value); // red to green = h 0 - 100
            current_colour = hsv2rgb(h, 1, 1)
        } else {
            if (value < max[0]) {
                current_colour = [0, 255, 0];
            } else if (value < max[1]) {
                current_colour = [255, 251, 0];
            } else if (value < max[2]) {
                current_colour = [255, 0, 0];
            }
        }
    }

    onMount(() => {
        current_colour = "rgb(0 255 0)";
    })



</script>

<Draggable left={200} top={1000}>
    <div>{id}</div>
    <div id={`ampSquare${id}`} class="square" width=32px height=32px style="background-color: {`rgb(${current_colour[0]*255} ${current_colour[1]*255} ${current_colour[2]*255})`}" >{value}</div>
</Draggable>

<style>
    .square {
        width: 64px;
        height: 64px;
        align-content: center;
        text-align: center;
    }
</style>