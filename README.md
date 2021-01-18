# per-moniteur

一个方便获取各类性能指标及 Web Vitals 的库。

## 安装

```bash
npm install per-moniteur --save
```

## 使用

```js
import PerMoniteur from 'per-moniteur';

new PerMoniteur({
  tracker: (type, data, allData) => {
    console.log('type: ', type)
    console.log(`${type} data: `, data)
    console.log('allData: ', allData)
  },
})
```

## 能获取的数据指标

- NavigationTime
- NetworkInfo
- FP
- FCP
- FID
- TBT
- LCP
- CLS
- Web Vitals Score

## License

MIT © yck.