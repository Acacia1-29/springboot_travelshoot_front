
  

<template>
    <div class="dashboard-container">

        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="12">
                <PayTypeAnalyseEchart></PayTypeAnalyseEchart>
            </el-col>
            <el-col :span="12" style="margin-top: 20px;">
                <OrderStatusAnalyseEchart></OrderStatusAnalyseEchart>
            </el-col>
            <el-col :span="24" style="margin-top: 20px;">
                <Last7DaySalesAnalyseEchart></Last7DaySalesAnalyseEchart>
            </el-col>
            <el-col :span="24">
                <Last30DaySalesAnalyseEchart></Last30DaySalesAnalyseEchart>
            </el-col>



        </el-row>






    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";
import PayTypeAnalyseEchart from "@/views/dashboard/PayTypeAnalyseEchart.vue"
import OrderStatusAnalyseEchart from "@/views/dashboard/OrderStatusAnalyseEchart.vue"
import Last7DaySalesAnalyseEchart from "@/views/dashboard/Last7DaySalesAnalyseEchart.vue"
import Last30DaySalesAnalyseEchart from "@/views/dashboard/Last30DaySalesAnalyseEchart.vue"



export default {
    name: 'OrderAnalyse',
    components: {
        PayTypeAnalyseEchart,
        OrderStatusAnalyseEchart,
        Last7DaySalesAnalyseEchart,
        Last30DaySalesAnalyseEchart
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







