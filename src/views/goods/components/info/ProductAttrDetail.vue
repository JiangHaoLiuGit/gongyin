<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm_f" label-width="120px" style="width: 600px" size="small" v-show="value.specifications == '2'">
      <el-form-item style="text-align: center">
        <h3>暂无销售属性信息</h3>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>

    <!-- 属性模板 -->
    <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small" v-show=" value.specifications == '1' ">
      <!-- 销售属性列表 -->
      <el-form-item 
        v-for="(item_first,index_first) in value.property_list_value" 
        :key="index_first"
        :label="item_first.name + '：'"  
      >
        <div>
          <ul v-show="item_first.value.length > 0" style="display: flex;flex-wrap:wrap;">
            <li 
              v-for="(item_two,index_two) in item_first.value" 
              :key="index_two" 
              style="padding:10px;margin:10px;display: flex;line-height:45px;border:1px dashed #000;position: relative;"
            >
              <el-image
                v-show ="item_two.image !='' "
                style="margin-right:10px;width:150px;height:150px;"
                :src="item_two.image"
                fit="cover"></el-image>
                {{item_two.name}}
            </li>
          </ul>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext(1)">下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
    name: "ProductAttrDetail",
    components: {Tinymce},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'value'
    },

    data() {
      return {
      }
    },
   
    created() {
      let that = this
    },

    mounted () {
    },

    methods: {

      //上一步
      handlePrev() {
        this.$emit('prevStep')
      },

      //下一步
      handleNext() {
        this.$emit('nextStep')
      },

    }
  }
</script>

<style scoped lang="less">
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
  }

/deep/ .el-upload--picture-card {
  width: 45px;
  height: 45px;
  line-height: 45px;
  margin-right:10px;
}

/deep/ .el-upload--picture-card i {
  font-size: 44px;
}

/deep/ .el-dialog {
  width: 400px !important;
  /deep/ .el-dialog__body {
     display: flex;
     justify-content: space-between;
  }
  /deep/ .el-input {
    overflow-y: auto;  /*溢出隐藏*/
    // text-overflow: ellipsis; /*以省略号...显示*/
    // white-space: nowrap;  /*强制不换行*/
  }
}
</style>
