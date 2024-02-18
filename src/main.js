import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import AuthDirective from '@/utils/authDirective'

import App from './App'
import store from './store'
import router from './router'
import autofit from '@/utils/autofit.js'
import moment from 'moment';
import filter from "@/utils/filter.js"
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import '@/icons' // icon
import '@/permission' // permission control
import { post, PostLoading, PostDelete, PostSigleUpdate, PostSigleUpdateNoMessageBox, PostConfirm } from '@/utils/http'

import comm from "@/utils/index"
import dataTable from "@/components/Tables/data-table"
import pagedSelect from "@/components/PagedSelect/index"
import tableSelect from "@/components/TableSelect/index"
import UploadImages from "@/components/upload/upload-images"
import UploadFiles from "@/components/upload/upload-files"
import Tinymce from "@/components/Tinymce";
import Content from "@/components/Content/content";
import RichContent from "@/components/Content/Rich-Content";
import CanvasCode from "@/components/Code/canvas";
import DownLoadA from "@/components/upload/download-a";
import UploadImport from '@/components/upload/upload-import'
import checkSelect from "@/components/CheckSelect/index"
import InputRange from "@/components/Input/InputRange"
import ImportButton from "@/components/Buttons/ImportButton"
import ExportButton from "@/components/Buttons/ExportButton"
import ButtonContent from "@/components/Buttons/ButtonContent"
import FilesLinkButton from "@/components/Buttons/FilesLinkButton"
import AudioButton from "@/components/Buttons/AudioButton"
import VideoButton from "@/components/Buttons/VideoButton"
import TabSearchList from "@/components/List/Tab-Search-List"
import BoxImageList from "@/components/List/Box-Image-List"
import ArticleImageList from "@/components/List/Article-Image-List"
import CommentList from "@/components/Comment/Comment-List"
import MarqueeTips from 'vue-marquee-tips'
import NoDataResult from "@/components/NoDataResult"
import ThemeChange from "@/components/Theme/ThemeChange"
import Lingallery from 'lingallery';
import VueParticles from 'vue-particles'
import BannerServer from "@/components/Banner/BannerServer"
import TabPaneList from "@/components/List/Tab-Pane-List"
import MarqueeTipsServer from "@/components/List/Marquee-Tips-Server"
import WaterfallList from "@/components/List/WaterfallList"
import TabSearch from "@/components/Search/Tab-Search"
import Magnifier from "@/components/Magnifier/Magnifier"
import AutoSwiper from "@/components/Banner/AutoSwiper"
import UploadFace from "@/components/Video/UploadFace"
import UploadFaceButton from "@/components/Video/UploadFaceButton"
import LandscapeList from "@/components/List/Landscape-List"
import AddressSearch from "@/components/Map/AddressSearch"

Vue.component('el-lingallery', Lingallery);//灯箱
Vue.component("data-table", dataTable);//引入表格
Vue.component("el-input-range", InputRange);//引入搜索范围input
Vue.component("el-check-select", checkSelect);
Vue.component("el-paged-select", pagedSelect);//单选下拉框
Vue.component("el-table-select", tableSelect);//选择表格
Vue.component("el-upload-images", UploadImages);//选择图片
Vue.component("el-upload-files", UploadFiles);//选择文件
Vue.component("el-tinymce", Tinymce);//富文本编辑插件
Vue.component("el-content", Content);//富文本弹窗显示插件
Vue.component("el-rich-content", RichContent);//富文本显示插件
Vue.component("el-code", CanvasCode);//验证码插件
Vue.component("el-upload-import", UploadImport);//导入插件
Vue.component("el-download-a", DownLoadA);//下载导入模板插件
Vue.component("el-import-button", ImportButton);//导入按钮
Vue.component("el-export-button", ExportButton);//导出按钮
Vue.component("el-rich-button", ButtonContent);//查看富文本按钮
Vue.component("el-files-link-button", FilesLinkButton);//查看文件列表按钮
Vue.component("el-audio-button", AudioButton);//音频播放按钮
Vue.component("el-video-button", VideoButton);//视频播放按钮
Vue.component("el-tab-search-list", TabSearchList);//搜索顶部列表插件
Vue.component("el-tab-search", TabSearch);//搜索顶部插件插件
Vue.component("el-box-image-list", BoxImageList);//图片列表
Vue.component("el-article-image-list", ArticleImageList);//资讯列表
Vue.component("el-banner-server", BannerServer);//封面
Vue.component("el-tab-pane-list", TabPaneList);//菜单列表
Vue.component("el-comment-list", CommentList);//评论列表
Vue.component("el-waterfall-list", WaterfallList);//瀑布流列表
Vue.component("el-marquee-tips", MarqueeTips);//跑马灯
Vue.component("el-marquee-tips-server", MarqueeTipsServer);//跑马灯
Vue.component("el-no-data-result", NoDataResult);//空内容
Vue.component("el-theme-change", ThemeChange);//选择主题
Vue.component("el-magnifier", Magnifier);//放大镜
Vue.component("el-auto-swiper", AutoSwiper);//自动swiper
Vue.component("el-upload-face", UploadFace);//上传人脸
Vue.component("el-upload-face-button", UploadFaceButton);//上传人脸
Vue.component("el-landscape-list", LandscapeList);//横向布局
Vue.component("el-address-search", AddressSearch);//地址地图搜索


Vue.prototype.$Post = post;//挂载post到Vue树
Vue.prototype.$PostLoading = PostLoading;
Vue.prototype.$PostDelete = PostDelete;
Vue.prototype.$PostSigleUpdate = PostSigleUpdate;
Vue.prototype.$PostSigleUpdateNoMessageBox = PostSigleUpdateNoMessageBox;
Vue.prototype.$PostConfirm = PostConfirm;
Vue.prototype.$Autofit = autofit;
Vue.prototype.$comm = comm;
Vue.prototype.$moment = moment;

Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(AuthDirective)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
