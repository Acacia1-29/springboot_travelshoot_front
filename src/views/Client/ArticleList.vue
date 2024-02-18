
  
  
<template>
    <div>

        <el-breadcrumb class="crumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Client/Home' }">站点</el-breadcrumb-item>
            <el-breadcrumb-item>非遗文化</el-breadcrumb-item>
        </el-breadcrumb>


        <el-tab-search-list v-model="where.ArticleTypeId" title="热门非遗文化" url="/ArticleType/List" BindName="Title"
            BindValue="Id" @select="ArticleImageListCallBack"></el-tab-search-list>
        <el-article-image-list ref="ArticleImageList" :where="where" url="/ArticleInfo/List" BindImageUrl="ImageUrls"
            BindTitle="Title" @SigleClick="ArticleClick" BindAuthor="Author" BindDateTime="CreationTime"
            BindContent="Content"></el-article-image-list>
    </div>
</template>
  
<script>
import router from '@/router';
import { mapGetters } from 'vuex'
export default {
    name: 'ArticleList',
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
        async ArticleImageListCallBack() {
            this.$refs.ArticleImageList.Reload(this.where);
        },
        ArticleClick(item) {
            this.$router.push({
                path: `/Client/ArticleInfo`, query: {
                    ArticleInfoId: item.Id,

                }
            });
        }
    }


}
</script>
  
<style lang="scss" scoped></style>
  
  
  
 
 
 
  
