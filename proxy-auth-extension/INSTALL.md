# 🚀 代理认证扩展安装指南

## 📦 快速安装步骤

### 第1步：下载扩展文件
确保您有完整的 `proxy-auth-extension` 文件夹，包含以下文件：
```
proxy-auth-extension/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── README.md
└── INSTALL.md
```

### 第2步：安装到浏览器

1. **打开扩展管理页面**
   - 在 ungoogled-chromium 地址栏输入：`chrome://extensions/`
   - 或者：菜单 → 更多工具 → 扩展程序

2. **开启开发者模式**
   - 点击右上角的"开发者模式"开关
   - 确保开关处于开启状态（蓝色）

3. **加载扩展**
   - 点击"加载已解压的扩展程序"按钮
   - 选择 `proxy-auth-extension` 文件夹
   - 点击"选择文件夹"

4. **验证安装**
   - 扩展列表中应该出现"Proxy Authentication Helper"
   - 浏览器工具栏会出现扩展图标

## ⚙️ 配置您的代理

### 使用您的 kookeey 代理

根据您提供的代理信息：
`http://6075849-a11a16ce:e9a6377b-global-72173248-5m@gate-hk.kookeey.info:1000`

**配置步骤：**

1. **点击扩展图标**
   - 在浏览器工具栏找到扩展图标并点击

2. **输入认证信息**
   ```
   用户名: 6075849-a11a16ce
   密码: e9a6377b-global-72173248-5m
   ```

3. **保存设置**
   - 点击"保存"按钮
   - 看到"凭据已保存成功！"提示

4. **测试连接**
   - 点击"测试连接"按钮
   - 如果成功会显示当前IP地址

## 🚀 启动带代理的浏览器

### Windows 命令行
```cmd
# 基本启动
chrome.exe --proxy-server=gate-hk.kookeey.info:1000

# 完整指纹浏览器配置
chrome.exe --proxy-server=gate-hk.kookeey.info:1000 ^
           --fingerprinting-canvas-image-data-noise ^
           --fingerprinting-canvas-measuretext-noise ^
           --fingerprinting-client-rects-noise ^
           --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# 多账号配置
chrome.exe --user-data-dir="C:\Users\%USERNAME%\Desktop\profiles\account1" ^
           --proxy-server=gate-hk.kookeey.info:1000 ^
           --fingerprinting-canvas-image-data-noise
```

### PowerShell
```powershell
# 基本启动
& "C:\Program Files\ungoogled-chromium\chrome.exe" --proxy-server=gate-hk.kookeey.info:1000

# 完整配置
& "C:\Program Files\ungoogled-chromium\chrome.exe" `
  --proxy-server=gate-hk.kookeey.info:1000 `
  --fingerprinting-canvas-image-data-noise `
  --fingerprinting-canvas-measuretext-noise `
  --fingerprinting-client-rects-noise `
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
```

## 🧪 验证代理工作

### 方法1：访问IP检测网站
启动配置好的浏览器后，访问以下网站：
- https://whatismyipaddress.com/
- https://ipinfo.io/
- https://httpbin.org/ip

应该显示香港的IP地址。

### 方法2：使用扩展测试
1. 点击扩展图标
2. 点击"测试连接"按钮
3. 查看返回的IP地址

## ❗ 故障排除

### 扩展加载失败
- **错误**: "无法加载扩展程序"
- **解决**: 确保所有文件都在 `proxy-auth-extension` 文件夹中

### 代理连接失败
- **检查代理服务器状态**
- **验证用户名密码是否正确**
- **确认网络连接正常**

### 认证不工作
1. 打开 `chrome://extensions/`
2. 找到"Proxy Authentication Helper"
3. 点击"详细信息"
4. 点击"检查视图" → "Service Worker"
5. 查看控制台错误信息

## 🎯 实际应用示例

### 薅羊毛场景
```cmd
# 启动隐身模式进行注册
chrome.exe --incognito ^
           --proxy-server=gate-hk.kookeey.info:1000 ^
           --fingerprinting-canvas-image-data-noise ^
           --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
```

### 多账号电商
```cmd
# 账号1
chrome.exe --user-data-dir="profiles\shop1" ^
           --proxy-server=gate-hk.kookeey.info:1000

# 账号2
chrome.exe --user-data-dir="profiles\shop2" ^
           --proxy-server=gate-hk.kookeey.info:1000
```

## 🔒 安全提醒

- 扩展将认证信息存储在本地浏览器中
- 不要在公共电脑上保存敏感代理信息
- 定期更换代理密码
- 使用可信的代理服务商

---

**安装完成后，您就可以无缝使用带密码的代理服务器了！** 🎉
