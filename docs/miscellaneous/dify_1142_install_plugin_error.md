---
layout: doc
---

# 安装Dify时遇到的插件安装报错

## 说明

想玩一下Dify, docker compose本地部署后安装Deepseek插件遇到报错, 最开始怀疑是网络问题, 这个很常见~~笑~~. 后来下了包本地安装, 发现还是报错, 这就奇怪了.

环境: Debian 13 / Docker version 29.5.1, build 2518b52 / Dify 1.14.2

```bash
failed to launch plugin: failed to install dependencies: failed to install dependencies: signal: killed, output: DEBUG Found workspace root: `/app/storage/cwd/langgenius/deepseek-0.0.15@725407927b04e236212083d20e92830d60fa944e42cd357ef6902c160414f6f1`
DEBUG Adding root workspace member: `/app/storage/cwd/langgenius/deepseek-0.0.15@725407927b04e236212083d20e92830d60fa944e42cd357ef6902c160414f6f1`
DEBUG Skipping `pyproject.toml` in `/app/storage/cwd/langgenius/deepseek-0.0.15@725407927b04e236212083d20e92830d6...UG No cache entry for: https://files.pythonhosted.org/packages/c2/b0/956902e5e1302f8c5d124e219c6bf214e2649f92ad5fce85b05c039a04c9/zope_event-6.1-py3-none-any.whl
DEBUG Sending fresh GET request for: https://files.pythonhosted.org/packages/c2/b0/956902e5e1302f8c5d124e219c6bf214e2649f92ad5fce85b05c039a04c9/zope_event-6.1-py3-none-any.whl
Downloading tiktoken (1.1MiB)
Downloading gevent (2.0MiB)
Downloading pydantic-core (2.0MiB)
init process exited due to no activity for 120 seconds
failed to init environment
```
## 解决

找了好一圈, 最后在一个issue里翻到了解决方案, 降级plugin_daemon的版本到0.5.3, 重启后成功.

```bash
# In docker-compose.yaml, under plugin_daemon
image: langgenius/dify-plugin-daemon:0.5.3-local
```

## 参考
[https://github.com/langgenius/dify-official-plugins/issues/2861](https://github.com/langgenius/dify-official-plugins/issues/2861)