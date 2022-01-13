<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm_f" label-width="120px" style="width: 600px" size="small" v-show="value.norm == '2'">
      <el-form-item style="text-align: center">
        <h3>暂无规格信息</h3>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form 
      :model="value" 
      ref="productSaleForm_t" 
      label-width="120px" 
      style="width: 600px" 
      size="small" 
      v-show="value.norm == '1' && (value.param_group_list.length == 0)"
    >
      <el-form-item style="text-align: center">
        <h3>暂无规格模板，请添加模板!</h3>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form 
      :model="value" 
      ref="productSaleForm" 
      label-width="120px" 
      style="width: 600px" 
      size="small" 
      v-show="value.norm == '1' && (value.param_group_list.length != 0)"
    >
      <div v-for="item,index in value.param_group_list" :key="index">
        <h3>{{item.name}}：</h3>
        <!-- 类型（1是单选 2是下拉 3是文本 4是时间插件（组） 5多选  6文本域 7 时间插件（单）） -->
        <el-form-item 
          v-for="(item_first,index_first) in item.value" 
          :key="index_first"
          :label="item_first.name + '：'"   
          :rules="item_first.is_must == 1 ? [{ required: true}] : [{ required: false}]"
        >

          <!-- 单选 -->
          <el-radio-group v-model="item_first.final_value" v-show="item_first.type == 1">
              <el-radio v-for="(item_second,index_second) in item_first.array" :key="index_second" :label="index_second" >{{item_second}}{{item_first.unit}}</el-radio>
          </el-radio-group>

          <!-- 下拉列表框 -->
          <el-select v-model="item_first.final_value" :placeholder="`请选择${item_first.name}`" v-show="item_first.type == 2">
            <el-option
              v-for="(item_s,index_s) in item_first.array"
              :key="index_s"
              :label="item_s"
              :value="index_s">
            </el-option>
          </el-select>

          <!-- 多选框 -->
          <el-checkbox-group v-model="item_first.selectValue" v-show="item_first.type == 5">
            <el-checkbox v-for="(item_second,index_second) in item_first.array" :key="item_second" :label="index_second" >{{item_second}}{{item_first.unit}}</el-checkbox>
          </el-checkbox-group>

          <!-- 文本框 -->
          <el-input v-model="item_first.final_value" :placeholder="`请输入${item_first.name}`" v-show="item_first.type == 3" ></el-input>

          <!-- 时间选择器(组) -->
          <el-date-picker
            :clearable = false
            v-show="item_first.type == 4"
            v-model="item_first.data"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          
          <!-- 时间选择器-单 -->
          <el-date-picker
            :clearable = false
            v-show="item_first.type == 7"
            v-model="item_first.final_value"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

          <!-- 文本域 -->
          <el-input
            v-show="item_first.type == 6"
            type="textarea"
            :rows="5"
            :placeholder="`请输入${item_first.name}`"
            v-model="item_first.final_value">
          </el-input>
        </el-form-item>
      </div>
      
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "ProductSaleDetail",
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
      if (this.isEdit) {
        
      } else {
        
      }
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
        let that = this
        let leg = false
        if(this.value.norm == 1) {
          this.value.param_group_list.forEach(element => {
            element.value.forEach(element_first => {
              if(element_first.is_must == 1) {
                if(element_first.final_value === '' &&  element_first.selectValue.length ==  0) {
                  console.log(element_first)
                  if(element_first.type == 4){
                    if(element_first.data == ''){
                      leg = true
                      return;
                    }
                  }else{
                    leg = true
                    return;
                  }
                }
              }
            })
          })
        }
        if(leg == true) {
          that.$message({
            message: '必填项为空,请检查!',
            type: 'warning'
          });
          return;
        }
        if(that.value.norm == 1){
          that.value.param_group_list.forEach(element => {
            element.value.forEach(element_first => {
              if(element_first.type == 1 ) { //单选
                element_first.value = element_first.array[element_first.final_value]
              } else if ( element_first.type == 2 ) { //下拉列表框
                element_first.value = element_first.array[element_first.final_value]
              } else if ( element_first.type == 3 ) { //文本框
                element_first.value = element_first.final_value
              } else if ( element_first.type == 4 ) { // 时间选择器(组)
                element_first.value = element_first.data
              } else if ( element_first.type == 5 ) { //多选框  selectValue
                element_first.value = undefined
                element_first.array.forEach((ele,index) => {
                  element_first.selectValue.forEach(item => {
                    if(item == index) {
                      if(element_first.value == undefined) {
                        element_first.value = ele + ''
                      } else {
                        element_first.value = element_first.value + ',' + ele
                      }
                      console.log(element_first.value)
                    }
                  })
                })
              } else if ( element_first.type == 6 ) { //文本域
                element_first.value = element_first.final_value
              } else if ( element_first.type == 7 ) { //时间选择器-单
                element_first.value = element_first.final_value
              }
            })
          })
        }
        
        that.$emit('nextStep')
      }
    }
  }
</script>

<style scoped>
  .littleMargin {
    margin-top: 10px;
  }
</style>
