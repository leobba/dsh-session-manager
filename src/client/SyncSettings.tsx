/**
 * 设置页会话管理组件：导入其他 agent 会话 + 删除 dsh 本地副本。
 */
import { useEffect, useMemo, useState, type ReactElement } from 'react'
import type { SyncSettingsActions } from './index.ts'

export interface SyncSettingsProps extends SyncSettingsActions {
  close: () => void
}

interface CatalogItem {
  source: string
  id: string
  title: string
  cwd: string
  createdAt: number
  messageCount: number
  imported: boolean
}

interface ImportedItem {
  id: string
  title: string
  cwd: string
  createdAt: number
}

const SOURCE_LABELS: Record<string, string> = {
  pi: 'pi',
  opencode: 'opencode',
  codex: 'codex',
  'claude-code': 'claude-code',
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    maxWidth: '920px',
    padding: '16px 20px 24px',
    color: 'var(--dsw-text, #222)',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    background: 'var(--dsw-surface-raised, var(--dsw-surface-subtle, #f0f0f0))',
    borderRadius: '8px',
    width: 'fit-content' as const,
  },
  tab: {
    padding: '6px 14px',
    border: 'none',
    borderRadius: '6px',
    background: 'transparent',
    color: 'var(--dsw-text-secondary, #666)',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '13px',
  } as const,
  tabActive: {
    background: 'var(--dsw-surface, #fff)',
    color: 'var(--dsw-text, #222)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  } as const,
  group: {
    border: '1px solid var(--dsw-border-subtle, #e5e5e5)',
    borderRadius: '8px',
    overflow: 'hidden' as const,
    background: 'var(--dsw-surface, #fff)',
  },
  groupHeader: {
    padding: '10px 16px',
    background: 'var(--dsw-surface-subtle, #f7f7f7)',
    fontWeight: 600,
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  list: {
    maxHeight: '320px',
    overflow: 'auto' as const,
  },
  item: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '10px',
    padding: '10px 16px',
    borderTop: '1px solid var(--dsw-border-subtle, #efefef)',
  },
  meta: {
    fontSize: '12px',
    color: 'var(--dsw-text-secondary, #777)',
  },
  badge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '999px',
    background: 'var(--dsw-surface-subtle, #eee)',
    color: 'var(--dsw-text-secondary, #666)',
    whiteSpace: 'nowrap' as const,
  },
  actionRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center' as const,
  } as const,
  button: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--dsw-border-subtle, #d0d0d0)',
    background: 'var(--dsw-surface-raised, #fafafa)',
    color: 'var(--dsw-text, #333)',
    cursor: 'pointer',
    fontSize: '13px',
  } as const,
  primary: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--dsw-border-accent, #4a90d9)',
    background: 'var(--dsw-surface-accent, #4a90d9)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
  } as const,
  danger: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--dsw-border-danger, #d32f2f)',
    background: 'var(--dsw-surface-danger, #d32f2f)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
  } as const,
  result: {
    whiteSpace: 'pre-wrap' as const,
    fontSize: '12px',
    color: 'var(--dsw-text-secondary, #666)',
    maxHeight: '200px',
    overflow: 'auto' as const,
    padding: '10px 12px',
    border: '1px solid var(--dsw-border-subtle, #eee)',
    borderRadius: '6px',
    background: 'var(--dsw-surface-subtle, #fafafa)',
  },
  note: {
    fontSize: '12px',
    color: 'var(--dsw-text-secondary, #777)',
    lineHeight: '1.6',
  },
}

function parseJson<T>(text: string): T[] {
  try {
    const data = JSON.parse(text) as T[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function SyncSettings({ close, loadCatalog, importSelected, listImported, deleteSelected }: SyncSettingsProps): ReactElement {
  const [tab, setTab] = useState<'import' | 'delete'>('import')
  const [items, setItems] = useState<CatalogItem[]>([])
  const [imported, setImported] = useState<ImportedItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [selectedImported, setSelectedImported] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const refresh = async (): Promise<void> => {
    setLoading(true)
    setResult('')
    try {
      const catalog = await loadCatalog()
      const importedResult = await listImported()
      setItems(catalog.ok ? parseJson<CatalogItem>(catalog.text) : [])
      setImported(importedResult.ok ? parseJson<ImportedItem>(importedResult.text) : [])
      if (!catalog.ok) setResult(catalog.text)
      else if (!importedResult.ok) setResult(importedResult.text)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  const groups = useMemo(() => {
    const map = new Map<string, CatalogItem[]>()
    for (const item of items) {
      const list = map.get(item.source) ?? []
      list.push(item)
      map.set(item.source, list)
    }
    return [...map.entries()]
  }, [items])

  const toggle = (id: string): void => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const toggleImported = (id: string): void => {
    const next = new Set(selectedImported)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedImported(next)
  }

  const toggleGroup = (source: string, all: boolean): void => {
    const sourceIds = items.filter(item => item.source === source).map(item => item.id)
    const next = new Set(selected)
    if (all) {
      for (const id of sourceIds) next.add(id)
    } else {
      for (const id of sourceIds) next.delete(id)
    }
    setSelected(next)
  }

  const doImport = async (): Promise<void> => {
    if (selected.size === 0) return
    setLoading(true)
    setResult('')
    try {
      const outcome = await importSelected([...selected])
      setResult(outcome.text)
      setSelected(new Set())
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  const doDeleteSelected = async (): Promise<void> => {
    if (selectedImported.size === 0) return
    setLoading(true)
    setResult('')
    try {
      const outcome = await deleteSelected([...selectedImported])
      setResult(outcome.text)
      setSelectedImported(new Set())
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  const doDeleteAll = async (): Promise<void> => {
    if (imported.length === 0) return
    setLoading(true)
    setResult('')
    try {
      const outcome = await deleteSelected(imported.map(item => item.id))
      setResult(outcome.text)
      setSelectedImported(new Set())
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong>会话管理</strong>
          <div style={styles.note}>导入其他 agent 的历史会话，或删除 dsh 中的本地副本。</div>
        </div>
        <div style={styles.actionRow}>
          <button style={styles.button} onClick={() => void refresh()} disabled={loading}>刷新</button>
          <button style={styles.button} onClick={close}>关闭</button>
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...(tab === 'import' ? styles.tabActive : {}) }} onClick={() => setTab('import')}>
          导入
        </button>
        <button style={{ ...styles.tab, ...(tab === 'delete' ? styles.tabActive : {}) }} onClick={() => setTab('delete')}>
          删除
        </button>
      </div>

      {loading && <div style={styles.meta}>加载中…</div>}
      {result && <pre style={styles.result}>{result}</pre>}

      {tab === 'import' && (
        <>
          <div style={styles.note}>
            自动跳过已导入会话；再次导入不会重复创建 id，可选择新增会话后同步到 dsh。
          </div>
          <div style={styles.actionRow}>
            <button style={styles.primary} onClick={() => void doImport()} disabled={loading || selected.size === 0}>
              导入选中 ({selected.size})
            </button>
          </div>
          {items.length === 0 && !loading && <div style={styles.meta}>没有发现可导入的会话。</div>}
          {groups.map(([source, list]) => {
            const allSelected = list.every(item => selected.has(item.id))
            const anySelected = list.some(item => selected.has(item.id))
            return (
              <section key={source} style={styles.group}>
                <div style={styles.groupHeader}>
                  <span>{SOURCE_LABELS[source] ?? source} ({list.length})</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12 }}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = !allSelected && anySelected }}
                      onChange={() => toggleGroup(source, !allSelected)}
                    />
                    全选
                  </label>
                </div>
                <div style={styles.list}>
                  {list.map(item => (
                    <label key={item.id} style={styles.item}>
                      <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggle(item.id)} />
                      <div style={{ minWidth: 0 }}>
                        <div>{item.title || item.id}</div>
                        <div style={styles.meta}>
                          {item.id} · {item.cwd || '(无目录)'} · {item.messageCount} 条消息
                        </div>
                      </div>
                      {item.imported && <span style={styles.badge}>已导入</span>}
                    </label>
                  ))}
                </div>
              </section>
            )
          })}
        </>
      )}

      {tab === 'delete' && (
        <>
          <div style={styles.note}>
            这里删除的只是 dsh 中导入的副本，不会影响原 agent（opencode / codex / claude）里的会话记录。
          </div>
          <div style={styles.actionRow}>
            <button style={styles.danger} onClick={() => void doDeleteSelected()} disabled={loading || selectedImported.size === 0}>
              删除选中 ({selectedImported.size})
            </button>
            <button style={styles.danger} onClick={() => void doDeleteAll()} disabled={loading || imported.length === 0}>
              删除全部已导入
            </button>
          </div>
          {imported.length === 0 && !loading && <div style={styles.meta}>当前没有已导入的本地会话副本。</div>}
          <div style={styles.group}>
            <div style={styles.groupHeader}>
              <span>已导入到 dsh ({imported.length})</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12 }}>
                <input
                  type="checkbox"
                  checked={imported.length > 0 && selectedImported.size === imported.length}
                  ref={(el) => {
                    if (el) el.indeterminate = selectedImported.size > 0 && selectedImported.size < imported.length
                  }}
                  onChange={() => {
                    if (selectedImported.size === imported.length) setSelectedImported(new Set())
                    else setSelectedImported(new Set(imported.map(item => item.id)))
                  }}
                />
                全选
              </label>
            </div>
            <div style={styles.list}>
              {imported.map(item => (
                <label key={item.id} style={styles.item}>
                  <input type="checkbox" checked={selectedImported.has(item.id)} onChange={() => toggleImported(item.id)} />
                  <div style={{ minWidth: 0 }}>
                    <div>{item.title || item.id}</div>
                    <div style={styles.meta}>{item.id} · {item.cwd || '(无目录)'}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}