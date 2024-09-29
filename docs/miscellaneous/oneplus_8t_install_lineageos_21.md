---
layout: doc
---

# Oneplus 8T安装LineageOS 21

手上有一台一加8T，周末闲来无事就拿去刷了个机，也是第一次刷，还挺简单。

## 准备工作

> [!INFO]
> 参考链接：[LineageOS官网](https://wiki.lineageos.org/devices/kebab/) | [大侠阿木](https://optool.daxiaamu.com/wiki_pctool) | [ADB](https://developer.android.com/tools/releases/platform-tools?hl=zh-cn) | [Oxygen OS 11](https://service.oneplus.com/ie/search/search-detail?id=2096330&articleIndex=1) | [Color OS 13](https://www.androidsage.com/2022/11/16/download-stable-oxygen-os-13-android-13-for-oneplus-8-8-pro-8t-9r-9rt-and-10r/)

- 电脑
  - 大侠阿木的一加全能工具箱
  - 安装ADB
- 手机
  - 备份数据！备份数据！备份数据！

## 开始

### 预备LineageOS需要的系统环境

- ADB测试连接
  - `adb devices list`，有显示设备信息就OK
- 使用工具箱解锁bootloader，这个按着工具箱的操作即可
- 解锁后进LineagesOS官网，进入install
  - 这里有提醒，LineagesOS 21建议原版系统也为Android 13/14
- 我原版为H2OS 11,所以先刷了一个欧版的Oxygen OS 11(~~也有博客说没有这个必要，可以直接刷~~)
  - 链接下载压缩包, 复制到手机根目录, 再在系统更新界面选本地更新
- 然后升级Color OS 13, 同上本地更新

### 真·安装LineageOS

- 先下载好`Downloads`里的东西
- 进入`Guides` - `Installation`(建议完整读一遍里面所有文字)
  - `On the device, select “Apply Update”, then “Apply from ADB” to begin sideload.`
  - 其他没有什么坑，但是这个sideload没有说清楚哪里开启
  - Recovery进入后，点`Advanced`, sideload在这里
  - 另外如需Google套件，务必不要略过`Installing Add-Ons`这步重启手机
- Enjoy

## 最后

> [!ERRORING]
> 刷机一时爽，数据火葬场。刷机会清空手机存储，记得提前备份好重要数据。
