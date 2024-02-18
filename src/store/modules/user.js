import { post } from "@/utils/http";
import { getToken, setToken, removeToken } from "@/utils/cache";
import { resetRouter } from "@/router";
import { LoginOut } from "@/utils/index";
const getDefaultState = () => {
  return {
    token: getToken(),
    userId: "",
    name: "",
    avatar: "",
    roleType: undefined,
    roleTypeFormat: "",
    menuState: false,
    loginTimePeriod: "",
    money: 0,
    orginUserInfo: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_MENU_STATE: (state, menuState) => {
    state.menuState = menuState;
  },

  SET_ROLE_TYPE: (state, roleType) => {

    state.roleType = roleType
  },
  SET_ROLE_TYPE_FORMAT: (state, roleTypeFormat) => {
    state.roleTypeFormat = roleTypeFormat
  },


  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_LOGIN_TIME_PERIOD: (state, loginTimePeriod) => {
    state.loginTimePeriod = loginTimePeriod
  },

  SET_MONEY: (state, money) => {
    state.money = money
  },
  SET_USER_INFO: (state, orginUserInfo) => {
    state.orginUserInfo = orginUserInfo;

  }
};

const actions = {
  /**
   * 用户登录
   * @param {*} param0
   * @param {*} userInfo
   * @returns
   */
  async login({ commit }, userInfo) {
    const { userName, password, roleType } = userInfo;
    let { Data } = await post("/User/SignIn", {
      UserName: userName,
      Password: password,
      RoleType: roleType,
    })

    if (Data) {
      commit("SET_TOKEN", Data);
      setToken(Data);
    }
    return Data;
  },

  /**
   * 获取配置信息
   * @param {*} param0
   */
  async GetByToken({ commit, state }) {
    let { Data } = await post("/User/GetByToken", {})
    let { UserName, Name, ImageUrls, RoleType, Id, RoleTypeFormat, LoginTimePeriod, Money } = Data;
    commit("SET_MENU_STATE", true);
    commit("SET_NAME", Name);
    commit("SET_AVATAR", ImageUrls);
    commit("SET_USER_ID", Id);
    commit("SET_ROLE_TYPE", RoleType);
    commit("SET_ROLE_TYPE_FORMAT", RoleTypeFormat);
    commit("SET_LOGIN_TIME_PERIOD", LoginTimePeriod);
    commit("SET_MONEY", Money);
    commit("SET_USER_INFO", Data);

    return Data;
  },
  /**
   * 获取用户权限
   * @param {*} param0
   */
  getPermission({ commit, state }) {

    //  commit("SET_PERMISIONS", ["12"]);
  },
  /**
     * 获取菜单树
     * @param {*} param0
     */
  getMenuTree({ commit, state }) {
    return state.menuTree;
  },

  /**
   * 获取用户角色
   * @param {*} param0
   */
  getroleId({ commit, state }) {
    console.log("获取用户角色", state.roleType)
    return state.roleType;
  },
  /**
   * 登出
   * @param {*} param0
   */
  async logout({ commit, state }) {

    //await post("/user/logout", {})

    removeToken(); // must remove  token  first
    resetRouter();
    commit("RESET_STATE");
    commit("SET_MENU_STATE", false)
    LoginOut()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
