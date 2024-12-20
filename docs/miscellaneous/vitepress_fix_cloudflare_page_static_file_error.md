---
layout: doc
---

# 修复Cf Page部署后图片路径的错误

## 说明

前面有遇到两次这样的问题，在md里用的相对路径和绝对路径，本地看效果都OK，一部署到CF Page就报错了。

## 解决方法

> [!TIP] 参见文档
> [静态资源处理](https://cn.vite.dev/guide/assets.html#the-public-directory)

- `mkdir docs/public`
- 假设图片存在`docs/public/image/to/path`路径下，则在md的图片路径里直接使用`/image/to/path`
  > 如 `![aa](/image/to/path/aa.png)` ，等效于`![aa](docs/public/image/to/path/aa.png)`
