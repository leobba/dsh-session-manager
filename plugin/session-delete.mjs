/**
 * 删除已导入到 dsh 的对话副本（不影响原始 agent 的会话）。
 * 只删除 dsh 本地持久化产物，并清理 workspace 引用。
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { findExistingSession } from '../lib/dsh-writer.mjs'

/** dsh 会话存储根目录（默认 ~/.dsh/sessions）。 */
export function dshSessionsRoot() {
  const home = process.env.HOME ?? process.env.USERPROFILE ?? ''
  return process.env.DSH_HOME !== undefined
    ? join(process.env.DSH_HOME, 'sessions')
    : join(home, '.dsh', 'sessions')
}

/** 仅允许删除导入前缀的会话，避免误删原生 dsh 会话。 */
export function isImportedSessionId(id) {
  return /^(pi|oc|codex|claude)-/u.test(id)
}

/** 从 workspace.json 中移除指定会话 id，并写回（无 BOM）。 */
function removeFromWorkspaceJson(ids) {
  const root = dshSessionsRoot()
  const wsPath = join(root, '..', 'storages', 'workspace.json')
  if (!existsSync(wsPath)) return
  let ws
  try {
    ws = JSON.parse(readFileSync(wsPath, 'utf8'))
  } catch {
    return
  }
  const idSet = new Set(ids)
  const tables = ws?.tables ?? {}
  const workspaces = tables.workspaces ?? {}
  for (const key of Object.keys(workspaces)) {
    const workspace = workspaces[key]
    if (Array.isArray(workspace.sessionIds)) {
      workspace.sessionIds = workspace.sessionIds.filter(id => !idSet.has(id))
    }
  }
  if (Array.isArray(ws.global?.archivedSessionIds)) {
    ws.global.archivedSessionIds = ws.global.archivedSessionIds.filter(id => !idSet.has(id))
  }
  writeFileSync(wsPath, JSON.stringify(ws, null, 2), 'utf8')
}

/**
 * 删除一批已导入会话的 dsh 本地副本。
 * @param ids - 导入会话 id（oc-xxx / codex-xxx / claude-xxx / pi-xxx）
 * @returns 摘要行数组
 */
export function removeImportedSessions(ids) {
  const lines = []
  const root = dshSessionsRoot()
  if (!existsSync(root)) return ['[delete] result: 0, not-found 0, sessions root missing']

  const validIds = [...new Set(ids)].filter(isImportedSessionId)
  const deleted = []
  const notFound = []
  for (const id of validIds) {
    const dir = findExistingSession(root, id)
    if (dir === false || dir === undefined || !existsSync(dir)) {
      notFound.push(id)
      continue
    }
    try {
      rmSync(dir, { recursive: true, force: true })
      deleted.push(id)
      lines.push(`  [deleted] ${id}`)
    } catch (error) {
      lines.push(`  [failed] ${id}: ${error.message}`)
    }
  }
  if (deleted.length > 0) removeFromWorkspaceJson(deleted)
  lines.push(`[delete] result: deleted ${deleted.length}, not-found ${notFound.length}, failed ${lines.filter(l => l.includes('[failed]')).length}`)
  return lines
}

/** 列出所有已导入会话（从 persistence 读取 header，并读取标题事件）。 */
export async function listImportedForDelete(persistence) {
  const headers = await persistence.list()
  const items = []
  for (const header of headers) {
    if (!isImportedSessionId(header.id)) continue
    let title = ''
    try {
      const loaded = await persistence.load(header.id)
      const titleEvent = loaded?.events?.find(event => event.type === 'session/title')
      title = titleEvent?.data?.title ?? ''
    } catch {
      // 单个会话读取失败不影响整体列表
    }
    items.push({
      id: header.id,
      title,
      cwd: header.cwd ?? '',
      createdAt: header.createdAt ?? 0,
    })
  }
  return items
}

