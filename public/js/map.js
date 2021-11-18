let latitude; // динамическая переменная, юзер указывает свою локацию через браузер
let longitude; // динамическая переменная, юзер указывает свою локацию через браузер

window.addEventListener('load', async (event) => {
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      ymaps.ready(init);
    },
    (positionError) => {
      latitude = 59.943683;
      longitude = 30.360164;
      ymaps.ready(init);
    },
  );
});

function init() {
  const myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 13,
    controls: [],
  });

  myMap.controls.add('zoomControl');
  myMap.controls.add('geolocationControl');
  myMap.controls.add('searchControl', {
    float: 'right',
    size: 'small',
  });

  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point',
      coordinates: [latitude, longitude],
    },
  }, { preset: 'islands#blackIcon' });

  function createCircle(rad) {
    const myCircle = new ymaps.GeoObject({
      geometry: {
        type: 'Circle',
        coordinates: [latitude, longitude],
        radius: rad,
      },
    });
    myMap.geoObjects.add(myCircle);
  }

  myMap.geoObjects.add(myGeoObject);

  const radiusSearchSlider = document.querySelector('#radiusSearch');

  radiusSearchSlider.addEventListener('change', (event) => {
    createCircle(event.target.value);
  });
}
