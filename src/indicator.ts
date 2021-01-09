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
        domInteractive,
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
        // time to interactive
        tti: domInteractive - fetchStart,
        // DOMContentLoaded time
        DCL: domContentLoadedEventEnd - domContentLoadedEventStart,
      }
    }
  }
}
