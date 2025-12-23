---
description: 脚本版本管理规则
---

# 脚本版本管理规则

## ⚠️ 核心原则

**永远不要覆盖已有版本。每个版本都要独立保存。**

## 文件命名规则

```
scripts/
├── capital-stories-02-chu-shijian-v1.md  # v1.0
├── capital-stories-02-chu-shijian-v2.md  # v2.0
├── capital-stories-02-chu-shijian-v3.md  # v3.0
├── capital-stories-02-chu-shijian-v4.md  # v4.0（当前）
└── capital-stories-02-chu-shijian.md     # 最终确认版（复制自确认的版本）
```

## 操作流程

### 创建新版本时

1. 不要覆盖原文件
2. 创建新文件：`xxx-vN.md`
3. 在版本历史中记录

### 确认版本时

1. 用户说"确认"后
2. 将该版本复制到无版本号文件
3. 更新版本历史状态

## 版本历史文件

位置：`archives/script-versions/`

每个脚本一个版本历史文件，记录：

- 每个版本的创建时间
- 版本说明
- 状态（草稿/待确认/已确认/弃用）
