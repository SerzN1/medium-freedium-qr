# Medium → Freedium QR Code Generator

A Chrome extension that converts Medium article URLs to [Freedium](https://freedium.cfd) or [Freedium Mirror](https://freedium-mirror.cfd) links and displays a scannable QR code — making it easy to continue reading on a mobile device without paywalls.

## Features

- Detects Medium articles by hostname (`medium.com`, `*.medium.com`) and by `og:site_name` meta tag for custom Medium domains
- Generates a QR code pointing to the Freedium Mirror URL
- **Copy** button — copies the Freedium URL to clipboard
- **Open** button — opens the Freedium version in a new tab (disabled when already on Freedium)
- **Mirror** button — opens the Freedium Mirror version in a new tab (disabled when already on the mirror)
- Extension icon is disabled on non-Medium pages and on unreachable pages (e.g. DNS errors)

## Supported URL patterns

| Tab URL                   | Open (Freedium)                           | Mirror                    |
| ------------------------- | ----------------------------------------- | ------------------------- |
| `medium.com/article`      | `freedium.cfd/https://medium.com/article` | `freedium-mirror.cfd/...` |
| `*.medium.com/article`    | same                                      | same                      |
| Custom Medium domain      | same                                      | same                      |
| `freedium.cfd/...`        | rebased to `freedium.cfd`                 | rebased to mirror         |
| `freedium-mirror.cfd/...` | rebased to `freedium.cfd`                 | rebased to mirror         |

## Install

Install from the [Chrome Web Store](#) _(link to be added)_ or load unpacked:

1. Clone this repository.
2. Open `chrome://extensions`, enable **Developer mode**.
3. Click **Load unpacked** and select the `src/` directory.

## Development

```sh
npm ci
npm run lint
npm run prettier:check
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). Pushing to `main` automatically bumps the version, generates a changelog, tags the release, and publishes to the Chrome Web Store via GitHub Actions.

| Commit prefix                 | Release type |
| ----------------------------- | ------------ |
| `fix:`                        | patch        |
| `feat:`                       | minor        |
| `feat!:` / `BREAKING CHANGE:` | major        |

## Required GitHub secrets for publishing

| Secret                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `CHROME_EXTENSION_ID`  | Extension ID from the Web Store dashboard |
| `CHROME_CLIENT_ID`     | Google Cloud OAuth client ID              |
| `CHROME_CLIENT_SECRET` | Google Cloud OAuth client secret          |
| `CHROME_REFRESH_TOKEN` | OAuth refresh token                       |
