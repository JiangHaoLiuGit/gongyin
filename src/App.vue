<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style lang="scss">
*{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.el-table__row .el-button+.el-button{
  margin-left: 0!important;
}
.el-tabs__item{
  font-size: 14px;
}
.el-table td, .el-table th.is-leaf{
  border-top: 1px solid #717b90!important;
}
.el-tabs__item.is-active{
  font-size: 16px;
}
.el-tabs__item:hover{
  font-size: 16px;
  transition: .1s;
}
.el-tabs__nav-scroll{
  background: #cff3da!important;
}
.el-table__body tbody{
  border-bottom: 1px solid #676767;
}
.el-table .has-gutter th, .el-table .has-gutter tr{
  background-color: #ebecff;
  border-top: 1px solid #676767;
}
.el-table td, .el-table th{
  padding: 4px 0!important;
}
// 自定义进度条颜色
#nprogress .bar {
  background: #f811b2 !important; //自定义颜色
}
.Pwidth{
  width: 180px;
}
.inlineBlock{
  display: inline-block;
}
.clearfix::after{
  display: table;
  content:"";
  clear:both;
}
.por{
  position: relative;
}
.shen{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  width: 100%;
}
.poa{
  position:absolute;
}
.lt{
  float:left;
}
.rt{
  float:right;
}
.strong{
  color: red;
}
.el-collapse-item__content{
      padding-bottom: 0!important;
    }
    .el-collapse{
      border-top: none!important;
    }
 .page1   .el-tabs__nav.is-top{
    width: 100%;
}
.wo:before{
  content: "*";
  color: #F56C6C;
  margin-right: 4px;
  position: absolute;
  top: 0;
  // -93px
  left: -115px;
}
.el-button.is-circle{
  padding: 7px 10px!important;
}
.fun{
  .upload-demo{
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 5px;
    .el-button{
      float: left;
      margin-left: 0;
      font-size: 24px;
      background: #d4d4d4;
      border-color: #d4d4d4;
      position: relative;
      bottom: 7px;
      padding: 12px 5px 12px;
    }
    .el-button:hover{
      border-color: #d4d4d4;
    }
    .el-button:focus{
      color: #606266;
      background: #d4d4d4;
      border-color: #d4d4d4;
    }
  }
}
.el-table{
  font-size: 12px!important;
}
.ql-clipboard {
    position: fixed;
    display: none;
    left: 50%;
    top: 50%;
  }
.page1{
  .bottom{
    .el-collapse-item__header{
      padding-left: 20px;
    }
    .el-collapse-item__content{
      border-top: 1px solid #EBEEF5;
      padding: 10px 0;
      padding-bottom: 6px !important;
      div{
        padding-left: 20px;
        line-height: 18px;
        margin-top: 10px;
        cursor:pointer;
      }
      div:hover{
        color: #409EFF;
      }
    }
  }
}
.el-image-viewer__wrapper{
  z-index: 9000!important;
}
.yichu{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.heightAuto{
  height: 30px;
  width: 100%;
}
.flexBet{
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.flexShu{
  display: flex;
  flex-flow: inherit;
    flex-wrap: wrap;
}
.el-table--scrollable-y .el-table__body-wrapper{
  overflow-y: auto!important;
}
.flexCen{
  display: flex;
  align-content: center;
  justify-content: center;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color:#dce1e8!important;
  // 
}
.el-table__body-wrapper .el-table__row:hover>td{
  background-color:#dce1e8!important;
}
.el-table__body-wrapper tr:hover td{
  background-color:#dce1e8!important;
}
.caret-wrapper i{
  font-size: 18px;
}
.el-cascader{
  line-height: 0!important;
}
.el-input__icon{
  line-height: 21px!important;
}
.el-input__inner{
  height: 30px!important;
  font-size: 12px!important;
  line-height: 30px!important;
  border: 2px solid #C0C4CC!important;
}
.el-date-editor .el-range-separator,.el-date-editor .el-range__icon{
  line-height: 22px!important;
}
.el-button{
  height: 30px!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
}
.el-input__inner:hover{
  border-color: #606266!important;
}
.el-table__body-wrapper{
  overflow-y: auto!important;
}
.el-submenu__title{
  font-size: 16px!important;
}
.el-submenu .el-menu-item{
  color: #bbb!important;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: 1px solid #bbb!important;
}
.el-table--border, .el-table--group{
  border: 1px solid #bbb!important;
}
.el-button--primary{
  background-color: #296AEE!important;
  border-color: #296AEE!important;
}
.fff{
  color: #fff;
}
.yiban{
  width:50%;
}
.el-button--danger{
  background-color: #F00F0F!important;
  border-color: #F00F0F!important;
}
.el-button--info{
  color: #fff!important;
  background-color: #758B8C!important;
  border-color: #758B8C!important;
}
.el-button--warning{
  background-color: #EE8F29!important;
  border-color: #EE8F29!important;
}
.el-button--success{
  background-color: #39AA3A!important;
  border-color: #39AA3A!important;
}
.ltSpan span{
  float: left;
}
.shen1{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.shen2{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-select-dropdown__wrap{
  max-height:374px!important;
}
.el-scrollbar__bar.is-vertical{
  display: none!important;
}
</style>
