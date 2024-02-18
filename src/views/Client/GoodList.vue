
  
  
  
<template>
    <div style="padding:10px;">

        <el-breadcrumb class="crumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Client/Home' }">站点</el-breadcrumb-item>
            <el-breadcrumb-item>母 婴 商 品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tab-search title="搜索" v-model="where.Name" @Search="GoodListCallBack"></el-tab-search>
        <el-tab-search-list v-model="where.GoodTypeId" title="分类" url="/GoodType/List" BindName="Name" BindValue="Id"
            @select="GoodListCallBack"></el-tab-search-list>

        <el-box-image-list ref="GoodListRef" url="/Good/List" BindTitle="Name" BindImageUrls="Cover" :where="where"
            @SigleClick="BoxImageClick">
            <template v-slot:bottomleft="scope">

                <div style="padding:0px 10px;">类别:{{ scope.row.GoodTypeDto != null ? scope.row.GoodTypeDto.Name : '' }}
                </div>
                <div style="padding:10px;float: right; height: 40px;" class="text-cut">
                    <span style='color:green;padding-right:20px;'>库存:{{ scope.row.Stock }}</span>
                    <span style="color:brown">售价:{{ scope.row.Price }}</span>

                </div>

            </template>
        </el-box-image-list>
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
    name: 'GoodList',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user"
        ])
    },

    data() {
        return {
            where: {
                IsPutaway: true,
            }

        };
    },
    mounted() {
    },
    methods: {
        async GoodListCallBack(e) {

            this.$refs.GoodListRef.Reload(this.where);
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
  
<style lang="scss" scoped></style>
  
  
  
  
 
 
 
  
  
