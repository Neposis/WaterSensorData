import { readable, writable } from 'svelte/store';
import { onMount } from 'svelte';


export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
});

export let arduino_data = () => {}

arduino_data = readable({}, function start(set) {
    let ws, connection_finished;
    onMount(() => {

         ws = new WebSocket("ws://localhost:8085")

         connection_finished = false;

        ws.addEventListener('open',() => {
            console.log('Connected to WebSocket server');
        });

        ws.addEventListener('message', (data) => {
            data = data.data;

            if (!connection_finished) {
                console.info(`Server: ${data}`);

                if (data === "State your business!") {
                    ws.send("I'm a WebClient");
                    console.info("Me: I'm a WebClient");
                } else if (data === "Ok fine, you can join in...") {
                    connection_finished = true;
                } else if (data === "Go away, I don't know who you are!") {
                    console.error("Something went wrong, I got denied...");
                    ws.close();
                }

            } else {
                let json_data = JSON.parse(data)
                for (const val of Object.keys(json_data)) {
                    if (val === "time") {json_data[val] = parseInt(json_data[val])}
                    else if (val === "longitude" || val === "latitude") json_data[val] = parseFloat(json_data[val])
                    else json_data[val] = parseFloat(json_data[val]).toFixed(2)
                }
                console.log(json_data)
                set(json_data)
            }

        });

        ws.addEventListener('close', () => {
            console.log('Connection closed');
        });

        ws.addEventListener('error', (error) => {
            console.error(`WebSocket error:`);
            console.error(error)
        });

        return function stop() {
            ws.close();
        };
    })
});


