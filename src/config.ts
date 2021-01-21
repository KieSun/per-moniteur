import { IPerCBProps } from './types'
import { isDev } from './utils'

export const config: IPerCBProps = {
  tracker: () => {},
  log: isDev(),
}
