export type IPerCallback = (entries: any[]) => void

export interface IPerCBProps {
  tracker?: (type: IPerDataType, data: any, allData: any) => void
  log?: boolean
}

export type IPerData = Object | number

export type IPerDataType =
  | 'navigationTime'
  | 'networkInfo'
  | 'fcp'
  | 'fp'
  | 'lcp'
  | 'cls'
  | 'fid'
  | 'tbt'
  | 'tti'
  | 'fmp'

export interface IPerProps {
  // performance mark
  markStart: (name: string) => void
  // performance mark and log measures
  markEnd: (startName: string, endName: string) => void
  // performance clearMarks
  clearMarks: (name?: string) => void
  // performance clearMeasures
  clearMeasures: (name?: string) => void
  // fmp start
  fmpStart: () => void
  // fmp end and log fmp measure
  fmpEnd: () => void
}
