<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="商品基础信息"></el-step>
      <el-step title="商品规格信息"></el-step>
      <el-step title="商品销售属性"></el-step>
      <el-step title="商品介绍"></el-step>
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>
    <product-sale-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </product-sale-detail>
    <product-attr-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </product-attr-detail>
    <product-relation-detail
      v-show="showStatus[3]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </product-relation-detail>
  </el-card>
</template>
<script>
import { goods_info_product } from "../../../../utils/axios";
  import ProductInfoDetail from './ProductInfoDetail';
  import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import ProductRelationDetail from './ProductRelationDetail';
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: {
          is_edit : true,
          name : '',//商品名称
          brand : '',//商品品牌
          classification_value : '',//商品分类
          specifications : '',//参数规格-单选
          image : '',//商品主图
          video : '',//商品视频
          diagram : '',//商品组图
          quantity : '',//库存数量
          prime_cost_price : '',//结算价
          original_price : '',//市场价
          price : '',//销售价
          groundingWay : '',//上架方式-单选
          sell_time : '',//开售时间
          freightWay : '',//运费模板-单选
          postage_template_id : '',//运费模板
          intro : '',//备注
          address : '',//地址
          param_group_list : [],//规格信息
          property_list : [],//销售属性-使用模板
          property_list_value : [],//销售属性值
          property_list_copy : [],//不使用销售属性模板
          enableTemplate : '1',//是否启用模板
          template_show : true,//显示模板与否
          templateValue : [],//选择的属性模板
          skuList : [],
          titleList : [],
          overTwo : false,//销售属性是否超过两种
          skuListTitle : '',
          fileList_copy : [],
          info : '',//商品介绍
        },
        showStatus: [true, false, false, false]
      }
    },

    created(){
      if(this.isEdit){ 
        let product_id = ''
        console.log(this.$route.query.product_id)
        if(this.$route.query.product_id != undefined ) {
          product_id = this.$route.query.product_id
          localStorage.setItem('info_product_id',product_id)
        } else {
          if(localStorage.getItem('info_product_id') != '' ) {
            product_id = localStorage.getItem('info_product_id')
          }
        }
        console.log(product_id)
        let that = this
          goods_info_product( { 
            // product_id : product_id
            product_id : product_id
          }).then(res=>{
            if(res.data.err_code==0){
              let result = res.data.err_msg.list
              that.productParam.name = result.product_info.name//商品名称
              that.productParam.brand = ''//商品品牌

              if(result.product_info.category_fid) {
                that.productParam.classification_value = result.product_info.category.category_fid[result.product_info.category_fid] 
                if(result.product_info.category_id != 0) {
                  that.productParam.classification_value = that.productParam.classification_value + ">>" 
                    + result.product_info.category.category_id[result.product_info.category_id]
                  if(result.product_info.category_tid != 0) {
                    that.productParam.classification_value = that.productParam.classification_value + ">>" 
                    + result.product_info.category.category_tid[result.product_info.category_tid]
                  }
                }
              } //商品分类

              that.productParam.address = result.product_info.address.province[result.product_info.province] 
              that.productParam.address = that.productParam.address  + '、' + result.product_info.address.city[result.product_info.city]
              that.productParam.address = that.productParam.address  + '、' + result.product_info.address.area[result.product_info.area]
             
             
              that.productParam.image = result.product_info.image//商品主图
              that.productParam.video = result.product_info.video//商品视频
              that.productParam.diagram = result.product_image_list//商品组图
             
              that.productParam.quantity = result.product_info.quantity//库存数量
              if(result.product_info.quantity) {
                 that.productParam.specifications = '2' //参数规格-单选
              }
              // that.productParam.specifications = '1' //测试
              that.productParam.prime_cost_price = result.product_info.prime_cost_price//结算价
              that.productParam.original_price = result.product_info.original_price//市场价
              that.productParam.price = result.product_info.price//销售价
              // that.productParam.sell_time = that.commonJs.timestampToTime (result.product_info.sell_time)//开售时间

              that.productParam.freightWay = result.product_info.postage_template_id == 0 ? '1' : '2' 
              that.productParam.postage_template_id = result.product_info.tpl_name

              that.productParam.intro = result.product_info.intro //备注

              that.productParam.info = result.product_info.info //详情
              
              that.productParam.param_group_list = result.product_info.param_data//规格信息

              let  target = {}
              let  source = {}
              that.productParam.property_list_value = result.sku_property_list //销售属性值

              if(result.product_sku_list.length > 0 ) {
                console.log(33)
                result.product_sku_list[0].property_list.forEach((element , index ) => {
                  that.productParam.titleList.push({
                    lable : element.name,
                    property : `costInfos${index}`
                  })
                })
                console.log(that.productParam.titleList)
                result.product_sku_list.forEach((element_o , index_o ) => {
                  source  = {}
                  target = {}
                  element_o.property_list.forEach((ele,f_index) => {
                    source[`costInfos${f_index}`] = ele
                  })
                  target = {
                    prime_cost_price : element_o.prime_cost_price,
                    original_price : element_o.original_price,
                    price : element_o.price,
                    quantity : element_o.quantity,
                    status : element_o.is_open
                  }
                  const returnedTarget = Object.assign(target, source);
                  that.productParam.skuList.push(returnedTarget)
                })
              }

              console.log(that.productParam.skuList)
              console.log(that.productParam.property_list_value)

              // that.productParam.skuList = []
              // that.productParam.titleList = []
              // that.productParam.overTwo = false//销售属性是否超过两种
              // that.productParam.skuListTitle = ''
            }else{
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
      }
    },

    methods: {

      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },

      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },

      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },

      //日期转换成时间戳
      transdate (time) {
        var date = new Date();
        date.setFullYear(time.substring(0, 4));
        date.setMonth(time.substring(5, 7) - 1);
        date.setDate(time.substring(8, 10));
        date.setHours(time.substring(11, 13));
        date.setMinutes(time.substring(14, 16));
        date.setSeconds(time.substring(17, 19));
        return Date.parse(date) / 1000;
      },
      
      finishCommit(isEdit) {
      
      }
    }

  }
</script>
<style>
  .form-container {
    width: 1000px;
    margin: 50px auto;
  }
</style>


