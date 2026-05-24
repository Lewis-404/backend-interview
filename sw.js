// Service Worker — Go 后端面试训练营
// 离线缓存策略：安装时预缓存所有资源，请求时 cache-first

const CACHE_NAME = 'interview-camp-v1';
const PRE_CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  // 分类首页
  './go/index.html',
  './mysql/index.html',
  './redis/index.html',
  './linux/index.html',
  './mq/index.html',
  './docker/index.html',
  './k8s/index.html',
  './cicd/index.html',
  './system-design/index.html',
  './ai-engineering/index.html',
  // Go
  './go/goroutine.html', './go/channel.html', './go/gmp.html',
  './go/context.html', './go/defer.html', './go/slice.html',
  './go/map-concurrent.html', './go/gc.html', './go/escape.html',
  // MySQL
  './mysql/index-btree.html', './mysql/mvcc.html', './mysql/transaction.html',
  './mysql/locks.html', './mysql/explain.html', './mysql/slow-query.html',
  './mysql/compound-index.html', './mysql/back-table.html', './mysql/redo-undo.html',
  './mysql/subquery-join.html',
  // Redis
  './redis/cache-penetration.html', './redis/cache-breakdown.html',
  './redis/cache-avalanche.html', './redis/persistence.html',
  './redis/replication.html', './redis/sentinel.html',
  './redis/cluster.html', './redis/distributed-lock.html',
  './redis/bigkey.html', './redis/why-fast.html',
  // Linux
  './linux/top.html', './linux/ps.html', './linux/grep.html',
  './linux/awk.html', './linux/netstat.html', './linux/lsof.html',
  './linux/tail.html', './linux/shell.html',
  // MQ
  './mq/repeat-consume.html', './mq/message-loss.html',
  './mq/idempotence.html', './mq/backlog.html',
  // Docker
  './docker/dockerfile.html', './docker/image.html', './docker/container.html',
  './docker/volume.html', './docker/network.html',
  // K8s
  './k8s/pod.html', './k8s/deployment.html', './k8s/service.html',
  './k8s/ingress.html',
  // CI/CD
  './cicd/pipeline.html',
  // System Design
  './system-design/payment.html', './system-design/shorturl.html',
  './system-design/leaderboard.html', './system-design/seckill.html',
  './system-design/push.html', './system-design/im.html',
  // AI Engineering
  './ai-engineering/packaging.html'
];

// 安装：预缓存所有资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching all resources...');
      return cache.addAll(PRE_CACHE_URLS).catch(err => {
        console.warn('[SW] Some resources failed to pre-cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 激活：清理旧版本缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 请求：cache-first 策略
self.addEventListener('fetch', event => {
  // 跳过非 GET 请求和非 http/https 请求
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // 缓存命中 → 直接返回
      if (cached) return cached;

      // 缓存未命中 → 走网络，并动态缓存
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // 网络失败 → 返回离线页面（HTML 请求时）
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
