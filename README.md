# Medium → Freedium QR Code Generator

This sample demonstrates how to create a browser extension that generates QR codes for Medium article URLs, automatically converting them to Freedium links for ad-free reading.

## Overview

This extension adds a popup interface that generates QR codes for the current Medium article. When clicked, it converts the Medium URL to a Freedium URL and displays a scannable QR code, making it easy to continue reading on mobile devices without ads or paywalls.

## Implementation Notes

The extension uses the `chrome.tabs` API to get the current tab URL and the `qrcode.min.js` library to generate QR codes. It automatically detects Medium articles and converts them to their Freedium equivalents.

## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Navigate to any Medium article.
4. Click the extension icon to generate a QR code.
5. Scan the QR code with your mobile device to open the article on Freedium.
