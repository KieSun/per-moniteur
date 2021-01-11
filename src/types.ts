export type IPerCallback = (entries: any[]) => void

export interface IPerProps {
  tracker?: (type: IPerDataType, data: any, allData: any) => void
  log?: boolean
}

export type IPerData = Object | number

export type IPerDataType =
  | 'navigationTime'
  | 'networkInfo'
  | 'paintTime'
  | 'lcp'
  | 'cls'
  | 'fid'
  | 'tbt'
