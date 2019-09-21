window.addEventListener('load', () => {
  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(position);
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
  let img = document.getElementById('icon');
  img.setAttribute(
    'src',
    `http://api.openweathermap.org/img/w/${result.weather[0].icon}.png`
  );
  document.getElementById('temp').textContent = Math.floor(result.main.temp) + ' C';
  document.getElementById('desc').textContent = result.weather[0].description;
  document.querySelector('.header__location--city').textContent = result.sys.name;
  document.querySelector('.header__location--country').textContent = result.name;
}
