# Privacy policy: Metis Weather

Metis Weather shows the current weather for your location. This page lists everything it sends and keeps.

## What is sent

Only when you open the popup, the extension asks the Eris weather API (`https://weather-api.madadipouya.com`, run by the author of Metis, source: https://github.com/kasramp/Eris) for the current weather:

- **With location allowed:** your latitude and longitude, from the browser's location service.
- **With location denied or unavailable:** nothing extra. Eris looks up an approximate location from your IP address, which every web request carries.

To answer, Eris passes the coordinates to [OpenWeatherMap](https://openweathermap.org/privacy-policy) (weather) and [OpenStreetMap Nominatim](https://osmfoundation.org/wiki/Privacy_Policy) (place name). For the IP lookup, it passes your IP address to [ip-api.com](https://ip-api.com/docs/legal) or [extreme-ip-lookup.com](https://extreme-ip-lookup.com/privacy). Eris does not store your location or IP address, and does not use them for anything else.

## What is kept

The last weather result is saved in your browser's local storage, so the popup can show it right away the next time. It stays on your computer. It is removed when you remove the extension.

## What is not collected

No accounts, analytics, tracking, ads or cookies. Your browsing history and the pages you visit are not read or sent. Nothing is sold or shared beyond the services named above.

## Contact

Questions: open an issue at https://github.com/kasramp/weather-extension/issues.
