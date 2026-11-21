export const API_BASE = 'https://weather-api.madadipouya.com/v1/weather'
export const CACHE_KEY = 'weatherCondition'

export function getPosition(geolocation, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    if (!geolocation) return reject(new Error('Geolocation unavailable'))
    // own timer: some browsers never call back when the prompt is dismissed
    const timer = setTimeout(
      () => reject(new Error('Geolocation timed out')),
      timeoutMs,
    )
    geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timer)
        resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      },
      { timeout: timeoutMs, maximumAge: 600000 },
    )
  })
}

export async function fetchWeather({
  geolocation = navigator.geolocation,
  fetchFn = fetch,
  timeoutMs,
} = {}) {
  let url = `${API_BASE}/currentbyip`
  let source = 'ip'
  try {
    const { lat, lon } = await getPosition(geolocation, timeoutMs)
    url = `${API_BASE}/current?lat=${lat}&lon=${lon}`
    source = 'location'
  } catch {
    // no location: fall back to IP lookup
  }
  const response = await fetchFn(url)
  if (!response.ok)
    throw new Error(`Weather request failed: ${response.status}`)
  const data = await response.json()
  if (data.errors?.length) throw new Error(data.errors.join(', '))
  return { data, source }
}

export function toView(data, fetchedAt) {
  return {
    place: `${data.name}, ${data.country}`,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.feelsLike),
    max: Math.round(data.main.temp_max),
    min: Math.round(data.main.temp_min),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    cloudiness: data.clouds.all,
    pressure: data.main.pressure,
    visibility: data.visibility,
    iconCode: data.iconName,
    date: fetchedAt.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: fetchedAt.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

export function loadCached(storage) {
  try {
    storage ??= localStorage
    const { data, fetchedAt } = JSON.parse(storage.getItem(CACHE_KEY))
    const at = new Date(fetchedAt)
    return data && !isNaN(at) ? { data, fetchedAt: at } : null
  } catch {
    return null
  }
}

export function saveCached(data, fetchedAt, storage = localStorage) {
  storage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, fetchedAt: fetchedAt.toISOString() }),
  )
}
