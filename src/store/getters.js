const getters = {
  columnType: state => state.table.columnType,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  menuState: state => state.user.menuState,
  avatar: state => state.user.avatar,
  headImage: state => state.user.headImage,
  name: state => state.user.name,
  uploadUrl: state => state.settings.uploadUrl,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  roleType: state => state.user.roleType,
  roleTypeFormat: state => state.user.roleTypeFormat,
  loginTimePeriod: state => state.user.loginTimePeriod,
  userId: state => state.user.userId,
  style: state => state.theme.style,
  theme: state => state.theme,
  user: state => state.user,
  orginUserInfo: state => state.user.orginUserInfo,//用户信息原始的值

}
export default getters
