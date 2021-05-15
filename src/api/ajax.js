/* 
ajax请求函数模块
*/
import axios from 'axios'
export default function ajax (url, data={}, type='GET') {
    return new Promise( (resolve, reject) => {
        let promise
        if(type === 'GET'){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if(dataStr !== ''){
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            promise = axios.get(url)
        }else{
            promise = axios.post(url, data)
        }

        promise.then(response => {
            resolve(response.data)//请求成功直接返回想要的数据,简化外部调用
        }).catch(error => {
            reject(error)
        })
    })
}