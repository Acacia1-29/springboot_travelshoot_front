<template>
    <el-tooltip effect="dark" content="theme" placement="bottom">
        <el-color-picker @change="colorPicker" v-model="theme" class="theme-picker" size="small"
            popper-class="theme-picker-dropdown" />
    </el-tooltip>
</template>
  
<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
import store from '@/store';
import { mapGetters } from "vuex";
import { replaceColor } from "@/utils/theme-color"
export default {

    props: {
        theme: {
            type: String,
            default: "#409EFF"
        }
    },
    computed: {
        ...mapGetters(["style"]),
    },
    data() {
        return {
            chalk: '', // content of theme-chalk css
            //theme: ORIGINAL_THEME
        }
    },
    watch: {
        theme(val, oldVal) {

            replaceColor(val, oldVal);
        }
    },

    methods: {
        colorPicker(e) {

            this.$emit("colorPicker", e)
        }
    }
}
</script>