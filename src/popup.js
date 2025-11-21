/* global QRCode */

/**
 * Generates the Freedium URL based on the given URL.
 * @param {URL} url
 * @returns {string}
 */
function getFreediumUrl(url) {
  if (url.pathname === '/' || url.pathname === '') {
    return `https://freedium.cfd`;
  }

  if (url.hostname.endsWith('freedium.cfd')) {
    return url.toString();
  }

  if (url.hostname.endsWith('medium.com')) {
    return `https://freedium.cfd/${url.toString()}`;
  }

  return `https://freedium.cfd/${url.toString()}`;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const $qrCode = document.getElementById('qrcode');
  const $copyBtn = document.getElementById('copyBtn');
  const $openBtn = document.getElementById('openBtn');
  const tabUrl = new URL(tabs[0].url);
  const qrCodeUrl = getFreediumUrl(tabUrl);

  new QRCode($qrCode, { text: qrCodeUrl, width: 200, height: 200, colorDark: '#000', colorLight: '#D3F6D3' });

  $copyBtn.removeAttribute('hidden');
  $openBtn.removeAttribute('hidden');

  $copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrCodeUrl);
  });
  $openBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: qrCodeUrl });
  });
});
