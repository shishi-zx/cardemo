/* 
直接更新 state 的多个方法的对象
*/
import {
    RECEIVE_ADMINUSER,
    RECEIVE_WORKS,
    RECEIVE_CARPARTS,
    RECEIVE_CARS,
    RECEIVE_ORDERS
} from './mutation-types'

export default {
    [RECEIVE_ADMINUSER] (state, {adminuser}) {
        state.adminuser = adminuser
    },
    [RECEIVE_WORKS] (state, {works}) {
        state.works = works
    },
    [RECEIVE_CARPARTS] (state, {carparts}) {
        state.carparts = carparts
    },
    [RECEIVE_CARS] (state, {cars}) {
        state.cars = cars
    },
    [RECEIVE_ORDERS] (state, {orders}) {
        state.orders = orders
    },
}