# Publishing Metis Weather

Step-by-step guides for the two stores:

- [chrome.md](chrome.md): Chrome Web Store (also used by Chromium, Brave and Edge users)
- [firefox.md](firefox.md): addons.mozilla.org (AMO)
- [listing.md](listing.md): the texts both stores ask for, ready to paste
- `images/`: store screenshot (1280×800) and Chrome promo tile (440×280). The store icon is `public/icons/icon_128.png`.

## Every release

1. Make sure the Eris API answers:
   ```
   $ curl -s https://weather-api.madadipouya.com/v1/weather/currentbyip | head -c 200
   ```
   It must answer with `{"country": ...`, not an error page.
2. Test the extension unpacked in both browsers (see [Testing locally](../README.md#testing-locally) in the main README): with location allowed, and with location blocked (the IP fallback).
3. Version:
   - Patch release (`1.1.0` → `1.1.1`): do nothing. The release workflow bumps it.
   - Minor or major release: set `"version"` in `package.json` in your pull request (for example `1.2.0`). The manifest version is generated from it.
4. Merge the pull request to master. The [release workflow](../.github/workflows/release.yml) runs the checks, bumps the version if needed, tags it (for example `1.1.0`) and creates a GitHub release with three zips.
5. Download the zips:
   ```
   $ gh release download 1.1.0 -R kasramp/weather-extension -D /tmp/metis
   $ ls /tmp/metis
   metis-weather-1.1.0-chrome.zip  metis-weather-1.1.0-firefox.zip  metis-weather-1.1.0-source.zip
   ```
   Or download them from the [releases page](https://github.com/kasramp/weather-extension/releases).
6. Upload: [Chrome](chrome.md#updating-to-a-new-version) gets the `chrome` zip. [Firefox](firefox.md#updating-to-a-new-version) gets the `firefox` zip, plus the `source` zip.

If a release run fails after it pushed the bump commit, push a new commit instead of re-running it.

## Building the zips locally

Only if you need them without a GitHub release:

```
$ npm ci
$ npm run package
$ ls dist-zip
```

The zip from `git archive` contains committed files only, so commit first.

## If you change permissions or what is sent

Adding a permission or `host_permissions`, or sending more than the location or IP lookup, means:

- update [PRIVACY.md](../PRIVACY.md),
- Firefox: update `data_collection_permissions` in `manifest.json`,
- Chrome: update the **Privacy** tab (permission justifications, data usage).

Users are asked to approve new permissions again, and both stores may review the extension by hand.
