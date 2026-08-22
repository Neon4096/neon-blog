---
layout: doc
---

# OPNSense配置公网IPv6及遇到的Dnsmasq与Router Advertisements冲突问题

## 说明
很久之前就配置过一次IPv6, 不记得什么原因就没有继续使用了. 最近又想尝试一下, 中间遇到了RA的问题, 卡了很久, 记录一下.

## 配置IPv6的步骤
这里具体的步骤就不说了, 参考文章在最下面. 我用的是最新的OPNsense 26.7.2, 有一些系统版本上的差异要说明:
- 参考里的(ISC) DHCP已经弃用了, 现在默认用的是Dnsmasq DNS & DHCP. 
- 参考里提到的`接口-WAN-DHCPv6客户端配置-使用IPv4连接`, 现在已经没有了, 忽略就好.
- Dnsmasq的IPv6的DNS服务在` DNS & DHCP-General-DHCP options`里新建一个`Option6:dns-server[23]`, `Value`按需填.

## 遇到的Warning报错
在前面的配置好后, 我在`System-Logs-Settings`里看到有Warning报错.
```
2026-08-19T01:47:09WarningradvdRDNSS address 240e:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:f765 received on igc1 from fe80::xxxx:xxxx:xxxx:f765 is not advertised by us
2026-08-19T01:47:09Warningradvdour AdvPreferredLifetime on igc1 for 240e:xxxx:xxxx:xxxx:: doesn't agree with fe80::xxxx:xxxx:xxxx:f765
2026-08-19T01:47:09Warningradvdour AdvCurHopLimit on igc1 doesn't agree with fe80::xxxx:xxxx:xxxx:f765
```
这些错误一直在重复, 肯定是有问题的(虽然不影响使用, 看着还是很难受).

## 发现问题及解决办法
在配合AI尝试了很多次之后, 最后在官方文档的Attention中发现了原因, 怪我英语不好.
:::warning Attention
DHCPv6 does not have a router option like DHCPv4. To push the default gateway to clients you must use Router Advertisements. This can be done with Dnsmasq, but also by a different service like Services ‣ Router Advertisements.
:::
我误以为要把`Router Advertisements`和`Dnsmasq DNS & DHCP`都开起来, 其实只要开一个就行了(看具体需求, `Router Advertisements`功能少一点; 当然也可以一起用).
另外在`Dnsmasq DNS & DHCP-General-DHCP`里也有一个`Router advertisements`, 这个我之前就没启用, 但实际就是有两个RA在工作, 应该是配置了`DHCP options`导致的.

最后把Router Advertisements关掉, 只用Dnsmasq DNS & DHCP, Warning就解决了.

## IPv6配置后遇到的卡顿问题
因为ISP分配的前缀会变动, 还有DHCP的分配过期, 一旦变动, 之前用旧前缀拼接的IPv6地址就会失效. 在新地址还没派发到各个设备上生效时, OPNsense的规则设定了只有Lan network才能对外访问, 所以被Deny, 引起了内网的卡顿. 我又不希望把Lan network改成any, 就先放着吧.

## 学到的新知识
- ping6要加网口: 
```bash
ping6 -I eth0 fe80::1234:5678:9abc:1
OR
ping6 fe80::1234:5678:9abc:1%eth0
```

## 参考
- [Opnsense-IPv6 设置](https://wiki.waringid.me/spaces/VirtualReal/pages/53379150/Opnsense-IPv6+%E8%AE%BE%E7%BD%AE)
- [DHCPv6 and Router Advertisements](https://docs.opnsense.org/manual/dnsmasq.html#dhcpv6-and-router-advertisements)