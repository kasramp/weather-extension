const ALARM_NAME_WEATHER_EXTENSION_ALARM = 'weather-extension-alarm'

chrome.alarms.create(ALARM_NAME_WEATHER_EXTENSION_ALARM, {
  delayInMinutes: 5,
  periodInMinutes: 0.2
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.method === 'getWeatherCondition') {
    chrome.storage.local.get(['weatherCondition'], result =>
      sendResponse(result.weatherCondition)
    )
    return true
  }
  return false
})

chrome.alarms.onAlarm.addListener(alarm => {
  if (ALARM_NAME_WEATHER_EXTENSION_ALARM === alarm.name) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather)
    } else {
      console.log('navigator is not enabled!')
    }
  }
})

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeather)
}

function getWeather (position) {
  fetch(
    `http://weather-api.madadipouya.com/v1/weather/current?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}`
  )
    .then(response => response.json())
    .then(result => {
      chrome.storage.local.remove(['weatherCondition'])
      chrome.storage.local.set({
        weatherCondition: result
      })
    })
    .catch(error => console.log(error))
}
