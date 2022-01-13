<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center >
      <el-step title="填写商品基础信息"></el-step>
      <el-step title="填写商品参数"></el-step>
      <el-step title="填写商品规格信息"></el-step>
      <el-step title="填写商品介绍"></el-step>
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
  import { goods_add } from "../../../../utils/axios";
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
          settle_ratio:"",//结算比例
          brand : '',//商品品牌
          classification_value : [],//商品分类
          norm : '',//参数规格-单选,
          specifications : '',//销售属性-单选
          image : '',//商品主图
          video : '',//商品视频
          diagram : [],//商品组图
          quantity : '',//库存数量
          prime_cost_price : '',//结算价
          price : '',//销售价
          postage_template_name: '',//模板名称
          weight : '',//重量
          groundingWay : '',//上架方式-单选
          sell_time : '',//开售时间
          freightWay : '',//运费模板-单选
          postage_template_id : '',//运费模板
          intro : '',//备注
          province : '',//省
          city : '',//市
          area : '',//区
          param_group_list : [],//规格信息
          property_list : [],//销售属性-使用模板
          property_list_value : [],//销售属性值
          property_list_copy : [],//不使用销售属性模板
          enableTemplate : '2',//是否启用模板
          template_show : true,//显示模板与否
          templateValue : [],//选择的属性模板
          skuList : [],
          titleList : [],
          overTwo : false,//销售属性是否超过两种
          skuListTitle : '',
          fileList_copy : [],
          info : '',//商品介绍
          sku_image : [] , //sku关联的图片 只上传sku中属性名与属性值有图片，没有图片的不上传
        },
        showStatus: [true, false, false, false]
      }
    },

    created(){
      
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
        let that = this
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let sku_data = []
          let param_data = []
          let properties = ''
          let image_url = ''
          console.log(that.productParam.param_group_list)
          console.log(that.productParam.skuList)
          if(that.productParam.overTwo == true ) {
            let tittleLength = that.productParam.titleList.length
            that.productParam.skuList.forEach(element => {
              properties = ''
              for (let index = 0; index < tittleLength; index ++) {
                console.log(element[`costInfos${index}`])
                if(properties == '') {
                  properties = element[`costInfos${index}`].pid + ':' 
                  + element[`costInfos${index}`].vid
                } else {
                  properties = properties + ';' +  element[`costInfos${index}`].pid + ':' 
                  + element[`costInfos${index}`].vid
                }
              }
              sku_data.push({
                properties : properties,
                quantity : element.quantity,
                weight : element.weight,
                
                prime_cost_price : element.prime_cost_price,
                is_open : element.status
              })
            });
          } else {
            that.productParam.skuList.forEach(element => {
              properties = ''
              properties = element.value.pid + ':' + element.value.vid
              sku_data.push({
                properties : properties,
                quantity : element.quantity,
                weight : element.weight,
                
                prime_cost_price : element.prime_cost_price,
                is_open : element.status
              })
            });
          }

          that.productParam.param_group_list.forEach(ele => {
            let arr_params = []
            if(ele.value.length >0 ) {
              ele.value.forEach(item_o => {
                arr_params.push ({
                  id : item_o.id,
                  name : item_o.name,
                  value : item_o.value,
                  unit : item_o.unit,
                  type : item_o.type,
                  sort : item_o.sort,
                  array : item_o.array,
                  final_value : item_o.final_value,
                  selectValue : item_o.selectValue,
                  data : item_o.data,
                  is_must : item_o.is_must
                })
              })
              param_data.push({
                id : ele.id,
                name : ele.name,
                value : arr_params
              })
            }
          })

          that.productParam.diagram.forEach(wo_p => {
            if(image_url == '') {
              image_url = wo_p
            } else {
              image_url = image_url + ',' + wo_p
            }
          })

          if(param_data.length == 0){
            param_data = ""
          }
          if(sku_data.length == 0){
            sku_data = ""
          }
          console.log(sku_data)
          let data = {
            category_fid : that.productParam.classification_value[0],//商品一级分类id
            category_id : that.productParam.classification_value[1],//商品二级分类id
            category_tid : that.productParam.classification_value[2],//商品三级分类id
            name : that.productParam.name,//商品名称
            // brand : that.productParam.brand,//商品品牌
            province : that.productParam.province,//省 编号
            city : that.productParam.city,//市 编号
            area : that.productParam.area,//区 编号
            postage_template_id : that.productParam.freightWay == 2 ? that.productParam.postage_template_id : '' ,//运费模板 不传默认是包邮
            image : that.productParam.image,//商品主图
            image_url : image_url,//商品图片相册 中间用逗号隔开
            // sell_time : that.productParam.groundingWay == 2 ? that.transdate(that.productParam.quantity) : '',//出售时间（时间戳） 不传默认是直接上架
            intro : that.productParam.intro ,//商品备注
            // param_data : that.productParam.norm == 1 ? JSON.stringify(param_data) : "",//商品参数 可以不传
            // sku_data : that.productParam.specifications == 1 ? JSON.stringify(sku_data) : sku_data,//商品sku 与商品价格，库存必须传一种
            info : that.productParam.info,//商品介绍
            video : that.productParam.video,//商品视频 
            quantity : that.productParam.specifications == 2 ? that.productParam.quantity : '',//库存 与商品sku必传一种
            weight : that.productParam.specifications == 2 ? that.productParam.weight : '' ,//商品售价 与商品sku必传一种
            //比例
            // settle_ratio:that.productParam.settle_ratio,
            prime_cost_price : that.productParam.specifications == 2 ? that.productParam.prime_cost_price : '',//商品结算价 与商品sku必传一种
            sku_image : JSON.stringify(that.productParam.sku_image),//sku关联的图片 只上传sku中属性名与属性值有图片，没有图片的不上传 
          }
          // data.param_data = ""
          // data.sku_data = ""
          if(param_data == ''){
            data.param_data = ''
          }else{
            if(that.productParam.norm == 1){
              data.param_data = JSON.stringify(param_data)
            }else{
              data.param_data = ''
            }
          }
          if(sku_data == ''){
            data.sku_data = ''
          }else{
            if(that.productParam.specifications == 1){
              data.sku_data = JSON.stringify(sku_data)
            }else{
              data.sku_data = ''
            }
          }
          
          console.log(data.sku_data)
          // if(data.sku_data.length != 0){
          //   data.sku_data = JSON.stringify(sku_data)
          // }
          goods_add(data)
            .then((res_s) => {
              console.log(res_s.data.err_code);
              if (res_s.data.err_code == 0) {
                that.$message({
                  message: '发布成功',
                  type: 'success'
                });
                that.$router.push('/goods/commodityBank')
              } else {
                that.$message({
                  showClose: true,
                  message: res_s.data.err_msg,
                  type: 'error'
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
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


