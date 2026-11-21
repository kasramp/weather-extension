import { expect, test } from 'vitest'
import { iconFor } from '../src/popup/icons.js'

test('maps known codes', () => {
  expect(iconFor('01d')).toEqual({
    icon: 'wi-day-sunny',
    color: '#244375',
    image: '/images/wi-day-sunny.jpg',
  })
  expect(iconFor('50n').icon).toBe('wi-fog')
})

test('unknown or missing code falls back', () => {
  expect(iconFor('99x')).toEqual({
    icon: 'wi-na',
    color: '#244375',
    image: null,
  })
  expect(iconFor(undefined).image).toBeNull()
})
