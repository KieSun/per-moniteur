import { isSupportPerformance } from './utils'
import { log, logIndicator } from './log'
import {
  getNavigationTime,
  getNetworkInfo,
  getPaintTime,
  getFID,
  getLCP,
  getCLS,
  getTTI,
} from './indicator'
import { hiddenTime } from './utils'
import { IPerProps } from './types'
import { config } from './config'

export default class Per {
  constructor(args: IPerProps) {
    config.tracker = args.tracker
    if (typeof args.log === 'boolean') config.log = args.log
    if (!isSupportPerformance) {
      log(`This browser doesn't support Performance API`)
      return
    }
    logIndicator('Navigation Time', getNavigationTime())
    logIndicator('Network Info', getNetworkInfo())
    getPaintTime()
    getFID()
    getLCP()
    getCLS()
    getTTI()

    // indicator not be measured when the page is loaded in a background tab
    document.addEventListener(
      'visibilitychange',
      (event) => {
        // @ts-ignore
        hiddenTime = Math.min(hiddenTime, event.timeStamp)
      },
      { once: true }
    )
  }
}
