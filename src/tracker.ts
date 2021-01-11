import { config } from './config'
import { IPerData } from './types'

const allData: { [key: string]: IPerData } = {}

const typeMap: { [key: string]: string } = {
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
  config.tracker(currentType, data, allData)
}
