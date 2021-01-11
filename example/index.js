import Per from '../dist/index'

new Per({
  tracker: (type, data, allData) => {
    console.log('type: ', type)
    console.log(`${type} data: `, data)
    console.log('allData: ', allData)
  },
})
