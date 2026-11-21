const ICONS = {
  '01d': ['wi-day-sunny', '#244375'],
  '01n': ['wi-night-clear', '#1e2a3a'],
  '02d': ['wi-day-cloudy', '#023a47'],
  '02n': ['wi-night-cloudy', '#262930'],
  '03d': ['wi-cloud', '#cec56b'],
  '03n': ['wi-cloud', '#cec56b'],
  '04d': ['wi-cloudy', '#2a2a46'],
  '04n': ['wi-cloudy', '#2a2a46'],
  '09d': ['wi-showers', '#071342'],
  '09n': ['wi-showers', '#071342'],
  '10d': ['wi-day-rain', '#70727f'],
  '10n': ['wi-night-rain', '#113d30'],
  '11d': ['wi-thunderstorm', '#194476'],
  '11n': ['wi-thunderstorm', '#194476'],
  '13d': ['wi-snow', '#807360'],
  '13n': ['wi-snow', '#807360'],
  '50d': ['wi-fog', '#a0adb9'],
  '50n': ['wi-fog', '#a0adb9'],
}

export function iconFor(code) {
  const entry = Object.hasOwn(ICONS, code) ? ICONS[code] : null
  if (!entry) return { icon: 'wi-na', color: '#244375', image: null }
  // root-relative: the popup HTML may sit in a subfolder of dist
  return { icon: entry[0], color: entry[1], image: `/images/${entry[0]}.jpg` }
}
