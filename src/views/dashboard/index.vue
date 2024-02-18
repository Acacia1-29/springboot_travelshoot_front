
  

<template>
    <div class="dashboard-container">
        <el-row :gutter="10">


            <el-col :span="18">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">登录轨迹</span>
                    </div>
                    <el-calendar>
                        <template slot="dateCell" slot-scope="{date, data}">

                            <p>
                                {{ data.day.split('-').slice(1).join('-') }} {{ loginTimePeriod.indexOf(data.day) != -1 ?
                                    '已登录'
                                    : '' }}
                            </p>
                        </template>
                    </el-calendar>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">用户信息</span>
                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div>

                            <el-avatar v-if="avatar" style="width: 160px;height: 160px;" :src="avatar"></el-avatar>
                            <el-avatar v-else style="width: 160px;height: 160px;"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <div style="margin-left:40px">
                            <p style="font-weight: bold;font-size: 25px;">{{ name }}</p>
                            <p><el-tag type="success">{{ roleTypeFormat }}</el-tag></p>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <p>欢迎您的到来!</p>

                </el-card>
            </el-col>
        </el-row>



    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";

import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user"
        ])
    },
    NewUserNumberByDay: null,
    data() {
        return {
        };
    },
    mounted() {

    },
    methods: {

    }


}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>







