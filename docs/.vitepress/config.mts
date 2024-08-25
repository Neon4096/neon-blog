import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Neon's blog",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { 
        text: '分类',
        items: [
          { text: 'OPNSense', link: '/categories/opnsense/opnsense_index' },
          { text: 'AdGuard Home', link: '/categories/adguardhome/adguardhome_index' },
          { text: 'Cloudflare', link: '/categories/cloudflare/cloudflare_kv' }
        ]
      },
      { text: '标签', link: '/'},
      { text: '工具', link: '/'},
      { text: '杂七杂八', link: '/miscellaneous/miscellaneous_index'},
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
        }
      ],
      '/miscellaneous/': [
        {
          text: 'Vitepress',
          items: [
            { text: '修复Cf Page部署后lastUpdated显示错误', link: '/miscellaneous/vitepress/vitepress_fix_cloudflare_page_lastUpdated_display_error' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neon4096' }
    ],

    footer: {
      message: '网站访问次数:-1' + '<br>Released under the MIT License.', 
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
  }
})
