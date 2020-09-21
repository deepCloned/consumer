import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
  /**
   * 测试路由
   */
  // {
  //   path: '/coupon',
  //   component: Layout,
  //   hidden: true,
  //   redirect: '/coupon/list',
  //   children: [
  //     {
  //       path: 'list',
  //       component: (resolve) => require(['@/views/coupon/list/index'], resolve),
  //       name: 'CouponList',
  //       meta: { title: '礼券发放列表' }
  //     },
  //     {
  //       path: 'label',
  //       component: (resolve) => require(['@/views/coupon/label/index'], resolve),
  //       name: 'Label',
  //       meta: { title: '顾客标签设定' }
  //     },
  //     {
  //       path: 'setting',
  //       component: (resolve) => require(['@/views/coupon/setting/index'], resolve),
  //       name: 'CouponSetting',
  //       meta: { title: '礼券发放设定' }
  //     },
  //     {
  //       path: 'type',
  //       component: (resolve) => require(['@/views/coupon/type/index'], resolve),
  //       name: 'CouponType',
  //       meta: { title: '礼券类型设定' }
  //     },
  //     {
  //       path: 'typelist',
  //       component: (resolve) => require(['@/views/coupon/typeList/index'], resolve),
  //       name: 'CouponList',
  //       meta: { title: '礼券类型列表' }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
