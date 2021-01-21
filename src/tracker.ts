import { config } from './config'
import { IPerData, IPerDataType } from './types'

const allData: Partial<Record<IPerDataType, IPerData>> = {}

const typeMap: Record<string, IPerDataType> = {
  'Navigation Time': 'navigationTime',
  'Network Info': 'networkInfo',
  FCP: 'fcp',
  FP: 'fp',
  'LCP Update': 'lcp',
  'CLS Update': 'cls',
  TBT: 'tbt',
  FID: 'fid',
  TTI: 'tti',
}

export default (type: string, data: IPerData) => {
  const currentType = typeMap[type]
  allData[currentType] = data
  config.tracker && config.tracker(currentType, data, allData)
}
