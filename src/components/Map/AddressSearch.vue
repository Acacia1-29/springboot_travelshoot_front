
  




<template>
    <el-dialog title="地址选择" :visible.sync="show" :fullscreen="true" :lock-scroll="true">


        <div class="flex justify-end">
            <el-button type="primary" icon="el-icon-search" @click="Search">搜 索</el-button>
        </div>

        <el-form class="margin-top-xs" ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px"
            :style="`flex:1;`">

            <el-form-item label="地址名称" prop="address">
                <el-input id="place" v-model.trim="searchForm.address" placeholder="请输入地址名称"></el-input>
            </el-form-item>

        </el-form>
        <div id='mapcontainer' style="width: 100%;height: 400px;"></div>

        <div>
            <div class="flex margin-top-xs align-center justify-between" v-for="(item, index) in  addressList">
                <div><i class="el-icon-s-promotion margin-right-xs text-red"></i>{{ item.address || item.name }}</div>
                <el-button type="primary" size="mini" @click="Select(item)">选 择 地 址</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {
    post
} from "@/utils/http";
import { FormatDateTime, ReplaceImagesHttp, GetObjectValue } from "@/utils/index";
import store from "@/store";
import { mapGetters } from "vuex";
export default {

    props: {

        value: {
            type: [Number, String],
            default: ''
        },

    },
    watch: {

    },
    data() {
        return {
            searchForm: { address: "" },
            show: false,
            map: null,
            lat: 28.625051,
            lng: 116.030417,
            addressList: [],
        }
    },
    created() {

    },
    methods: {
        MapHandler() {

            var map = new qq.maps.Map(document.getElementById("mapcontainer"), {
                center: new qq.maps.LatLng(this.lat, this.lng),
                zoom: 9
            });
            this.map = map;



        },
        Show(lat, lng) {
            if (lat && lng) {
                this.lat = lat
                this.lng = lng
            }
            this.show = true
            this.searchForm.address = "";
            this.addressList = [];
            setTimeout(() => { this.MapHandler() }, 500)

        },
        Close() {
            this.show = false;

        },
        Search() {
            if (!this.searchForm.address) {
                this.$message.error("你输入你要搜索的地址名称")
                return;
            }
            let that = this;
            let map = this.map;
            var keyword = this.searchForm.address
            var searchService = new qq.maps.SearchService({
                complete: function (results) {
                    if (results.type === "CITY_LIST") {
                        searchService.setLocation(results.detail.cities[0].cityName);
                        searchService.search(keyword);
                        return;
                    }
                    var pois = results.detail.pois;
                    var latlngBounds = new qq.maps.LatLngBounds();
                    console.log(pois);
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i];
                        latlngBounds.extend(poi.latLng);
                        var marker = new qq.maps.Marker({
                            map: map,
                            position: poi.latLng
                        });


                        marker.setTitle(poi.name);
                    }
                    that.addressList = pois;
                    map.fitBounds(latlngBounds);
                }
            });
            searchService.search(keyword);
        },
        Select(e) {
            this.Close();
            this.$emit('Select', e);
        },

    }
}

</script>
<style scoped>
#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#result {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 250px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    border-radius: 7px;
    z-index: 99;
}
</style>








  
