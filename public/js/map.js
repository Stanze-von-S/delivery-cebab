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

  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point',
      coordinates: [latitude, longitude],
    },
  }, { preset: 'islands#blackIcon' });

  const myCircle = new ymaps.GeoObject({
    geometry: {
      type: 'Circle',
      coordinates: [latitude, longitude],
      radius: 2000, // динамическая переменная, получаем от юзера, когда он меняет радиус поиска
    },
  });

  myMap.controls.add('zoomControl');
  myMap.controls.add('geolocationControl');
  myMap.controls.add('searchControl', {
    float: 'right',
    size: 'small',
  });

  myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myCircle);

  myCircle.events.add('drag', () => {
    const objectsInsideCircle = objects.searchInside(myCircle);
    objectsInsideCircle.setOptions({
      preset: 'islands#redIcon',
      fillColor: '#ff001a',
      strokeColor: '#ff001a',
    });

    objects.remove(objectsInsideCircle).setOptions({
      preset: 'islands#blueIcon',
      fillColor: '#0081ff',
      strokeColor: '#0081ff',
    });
  });
}
