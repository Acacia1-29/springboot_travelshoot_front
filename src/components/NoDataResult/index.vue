<template>
    <div style="display: flex ;height: 700px;flex-direction: column;align-items: center; justify-content: center;">

        <img style="width: 60%;" :src="require('@/assets/nodata.jpeg')" />
        <div style="color:gray">暂时没有数据</div>
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

export default {

    props: {


    },
    watch: {

    },
    data() {
        return {

        }
    },
    created() {



    },
    methods: {



    }
}

</script>
  