// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// APP DATA
const weather = {};

weather.temperature = {
  unit: "celsius"
}

//APP CONSTS AND VARS
const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  //console.log(api);
  
  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      weather.temperature.value = Math.round(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function(){
      displayWeather();
    })
}

//DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML= `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span></p>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}. ${weather.country}`;
}

//C TO F CONVERSION
function CelsiusToFahrenhit(temperature){
  return (temperature*9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "celsius")
  {
    let fahrenhit = Math.round(CelsiusToFahrenhit(weather.temperature.value));
    tempElement.innerHTML = `${fahrenhit}°<span>F</span></p>`;
    weather.temperature.unit="fahrenhit";
  }
  else{
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span></p>`;
    weather.temperature.unit = "celsius"
  }
})