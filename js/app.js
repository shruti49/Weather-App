/*********WINDOW LOADER AND LOCATION USING NAVIGATOR GEOLOCATION*********/
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preload');

  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      preloader.classList.add('preload-finish');
      changeBackground();
      fetchData(lat, long);
    });
  }
});

/**************FECTHING DATA FROM API********************/
async function fetchData(late, longe) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${late}&lon=${longe}&&units=metric&APPID=63c527087993d3c6b61373aad19465ba`
    );
    const data = await response.json();
    displayData(data);
  } catch (err) {
    console.error();
  }
}

/********************INITIALIZATION***********************/
let windSpeed = document.querySelector('.wind-speed__value');
let humidity = document.querySelector('.humidity__value');
let cloudiness = document.querySelector('.cloudiness__value');
let temp = document.querySelector('.temperature__value');
let min = document.querySelector('.min-temp');
let max = document.querySelector('.max-temp');
let desc = document.querySelector('.weather__description');
let city = document.querySelector('.location__city');
let country = document.querySelector('.location__country--code');
let icon = document.querySelector('#weather__icon');
let box = document.querySelector('.app__container');
let scale = document.querySelector('.scale');
let cel;
let far;

/***************DISPLAY THE FETCHED DATA******************/
function displayData(result) {
  humidity.textContent = result.main.humidity + ' %';
  windSpeed.textContent = result.wind.speed + ' m/s';
  cloudiness.textContent = result.clouds.all + ' %';
  temp.textContent = Math.floor(result.main.temp);
  min.textContent = Math.floor(result.main.temp_min);
  max.textContent = Math.floor(result.main.temp_max);
  desc.textContent = result.weather[0].description;
  country.textContent = ',' + ' ' + result.sys.country;
  city.textContent = result.name;

  let iconId = result.weather[0].id;
  let iconClass = `wi-owm-${iconId}`;
  icon.classList.add(iconClass);
  cel = Math.floor(result.main.temp);
}

/*****************CHANGINH BACKGROUND IMAGES ACCORDING TO DAY AND NIGHT**********/
function changeBackground() {
  let hours = new Date().getHours();

  if (7 <= hours && hours < 19) {
    box.classList.add('app__day');
    document.body.style.backgroundColor = '#4f93a0';
    box.classList.remove('app__night');
  } else {
    box.classList.add('app__night');

    document.body.style.backgroundColor = '#5e4b7f';
    document.querySelector('#weather__icon').style.color = '#fff';

    document.querySelector('.wind-img').src = 'images/wind-white.png';
    document.querySelector('.cloud-img').src = 'images/clouds-white.png';
    document.querySelector('.humidity-img').src = 'images/humidity-white.png';

    box.classList.remove('app__day');
  }
}

const celsiusToFahrenheit = celsius => {
  return ((celsius * 9) / 5 + 32).toFixed(0);
};

let fahrenheitToCelsius = fahrenheit => {
  return (((fahrenheit - 32) * 5) / 9).toFixed(0);
};

/***************TOGGLING BETWEEEN TEMPERATURE SCALES***************/
function changeTemperatureScale(temperature, maxTemperature, minTemperature) {
  let deg = '&#8451;';

  scale.addEventListener('click', () => {
    //IF DEGREE IS IN CELCIUS
    if (deg === '&#8451;') {
      //CHANGE IT TO FARENHEIT
      deg = '&#8457;';

      scale.innerHTML = deg;

      temperature.textContent = celsiusToFahrenheit(cel);
      maxTemperature.textContent = celsiusToFahrenheit(cel);
      minTemperature.textContent = celsiusToFahrenheit(cel);
    }
    //IF DEGREE IS IN FARENHEIT
    else if (deg === '&#8457;') {
      //CHANGE IT TO CELCIUS
      deg = '&#8451;';

      scale.innerHTML = deg;

      far = temperature.textContent;

      temperature.textContent = fahrenheitToCelsius(far);
      maxTemperature.textContent = fahrenheitToCelsius(far);
      minTemperature.textContent = fahrenheitToCelsius(far);
    }
  });
}

changeTemperatureScale(temp, min, max);
