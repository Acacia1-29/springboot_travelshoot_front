
/**
 * 存放一些缓存的信息
 */

import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

//登录的Token缓存Key
const TokenKey = 'vue_admin_template_token' + defaultSettings.systemCode

//主题的缓存Key
const ThemeKey = 'vue_admin_template_theme' + defaultSettings.systemCode

export function getToken() {

  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getTheme() {

  return Cookies.get(ThemeKey)
}

export function setTheme(theme) {

  return Cookies.set(ThemeKey, theme)
}

export function removeTheme() {
  return Cookies.remove(ThemeKey)
}
