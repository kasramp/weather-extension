import { beforeEach, expect, test, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from '../src/popup/App.vue'
import { fetchWeather, loadCached, saveCached } from '../src/popup/weather.js'

vi.mock('../src/popup/weather.js', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchWeather: vi.fn(),
  loadCached: vi.fn(),
  saveCached: vi.fn(),
}))

const sample = (name, country, iconName = '04d') => ({
  name,
  country,
  iconName,
  feelsLike: 1,
  main: { temp: 2, pressure: 1000, humidity: 50, temp_min: 0, temp_max: 3 },
  visibility: 10,
  wind: { speed: 5 },
  clouds: { all: 20 },
})

beforeEach(() => {
  vi.resetAllMocks()
  loadCached.mockReturnValue(null)
})

test('shows cached data immediately, then fresh data', async () => {
  loadCached.mockReturnValue({
    data: sample('A', 'X'),
    fetchedAt: new Date(),
  })
  fetchWeather.mockResolvedValue({ data: sample('B', 'Y'), source: 'ip' })
  const w = mount(App)
  expect(w.text()).toContain('A, X')
  await flushPromises()
  expect(w.text()).toContain('B, Y')
  expect(saveCached).toHaveBeenCalled()
})

test('shows stale note when refresh fails with cache', async () => {
  loadCached.mockReturnValue({
    data: sample('A', 'X'),
    fetchedAt: new Date(),
  })
  fetchWeather.mockRejectedValue(new Error('offline'))
  const w = mount(App)
  await flushPromises()
  expect(w.text()).toContain('A, X')
  expect(w.text()).toContain("Couldn't refresh")
})

test('shows error and retries when nothing is cached', async () => {
  fetchWeather
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce({ data: sample('B', 'Y'), source: 'ip' })
  const w = mount(App)
  expect(w.text()).toContain('Getting the weather')
  await flushPromises()
  await w.find('button').trigger('click')
  await flushPromises()
  expect(w.text()).toContain('B, Y')
  expect(fetchWeather).toHaveBeenCalledTimes(2)
})

test('renders with an unknown icon code', async () => {
  fetchWeather.mockResolvedValue({
    data: sample('B', 'Y', '99x'),
    source: 'ip',
  })
  const w = mount(App)
  await flushPromises()
  expect(w.find('.wi-na').exists()).toBe(true)
})

test('treats a malformed cache entry as no cache', async () => {
  loadCached.mockReturnValue({ data: 5, fetchedAt: new Date() })
  fetchWeather.mockResolvedValue({ data: sample('B', 'Y'), source: 'ip' })
  const w = mount(App)
  expect(w.text()).toContain('Getting the weather')
  await flushPromises()
  expect(w.text()).toContain('B, Y')
})
