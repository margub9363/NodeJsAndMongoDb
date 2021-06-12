/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicmFobWFuOTM2MyIsImEiOiJja3B0Y3V1YjEwMWo1MnZuemd6ZDlrMjA2In0.lh1MTi-DnuxVDLcoxmukYA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/rahman9363/ckptejaub0wzw17n354zcv6e2',
  scrollZoom: false,
  //   center: [-118.113491, 34.111745],
  //   zoom: 4,
  //   imteractive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //   Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  //   Extends the map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 200,
    right: 200,
  },
});
