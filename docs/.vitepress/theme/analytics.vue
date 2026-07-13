<template>
  <div v-if="views !== null" :class="mode === 'home' ? 'site-analytics-home' : 'site-analytics-doc'">
    <span v-if="mode === 'home'">
      本站总访问量 <strong class="view-count">{{ views }}</strong> PV / <strong class="view-count">{{ visitors }}</strong> UV
    </span>
    <span v-else>
      本文总阅读量 <strong class="view-count">{{ views }}</strong> 次
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps({
  mode: { type: String, default: 'doc' }
})

const route = useRoute()
const views = ref(null)
const visitors = ref(null)

const SHARE_TOKEN = 'Wufx25kqm0BrR94E'

const fetchViews = async () => {
  try {
    const endAt = Date.now()
    const startAt = endAt - 365 * 24 * 60 * 60 * 1000

    let url = `/api/umami?token=${SHARE_TOKEN}&startAt=${startAt}&endAt=${endAt}`

    if (props.mode === 'doc') {
      const pagePath = encodeURIComponent(route.path)
      url += `&url=${pagePath}`
    }

    const res = await fetch(url)
    const data = await res.json()

    views.value = data.pageviews?.value || 0
    visitors.value = data.visitors?.value || 0

    if (props.mode === 'home') {
      const pvEl = document.getElementById('site-pv')
      const uvEl = document.getElementById('site-uv')
      if (pvEl) pvEl.textContent = views.value
      if (uvEl) uvEl.textContent = visitors.value
    }
  } catch (e) {
    console.error('Umami 数据获取失败:', e)
  }
}

onMounted(() => fetchViews())

watch(() => route.path, () => {
  if (props.mode === 'doc') {
    fetchViews()
  }
})
</script>

<style scoped>
.view-count {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>
