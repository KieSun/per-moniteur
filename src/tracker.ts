import { config } from './config'
import { IPerData, IPerDataType } from './types'

const allData: Partial<Record<IPerDataType, IPerData>> = {}

const typeMap: Record<string, IPerDataType> = {
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
