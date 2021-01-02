import { isSupportPerformance } from './utils'
import { log } from './log'

export default class Per {
  constructor() {
    if (!isSupportPerformance) {
      log('该浏览器不支持 Performance API')
      return
    }
  }
}
