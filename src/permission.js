import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/cache' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist



router.beforeEach(async (to, from, next) => {

  // start progress bar
  NProgress.start()


  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken();

  if (to.meta.type == "Client") {

    if (hasToken && store.getters.roleType == undefined) {

      await store.dispatch('user/GetByToken');
      store.dispatch('permission/GenerateRoutes', { roles: store.getters.roleType }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.permission_routes) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
    }
    else {
      next();
    }
    return;
  }

  if (hasToken) {

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roleType == undefined) {
        //获取登录配置
        await store.dispatch('user/GetByToken');
        store.dispatch('permission/GenerateRoutes', { roles: store.getters.roleType }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.permission_routes) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }
      else {

        try {
          if (store.getters.roleType == 0) {

            next()
          }
          else {
            next(`/Client/Home`)
          }
        } catch (error) {
          //移除缓存token 跳转到登录页面
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/Client/Home`)
          NProgress.done()
        }

      }
    }
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/Client/Home`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
