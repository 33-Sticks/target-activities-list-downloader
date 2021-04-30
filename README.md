# Target Activities List Downloader

A script that downloads the list of Target activities to a CSV file. By default, it's named using the format `targetActivities_${unixTimestamp}.csv`

## Usage

1. Open Target to the Activities tab (e.g. <https://experience.adobe.com/#/@33sticksexchange/target/activities>)
2. Adjust the filters to display only the activies you want to capture.
3. Scroll all the way down to ensure all X of N activities are loaded (i.e. `18 of 18 Activities`).
4. Open the dev console.
5. Change the JS context to `Main Content (activities.html)`.
   * Target's activities are served in this iframe, and we're unable to access it from `top` due to Adobe's cross-origin policy. Yes, it's a total pain.
6. Copy and paste the contents of [dist/index.js](dist/index.js) into the console and hit Enter
7. (Optional) If your [browser is configured to do so](https://support.google.com/chrome/answer/95759#:~:text=ask%20where%20to%20save%20each%20file%20before%20downloading), rename and choose download location.

## Editing

To update this script, you should just need TypeScript's `tsc` within your `$PATH`. No additional npm dependencies needed.

Edit the [src/index.ts](src/index.ts) file, making sure to avoid any type errors.

## Build (Optional)

### Dev

`tsc --watch`

This will watch the source directory and re-build on change.

### Release

`tsc`

## Licenses

This script includes code adapted from the following [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) sources:
* [Kamil Kiełczewski, Stack Overflow](https://stackoverflow.com/a/55784435)
* [Christian Landgren, Stack Overflow](https://stackoverflow.com/a/31536517)