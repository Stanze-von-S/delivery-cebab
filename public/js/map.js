let guestLatitude; // динамическая переменная, юзер указывает свою локацию через браузер
let guestLongitude; // динамическая переменная, юзер указывает свою локацию через браузер
const arrGlobalCoordinates = [];

const radiusSearchSlider = document.querySelector('#radiusSearch');

window.addEventListener('load', async (event) => {
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  data.coordinates.forEach((element) => {
    const obj = {};
    obj.coords = [+element.latitude, +element.longitude];
    arrGlobalCoordinates.push(obj);
  });
  // console.log(arrGlobalCoordinates);
});

window.addEventListener('load', async (event) => {
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
});

function init() {
  const myMap = new ymaps.Map('map', {
    center: [guestLatitude, guestLongitude],
    zoom: 11,
    controls: [],
  });

  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point',
      coordinates: [guestLatitude, guestLongitude],
    },
  }, { preset: 'islands#blackIcon' });
  myMap.geoObjects.add(myGeoObject);

  myMap.controls.add('zoomControl');
  myMap.controls.add('geolocationControl');
  myMap.controls.add('searchControl', {
    float: 'right',
    size: 'small',
  });

  const myCollection = new ymaps.GeoObjectCollection({}, {
    preset: 'islands#redIcon',
    draggable: false,
  });

  arrGlobalCoordinates.forEach((points) => {
    myCollection.add(new ymaps.Placemark(points.coords));
  });

  myMap.geoObjects.add(myCollection);

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

  ymaps?.addEventListener('click', (event) => {
    if (event) {
      const myGeocoder = ymaps.geocode('Петрозаводск');
    }
  });
}
