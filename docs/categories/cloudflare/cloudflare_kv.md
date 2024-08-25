---
layout: doc
---

# 学习使用Cloudflare KV

> 参考[官方文档](https://developers.cloudflare.com/kv/get-started)

## 搭建环境

- 首先你需要有一个Cloudflare账号
- 安装好npm/yarn和node

## 创建项目

- `npm create cloudflare@latest kv-tutorial`
- 按图中选项选择
  - ![cloudflare-kv-1](/image/cloudflare_image/cloudflare-kv-1.jpg)
  - ![cloudflare-kv-2](/image/cloudflare_image/cloudflare-kv-2.jpg)

## 创建KV namespace

> 这里使用命令行创建namespace

- `cd kv-tutorial`
- `npx wrangler kv namespace create BLOG_TEST_KV` `BLOG_TEST_KV`替换成你想要的名称
- 复制命令行结果的下三行到wrangler.toml,创建就完成了

```bash
  [[kv_namespaces]]
  binding = "BLOG_TEST_KV"
  id = "ff7a5c5bf2b74f77b0995f6e96451fa7"
```

## 使用KV namespace

- 将代码块直接复制粘贴到src/index.ts

```typescript
export interface Env {
  BLOG_TEST_KV: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      await env.BLOG_TEST_KV.put("key114", "value514");
      const value = await env.BLOG_TEST_KV.get("key114");
      if (value === null) {
        return new Response("Value not found", { status: 404 });
      }
      return new Response(value);
    } catch (err) {
      console.error(`KV returned error: ${err}`)
      return new Response(String(err), { status: 500 })
    }
  },
} satisfies ExportedHandler<Env>;
```

- 替换`BLOG_TEST_KV`，`key114`, `value514`成自己的命名的值
- `npx wrangler dev`
- 打开终端提示的网页，显示出值为`value514`，完成
  