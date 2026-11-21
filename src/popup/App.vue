<template>
  <div v-if="view" class="main">
    <div class="transbox" :style="{ 'background-color': icon.color }">
      <label class="location">{{ view.place }}</label>
      <label v-if="stale" class="stale">Couldn't refresh</label>
    </div>

    <div class="transbox" :style="{ 'background-color': icon.color }">
      <div>
        <div class="date-time">
          <div class="date">{{ view.date }}</div>
          <div class="time">{{ view.time }}</div>
        </div>
        <div class="temperature">{{ view.temperature }}</div>
        <div class="degree-symbol">&#x2103;</div>
        <div class="icon">
          <label :class="`wi ${icon.icon}`"></label>
        </div>
      </div>
    </div>

    <div class="transbox" :style="{ 'background-color': icon.color }">
      <ul class="extra-info">
        <li id="feels-like">
          <label>Feels Like: {{ view.feelsLike }}&#x2103;</label>
        </li>
        <li id="maximum-temperature">
          <label>Maximum Temperature: {{ view.max }}&#x2103;</label>
        </li>
        <li id="minimum-temperature">
          <label>Minimum Temperature: {{ view.min }}&#x2103;</label>
        </li>
        <li id="humidity">
          <label>Humidity: {{ view.humidity }}%</label>
        </li>
        <li id="wind-speed">
          <label>Wind Speed: {{ view.wind }} km/h</label>
        </li>
        <li id="cloudiness">
          <label>Cloudiness: {{ view.cloudiness }}%</label>
        </li>
        <li id="pressure">
          <label>Pressure: {{ view.pressure }} hPa</label>
        </li>
        <li id="visibility">
          <label>Visibility: {{ view.visibility }} km</label>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="main">
    <div class="transbox">
      <label v-if="failed" class="location">
        Couldn't get the weather
        <button type="button" @click="refresh">Retry</button>
      </label>
      <label v-else class="location">Getting the weather…</label>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { fetchWeather, loadCached, saveCached, toView } from './weather.js'
import { iconFor } from './icons.js'

const view = ref(null)
const stale = ref(false)
const failed = ref(false)
const icon = computed(() => iconFor(view.value?.iconCode))

// body sits outside the app root, so it is styled from here
watchEffect(() => {
  const { image, color } = icon.value
  document.body.style.backgroundImage =
    view.value && image ? `url(${image})` : ''
  document.body.style.backgroundColor = view.value && !image ? color : ''
})

async function refresh() {
  failed.value = false
  try {
    const { data } = await fetchWeather()
    const now = new Date()
    view.value = toView(data, now)
    saveCached(data, now)
    stale.value = false
  } catch {
    if (view.value) stale.value = true
    else failed.value = true
  }
}

const cached = loadCached()
if (cached) {
  try {
    view.value = toView(cached.data, cached.fetchedAt)
  } catch {
    // wrong-shaped cache: treat as no cache
  }
}
onMounted(refresh)
</script>

<style scoped>
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

label.stale {
  display: block;
  text-align: center;
  margin: 0 12px 12px;
  font-size: 12px;
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
