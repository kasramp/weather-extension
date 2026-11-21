import { describe, expect, test, vi } from 'vitest'
import {
  API_BASE,
  fetchWeather,
  loadCached,
  saveCached,
  toView,
} from '../src/popup/weather.js'

const sample = {
  country: 'Germany',
  temperature: 4.25,
  iconName: '04d',
  feelsLike: -0.13,
  errors: [],
  main: {
    temp: 4.6,
    pressure: 1013,
    humidity: 93,
    temp_min: 3.05,
    temp_max: 5.08,
  },
  visibility: 10.0,
  wind: { speed: 22.21, deg: 270 },
  clouds: { all: 75 },
  name: 'Land Berlin',
}
const okFetch = () =>
  vi.fn().mockResolvedValue({ ok: true, json: async () => sample })
const geo = {
  getCurrentPosition: (ok) =>
    ok({ coords: { latitude: 52.5, longitude: 13.4 } }),
}
const denied = { getCurrentPosition: (_ok, err) => err(new Error('denied')) }

describe('fetchWeather', () => {
  test('uses coordinates when location is available', async () => {
    const fetchFn = okFetch()
    const r = await fetchWeather({ geolocation: geo, fetchFn })
    expect(fetchFn).toHaveBeenCalledWith(
      `${API_BASE}/current?lat=52.5&lon=13.4`,
    )
    expect(r.source).toBe('location')
    expect(r.data).toEqual(sample)
  })

  test('falls back to IP when location is denied', async () => {
    const fetchFn = okFetch()
    const r = await fetchWeather({ geolocation: denied, fetchFn })
    expect(fetchFn).toHaveBeenCalledWith(`${API_BASE}/currentbyip`)
    expect(r.source).toBe('ip')
  })

  test('falls back to IP when location never answers', async () => {
    const fetchFn = okFetch()
    const never = { getCurrentPosition: () => {} }
    const r = await fetchWeather({ geolocation: never, fetchFn, timeoutMs: 20 })
    expect(r.source).toBe('ip')
  })

  test('falls back to IP when geolocation is missing', async () => {
    const fetchFn = okFetch()
    const r = await fetchWeather({ geolocation: undefined, fetchFn })
    expect(fetchFn).toHaveBeenCalledWith(`${API_BASE}/currentbyip`)
    expect(r.source).toBe('ip')
  })

  test('throws on HTTP error', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    await expect(fetchWeather({ geolocation: geo, fetchFn })).rejects.toThrow()
  })

  test('throws when API reports errors', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ errors: ['x'] }) })
    await expect(fetchWeather({ geolocation: geo, fetchFn })).rejects.toThrow()
  })
})

test('toView rounds and formats', () => {
  const v = toView(sample, new Date(2026, 10, 21, 9, 5))
  expect(v.temperature).toBe(5)
  expect(v.feelsLike).toBe(-0)
  expect(v.max).toBe(5)
  expect(v.min).toBe(3)
  expect(v.place).toBe('Land Berlin, Germany')
  expect(v.iconCode).toBe('04d')
  expect(v.humidity).toBe(93)
  expect(v.wind).toBe(22.21)
  expect(v.cloudiness).toBe(75)
  expect(v.pressure).toBe(1013)
  expect(v.visibility).toBe(10)
  expect(typeof v.date).toBe('string')
  expect(typeof v.time).toBe('string')
})

test('cache round-trips and ignores corrupt data', () => {
  const store = new Map()
  const storage = {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => store.set(k, v),
  }
  expect(loadCached(storage)).toBeNull()
  const at = new Date(2026, 10, 21, 9, 5)
  saveCached(sample, at, storage)
  expect(loadCached(storage)).toEqual({ data: sample, fetchedAt: at })
  store.set('weatherCondition', '{bad')
  expect(loadCached(storage)).toBeNull()
})
