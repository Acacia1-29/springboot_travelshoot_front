
  

<template>
    <div class="dashboard-container">

        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="24">
                <InventoryAnalyseEchart></InventoryAnalyseEchart>
            </el-col>
            <el-col :span="24" style="margin-top: 20px;">
                <GoodSalesAnalyseEchart></GoodSalesAnalyseEchart>
            </el-col>
            <el-col :span="12" style="margin-top: 20px;">
                <GoodTypeSalesAnalyseEchart></GoodTypeSalesAnalyseEchart>
            </el-col>
            <el-col :span="12">
                <GoodTypeAnalyseEchart></GoodTypeAnalyseEchart>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";
import InventoryAnalyseEchart from "@/views/dashboard/InventoryAnalyseEchart.vue"
import GoodSalesAnalyseEchart from "@/views/dashboard/GoodSalesAnalyseEchart.vue"
import GoodTypeSalesAnalyseEchart from "@/views/dashboard/GoodTypeSalesAnalyseEchart.vue"
import GoodTypeAnalyseEchart from "@/views/dashboard/GoodTypeAnalyseEchart.vue"



export default {
    name: 'GoodAnalyse',
    components: {
        InventoryAnalyseEchart,
        GoodSalesAnalyseEchart,
        GoodTypeSalesAnalyseEchart,
        GoodTypeAnalyseEchart
    },
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", 'userId'
        ])
    },
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







