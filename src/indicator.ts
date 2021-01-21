import { getObserver, hiddenTime, getScore } from './utils'
import { logIndicator } from './log'
import ttiPolyfill from 'tti-polyfill'

let tbt = 0

export const getNavigationTime = () => {
  const navigation = window.performance.getEntriesByType('navigation')
  if (navigation.length > 0) {
    const timing = navigation[0] as PerformanceNavigationTiming
    if (timing) {
      const {
        domainLookupEnd,
        domainLookupStart,
        transferSize,
        encodedBodySize,
        connectEnd,
        connectStart,
        workerStart,
        redirectEnd,
        redirectStart,
        redirectCount,
        responseEnd,
        responseStart,
        fetchStart,
        domContentLoadedEventEnd,
        domContentLoadedEventStart,
        requestStart,
      } = timing

      return {
        redirect: {
          count: redirectCount,
          time: redirectEnd - redirectStart,
        },
        appCache: domainLookupStart - fetchStart,
        // dns lookup time
        dnsTime: domainLookupEnd - domainLookupStart,
        // handshake end - handshake start time
        TCP: connectEnd - connectStart,
        // HTTP head size
        headSize: transferSize - encodedBodySize || 0,
        responseTime: responseEnd - responseStart,
        // Time to First Byte
        TTFB: responseStart - requestStart,
        // fetch resource time
        fetchTime: responseEnd - fetchStart,
        // Service work response time
        workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
        domReady: domContentLoadedEventEnd - fetchStart,
        // DOMContentLoaded time
        DCL: domContentLoadedEventEnd - domContentLoadedEventStart,
      }
    }
  }
  return {}
}

export const getNetworkInfo = () => {
  if ('connection' in window.navigator) {
    const connection = window.navigator['connection'] || {}
    const { effectiveType, downlink, rtt, saveData } = connection
    return {
      effectiveType,
      downlink,
      // round-trip time
      rtt,
      saveData,
    }
  }
  return {}
}

export const getPaintTime = () => {
  getObserver('paint', (entries) => {
    entries.forEach((entry) => {
      const time = entry.startTime
      const name = entry.name
      if (name === 'first-contentful-paint') {
        getLongTask(time)
        logIndicator('FCP', {
          time,
          score: getScore('fcp', time),
        })
      } else {
        logIndicator('FP', {
          time,
        })
      }
    })
  })
}

export const getFID = () => {
  getObserver('first-input', (entries) => {
    entries.forEach((entry) => {
      if (entry.startTime < hiddenTime) {
        const time = entry.processingStart - entry.startTime
        logIndicator('FID', {
          time,
          score: getScore('fid', time),
        })
        // TBT is in fcp -> tti
        // This data may be inaccurate, because fid >= tti
        logIndicator('TBT', {
          time: tbt,
          score: getScore('tbt', tbt),
        })
      }
    })
  })
}

export const getLCP = () => {
  getObserver('largest-contentful-paint', (entries) => {
    entries.forEach((entry) => {
      if (entry.startTime < hiddenTime) {
        const { startTime, renderTime, size } = entry
        logIndicator('LCP Update', {
          time: renderTime | startTime,
          size,
          score: getScore('lcp', renderTime | startTime),
        })
      }
    })
  })
}

export const getCLS = () => {
  getObserver('layout-shift', (entries) => {
    let value = 0
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        value += entry.value
      }
    })
    logIndicator('CLS Update', {
      value,
      score: getScore('cls', value),
    })
  })
}

export const getLongTask = (fcp: number) => {
  window.__tti = { e: [] }
  getObserver('longtask', (entries) => {
    window.__tti.e = window.__tti.e.concat(entries)
    entries.forEach((entry) => {
      // get long task time in fcp -> tti
      if (entry.name !== 'self' || entry.startTime < fcp) {
        return
      }
      // long tasks mean time over 50ms
      const blockingTime = entry.duration - 50
      if (blockingTime > 0) tbt += blockingTime
    })
  })
}

export const getTTI = () => {
  ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
    logIndicator('TTI', {
      value: tti,
    })
  })
}
