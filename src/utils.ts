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

export let hiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity

export const scores: Record<string, number[]> = {
  fcp: [2000, 4000],
  lcp: [2500, 4500],
  fid: [100, 300],
  tbt: [300, 600],
  cls: [0.1, 0.25],
}

export const scoreLevel = ['good', 'needsImprovement', 'poor']

export const getScore = (type: string, data: number) => {
  const score = scores[type]
  for (let i = 0; i < score.length; i++) {
    if (data <= score[i]) return scoreLevel[i]
  }

  return scoreLevel[2]
}
