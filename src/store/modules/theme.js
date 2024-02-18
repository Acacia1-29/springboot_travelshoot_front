import defaultSettings from '@/settings'
import { getTheme, setTheme, removeTheme } from "@/utils/cache";

const getDefaultState = () => {
    var theme = getTheme();
    if (theme != null && theme != undefined && theme != 'undefined') {
        return JSON.parse(getTheme());
    }
    else {
        return {
            style: "",
            primary: "#409EFF",
            success: "#67C23A",
            info: "#909399",
            warning: "#E6A23C",
            danger: "#F56C6C",
            text: "#409EFF",
            headercellbg: "#409EFF",
            headercellcolor: "#FFFFFF",
            tablerowbg: "#FFF",
            tablerowcolor: '',
            tablerowfontsize: "",
            tableborder: false,
            tablestripe: false,
            appmainbgcolor: "#FFFFFF",
            navbarbgcolor: "#fff",
            // menuBg: "#304156",//菜单背景颜色
            // menuHover: "#263445",//菜单悬浮
            // menuActiveText: "#409EFF",//菜单激活
            // menuText: "#bfcbd9",//菜单文字
        };
    }
};

const state = getDefaultState();



const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState());
    },
    SET_STYLE: (state, style) => {
        state.style = style;
    },
    SET_PRIMARY: (state, primary) => {
        state.primary = primary;
    },
    SET_VALUE: (state, { propName, value }) => {
        state[propName] = value;
    }
}

const actions = {
    SaveStyle({ commit }, data) {
        commit('SET_STYLE', data)

        setTheme(commit.state);
    },
    SetPrimary({ commit }, value) {
        commit('SET_PRIMARY', value)

        setTheme(commit.state);
    },
    SetValue({ commit }, { propName, value }) {

        commit('SET_VALUE', propName, value);

        console.log(state);
        setTheme(state);

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

