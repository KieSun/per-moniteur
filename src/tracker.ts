import { config } from './config'
import { IPerData, IPerType } from './types'

const allData: Partial<Record<IPerType, IPerData>> = {}

const typeMap: { [key: string]: IPerType } = {
  'Navigation Time': 'navigationTime',
  'Network Info': 'networkInfo',
  'Paint Time': 'paintTime',
  'LCP Update': 'lcp',
  'CLS Update': 'cls',
  FID: 'fid',
  TBT: 'tbt',
}

export default (type: string, data: IPerData) => {
  const currentType = typeMap[type]
  allData[currentType] = data
  config.tracker && config.tracker(currentType, data, allData)
}
