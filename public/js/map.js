let guestLatitude; // динамическая переменная, юзер указывает свою локацию через браузер
let guestLongitude; // динамическая переменная, юзер указывает свою локацию через браузер

const getCoordinatesBtn = document.querySelector('#getCoordinates');
const radiusSearchSlider = document.querySelector('#radiusSearch');

getCoordinatesBtn?.addEventListener('click', async (event) => {
  // const {latitude, longitude};
  // console.log(event);
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates,
    }),
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
});

setTimeout(window.addEventListener('load', async (event) => {
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      guestLatitude = position.coords.latitude;
      guestLongitude = position.coords.longitude;
      ymaps.ready(init);
    },
    (positionError) => {
      guestLatitude = 59.943683;
      guestLongitude = 30.360164;
      ymaps.ready(init);
    },
  );
}), 2000);

function init() {
  const myMap = new ymaps.Map('map', {
    center: [guestLatitude, guestLongitude],
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
      coordinates: [guestLatitude, guestLongitude],
    },
  }, { preset: 'islands#blackIcon' });

  myMap.geoObjects.add(myGeoObject);

  let myCircle;

  radiusSearchSlider.addEventListener('change', (event) => {
    const createCircle = () => {
      myCircle = new ymaps.GeoObject({
        geometry: {
          type: 'Circle',
          coordinates: [guestLatitude, guestLongitude],
          radius: event.target.value,
        },
      });
      myMap.geoObjects.add(myCircle);
    };

    if (!myCircle) {
      createCircle();
    } else {
      myMap.geoObjects.remove(myCircle);
      createCircle();
    }
  });
}
