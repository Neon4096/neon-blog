import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Neon's blog",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '分类',
        items: [
          { text: 'OPNSense', link: '/categories/opnsense/opnsense_index' },
          { text: 'AdGuard Home', link: '/categories/adguardhome/adguardhome_index' },
          { text: 'Cloudflare', link: '/categories/cloudflare/cloudflare_kv' },
          { text: 'Ops', link: '/categories/ops/ops_index' }
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
            { text: '清理日志', link: '/categories/opnsense/opnsense_clear_local_log_file' }
          ]
        },
        {
          text: 'Adguradhome',
          items: [
            { text: 'Adguradhome介绍', link: '/categories/adguardhome/adguardhome_index' },
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
            { text: 'Ops', link: '/categories/ops/ops_index' },
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
            { text: '迁移MSSQL 2008R2数据库到MSSQL 2017', link: '/miscellaneous/migrating_mssql_2008r2_database_to_mssql_2017.md' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neon4096' }
    ],

    footer: {
      message: '网站访问次数:还~没~做~' + '<br>Released under the MIT License.',
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
