import { IPerCallback } from './types'

export const isSupportPerformance = () => {
  const performance = window.performance
  return (
    performance &&
    !!performance.getEntriesByType &&
    !!performance.now &&
    !!performance.mark
  )
}

export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

export const getObserver = (type: string, cb: IPerCallback) => {
  const perfObserver = new PerformanceObserver((entryList) => {
    cb(entryList.getEntries())
  })
  perfObserver.observe({ type, buffered: true })
}
