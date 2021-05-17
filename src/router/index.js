import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import AdminPage from '../pages/AdminPage'
import WorkerPage from '../pages/WorkerPage'
import Allworks from '../pages/admin_workspage/allworks'
import Addwork from '../pages/admin_workspage/addwork'
import Delwork from '../pages/admin_workspage/delwork'
import Updwork from '../pages/admin_workspage/updwork'
import Parts from '../pages/admin_partspage/parts'
import Cars from '../pages/admin_carpage/cars'
import Installcar from '../pages/admin_carpage/installcar'
import Carorder from '../pages/admin_order/carorder'
import Partorder from '../pages/admin_order/partorder'
import AllOrder from '../pages/admin_order/allorder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Login
    },
    {
      path:'/admin',
      name: '管理员界面',
      component: AdminPage,
      children: [
        {
          path: 'allworks',
          component: Allworks
        },
        {
          path: 'addwork',
          component: Addwork
        },
        {
          path: 'delwork',
          component: Delwork
        },
        {
          path: 'updwork',
          component: Updwork
        },
        {
          path: 'parts',
          component: Parts
        },
        {
          path: 'cars',
          component: Cars
        },
        {
          path: 'installcar',
          component: Installcar
        },
        {
          path: 'carorder',
          component: Carorder
        },
        {
          path: 'partorder',
          component: Partorder
        },
        {
          path: 'allorder',
          component: AllOrder
        },
      ]
    },
    {
      path:'/worker',
      name:"职工界面",
      component: WorkerPage,
    }
  ]
})
