---
layout: doc
---

# AdGuard Home+OxiDNS实现局域网的DNS分流

## 说明
DNS分流想做很久了, 咕了很久. 最近论坛刷到有人从MosDNS换到了OxiDNS体感不错, 就来搭一个玩玩.

之前没做分流, 都是在防火墙拦截53请求, 统一转发给AdGuard Home去DoH解析. AdGuard Home一般够用了, 但是有些情况还是想用Cloudflare和Google的解析. 

现在还是在防火墙拦截53请求, 转发给AdGuard Home做广告拦截, 然后再给上游OxiDNS做分流. 当然OxiDNS本来就支持AdGuard Home的广告拦截规则.

用了有两周了, 总体还不错, 但是OxiDNS的面板还是不够好看(所以用了AdGuard Home做看板). 至于域内已经加密了的DNS, 暂时就不管他了.

## 配置
安装过程就省略了, 直接放配置文件, 这里主要参考了一个大佬的帖子.

实测下来我这里的海外DoH和DoQ也只是部分能用, 暂时还没找原因. 阿里的DoQ有点惊喜. 

AdGuard Home面板统计平均处理时间50ms, 上游OxiDNS68ms.

```yaml
# OxiDNS default configuration file
#
# See full documentation at:
# https://oxidns.org

log:
  level: info

# Management API (optional)
api:
  http:
    listen: ":9199"
    # auth:
    #   type: basic
    #   username: admin
    #   password: secret
    # Optional static WebUI directory. Relative paths resolve from -d/--working-dir.
    # Debian packages use -d /var/lib/oxidns, so ./webui means /var/lib/oxidns/webui.
    # API routes are served under /api/*.
    webui:
      root: "./webui"

# ============================================================
# 规则订阅下载
# ============================================================
plugins:
  # --- 订阅下载: geosite.dat / geoip.dat / 广告规则 ---
  - tag: subscription_download
    type: download
    args:
      timeout: 30s
      startup_if_missing: true
      socks5: 1.2.3.4:7890
      downloads:
        - url: https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat
          dir: ./rules
          filename: geosite.dat
        - url: https://cdn.jsdelivr.net/gh/Loyalsoldier/geoip@release/geoip-only-cn-private.dat # only-cn
          dir: ./rules
          filename: geoip.dat
        # - url: https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt
        #   dir: ./rules
        #   filename: adguard.txt
        # - url: https://easylist-downloads.adblockplus.org/easylistchina.txt
        #   dir: ./rules
        #   filename: easylistchina.txt

  # --- 定向刷新 provider (热重载) ---
  - tag: reload_rule_providers
    type: reload_provider
    args:
      - "$geosite_cn"
      - "$geosite_non_cn"
      - "$geoip_cn"
      # - "$ad_rules"

  # --- 订阅刷新 sequence ---
  - tag: subscription_refresh
    type: sequence
    args:
      - exec: "$subscription_download"
      - exec: "$reload_rule_providers"

  # --- 定时任务: 每 6 小时自动更新规则 ---
  - tag: subscription_cron
    type: cron
    args:
      timezone: "Asia/Shanghai"
      jobs:
        - name: refresh_rule_subscriptions
          interval: 6h
          executors:
            - "$subscription_refresh"

# ============================================================
# Provider: 规则集
# ============================================================
  # --- 国内域名规则 ---
  - tag: geosite_cn
    type: geosite
    args:
      file: "./rules/geosite.dat"
      selectors:
        - "cn"

  # --- 非国内域名规则 ---
  - tag: geosite_non_cn
    type: geosite
    args:
      file: "./rules/geosite.dat"
      selectors:
        - "geolocation-!cn"

  # --- 国内 IP 规则 ---
  - tag: geoip_cn
    type: geoip
    args:
      file: "./rules/geoip.dat"
      selectors:
        - "cn"

  # --- 广告规则 (AdGuard 格式 + anti-ad) ---
  # - tag: ad_rules
  #   type: adguard_rule
  #   args:
  #     files:
  #       - ./rules/adguard.txt
  #       - ./rules/easylistchina.txt

# ============================================================
# 本地 hosts 规则
# ============================================================
  # - tag: local_hosts
  #   type: hosts
  #   args:
  #     files:
  #       - "./rules/hosts.txt"
  #     short_circuit: true

# ============================================================
# 广告拦截分支
# ============================================================
  # - tag: blocked
  #   type: sequence
  #   args:
  #     - exec: "black_hole 0.0.0.0 ::"
  #     - exec: accept

# ============================================================
# 缓存
# ============================================================
  - tag: cache_main
    type: cache
    args:
      size: 8192
      short_circuit: true
      lazy_cache_ttl: 120
      cache_negative: true
      max_negative_ttl: 300
      max_positive_ttl: 600
      dump_file: "./dns_cache.dump"
      dump_interval: 1800

# ============================================================
# 上游 DNS
# ============================================================
  # --- 国内上游: 阿里 腾讯 ---
  - tag: forward_cn
    type: forward
    args:
      concurrent: 3
      response_selection: fastest
      upstreams:
        - addr: https://dns.alidns.com/dns-query
          dial_addr: 223.5.5.5
        - addr: https://doh.pub/dns-query
          dial_addr: 1.12.12.12
        # test
        - addr: quic://dns.alidns.com:853
          dial_addr: 223.5.5.5

  # --- 国外上游: 走代理 ---
  - tag: forward_overseas
    type: forward
    args:
      concurrent: 3
      response_selection: balanced
      upstreams:
        # DoH
        - tag: doh_cloudflare # 支持doh3
          addr: https://cloudflare-dns.com/dns-query
          dial_addr: 1.1.1.1
          enable_http3: true
          socks5: 1.2.3.4:7890
        - tag: doh_google
          addr: https://dns.google/dns-query
          dial_addr: 8.8.8.8
          socks5: 1.2.3.4:7890
        - tag: doh_quad9 # 支持doh3
          addr: https://dns.quad9.net/dns-query
          dial_addr: 9.9.9.9
          enable_http3: true
          socks5: 1.2.3.4:7890
        # - tag: doh_adguard
        #   addr: https://dns.adguard-dns.com/dns-query
        #   dial_addr: 94.140.14.14
        #   socks5: 1.2.3.4:7890
        # - tag: doh_dns4eu
        #   addr: https://unfiltered.joindns4.eu/dns-query
        #   dial_addr: 86.54.11.100
        #   socks5: 1.2.3.4:7890
        # - tag: doh_wikimedia
        #   addr: https://wikimedia-dns.org/dns-query
        #   dial_addr: 185.71.138.138
        #   socks5: 1.2.3.4:7890
        # # DoQ
        # - tag: doq_cloudflare
        #   addr: quic://cloudflare-dns.com:853
        #   dial_addr: 1.1.1.1
        #   socks5: 1.2.3.4:7890
        # - tag: doq_adguard
        #   addr: quic://unfiltered.adguard-dns.com
        #   dial_addr: 94.140.14.14
        #   socks5: 1.2.3.4:7890
        # - tag: doq_quad9
        #   addr: quic://dns.quad9.net:853
        #   dial_addr: 9.9.9.9
        #   socks5: 1.2.3.4:7890

# ============================================================
# 主策略 sequence
# ============================================================
  - tag: seq_main
    type: sequence
    args:
      # 1. 本地 hosts 优先
      # - exec: "$local_hosts"

      # 2. 广告域名拦截
      # 由上层adguardhome处理
      #- matches: "question $ad_rules"
      #  exec: goto blocked

      # 3. 缓存查询
      - exec: "$cache_main"

      # 4. 国内域名 -> 国内上游
      - matches:
          - "!has_resp"
          - "qname $geosite_cn"
        exec: "$forward_cn"

      # 5. 非国内域名 -> 国外上游
      - matches:
          - "!has_resp"
          - "qname $geosite_non_cn"
        exec: "$forward_overseas"

      # 6. 兜底: 未匹配到 geosite 规则的域名
      #    必须走国外上游
      - matches: "!has_resp"
        exec: "$forward_overseas"

# ============================================================
# DNS 服务器入口
# ============================================================
  # UDP server listening on :5353
  - tag: udp_server
    type: udp_server
    args:
      entry: seq_main
      listen: ":5353"

  # TCP server listening on :5353
  - tag: tcp_server
    type: tcp_server
    args:
      entry: seq_main
      listen: ":5353"
```

## 参考
[使用oxidns来简化原有RouterOS上分流逻辑](https://blog.linx.run/p/%E4%BD%BF%E7%94%A8oxidns%E6%9D%A5%E7%AE%80%E5%8C%96%E5%8E%9F%E6%9C%89routeros%E4%B8%8A%E5%88%86%E6%B5%81%E9%80%BB%E8%BE%91/#configyaml)