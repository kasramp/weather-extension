# Publishing on the Chrome Web Store

You need: a Google account, a Chrome Web Store developer account (one-time US$5 registration fee, charged once per Google account; skipped if that account already paid it), the `chrome` zip from the GitHub release, the texts in [listing.md](listing.md), and the images in `images/`.

The same listing works for Chromium, Brave, Edge and other Chromium-based browsers: they install from the Chrome Web Store.

## One-time: developer account

1. Open https://chrome.google.com/webstore/devconsole and sign in with the Google account that should own the extension.
2. Accept the developer agreement and pay the US$5 registration fee if the console asks for it (an account that registered before is not charged again).
3. **Account** tab:
   - Publisher name (shown on the listing), for example `Kasra Madadipouya`.
   - Verify the contact email.
   - Trader declaration (EU rules): Metis Weather is free and non-commercial, so declare **non-trader** unless that changes.

## First submission

1. In the developer console click **+ New item** and upload `metis-weather-<version>-chrome.zip`.
2. **Store listing** tab:
   - Description: from [listing.md](listing.md)
   - Category: **Tools**
   - Language: English
   - Store icon: `public/icons/icon_128.png`
   - Screenshots: `images/screenshot-1280x800.png`
   - Small promo tile: `images/promo-440x280.png`
   - Homepage URL and Support URL: `https://github.com/kasramp/weather-extension`
3. **Privacy** tab (paste these):
   - Single purpose:
     ```
     Show the current weather for the user's location in a toolbar popup.
     ```
   - Permission justifications:
     - `geolocation`: `Reads the user's location when the popup is opened, to look up the weather for that place. If the user blocks it, the extension falls back to an approximate location from the IP address.`
     - Host permissions: none are requested, so there is no field for them.
   - Remote code: **No, I am not using remote code**. (All JavaScript, CSS and fonts are inside the zip; the extension only fetches weather data as JSON.)
   - Data usage ("What user data do you plan to collect"). "Collect" means anything that leaves the browser, so the location counts:

     | Data type                           | Tick?   | Why                                                                          |
     | ----------------------------------- | ------- | ---------------------------------------------------------------------------- |
     | Personally identifiable information | No      |                                                                              |
     | Health information                  | No      |                                                                              |
     | Financial and payment information   | No      |                                                                              |
     | Authentication information          | No      |                                                                              |
     | Personal communications             | No      |                                                                              |
     | **Location**                        | **Yes** | Coordinates (or the IP address for the fallback) are sent to the weather API |
     | Web history                         | No      | No page URLs or titles are read or sent                                      |
     | User activity                       | No      | No clicks, keystrokes or scrolling are recorded                              |
     | Website content                     | No      | Pages are never read                                                         |

   - Certifications: tick all three:
     - I do not sell or transfer user data to third parties, outside of the approved use cases
     - I do not use or transfer user data for purposes that are unrelated to my item's single purpose
     - I do not use or transfer user data to determine creditworthiness or for lending purposes
   - Privacy policy URL: `https://github.com/kasramp/weather-extension/blob/master/PRIVACY.md`
4. **Test instructions** tab: leave **username** and **password** empty (no accounts). In the additional instructions field paste the "Notes for reviewers" block from [listing.md](listing.md).
5. **Distribution** tab: Free, **Public**, all regions.
6. **Submit for review.** Review usually takes a few days, sometimes longer for a first item. You get an email when it is approved or rejected. By default it is published right after approval.
7. **README:** once it's live, replace "Chrome Web Store (coming soon)" in the main [README](../README.md) with a link to the store page (`https://chromewebstore.google.com/detail/<id>`, shown in the developer console). Commit and push.

## Updating to a new version

1. Follow "Every release" in [README.md](README.md) (test, merge, download the zips).
2. Developer console → **Metis Weather** → **Package** → **Upload new package** → choose the new `chrome` zip.
3. If permissions or data use changed, update the **Privacy** tab first.
4. **Submit for review.** Users get the update automatically after approval.

## Good to know

- The manifest has a `browser_specific_settings` block for Firefox. Chrome ignores it; the upload may show a warning about it, which is fine.
- A rejection email names the policy and the part of the listing to fix. Fix it, then submit again from the same item. Don't create a new item.
- The upload rejects a version number it already has. The release workflow always produces a new one.
