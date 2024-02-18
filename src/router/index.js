import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Client from '@/client'
  
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },{
    path: '/ForgetPassword',
    component: () => import('@/views/login/ForgetPassword'),
    hidden: true, meta: {
      title: '前台',
      type: "Client",

    },
  },

  {
    path: '/Register',
    component: () => import('@/views/Client/Register'),
    hidden: true,
    meta: {
      title: '前台',
      type: "Client",

    },
  },
  {
    path: '/404',

    component: () => import('@/views/404'),
    hidden: true,
    meta: {
      type: "foreground",
    },
  },


  { path: '*', redirect: '/', hidden: true }
]
export const constantHomeRoutes = [
  {
    path: '/Client/Index',
    component: Client,
    redirect: "/Client/Home",
    meta: {
      title: '前台',
      type: "Client",

    },
    children: [{
      path: '/Client/Home',
      component: () => import('@/views/Client/Home'),
      name: 'Home',
      hidden: true,
      meta: {
        type: "Client",
        title: '首页',

      }
    },{
      path: '/Client/MyUserInfo',
      component: () => import('@/views/Client/MyUserCenter/MyUserInfo'),
      name: 'ClientMyUserInfo',
      hidden: true,
      meta: {
        type: "Client",
        title: '我的个人信息',

      }
    }]
  },
]


export const asyncRoutes = [
 
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
        icon: "el-icon-s-home",
      roles: [0, 2],
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        roles: [0, 2],
        icon: "el-icon-s-home",
        title: '控制台',
        noCache: true
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/Admin/UserList',
    meta: {
      title: '用户',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'UserList',
      component: () => import('@/views/Admin/UserList'),
      name: 'UserList',
      meta: {
        title: '用户',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/AppUser',
    component: Layout,
    redirect: '/Admin/AppUserList',
    meta: {
      title: '用户',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'AppUserList',
      component: () => import('@/views/Admin/AppUserList'),
      name: 'AppUserList',
      meta: {
        title: '用户',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ArticleInfo',
    component: Layout,
    redirect: '/Admin/ArticleInfoList',
    meta: {
      title: '资讯',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ArticleInfoList',
      component: () => import('@/views/Admin/ArticleInfoList'),
      name: 'ArticleInfoList',
      meta: {
        title: '资讯',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ArticleInfoCollect',
    component: Layout,
    redirect: '/Admin/ArticleInfoCollectList',
    meta: {
      title: '资讯收藏',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ArticleInfoCollectList',
      component: () => import('@/views/Admin/ArticleInfoCollectList'),
      name: 'ArticleInfoCollectList',
      meta: {
        title: '资讯收藏',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ArticleInfoComment',
    component: Layout,
    redirect: '/Admin/ArticleInfoCommentList',
    meta: {
      title: '资讯评论',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ArticleInfoCommentList',
      component: () => import('@/views/Admin/ArticleInfoCommentList'),
      name: 'ArticleInfoCommentList',
      meta: {
        title: '资讯评论',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ArticleInfoRecord',
    component: Layout,
    redirect: '/Admin/ArticleInfoRecordList',
    meta: {
      title: '资讯浏览记录',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ArticleInfoRecordList',
      component: () => import('@/views/Admin/ArticleInfoRecordList'),
      name: 'ArticleInfoRecordList',
      meta: {
        title: '资讯浏览记录',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ArticleType',
    component: Layout,
    redirect: '/Admin/ArticleTypeList',
    meta: {
      title: '资讯类型',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ArticleTypeList',
      component: () => import('@/views/Admin/ArticleTypeList'),
      name: 'ArticleTypeList',
      meta: {
        title: '资讯类型',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/Banner',
    component: Layout,
    redirect: '/Admin/BannerList',
    meta: {
      title: '封面',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'BannerList',
      component: () => import('@/views/Admin/BannerList'),
      name: 'BannerList',
      meta: {
        title: '封面',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/BuyCard',
    component: Layout,
    redirect: '/Admin/BuyCardList',
    meta: {
      title: '购物车',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'BuyCardList',
      component: () => import('@/views/Admin/BuyCardList'),
      name: 'BuyCardList',
      meta: {
        title: '购物车',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ChatRecord',
    component: Layout,
    redirect: '/Admin/ChatRecordList',
    meta: {
      title: '聊天记录',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ChatRecordList',
      component: () => import('@/views/Admin/ChatRecordList'),
      name: 'ChatRecordList',
      meta: {
        title: '聊天记录',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/ChatTabulation',
    component: Layout,
    redirect: '/Admin/ChatTabulationList',
    meta: {
      title: '聊天列表',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ChatTabulationList',
      component: () => import('@/views/Admin/ChatTabulationList'),
      name: 'ChatTabulationList',
      meta: {
        title: '聊天列表',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/FriendApply',
    component: Layout,
    redirect: '/Admin/FriendApplyList',
    meta: {
      title: '好友申请',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'FriendApplyList',
      component: () => import('@/views/Admin/FriendApplyList'),
      name: 'FriendApplyList',
      meta: {
        title: '好友申请',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/Good',
    component: Layout,
    redirect: '/Admin/GoodList',
    meta: {
      title: '商品',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'GoodList',
      component: () => import('@/views/Admin/GoodList'),
      name: 'GoodList',
      meta: {
        title: '商品',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/GoodProps',
    component: Layout,
    redirect: '/Admin/GoodPropsList',
    meta: {
      title: '商品属性',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'GoodPropsList',
      component: () => import('@/views/Admin/GoodPropsList'),
      name: 'GoodPropsList',
      meta: {
        title: '商品属性',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/GoodType',
    component: Layout,
    redirect: '/Admin/GoodTypeList',
    meta: {
      title: '商品类型',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'GoodTypeList',
      component: () => import('@/views/Admin/GoodTypeList'),
      name: 'GoodTypeList',
      meta: {
        title: '商品类型',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/MyFriend',
    component: Layout,
    redirect: '/Admin/MyFriendList',
    meta: {
      title: '我的好友',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'MyFriendList',
      component: () => import('@/views/Admin/MyFriendList'),
      name: 'MyFriendList',
      meta: {
        title: '我的好友',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/OrderDetail',
    component: Layout,
    redirect: '/Admin/OrderDetailList',
    meta: {
      title: '订单明细',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'OrderDetailList',
      component: () => import('@/views/Admin/OrderDetailList'),
      name: 'OrderDetailList',
      meta: {
        title: '订单明细',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/OrderInfo',
    component: Layout,
    redirect: '/Admin/OrderInfoList',
    meta: {
      title: '订单',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'OrderInfoList',
      component: () => import('@/views/Admin/OrderInfoList'),
      name: 'OrderInfoList',
      meta: {
        title: '订单',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/OrderInfoComment',
    component: Layout,
    redirect: '/Admin/OrderInfoCommentList',
    meta: {
      title: '订单评论',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'OrderInfoCommentList',
      component: () => import('@/views/Admin/OrderInfoCommentList'),
      name: 'OrderInfoCommentList',
      meta: {
        title: '订单评论',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/Shop',
    component: Layout,
    redirect: '/Admin/ShopList',
    meta: {
      title: '店铺',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'ShopList',
      component: () => import('@/views/Admin/ShopList'),
      name: 'ShopList',
      meta: {
        title: '店铺',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/SysNotice',
    component: Layout,
    redirect: '/Admin/SysNoticeList',
    meta: {
      title: '系统通知',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'SysNoticeList',
      component: () => import('@/views/Admin/SysNoticeList'),
      name: 'SysNoticeList',
      meta: {
        title: '系统通知',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/UserAddress',
    component: Layout,
    redirect: '/Admin/UserAddressList',
    meta: {
      title: '用户地址',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'UserAddressList',
      component: () => import('@/views/Admin/UserAddressList'),
      name: 'UserAddressList',
      meta: {
        title: '用户地址',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/VolumeRecord',
    component: Layout,
    redirect: '/Admin/VolumeRecordList',
    meta: {
      title: '优惠卷领取记录',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'VolumeRecordList',
      component: () => import('@/views/Admin/VolumeRecordList'),
      name: 'VolumeRecordList',
      meta: {
        title: '优惠卷领取记录',
        roles: [0],
        noCache: true
      }
    }]
  },
  {
    path: '/Volumes',
    component: Layout,
    redirect: '/Admin/VolumesList',
    meta: {
      title: '优惠卷',
      icon: "el-icon-s-custom",
      roles: [0],
    },
    children: [{
      path: 'VolumesList',
      component: () => import('@/views/Admin/VolumesList'),
      name: 'VolumesList',
      meta: {
        title: '优惠卷',
        roles: [0],
        noCache: true
      }
    }]
  },




]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...constantHomeRoutes, ...asyncRoutes]
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
