<template>
    <div>

        <el-form ref="form" :model="form" label-width="120px">
            <h4 style="padding:20px;color:red">
                用户提示：系统会通过默认的5种风格primary(主要),success(成功),info(信息),warning(警告),danger(危险),text(信息)
            </h4>
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-form-item label="primary">
                        <el-theme-change :theme="theme.primary" @colorPicker="colorPicker"></el-theme-change>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="success">
                        <el-theme-change :theme="theme.success"></el-theme-change>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="info">
                        <el-theme-change :theme="theme.info"></el-theme-change>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="warning">
                        <el-theme-change :theme="theme.warning"></el-theme-change>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="danger">
                        <el-theme-change :theme="theme.danger"></el-theme-change>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="text">
                        <el-theme-change :theme="theme.text"></el-theme-change>
                    </el-form-item>
                </el-col>


            </el-row>
            <h4 style="padding:20px;color:red">用户提示:表格样式</h4>
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-form-item label="表头背景">
                        <el-color-picker v-model="theme.headercellbg" @change="headercellbgChange" class="theme-picker"
                            size="small" popper-class="theme-picker-dropdown" />

                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="表头字体颜色">
                        <el-color-picker v-model="theme.headercellcolor" @change="headercellcolorChange"
                            class="theme-picker" size="small" popper-class="theme-picker-dropdown" />

                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="表格边框">
                        <el-switch v-model="theme.tableborder">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="表格斑马纹">
                        <el-switch v-model="theme.tablestripe">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <h4 style="padding:20px;color:red">用户提示:系统背景色</h4>
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-form-item label="全局背景">
                        <el-color-picker v-model="theme.appmainbgcolor" @change="appmainbgcolorChange" class="theme-picker"
                            size="small" popper-class="theme-picker-dropdown" />

                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="navBar背景">
                        <el-color-picker v-model="theme.navbarbgcolor" @change="navbarbgcolorChange" class="theme-picker"
                            size="small" popper-class="theme-picker-dropdown" />

                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>

    </div>
</template>
  
<script>
import {
    post
} from "@/utils/http";
import {
    Debounce
} from "@/utils/index"
import store from "@/store";
import { mapGetters } from "vuex";
export default {

    props: {


    },
    watch: {

    },
    computed: {
        ...mapGetters(["theme"]),
    },

    data() {
        return {
            drawer: false,

        }
    },

    created() {

        console.log(this.theme);

    },
    methods: {
        colorPicker(color) {
            this.$store.dispatch('theme/SetPrimary', color).then((res) => {


            }).catch(() => {

            })
        },
        headercellbgChange(color) {

            this.$store.dispatch('theme/SetValue', { 'propName': 'headercellbg', 'value': color })
        },

        headercellcolorChange(color) {

            this.$store.dispatch('theme/SetValue', { 'propName': 'headercellcolor', 'value': color })
        },
        appmainbgcolorChange(color) {
            this.$store.dispatch('theme/SetValue', { 'propName': 'appmainbgcolor', 'value': color })

        },
        navbarbgcolorChange(color) {
            this.$store.dispatch('theme/SetValue', { 'propName': 'navbarbgcolor', 'value': color })

        },
        async ShowDrawer() {
            this.drawer = true;

        },

    }
}

</script>
  