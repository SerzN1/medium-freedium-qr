/* global QRCode */

const PROTOCOL = 'https://';
const FREEDIUM_BASE = 'freedium.cfd';
const MIRROR_BASE = 'freedium-mirror.cfd';

/**
 * Generates the Freedium URL based on the given URL.
 * @param {URL} url
 * @returns {string}
 */
function getFreediumUrl(base, url) {
  const baseUrl = `${PROTOCOL}${base}`;

  // Root page — just return the base
  if (url.pathname === '/' || url.pathname === '') {
    return baseUrl;
  }

  // Already on freedium or mirror — extract the embedded article URL and rebase
  if (
    url.hostname.endsWith(FREEDIUM_BASE) ||
    url.hostname.endsWith(MIRROR_BASE)
  ) {
    const articleUrl = url.pathname.slice(1); // strip leading '/'
    if (!articleUrl) return baseUrl;
    return `${baseUrl}/${articleUrl}`;
  }

  // Medium or custom Medium domain — pass the full URL to the target base
  return `${baseUrl}/${url.toString()}`;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const $qrCode = document.getElementById('qrcode');
  const $copyBtn = document.getElementById('copyBtn');
  const $openBtn = document.getElementById('openBtn');
  const $mirrorBtn = document.getElementById('mirrorBtn');
  const tabUrl = new URL(tabs[0].url);
  const qrCodeUrl = getFreediumUrl(FREEDIUM_BASE, tabUrl);
  const mirrorUrl = getFreediumUrl(MIRROR_BASE, tabUrl);

  new QRCode($qrCode, {
    text: mirrorUrl,
    width: 200,
    height: 200,
    colorDark: '#000',
    colorLight: '#D3F6D3'
  });

  $copyBtn.removeAttribute('hidden');
  $openBtn.removeAttribute('hidden');
  $mirrorBtn.removeAttribute('hidden');

  if (tabUrl.hostname.endsWith(FREEDIUM_BASE)) {
    $openBtn.setAttribute('disabled', '');
  }
  if (tabUrl.hostname.endsWith(MIRROR_BASE)) {
    $mirrorBtn.setAttribute('disabled', '');
  }

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
