---
layout: doc
---

# 修复Cf Page部署后lastUpdated显示错误

## 说明

本地预览是正常的，没有问题，但是部署到Page后，所有文章的lastUpdated就都变成了最后一个git push的时间点。

## 解决方法

> [!TIP] 参考链接
> [https://github.com/vuejs/vitepress/discussions/3580](https://github.com/vuejs/vitepress/discussions/3580)

参考链接上的方法，在`package.json`新建一行指令：

```js
"scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs",
    "docs:cfpagebuild": "git fetch --unshallow && vitepress build docs" // [!code ++]
  },
```

再在Cloudflare官网的Workers & Pages的本项目编辑构建配置,修改命令为`npm run docs:cfpagebuild`

> 我在Page编译时，还遇到了找不到dist的报错，又修改了Path为`docs`

![图](/miscellaneous/images/vitepress_lastUpdated_error.png)

编译通过，完成！
