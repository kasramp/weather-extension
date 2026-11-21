# Store listing texts

Paste these into AMO and the Chrome Web Store.

## Name

```
Metis Weather
```

## Summary (short description)

AMO allows 250 characters, Chrome 132. This one is 104:

```
Current weather for where you are, one click away: temperature, feels like, wind, humidity and more.
```

## Description

```
Click the Metis icon to see the weather where you are right now.

• Temperature, feels like, today's min and max
• Humidity, wind speed, cloudiness, pressure and visibility
• A background photo that matches the sky outside
• Opens instantly with the last result, then refreshes

Metis asks the browser for your location when you open it. If you say no, it uses an approximate location from your IP address instead, so it works either way.

Only your location (or IP address) is sent, only when you open the popup, and only to look up the weather. No accounts, no tracking, no ads.

Weather data from OpenWeatherMap via the Eris weather API. Place names from OpenStreetMap.
Source code: https://github.com/kasramp/weather-extension
```

## Links

- Homepage / support: `https://github.com/kasramp/weather-extension`
- Privacy policy URL: `https://github.com/kasramp/weather-extension/blob/master/PRIVACY.md`
- License: MIT

## Privacy policy text (AMO asks for the text itself)

Copy the body of [PRIVACY.md](../PRIVACY.md).

## Notes for reviewers

```
No login needed. Click the Metis Weather toolbar icon. The popup asks for location:
- Allow: the weather for your coordinates is shown.
- Block: the weather is looked up from your IP address instead.
API: https://weather-api.madadipouya.com/v1/weather/currentbyip
Source: https://github.com/kasramp/weather-extension
```

## Source code notes (AMO only)

```
The extension is built with Vite (Vue 3), so the uploaded zip is minified. The source zip is the repository at the release tag.

Requirements: Node 24 and npm (any OS).

  npm ci
  npm run build

The built extension is in dist/ and matches the uploaded zip.
The only third-party code is Vue (npm "vue"), the Raleway font (npm "@fontsource/raleway") and Weather Icons (vendored in src/popup/vendor/weather-icons, license in public/licenses/).
```
