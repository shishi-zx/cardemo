import Mock from 'mockjs'
const BASE_URL = '/api'
//0模拟管理员登录请求
Mock.mock(BASE_URL+'/admin/login','post',(params) => {
    const req = JSON.parse(params.body)
    if(req.admin=='admin'&&req.password=='admin123'){
        return {
            code:1,
            message:'登录成功',
            data: {
                admin: '礻礻',
                password: 'admin123'
            }
        }
    }
    return {
        code:1,
        message:'密码错误，登录失败',
        data: null
    }
})
//1模拟请求全部职工数据
Mock.mock(BASE_URL+'/admin/allworks', 'get', {
    code: 1,
    message:'succ',
    'data|86': [
        {
            id: '@increment(1)',
            name: '@cname',
            sex: '@natural(0,1)',
            age: '@natural(19,37)',
            'position|1': ['洗车工','搬运工','组装工','技术人员'],
            salary: '@natural(1,20)000',
            join_time: '@date("yyyy-MM-dd")'
        },
    ]
})
//2模拟请求全部组件数据
Mock.mock(BASE_URL+'/admin/allcarparts', 'get', {
    code: 1,
    message:'succ',
    'data|200': [
        {
            id: '@increment(1)',
            'type|1': ['发动机配件','传动系配件','制动系配件','电器仪表系配件','汽车灯具','安全防盗','汽车外饰','影音电器','化工护理','车身及附件'],
            modelString: '@string(5)',
            price: '@natural(1,20)000',
        },
    ]
})
//3模拟请求全部车辆数据
Mock.mock(BASE_URL+'/admin/allcars', 'get', {
    code: 1,
    message:'succ',
    'data|36': [
        {
            id: '@increment(1)',
            'type|1': ['大众','长安','玛莎'],
            modelString: '@string(5)',
            'size|1':['S','M','L'],
            price: '@natural(1,20)000',
        },
    ]
})
//4模拟请求全部订单数据
Mock.mock(BASE_URL+'/admin/allorders', 'get', {
    code: 1,
    message:'succ',
    'data|16': [
        {
            id: '@increment(1)',
            'type|+1': ['买进组件','卖出车辆'],
            'good|+1': ['某组件','某汽车'],
            goodNum: '@natural(1,6)',
            price: '@natural(1,20)000',
            state: '@natural(0,1)',
        },
    ]
})
//5模拟请求添加员工
Mock.mock(BASE_URL+'/admin/addwork', 'post', (params) => {
    const req = JSON.parse(params.body)
    const {name,
        sex,
        age,
        position,
        salary} = req
    return Mock.mock({
        code: 1,
        message:'添加成功',
        'data': null
    })

})
//6模拟请求删除员工
Mock.mock(BASE_URL+'/admin/delwork', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'删除成功',
        data: null
    })

})
//7模拟请求更新员工
Mock.mock(BASE_URL+'/admin/upwork', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'更新成功',
        data: null
    })

})
//8模拟请求组装车辆
Mock.mock(BASE_URL+'/admin/inscar', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'组装成功',
        data: null
    })
})
// 9模拟请求删除订单
Mock.mock(BASE_URL+'/admin/delorder', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'删除订单成功',
        data: null
    })
})
// 10模拟请求确认完成订单
Mock.mock(BASE_URL+'/admin/confirmorder', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'确认订单成功',
        data: null
    })
})
//11 模拟请求添加汽车售出订单
Mock.mock(BASE_URL+'/admin/addcarorder', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'添加汽车售出订单成功',
        data: null
    })
})
//12 模拟请求添加组件买进订单
Mock.mock(BASE_URL+'/admin/addpartorder', 'post', (params) => {
    const req = JSON.parse(params.body)
    return Mock.mock({
        code: 1,
        message:'添加组件买进订单成功',
        data: null
    })
})
//13 模拟职工登录
Mock.mock(BASE_URL+'/worker/login','post',(params) => {
    const req = JSON.parse(params.body)
    if(req.name=='admin'&&req.password=='admin'){
        return {
            code:1,
            message:'登录成功',
            data: {
                id: "1",
                name: "路飞",
                password: 'admin',
                sex: '0',
                age: "21",
                position: "搬运工",
                salary: '20000',
                join_time: Date.now()
            }
        }
    }
    return {
        code:1,
        message:'密码错误，登录失败',
        data: null
    }
})
