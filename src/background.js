// Update icon state when tab changes or updates
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await updateActionState(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, _tab) => {
  if (changeInfo.url || changeInfo.status === 'complete') {
    await updateActionState(tabId);
  }
});

// Update action state on installation
chrome.runtime.onInstalled.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    await updateActionState(tab.id);
  }
});

async function updateActionState(tabId) {
  const tab = await chrome.tabs.get(tabId);

  try {
    const url = new URL(tab.url);

    // Skip chrome:// and other special URLs
    if (!url.protocol.startsWith('http')) {
      await chrome.action.disable(tabId);
      return;
    }

    // Check URL-based detection first (faster)
    const isMediumByUrl =
      url.hostname.endsWith('medium.com') ||
      url.hostname.endsWith('freedium.cfd');

    if (isMediumByUrl) {
      await chrome.action.enable(tabId);
      return;
    }

    // Check meta tags for custom domains
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const metaTag = document.querySelector(
          'meta[property="og:site_name"][content="Medium"]'
        );
        return metaTag !== null;
      }
    });

    const isMediumByMeta = results[0]?.result === true;

    if (isMediumByMeta) {
      await chrome.action.enable(tabId);
    } else {
      await chrome.action.disable(tabId);
    }
  } catch {
    // Invalid URL or script injection failed
    await chrome.action.disable(tabId);
  }
}
