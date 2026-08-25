> **English** | [简体中文](README.zh.md)

# dsh-session-manager

A DeepSeek Harness (dsh) plugin that imports and manages agent sessions from **pi**, **opencode**, **codex**, and **claude-code**.

It adds a **Session Manager** page in dsh settings, letting you visually select which sessions to import and which dsh-local copies to delete.

## Features

- **Session Manager settings page** — clean UI consistent with dsh native settings style.
- **Visual import** — sessions are grouped by agent source; check the ones you want and import only those.
- **Sync/refresh** — always shows the latest session list; already-imported sessions are automatically skipped.
- **Delete local copies only** — single delete, batch delete, or delete all imported dsh copies.
  - Deleting never touches the original agent sessions (opencode / codex / claude / pi).
- **Seamless switching** — imported sessions are normal dsh sessions, so you can continue conversations with full context.
- **Workspace grouping** — imported sessions are attached to matching dsh workspaces.

## Installation

From npm (when published):

```sh
dsh plugin --profile web add dsh-session-manager
```

From this repository (GitHub):

```sh
dsh plugin --profile web add github:leobba/dsh-session-manager
```

From local checkout:

```sh
cd dsh-session-manager
dsh plugin --profile web add .
```

Then restart dsh web and refresh the browser:

```sh
dsh web
```

## Build from source

```sh
pnpm install
pnpm run build
```

## Commands

| Command | Description |
| --- | --- |
| `/import-pi` | Import pi sessions |
| `/import-opencode` | Import opencode sessions |
| `/import-codex` | Import codex sessions |
| `/import-claude-code` | Import claude-code sessions |
| `/import-catalog` | List all importable sessions grouped by source (JSON) |
| `/import-selected` | Import only selected session ids (`--ids oc-xxx,codex-yyy`) |
| `/list-imported` | List dsh-local imported session copies (JSON) |
| `/remove-sessions` | Delete dsh-local copies only (`--ids ...`) |
| `/attach-workspaces` | Re-attach imported sessions to matching workspaces |

## Credits

This plugin is a fork / extension of [Chang-Tong/dsh-import-agents](https://github.com/Chang-Tong/dsh-import-agents).

The parsers, message conversion, DSH writer, agent/skill handling, and base import flow come from the original project. Thanks to the original author.

## License

MIT