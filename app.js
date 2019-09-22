window.addEventListener('load', () => {
  const preloader = document.querySelector('.preload');

  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(position);
      preloader.classList.add('preload-finish');
      fetchData(lat, long);
    });
  }
});

async function fetchData(late, longe) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${late}&lon=${longe}&&units=metric&APPID=63c527087993d3c6b61373aad19465ba`
    );
    const data = await response.json();
    displayData(data);
  } catch (err) {
    console.error();
  }
}

function displayData(result) {
  console.log(result);
  let img = document.getElementById('icon');
  img.setAttribute(
    'src',
    `http://api.openweathermap.org/img/w/${result.weather[0].icon}.png`
  );
  document.getElementById('temp').textContent = Math.floor(result.main.temp);
  document.getElementById('desc').textContent = result.weather[0].description;
  document.querySelector('.header__location--city').textContent =
    result.sys.name;
  document.querySelector('.header__location--country').textContent =
    result.name;
  document.getElementById('pressure').textContent =
    result.main.pressure + ' hpa';
  document.getElementById('humidity').textContent = result.main.humidity + ' %';
  document.getElementById('wind').textContent = result.wind.speed + ' m/s';
  let date = new Date();
  document.querySelector('.header__timezone').textContent = date.toDateString();
}
