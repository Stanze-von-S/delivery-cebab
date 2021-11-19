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

  radiusSearchSlider?.addEventListener('change', (event) => {
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

  // Слушаем клик на карте.
  myMap.events.add('click', (event) => {
    const clickCoords = event.get('coords');

    function getAddress(coords) {
      myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties
          .set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ].filter(Boolean).join(', '),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: firstGeoObject.getAddressLine(),
          });
      });
    }

    function createPlacemark(coords) {
      return new ymaps.Placemark(coords, {
        iconCaption: 'поиск...',
      }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
      });
    }

    const myPlacemark = createPlacemark(clickCoords);
    myMap.geoObjects.add(myPlacemark);

    getAddress(clickCoords);
    // console.log(clickCoords);
    document.createForm.latitude.value = clickCoords[0];
    document.createForm.longitude.value = clickCoords[1];
  });
}
