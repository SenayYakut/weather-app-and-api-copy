function refreshWeather(response) {
  let cityElement = document.querySelector('#city')
  let temperatureElement = document.querySelector('#temperature')
  let cloudElement = document.querySelector('#cloud')
  let humidityElement = document.querySelector('#humidity')
  let windElement = document.querySelector('#wind')
  let dateElement = document.querySelector('#date')
  let date = new Date(response.data.time * 1000)
  let iconElement = document.querySelector('#icon')
  let icon_url = response.data.condition.icon_url
  console.log(response.data)

  iconElement.innerHTML = `<img src="${icon_url}" class="weather-app-icon"/>`
  dateElement.innerHTML = formatDate(date)
  windElement.innerHTML = `${response.data.wind.speed}km/h`
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`

  cloudElement.innerHTML = response.data.condition.description
  cityElement.innerHTML = response.data.city
  temperatureElement.innerHTML = Math.round(response.data.temperature.current)
  getForecast(response.data.city)
}
function formatDate(date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]

  return `${day} ${hours}:${minutes}`
}

function formatDate(date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day} ${hours}:${minutes}`
}

function formatDate(date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day} ${hours}:${minutes}`
}

function searchCity(city) {
  let apiKey = '7e3b4415c5b18tf300a062dfeo8d69f7'
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
  axios.get(apiUrl).then(refreshWeather)
}
function handleEvent(event) {
  event.preventDefault()
  let searchFormInputElement = document.querySelector('#search-form-input')

  searchCity(searchFormInputElement.value)
}

let searchFormElement = document.querySelector('#search-form')
searchFormElement.addEventListener('submit', handleEvent)

function getForecast(city) {
  let apiKey = '7e3b4415c5b18tf300a062dfeo8d69f7'
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(createForecastElement)
}
function getNextDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ['Sun', ['Mon'], ['Tue'], ['Wed'], ['Thur'], ['Fri'], ['Sat']]
  return days[date.getDay()]
}
function createForecastElement(response) {
  console.log(response.data)

  let forecast = ''
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `<div class="weather-forecast-day">
  <div class="weather-forecast-date">${getNextDay(day.time)}</div>
  
  <img class="weather-forecast-icon" src="${day.condition.icon_url}"/>
  
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature-max">
      <strong>${Math.round(day.temperature.maximum)}º</strong>
    </div>
    <div class="weather-forecast-temperature-min">${Math.round(
      day.temperature.minimum,
    )}º</div>
  </div>
</div>`
    }
    let forecastElement = document.querySelector('#forecast')
    forecastElement.innerHTML = forecast
  })
}

searchCity('Istanbul')
