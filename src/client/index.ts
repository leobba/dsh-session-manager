/**
 * 会话管理插件（浏览器侧）。
 *
 * 注册到设置页的 `settings.section` slot，提供“会话管理”页面：
 *   导入其他 agent 的历史会话、删除 dsh 本地副本。
 * 不再往 composer 输入框挂“同步”按钮。
 */
import type { ClientContext, SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import type { InputZone } from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: pulls the slot registry's Context merge (ctx.slots) into this program.
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import { SyncSettings, type SyncSettingsActions } from './SyncSettings.tsx'

/** 设置页会话管理动作面：导入 + 删除。 */
export interface SyncSettingsActions {
  loadCatalog: () => Promise<{ ok: boolean; text: string }>
  importSelected: (ids: string[]) => Promise<{ ok: boolean; text: string }>
  listImported: () => Promise<{ ok: boolean; text: string }>
  deleteSelected: (ids: string[]) => Promise<{ ok: boolean; text: string }>
}

/** 本插件的 client 条目名（也用作 slot 注册条目名）。 */
export const name = 'dsh-session-manager'

/** 需要 slot 注册表与远程命令调用面（ctx.remote.commands.execute）。
 * `remote` 与 `remote.commands` 都要声明：Cordis 代理按注入面放行属性访问。 */
export const inject = ['slots', 'remote', 'remote.commands', 'sessions']

/**
 * Client plugin body: 注册设置页会话管理页面。
 */
export function apply(ctx: ClientContext): void {
  const executeCommand = async (line: string): Promise<{ ok: boolean; text: string }> => {
    const sessionId = (ctx as any).sessions?.list?.getSnapshot?.()?.current as SessionId | undefined
    if (sessionId === undefined) {
      return { ok: false, text: '当前没有打开会话，请先打开一个会话再同步' }
    }
    const result = await ctx.remote.commands.execute(sessionId, line, [])
    if (!result.ok) {
      return { ok: false, text: `${result.error.code}: ${result.error.message}` }
    }
    if (result.value === undefined) {
      return { ok: true, text: '命令未找到' }
    }
    const outcome = result.value.result
    return { ok: outcome.kind === 'success', text: outcome.text ?? '完成' }
  }


  ctx.slots.inject('settings.section', () => ctx.slots.register(
    {
      name: 'settings.section',
      id: 'dsh-import-sync',
      order: 50,
      label: () => /^zh\b/u.test(navigator.language ?? '') ? '会话管理' : 'Session Manager',
      inject: (): SyncSettingsActions => ({
        loadCatalog: async () => executeCommand('/import-catalog'),
        importSelected: async (ids: string[]) => {
          if (ids.length === 0) return { ok: false, text: '没有选择任何会话' }
          return executeCommand(`/import-selected --ids ${ids.join(',')}`)
        },
        listImported: async () => executeCommand('/list-imported'),
        deleteSelected: async (ids: string[]) => {
          if (ids.length === 0) return { ok: false, text: '没有选择任何会话' }
          return executeCommand(`/remove-sessions --ids ${ids.join(',')}`)
        },
      }),
    },
    SyncSettings,
  ))
}
