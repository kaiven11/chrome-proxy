// Popup script for Proxy Authentication Extension

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('credentialsForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const clearBtn = document.getElementById('clearBtn');
  const testBtn = document.getElementById('testBtn');
  const statusDiv = document.getElementById('status');

  // Load existing credentials
  loadCredentials();

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    saveCredentials();
  });

  // Clear credentials
  clearBtn.addEventListener('click', function() {
    clearCredentials();
  });

  // Test connection
  testBtn.addEventListener('click', function() {
    testConnection();
  });

  // Load saved credentials
  function loadCredentials() {
    chrome.runtime.sendMessage({ action: 'getCredentials' }, function(response) {
      if (response && response.credentials) {
        usernameInput.value = response.credentials.username || '';
        passwordInput.value = response.credentials.password || '';
        showStatus('已加载保存的凭据', 'info');
      }
    });
  }

  // Save credentials
  function saveCredentials() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      showStatus('请输入用户名和密码', 'error');
      return;
    }

    const credentials = { username, password };

    chrome.runtime.sendMessage({
      action: 'setCredentials',
      credentials: credentials
    }, function(response) {
      if (response && response.success) {
        showStatus('凭据已保存成功！', 'success');
      } else {
        showStatus('保存失败: ' + (response?.error || '未知错误'), 'error');
      }
    });
  }

  // Clear credentials
  function clearCredentials() {
    chrome.runtime.sendMessage({ action: 'clearCredentials' }, function(response) {
      if (response && response.success) {
        usernameInput.value = '';
        passwordInput.value = '';
        showStatus('凭据已清除', 'info');
      } else {
        showStatus('清除失败: ' + (response?.error || '未知错误'), 'error');
      }
    });
  }

  // Test proxy connection
  function testConnection() {
    showStatus('正在测试连接...', 'info');
    testBtn.disabled = true;

    chrome.runtime.sendMessage({ action: 'testConnection' }, function(response) {
      testBtn.disabled = false;
      
      if (response && response.success) {
        showStatus(`连接成功！当前IP: ${response.ip}`, 'success');
      } else {
        showStatus('连接失败: ' + (response?.error || '未知错误'), 'error');
      }
    });
  }

  // Show status message
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';

    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  }
});
