---
layout: doc
---

# OPNsense 从 ISC DHCP 迁移到 Dnsmasq DNS&DHCP

> 因为OPNsense官方在更新26版本后,把默认的DHCP服务器从ISC DHCP换成了Dnsmasq,所以需要迁移.当然不迁移也还能用,只是不再维护了.另外我也把Unbound DNS停了,也交给Dnsmasq.

> 原先的架构是ISC DHCP+Unbound DNS+AdGuard Home,现在是Dnsmasq DNS&DHCP+AdGuard Home

## 备份OPNsense的配置
- `System-Configuration-Backups-Download configuration` 备份当前的配置文件
- `System-Snapshots` 创建一个快照,记得启用

## 下载ISC DHCP静态地址文件
- `Services-ISC DHCPv4` 下载设置的静态地址列表,下载的文件名是`download_hosts.csv`

## 配置Dnsmasq DNS&DHCP
- `Services-Dnsmasq DNS & DHCP-Hosts` 右下角有一个`Import csv`,导入刚刚下载的文件
- General:
    - Listen port:53053
    - Do not forward to system defined DNS servers:X
    - DHCP FQDN:X
    - DHCP default domain:lan
    - DHCP register firewall rules:X
- Domains:
    - Domain:*
    - IP address:127.0.0.1
    - Port:53
- DHCP ranges:
    - Interface:LAN
    - Start address:192.168.0.100
    - End address:192.168.0.200
- DHCP option:
    - Interface:LAN
    - Option:dns-server[6]
    - Value:192.168.0.1

## 切换
- 关闭ISC DHCP和Unbound DNS,并启用Dnsmasq DNS&DHCP
- 有问题可以查看Log File

## AdGuard Home的设置
- `Settings-DNS Settings-Upstream DNS server` 
    - 添加上游DNS服务器`[/lan/]127.0.0.1:53053`

## 结果
这样内部的DNS和DHCP就交给Dnsmasq,AdGuard Home负责过滤广告和解析外部域名.

## 检查
- [DNS Leak Test](https://browserleaks.com/dns) & [Check My DNS](https://cmdns2.dev.dns-oarc.net/)
- 外网解析可以在浏览器上检验,会显示AdGuard Home的配置的上游DNS.(浏览器的加密DNS要暂时关掉)
- 内网可以ping内网设备,比如`ping my-server.lan`,AdGuard Home日志中能看到会转发到Dnsmasq的53053.


## 参考
- [DHCPv4 with DNS registration](https://docs.opnsense.org/manual/dnsmasq.html#dhcpv4-with-dns-registration)

- [Reddit](https://www.reddit.com/r/opnsense/comments/1mfq7o8/how_to_migrate_from_isc_to_dnsmasq_with_unbound/)
