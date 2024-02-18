import Vue from 'vue'
import comm from "@/utils/index"


/**
 * 全局时间管道
 */
Vue.filter('FormatDateTime', function (value) {
  return comm.FormatDateTime(value);
})

/**
 * 全局时间管道
 */
Vue.filter('GetFormatShortDate', function (value) {
  console.log(value);
  return comm.GetFormatShortDate(value);
})

/**
 * 全局时间管道
 */
Vue.filter('GetTimeDifference', function (value) {
  return comm.GetTimeDifference(value);
})
/**
 * 全局时间管道
 */
Vue.filter('GetFormatHMSDate', function (value) {
  return comm.GetFormatHMSDate(value);
})
/**
 * 替换文本
 */
Vue.filter('RepalceHtml', function (value) {
  return value.replace(/<[^>]+>|&[^>]+;/g, "").trim();
})
