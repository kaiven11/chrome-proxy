# 🔐 代理认证助手扩展

这是一个为 ungoogled-chromium 设计的代理认证扩展，可以自动处理需要用户名密码的代理服务器认证。

## ✨ 功能特性

- 🔒 **自动代理认证**: 自动提供代理服务器认证凭据
- 💾 **安全存储**: 凭据安全存储在本地浏览器中
- 🧪 **连接测试**: 内置代理连接测试功能
- 🎨 **简洁界面**: 直观易用的设置界面
- 🛡️ **隐私保护**: 所有数据仅存储在本地

## 📦 安装方法

### 方法1：开发者模式安装

1. 打开 ungoogled-chromium 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `proxy-auth-extension` 文件夹
6. 扩展安装完成！

### 方法2：打包安装

1. 在扩展管理页面点击"打包扩展程序"
2. 选择 `proxy-auth-extension` 文件夹
3. 生成 `.crx` 文件
4. 拖拽 `.crx` 文件到扩展页面安装

## 🚀 使用方法

### 基本设置

1. 点击浏览器工具栏中的扩展图标
2. 输入代理服务器的用户名和密码
3. 点击"保存"按钮
4. 点击"测试连接"验证设置

### 配合指纹浏览器使用

```bash
# 启动带代理的 ungoogled-chromium
./chrome --proxy-server=proxy.example.com:8080 \
         --fingerprinting-canvas-image-data-noise \
         --fingerprinting-client-rects-noise \
         --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
```

### 多账号管理

为不同的用户配置文件设置不同的代理：

```bash
# 账号1
./chrome --user-data-dir=/path/to/profile1 \
         --proxy-server=proxy1.example.com:8080

# 账号2  
./chrome --user-data-dir=/path/to/profile2 \
         --proxy-server=proxy2.example.com:8080
```

## 🎯 应用场景

### 1. 多账号运营
- 电商平台多店铺管理
- 社交媒体矩阵运营
- 广告投放账号隔离

### 2. 数据采集
- 网页数据抓取
- 价格监控
- 竞品分析

### 3. 隐私保护
- 匿名浏览
- 地理位置伪装
- 避免行为追踪

### 4. 薅羊毛活动
- 新用户注册奖励
- 限时优惠活动
- 推荐返利任务

## ⚙️ 高级配置

### 自动化脚本

```javascript
// 批量设置代理认证
const proxies = [
  { host: 'proxy1.com:8080', username: 'user1', password: 'pass1' },
  { host: 'proxy2.com:8080', username: 'user2', password: 'pass2' }
];

proxies.forEach((proxy, index) => {
  // 为每个代理创建独立的浏览器实例
  console.log(`Setting up proxy ${index + 1}: ${proxy.host}`);
});
```

### 代理轮换

扩展支持动态切换代理服务器，适合需要频繁更换IP的场景。

## 🔧 故障排除

### 常见问题

1. **认证失败**
   - 检查用户名密码是否正确
   - 确认代理服务器支持认证
   - 验证代理服务器地址和端口

2. **连接超时**
   - 检查网络连接
   - 确认代理服务器状态
   - 尝试更换代理服务器

3. **扩展无效**
   - 重新加载扩展
   - 检查扩展权限
   - 查看浏览器控制台错误

### 调试模式

1. 打开 `chrome://extensions/`
2. 找到代理认证助手扩展
3. 点击"详细信息"
4. 点击"检查视图"中的"背景页"
5. 查看控制台日志

## 🛡️ 安全说明

- 所有凭据仅存储在本地浏览器中
- 不会向任何第三方服务器发送数据
- 建议定期更换代理密码
- 使用可信的代理服务商

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 请遵守当地法律法规，合理使用代理服务。
