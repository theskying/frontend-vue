import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Login from '@/components/Login'
import Register from '@/components/Register'

// 所有的子路由都在App.vue 下，App.vue是在外层的父路由
Vue.use(Router)

export default new Router({
  // routes存放的是路由数组，path要访问所创建页面的路径
  routes: [
    // 访问时，按照路由顺序进行，遇到同名，执行顺序靠前的路由
    {
      path: '/test',
      component: Test
    },
    {
      // 登陆即首页
      path: '/',
      name: 'Login',
      component: Login,
      // 嵌套 子路由，访问 127.0.0.1:8083/#/nest 可以得到结果
      children: [
        {path: '/test', component: Test}
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
