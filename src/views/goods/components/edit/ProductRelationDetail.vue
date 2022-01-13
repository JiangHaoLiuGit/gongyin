<template>
  <div style="margin-top: 50px">
    <div style="margin-bottom:100px;">
      <!-- sku列表 -->
      <!--  v-show ="value.specifications == 1" -->
       <el-row :gutter="20" class="goodsindex-list">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="value.skuList"
            border
            style="width: 100%"
            @header-click="handleSel"
          >
            <el-table-column 
              label="序号"
              type="index" 
              width="80"
            >
            </el-table-column>
            <el-table-column v-if="value.overTwo"  v-for="(item,index) in value.titleList" :key="index" :label="item.lable" :property="item.property" width="140" >
              <template slot-scope="scope">
                {{scope.row[scope.column.property].value}}
              </template>
            </el-table-column>
            <el-table-column :label="value.skuListTitle" v-if="!value.overTwo">
              <template slot-scope="scope">
                {{scope.row.value.value}}
              </template>
            </el-table-column>
            <!-- 结算价(元) -->
            <el-table-column label="成本价(元)" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.prime_cost_price"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="重量(kg)" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.weight"></el-input>
              </template>
            </el-table-column>
            
            <el-table-column label="可售库存" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  v-show="scope.row.status == 2 "
                  @click="enable(scope.$index, scope.row)"
                  >开启</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="stop_useing(scope.$index, scope.row)"
                  v-show="scope.row.status == 1"
                  >禁用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- <QuillEditor ref="myTextEditor" @blurs="getHtml" :values="value.info" @fileChange="hasImgAndUpload" :options="editorOption" style="min-height:600px;" /> -->
      <quill-editor
        :values="value.info"
        @blurs="getHtml"
        :uploadImageParam="editorUploadImageData"
      />
    </div>

    <el-form :model="value"
             ref="productRelationForm"
             label-width="120px"
             style="width: 680px;position: fixed;bottom: 70px;left: 627px;padding-top:24px;background:#fff;"
             size="small">
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">提交</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改等级弹窗 -->
    <el-dialog :title="title" :visible.sync="opening_change_ifShow">
      <el-form :model="form_X">
        
        <el-form-item :label="O_message.label" :label-width="formLabelWidth">
          <el-input v-model="form_X.level" placeholder="请填写批量设置"></el-input>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="opening_change_ifShow = false">取 消</el-button>
        <el-button type="primary" @click="submit_saveChanges_level">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import quillEditor from '@/components/quille'
  // import QuillEditor from '@/components/quille'
  import { upload_img } from "../../../../utils/axios";
  export default {
    name: "ProductRelationDetail",
    // components:{QuillEditor},
    components:{quillEditor},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        editorUploadImageData:{},
        editorOption: {
          placeholder: '编辑文章内容'
        },
        tableList : [],
        title:"",
        form_X: {
          level: "",
        },
        O_message:"",
        opening_change_ifShow:false,
        formLabelWidth: "100px",
      };
    },

    created() {
      if(this.value.enableTemplate == 1) { //启用销售模板
        this.skuList = this.value.property_list_value
      } else {
        this.skuList = this.value.property_list_copy
      }

    },

    mounted () {
    },

    methods: {
      getHtml(val){
        this.value.info = val
      },
      hasImgAndUpload: function(e, editor) {
				let fileInput = e.target
				if (fileInput.files.length === 0) {
					return
				}
				editor.editor.focus()
				if (fileInput.files[0].size > editor.maxUploadSize) {
					editor.$alert('图片不能大于500MB', '图片尺寸过大', {
						confirmButtonText: '确定',
						type: 'warning'
					})
				}
				let data = new FormData()
				// data.append(editor.fileName, fileInput.files[0])
        data.append('file', fileInput.files[0])
        // data.append('file', item.file)
        upload_img(
            data
          )
          .then((res) => {
            if (res.data.err_code == 0) {
              editor.editor.insertEmbed(editor.editor.getSelection().index, 'image', res.data.err_msg.url)
            } else {
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
			},
      onEditorChange({ editor, html, text }) {
        console.log(html)
          this.content = html;
      },

      //启用
      enable (index , row) {
        console.log(row)
        let that = this
        row.status = 1
      },

      //禁用
      stop_useing (index , row) {
        console.log(row)
        let that = this
        row.status = 2
      },

      handlePrev(){
        this.$emit('prevStep')
      },
      handleSel(val){
        if(val.label == '成本价(元)' || val.label == '重量(kg)' || val.label == '可售库存'){
          this.form_X.level = ''
          this.title = '批量设置:' + val.label
          this.opening_change_ifShow = true
          this.O_message = val
        }
        
      },
      submit_saveChanges_level(){
        if(this.form_X.level == '') {
          this.$message({
            message: '请填写批量设置内容.',
            type: 'warning'
          });
          return
        }
        if(this.O_message.label == '成本价(元)'){
          this.value.skuList.forEach((item,index) => {
            item.prime_cost_price = this.form_X.level
          })
        }else if(this.O_message.label == '重量(kg)'){
          this.value.skuList.forEach((item) => {
            item.weight = this.form_X.level
          })
        }else if(this.O_message.label == '可售库存'){
          this.value.skuList.forEach((item) => {
            item.quantity = this.form_X.level
          })
        }
        this.opening_change_ifShow = false
        console.log(this.O_message.label)
        console.log(this.value.skuList)
      },
      handleFinishCommit(){
        let that = this
        console.log(this.value.skuList)
        let leg = false
        let leg1 = false
        let leg2 = false
        let leg3 = false
        let leg4 = false
        this.value.skuList.forEach(element => {
          
          if(element.prime_cost_price == '' || element.quantity == '' || element.weight == '') {
            leg = true
            return
          } else if (parseFloat(element.prime_cost_price) < 0.1 ) {
            // that.$message({
            //   message: '结算价、市场价、销售价不能低于0.1元',
            //   type: 'warning'
            // });
            leg1 = true
            return
          }
          
          else if (parseInt(element.quantity) < 0 ) {
            // that.$message({
            //   message: '库存数量需要大于1',
            //   type: 'warning'
            // });
            leg4 = true
            return
          }
        });
        if(leg == true) {
          that.$message({
            message: '请将表格信息填写完整',
            type: 'warning'
          });
          return
        }
        if(leg1 == true) {
          that.$message({
            message: '结算价、市场价、销售价不能低于0.1元',
            type: 'warning'
          });
          return
        }
        if(leg2 == true) {
          that.$message({
            message: '市场价需要大于销售价',
            type: 'warning'
          });
          return
        }
        if(leg3 == true) {
          that.$message({
            message: '结算价需要小于销售价',
            type: 'warning'
          });
          return
        }
        if(leg4 == true) {
          that.$message({
            message: '库存数量不能小于0',
            type: 'warning'
          });
          return
        }
        if(that.value.info == '') {
          that.$message({
            message: '请填写商品介绍',
            type: 'warning'
          });
          return
        }
        this.$emit('finishCommit',this.isEdit);
      }
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

/deep/ .ql-toolbar.ql-snow+.ql-container.ql-snow{
  .ql-editor{
    min-height: 500px;
  }
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
