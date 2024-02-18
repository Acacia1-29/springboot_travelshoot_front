import Layout from '@/layout'
export const ArticleInfoRoutes = {
    path: '/ArticleInfo',
    component: Layout,
    redirect: '/Admin/ArticleInfoList',
    meta: {
        title: '资讯',
        icon: "el-icon-s-promotion",
        roles: [0],
    },
    children: [{
        path: 'ArticleTypeList',
        component: () => import('@/views/Admin/ArticleTypeList'),
        name: 'ArticleTypeList',
        meta: {
            title: '资讯类型',
            roles: [0],
            icon: "el-icon-s-fold",
            noCache: true
        }
    }, {
        path: 'ArticleInfoList',
        component: () => import('@/views/Admin/ArticleInfoList'),
        name: 'ArticleInfoList',
        meta: {
            title: '资讯',
            roles: [0],
            icon: "el-icon-s-comment",
            noCache: true
        }
    }, {
        path: 'ArticleInfoRecordList',
        component: () => import('@/views/Admin/ArticleInfoRecordList'),
        name: 'ArticleInfoRecordList',
        meta: {
            title: '浏览记录',
            roles: [0],
            icon: "el-icon-view",
            noCache: true
        }
    }]
};