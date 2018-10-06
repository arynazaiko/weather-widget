var currentWeather;
var fiveDaysForecast;

const fiveDaysForecastDiv = document.querySelector('.five-days-forecast');
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247';
const FIVE_DAYS_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247';
const FORECAST_DAY_HOURS = 12;

setHandlers();
updateWeather();

function setHandlers() {
  updateHandler();
}

function updateHandler() {
  document.querySelector('.update').addEventListener('click', updateWeather);
}

function updateWeather() {
  makeRequest('get', CURRENT_WEATHER_URL, getCurrentWeather);
  makeRequest('get', FIVE_DAYS_WEATHER_URL, getFiveDaysForecast);
}

function getCurrentWeather(data) {
  currentWeather = JSON.parse(data);
  console.log(currentWeather);

  document.querySelector('.city').innerHTML = currentWeather.name;
  document.querySelector('.country').innerHTML = currentWeather.sys.country;
  document.querySelector('.main-temperature').innerHTML = currentWeather.main.temp;
  document.querySelector('.wind').innerHTML = currentWeather.wind.speed;
}

function getFiveDaysForecast(data) {
  fiveDaysForecastDiv.innerHTML = '';
  fiveDaysForecast = JSON.parse(data);

  var filteredForecast = fiveDaysForecast.list.filter(function(item) {
    var date = new Date(item.dt_txt);
    var hours = date.getHours();
    return hours == FORECAST_DAY_HOURS;
  });
  console.log(filteredForecast);

  filteredForecast.forEach(renderFiveDaysForecastBlock);
}

function renderFiveDaysForecastBlock(element) {
  var forecastBlock = document.createElement('DIV');
  forecastBlock.classList.add('five-days-forecast-block', 'clearfix');

  var date = document.createElement('DIV');
  date.classList.add('date');
  date.innerText = element.dt_txt;
  
  var icon = document.createElement('DIV');
  icon.classList.add('icon');
  icon.innerText = element.weather[0].icon;
  
  var temperature = document.createElement('DIV');
  temperature.classList.add('temperature');
  temperature.innerText = element.main.temp;
  
  forecastBlock.appendChild(date);
  forecastBlock.appendChild(icon);
  forecastBlock.appendChild(temperature);
  
  fiveDaysForecastDiv.appendChild(forecastBlock);
}

function makeRequest(type, url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhttp.open(type, url, true);
  xhttp.send();
}

