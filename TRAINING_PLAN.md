# Go 后端面试强化训练 — 15天冲刺计划

> 来财出品 | 2026-05-24
> 目标：快速稳定拿到 Go 后端 Offer
> 核心：知识体系化 + 结构化表达

---

## 📊 训练哲学

```
不是学更多新技术 → 把已有知识"体系化表达"
不是随意回答 → 严格7步模板 + 先总结再展开
不是被动学习 → 模拟面试 → 纠错 → 追问 → 复盘
```

## 🎯 每天训练结构（90分钟/天）

| 阶段 | 时间 | 内容 |
|------|------|------|
| 复习 | 10min | 打开 HTML 卡片，快速过前一天主题的「一句话结论」+「追问树」 |
| 主训 | 45min | 当日主题：真人/AI模拟面试 → 7步模板回答 → 纠错 → 追问 |
| 表达 | 20min | 60秒极限表达训练（每个主题计时，不许超） |
| 复盘 | 15min | 自检清单打勾 + 标记薄弱点 + 记录错题 |

---

## 📅 Day 1-3: Go 语言（核心）

### Day 1 — 并发基础
- goroutine（为什么轻量？2KB栈 vs 1MB）
- channel（hchan结构、无缓冲vs有缓冲、select、关闭规则）
- **输出**：能60秒讲清 goroutine为什么轻量，追问到GMP不卡

### Day 2 — 调度与上下文
- GMP 调度模型（G/M/P、工作窃取、handoff、抢占式）
- context（四种创建、树状取消、Done()、最佳实践）
- **输出**：能画出GMP三者关系图，讲清一个请求超时全程

### Day 3 — 内存与坑
- defer（LIFO、参数预计算、return和defer顺序）
- slice（ptr+len+cap、扩容策略、共享底层数组的坑）
- map并发（fatal error、sync.RWMutex vs sync.Map）
- **输出**：能讲清"slice传参为什么不加指针也能改"

---

## 📅 Day 4-6: MySQL（核心）

### Day 4 — 索引体系
- B+Tree为什么是首选（多叉+范围查询+叶子链表+16KB页）
- 联合索引与最左前缀（ICP、索引失效场景）
- 回表与覆盖索引（二级索引→聚簇索引、Using index）
- **输出**：能画B+Tree结构，讲清"为什么联合索引跳过中间列就失效"

### Day 5 — 事务与锁
- MVCC（Undo Log版本链、ReadView、RC vs RR）
- ACID与隔离级别（脏读/不可重复读/幻读）
- 锁（Record/Gap/Next-Key Lock、死锁wait-for graph）
- **输出**：能讲清"RR如何通过Next-Key Lock解决幻读"

### Day 6 — 优化与日志
- EXPLAIN（type/rows/Extra/key_len解读）
- 慢查询优化（pt-query-digest + 优化策略）
- Redo Log vs Undo Log vs Binlog（WAL/两阶段提交）
- **输出**：拿到一条SQL能用EXPLAIN分析并说出优化方案

---

## 📅 Day 7-8: Redis（核心）

### Day 7 — 缓存三大问题
- 缓存穿透（布隆过滤器、空值缓存）
- 缓存击穿（互斥锁SetNX、逻辑过期）
- 缓存雪崩（TTL随机化、多级缓存、限流熔断）
- **输出**：能一口气串讲三种问题+解决方案，不被问倒

### Day 8 — 高可用与原理
- 持久化（RDB fork+COW vs AOF vs 混合持久化）
- 主从复制（全量/增量、PSYNC、replication buffer）
- 哨兵 vs Cluster（SDOWN/ODOWN、Leader选举、16384槽、Gossip）
- 分布式锁（SET NX PX + Lua、Redisson看门狗、RedLock争议）
- **输出**：能讲清"Redis挂了怎么办"的完整链路

---

## 📅 Day 9: Linux + MQ

- Linux排查三板斧（top看系统→ps看进程→tail|grep|awk查日志）
- 网络诊断（netstat/ss连接状态、TIME_WAIT、CLOSE_WAIT泄漏）
- MQ核心四问（重复消费/消息丢失/幂等性/消息积压）
- **输出**：能模拟一个线上故障排查全流程

---

## 📅 Day 10-11: Docker/K8s/CI-CD（加分项）

### Day 10 — Docker
- Dockerfile最佳实践（多阶段构建、缓存利用）
- 镜像分层（UnionFS、COW）
- 容器本质（Namespace+Cgroup、PID 1问题）

### Day 11 — K8s + CI/CD
- Pod/Deployment/Service/Ingress 四件套
- CI/CD流水线（提交→测试→构建→镜像→部署）

---

## 📅 Day 12-13: 系统设计（加分项）

### Day 12 — 高并发场景
- 秒杀系统（CDN→Nginx→Redis→MQ→DB层层削峰）
- 排行榜系统（Redis Sorted Set + 分段 + 近似排名）

### Day 13 — 通信与支付
- IM系统（长连接/心跳/可靠投递/离线消息）
- 支付系统（幂等/对账/分布式事务/资金安全）

---

## 📅 Day 14: AI 工程包装 + 全面回顾

- AI工程表达（从"我会用AI"升级为工程化表达）
- 全部47个主题快速过一遍（只看"一句话结论"+追问树根节点）
- 标记薄弱点重点强化

---

## 📅 Day 15: 全真模拟面试

- 随机抽取5-8个主题
- 完整面试流程（提问→回答→追问→压力测试）
- 每轮打分：结构清晰度/技术深度/表达稳定性
- 最终查漏补缺

---

## 📋 每日记录模板

```
## Day X — YYYY-MM-DD — [主题名称]

### ✅ 今天掌握的
- 

### ⚠️ 还卡壳的
- 

### 🔥 追问薄弱点
- 

### 📝 一句话收获
- 
```

---

## 🎖️ 14天后你应该是这样回答的

**面试官**："Redis为什么快？"

**你（0.5秒后）**：
> "Redis高性能有四大支柱。第一纯内存操作，纳秒级访问；第二单线程模型避免锁竞争和上下文切换；第三IO多路复用epoll处理海量并发连接；第四高效数据结构如SDS/ziplist/skiplist。Redis 6.0后引入了多线程网络IO但命令执行仍是单线程。不过单线程也有代价——BigKey操作会阻塞，所以生产上要避免。"

用时：35-40秒，结构清晰，有深度有边界。

---

*打开 `index.html` 开始训练吧 🧧*
