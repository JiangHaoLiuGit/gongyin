<template>
  <div class="goodsindex">
    <div class="seach">
      
    </div>
    <div class="seach_copy">
      <div class="seach_select">
        <el-input v-model="tpl_name" placeholder="请输入模板名称"></el-input>
      </div>
      <div class="button_type">
        <el-button type="primary" @click="pick_seach">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增模板</el-button>
        <el-button type="danger" @click="deletes">批量删除</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)">刷新</el-button>
      </div>
    </div>
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="postageList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            >
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="tpl_id"
            label="模板ID"
          >
          </el-table-column>
          <el-table-column 
            prop="tpl_name" 
            label="模板名称" 
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="modify(scope.row,'1')"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deletet(scope.row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="modify(scope.row,'2')"
                >查看</el-button
              >
              
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 修改,删除弹窗 -->
      <el-dialog :visible.sync="opening_change_ifShow" :title="title">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="模板名称">
              <el-input v-model="form.tpl_name" placeholder="请输入模板名称" style="width:72%;" :disabled="title=='查看详情'"></el-input>
              <el-button type="primary" size="medium" @click="addTpl" style="float:right;margin-top:2px;" v-show="title != '查看详情'">增加运费模板</el-button>
            </el-form-item>
            <div v-for="(item,index) in form.list" :key="index">
              <h2 v-show="form.list.length > 1">模板{{index+1}}.</h2>
              <el-form-item label="模板配送区域">
                <el-select v-model="item.tpl_area" multiple collapse-tags placeholder="请选择" v-show="title != '查看详情'">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.province_id"
                    :label="item.name"
                    :value="item.province_id">
                  </el-option>
                </el-select>
                <span v-for="(itm,ind) in item.tpl_area_arr" :key="ind" v-show="title == '查看详情'">
                  {{itm}} |
                </span>
                <el-button type="primary" size="danger" v-if="form.list.length > 1 && title != '查看详情'" @click="deleteTpl(index)" style="float:right;margin-top:2px;">删除</el-button>
              </el-form-item>
              <el-form-item label="不包含的配送区域">
                <el-select v-model="item.not_included" multiple collapse-tags placeholder="请选择" v-show="title != '查看详情'">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.province_id"
                    :label="item.name"
                    :value="item.province_id">
                  </el-option>
                </el-select>
                <span v-for="(itm,ind) in item.not_included_arr" :key="ind" v-show="title == '查看详情'">
                  {{itm}} |
                </span>
              </el-form-item>
              <el-form-item label="结算方式">
                <el-select v-model="item.method" placeholder="请选择结算方式" :disabled="title=='查看详情'">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="首件数/首重">
                <el-input v-model="item.first" type="number" placeholder="单位:元/kg" :disabled="title=='查看详情'"></el-input>
              </el-form-item>
              <el-form-item label="首费">
                <el-input v-model="item.first_cost" type="number" placeholder="单位:元" :disabled="title=='查看详情'"></el-input>
              </el-form-item>
              <el-form-item label="续件/续重">
                <el-input v-model="item.next" type="number" placeholder="单位:件/kg" :disabled="title=='查看详情'"></el-input>
              </el-form-item>
              <el-form-item label="续费(元)">
                <el-input v-model="item.renew" type="number" placeholder="单位:元" :disabled="title=='查看详情'"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" v-show="title!='查看详情'">
            <el-button @click="opening_change_ifShow = false">取 消</el-button>
            <div v-if="type == 1" style="display:inline-block">
                <el-button type="primary" @click="submit_saveChanges_level"
                >增加</el-button
                >
            </div>
            <div v-else-if="type == 2" style="display:inline-block">
                <el-button type="primary" @click="submit_saveChanges_level"
                >修改</el-button
                >
            </div>
          </div>
    </el-dialog>
   
    <!-- 分页 -->
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24" class="goodsindex-page-box">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo.total"
          >
          </el-pagination>
      </el-col>
      </el-row>
  </div>
</template>

<script>
import { tpl_list , postage_tpl , add_postage_tpl , save_postage_tpl,postage_del ,get_province,
  get_city,
  get_area,} from "../../utils/axios";
export default {
  data() {
    return {
      postageList: [], //店铺列表
      loading : false,
      O_message : {},
      tpl_name:"",
      title:"",
      multipleSelection : [],//选中的数据
      opening_change_ifShow:false,
      provinceList :[], //省
      fn1: this.commonJs.Debounce(this.get_postage_list),
      queryInfo: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      options: [{
        value: '1',
        label: '件数'
      }, {
        value: '2',
        label: '重量'
      }],
      form:{
        tpl_name:"",
        list:[
          {
            tpl_area:"",
            not_included:"",
            method:"",
            first	:"",
            first_cost:"",
            next:"",
            renew:""
          }
        ]
      },
      type:1,
      broad:"",
      title:"",
    };
  },

  created() {
    this.get_postage_list(); //获取代理列表
    this.get_province() //获取省份
  },
  watch:{
    "opening_change_ifShow":{
      handler:function(news,olds){
        if(!news){
          this.form = {
            tpl_name:"",
            list:[
              {
                tpl_area:"",
                not_included:"",
                method:"",
                first	:"",
                first_cost:"",
                next:"",
                renew:""
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    addTpl(){
      this.form.list.push({
        tpl_area:"",
        not_included:"",
        method:"",
        first	:"",
        first_cost:"",
        next:"",
        renew:""
      })
    },
    deleteTpl(index){
      this.form.list.splice(index,1)
    },
    //获取代理列表
    get_postage_list (index) {
      let that = this
      this.tpl_name = ""
      that.loading = true
      tpl_list({
        page_size:10,
        page:1
      }).then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            
            that.loading = false
            that.postageList = res.data.err_msg.list
            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
            if(index == 1) {
              that.$message({
                message: '刷新成功',
                type: 'success'
              });
            }
          } else {
            that.loading = false
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: 'error'
            });
          }
        })
        .catch((error) => {
          that.loading = false
          console.log(error);
        });
    },
    // 获取省
    get_province(){
      let that = this
      get_province().then(res=>{
        if(res.data.err_code==0){
          if(res.data.err_msg){
              for(let i in res.data.err_msg){
                that.provinceList.push({
                  province_id:i,
                  name:res.data.err_msg[i]
                })
              }
          }
        }else{
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: 'error'
          });
        }
      })
    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页显示条数改变
    handleSizeChange(val) {
      this.get_shop_list_page(1, val);
    },
    //当前页
    handleCurrentChange(val) {
      this.get_shop_list_page(val, this.pageSize);
    },
    //分页
    get_shop_list_page(page, number) {
      let that = this;
      that.loading = true;
      tpl_list({
        page: page,
        page_size: number,
        tpl_name:this.tpl_name
      }).then((res) => {
        if (res.data.err_code == 0) {
          that.loading = false;
          
          that.postageList = res.data.err_msg.list;
          this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
          this.queryInfo.page = parseInt(res.data.err_msg.page);
          this.queryInfo.total = parseInt(res.data.err_msg.total_number);
        } else {
          that.loading = false;
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      })
      .catch((error) => {
        that.loading = false;
      });
    },
    //搜索
    pick_seach () {
      let that = this
      if(that.tpl_name == '') {
        that.$message({
          message: '请选择任意一种搜索类型',
          type: 'warning'
        });
        return
      }
      that.loading = true;
      tpl_list({
        page: 1,
        page_size: 20,
        tpl_name:this.tpl_name
      }).then((res) => {
        if (res.data.err_code == 0) {
          that.loading = false;
          // res.data.err_msg.list.forEach((element) => {
          //     element.save_time = that.commonJs.timestampToTime(
          //       element.save_time
          //     );
          //     element.first = Number(element.first).toFixed(2)
          //     element.first_cost = Number(element.first_cost).toFixed(2)
          //     element.next = Number(element.next).toFixed(2)
          //     element.renew = Number(element.renew).toFixed(2)
          //   });
          that.postageList = res.data.err_msg.list;
          this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
          this.queryInfo.page = parseInt(res.data.err_msg.page);
          this.queryInfo.total = parseInt(res.data.err_msg.total_number);
        } else {
          that.loading = false;
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      })
      .catch((error) => {
        that.loading = false;
      });
    },
    modify(item,ind) {
      if(ind == "1"){
        this.opening_change_ifShow = true
        this.type = 2
        this.broad = item
        this.title = "修改地址"
      }else if(ind == "2"){
        this.opening_change_ifShow = true
        this.broad = item
        this.title = "查看详情"
      }
        this.form = {
          tpl_name:"",
          list:[]
        }
        postage_tpl({
          tpl_id:item.tpl_id,
        }).then((res) => {
            if (res.data.err_code == 0) {
              
              res.data.err_msg.info.value.forEach((item,index) => {
                let arr1 = []
                for(let i in item.tpl_area_arr){
                  arr1.push(i)
                }
                let arr3 = []
                for(let i in item.not_included_arr){
                  arr3.push(i)
                }
                item.first = Number(item.first).toFixed(2)
                item.first_cost = Number(item.first_cost).toFixed(2)
                item.next = Number(item.next).toFixed(2)
                item.renew = Number(item.renew).toFixed(2)
                let obj = {
                  tpl_area:arr1,
                  not_included:arr3,
                  method:item.method,
                  first:item.first,
                  first_cost:item.first_cost,
                  next:item.next,
                  renew:item.renew,
                  tpl_area_arr:item.tpl_area_arr,
                  not_included_arr:item.not_included_arr
                }
                this.form.list.push(obj)
                // delete item.tpl_area_arr
                // delete item.id
                // delete item.tpl_id
                // delete item.save_time
                // delete item.is_del
              })
              this.form.tpl_name = res.data.err_msg.info.tpl_name
              
              // this.form.list = res.data.err_msg.info.value
            } else {
                this.$message({
                    showClose: true,
                    message: res.data.err_msg,
                    type: "error",
                });
            }
        });
    },
    add(){
      this.opening_change_ifShow = true
      this.type = 1
      this.title = "增加地址"
    },
    submit_saveChanges_level(){
      for(let i = 0 ; i < this.form.list.length ; i ++){
        let item = this.form.list[i]
        if(this.form.tpl_name == '' || item.tpl_area.length == 0 || item.not_included.length == 0 || item.method == '' || item.first == '' || item.first_cost == '' || item.next == '' || item.renew == '') {
          this.$message({
            showClose: true,
            message: '请至少选择一条数据',
            type: 'error'
          });
          return
        }
        // console.log(item.tpl_area)
        // console.log(item.not_included)
      }
      
      this.form.list.forEach((item,index) => {
        item.tpl_area = item.tpl_area.join("&")
        item.not_included = item.not_included.join(",")
      })
      let data = {
        tpl_name:this.form.tpl_name,
        tpl_value:JSON.stringify(this.form.list)
      }
      if(this.type == 1){
        //增加
        // console.log(data)
        // return
        add_postage_tpl(
          data
        ).then((res) => {
          if (res.data.err_code == 0) {
              this.$message({
                  message: '增加成功',
                  type: 'success'
              });
              this.opening_change_ifShow = false
              this.get_postage_list();
              this.form.tpl_name = ''
              this.form.list = [
                {
                  tpl_area:"",
                  not_included:"",
                  method:"",
                  first	:"",
                  first_cost:"",
                  next:"",
                  renew:""
                }                    
              ]
          } else {
              this.$message({
                  showClose: true,
                  message: res.data.err_msg,
                  type: "error",
              });
          }
        });
      }else{
        //修改
        data.tpl_id = this.broad.tpl_id
        data.tpl_value = JSON.parse(data.tpl_value)
        let arr = []
        data.tpl_value.forEach(item => {
          let obj = {}
          obj.tpl_area= item.tpl_area
          obj.not_included = item.not_included
          obj.method = item.method
          obj.first = item.first
          obj.first_cost = item.first_cost
          obj.next = item.next
          obj.renew = item.renew
          arr.push(obj)
        })
        data.tpl_value = JSON.stringify(arr)
        save_postage_tpl(
          data
        ).then((res) => {
            if (res.data.err_code == 0) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.opening_change_ifShow = false
                this.get_postage_list();
                this.form.tpl_name = ''
                this.form.tpl_area = []
                this.form.not_included = []
                this.form.method = ''
                this.form.first = ''
                this.form.first_cost = ''
                this.form.next = ''
                this.form.renew = ''
            } else {
                this.$message({
                    showClose: true,
                    message: res.data.err_msg,
                    type: "error",
                });
            }
        });
      }
      
    },
    //单个删
    deletet(row) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row)
          postage_del({
            tpl_ids: row.tpl_id,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.get_postage_list();
            } else {
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },
    //多个删除
    deletes () {
      let that = this
      if(that.multipleSelection.length < 1) {
        that.$message({
          showClose: true,
          message: '请至少选择一条数据',
          type: 'error'
        });
      } else {
        let name = ''
        let idArr = ''
        console.log(that.multipleSelection)
        that.multipleSelection.forEach(element => {
          if(name == '') {
            name = element.tpl_name
            idArr = element.tpl_id
          } else {
            name = name + '、' + element.tpl_name
            idArr = idArr + ',' + element.tpl_id
          }
        })
        this.$confirm('此操作将删除运费模板的名称为 : ' + name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          postage_del({
            tpl_ids: idArr,
          })
            .then((res_s) => {
              console.log(res_s);
              if (res_s.data.err_code == 0) {
                that.$message({
                  message: '删除成功',
                  type: 'success'
                });
                that.get_postage_list();
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
        }).catch(() => {
                
        });
      }
    }
  },
};
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
.el-dialog__wrapper{
  display: flex;
  align-items:center;
  justify-content:center;
}
/deep/ .el-dialog {
  height: 700px;
  overflow-y: auto;
  width: 800px !important;
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
  text-align-last: left;
  width: 130px!important;
}
/deep/ .el-form-item__content{
  margin-left: 130px!important;
}
/deep/ .el-dialog__body {
  padding: 30px 50px;
}
.divRow{
  margin: 10px 0;
  .boxDiv{
    
    .labelDiv{
      width: 25%;
      float: left;
      font-size: 16px;
      line-height: 25px;
    }
    .textDiv{
      width: 75%;
      float:left;
      font-size: 16px;
      line-height: 25px;
    }
  }
}
</style>