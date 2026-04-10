/* global QRCode */

const FREEDIUM_URL = 'https://freedium.cfd';
const FREEDIUM_MIRROR_URL = 'https://freedium-mirror.cfd';

/**
 * Generates the Freedium URL based on the given URL.
 * @param {URL} url
 * @returns {string}
 */
function getFreediumUrl(base, url) {
  if (url.pathname === '/' || url.pathname === '') {
    return base;
  }

  if (url.hostname.endsWith('freedium.cfd')) {
    return url.toString();
  }

  if (url.hostname.endsWith('medium.com')) {
    return `${base}/${url.toString()}`;
  }

  return `${base}/${url.toString()}`;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const $qrCode = document.getElementById('qrcode');
  const $copyBtn = document.getElementById('copyBtn');
  const $openBtn = document.getElementById('openBtn');
  const $mirrorBtn = document.getElementById('mirrorBtn');
  const tabUrl = new URL(tabs[0].url);
  const qrCodeUrl = getFreediumUrl(FREEDIUM_URL, tabUrl);
  const mirrorUrl = getFreediumUrl(FREEDIUM_MIRROR_URL, tabUrl);

  new QRCode($qrCode, {
    text: qrCodeUrl,
    width: 200,
    height: 200,
    colorDark: '#000',
    colorLight: '#D3F6D3'
  });

  $copyBtn.removeAttribute('hidden');
  $openBtn.removeAttribute('hidden');
  $mirrorBtn.removeAttribute('hidden');

  $copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrCodeUrl);
  });
  $openBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: qrCodeUrl });
  });
  $mirrorBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: mirrorUrl });
  });
});
