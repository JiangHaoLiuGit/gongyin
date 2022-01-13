<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brand">
        <el-input v-model="value.brand" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="classification_value">
        <el-input v-model="value.classification_value" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品主图：" prop="image">
        <el-image
          style="width:100px;height:100px;"
          :src="value.image"
          fit="cover"></el-image>
      </el-form-item>
      <el-form-item label="商品视频：" prop="video">
        <video  style="width:300px;height:300px;" controls="controls" poster="../../../../assets/image/logo.png" :src= value.video id="video">
          您的浏览器不支持H5播放器
        </video>
      </el-form-item>
      <el-form-item label="商品组图：" prop="imgList">
        <el-carousel height="150px">
          <el-carousel-item v-for="(item,index) in value.diagram" :key="index">
            <el-image
              style="height:150px;width:100%;"
              :src="item"
              fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-form-item>
      <el-form-item label="参数规格：" prop="specifications" >
        <el-radio v-model="value.specifications" label="1" disabled >显示规格参数</el-radio>
        <el-radio v-model="value.specifications" label="2" disabled >不显示规格参数</el-radio>
      </el-form-item>
      <el-form-item label="库存数量：" prop="quantity" v-show="value.specifications == 2" >
        <el-input v-model="value.quantity" disabled ></el-input>
      </el-form-item>
      <el-form-item label="结算价：" prop="prime_cost_price" v-show="value.specifications == 2" >
        <el-input v-model="value.prime_cost_price" disabled ></el-input>
      </el-form-item>
      <el-form-item label="市场价：" prop="original_price" v-show="value.specifications == 2" >
        <el-input v-model="value.original_price" disabled ></el-input>
      </el-form-item>
      <el-form-item label="销售价：" prop="price" v-show="value.specifications == 2" >
        <el-input v-model="value.price" disabled ></el-input>
      </el-form-item>
      <el-form-item label="发货地址：" prop="classification_value">
        <el-input v-model="value.address" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="开售时间：" prop="sell_time" >
        <el-input v-model="value.sell_time" disabled></el-input>
      </el-form-item> -->
      <el-form-item label="运费模式：" prop="freightWay">
        <el-radio v-model="value.freightWay" label="1" disabled >包邮</el-radio>
        <el-radio v-model="value.freightWay" label="2" disabled >运费模板</el-radio>
      </el-form-item>
      <el-form-item label="运费模板：" prop="postage_template_id" v-show="value.freightWay === 2" >
        <el-input v-model="value.postage_template_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="intro">
        <el-input v-model="value.intro" disabled ></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>
    
    
  </div>
</template>

<script>
  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      };
    },

    created() {
      console.log(this.value.property_list_value)
    },

    methods: {

      //下一步
      handleNext(formName){
        let that = this
        // that.value.property_list_value = that.value.property_list_value
        this.$emit('nextStep')
      }

    }
  }
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  }

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
