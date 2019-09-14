$(document).ready(() => {
    chrome.runtime.sendMessage({ 'method': 'getWeatherCondition' }, (weatherCondtion) => {
        displayWeather(weatherCondtion);
    });

    function displayWeather(weatherCondtion) {
        let iconName = weatherIcons.get(weatherCondtion.iconName)[0];
        let backgroundColorValue = weatherIcons.get(weatherCondtion.iconName)[1];

        $('div.transbox').css({ 'background-color': backgroundColorValue });
        $('body').css('background-image', `url(images/${iconName}.jpg)`);

        $('.transbox .location').html(`${weatherCondtion.name}, ${weatherCondtion.country}`);
        $('.date').html(getDate());
        $('.time').html(getTime());
        $('.temperature').html(Math.round(weatherCondtion.main.temp));
        $('.wi').removeClass().addClass(`wi ${iconName}`);
        $('#feels-like').append(`${Math.round(weatherCondtion.feelsLike)}&#x2103;`);
        $('#maximum-temperature').append(`${Math.round(weatherCondtion.main.temp_max)}&#x2103;`);
        $('#minimum-temperature').append(`${Math.round(weatherCondtion.main.temp_min)}&#x2103;`);
        $('#humidity').append(`${weatherCondtion.main.humidity}%`);
        $('#wind-speed').append(`${weatherCondtion.wind.speed} km/h`);
        $('#cloudiness').append(`${weatherCondtion.clouds.all}%`);
        $('#pressure').append(`${weatherCondtion.main.pressure} hPa`);
        $('#visibility').append(`${weatherCondtion.visibility} km`);
    }
});

let weatherIcons = new Map([
    ['01d', ['wi-day-sunny', '#244375']],
    ['01n', ['wi-night-clear', '#1e2a3a']],
    ['02d', ['wi-day-cloudy', '#023a47']],
    ['02n', ['wi-night-cloudy', '#262930']],
    ['03d', ['wi-cloud', '#cec56b']],
    ['03n', ['wi-cloud', '#cec56b']],
    ['04d', ['wi-cloudy', '#2a2a46']],
    ['04n', ['wi-cloudy', '#2a2a46']],
    ['09d', ['wi-showers', '#071342']],
    ['09n', ['wi-showers', '#071342']],
    ['10d', ['wi-day-rain', '#70727f']],
    ['10n', ['wi-night-rain', '#113d30']],
    ['11d', ['wi-thunderstorm', '#194476']],
    ['11n', ['wi-thunderstorm', '#194476']],
    ['13d', ['wi-snow', '#807360']],
    ['13n', ['wi-snow', '#807360']],
    ['50d', ['wi-fog', '#a0adb9']],
    ['50n', ['wi-fog', '#a0adb9']]
]);

function getDate() {
    let today = new Date();
    let month = today.toLocaleString('en-us', { month: 'short' });
    let dayOfWeek = today.toLocaleString('en-use', { weekday: 'short' });
    return `${dayOfWeek} ${month} ${today.getDate()}, ${today.getFullYear()}`;
}

function getTime() {
    let today = new Date();
    return `${today.getHours()} : ${today.getMinutes()}`;
}