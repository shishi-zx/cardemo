/* 
包含n个接口请求函数的模块
返回值 promise对象
*/
import ajax from './ajax'
const BASE_URL = '/api'
export const reqAdminLogin = (data) => ajax(BASE_URL+'/admin/login',data,'POST')
//获取所有职工对象数据
export const reqAllWorks = () => ajax(BASE_URL+`/admin/allworks`)
//获取所有组件信息
export const reqAllCarParts = () => ajax(BASE_URL+`/admin/allcarparts`)
//获取所有车辆信息
export const reqAllCars = () => ajax(BASE_URL+`/admin/allcars`)
//获取所有订单信息
export const reqAllOrders = () => ajax(BASE_URL+`/admin/allorders`)
//提交添加员工表单
export const reqAddWork = (data) => ajax(BASE_URL+`/admin/addwork`, data, 'POST')
//提交删除员工请求
export const reqDelWork = (data) => ajax(BASE_URL+`/admin/delwork`, data, 'POST')
//提交更新员工请求
export const reqUpWork = (data) => ajax(BASE_URL+`/admin/upwork`, data, 'POST')
//提交组装车辆请求
export const reqInsCar = (data) => ajax(BASE_URL+`/admin/inscar`, data, 'POST')
//提交删除订单请求
export const reqDelOrder = (data) => ajax(BASE_URL+`/admin/delorder`, data, 'POST')
//提交确认订单订单请求
export const reqConfirmOrder = (data) => ajax(BASE_URL+`/admin/confirmorder`, data, 'POST')
//提交添加汽车售出订单请求
export const reqAddCarOrder = (data) => ajax(BASE_URL+`/admin/addcarorder`, data, 'POST')
//提交添加组件买进订单请求
export const reqAddPartOrder = (data) => ajax(BASE_URL+`/admin/addpartorder`, data, 'POST')
