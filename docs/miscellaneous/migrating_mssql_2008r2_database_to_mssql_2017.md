---
layout: doc
---

# 迁移MSSQL 2008R2数据库到MSSQL 2017


## 说明

公司之前OA使用的MSSQL是2008 R2 Express版本的，突然遇到了数据无法写入的问题。

查找后发现是Express版本单库上限10G(日志文件不算)的缘故，于是购买了MSSQL 2017 Standard，就有了这篇博客。（~~别问为什么是2017，问就是不给买2022~~）

之前的环境是Windows Server 2008 R2 + SQL Server 2008 R2, 准备换到Ubuntu 18.04 LTS + SQL Server 2017 on Linux。(~~1804,已经淘汰了~~)


## 迁移步骤

> 保险起见，我们直接把生产环境的定时备份恢复到了一个新虚拟机上，先操作了一遍迁移过程，确保没有问题后再进行正式迁移。

> 我们自己的需求比较简单，没有使用到SQL Server什么高级功能，所以迁移步骤仅供参考。

1. 安装配置新数据库的系统环境
    - 安装Ubuntu 18.04 LTS
    - 安装SQL Server 2017 on Linux
        - [Quickstart: Install SQL Server and create a database on Ubuntu](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-linux-2017&tabs=ubuntu2004)
        - 安装时需要设置SA密码，后续迁移需要用到
2. 备份老数据库数据
    > 我们先在老数据库打了SP3的补丁再进行的备份
    - 这个比较简单，SSMS直接备份即可
3. 迁移备份文件到新服务器
    - 方法很多，我用的WinSCP
4. 恢复备份数据库文件到新数据库
    > 我们有修改默认路径，单独一块盘存放数据，需要注意新文件夹权限
    - 这个同2，SSMS直接恢复即可
    - （慎重）~~恢复后我们修改了数据库的兼容性到140（SQL Server 2017），之前是100（SQL Server 2008 R2）~~
5. 备份用户数据
    - SA密码不会同步过来！！！
6. 检查数据完整性
    - 确认数据是否完整，表结构、数据等是否正常
    - 检查用户信息是否完整，有没有孤立用户
7. 切换新旧数据库的IP
    - 简 单 粗 暴，万一有问题直接切回去
8. 检查OA系统状态
    

## 坑

1. 激活
    - 最开始安装Ubuntu的数据库时没有选8（I bought xxxx），后来想起又执行了一遍`sudo /opt/mssql/bin/mssql-conf setup`选8输的CDK，看不出有没有真的激活完成。
2. SA密码
    - 之前同步老数据库用户数据，SA密码是不会同步来的，需要手动修改新数据库的SA密码。
3. 文件夹权限
    - 恢复备份时需要注意文件夹权限，确保SQL Server有权限访问备份文件。
4. sqlcmd用不了
    - SQL Server 2017不支持命令行工具 [Install the SQL Server command-line tools sqlcmd and bcp on Linux](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools?view=sql-server-linux-2017&tabs=ubuntu-install)


## 参考

- Gemini
- [Linux 上的 SQL Server 的安装指南](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-setup?view=sql-server-ver15)
- [孤立用户疑难解答 (SQL Server)](https://learn.microsoft.com/zh-cn/sql/sql-server/failover-clusters/troubleshoot-orphaned-users-sql-server?view=sql-server-ver17&viewFallbackFrom=sql-server-linux-2017)