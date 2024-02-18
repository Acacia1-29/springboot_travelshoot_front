
import store from '@/store'
import permission from '@/store/modules/permission';


/**
 * 通过v-auth指令来控制页面是否需要显示
 * @param {*} permissionValue 当前页面需要的权限值
 * @param {*} needpermissionValue 需要权限的值 
 * @returns 
 */
function CheckPermission(permissionValue, needpermissionValue) {
    if (permissionValue == undefined) {
        return false;
    }
    else if (Array.isArray(needpermissionValue)) {
        if (needpermissionValue.indexOf(permissionValue) == -1) {
            return false;
        }
    }
    else {
        if (needpermissionValue != permissionValue) {
            return false;
        }
    }
    return true;
}

export default {
    install(Vue, options) {

        // 注册一个全局自定义指令 `v-auth`
        Vue.directive('auth', {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: (el, binding, vnode) => {
                const value = binding.value;

                if (CheckPermission(store.getters.roleType, binding.value) == false) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
}

