
  
  
<template>
    <div style="padding:20px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Client/Home' }">站点</el-breadcrumb-item>
            <el-breadcrumb-item>母 婴 商 品 详 情</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="detail == null">
            <el-skeleton :rows="20" animated />
        </div>
        <div v-else>
            <el-row :gutter="10" style="margin-top:20px;padding:10px 0px">
                <el-col :span="18">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>商 品 详 情</span>

                        </div>
                        <div style="display: flex;">
                            <div>
                                <el-magnifier :width="320" :height="320" :minIMGsrc="active_pic" :scale="3"></el-magnifier>
                                <el-row class="smallPic">
                                    <el-col v-for="(item, i) in detail.ImageUrlsArray" :key="i"
                                        :class="{ 'active_pic': (active_pic === item.url) }">
                                        <el-image lazy @click="changeItem(item)" :src="item.url"></el-image>
                                    </el-col>
                                </el-row>
                            </div>

                            <div style="padding:10px 20px">
                                <div v-if="detail.GoodTypeDto != null" style="font-size: 25px;">类型 > {{
                                    detail.GoodTypeDto.Name }}</div>
                                <div style="font-size: 40px;font-weight: bold;margin-top:15px;">{{ detail.Name }}</div>
                                <div style="margin-top:15px;font-size: 35px;">单位:{{ detail.Unit }}</div>
                                <div style="margin-top:15px;font-size: 45px;">库存:{{ detail.Stock }}</div>
                                <div style="margin-top:15px;font-size: 55px;color:rgb(188, 31, 31)">售价:{{ detail.Price }}
                                </div>
                                <div style="margin-top:10px"> <el-button @click="ToBuyCard" type="primary">加 入 购 物
                                        车</el-button></div>
                            </div>
                        </div>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="商品详情" name="tab1">
                                <div> <el-rich-content :content="detail.Content"></el-rich-content>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品属性" name="tab2">
                                <el-descriptions class="margin-top" title="商品所有属性" :column="4">
                                    <template v-for="(item, index) in GoodPropsList">
                                        <el-descriptions-item :label="item.PropName">{{ item.PropValue
                                        }}</el-descriptions-item>

                                    </template>

                                </el-descriptions>
                            </el-tab-pane>
                            <el-tab-pane label="用户评价" name="tab3">
                                <div class="box">
                                    <div v-for="(item, index) in CommentList" class="item">
                                        <div>
                                            <el-image style="width: 100px; height: 100px"
                                                :src="item.CreatorAppUserDto.ImageUrls" fit="cover"></el-image>
                                        </div>
                                        <div style="padding-left:20px;flex:1">
                                            <div style="font-weight: bolder;font-size: 24px;">{{ item.CreatorAppUserDto.Name
                                            }}</div>
                                            <div class="cotent-warp">
                                                <div class="content-cut">{{
                                                    item.OrderInfoDto.Comment ||
                                                    '这个家伙什么也没留下' }}
                                                </div>

                                            </div>

                                        </div>

                                        <el-divider></el-divider>
                                    </div>

                                </div>
                            </el-tab-pane>

                        </el-tabs>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="min-height: 100vh;">
                        <div slot="header" class="clearfix">
                            <span>精 选 推 荐</span>

                        </div>

                        <el-col :span="24" style="margin-bottom: 10px;" v-for="(item, index) in GoodList" :key="item.Id"
                            :offset="0">
                            <el-card style="width: 100%;" :body-style="{ padding: '0px' }">
                                <img style="width:100%" :src="item.Cover" class="image" @click="BoxImageClick(item.Id)">
                                <div style="padding: 14px;" @click="BoxImageClick(item.Id)">
                                    <span>{{ item.Name }}</span>

                                </div>
                            </el-card>
                        </el-col>
                    </el-card>
                </el-col>
            </el-row>


        </div>


    </div>
</template>
  
<script>
import router from '@/router';
import { mapGetters } from 'vuex'
export default {
    name: 'ArticleInfo',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user"
        ])
    },

    data() {
        let now = this.$moment().format('YYYY-MM-DD');
        return {
            now: now,
            activeName: 'tab1',
            where: {
                IsPutaway: true,
            },
            detail: null,
            active_pic: "",
            GoodList: [],
            CommentList: [],
            GoodPropsList: []
        };
    },
    mounted() {
        this.GetDetail();
        this.GetGoodListApi();
        this.GetOrderDetInfoListApi();
        this.GetGoodPropsListApi();

    },
    methods: {
        changeItem(item) {
            this.active_pic = item.url
        },
        async GetDetail() {
            let { Data } = await this.$Post(`/Good/Get`, { Id: this.$route.query.GoodId });
            Data.ImageUrlsArray = this.$comm.FullConvertUrlArray(Data.ImageUrls, ",");
            this.active_pic = Data.ImageUrlsArray[0].url;
            setTimeout(() => {
                this.detail = Data;
            }, 200);

        },
        async GetGoodListApi() {
            let { Data: { Items } } = await this.$Post(`/Good/Top10`, {});
            this.GoodList = Items
        },

        async ToBuyCard(item) {
            if (this.$comm.CheckIsLogin()) {
                let { Data } = await this.$Post(`/BuyCard/Get`, {});
                Data.GoodId = this.$route.query.GoodId;
                Data.UserId = this.userId;
                var { Success } = await this.$PostLoading(`/BuyCard/CreateOrEdit`, Data);
                if (Success) {
                    this.$message.success("成功加入购物车了");

                }
            }
        },
        async GetGoodPropsListApi() {
            let { Data: { Items } } = await this.$Post(`/GoodProps/List`, { GoodId: this.$route.query.GoodId });
            this.GoodPropsList = Items;
        },
        async GetOrderDetInfoListApi() {
            let { Data: { Items } } = await this.$Post(`/OrderDetail/List`, { GoodId: this.$route.query.GoodId });
            this.CommentList = Items.filter(x => x.OrderInfoDto != null && x.OrderInfoDto.Comment != null);
        },
        BoxImageClick(Id) {

            this.$router.push({
                path: `/Client/Good`, query: {
                    GoodId: Id,
                }
            });
            window.location.reload();
        }

    }


}
</script>
  
<style lang="scss" scoped>
//  缩略图
.smallPic {
    width: 320px;
    height: 64px;
    overflow: hidden;

    .el-col {
        height: 64px;
        width: 20%;
        box-sizing: border-box;
        cursor: pointer;

        .el-image__inner {
            border-radius: 0;
        }
    }

    .active_pic {
        border: 1px solid orange;
    }
}

.item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.cotent-warp {
    margin-top: 10px;
    padding: 20px;
    background-color: aliceblue;
    border-radius: 10px;
}

.content-cut {

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;


}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 100%;
    border-radius: 10px;

}
</style>
  
  
 
  
 
 
 
  
