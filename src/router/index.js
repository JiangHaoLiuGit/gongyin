import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页



Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'login',
    hidden: true //导航菜单忽略选项
  },
  {
    path: '',
    component: Layout, //应用布局页
    redirect: '/index',
    hidden: true,
  },
  {
    path: '/index',
    component: Layout, //应用布局页
    name: 'index',
    meta: {
      title: "首页", //导航菜单项标题
      icon: 'el-icon-s-home' //导航菜单图标
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        name: 'indexs',
        meta: {
          title: "首页",
          icon: 'el-icon-s-home',
          roles: ['admin', 'jerry']
        }
      }
    ]
  }
]

// 动态路由 communication
export const asyncRoutes = [
  
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/commodityBank',
    meta: {
      title: "商品管理",
      icon: 'el-icon-s-goods',
      hidden: false,
      id:'34'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/goods/add.vue'),
        name: 'add',
        meta: {
          title: "商品发布",
          icon: 'el-icon-s-goods',
          hidden: true,
          roles: ['admin', 'jerry'],
          id:'47',
          // keepAlive:true
        },
      },
      {
        path: 'update',
        component: () => import('@/views/goods/update.vue'),
        name: 'update',
        meta: {
          title: "商品编辑",
          icon: 'el-icon-s-goods',
          hidden: true,
          roles: ['admin', 'jerry'],
          id:'48',
        },
      },
      {
        path: 'goodsInfo',
        component: () => import('@/views/goods/goodsInfo.vue'),
        name: 'goodsInfo',
        meta: {
          title: "商品详情",
          icon: 'el-icon-s-goods',
          hidden: true,
          roles: ['admin', 'jerry'],
          id:'49'
        },
      },
      {
        path: 'commodityBank',
        component: () => import('@/views/goods/commodityBank.vue'),
        name: 'commodityBank',
        meta: {
          title: "仓库中商品",
          icon: 'el-icon-s-goods',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'45'
        },
      },
      {
        path: 'onSale',
        component: () => import('@/views/goods/onSale.vue'),
        name: 'onSale',
        meta: {
          title: "出售中商品",
          icon: 'el-icon-s-goods',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'43'
        }
      },
      
      // {
      //   path: 'freightTemplate',
      //   component: () => import('@/views/goods/freightTemplate.vue'),
      //   name: 'freightTemplate',
      //   meta: {
      //     title: "运费模板",
      //     icon: 'el-icon-s-goods',
      //     hidden: false,
      //     roles: ['admin', 'jerry'],
      //     id:'46'
      //   },
      // },
    ]
  }
  ,
  {
    path: '/order_',
    component: Layout,
    redirect: '/order_/orderList_p',
    meta: {
      title: "订单管理",
      icon: 'el-icon-s-claim',
      hidden: false,
      id:'53'
    },
    children: [
      {
        path: 'orderList_p',
        component: () => import('@/views/order_/orderList_p.vue'),
        name: 'orderList_p',
        meta: {
          title: "订单列表",
          icon: 'el-icon-s-claim',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'54'
        }
      },
      {
        path: 'refund',
        component: () => import('@/views/order_/refund.vue'),
        name: 'refund',
        meta: {
          title: "售后列表",
          icon: 'el-icon-s-claim',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'55'
        }
      },
      {
        path: 'orderInfo',
        component: () => import('@/views/order_/orderInfo.vue'),
        name: 'orderInfo',
        meta: {
          title: "订单详情",
          icon: 'el-icon-s-claim',
          hidden: true,
          roles: ['admin', 'jerry'],
        }
      },
      {
        path: 'refundInfo',
        component: () => import('@/views/order_/refundInfo.vue'),
        name: 'refundInfo',
        meta: {
          title: "售后详情",
          icon: 'el-icon-s-claim',
          hidden: true,
          roles: ['admin', 'jerry'],
        }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    redirect: '/address/addressList',
    meta: {
      title: "地址管理",
      icon: 'el-icon-place',
      hidden: false,
      // id:'20'
    },
    children: [
      {
        path: 'addressList',
        component: () => import('@/views/address/addressList.vue'),
        name: 'addressList',
        meta: {
          title: "地址列表",
          icon: 'el-icon-place',
          hidden: false,
          roles: ['admin', 'jerry'],
          // id:'21'
        }
      }
    ]
  }
  ,
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/withdraw',
    meta: {
      title: "财务管理",
      icon: 'el-icon-notebook-1',
      hidden: false,
      // id:'20'
    },
    children: [
      {
        path: 'withdraw',
        component: () => import('@/views/finance/withdraw.vue'),
        name: 'withdraw',
        meta: {
          title: "提现明细",
          icon: 'el-icon-notebook-1',
          hidden: false,
          roles: ['admin', 'jerry'],
          // id:'21'
        }
      },
      {
        path: 'income',
        component: () => import('@/views/finance/income.vue'),
        name: 'income',
        meta: {
          title: "收支明细",
          icon: 'el-icon-notebook-1',
          hidden: false,
          roles: ['admin', 'jerry'],
          // id:'21'
        }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    meta: {
      title: "客服",
      icon: 'el-icon-s-custom',
      hidden: false,
      id:'67'
    },
    children: [
      {
        path: 'workbench',
        component: () => import('@/views/customer/workbench.vue'),
        name: 'workbench',
        meta: {
          title: "客服工作台",
          icon: 'el-icon-s-custom',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'68'
        }
      },
      {
        path: 'service',
        component: () => import('@/views/customer/service.vue'),
        name: 'service',
        meta: {
          title: "客服设置",
          icon: 'el-icon-s-custom',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'84'
        }
      },
    ]
  }
  ,
  {
    path: '/shop',
    component: Layout,
    meta: {
      title: "店铺管理",
      icon: 'el-icon-s-custom',
      hidden: false,
      id:'67'
    },
    children: [
      {
        path: 'banner',
        component: () => import('@/views/shop/banner.vue'),
        name: 'banner',
        meta: {
          title: "轮播图管理",
          icon: 'el-icon-s-custom',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'68'
        }
      },
      {
        path: 'group',
        component: () => import('@/views/shop/group.vue'),
        name: 'group',
        meta: {
          title: "分组设置",
          icon: 'el-icon-s-custom',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'84'
        }
      },
      {
        path: 'furnist',
        component: () => import('@/views/shop/furnist.vue'),
        name: 'furnist',
        meta: {
          title: "店铺装修",
          icon: 'el-icon-s-custom',
          hidden: false,
          roles: ['admin', 'jerry'],
          id:'85'
        }
      },
    ]
  }
  ,
  
    
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

