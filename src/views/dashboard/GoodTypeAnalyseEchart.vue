
  

<template>
    <div class="echart" id="GoodTypeAnalyseEchart" :style="{ float: 'left', width: '100%', height: '500px' }">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts";

export default {
    name: 'GoodTypeAnalyseEchart',
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", 'userId'
        ])
    },
    GoodTypeAnalyseEchart: null,

    data() {
        return {
        };
    },
    mounted() {
        this.GetEchartApi();
    },
    methods: {

        async GetEchartApi() {
            let { Data } = await this.$Post("/OrderInfo/GoodTypeAnalyse", {});
            const option = {
                title: {
                    text: '商品类别占比',

                },
                tooltip: {
                    trigger: 'item'
                },

                legend: {
                    top: '5%',
                    left: 'center'
                },
                feature: {
                    saveAsImage: { show: true },  // 保存图表
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: Data
                    }
                ]
            };
            this.myChart = echarts.init(document.getElementById("GoodTypeAnalyseEchart"));// 图标初始化
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







