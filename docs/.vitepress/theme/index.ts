import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Analytics from './analytics.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(Analytics, { mode: 'home' }),
      'doc-footer-before': () => h(Analytics, { mode: 'doc' })
    })
  }
}
