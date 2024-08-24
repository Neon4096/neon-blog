---
layout: doc
---

# OPNSense 清理日志

> 好像没有关于清理日志文件的中文文章，就来水一篇

没用过`入侵检测`，就学着配置了一下，结果第二天发现网络很慢，浏览器访问防火墙也只加载界面不加载内容，就知道出问题了。过了很久终于加载出仪表盘内容了，发现磁盘占用102%, 512G的硬盘一天就写爆了！

ssh登录防火墙，进入shell，手动清理了一部分日志：
- `rm /var/log/flowd.log` 
- `rm /var/log/filter/*`
- 其他的不记得了2333。如果还有其他的超大文件，看着点删吧

> 要分析日志的话还是备份完再删吧

删完web页面就正常了, 但是有遇到了断网的情况，一会可能会恢复，不行就再重启一下防火墙。

开了`入侵检测`后遇到了几次，后来找到了web里可以设置日志文件大小，在`系统:设置:日志-本地`，按需设置Maximum preserved files和Maximum file size。[官方文档](https://docs.opnsense.org/manual/settingsmenu.html#logging)

另外还有可以设置定时任务，在`系统-设置-任务`，新建`Rotate log files`


> 最后再bb一句，入侵检测规则少!开!点!