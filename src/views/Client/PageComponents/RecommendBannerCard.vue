
  
<template>
    <div>
        <div class="Card RightSideBar padding-xs">
            <div class="marign-top-xs line-bottom text-sm text-bold">广告推荐</div>
            <el-divider></el-divider>
            <div v-if="BannerList.length > 0" class="pointer padding-xs" style="border-bottom: 1px solid gray;">
                <div v-for="(item, index) in BannerList" @click="Skip(item)">
                    <div class=" margin-bottom-xs">
                        <el-image style="width:100%" :src="item.ImageUrls" fit="fit"></el-image>
                        <div class="margin-top-xs text-bold">{{ item.Title }}</div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "RecommendAuthorCard",
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user", 'roleType'
        ])
    },
    props: {
        UserId: {

        },
        BannerId: {

        },
    },

    data() {
        return {
            BannerList: null,
        };
    },
    beforeCreate(e) {

    },
    created() {
        this.GetBannerList();
    },
    methods: {

        async GetBannerList() {
            let { Data: { Items } } = await this.$Post(`/Banner/List`, {});
            this.BannerList = Items;

        },
        async Skip(item) {
            if (!item.LinkUrl) {
                this.$message.info("没有设置跳转链接");
                return;
            }
            console.log(item.LinkUrl);
            window.open(item.LinkUrl, '_blank');

        }
    },

};
</script>
<style>
.Card {
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 10px;
    overflow: hidden;
}

.RightSideBar {
    width: 296px;
    -webkit-align-self: normal;
    -ms-flex-item-align: normal;
    align-self: normal;
}

.avator-img {
    width: 64px;
    height: 64px;
    border-radius: 5px;
}

.content-cut {

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    line-height: 1.2em;
}
</style>


