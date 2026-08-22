import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Neon's blog",
  description: "A VitePress Site",
  lastUpdated: true,
  head: [
    ['script', {
      defer: 'true',
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': '2364fbfb-1a04-4186-be1e-ad683c5df042'
    }]
  ],
  themeConfig: {
    nav: [
      {
        text: '分类',
        items: [
          { text: 'OPNSense', link: '/categories/opnsense/opnsense_index' },
          { text: 'AdGuard Home', link: '/categories/adguardhome/oxidns_lan_dns_routing.md' },
          { text: 'Cloudflare', link: '/categories/cloudflare/cloudflare_kv' },
          { text: 'Ops', link: '/categories/ops/set_up_prometheus_and_grafana_using_podman_pod' }
        ]
      },
      { text: '🚫标签', link: '' },
      { text: '🚫工具', link: '' },
      { text: '杂七杂八', link: '/miscellaneous/miscellaneous_index' },
    ],

    sidebar: {
      '/categories/': [
        {
          text: 'OPNSense',
          items: [
            { text: 'OPNSense介绍', link: '/categories/opnsense/opnsense_index' },
            { text: '清理日志', link: '/categories/opnsense/opnsense_clear_local_log_file' },
            { text: 'ISC DHCP迁移到Dnsmasq', link: '/categories/opnsense/opnsense_migrate_isc_dhcp_to_dnsmasq' },
            { text: '配置公网IPv6及遇到的RA冲突问题', link: '/categories/opnsense/opnsense_ipv6_dnsmasq_ra_conflict' }
          ]
        },
        {
          text: 'AdGuard Home',
          items: [
            { text: 'OxiDNS实现局域网的DNS分流', link: '/categories/adguardhome/oxidns_lan_dns_routing.md' }
          ]
        },
        {
          text: 'Cloudflare',
          items: [
            { text: 'Cloudflare KV', link: '/categories/cloudflare/cloudflare_kv' },
          ]
        },
        {
          text: 'Ops',
          items: [
            { text: 'Podman pod搭建Prometheus+Grafana', link: '/categories/ops/set_up_prometheus_and_grafana_using_podman_pod' }
          ]
        }
      ],
      '/miscellaneous/': [
        {
          text: '杂七杂八',
          items: [
            { text: '修复Cf Page部署后lastUpdated显示错误', link: '/miscellaneous/vitepress_fix_cloudflare_page_lastUpdated_display_error' },
            { text: 'Oneplus 8T安装LineageOS21', link: '/miscellaneous/oneplus_8t_install_lineageos_21' },
            { text: '修复Cf Page部署后图片路径的错误', link: '/miscellaneous/vitepress_fix_cloudflare_page_static_file_error.md' },
            { text: '迁移MSSQL 2008R2数据库到MSSQL 2017', link: '/miscellaneous/migrating_mssql_2008r2_database_to_mssql_2017.md' },
            { text: 'Dify 1.14.2安装插件报错', link: '/miscellaneous/dify_1142_install_plugin_error.md' }  
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neon4096' }
    ],

    footer: {
      message: '网站访问次数: <span id="site-pv">-</span> PV / <span id="site-uv">-</span> UV<br>Released under the MIT License.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/neon4096">Neon Pan</a>',
    },

    search: {
      provider: 'local'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
        hourCycle: 'h24'
      }
    },

    i18nRouting: false,
  },
  markdown: {
    image: {
      lazyLoading: true
    }
  }

})
