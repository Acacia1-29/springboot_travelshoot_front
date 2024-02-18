



<template>
    <div id="carousel" v-if="ImageUrlsArray.length > 0">

        <el-carousel :style="{ 'height': height + 'px' }" indicator-position="none" @change="swipperChange">
            <el-carousel-item :style="{ 'width': '100%', 'height': height + 'px' }" v-for="(item, index) in ImageUrlsArray"
                :key="index">
                <el-image :style="{ 'width': '100%', 'height': height + 'px' }" :src="item.url" fit="fill"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { post } from "@/utils/http";
import { FormatDateTime, ReplaceImagesHttp, GetObjectValue } from "@/utils/index";
import store from "@/store";
import { mapGetters } from "vuex";
export default {
    name: "BannerServer",
    filters: {
        FormatDateTimefilter: (value) => FormatDateTime(value),
    },
    props: {


        BindImageUrls: {
            type: String,
            default: "",
        },
        BindHeight: {
            type: String,
            default: "900"
        }



    },
    computed: {
        ...mapGetters(['name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user"]),
    },
    watch: {
        "BindImageUrls": {
            immediate: true, //该回调将会在侦听开始之后被立即调用
            handler: async function (n, o) {
                if (n) {
                    setTimeout(async () => {
                        let ImageUrlsArray = this.$comm.FullConvertUrlArray(n, ",");


                        for (var item of ImageUrlsArray) {


                            let { width, height } = await this.$comm.LoadImage(item.url);
                            item.width = width;
                            item.height = height;
                            item.src = item.url;


                        }
                        this.ImageUrlsArray = ImageUrlsArray;
                        this.height = this.ImageUrlsArray[this.activeIndex].height || this.$props.BindHeight
                        this.$forceUpdate()
                    }, 100);

                }
            }
        }
    },
    data() {
        return {
            activeIndex: 0,
            width: 0,
            height: 0,
            ImageUrlsArray: [],

        };
    },

    created() {
        this.height = this.$props.BindHeight;

    },
    methods: {
        async swipperChange(e) {
            this.activeIndex = e;
            if (this.ImageUrlsArray.length > 0 && this.ImageUrlsArray[e] != null) {

                let item = this.ImageUrlsArray[e];
                let { width, height } = await this.$comm.LoadImage(item.url);
                item.width = width;
                item.height = height;
                this.height = item.height || this.$props.BindHeight;
                this.$forceUpdate()
            }
        },

    },
};
</script>

<style scoped>
.custom-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
}

.tb-body {
    padding: 20px 0px;
}

.text-cut {

    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
}

.table-box {
    background-color: white;

    margin-top: 20px;

}
</style>






