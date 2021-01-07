import { isDev } from './utils'

export const log = (message?: string) => {
  if (!isDev()) return
  console.log(
    `%cPer`,
    'background: #606060; color: white; padding: 1px 10px; border-radius: 3px;',
    message
  )
}
