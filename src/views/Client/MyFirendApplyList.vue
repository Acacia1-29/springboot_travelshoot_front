
  

<template>
    <div>
        <div class="Topstory-container">
            <div class="Topstory-mainColumn">
                <div class="Card">
                    <div class="TopstoryTabs Topstory-tabs">
                        <div class="TopstoryTabs-link Topstory-tabsLink pointer " :class="active == 0 ? 'is-active' : ''"
                            @click="tabChange(0)">我 的 申 请</div>
                        <div class="TopstoryTabs-link Topstory-tabsLink  pointer" :class="active == 1 ? 'is-active' : ''"
                            @click="tabChange(1)">它 人 申 请</div>

                    </div>
                </div>
                <div class="Topstory-content">
                    <div class="list Card" v-if="active == 0">
                        <div v-for="(item, index) in FriendApplyList" class="padding-bottom-xs"
                            style="border-bottom:1px solid rgb(239, 225, 225)">
                            <div class="flex margin-xs">
                                <img :src="item.UserDto.ImageUrls" style="width:50px;height: 50px;border-radius: 10px;">
                                <div class="margin-left-xs flex-sub">
                                    <div class="text-bold text-mini">{{ item.UserDto.Name }}</div>
                                    <div class="flex margin-top-xs">
                                        <div>申请内容:</div>
                                        <div class="flex-sub">{{ item.Content }}</div>
                                    </div>
                                    <div class="flex margin-top-xs" v-if="item.RejectContent != null">
                                        <div>拒绝理由:</div>
                                        <div class="flex-sub">{{ item.RejectContent }}</div>
                                    </div>
                                </div>
                                <div>
                                    <span v-if="item.IsAgree == null" style="color:#0081ff">等待对方处理</span>
                                    <span v-if="item.IsAgree == true" style="color:rgb(18, 133, 26)">对方同意</span>
                                    <span v-if="item.IsAgree == false" style="color:rgb(155, 22, 22)">对方拒绝</span>
                                </div>
                            </div>
                            <div class="flex justify-end align-center margin-top-xs padding-right-xs">
                                <el-button type="primary" v-if="item.IsAgree == null" size="mini"
                                    @click="CancelApply(item.Id)">拒绝申请</el-button>


                            </div>


                        </div>

                    </div>
                    <div class="list Card" v-if="active == 1">
                        <div v-for="(item, index) in FriendApplyList" class="padding-bottom-xs"
                            style="border-bottom:1px solid rgb(239, 225, 225)">
                            <div class="flex margin-xs">
                                <img :src="item.ApplyUserDto.ImageUrls"
                                    style="width:50px;height: 50px;border-radius: 10px;">
                                <div class="margin-left-xs flex-sub">
                                    <div class="text-bold text-mini">{{ item.ApplyUserDto.Name }}</div>
                                    <div class="flex margin-top-xs">
                                        <div>申请内容:</div>
                                        <div class="flex-sub">{{ item.Content }}</div>
                                    </div>
                                    <div class="flex margin-top-xs" v-if="item.RejectContent != null">
                                        <div>拒绝理由:</div>
                                        <div class="flex-sub">{{ item.RejectContent }}</div>
                                    </div>
                                </div>
                                <div>
                                    <span v-if="item.IsAgree == null" style="color:#0081ff">待处理</span>
                                    <span v-if="item.IsAgree == true" style="color:rgb(18, 133, 26)">同意</span>
                                    <span v-if="item.IsAgree == false" style="color:rgb(155, 22, 22)">拒绝</span>
                                </div>
                            </div>
                            <div class="flex justify-end align-center margin-top-xs padding-right-xs">
                                <el-button type="danger" v-if="item.IsAgree == null" size="mini"
                                    @click="RegApply(item.Id)">拒 绝</el-button>
                                <el-button type="primary" v-if="item.IsAgree == null" size="mini"
                                    @click="AggrenApply(item.Id)">同 意</el-button>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
            <div class="side">
                <RecommendBannerCard></RecommendBannerCard>
                <RecommendAuthorListCard></RecommendAuthorListCard>

            </div>

        </div>


    </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex'
import RecommendBannerCard from "@/views/Client/RecommendBannerCard.vue"
import RecommendAuthorListCard from "@/views/Client/RecommendAuthorListCard.vue"

export default {
    name: 'Home',
    components: { RecommendBannerCard, RecommendAuthorListCard },
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", 'userId'
        ])
    },

    data() {
        return {

            active: 0,
            FriendApplyList: []

        };
    },
    mounted() {
        this.MyFriendApplyApi();
    },
    methods: {
        async MyFriendApplyApi() {
            let { Data: { Items } } = await this.$Post(`/FriendApply/List`, { ApplyUserId: this.userId });
            this.FriendApplyList = Items;
        },
        async ApplyMyFriendApi() {
            let { Data: { Items } } = await this.$Post(`/FriendApply/List`, { UserId: this.userId });
            this.FriendApplyList = Items;
        },
        async tabChange(e) {
            this.active = e;
            if (this.active == 0) {
                this.MyFriendApplyApi();
            }
            else {
                this.ApplyMyFriendApi();
            }

        },
        async ArticleImageListCallBack() {
            this.$refs.ArticleImageList.Reload(this.where);
        },

        //取消申请
        async CancelApply(Id) {
            await this.$PostDelete(`/FriendApply/Delete`, { Id: Id });
            this.MyFriendApplyApi();
        },
        //同意申请
        async AggrenApply(Id) {
            await this.$PostSigleUpdate('/FriendApply/Get', `/FriendApply/AggrenApply`, Id, "你同意它成为你的好友吗?", { IsAgree: true, Behavior: "AggrenApply" });
            this.ApplyMyFriendApi();
        },
        //拒绝申请
        async RegApply(Id) {
            await this.$PostSigleUpdate('/FriendApply/Get', `/FriendApply/CreateOrEdit`, Id, "你要拒绝吗?", { IsAgree: false, });
            this.ApplyMyFriendApi();
        },
        TopicClick(item) {
            this.$router.push({
                path: `/Client/TopicDetail`, query: {
                    TopicId: item.Id,

                }
            });
        }
    }


}
</script>

<style lang="scss" scoped>
.Topstory-container {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 10px auto;
    padding: 0 16px;
    position: relative;
    width: 1000px;
}

.Topstory-mainColumn {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-bottom: 0;
    margin-right: 10px;
    width: 694px;
}

.Card {
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // margin-bottom: 10px;
    overflow: hidden;
}

.Topstory-tabs {
    border-bottom: 1px solid #f8f8fa;
}

.TopstoryTabs {
    height: 58px;
    display: flex;
}

.TopstoryTabs-link {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    margin: 0 22px;
}

.TopstoryTabs-link.is-active {
    font-weight: 500;
    color: #1772f6;
}

.TopstoryItem {
    border-radius: 0;
    outline: none;
    overflow: visible;
    overflow: initial;
    padding: 16px 20px;
    position: relative;
    border-bottom: 1px solid #f8f8fa;
    padding-bottom: 30px;
}

.ContentItem-title {
    margin-bottom: -4px;
    margin-top: -4px;
    word-break: break-word;
    color: #191b1f;
    line-height: 1.6;
    font-size: 18px;
    font-synthesis: style;
    font-weight: 600;
}

.AuthorInfo {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    max-width: 654px;
    position: relative;
}

.AuthorInfo-avatar {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    max-width: 100%;
    background-color: rgb(255, 255, 255);
    width: 24px;
    height: 24px;
    border-radius: 2px;
}

.AuthorInfo-name {
    font-synthesis: style;
    font-weight: 600;
}

.AuthorInfo-badgeText {
    color: #535861;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ContentItem-time {
    color: #8491a5;
    font-size: 14px;
    margin-top: 10px;
}

.content-cut {

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    line-height: 1.2em;
}

.RightSideBar {
    width: 296px;
    -webkit-align-self: normal;
    -ms-flex-item-align: normal;
    align-self: normal;
}

.CreatorEntrance {
    height: 52px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
}
</style>







