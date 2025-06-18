// Proxy Authentication Extension Background Script

let proxyCredentials = null;

// 默认代理认证信息
const DEFAULT_CREDENTIALS = {
  username: '6075849-a11a16ce',
  password: 'e9a6377b-global-96417862-5m'
};

// Load saved credentials on startup
chrome.runtime.onStartup.addListener(async () => {
  await loadCredentials();
});

chrome.runtime.onInstalled.addListener(async () => {
  await loadCredentials();
});

// Load credentials from storage
async function loadCredentials() {
  try {
    const result = await chrome.storage.local.get(['proxyCredentials']);
    if (result.proxyCredentials) {
      proxyCredentials = result.proxyCredentials;
      console.log('Proxy credentials loaded from storage:', proxyCredentials.username);
    } else {
      // 如果没有保存的认证信息，使用默认认证信息
      proxyCredentials = DEFAULT_CREDENTIALS;
      await saveCredentials(DEFAULT_CREDENTIALS);
      console.log('Using default proxy credentials:', proxyCredentials.username);
    }
  } catch (error) {
    console.error('Failed to load credentials:', error);
    // 出错时也使用默认认证信息
    proxyCredentials = DEFAULT_CREDENTIALS;
    console.log('Error fallback to default credentials:', proxyCredentials.username);
  }
}

// Save credentials to storage
async function saveCredentials(credentials) {
  try {
    await chrome.storage.local.set({ proxyCredentials: credentials });
    proxyCredentials = credentials;
    console.log('Proxy credentials saved');
  } catch (error) {
    console.error('Failed to save credentials:', error);
  }
}

// Handle proxy authentication requests
chrome.webRequest.onAuthRequired.addListener(
  function(details) {
    console.log('Auth required for:', details.url);

    // 确保有认证信息可用（使用默认或已保存的）
    if (!proxyCredentials || !proxyCredentials.username || !proxyCredentials.password) {
      console.log('No credentials available, using default');
      proxyCredentials = DEFAULT_CREDENTIALS;
    }

    // Check if this is a proxy authentication request
    if (details.isProxy) {
      console.log('Providing proxy credentials for user:', proxyCredentials.username);
      return {
        authCredentials: {
          username: proxyCredentials.username,
          password: proxyCredentials.password
        }
      };
    }

    // 对于非代理认证，也尝试提供认证信息（某些代理可能需要）
    console.log('Providing credentials for non-proxy auth:', proxyCredentials.username);
    return {
      authCredentials: {
        username: proxyCredentials.username,
        password: proxyCredentials.password
      }
    };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setCredentials') {
    saveCredentials(request.credentials).then(() => {
      sendResponse({ success: true });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'getCredentials') {
    sendResponse({ credentials: proxyCredentials });
    return true;
  }
  
  if (request.action === 'clearCredentials') {
    chrome.storage.local.remove(['proxyCredentials']).then(() => {
      proxyCredentials = null;
      sendResponse({ success: true });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
});

// Test proxy connection
async function testProxyConnection() {
  try {
    const response = await fetch('https://httpbin.org/ip', {
      method: 'GET',
      cache: 'no-cache'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Proxy test successful, IP:', data.origin);
      return { success: true, ip: data.origin };
    } else {
      throw new Error('HTTP ' + response.status);
    }
  } catch (error) {
    console.error('Proxy test failed:', error);
    return { success: false, error: error.message };
  }
}

// Export test function for popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'testConnection') {
    testProxyConnection().then(result => {
      sendResponse(result);
    });
    return true;
  }
});

// 支持外部脚本切换代理
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.action === 'setProxy') {
    const { username, password, host, port } = request;
    const credentials = { username, password };

    saveCredentials(credentials).then(() => {
      console.log(`Proxy switched to ${host}:${port} with user ${username}`);
      sendResponse({ success: true, message: 'Proxy credentials updated' });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }

  if (request.action === 'getCurrentProxy') {
    sendResponse({
      success: true,
      credentials: proxyCredentials
    });
    return true;
  }
});
