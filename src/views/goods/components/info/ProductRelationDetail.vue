<template>
  <div style="margin-top: 50px">
    <div style="margin-bottom:100px;">
      <!-- sku列表 -->
       <el-row :gutter="20" class="goodsindex-list" v-show ="value.specifications == 1">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="value.skuList"
            border
            style="width: 100%"
          >
            <el-table-column 
              label="序号"
              type="index" 
              width="80"
            >
            </el-table-column>
            <el-table-column  v-for="(item,index) in value.titleList" :key="index" :label="item.lable" :property="item.property" width="140" >
              <template slot-scope="scope">
                {{scope.row[scope.column.property].value.name}}
              </template>
            </el-table-column>
            <!-- <el-table-column :label="value.skuListTitle" v-if="!value.overTwo">
              <template slot-scope="scope">
                {{scope.row.value.value}}
              </template>
            </el-table-column> -->
            <el-table-column label="结算价(元)" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.prime_cost_price" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="市场价(元)" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.original_price" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="销售价(元)" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="可售库存" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180" >
              <template slot-scope="scope">
                {{scope.row.status == 1 ? '启用' : '禁用'}}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <quill-editor ref="myTextEditor" v-model="value.info" :options="editorOption" style="height:600px;"></quill-editor>
    </div>

    <el-form :model="value"
             ref="productRelationForm"
             label-width="120px"
             style="width: 680px"
             size="small">
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <!-- <el-button type="primary" size="medium" @click="handleFinishCommit">提交</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "ProductRelationDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        editorOption: {
          placeholder: '编辑文章内容'
        },
        tableList : []
      };
    },

    created() {

    },

    mounted () {
    },

    methods: {

      onEditorChange({ editor, html, text }) {
        console.log(html)
          this.content = html;
      },

      handlePrev(){
        this.$emit('prevStep')
      },
      
    }
  }
</script>

<style scoped lang="less">

/deep/ .el-table td, .el-table th.is-leaf{
    border-top: 1px solid #EBEEF5;
    border-bottom:0
}

/deep/ .el-table__body{
  border-bottom: 1px solid #EBEEF5;
}

/deep/ .el-date-editor {
  margin-left: 10px;
}

.seach {
  display: flex;
  /deep/ .el-input {
    width:150px;
    margin: 0 10px;
  }
}
/deep/ .el-dialog {
  width: 800px !important;
}

/deep/ .el-dialog__body {
  height: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.seach_copy {
  margin-top:20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width:150px;
    margin: 0 10px;
  }
  .button_type {
    display: flex;
  }
  .seach_select {
    display: flex;
  }
}

.goodsindex {
  width: 100%;
  min-height: 100%;
  padding: 15px 15px 0;
  box-sizing: border-box;
}

/* 搜索 */
.goodsindex-queryInfo {
  margin-bottom: 10px;
}

.goodsindex-queryInfo-li {
  width: 100%;
  height: auto;
}


/* 列表 */
.goodsindex-list {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

/* 分页 */
.goodsindex-page-box {
  width: 100%;
  height: auto;
  display: flex;
  background: #ccc;
  margin-bottom: 0;
  padding-bottom: 10px;
  padding-top:10px;
  justify-content: flex-end;
}

/deep/ .el-table .warning-row {
  background: oldlace;
}

/deep/ .el-table .success-row {
  background: #f0f9eb;
}
/deep/ .el-table td {
  text-align: center !important;
}
/deep/ .el-table th {
  text-align: center !important;
}
/deep/ .el-button {
  margin: 0 10px;
}
/deep/ .goodsindex-list {
  margin-top: 10px;
}  
/deep/ .el-dialog  {
  box-shadow: 0 0px 0px #ccc;
  -webkit-box-shadow : 0 0px 0px #ccc;
}
/deep/ .el-dialog {
  width: 30%;
}
/deep/ .el-form-item__label {
  text-align-last: justify;
}
/deep/ .el-dialog__body {
  padding: 30px 50px;
}
</style>
