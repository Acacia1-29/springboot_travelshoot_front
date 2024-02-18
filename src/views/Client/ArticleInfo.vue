
  
<template>
    <div style="background-color: #E9E9E9;min-height: 100vh;padding:20px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Client/Home' }">站点</el-breadcrumb-item>
            <el-breadcrumb-item>非遗文化详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="detail == null">
            <el-skeleton :rows="20" animated />
        </div>
        <div v-else style="padding:0px 300px;">
            <el-row :gutter="10" style="margin-top:20px">
                <h2 style="text-align: center;">{{ detail.Title }}</h2>
                <div>
                    <p>作者:{{ detail.Author }}
                        <span style="float: right; padding: 3px 0;color: gray;">{{
                            detail.CreationTime
                        }}</span>
                    </p>

                </div>
                <div class="flex justify-end">
                    <el-button :type="CollectId > 0 ? 'warning' : ''" icon="el-icon-star-off" circle v-if="token"
                        @click="CollectApi()"></el-button>
                </div>
            </el-row>
            <el-row>


                <el-rich-content :content="detail.Content"></el-rich-content>
                <span style="float: right; padding: 3px 0;" class="text-theme" @click="AddArticleInfoLikeApi()"
                    v-if="token">给 它 点 赞 !</span>
            </el-row>
            <el-divider></el-divider>

            <el-input type="textarea" :rows="4" placeholder="请文明发文" v-model="CommentContent">
            </el-input>
            <el-button style="margin-top:10px" type="primary" :disabled="CommentContent == ''" @click="SendContent">发
                送</el-button>

            <div style="color:#B9843F;font-size: 20px;margin-top:10px">共 {{ TotalCount }} 条评论</div>
            <div v-for="(item, index) in CommentList">
                <div style="display: flex;margin-top:10px">
                    <div>
                        <el-image :src="item.CreatorAppUserDto && item.CreatorAppUserDto.ImageUrls"
                            style="width:60px;height: 60px;">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline" style="font-size: 50px;"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="margin-left-xs">
                        <div style="font-size: 20px;">{{ item.CreatorAppUserDto && item.CreatorAppUserDto.Name }}

                        </div>
                        <div style="margin-top:10px"><span>{{ item.Content }}</span> </div>
                        <div style="margin-top:10px;color:#B9843F">{{ item.CreationTime }}
                            <span style="float: right;color:red;padding-left:10px" v-if="item.CreatorId == userId"
                                @click="DeleteComment(item.Id)">删 除</span>
                        </div>
                    </div>
                </div>

            </div>
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
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user", 'token'
        ])
    },

    data() {
        let now = this.$moment().format('YYYY-MM-DD');
        return {
            now: now,
            activeName: 'first',
            where: {
                IsPutaway: true,
            },
            detail: null,
            CommentList: [],//评论的列表
            CommentContent: "",//评论的内容
            CollectId: 0,//收藏的ID ID>0说明未收藏
        };
    },
    mounted() {
        this.GetDetail();
        this.GetCommentApi();
    },
    methods: {
        async GetDetail() {
            let { Data } = await this.$Post(`/ArticleInfo/Get`, { Id: this.$route.query.ArticleInfoId });

            setTimeout(() => {
                this.detail = Data;
                this.GetIsCollect();
            }, 200);

        },
        //进行点赞
        async AddArticleInfoLikeApi() {
            if (this.userId > 0) {
                let { Data }
                    = await this.$Post(`/ArticleInfoLike/CreateOrEdit`,
                        { ArticleInfoId: this.$route.query.ArticleInfoId, LikeUserId: this.userId });
                this.$message.success('感谢你的支持!');
            }
        },
        //获取评论
        async GetCommentApi() {
            let { Data: { Items, TotalCount } } = await this.$Post(`/ArticleInfoComment/List`, { ArticleInfoId: this.$route.query.ArticleInfoId });
            this.TotalCount = TotalCount;
            this.CommentList = Items;
        },
        //发送评论
        async SendContent() {
            if (this.$comm.CheckIsLogin()) {
                let { Data } = await this.$Post(`/ArticleInfoComment/Get`, {});
                Data.Content = this.CommentContent;
                Data.ArticleInfoId = this.$route.query.ArticleInfoId;
                Data.NickName = this.name;
                Data.HeadImage = this.avatar;
                var { Success } = await this.$PostLoading(`/ArticleInfoComment/CreateOrEdit`, Data);
                this.CommentContent = "";
                this.$message.success("发表成功")
                this.GetCommentApi();
            }
        },
        //删除自己的评论
        async DeleteComment(Id) {
            await this.$PostDelete(`/ArticleInfoComment/Delete`, { Id: Id });
            this.GetCommentApi();
        },
        //获取当前是否收藏
        async GetIsCollect() {
            if (this.token) {
                let { Data: { Items, TotalCount } } = await this.$Post(`/ArticleInfoCollect/List`, { ArticleInfoId: this.$route.query.ArticleInfoId, CollectUserId: this.userId });
                this.CollectId = TotalCount > 0 ? Items[0].Id : 0;
            }
        },
        //进行收藏
        async CollectApi() {
            if (this.CollectId == 0) {
                //进行添加
                let { Data } = await this.$PostLoading(`/ArticleInfoCollect/CreateOrEdit`, { ArticleInfoId: this.$route.query.ArticleInfoId, CollectUserId: this.userId });
                this.CollectId = Data.Id;
                this.$message.success("收藏成功!");
            }
            else {
                //进行删除
                await this.$PostLoading(`/ArticleInfoCollect/Delete`, { Id: this.CollectId });
                this.CollectId = 0;
                this.$message.error("取消收藏!");
            }
        }

    }


}
</script>

<style lang="scss" scoped></style>









