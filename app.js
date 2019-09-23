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

function displayData(result) {
  let windSpeed = document.querySelector('.wind-speed__value');
  let humidity = document.querySelector('.humidity__value');
  let cloudiness = document.querySelector('.cloudiness__value');
  let temp = document.querySelector('.temperature__value');
  let min = document.querySelector('.min-temp');
  let max = document.querySelector('.max-temp');
  let desc = document.querySelector('.weather__description');
  let city = document.querySelector('.location__city');
  let country = document.querySelector('.location__country--code');
  let img = document.querySelector('.weather__icon');

  humidity.textContent = result.main.humidity + ' %';
  windSpeed.textContent = result.wind.speed + ' m/s';
  cloudiness.textContent = result.clouds.all + ' %';
  temp.textContent = Math.floor(result.main.temp);
  min.textContent = Math.floor(result.main.temp_min);
  max.textContent = Math.floor(result.main.temp_max);
  desc.textContent = result.weather[0].description;
  country.textContent = ',' + ' ' + result.sys.country;
  city.textContent = result.name;
  img.setAttribute(
    'src',
    `https://api.openweathermap.org/img/w/${result.weather[0].icon}.png`
  );

  let date = new Date();
  document.querySelector('.header__timezone').textContent = date.toDateString();
}

function changeBackground() {
  let box = document.querySelector('.app__container');
  let currentTime = new Date().getHours();
  console.log(currentTime);
  if (1 <= currentTime && currentTime < 20) {
    box.classList.add('app__night');
    document.body.style.backgroundColor = '#5e4b7f';
    box.classList.remove('app__day');
  } else {
    box.classList.add('app__day');
    document.body.style.backgroundColor = '#4f93a0';
    box.classList.remove('app__night');
  }
}

function changeTemperatureScale() {
  let scale = document.querySelector('.scale');
  console.log(scale);
  console.log(scale.innerHTML);
  scale.addEventListener('click', () => {
    if (scale.innerHTML === '&#176;C') {
      console.log(scale.innerHTML);
      scale.innerHTML = '&#176;F';
    } else {
      scale.innerHTML = '&#176;C';
    }
  });
}
changeTemperatureScale();
