export type IPerCallback = (entries: any[]) => void

export interface IPerProps {
  tracker: (type: IPerType, data: any, allData: any) => void
}

export type IPerData = Object | number

export type IPerType =
  | 'navigationTime'
  | 'networkInfo'
  | 'paintTime'
  | 'lcp'
  | 'cls'
  | 'fid'
  | 'tbt'
