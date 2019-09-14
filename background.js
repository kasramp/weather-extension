const ALARM_NAME_WEATHER_EXTENSION_ALARM = "weather-extension-alarm";
const COMMUNICATION_CHANNEL_NAME_WEATHER_EXTENSION = "weather-extension-channel";

var weatherCondition;

chrome.alarms.create(ALARM_NAME_WEATHER_EXTENSION_ALARM, { delayInMinutes: 5, periodInMinutes: 0.2 });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method == 'getWeatherCondition')
        sendResponse(weatherCondition);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (ALARM_NAME_WEATHER_EXTENSION_ALARM === alarm.name) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            console.log("navigator is not enabled!");
        }
    }
});

function getWeather(position) {
    fetch(`http://weather-api.madadipouya.com/v1/weather/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then((response) => response.json())
        .then((result) => weatherCondition = result)
        .catch((error) => console.log(error));
}