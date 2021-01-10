import { isSupportPerformance } from './utils'
import { log } from './log'
import { getNavigationTime, getNetworkInfo, getPaintTime } from './indicator'

export default class Per {
  constructor() {
    if (!isSupportPerformance) {
      log('该浏览器不支持 Performance API')
      return
    }
    log(getNavigationTime())
    log(getNetworkInfo())
    log(getPaintTime())
  }
}
