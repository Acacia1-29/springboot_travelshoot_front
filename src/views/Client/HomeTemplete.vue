
  
  
  
<template>
    <div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Client/Home' }">站点</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row>
            <el-col :span="24">
                <el-banner-server url="/Banner/List" BindUrl="ImageUrls" BindLabel="Title"></el-banner-server>
            </el-col>

        </el-row>
        <div class="big_title">优 惠 卷 享 折 扣</div>

        <div class="coupon-list">
            <template v-for="(item) in VolumesList">
                <div class="coupon-item" @click="GetVolumes(item)">
                    <el-image style="min-width: 300px; height: 200px" :src="item.Cover" fit="fill"></el-image>

                    <div class="text-theme" style="font-size: 18px;margin-top:10px">{{ item.Name }}</div>

                </div>
            </template>
        </div>

        <div class="big_title">官 方 精 选</div>
        <el-row :gutter="10" style="margin-top:20px">
            <el-tab-pane-list url="/GoodType/List" BindKey="Id" BindTitle="Name">
                <template v-slot:Content="{ item }">
                    <el-box-image-list @SigleClick="GoodClick" url="/Good/List" BindTitle="Name" BindImageUrls="Cover"
                        :where="{ 'GoodTypeId': item.key, 'IsPutaway': true, 'IsRecommend': true }">
                        <template v-slot:bottomleft="{ row }">
                            <div style="padding:10px">
                                <div><span class="price_tag">￥</span>
                                    <span class="price_num">{{
                                        row.Price }}</span>
                                </div>
                            </div>

                        </template>
                    </el-box-image-list>
                </template>

            </el-tab-pane-list>
        </el-row>
        <el-tab-search-list v-model="where.ArticleTypeId" title="资 讯 推 荐" url="/ArticleType/List" BindName="Title"
            BindValue="Id" @select="ArticleImageListCallBack"></el-tab-search-list>
        <el-article-image-list ref="ArticleImageList" :where="where" url="/ArticleInfo/List" BindImageUrl="ImageUrls"
            BindTitle="Title" @SigleClick="ArticleClick" BindAuthor="Author" BindDateTime="CreationTime"
            BindContent="Content"></el-article-image-list>
        <div class="big_title">为 您 推 荐<span style="font-size: 15px;padding-left: 20px;">数据根据你的购买商品相似度进行推荐</span></div>
        <el-box-image-list url="/Good/Top10" BindTitle="Name" BindImageUrls="Cover" @SigleClick="BoxImageClick">
            <template v-slot:bottomleft="scope">

                <div style="padding:0px 10px;">类别:{{ scope.row.GoodTypeDto != null ? scope.row.GoodTypeDto.Name : '' }}
                </div>
                <div style="padding:10px;float: right; height: 40px;" class="text-cut">
                    <span style='color:green;padding-right:20px;'>库存:{{ scope.row.Stock }}</span>
                    <span style="color:brown">售价:{{ scope.row.Price }}</span>

                </div>

            </template>
        </el-box-image-list>
    </div>
</template>
  
<script>
import router from '@/router';
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", "userId"
        ])
    },

    data() {
        return {
            where: {
                IsPutaway: true,
                IsRecommend: true,

            },
            VolumesList: []
        };
    },
    mounted() {
        this.VolumesListApi();
    },
    methods: {
        async VolumesListApi() {
            let { Data: { Items } } = await this.$Post(`/Volumes/List`, {});
            this.VolumesList = Items;
        },
        async GetVolumes(item) {
            if (this.$comm.CheckIsLogin()) {
                let { Data: Body } = await this.$Post(`/VolumeRecord/Get`, { Id: null });
                Body.UserId = this.userId;
                Body.Behavior = "GetVolume";
                Body.VolumensId = item.Id;
                Body.IsUse = false;

                var { Success } = await this.$PostLoading(`/VolumeRecord/CreateOrEdit`, Body);
                if (Success) {
                    this.$message.success("恭喜你,成功领取了优惠卷");
                }
            }
        },
        async ArticleImageListCallBack() {
            this.$refs.ArticleImageList.Reload(this.where);
        },
        ArticleClick(item) {
            this.$router.push({
                path: `/Client/ArticleInfo`, query: {
                    ArticleInfoId: item.Id,

                }
            });
        },
        async GoodClick(row) {
            this.$router.push({
                path: `/Client/Good`, query: {
                    GoodId: row.Id,
                }
            });
        },
        BoxImageClick(row) {

            this.$router.push({
                path: `/Client/Good`, query: {
                    GoodId: row.Id,
                }
            });
        }
    }


}
</script>
  
<style lang="scss" scoped>
.coupon-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px;
    overflow: scroll;
    overflow-wrap: break-word;

    overflow: hidden;

    .coupon-item {
        width: 300px;
        margin-left: 20px;
        margin-top: 20px;
    }
}
</style>
  
  
  
 
 
 
  
  
