# Publishing on Firefox (addons.mozilla.org)

You need: a Mozilla account, the `firefox` and `source` zips from the GitHub release, and the texts in [listing.md](listing.md).

## First submission

1. **Sign in** at https://addons.mozilla.org/developers/ with your Mozilla account. Accept the Developer Agreement if asked.
2. Click **Submit a New Add-on** → **On this site** (a public listing; Firefox updates it for users).
3. **Upload** `metis-weather-<version>-firefox.zip`.
   - Platforms: tick **Firefox**, untick **Firefox for Android** (not tested there; the minimum version is set for desktop).
   - Wait for the automatic validation. Warnings are fine (expected: one about Firefox for Android's minimum version, one about `innerHTML` inside the bundled Vue library); errors must be fixed first.
4. **Source code:** answer **Yes**: the code is built and minified by Vite.
   - Upload `metis-weather-<version>-source.zip`.
   - In the build instructions field paste "Source code notes" from [listing.md](listing.md).
5. **Describe the add-on** (from [listing.md](listing.md)):
   - Name, Summary, Description
   - Category: **Other** (AMO has no weather category)
   - Homepage and Support website: `https://github.com/kasramp/weather-extension`
   - Support email: optional (it is shown publicly)
   - License: **MIT License**
   - Privacy policy: tick **This add-on has a privacy policy** and paste the body of [PRIVACY.md](../PRIVACY.md)
   - Notes to reviewer: "Notes for reviewers" from [listing.md](listing.md)
6. **Submit Version.** Listed add-ons are usually signed and public within minutes to a few hours after the automatic check. Because the source zip is attached, a human review may follow; you get an email if they want changes.
7. **Screenshot:** on the add-on's page in the Developer Hub, **Edit Product Page** → **Images** → upload `images/screenshot-1280x800.png`.
8. **Check:** install it from AMO in normal Firefox, click the toolbar icon (pin it from the puzzle-piece menu if it's hidden), and check that the weather shows.
9. **README:** replace "Firefox Add-ons (coming soon)" in the main [README](../README.md) with a link to the AMO page (`https://addons.mozilla.org/firefox/addon/<slug>/`, shown on the Developer Hub). Commit and push.

## Updating to a new version

1. Follow "Every release" in [README.md](README.md) (test, merge, download the zips).
2. https://addons.mozilla.org/developers/ → **Metis Weather** → **Upload New Version**.
3. Upload the new `firefox` zip; platforms Firefox only; source code **Yes**, upload the new `source` zip and paste the same build instructions.
4. Optional "Release notes" (shown to users) and "Notes to reviewer".
5. **Submit Version.** Users get the update automatically within a day.

## Data usage

AMO has no data-usage form. Firefox reads it from `manifest.json`:

```json
"data_collection_permissions": { "required": ["locationInfo"] }
```

- `locationInfo`: the coordinates (or, as fallback, the IP-based location) go to the weather API. It is `required` because the extension can't work without it; Firefox shows it at install and the user accepts it with the install.
- Nothing else is declared: no browsing history (`browsingActivity`), no page content (`websiteContent`), no personal data, no `technicalAndInteraction` (no analytics or crash reports).
- If the extension ever sends more, add the matching type here and update [PRIVACY.md](../PRIVACY.md) and the privacy policy on AMO. The full list of types: https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/

## Good to know

- The add-on ID `metis-weather@madadipouya.com` (in `manifest.json`) is permanent. Never change it, or AMO treats it as a different add-on.
- `strict_min_version` is `140.0`: the first Firefox that understands `data_collection_permissions`.
- If users say the popup never shows their own city: they blocked location, so the IP fallback is in use (VPNs show the VPN's city). `about:addons` → Metis Weather → **Permissions** lets them allow location again.
- Optional: uploads can also be done from the command line with `npx web-ext sign --channel=listed` and an API key from Developer Hub → **Tools** → **Manage API Keys**. The web form above is simpler for occasional releases.
