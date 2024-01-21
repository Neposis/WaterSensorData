<script>
    import {MapLibre, Marker, Popup, GeoJSON, LineLayer} from "svelte-maplibre";

    export let lon;
    export let lat

</script>

<MapLibre
    center={[lon, lat]}
    zoom={15}
    class="map"
    standardControls
    style={"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"}
>
    <Marker lngLat={[lon, lat]}>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                opacity="0.6"
                fill="red"
                d="M20.6211 8.45C19.5711 3.83 15.5411 1.75 12.0011 1.75C12.0011 1.75 12.0011 1.75 11.9911 1.75C8.46107 1.75 4.42107 3.82 3.37107 8.44C2.20107 13.6 5.36107 17.97 8.22107 20.72C9.28107 21.74 10.6411 22.25 12.0011 22.25C13.3611 22.25 14.7211 21.74 15.7711 20.72C18.6311 17.97 21.7911 13.61 20.6211 8.45Z"
            />
            <path
                fill="#292D32"
                d="M12.0016 13.4602C13.7413 13.4602 15.1516 12.0499 15.1516 10.3102C15.1516 8.57046 13.7413 7.16016 12.0016 7.16016C10.2619 7.16016 8.85156 8.57046 8.85156 10.3102C8.85156 12.0499 10.2619 13.4602 12.0016 13.4602Z"
            />
        </svg>


        <Popup openOn="hover" offset={[0, -10]}>
            <div style="color: rgb(0,0,0)">{"my home"}</div>
        </Popup>
    </Marker>
</MapLibre>

<style>
    :global(.map) {
        height: 30vh;
    }
</style>