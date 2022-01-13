<template>
  <div style="margin-top: 50px">
    <!-- 下面  -->
    <el-form :model="value" ref="productSaleForm_f" v-show="value.specifications == '2'" label-width="120px" style="width: 600px" size="small">
      <el-form-item style="text-align: center">
        <h3>不显示销售属性</h3>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext_copy">下一步</el-button>
      </el-form-item>
    </el-form>

    <!-- 下面  v-show="value.specifications == '1'"  -->
    <div v-show="value.specifications == '1'">
      <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">
        <h3>销售属性：</h3>
        <el-form-item label="属性模板：">
          <el-radio v-model="value.enableTemplate" label="1">启用</el-radio>
          <el-radio v-model="value.enableTemplate" label="2">不启用</el-radio>
        </el-form-item>
      </el-form>
      <!-- 属性模板 -->
      <!-- 下面  && value.specifications == '1'  -->
      <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small" v-show="value.template_show">
        <el-form-item>
          <el-button size="medium" type="primary"  @click="addProperty">添加销售属性</el-button>
        </el-form-item>
        <el-form-item label="模板选择：" v-show="value.property_list.length > 0">
          <el-checkbox-group v-model="value.templateValue" >
            <el-checkbox v-for="(item_second,index_second) in value.property_list" :key="index_second" :label="item_second.pid" >{{item_second.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 销售属性列表 -->
        <el-form-item 
          v-for="(item_first,index_first) in value.property_list_value" 
          :key="index_first"
          :label="item_first.name + '：'"
          v-show="item_first.checked"
        >
        <!--  -->
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
                  :preview-src-list="[item_two.image]"
                  fit="cover"></el-image>
                <el-upload
                  class="upload-demo"
                  action=""
                  list-type="picture-card"
                  :show-file-list = "false"
                  :http-request="img_upload_t"
                  :before-upload="img_beforeUpload"
                >
                  <i class="el-icon-plus" @click="upload(index_first,index_two,1)"></i>
                </el-upload>
                  {{item_two.value}} {{item_two.name}}
                  
                  <div 
                    style="position:absolute;top:-14px;right:-15px;cursor:pointer;width:30px;height:30px;line-height:30px;font-size:20px;text-align:center;"
                    @click="del_property_value(index_first,index_two,item_two)"
                  ><i class="el-icon-delete"></i></div>
              </li>
            </ul>
            <el-button size="medium" type="primary"  @click="add_property_value(index_first,item_first)">添加属性值</el-button>
            <el-button size="medium" type="danger"  @click="del_property(index_first,item_first)">删除销售属性</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button size="medium" @click="handlePrev">上一步</el-button>
          <el-button type="primary" size="medium" @click="handleNext(1)">下一步</el-button>
        </el-form-item>
      </el-form>

      <!-- 自定义模板 -->
      <!-- 下面  && value.specifications == '1' -->
      <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small" v-show="!value.template_show">
        <el-form-item>
          <el-button size="medium" type="primary"  @click="addPropertyN">添加销售属性</el-button>
        </el-form-item>

        <!-- 销售属性列表 -->
        <el-form-item 
          v-for="(item_first,index_first) in value.property_list_copy" 
          :key="index_first"
          :label="item_first.name + '：'"  
          v-show="item_first.checked" 
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
                  :preview-src-list="[item_two.image]"
                  fit="cover"></el-image>
                <el-upload
                  class="upload-demo"
                  action=""
                  list-type="picture-card"
                  :show-file-list ="false"
                  :http-request="img_upload_t"
                  :before-upload="img_beforeUpload"
                >
                  <i class="el-icon-plus" @click="upload(index_first,index_two,2)"></i>
                </el-upload>
                  {{item_two.value}} {{item_two.name}}
                  <div 
                    style="position:absolute;top:-14px;right:-15px;cursor:pointer;width:30px;height:30px;line-height:30px;font-size:20px;text-align:center;"
                    @click="del_property_value_n(index_first,index_two,item_two)"
                  ><i class="el-icon-delete"></i></div>
              </li>
            </ul>
            <el-button size="medium" type="primary"  @click="add_property_value_n(index_first,item_first)">添加属性值</el-button>
            <el-button size="medium" type="danger"  @click="del_property_n(index_first,item_first)">删除销售属性</el-button>
          </div>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button size="medium" @click="handlePrev">上一步</el-button>
          <el-button type="primary" size="medium" @click="handleNext(2)">下一步</el-button>
        </el-form-item>
      </el-form>

      <!-- 添加销售属性 -->
      <el-dialog title="添加销售属性" :visible.sync="addPropertyVisible">
        <el-form :model="form_property">
          <el-form-item label="销售属性名：" :label-width="formLabelWidth">
            <el-input v-model="form_property.name" @keyup.enter.native="add_property_sure" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPropertyVisible = false">取 消</el-button>
          <el-button type="primary" @click="add_property_sure">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加销售属性值 -->
      <el-dialog title="添加销售属性值" :visible.sync="addPropertyValueVisible">
        <el-form :model="form_property_value">
          <el-form-item label="销售属性值：" :label-width="formLabelWidth">
            <el-input v-model="form_property_value.name" @keyup.enter.native="add_property_value_sure" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPropertyValueVisible = false">取 消</el-button>
          <el-button type="primary" @click="add_property_value_sure">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加销售属性 自定义模板-->
      <el-dialog title="添加销售属性" :visible.sync="addPropertyVisibleN">
        <el-form :model="form_property_n">
          <el-form-item label="销售属性名：" :label-width="formLabelWidth">
            <el-input v-model="form_property_n.name" @keyup.enter.native="add_property_sure_n" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPropertyVisibleN = false">取 消</el-button>
          <el-button type="primary" @click="add_property_sure_n">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加销售属性值 自定义模板-->
      <el-dialog title="添加销售属性值" :visible.sync="addPropertyValueVisibleN">
        <el-form :model="form_property_value_n">
          <el-form-item label="销售属性值：" :label-width="formLabelWidth">
            <el-input v-model="form_property_value_n.name" @keyup.enter.native="add_property_value_sure_n" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPropertyValueVisibleN = false">取 消</el-button>
          <el-button type="primary" @click="add_property_value_sure_n">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
  import { property_name , property_value_del , property_value , property_name_del , upload_img } from "../../../../utils/axios";
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
        formLabelWidth : '120px',
        addPropertyVisible : false,//添加销售属性名弹窗
        form_property : {
          name : ''
        },
        addPropertyValueVisible : false,//添加销售属性值弹窗
        form_property_value : {
          name : ''
        },
        property_value_item : {},
        property_value_index : -1,
        addPropertyVisibleN : false,//添加销售属性名弹窗 - 自定义
        form_property_n : {
          name : ''
        },
        addPropertyValueVisibleN : false,//添加销售属性值弹窗 - 自定义
        form_property_value_n : {
          name : ''
        },
        property_value_item_n : {},
        property_value_index_n : -1,
        img_upload_err_o : false,
        img_upload_err_t : false,
        index_o: {},
        index_t : -1,
        index : -1,
      }
    },

     watch:{

      'value.enableTemplate':{
        handler:function(news,olds){
          if(news == 1){
            this.value.template_show = true
          } else {
            this.value.template_show = false
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

      'value.templateValue':{
        handler:function(news,olds){
          console.log(news)
          let that = this
          this.value.property_list_value.forEach(element => {
            let leg = false
            news.forEach(item => {
              if (element.pid == item) {
                leg = true
              }
            })
            if(leg == true) {
              element.checked = true
            } else {
              element.checked = false
            }
          });
        },
        deep:true ,//true 深度监听
        immediate: true
      },
    },
   
    created() {
      let that = this
      if(that.value.specifications == 2){
        that.value.specifications = 1
      }
      setTimeout(() => {
        
        // this.value.property_list_value.forEach(item => {
        //   item.checked = true
        // })
      },2000)
      
    },

    methods: {

      //添加销售属性名
      addProperty () {
        this.form_property.name = ''
        this.addPropertyVisible = true
      },

      //确认添加销售属性名
      add_property_sure () {
        let that = this
        if(this.form_property.name == '' ) {
          that.$message({
            message: '请输入销售属性名',
            type: 'warning'
          });
          return
        }
        property_name(
          {
            name : that.form_property.name
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.addPropertyVisible = false
              that.value.property_list_value.push({
                checked : true,
                is_public : '2',
                name : that.form_property.name,
                pid : res.data.err_msg.pid,
                value : []
              })
              that.value.templateValue.push(res.data.err_msg.pid)
            } else {
              that.addPropertyVisible = false
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            that.addPropertyVisible = false
            console.log(error);
          });
      },

      //删除销售属性
      del_property (index , item) {
        let that = this
        console.log(item)
        this.$confirm('此操作将删除' + item.name + '销售属性,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.is_public == 1 ) {
            if(that.value.property_list_value.length < 0) {
              that.$message({
                message: '销售属性至少需要一条',
                type: 'warning'
              });
            } else {
              that.value.property_list_value.splice(index,1)
            }
          } else {
            property_name_del(
              {
                pid : item.pid
              }
            )
              .then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  if(that.value.property_list_value.length < 0) {
                    that.$message({
                      message: '销售属性至少需要一条',
                      type: 'warning'
                    });
                  } else {
                    that.value.property_list_value.splice(index,1)
                    that.value.templateValue.forEach((ele,index) => {
                      if(ele == item.pid) {
                        that.value.templateValue.splice(index,1)
                      }
                    })
                  }
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
          }
        }).catch(() => {
                
        });
      },

      //删除属性值
      del_property_value (f_idenx , index , item) {
        let that = this
        console.log(item)
        this.$confirm('此操作将删除' + item.name + '属性值,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.is_public == 1 ) {
            that.value.property_list_value[f_idenx].value.forEach((ele,ele_index) => {
              if(ele.vid == item.vid) {
                that.value.property_list_value[f_idenx].value.splice(index,1)
              }
            })
          } else {
            property_value_del(
              {
                vid : item.vid
              }
            )
              .then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  that.value.property_list_value[f_idenx].value.forEach((ele,ele_index) => {
                    if(ele.vid == item.vid) {
                      that.value.property_list_value[f_idenx].value.splice(index,1)
                    }
                  })
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
          }
        }).catch(() => {
                
        });
      },

      //添加属性值
      add_property_value (index , item) {
        console.log(item)
        this.property_value_item = item
        this.property_value_index = index
        this.form_property_value.name = ''
        this.addPropertyValueVisible = true
      },

      //确认添加属性值
      add_property_value_sure () {
        let that = this
        if(this.form_property_value.name == '' ) {
          that.$message({
            message: '请输入销售属性值',
            type: 'warning'
          });
          return
        }
        property_value(
          {
            value : that.form_property_value.name,
            pid : that.property_value_item.pid
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.addPropertyValueVisible = false
              that.value.property_list_value[that.property_value_index].value.push({
                is_public : '2',
                value : that.form_property_value.name,
                pid : that.property_value_item.pid,
                vid : res.data.err_msg.vid,
                image : ''
              })
            } else {
              that.addPropertyValueVisible = false
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            that.addPropertyValueVisible = false
            console.log(error);
          });
      },

      //添加销售属性名-自定义
      addPropertyN () {
        this.form_property_n.name = ''
        this.addPropertyVisibleN = true
      },

      //确认添加销售属性名-自定义
      add_property_sure_n () {
        let that = this
        if(this.form_property_n.name == '' ) {
          that.$message({
            message: '请输入销售属性名',
            type: 'warning'
          });
          return
        }
        property_name(
          {
            name : that.form_property_n.name
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.addPropertyVisibleN = false
              that.value.property_list_copy.push({
                checked : true,
                is_public : '2',
                name : that.form_property_n.name,
                pid : res.data.err_msg.pid,
                value : []
              })
            } else {
              that.addPropertyVisibleN = false
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            that.addPropertyVisibleN = false
            console.log(error);
          });
      },

      //删除销售属性-自定义
      del_property_n (index , item) {
        let that = this
        console.log(item)
        this.$confirm('此操作将删除' + item.name + '销售属性,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.is_public == 1 ) {
            if(that.value.property_list_copy.length < 0) {
              that.$message({
                message: '销售属性至少需要一条',
                type: 'warning'
              });
            } else {
              that.value.property_list_copy.splice(index,1)
            }
          } else {
            property_name_del(
              {
                pid : item.pid
              }
            )
              .then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  if(that.value.property_list_copy.length < 0) {
                    that.$message({
                      message: '销售属性至少需要一条',
                      type: 'warning'
                    });
                  } else {
                    that.value.property_list_copy.splice(index,1)
                  }
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
          }
        }).catch(() => {
                
        });
      },

      //删除属性值-自定义
      del_property_value_n (f_idenx , index , item) {
        let that = this
        console.log(item)
        this.$confirm('此操作将删除' + item.value + '属性值,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.is_public == 1 ) {
            that.value.property_list_copy[f_idenx].value.forEach((ele,ele_index) => {
              if(ele.vid == item.vid) {
                that.value.property_list_copy[f_idenx].value.splice(index,1)
              }
            })
          } else {
            property_value_del(
              {
                vid : item.vid
              }
            )
              .then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  that.value.property_list_copy[f_idenx].value.forEach((ele,ele_index) => {
                    if(ele.vid == item.vid) {
                      that.value.property_list_copy[f_idenx].value.splice(index,1)
                    }
                  })
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
          }
        }).catch(() => {
                
        });
      },

      //添加属性值-自定义
      add_property_value_n (index , item) {
        console.log(item)
        this.property_value_item_n = item
        this.property_value_index_n = index
        this.form_property_value_n.name = ''
        this.addPropertyValueVisibleN = true
      },

      //确认添加属性值-自定义
      add_property_value_sure_n () {
        let that = this
        if(this.form_property_value_n.name == '' ) {
          that.$message({
            message: '请输入销售属性值',
            type: 'warning'
          });
          return
        }
        property_value(
          {
            value : that.form_property_value_n.name,
            pid : that.property_value_item_n.pid
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.addPropertyValueVisibleN = false
              that.value.property_list_copy[that.property_value_index_n].value.push({
                is_public : '2',
                value : that.form_property_value_n.name,
                pid : that.property_value_item_n.pid,
                vid : res.data.err_msg.vid,
                image : ''
              })
            } else {
              that.addPropertyValueVisibleN = false
              that.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            that.addPropertyValueVisibleN = false
            console.log(error);
          });
      },

      //上传图片之前
      img_beforeUpload (file,index) {
        console.log(file)
        if(file.type != 'image/jpeg' && file.type != 'image/jpg' && 
            file.type != 'image/png' && file.type != 'image/gif' &&
            file.type != 'image/JPEG' && file.type != 'image/JPG' &&
            file.type != 'image/PNG' && file.type != 'image/GIF'
            ) {
            this.$message.error('请上传图片格式!');
            if(this.index == 1) {
              this.img_upload_err_o = true
            } else {
              this.img_upload_err_t = true
            }
        } else if ( file.size / 1024 / 1024 > 200) {
          this.$message.error('图片大小不能超过 200MB!');
          if(this.index == 1) {
            this.img_upload_err_o = true
          } else {
            this.img_upload_err_t = true
          }
        }
      },

      //上传图片
      img_upload_t: function(item,index) {
        console.log(item)
        this.img_upload_err_o = false
        this.img_upload_err_t = false
        let that = this
        if (this.img_upload_err_o == false && this.index == 1) {
          let fd = new FormData()
          fd.append('file', item.file)
          console.log(fd.get("file"))
          upload_img(
            fd
          )
            .then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                let leg = false
                console.log(that.index_o , that.index_t )
                // that.value.property_list_value.forEach((ele,index_ele) => {
                //   if(ele.value.length > 0 && index_ele != that.index_o ) {
                //     ele.value.forEach(element => {
                //       if(element.image != '') {
                //         leg = true
                //         return
                //       }
                //     })
                //   }
                // })
                if(leg == true) {
                  that.$message({
                    message: '已存在上传图片的属性名',
                    type: 'warning'
                  });
                } else {
                  that.value.property_list_value[that.index_o].value[that.index_t].image = res.data.err_msg.url
                  console.log(that.value.property_list_value)
                }
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
        } else if (this.img_upload_err_t == false && this.index == 2) {
          let fd = new FormData()
          fd.append('file', item.file)
          console.log(fd.get("file"))
          upload_img(
            fd
          )
            .then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                let leg = false
                console.log(that.index_o , that.index_t )
                // that.value.property_list_copy.forEach((ele,index_ele) => {
                //   if(ele.value.length > 0 && index_ele != that.index_o ) {
                //     ele.value.forEach(element => {
                //       if(element.image != '') {
                //         leg = true
                //         return
                //       }
                //     })
                //   }
                // })
                if(leg == true) {
                  that.$message({
                    message: '已存在上传图片的属性名',
                    type: 'warning'
                  });
                } else {
                  that.value.property_list_copy[that.index_o].value[that.index_t].image = res.data.err_msg.url
                  console.log(that.value.property_list_copy)
                }
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
        }
      },

      //上传
      upload(index_first , index_two ,index) {
        console.log(index_first , index_two)
        let that = this
        that.index_o = index_first
        that.index_t = index_two
        that.index = index
      },

      //上一步
      handlePrev() {
        this.$emit('prevStep')
      },

      //下一步
      handleNext() {
         // 测试的数据
        // let arrs = [['红','黄', '蓝'], ['大', '中', '小'], ['大', '中', '小']] // 如果你的数据类型是其他形式,需要转换成二维数组的格式再进行

        // /**
        //  * 思路: 以第一项为基础,循环合并之后的每一项再循环的值
        //  * @param {*} acc 累计的值
        //  * @param {*} cur 当前遍历项
        //  * @param {*} index 当前遍历索引
        //  */ 
        // let result = arrs.reduce((acc, cur, index) => {
        //   console.log(acc , cur , index )
        //   从第二项开始合并值
        //   if (index > 0) {
        //     let saveArr = []
        //     acc.forEach(item => {
        //       cur.forEach(subItem => {
        //         saveArr.push(`${item},${subItem}`)
        //       })
        //     })
        //     acc = saveArr
        //   }
        //   return acc
        // }, arrs[0]) // 把数组的第一项传入作为初始值
        // console.log(result) //["红,大", "红,中", "红,小", "黄,大", "黄,中", "黄,小", "蓝,大", "蓝,中", "蓝,小"]
        let that = this
        let arr = []
        if(this.value.enableTemplate == 1) { //启用销售模板
          if(this.value.templateValue.length == 0 && this.value.enableTemplate == 1) {

            that.$message({
              message: '请选择至少一种属性模板',
              type: 'warning'
            });
            return
          }
          console.log(this.value.property_list_value)
          this.value.property_list_value.forEach(element => {
            if(element.checked == true) {
              arr.push(element)
            }
          })
        } else {
          console.log(this.value.property_list_copy)
          if(this.value.property_list_copy.length == 0) {
            if(this.value.specifications == 2){

            }else{
              that.$message({
                message: '请添加至少一个销售属性',
                type: 'warning'
              });
              return
            }
            
          }else{
            this.value.property_list_copy.forEach(element => {
              if(element.checked == true) {
                arr.push(element)
              }
            })
          }
          
        }
        console.log(arr)
        let leg = false
        arr.forEach(ele =>{
          console.log(ele)
          if(ele.value.length == 0 ){
            leg = true
            return;
          }
        })
        if(leg == true) {
          that.$message({
            message: '属性下的属性值不能为空,请检查!',
            type: 'warning'
          });
          return;
        }
        let arrs = []
        console.log(arr)
        arr.forEach(item => {
          let array = []
          item.value.forEach(element => {
            console.log()
            array.push({
              name : item.name,
              pid : item.pid,
              value : element.value ? element.value : element.name,
              vid : element.vid,
              image : element.image
            })
          })
          arrs.push(array)
        })
        console.log(arrs)
        if(arrs.length != 0){
          console.log(arrs)
          console.log(arrs[0][0])
          /**
           * 思路: 以第一项为基础,循环合并之后的每一项再循环的值
           * @param {*} acc 累计的值
           * @param {*} cur 当前遍历项
           * @param {*} index 当前遍历索引
           */ 
          let arr_copy = []
          let source  = {}
          let target = {}
          let result = arrs.reduce((acc, cur, index) => {
            console.log(acc , cur , index )
            // 从第二项开始合并值
            if (index > 0) {
              let saveArr = []
              acc.forEach(item => {
                console.log(item)
                cur.forEach((subItem,sub_index) => {
                  arr_copy = []
                  console.log(subItem)
                  if(item.length > 0 ) {
                    item.forEach(s_item => {
                      arr_copy.push(s_item)
                    })
                  } else {
                    arr_copy.push(item)
                  }
                  arr_copy.push(subItem)
                  saveArr.push(arr_copy)
                })
                console.log(arr_copy)
              })
              acc = saveArr
            }
            return acc
          }, arrs[0]) // 把数组的第一项传入作为初始值
          console.log(result)
          console.log(!result[0].length)

          if(!result[0].length) {
            that.value.skuList = []
            that.value.overTwo = false
            result.forEach(p_item => {
              that.value.skuListTitle = p_item.name
              that.value.skuList.push({
                value : p_item,
                prime_cost_price : '',
                weight : '',
                quantity : '',
                status : 1
              })
            })
          } else {
            that.value.overTwo = true
            that.value.titleList = []
            that.value.skuList = []
            that.value.sku_image = []
            result.forEach((t_item , t_index)=> { //存储表头
              source  = {}
              t_item.forEach((f_item,f_index) => {
                console.log(f_item)
                if(t_index == 0) {
                  that.value.titleList.push({
                    lable : f_item.name,
                    property : `costInfos${f_index}`
                  })
                }
                source[`costInfos${f_index}`] = f_item
              })
              target = {}
              let target = {
                prime_cost_price : '',
                weight : '',
                quantity : '',
                status : 1
              }
              console.log(source)
              
              const returnedTarget = Object.assign(target, source);
              that.value.skuList.push(returnedTarget)
            })
          }
          console.log(that.value.titleList)
          console.log(that.value.skuList)
        }
        
        if(that.value.overTwo == true ) {
          let tittleLength = that.value.titleList.length
          that.value.skuList.forEach(element => {
            for (let index = 0; index < tittleLength; index ++) {
              console.log(element[`costInfos${index}`])
              if(element[`costInfos${index}`].image  != '') {
                if(that.value.sku_image.length > 0) {
                  // that.value.sku_image.forEach(e_y => {
                    // if(e_y.vid != element[`costInfos${index}`].vid) {
                      that.value.sku_image.push({
                        vid : element[`costInfos${index}`].vid,
                        pid : element[`costInfos${index}`].pid,
                        image : element[`costInfos${index}`].image
                      })
                    // }
                  // })
                } else {
                  that.value.sku_image.push({
                    vid : element[`costInfos${index}`].vid,
                    pid : element[`costInfos${index}`].pid,
                    image : element[`costInfos${index}`].image
                  })
                }
              }
            }
          });
          console.log(that.value.sku_list)
          console.log(that.value.skuList)
          console.log(that.value.titleList)
          if(that.value.sku_list.length > 0 ) {
            that.value.skuList.forEach((element ,index )=> {
              that.value.sku_list.forEach((element_k  , elementk_idnex) => {
                let blean = true
                // that.value.titleList.forEach((t_y,t_index_y) => {
                //   if(element_k[`costInfos${t_index_y}`]){
                //     if(element_k[`costInfos${t_index_y}`].pid == element[`costInfos${t_index_y}`].pid) {
                //       if(element_k[`costInfos${t_index_y}`].value.vid == element[`costInfos${t_index_y}`].vid ) {
                //         element.weight = element_k.weight
                //         element.prime_cost_price = element_k.prime_cost_price
                //         element.quantity = element_k.quantity
                //         element.status =element_k.status
                //       }
                //     }
                //   }else{
                //     // console.log("我草.没辙了")
                //   }
                // })
                that.value.titleList.forEach((t_y, t_index_y) => {
                  if (element_k[`costInfos${t_index_y}`]) {
                    if (
                      element_k[`costInfos${t_index_y}`].pid == element[`costInfos${t_index_y}`].pid && element_k[`costInfos${t_index_y}`].value.vid == element[`costInfos${t_index_y}`].vid
                    ) {
                      
                    }else {
                      blean = false
                    }
                  } 
                });
                if(blean){
                  element.weight = element_k.weight
                  element.prime_cost_price = element_k.prime_cost_price
                  element.quantity = element_k.quantity
                  element.status =element_k.status
                }
              });
            });
          }
          
        } else {
          that.value.skuList.forEach(element => {
            if(element.value.image != '') {
              that.value.sku_image.push({
                vid : element.value.vid,
                pid : element.value.pid,
                image : element.value.image
              })
            }
          });

          if(that.value.sku_list.length > 0 ) {
            that.value.skuList.forEach((element ,index )=> {

              that.value.sku_list.forEach((element_k  , elementk_idnex) => {
                console.log(element_k.costInfos0)
                console.log(element)
                if(element_k.costInfos0.pid == element.value.pid) {

                  if(element_k.costInfos0.value.vid == element.value.vid ) {
                    element.weight = element_k.weight
                    element.prime_cost_price = element_k.prime_cost_price
                    element.quantity = element_k.quantity
                    element.status =element_k.status
                  }
                }
              })
            });
          }
        }
        console.log(that.value.sku_image)
        console.log(that.value.sku_list)
        this.$store.commit('SET_Srcoll',true)
        this.deteleObject(that.value.sku_image)
        that.$emit('nextStep')
      },
      deteleObject(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i]);
          keys.sort(function(a, b) {
              return (Number(a) - Number(b));
          });
          var str = '';
          for (var j = 0; j < keys.length; j++) {
              str += JSON.stringify(keys[j]);
              str += JSON.stringify(obj[i][keys[j]]);
          }
          if (!stringify.hasOwnProperty(str)) {
              uniques.push(obj[i]);
              stringify[str] = true;
          }
        }
        uniques = uniques;
        this.value.sku_image = uniques
        console.log(this.value.sku_image)
        return uniques;
      },
      handleNext_copy () {
        this.$emit('nextStep')
      }
    }
  }
</script>

<style scoped lang="less">
  .littleMarginLeft {
    margin-left: 10px;
  }
  我们做卖东西的.业绩
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
