import tracker from './tracker'
import { IPerData } from './types'
import { config } from './config'

export const log = (message?: any) => {
  if (!config.log) return
  console.log(
    `%cPer`,
    'background: #606060; color: white; padding: 1px 10px; border-radius: 3px;',
    message
  )
}

export const logIndicator = (type: string, data: IPerData, measure = false) => {
  !measure && tracker(type, data)
  if (!config.log) return
  console.log(
    `%cPer%c${type}`,
    'background: #606060; color: white; padding: 1px 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;',
    'background: #1475b2; color: white; padding: 1px 10px; border-top-right-radius: 3px;border-bottom-right-radius: 3px;',
    data
  )
}
