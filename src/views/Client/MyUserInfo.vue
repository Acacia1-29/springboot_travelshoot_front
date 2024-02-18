
  <template>
    <div class="root-page-container">
        <div class="mhy-main-page mhy-account-center">
            <div class="mhy-layout">
                <!--顶部头像栏-->
                <div class="mhy-container mhy-account-center-header">
                    <div class="mhy-avatar mhy-account-center-header__avatar mhy-avatar__xxl">
                        <img :src="orginUserInfo.ImageUrls ? orginUserInfo.ImageUrls : 'https://img-static.mihoyo.com/communityweb/upload/c9d11674eac7631d2210a1ba20799958.png'"
                            class="mhy-avatar__img">
                    </div>
                    <div class="mhy-account-center-user">
                        <div class="mhy-account-center-user__header">
                            <div class="mhy-account-center-user__title">
                                <span class="mhy-account-center-user__name">{{ orginUserInfo.Name }}</span>
                                <!---->
                                <img src="https://img-static.mihoyo.com/level/level1.png"
                                    class="mhy-img-icon mhy-account-center-user__level mhy-account-center-user__level--self">
                                <!---->
                            </div>
                            <div class="mhy-account-center-header__buttons">
                                <div class="mhy-button mhy-account-center-header__edit mhy-button-outlined mhy-button-md">
                                    <button class="mhy-button__button" @click="ShowEditUserModal">编辑</button>
                                </div>
                                <!---->
                            </div>
                        </div>
                        <div class="mhy-account-center-user__audit">
                            <span class="mhy-account-center-user__uid">账号ID:{{ orginUserInfo.Id }}</span>
                            <!---->
                        </div>
                        <div class="mhy-account-center-user__intro">
                            <p><i class="el-icon-share" style="color: #ad4e69;margin-right: 10px;font-size: 18px;"></i>{{
                                orginUserInfo.RoleTypeFormat }}</p>
                        </div>
                        <!-- <div class="mhy-account-center-user__intro">
                            <p><i class="el-icon-s-flag"
                                    style="color: #00c3ff;margin-right: 10px;font-size: 18px;"></i>证书状态：{{
                                        orginUserInfo.CertificateStatusFormat
                                    }}
                                <i class="el-icon-user"
                                    style="color: #00c3ff;margin-left:20px; margin-right: 10px;font-size: 18px;"></i>职位：{{
                                        orginUserInfo.ProfessionTypeDto && orginUserInfo.ProfessionTypeDto.Name
                                    }}

                            </p>

                        </div> -->

                        <div class="mhy-account-center-header__data">
                            <div class="mhy-account-center-header__data-item">
                                <a
                                    class="mhy-router-link mhy-account-center-header__data-num mhy-account-center-header__data-link">{{
                                        MyData.collectCount
                                    }}</a>
                                <div class="mhy-account-center-header__data-label">收藏数</div>
                            </div>
                            <div class="mhy-account-center-header__data-item">
                                <a
                                    class="mhy-router-link mhy-account-center-header__data-num mhy-account-center-header__data-link">
                                    {{ MyData.likeCount
                                    }}
                                </a>
                                <div class="mhy-account-center-header__data-label">点赞数</div>
                            </div>
                            <div class="mhy-account-center-header__data-item">
                                <div class="mhy-account-center-header__data-num">{{ MyData.commentCount }}</div>
                                <div class="mhy-account-center-header__data-label">评论数</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box">
                    <!--左侧菜单栏-->
                    <div class="mhy-container mhy-side-menu mhy-account-center__menu">
                        <header class="mhy-side-menu__header">个人中心</header>
                        <ul class="mhy-side-menu__list">
                            <li v-for="(item, index) in menus" :key="index" @click="selMenu(item)">
                                <a
                                    :class="'mhy-router-link mhy-side-menu__item ' + (activeIndex === item.name ? 'nuxt-link-active' : '')">
                                    <i :class="item.icon" style="font-size: 18px;margin-right: 10px;"></i>
                                    <span>{{ item.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>


                    <!-- 右侧内容-->
                    <div class="mhy-container mhy-account-center-content">
                        <MyLoginInfo v-if="activeIndex == '我的登录轨迹'"></MyLoginInfo>
                        <ArticleInfoCollectTable v-if="activeIndex == '我的收藏'"></ArticleInfoCollectTable>
                        <ArticleInfoLikeTable v-if="activeIndex == '我的点赞'"></ArticleInfoLikeTable>
                    </div>
                </div>
            </div>

        </div>
        <EditUserModal ref="EditUserModal"></EditUserModal>
    </div>
</template>

<script>
import store from "@/store";
import router from '@/router';
import { mapGetters } from "vuex";
import EditUserModal from "@/layout/components/EditUserModal"
import ArticleInfoCollectTable from "@/views/Client/ArticleInfoCollectTable"
import ArticleInfoLikeTable from "@/views/Client/ArticleInfoLikeTable"
import MyLoginInfo from "@/views/Client/MyLoginInfo"



export default {
    components: { EditUserModal, ArticleInfoCollectTable, ArticleInfoLikeTable, MyLoginInfo },
    computed: {
        ...mapGetters(["name", "token", "user", "roleType", "roleTypeFormat", "userId", "orginUserInfo"]),
    },
    data() {
        return {
            activeIndex: '我的登录轨迹',
            menus: [
                { name: '我的登录轨迹', icon: 'el-icon-s-data' },
                // { name: '我的学习记录', icon: 'el-icon-document' },
                // { name: '我的话题', icon: 'el-icon-share' },
                { name: '我的点赞', icon: 'el-icon-view' },
                { name: '我的收藏', icon: 'el-icon-star-on' },
            ],
            MyData: null,
        };
    },
    mounted() {
        let that = this;
        that.GetMyData();

    },
    methods: {
        selMenu(item) {
            this.activeIndex = item.name;

        },
      
        async GetMyData() {
            let { Data } = await this.$Post(`/Analyse/MyData`, {});
            this.MyData = Data;
        },
        async ShowEditUserModal() {
            this.$refs.EditUserModal.ShowEditUserModal();
        },
    }
};
</script>

<style scoped>
.root-page-container {
    background: url(https://www.miyoushe.com/_nuxt/img/background.cd0a312.png) no-repeat 0 62px;
    background-size: 100%;
}

.mhy-main-page {
    padding-top: 30px;
    position: relative;
}

.mhy-layout {
    width: 100%;
    margin: 0 auto;
    /* padding-left: 100px;
    padding-right: 100px; */
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

.mhy-layout {
    zoom: 1;
}

.mhy-account-center-header {
    padding: 20px 50px 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 20px;
}

.mhy-container {
    background-color: #fff;
    border-radius: 4px;
}

.mhy-account-center-header__avatar {
    margin-right: 24px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

.mhy-avatar__xxl {
    width: 120px;
    height: 120px;
}

.mhy-avatar {
    display: inline-block;
    position: relative;
}

.mhy-avatar__img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ebebeb;
    vertical-align: top;
}

.mhy-avatar__img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ebebeb;
    vertical-align: top;
}

img {
    border-style: none;
}

.mhy-account-center-user {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    height: 100%;
}

.mhy-account-center-user__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.mhy-account-center-user__title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.mhy-account-center-user__name {
    font-size: 16px;
    line-height: 21px;
    font-weight: 600;
}

.mhy-account-center-user__level.mhy-img-icon {
    margin-left: 10px;
    height: 16px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

.mhy-account-center-user__level--self {
    cursor: pointer;
}

.mhy-img-icon {
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}

.mhy-account-center-header__buttons {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.mhy-button.mhy-button-md.mhy-button-outlined {
    line-height: 32px;
}

.mhy-button.mhy-button-md {
    width: 86px;
    height: 34px;
    line-height: 34px;
}

.mhy-button {
    display: inline-block;
    cursor: pointer;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

.mhy-button-outlined .mhy-button__button {
    background-color: #fff;
    color: #9A2929;
    border: 1px solid #9A2929;
    border-radius: 4px;
    -webkit-transition-duration: .2s;
    -o-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: border-color, color;
    -o-transition-property: border-color, color;
    transition-property: border-color, color;
}

.mhy-button__button {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    font-size: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    border-radius: 0;
    font-weight: inherit;
    line-height: inherit;
}

input,
button,
textarea {
    color: inherit;
    font: inherit;
}

.mhy-account-center-user__audit {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.mhy-account-center-user__uid {
    font-size: 12px;
    color: #ccc;
}

a {
    text-decoration: none;
}

.mhy-account-center-user__certification,
.mhy-account-center-user__intro {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 12px;
    color: #666;
    line-height: 18px;
}

.mhy-account-center-user__certification span,
.mhy-account-center-user__intro span {
    margin-top: 2px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    line-height: 1;
}

p {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
}

.mhy-account-center-user__certification,
.mhy-account-center-user__intro {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 12px;
    color: #666;
    line-height: 18px;
}

.mhy-account-center-user__certification .ip-icon,
.mhy-account-center-user__intro .ip-icon {
    color: #9A2929;
    font-size: 16px;
    margin-right: 8px;
}

.mhy-icon {
    font-size: inherit;
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-ip:before {
    content: "";
}

.mhy-account-center-header__data {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 19px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: center;
    align-self: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-top: 20px;
    border-top: 1px solid #f0f0f0;
}

.mhy-account-center-header__data-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-right: 40px;
}

.mhy-account-center-header__data-link {
    cursor: pointer;
}

.mhy-account-center-header__data-num {
    color: #333;
    font-size: 20px;
}

.mhy-account-center-header__data-label {
    margin-left: 10px;
    color: #ccc;
}

.mhy-account-center-header__data-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-right: 40px;
}

.mhy-account-center-header__data-link {
    cursor: pointer;
}

.mhy-account-center-header__data-num {
    color: #333;
    font-size: 20px;
}

.mhy-account-center-header__data-label {
    margin-left: 10px;
    color: #ccc;
}

.mhy-account-center-header__data-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-right: 40px;
}

.mhy-account-center-header__data-num {
    color: #333;
    font-size: 20px;
}

.mhy-account-center-header__data-label {
    margin-left: 10px;
    color: #ccc;
}

/*左侧菜单栏*/
.mhy-side-menu {
    width: 280px;
    float: left;
}

.mhy-container {
    background-color: #fff;
    border-radius: 4px;
}

.mhy-side-menu__header {
    width: 100%;
    padding: 0 30px;
    line-height: 50px;
    border-bottom: 1px solid #ebebeb;
    font-size: 16px;
}

.mhy-side-menu__list {
    padding: 0 30px 10px;
}

ol,
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

ul,
li {
    list-style: none;
}

.box {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

}

.mhy-account-center__menu li:nth-of-type(3),
.mhy-account-center__menu li:nth-of-type(5) {
    border-bottom: 1px solid #f0f0f0;
}

.mhy-side-menu .nuxt-link-active {
    color: #9A2929;
}

.mhy-side-menu__item {
    padding: 0 20px;
    line-height: 50px;
    font-size: 14px;
    color: #666;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 200px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
}

.mhy-side-menu .nuxt-link-active .mhy-icon {
    color: #9A2929;
}

.mhy-side-menu__item .mhy-icon {
    width: 18px;
    font-size: 18px;
    vertical-align: top;
    display: inline-block;
    color: #d9d9d9;
    margin-right: 15px;
}

.mhy-icon {
    font-size: inherit;
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-wodefatie:before {
    content: "";
}

/*右侧内容*/
.mhy-account-center-content {
    flex: 1;
    padding: 0 30px;
}
</style>
