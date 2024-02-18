
<template>
    <div style="padding:0px 200px;">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">订单确认</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-drawer title="收货地址选择" :visible.sync="editorShow" size="80%" direction="ttb">
            <data-table ref="tableId" url="/UserAddress/List" :column="dataColum" :where="{ UserId: userId }">

                <template v-slot:operate="scope">
                    <el-button type="text" @click="SelectAddress(scope.row)">选 择</el-button>

                </template>
            </data-table>
        </el-drawer>
        <el-card class="box-card" style="margin-top:20px">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
                <div style="margin:10px 10px;float: right;"> <el-button @click="editorShow = true" size="mini"
                        type="primary">选 择 收 货 地
                        址</el-button>
                </div>
            </div>



            <el-form ref="editModalForm" :rules="editModalFormRules" :model="formData" label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="联系人" prop="LinkName">
                            <el-input v-model.trim="formData.LinkName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="电话" prop="Phone">
                            <el-input v-model.trim="formData.Phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址" prop="Address">
                            <el-input v-model.trim="formData.Address" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="Remark">
                            <el-input type="textarea" :rows="4" v-model.trim="formData.Remark"
                                placeholder="如有特殊需要请备注!"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

        </el-card>

        <el-card class="box-card" style="margin-top:20px">
            <div slot="header" class="clearfix">
                <span>订 单 明 细</span>

            </div>
            <el-table :data="formData.OrderDetailDtos" style="width: 100%;margin-top:20px">
                <el-table-column prop="GoodName" label="商品名称" width="250">
                </el-table-column>

                <el-table-column prop="GoodImageUrls" label="图片">
                    <template slot-scope="scope">
                        <el-image style="width: 100px;" :src="scope.row.GoodImageUrls" fit="fit"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="Price" label="价格">
                </el-table-column>

                <el-table-column prop="Number" label="购买数量" width="200px">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入数量" @input="BindInput" v-model="scope.row.Number" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="Remove(scope.row.GoodId)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <el-card class="box-card" style="margin-top:20px">
            <div slot="header" class="clearfix">
                <span>我 的 优 惠 卷</span>

            </div>
            <el-table :data="formData.VolumeRecordDtos" style="width: 100%;margin-top:20px">
                <el-table-column prop="Name" label="优惠卷名称" width="150">
                    <template slot-scope="scope">
                        {{ scope.row.VolumensDto && scope.row.VolumensDto.Name }}
                    </template>
                </el-table-column>

                <el-table-column prop="GoodImageUrls" label="图片">
                    <template slot-scope="scope">
                        <el-image style="width: 100px;" :src="scope.row.VolumensDto && scope.row.VolumensDto.Cover"
                            fit="fit"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="Price" label="优惠金额">
                    <template slot-scope="scope">
                        减免{{ scope.row.VolumensDto && scope.row.VolumensDto.Money }}
                    </template>
                </el-table-column>
                <el-table-column prop="Price" label="使用条件">
                    <template slot-scope="scope">
                        >={{ scope.row.VolumensDto && scope.row.VolumensDto.MoneyCondition }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="Use(scope.row)">{{ scope.row.IsUse ? "未使用" : "使用" }}</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

        <el-card class="box-card" style="margin-top:20px;">
            <div slot="header" class="clearfix">
                <span>支付方式</span>
            </div>
            <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
                <div v-for="(item, index) in payList" style="margin-left:80px;padding:20px;"
                    :style="payActive == index ? 'border:1px solid red' : ''" @click="SelectPay(index)">
                    <el-image style="width: 200px; height: 100px" :src="item.url" :fit="fit"></el-image>
                </div>
            </div>
            <el-row
                style="margin-top:20px;margin-bottom: 20px;display: flex;flex-direction: row;justify-content: space-evenly;">
                <div style="flex:1"><span class="price_tag" style="font-size:52px">总金额 </span><span class="price_num"
                        style="font-size: 52px;padding-left:20px">￥{{
                            totalMoney }}-{{ volumeMoney }}={{ payMoney }}</span>
                </div>
                <div> <el-button type="success" @click="Submit()" v-if="formData.OrderDetailDtos.length != 0">我 要 支
                        付</el-button></div>

            </el-row>

        </el-card>

    </div>
</template>
  
<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import router from '@/router';
import UserAddressList from "../Admin/UserAddressList.vue";
import {
    mapGetters
} from "vuex";

export default {
    name: "good",
    components: {
        tinymce: Tinymce,
        UserAddressList
    },

    data() {
        return {
            id: "",
            editorShow: false,
            dataColum: [
                {
                    key: "Id",
                    hidden: true,

                },
                {
                    key: "Privoce",
                    title: "省",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "City",
                    title: "城",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Zoom",
                    title: "区",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Address",
                    title: "详细地址",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "LinkName",
                    title: "收货人",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Phone",
                    title: "收货电话",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "UserId",
                    hidden: true,
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],

            formData: {
                LinkName: "",
                Phone: "",
                Address: "",
                Remark: "",
                OrderDetailDtos: [],
                VolumeRecordDtos: []
            },
            editModalFormRules: {
                LinkName: [{
                    required: true,
                    message: "请输入联系人",
                    trigger: "blur"
                }],
                Phone: [{
                    required: true,
                    message: "请输入电话",
                    trigger: "blur"
                }],
                Address: [{
                    required: true,
                    message: "请输入地址",
                    trigger: "blur"
                }],


            },
            totalMoney: 0,
            volumeMoney: 0,
            payMoney: 0,
            lock: 0,
            payActive: undefined,
            payList: [{
                name: "支付宝",
                url: require("@/assets/pay1.jpeg")
            },
            {
                name: "银联",
                url: require("@/assets/pay2.jpg")
            },
            {
                name: "微信支付",
                url: require("@/assets/pay3.jpeg")
            },
            {
                name: "云闪付",
                url: require("@/assets/pay4.jpg")
            }

            ],



        };
    },
    computed: {
        ...mapGetters(["name", "token", "userId", "avatar", "shopId", "roleId"]),
    },
    created() {


        var details = JSON.parse(localStorage.getItem("details"))
        let orderList = [];
        details.forEach((x) => {

            orderList.push({
                GoodName: x.GoodDto.Name,
                GoodImageUrls: x.GoodDto.Cover,
                GoodId: x.GoodId,
                Price: x.GoodDto.Price,
                Stock: x.GoodDto.Stock,
                Number: 1,

            });
        })
        this.formData.OrderDetailDtos = orderList;
        this.GetMyVolumeRecordApi();
        this.CaculateTotalMoney();
    },
    methods: {
        /**
         * 选择支付方式
         * @param {} index 
         */
        SelectPay(index) {
            this.payActive = index;
        },
        /**
         * 选择地址
         * @param {*} item 
         */
        SelectAddress(item) {
            this.editorShow = false;
            this.formData.LinkName = item.LinkName;
            this.formData.Phone = item.Phone;
            this.formData.Address = item.Address;
        },


        /**
         * 移除某个商品
         * @param {} goodId 
         */
        async Remove(goodId) {
            this.formData.OrderDetailDtos = this.formData.OrderDetailDtos.filter(x => x.GoodId != goodId);
            this.CaculateTotalMoney();
        },

        /**
         * 提交支付
         */
        async Submit() {

            this.$refs.editModalForm.validate(async valid => {
                if (valid) {

                    if (this.payActive == undefined) {
                        this.$message.error('没有选择支付方式');

                        return;
                    }
                    this.formData.PayType = this.payList[this.payActive].name;
                    this.formData.Behavior = "ToOrder";
                    this.formData.BuyUserId = this.userId;
                    this.formData.OrderStatus = 1;
                    var {
                        Success
                    } = await this.$Post(`/OrderInfo/CreateOrEdit`, this.formData);


                    if (Success) {
                        this.$message.success("支付成功!");
                        router.push({
                            path: "/client/OrderMy",
                            query: {}
                        })
                    }
                }
            })
        },
        async CaculateTotalMoney() {
            let totalMoney = 0;
            let OrderDetailDtos = this.formData.OrderDetailDtos;
            if (Array.isArray(OrderDetailDtos) && OrderDetailDtos.length > 0) {
                OrderDetailDtos.forEach((item) => {
                    if (isNaN(item.Number) == false) {
                        let v = item.Number * item.Price;
                        if (v > 0) {
                            totalMoney += parseFloat(v);
                        }
                    }
                })
            }
            this.totalMoney = totalMoney;
            if (this.totalMoney > this.volumeMoney) {
                this.payMoney = this.totalMoney - this.volumeMoney
            }
            else {
                this.payMoney = 0;
            }
        },
        /**
         * 得到我的优惠卷
         */
        async GetMyVolumeRecordApi() {
            let { Data: { Items } } = await this.$Post(`/VolumeRecord/List`, { UserId: this.userId, IsUse: false });

            this.formData.VolumeRecordDtos = Items;
        },
        /**
         * 使用优惠卷
         * @param {} Item 
         */
        async Use(Item) {
            Item.IsUse = !Item.IsUse;
            let volumeMoney = 0;
            let VolumeRecordDtos = this.formData.VolumeRecordDtos;
            if (Array.isArray(VolumeRecordDtos) && VolumeRecordDtos.length > 0) {
                VolumeRecordDtos.forEach((item) => {
                    if (item.IsUse && item.VolumensDto) {
                        volumeMoney += parseFloat(item.VolumensDto.Money);
                    }
                })
            }
            this.volumeMoney = volumeMoney;

            if (this.totalMoney > this.volumeMoney) {
                this.payMoney = this.totalMoney - this.volumeMoney
            }
            else {
                this.payMoney = 0;
            }



        },
        async BindInput() {
            this.CaculateTotalMoney();
        }


    },
};
</script>
<style scoped lang="scss">
.comment-item {
    padding: 10px;
}
</style>
  }%
  
