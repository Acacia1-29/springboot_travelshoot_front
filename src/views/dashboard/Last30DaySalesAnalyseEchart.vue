
  

<template>
    <div class="echart" id="Last30DaySalesAnalyseEchart" :style="{ float: 'left', width: '100%', height: '500px' }">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";

export default {
    name: 'Last30DaySalesAnalyseEchart',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", 'userId'
        ])
    },
    Last30DaySalesAnalyseEchart: null,

    data() {
        return {
        };
    },
    mounted() {

        this.GetEchartApi();


    },
    methods: {

        async GetEchartApi() {

            let { Data } = await this.$Post("/OrderInfo/Last7DaySalesAnalyse", {});
            const option = {
                title: {
                    text: '最近7天销量分析'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: -90, // 设置文字方向为向下排列
                        margin: 5, // 设置文字与轴线的距离
                    },
                    data: Data.map(x => x.name)
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: Data.map(x => x.value),
                        type: 'line',
                        itemStyle: {
                            color: 'pink' // 将线条颜色设置为粉色
                        }
                    }
                ]
            };
            this.myChart = echarts.init(document.getElementById("Last30DaySalesAnalyseEchart"));// 图标初始化
            this.myChart.setOption(option);// 渲染页面
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });

        },















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







