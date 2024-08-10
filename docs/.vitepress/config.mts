import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Neon's blog",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '分类',
        items: [
          { text: 'OPNSense', link: '/opnsense'},
          { text: 'AdGuard Home', link: '/adguradhome'}
        ]
      },
      { text: '标签', link: '/test'},
      { text: '工具', link: '/test'},
      { text: '杂七杂八', link: '/test'},
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neon4096' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/neon4096">Neon Pan</a>',
    },

    search: {
      provider: 'local'
    },
    
    i18nRouting: false,
  }
})
