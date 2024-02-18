import Layout from '@/layout'
export const GoodRoutes = [
    {
        path: '/Good',
        component: Layout,
        redirect: '/Admin/GoodList',
        meta: {
            title: '花材管理',
            icon: "el-icon-s-goods",
            roles: [0],
        },
        children: [{
            path: 'GoodTypeList',
            component: () => import('@/views/Admin/GoodTypeList'),
            name: 'GoodTypeList',
            meta: {
                title: '花材类型',
                roles: [0],
                icon: "el-icon-d-caret",
                noCache: true
            }
        }, {
            path: 'GoodList',
            component: () => import('@/views/Admin/GoodList'),
            name: 'GoodList',
            meta: {
                title: '花材',
                roles: [0],
                icon: "el-icon-s-goods",
                noCache: true
            }
        }, {
            path: 'GoodPropsList',
            component: () => import('@/views/Admin/GoodPropsList'),
            name: 'GoodPropsList',
            meta: {
                title: '花材属性',
                roles: [0],
                icon: "el-icon-share",
                noCache: true
            }
        }
            , {
            path: 'GoodAnalyse',
            component: () => import('@/views/Admin/GoodAnalyse'),
            name: 'GoodAnalyse',
            meta: {
                title: '花材分析',
                roles: [0],
                icon: "el-icon-data-analysis",
                noCache: true
            }
        }

        ]
    },
    {
        path: '/OrderInfo',
        component: Layout,
        redirect: '/Admin/OrderInfoList',
        meta: {
            title: '购物订单',
            icon: "el-icon-s-order",
            roles: [0],
        },
        children: [{
            path: 'OrderInfoList',
            component: () => import('@/views/Admin/OrderInfoList'),
            name: 'OrderInfoList',
            meta: {
                title: '订单',
                roles: [0],
                icon: "el-icon-s-order",
                noCache: true
            }
        },
        // {
        // path: 'OrderDetailList',
        // component: () => import('@/views/Admin/OrderDetailList'),
        // name: 'OrderDetailList',
        // meta: {
        //   title: '订单明细',
        //   roles: [0],
        //   icon: "el-icon-s-cooperation",
        //   noCache: true
        // }
        // },
        {
            path: 'BuyCardList',
            component: () => import('@/views/Admin/BuyCardList'),
            name: 'BuyCardList',
            meta: {
                title: '购物车',
                roles: [0],
                icon: "el-icon-bank-card",
                noCache: true
            }
        }, {
            path: 'OrderAnalyse',
            component: () => import('@/views/Admin/OrderAnalyse'),
            name: 'OrderAnalyse',
            meta: {
                title: '订单分析',
                roles: [0],
                icon: "el-icon-data-analysis",
                noCache: true
            }
        }]
    },
    {
        path: '/Volumes',
        component: Layout,
        redirect: '/Admin/VolumesList',
        meta: {
            title: '营销策略',
            icon: "el-icon-s-help",
            roles: [0],
        },
        children: [{
            path: 'BannerList',
            component: () => import('@/views/Admin/BannerList'),
            name: 'BannerList',
            meta: {
                title: '广告封面',
                roles: [0],
                icon: "el-icon-picture",
                noCache: true
            }
        }, {
            path: 'VolumesList',
            component: () => import('@/views/Admin/VolumesList'),
            name: 'VolumesList',
            meta: {
                title: '优惠卷',
                roles: [0],
                icon: "el-icon-link",
                noCache: true
            }
        }, {
            path: 'VolumeRecordList',
            component: () => import('@/views/Admin/VolumeRecordList'),
            name: 'VolumeRecordList',
            meta: {
                title: '优惠卷领取记录',
                roles: [0],
                icon: "el-icon-notebook-2",
                noCache: true
            }
        }]
    }];
