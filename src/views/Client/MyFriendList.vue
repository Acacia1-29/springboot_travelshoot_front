
  

<template>
    <div>
        <div class="Topstory-container">
            <div class="Topstory-mainColumn">

                <div class="chat flex  ">
                    <div class="bar padding-xs">
                        <div>
                            <img :src="avatar" style="width:40px;height: 40px;border-radius: 5px;">
                        </div>
                        <div class="margin-top-sm text-center text-xs"><i class="el-icon-message-solid "
                                :class="active == 0 ? 'text-green' : 'text-white'" @click="tabChange(0)"></i>
                        </div>
                        <div class="margin-top-sm text-center text-xs"><i class="el-icon-user-solid"
                                :class="active == 1 ? 'text-green' : 'text-white'" @click="tabChange(1)"></i></div>
                    </div>
                    <template v-if="active == 0">
                        <div class="chat-list bg-white" style="width: 200px;">
                            <div v-for="(item, index) in ChatTabulationList" @click="SelectFriendChatBtn(item)">
                                <div class="padding-xs flex align-center pointer"
                                    :class="SelectChatFrined != null && SelectChatFrined.Id == item.FriendUserId ? 'active' : ''">
                                    <img :src="item.FriendUserDto.ImageUrls"
                                        style="width:50px;height: 50px;border-radius: 5px;">
                                    <div class="padding-left-xs flex-sub">
                                        <div class="flex justify-between "> <span class=" flex-sub text-bold text-black">{{
                                            item.FriendUserDto.Name
                                        }}</span>
                                            <div class="wait_msg " v-if="item.WaitReadMsgCount > 0"><span>{{
                                                item.WaitReadMsgCount }}</span></div>
                                        </div>
                                        <div class="new_content">{{ item.News }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-window flex-sub">
                            <div v-if="SelectChatFrined != null" class="" style="width:100%;height:100%;">
                                <div class="padding-xs solid-bottom chat-header">{{ SelectChatFrined.Name }}</div>
                                <div class="chat-content-list">
                                    <template v-for="(item) in ChatContentList">
                                        <div class="chat-content-item">
                                            <!--选中的好友是发送人-->
                                            <div v-if="SelectChatFrined.Id == item.SendUserId"
                                                class="flex  padding-top-xs ">
                                                <div class="margin-right-xs">
                                                    <img :src="item.SendUserDto.ImageUrls"
                                                        style="width:40px;height: 40px;border-radius: 5px;">
                                                </div>
                                                <div>
                                                    <div class="text-left">{{ item.SendUserDto.Name }}</div>
                                                    <div class="content ">{{ item.Content }}</div>
                                                </div>

                                            </div>
                                            <div v-else class="flex justify-end padding-top-xs ">
                                                <div>
                                                    <div class="text-right">{{ item.SendUserDto.Name }}</div>
                                                    <div class="self-content  ">{{ item.Content }}</div>
                                                </div>
                                                <div class="margin-left-xs">
                                                    <img :src="item.SendUserDto.ImageUrls"
                                                        style="width:40px;height: 40px;border-radius: 5px;">
                                                </div>

                                            </div>
                                        </div>
                                        <div class="margin-top-xs text-center text-gray">{{ item.CreationTime }}</div>
                                    </template>
                                </div>
                                <div class="send-bottom solid-top ">

                                    <el-input type="textarea" min="1" rows="7" max="10000" clearable autofocus resize="none"
                                        class="input-content" placeholder="请输入..." v-model="WaitSeedContent">
                                    </el-input>
                                    <div class="flex justify-end align-center padding-right-xs padding-bottom-xs">
                                        <el-button class="" size="mini" @click="this.WaitSeedContent == ''">清空</el-button>
                                        <el-button class="" type="primary" size="mini" :disabled="!WaitSeedContent"
                                            @click="SendMessageToFriend()">发送</el-button>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </template>
                    <template v-if="active == 1">
                        <div class="chat-list bg-white" style="width: 200px;">
                            <div v-for="(item, index) in MyFriendList" @click="SelectFriendBtn(item)">
                                <div class="padding-xs flex align-center pointer"
                                    :class="SelectFriend != null && SelectFriend.Id == item.FriendUserId ? 'active' : ''">
                                    <img :src="item.FriendUserDto.ImageUrls"
                                        style="width:50px;height: 50px;border-radius: 5px;">
                                    <span class="padding-left-xs text-bold text-black">{{ item.FriendUserDto.Name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="chat-window flex-sub">
                            <div v-if="SelectFriend != null" class="flex-direction flex justify-center align-center"
                                style="width:100%;height:100%;">
                                <img :src="SelectFriend.ImageUrls" style="width:100px;height: 100px;border-radius: 5px;">
                                <div class="margin-top-sm">{{ SelectFriend.Name }}</div>
                                <el-button class="margin-top-sm" type="primary" size="mini"
                                    @click="AddMessageList()">发送消息</el-button>
                            </div>

                        </div>
                    </template>
                </div>


            </div>
            <div class="side">
                <div v-if="SelectChatFrined != null">
                    <RelativeAuthorCard :UserId="SelectChatFrined.Id"></RelativeAuthorCard>
                    <RecommendAuthorTopicCard :UserId="SelectChatFrined.Id"></RecommendAuthorTopicCard>
                </div>
            </div>

        </div>


    </div>
</template>

<script>

import router from '@/router';
import { mapGetters } from 'vuex'
import RelativeAuthorCard from "@/views/Client/RelativeAuthorCard.vue"
import RecommendAuthorTopicCard from "@/views/Client/RecommendAuthorTopicCard.vue"

export default {
    name: 'Home',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", 'userId'
        ])
    },
    components: {
        RelativeAuthorCard,
        RecommendAuthorTopicCard
    },
    data() {
        return {
            active: 0,
            MyFriendList: [],
            SelectFriend: null,
            ChatTabulationList: [],
            SelectChatFrined: null,
            WaitSeedContent: "",
            ChatContentList: [],
            stop: false

        };
    },
    watch: {
        "active": function (n, o) {
            if (n == o) {
                return;
            }
            if (n == 0) {
                this.MyChatTabulationListApi();

            }
            else {
                this.MyFriendListApi();
            }
            this.SelectFriend = null;
        },
    },
    mounted() {

        this.MyChatTabulationListApi();
        this.TimingGetMessage();
        this.TimingMyChatTabulation();
    },
    beforeDestroy() {
        this.stop = true;
    },
    methods: {
        //我的好友列表
        async MyFriendListApi() {
            let { Data: { Items } } = await this.$Post(`/MyFriend/List`, { UserId: this.userId });
            this.MyFriendList = Items;
        },
        //我最聊天列表
        async MyChatTabulationListApi() {
            let { Data } = await this.$Post(`/ChatTabulation/MyChatTabulationList`, { UserId: this.userId });
            this.ChatTabulationList = Data;

        },
        //每个1s获取我的聊天列表
        async TimingMyChatTabulation() {
            setTimeout(async () => {
                if (this.stop) {
                    return;
                }
                if (this.active == 1) {
                    await this.TimingMyChatTabulation();
                    return;
                }
                await this.MyChatTabulationListApi();
                await this.TimingMyChatTabulation();


            }, 1000);
        },


        async tabChange(e) {
            this.active = e;

        },

        //选中好友
        async SelectFriendBtn(item) {
            this.SelectFriend = item.FriendUserDto;
        },
        //添加好友到当前的聊天列表当中
        async AddMessageList() {
            let { Data } = await this.$Post(`/ChatTabulation/SyncChatTabulation`, {
                UserId: this.userId,
                FriendUserId: this.SelectFriend.Id,
                News: '',
                WaitReadMsgCount: 0,
                Type: 0,
            });
            this.active = 0;
        },
        //选择和那个好友进行聊天
        async SelectFriendChatBtn(item) {
            this.SelectChatFrined = null;
            setTimeout(() => {
                this.SelectChatFrined = item.FriendUserDto;
                this.GetChatRecordListApi();
            }, 100);


        },
        //和某个好友进行消息发话
        async SendMessageToFriend() {
            let { Data } = await this.$Post(`/ChatRecord/CreateOrEdit`, {
                SendUserId: this.userId,
                ReceiveUserId: this.SelectChatFrined.Id,
                Content: this.WaitSeedContent,
                IsAllRead: false,
            });
            this.$message.success("消息发送成功");
            this.WaitSeedContent = null;
        },
        //每个1s获取和目标聊天的最新消息
        async TimingGetMessage() {
            setTimeout(async () => {
                if (this.stop) {
                    return;
                }
                if (this.SelectChatFrined == null) {
                    await this.TimingGetMessage();
                    return;
                }
                await this.GetChatRecordListApi();
                await this.TimingGetMessage();


            }, 1000);
        },
        //我最聊天记录Api
        async GetChatRecordListApi() {
            let { Data } = await this.$Post(`/ChatRecord/GetChatRecordList`, { SendUserId: this.userId, ReceiveUserId: this.SelectChatFrined.Id });
            if (Data.length != this.ChatContentList) {
                this.ChatContentList = Data;
            }

        },


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

.chat {
    height: 600px;
    -webkit-box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    -webkit-box-sizing: border-box;
}

.bar {
    background-color: #1D232A;
    width: 60px;
    height: 100%;
}

.chat-list {
    background-color: #EFEFEF;
    overflow: scroll;

    .active {
        background-color: #D9D9D9;
    }

    .new_content {
        font-size: 13px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;

        line-height: 1.2em;

    }

    .wait_msg {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: red;
        border-radius: 30%;
        width: 10px;
        height: 10px;
        padding: 7px;
        font-size: 14px;
        color: white;
    }
}



.chat-window {
    background-color: #F4F4F4;
    height: 600px;
    position: relative;

    .chat-header {
        height: 30px;
    }

    .chat-content-list {
        height: 360px;
        overflow: scroll;

        .chat-content-item {}

        .content {
            background-color: white;
            padding: 10px;
            border-radius: 5px;
            max-width: 250px;
            line-height: 1.3;
            position: relative;
        }

        .content:before {
            content: " ";
            position: absolute;
            top: 6px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            left: auto;
            left: -4px;
            border-left: none;
            border-right-color: white;
        }

        .self-content {
            background-color: #35D863;
            padding: 10px;
            border-radius: 5px;
            max-width: 250px;
            line-height: 1.3;
            text-align: right;
            position: relative;
        }

        .self-content:before {
            content: " ";
            position: absolute;
            top: 6px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            left: auto;
            right: -4px;
            border-right: none;
            border-left-color: #35d863;
        }

    }

    .send-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 210px;
        background-color: rgb(239, 239, 239);

        .input-content {
            height: 170px;
        }
    }
}
</style>







