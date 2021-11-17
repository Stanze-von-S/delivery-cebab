let latitude;
let longitude;

window.addEventListener('load', async (event) => {
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    },
  );
});

ymaps.ready(init);

function init() {
  console.log(latitude, longitude);
  const myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 17,
  });

  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point',
      coordinates: [latitude, longitude],
    },
  }, { preset: 'islands#blackIcon' });

  myMap.geoObjects.add(myGeoObject);
}
