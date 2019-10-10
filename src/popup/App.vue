<template>
  <div class="main" v-if="weatherCondition" >
    <div class="transbox" :style="{'background-color': backgroundColor}">
      <label class="location">{{ weatherCondition.name }}, {{ weatherCondition.country }}</label>
    </div>

    <div class="transbox" :style="{'background-color': backgroundColor}">
      <div>
        <div class="date-time">
          <div class="date">{{ date }}</div>
          <div class="time">{{ time }}</div>
        </div>
        <div class="temperature">{{ weatherCondition.temperature }}</div>
        <div class="degree-symbol">&#x2103;</div>
        <div class="icon">
          <label v-bind:class="`wi ${iconName}`"></label>
        </div>
      </div>
    </div>

    <div class="transbox" :style="{'background-color': backgroundColor}">
      <ul class="extra-info">
        <li id="feels-like">
          <label>Feels Like: {{ weatherCondition.feelsLike }}&#x2103;</label>
        </li>
        <li id="maximum-temperature">
          <label>Maximum Temperature: {{ weatherCondition.maximumTemperature }}&#x2103;</label>
        </li>
        <li id="minimum-temperature">
          <label>Minimum Temperature: {{ weatherCondition.minimumTemperature }}&#x2103;</label>
        </li>
        <li id="humidity">
          <label>Humidity: {{ weatherCondition.humidity }}%</label>
        </li>
        <li id="wind-speed">
          <label>Wind Speed: {{ weatherCondition.windSpeed }} km/h</label>
        </li>
        <li id="cloudiness">
          <label>Cloudiness: {{ weatherCondition.cloudiness }}%</label>
        </li>
        <li id="pressure">
          <label>Pressure: {{ weatherCondition.pressure }} hPa</label>
        </li>
        <li id="visibility">
          <label>Visibility: {{ weatherCondition.visibility }} km</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherCondition: null,
      date: null,
      time: null,
      iconName: null,
      backgroundColor: null,
      backgroundImage: null
    };
  },
  mounted() {
    chrome.runtime.sendMessage({ method: "getWeatherCondition" }, weatherCondition => {
        this.weatherCondition = weatherCondition;
        this.weatherCondition.main.temp = Math.round(weatherCondition.main.temp);
        this.weatherCondition.temperature = Math.round(weatherCondition.main.temp);
        this.weatherCondition.feelsLike = Math.round(weatherCondition.feelsLike);
        this.weatherCondition.maximumTemperature = Math.round(weatherCondition.main.temp_max);
        this.weatherCondition.minimumTemperature = Math.round(weatherCondition.main.temp_min);
        this.weatherCondition.humidity = weatherCondition.main.humidity;
        this.weatherCondition.windSpeed = weatherCondition.wind.speed;
        this.weatherCondition.cloudiness = weatherCondition.clouds.all;
        this.weatherCondition.pressure = weatherCondition.main.pressure;
        this.iconName = weatherIcons.get(weatherCondition.iconName)[0];
        this.backgroundImage = `url(/images/${this.iconName}.jpg)`;
        this.backgroundColor = weatherIcons.get(weatherCondition.iconName)[1];
        this.date = this.getDate();
        this.time = this.getTime();
        /* It's a hack to override the background color of body. 
         * Ideally should use css to stretch out the inner elements.
         */
        document.body.style.backgroundImage = this.backgroundImage;
      }
    )
  },
  methods: {
    getDate() {
      let today = new Date();
      let month = today.toLocaleString("en-us", { month: "short" });
      let dayOfWeek = today.toLocaleString("en-use", { weekday: "short" });
      return `${dayOfWeek} ${month} ${today.getDate()}, ${today.getFullYear()}`;
    },
    getTime() {
      let today = new Date();
      return `${today.getHours()} : ${today.getMinutes()}`;
    }
  }
};
const weatherIcons = new Map([
  ["01d", ["wi-day-sunny", "#244375"]],
  ["01n", ["wi-night-clear", "#1e2a3a"]],
  ["02d", ["wi-day-cloudy", "#023a47"]],
  ["02n", ["wi-night-cloudy", "#262930"]],
  ["03d", ["wi-cloud", "#cec56b"]],
  ["03n", ["wi-cloud", "#cec56b"]],
  ["04d", ["wi-cloudy", "#2a2a46"]],
  ["04n", ["wi-cloudy", "#2a2a46"]],
  ["09d", ["wi-showers", "#071342"]],
  ["09n", ["wi-showers", "#071342"]],
  ["10d", ["wi-day-rain", "#70727f"]],
  ["10n", ["wi-night-rain", "#113d30"]],
  ["11d", ["wi-thunderstorm", "#194476"]],
  ["11n", ["wi-thunderstorm", "#194476"]],
  ["13d", ["wi-snow", "#807360"]],
  ["13n", ["wi-snow", "#807360"]],
  ["50d", ["wi-fog", "#a0adb9"]],
  ["50n", ["wi-fog", "#a0adb9"]]
]);
</script>

<style lang="scss" scoped>
div.temperature {
  font-size: 64px;
  font-weight: 100;
  float: left;
}

div.degree-symbol {
  font-size: 24px;
  font-weight: 100;
  margin-top: 15px;
  float: left;
}

div.icon {
  font-weight: 400;
  font-size: 53px;
  margin: 5px 20px;
  float: left;
}

div.transbox {
  overflow: hidden;
  margin: 20px 10px;
  background-color: #244375;
  border-radius: 3px;
  opacity: 0.7;
}

div.date-time {
  float: left;
  margin: 20px 20px;
  padding-top: 5px;
  font-weight: bold;
  font-size: 13px;
}

div.date {
  margin-bottom: 4px;
}

label.location {
  display: block;
  text-align: center;
  margin: 12px;
  font-weight: 700;
  font-size: 14px;
}

label.wi {
  line-height: normal;
}

.extra-info {
  margin: 20px;
  padding: 0;
}

.extra-info li {
  list-style: none;
  margin: 10px 0;
  font-size: 14px;
}

.extra-info label {
  font-weight: bold;
  margin-right: 7px;
}
</style>
