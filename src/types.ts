export interface INavigationTimeProps {
  redirect: {
    count: number
    time: number
  }
  appCache: number
  // dns lookup time
  dnsTime: number
  // handshake end - handshake start time
  TCP: number
  // HTTP head size
  headSize: number
  responseTime: number
  // Time to First Byte
  TTFB: number
  // fetch resource time
  fetchTime: number
  // Service work response time
  workerTime: number
  domReady: number
  // time to interactive
  tti: number
  // DOMContentLoaded time
  DCL: number
}
