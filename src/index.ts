import { isSupportPerformance } from './utils'
import { log, logIndicator } from './log'
import { getNavigationTime, getNetworkInfo, getPaintTime } from './indicator'

export default class Per {
  constructor() {
    if (!isSupportPerformance) {
      log('该浏览器不支持 Performance API')
      return
    }
    logIndicator('Navigation Time', getNavigationTime())
    logIndicator('Network Info', getNetworkInfo())
    logIndicator('Paint Time', getPaintTime())
  }
}
