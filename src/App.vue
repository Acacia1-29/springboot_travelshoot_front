<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 12px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  //background-color: #8c8c8c;
  background-color: rgba(163, 161, 161, 0.25);
}

::-webkit-scrollbar-track {
  background-color: #f6f6f6;
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border: 0;
}

.el-upload--picture-card {
  background-color: transparent !important;
}

.el-dropdown-menu-item {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;

}

.el-dropdown-menu-item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #09b6c5;
}


.pointer:hover {
  cursor: pointer;
}

.text-theme {
  color: #09b6c5,
}

.bg-theme {
  background-color: #09b6c5;
  color: white;
}



.uploadImages {
  width: 164px;
  height: 164px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

body {
  background: #f4f6f9;
}





.table-box {
  .table-search {
    display: flex;
    margin-bottom: 10px;

    .search-operation {
      margin-left: 15px;
      white-space: nowrap;

      .search-isOpen {
        margin-left: 20px;
      }
    }
  }
}

.crumb {
  padding: 10px;
}




.padding-0 {
  padding: 0;
}

.padding-xs {
  padding: 10px;
}

.padding-sm {
  padding: 20px;
}

.padding {
  padding: 30px;
}

.padding-lg {
  padding: 40px;
}

.padding-xl {
  padding: 50px;
}

.padding-top-xs {
  padding-top: 10px;
}

.padding-top-sm {
  padding-top: 20px;
}

.padding-top {
  padding-top: 30px;
}

.padding-top-lg {
  padding-top: 40px;
}

.padding-top-xl {
  padding-top: 50px;
}

.padding-right-xs {
  padding-right: 10px;
}

.padding-right-sm {
  padding-right: 20px;
}

.padding-right {
  padding-right: 30px;
}

.padding-right-lg {
  padding-right: 40px;
}

.padding-right-xl {
  padding-right: 50px;
}

.padding-bottom-xs {
  padding-bottom: 10px;
}

.padding-bottom-sm {
  padding-bottom: 20px;
}

.padding-bottom {
  padding-bottom: 30px;
}

.padding-bottom-lg {
  padding-bottom: 40px;
}

.padding-bottom-xl {
  padding-bottom: 50px;
}

.padding-left-xs {
  padding-left: 10px;
}

.padding-left-sm {
  padding-left: 20px;
}

.padding-left {
  padding-left: 30px;
}

.padding-left-lg {
  padding-left: 40px;
}

.padding-left-xl {
  padding-left: 50px;
}

.padding-lr-xs {
  padding-left: 10px;
  padding-right: 10px;
}

.padding-lr-sm {
  padding-left: 20px;
  padding-right: 20px;
}

.padding-lr {
  padding-left: 30px;
  padding-right: 30px;
}

.padding-lr-lg {
  padding-left: 40px;
  padding-right: 40px;
}

.padding-lr-xl {
  padding-left: 50px;
  padding-right: 50px;
}

.padding-tb-xs {
  padding-top: 10px;
  padding-bottom: 10px;
}

.padding-tb-sm {
  padding-top: 20px;
  padding-bottom: 20px;
}

.padding-tb {
  padding-top: 30px;
  padding-bottom: 30px;
}

.padding-tb-lg {
  padding-top: 40px;
  padding-bottom: 40px;
}

.padding-tb-xl {
  padding-top: 50px;
  padding-bottom: 50px;
}


/*  -- 内外边距 -- */

.margin-0 {
  margin: 0;
}

.margin-xs {
  margin: 10px;
}

.margin-sm {
  margin: 20px;
}

.margin {
  margin: 30px;
}

.margin-lg {
  margin: 40px;
}

.margin-xl {
  margin: 50px;
}

.margin-top-xs {
  margin-top: 10px;
}

.margin-top-sm {
  margin-top: 20px;
}

.margin-top {
  margin-top: 30px;
}

.margin-top-lg {
  margin-top: 40px;
}

.margin-top-xl {
  margin-top: 50px;
}

.margin-right-xs {
  margin-right: 10px;
}

.margin-right-sm {
  margin-right: 20px;
}

.margin-right {
  margin-right: 30px;
}

.margin-right-lg {
  margin-right: 40px;
}

.margin-right-xl {
  margin-right: 50px;
}

.margin-bottom-xs {
  margin-bottom: 10px;
}

.margin-bottom-sm {
  margin-bottom: 20px;
}

.margin-bottom {
  margin-bottom: 30px;
}

.margin-bottom-lg {
  margin-bottom: 40px;
}

.margin-bottom-xl {
  margin-bottom: 50px;
}

.margin-left-xs {
  margin-left: 10px;
}

.margin-left-sm {
  margin-left: 20px;
}

.margin-left {
  margin-left: 30px;
}

.margin-left-lg {
  margin-left: 40px;
}

.margin-left-xl {
  margin-left: 50px;
}

.margin-lr-xs {
  margin-left: 10px;
  margin-right: 10px;
}

.margin-lr-sm {
  margin-left: 20px;
  margin-right: 20px;
}

.margin-lr {
  margin-left: 30px;
  margin-right: 30px;
}

.margin-lr-lg {
  margin-left: 40px;
  margin-right: 40px;
}

.margin-lr-xl {
  margin-left: 50px;
  margin-right: 50px;
}

.margin-tb-xs {
  margin-top: 10px;
  margin-bottom: 10px;
}

.margin-tb-sm {
  margin-top: 20px;
  margin-bottom: 20px;
}

.margin-tb {
  margin-top: 30px;
  margin-bottom: 30px;
}

.margin-tb-lg {
  margin-top: 40px;
  margin-bottom: 40px;
}

.margin-tb-xl {
  margin-top: 50px;
  margin-bottom: 50px;
}


.bg-red {
  background-color: #e54d42;
  color: #ffffff;
}

.bg-orange {
  background-color: #f37b1d;
  color: #ffffff;
}

.bg-yellow {
  background-color: #fbbd08;
  color: #333333;
}

.bg-olive {
  background-color: #8dc63f;
  color: #ffffff;
}

.bg-green {
  background-color: #39b54a;
  color: #ffffff;
}

.bg-cyan {
  background-color: #1cbbb4;
  color: #ffffff;
}

.bg-blue {
  background-color: #0081ff;
  color: #ffffff;
}

.bg-purple {
  background-color: #6739b6;
  color: #ffffff;
}

.bg-mauve {
  background-color: #9c26b0;
  color: #ffffff;
}

.bg-pink {
  background-color: #e03997;
  color: #ffffff;
}

.bg-brown {
  background-color: #a5673f;
  color: #ffffff;
}

.bg-grey {
  background-color: #8799a3;
  color: #ffffff;
}

.bg-gray {
  background-color: #f0f0f0;
  color: #333333;
}

.bg-black {
  background-color: #333333;
  color: #ffffff;
}

.bg-white {
  background-color: #ffffff;
  color: #666666;
}

.bg-shadeTop {
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.01));
  color: #ffffff;
}

.bg-shadeBottom {
  background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
  color: #ffffff;
}

.bg-red.light {
  color: #e54d42;
  background-color: #fadbd9;
}

.bg-orange.light {
  color: #f37b1d;
  background-color: #fde6d2;
}

.bg-yellow.light {
  color: #fbbd08;
  background-color: #fef2ced2;
}

.bg-olive.light {
  color: #8dc63f;
  background-color: #e8f4d9;
}

.bg-green.light {
  color: #39b54a;
  background-color: #d7f0dbff;
}

.bg-cyan.light {
  color: #1cbbb4;
  background-color: #d2f1f0;
}

.bg-blue.light {
  color: #0081ff;
  background-color: #cce6ff;
}

.bg-purple.light {
  color: #6739b6;
  background-color: #e1d7f0;
}

.bg-mauve.light {
  color: #9c26b0;
  background-color: #ebd4ef;
}

.bg-pink.light {
  color: #e03997;
  background-color: #f9d7ea;
}

.bg-brown.light {
  color: #a5673f;
  background-color: #ede1d9;
}

.bg-grey.light {
  color: #8799a3;
  background-color: #e7ebed;
}

.bg-gradual-red {
  background-image: linear-gradient(45deg, #f43f3b, #ec008c);
  color: #ffffff;
}

.bg-gradual-orange {
  background-image: linear-gradient(45deg, #ff9700, #ed1c24);
  color: #ffffff;
}

.bg-gradual-green {
  background-image: linear-gradient(45deg, #39b54a, #8dc63f);
  color: #ffffff;
}

.bg-gradual-purple {
  background-image: linear-gradient(45deg, #9000ff, #5e00ff);
  color: #ffffff;
}

.bg-gradual-pink {
  background-image: linear-gradient(45deg, #ec008c, #6739b6);
  color: #ffffff;
}

.bg-gradual-blue {
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
  color: #ffffff;
}


/*  -- flex弹性布局 -- */

.flex {
  display: flex;
}

.basis-xs {
  flex-basis: 20%;
}

.basis-sm {
  flex-basis: 40%;
}

.basis-df {
  flex-basis: 50%;
}

.basis-lg {
  flex-basis: 60%;
}

.basis-xl {
  flex-basis: 80%;
}

.flex-sub {
  flex: 1;
}

.flex-twice {
  flex: 2;
}

.flex-treble {
  flex: 3;
}

.flex-direction {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: flex-center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}

.align-stretch {
  align-items: stretch;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}




/* ==================
          文本
 ==================== */
.text-lt {
  font-size: 12px;
}

.text-mini {
  font-size: 16px;
}

.text-xs {
  font-size: 20px;
}

.text-sm {
  font-size: 24px;
}

.text-df {
  font-size: 28px;
}

.text-lg {
  font-size: 32px;
}

.text-xl {
  font-size: 36px;
}

.text-xxl {
  font-size: 44px;
}

.text-sl {
  font-size: 80px;
}

.text-xsl {
  font-size: 120px;
}

.text-Abc {
  text-transform: Capitalize;
}

.text-ABC {
  text-transform: Uppercase;
}

.text-abc {
  text-transform: Lowercase;
}

.text-price::before {
  content: "￥";
  font-size: 80%;
  margin-right: 4px;
}

.text-cut {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.text-bold {
  font-weight: bold;
}

.text-center {
  text-align: center;
}

.text-content {
  line-height: 1.6;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-red,
.line-red,
.lines-red {
  color: #e54d42;
}

.text-orange,
.line-orange,
.lines-orange {
  color: #f37b1d;
}

.text-yellow,
.line-yellow,
.lines-yellow {
  color: #fbbd08;
}

.text-olive,
.line-olive,
.lines-olive {
  color: #8dc63f;
}

.text-green,
.line-green,
.lines-green {
  color: #39b54a;
}

.text-cyan,
.line-cyan,
.lines-cyan {
  color: #1cbbb4;
}

.text-blue,
.line-blue,
.lines-blue {
  color: #0081ff;
}

.text-purple,
.line-purple,
.lines-purple {
  color: #6739b6;
}

.text-mauve,
.line-mauve,
.lines-mauve {
  color: #9c26b0;
}

.text-pink,
.line-pink,
.lines-pink {
  color: #e03997;
}

.text-brown,
.line-brown,
.lines-brown {
  color: #a5673f;
}

.text-grey,
.line-grey,
.lines-grey {
  color: #8799a3;
}

.text-gray,
.line-gray,
.lines-gray {
  color: #8491a5;
}

.text-black,
.line-black,
.lines-black {
  color: #333333;
}

.text-white,
.line-white,
.lines-white {
  color: #ffffff;
}

/* -- 实线 -- */

.solid,
.solid-top,
.solid-right,
.solid-bottom,
.solid-left,
.solids,
.solids-top,
.solids-right,
.solids-bottom,
.solids-left,
.dashed,
.dashed-top,
.dashed-right,
.dashed-bottom,
.dashed-left {
  position: relative;
}

.solid::after,
.solid-top::after,
.solid-right::after,
.solid-bottom::after,
.solid-left::after,
.solids::after,
.solids-top::after,
.solids-right::after,
.solids-bottom::after,
.solids-left::after,
.dashed::after,
.dashed-top::after,
.dashed-right::after,
.dashed-bottom::after,
.dashed-left::after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: inherit;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
}

.solid::after {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.solid-top::after {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.solid-right::after {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.solid-bottom::after {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.solid-left::after {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.solids::after {
  border: 8px solid #eee;
}

.solids-top::after {
  border-top: 8px solid #eee;
}

.solids-right::after {
  border-right: 8px solid #eee;
}

.solids-bottom::after {
  border-bottom: 8px solid #eee;
}

.solids-left::after {
  border-left: 8px solid #eee;
}

/* -- 虚线 -- */

.dashed::after {
  border: 1px dashed #ddd;
}

.dashed-top::after {
  border-top: 1px dashed #ddd;
}

.dashed-right::after {
  border-right: 1px dashed #ddd;
}

.dashed-bottom::after {
  border-bottom: 1px dashed #ddd;
}

.dashed-left::after {
  border-left: 1px dashed #ddd;
}
</style>
