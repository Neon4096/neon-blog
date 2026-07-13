export async function onRequest({ request }) {
  const url = new URL(request.url)
  const shareToken = url.searchParams.get('token')
  const startAt = url.searchParams.get('startAt')
  const endAt = url.searchParams.get('endAt')
  const pageUrl = url.searchParams.get('url')

  let apiUrl = `https://api.umami.is/v1/share/${shareToken}/stats?startAt=${startAt}&endAt=${endAt}`
  if (pageUrl) apiUrl += `&url=${encodeURIComponent(pageUrl)}`

  const res = await fetch(apiUrl)
  const data = await res.json()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}
