# dsh-session-manager

一个 DeepSeek Harness（dsh）插件，用于导入和管理 **pi / opencode / codex / claude-code** 的 agent 会话。

它在 dsh 设置中新增 **会话管理** 页面，可以可视化选择要导入的会话，以及删除 dsh 本地副本。

## 功能

- **会话管理设置页** — 界面贴近 dsh 原生设置风格。
- **可视化导入** — 按 agent 来源分组展示会话，勾选后只导入选中的会话。
- **同步/刷新** — 始终显示最新会话列表，已导入会话自动跳过。
- **只删除 dsh 本地副本** — 支持单独删除、批量删除、删除全部已导入。
  - 删除不会影响原 agent（opencode / codex / claude / pi）中的会话记录。
- **无缝切换会话** — 导入后就是普通 dsh 会话，可直接继续对话，完整保留上下文。
- **工作区归位** — 导入会话自动挂到匹配的 dsh 工作区。

## 安装

npm 发布后：

```sh
dsh plugin --profile web add dsh-session-manager
```

从 GitHub 安装：

```sh
dsh plugin --profile web add github:leobba/dsh-session-manager
```

从本地源码安装：

```sh
cd dsh-session-manager
dsh plugin --profile web add .
```

重启并刷新：

```sh
dsh web
```

## 从源码构建

```sh
pnpm install
pnpm run build
```

## 命令

| 命令 | 说明 |
| --- | --- |
| `/import-pi` | 导入 pi 会话 |
| `/import-opencode` | 导入 opencode 会话 |
| `/import-codex` | 导入 codex 会话 |
| `/import-claude-code` | 导入 claude-code 会话 |
| `/import-catalog` | 列出所有可导入会话（按来源分组，JSON） |
| `/import-selected` | 只导入选中会话（`--ids oc-xxx,codex-yyy`） |
| `/list-imported` | 列出 dsh 本地已导入会话副本（JSON） |
| `/remove-sessions` | 只删除 dsh 本地副本（`--ids ...`） |
| `/attach-workspaces` | 重新挂载导入会话到匹配工作区 |

## 致谢

本插件基于 [Chang-Tong/dsh-import-agents](https://github.com/Chang-Tong/dsh-import-agents) 二次开发。

解析器、消息转换、DSH writer、agent/skills 处理以及基础导入流程来自原项目，特别感谢原作者。

## 许可证

MIT