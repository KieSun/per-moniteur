import { IPerProps } from './types'
import { isDev } from './utils'

export const config: IPerProps = {
  tracker: () => {},
  log: isDev(),
}
