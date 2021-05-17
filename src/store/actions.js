/* 
通过 mutation 间接更新 state 的多个方法的对象
*/
import {
    RECEIVE_ADMINUSER,
    RECEIVE_WORKERUSER,
    RECEIVE_WORKS,
    RECEIVE_CARPARTS,
    RECEIVE_CARS,
    RECEIVE_ORDERS
} from './mutation-types'
import {
    reqAllWorks, 
    reqAllCarParts,
    reqAllCars,
    reqAllOrders
} from '../api'

export default { 
    //管理员登录
    async setAdminUser({commit},adminuser) {
        commit(RECEIVE_ADMINUSER,{adminuser})
    },
    //职工登录
    async setWorkerUser({commit},workeruser) {
        commit(RECEIVE_WORKERUSER,{workeruser})
    },
    //异步获取所有职工信息
    async getAllWorks({commit}) {
        //发送异步 Ajax 请求
        const result = await reqAllWorks()
        if(result.code == 1){
            const works = result.data
            commit(RECEIVE_WORKS,{works})
        }
    },

     //异步获取所有组件信息
     async getAllCarParts({commit}) {
        //发送异步 Ajax 请求
        const result = await reqAllCarParts()
        if(result.code == 1){
            const carparts = result.data
            commit(RECEIVE_CARPARTS,{carparts})
        }
    },

     //异步获取所有车辆信息
     async getAllCars({commit}) {
        //发送异步 Ajax 请求
        const result = await reqAllCars()
        if(result.code == 1){
            const cars = result.data
            commit(RECEIVE_CARS,{cars})
        }
    },

     //异步获取所有订单信息
     async getAllOrders({commit}) {
        //发送异步 Ajax 请求
        const result = await reqAllOrders()
        if(result.code == 1){
            const orders = result.data
            commit(RECEIVE_ORDERS,{orders})
        }
    }
}