import Per from '../dist/index'

const p = new Per({
  tracker: (type, data, allData) => {
    console.log('type: ', type)
    console.log(`${type} data: `, data)
    console.log('allData: ', allData)
  },
})

p.fmpStart()

p.markStart('test')
setTimeout(() => {
  p.markEnd('test')
  p.fmpEnd()
}, 2000)
