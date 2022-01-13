<template>
  <div class="goodsindex">
    <div class="seach">
      
    </div>
    <div class="seach_copy">
      
    </div>
    <div class="button_type">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增地址</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)">刷新</el-button>
    </div>

    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="extendList"
          border
          :height="height"
          style="width: 100%"
        >
          <el-table-column 
            label="序号"
            type="index" 
            width="80"
          >
          </el-table-column>
          <el-table-column 
            prop="name" 
            label="用户昵称" 
          >
          </el-table-column>
          <el-table-column 
            prop="tel" 
            label="用户手机号" 
          >
          </el-table-column>
          <el-table-column label="是否默认">
            <template slot-scope="scope">
            <div v-if="scope.row.is_default == 1">默认地址</div>
            <div v-else>否</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="add_time" 
            label="添加时间" 
          >
          </el-table-column>
          <el-table-column label="省市区">
            <template slot-scope="scope">
              <div>{{scope.row.province_name}} {{scope.row.city_name}} {{scope.row.area_name}}</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="address" 
            label="详细地址" 
          >
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="addressDefault(scope.row)"
                >设为默认地址</el-button
              >
              <el-button
                size="mini"
                type="warning"
                @click="modify(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

     <!-- 修改,删除弹窗 -->
      <el-dialog :visible.sync="opening_change_ifShow" :title="title">
          <div>
            <h3>名字</h3>
            <el-input v-model="user_name"  placeholder="请输入名字"></el-input>
          </div>
          <div>
            <h3>电话号码</h3>
            
             <!-- oninput="if(user_phone.length>11)user_phone=user_phone.slice(0,11)" 用input才生效-->
            <el-input v-model="user_phone" maxlength="11" placeholder="请输入电话号码" type="number"></el-input>
          </div>
          <h3>省 市 区</h3>
          <div class="shen">
            <el-select v-model="province" placeholder="请选择省份" style="margin-bottom:20px">
              <el-option
                v-for="item in provinceList"
                :key="item.province_id"
                :label="item.name"
                :value="item.province_id">
              </el-option>
            </el-select>
            <el-select v-model="city" placeholder="请选择市" v-show="city_ifShow" style="margin-bottom:20px">
              <el-option
                v-for="item in cityList"
                :key="item.city_id"
                :label="item.name"
                :value="item.city_id">
              </el-option>
            </el-select>
            <el-select v-model="area" placeholder="请选择区"  v-show="area_ifShow" style="margin-bottom:20px">
              <el-option
                v-for="item in areaList"
                :key="item.area_id"
                :label="item.name"
                :value="item.area_id">
              </el-option>
            </el-select>
          </div>
          
          <div>
            <h3>详细地址</h3>
            <el-input v-model="user_address"  placeholder="请输入名字"></el-input>
          </div>
          <div>
            <h3>默认地址</h3>
            <el-radio v-model="user_default" label="1">默认地址</el-radio>
            <el-radio v-model="user_default" label="0">不设置</el-radio>
          </div>
          <div slot="footer" class="dialog-footer">
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
import {
  address_list,
  address_del,
  get_province,
  get_city,
  get_area,
  address_edit,
  address_add,
  set_default
} from "../../utils/axios";
export default {
  data() {
    return {
      user_phone:"",
      user_name:"",
      user_address:"",
      user_default:"2",
      title:"",
      city_ifShow:false,
      area_ifShow:false,
      province:"",
      province_name:"",
      city:"",
      city_name:"",
      area:"",
      area_name:"",
      provinceList :[], //省
      cityList :[],//市
      areaList :[],//区
      live_id:"",
      level:"",
      extendList: [], //推广列表
      loading: false,
      fn1: this.commonJs.Debounce(this.get_agent_list),
      options: [
        {
          value: "1",
          label: "启用",
        },
        {
          value: "2",
          label: "禁用",
        },
      ],
      levelList: [
        {
          //等级选择(1专员 2经理 3总监)
          value: "0",
          label: "会员",
        },
        {
          value: "1",
          label: "专员",
        },
        {
          value: "2",
          label: "经理",
        },
        {
          value: "3",
          label: "总监",
        },
      ],
      type:1,
      broad:{},
      queryInfo: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      opening_change_ifShow: false,
      editBlean:false,
      height:"",
    };
  },

  created() {
    this.get_agent_list(); //获取推广列表
    this.get_province() //获取省份
    this.height = document.body.clientHeight - 240
  },
  watch:{
      'opening_change_ifShow':{//省
        handler:function(news,olds){
          if(news){
            
          } else {
            this.province = ""
            
            // this.province_name = item.province_name
            this.city = ""
            // this.city_name = item.city_name
            this.area = ""
            // this.area_name = item.area_name
            // this.get_city(item.province)
            this.user_name = ""
            this.user_phone = ""
            this.user_address = ""
            this.user_default = ""
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },
      'province':{//省
        handler:function(news,olds){
          if(news){
            this.city_ifShow = true
            this.area = ''
            this.city = ''
            this.area_ifShow = false
            this.get_city(news)
          } else {
            this.city_ifShow = false
            this.area = ''
            this.city = ''
            this.area_ifShow = false
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

      'city':{//市
        handler:function(news,olds){
          if(news){
            this.area_ifShow = true
            this.area = ''
            this.get_area(news)
          } else {
            this.area = ''
            this.area_ifShow = false
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },
  },
  methods: {

    //确认修改等级
    submit_saveChanges_level(){
      if(this.user_phone == '' && this.user_name == '' && this.user_address == '' && this.province == '' && this.city == '' && this.area == '') {
        this.$message({
            message: '请完整填写选项',
            type: 'warning'
        });
        return
      }
      if(this.user_phone.length != 11){
        this.$message({
            message: '手机号一般是11位',
            type: 'warning'
        });
        return
      }
      if(this.type == 1){
        //增加
        address_add({
            name:this.user_name,
            tel:this.user_phone,
            province:this.province,
            city:this.city,
            area:this.area,
            address:this.user_address,
            is_default:this.user_default
        }).then((res) => {
            if (res.data.err_code == 0) {
                this.$message({
                    message: '增加成功',
                    type: 'success'
                });
                this.get_agent_list();
                this.opening_change_ifShow = false
                this.user_phone = ''
                this.user_name = ''
                this.user_address = ''
                this.province = ''
                this.city = ''
                this.area = ''
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
        address_edit({
            name:this.user_name,
            tel:this.user_phone,
            province:this.province,
            city:this.city,
            area:this.area,
            id:this.broad.id,
            address:this.user_address,
            is_default:this.user_default
        }).then((res) => {
            if (res.data.err_code == 0) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.get_agent_list();
                this.opening_change_ifShow = false
                this.opening_change_ifShow = false
                this.user_phone = ''
                this.user_name = ''
                this.user_address = ''
                this.province = ''
                this.city = ''
                this.area = ''
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
    modify(item) {
        this.editBlean = true
        this.opening_change_ifShow = true
        this.type = 2
        this.broad = item
        this.title = "修改地址"
        this.province = item.province
        
        // this.province_name = item.province_name
        this.city = item.city
        // this.city_name = item.city_name
        this.area = item.area
        // this.area_name = item.area_name
        // this.get_city(item.province)
        
        this.user_name = item.name
        this.user_phone =item.tel
        this.user_address =item.address
        this.user_default =item.is_default
    },
    add(){
      this.opening_change_ifShow = true
      this.type = 1
      this.title = "增加地址"
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
            // that.provinceList = res.data.err_msg.province
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

    // 获取市
    get_city(province_id){
      let that = this
      this.cityList = []
      
      get_city({province_id:province_id}).then(res=>{
        if(res.data.err_code==0){
          if(res.data.err_msg){
            for(let i in res.data.err_msg){
              that.cityList.push({
                city_id:i,
                name:res.data.err_msg[i]
              })
            }
            if(this.editBlean){
              this.city_ifShow = true
              this.city = this.broad.city
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

    // 获取区
    get_area(city_id){
      let that = this
      this.areaList = []
      
      get_area({city_id : city_id}).then(res=>{
        if(res.data.err_code==0){
          if(res.data.err_msg){
            for(let i in res.data.err_msg){
              that.areaList.push({
                area_id:i,
                name:res.data.err_msg[i]
              })
            }
            if(this.editBlean){
              this.area_ifShow = true
              this.area = this.broad.area
              this.area_name = this.broad.area_name
              this.editBlean = false
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
    //获取推广列表
    get_agent_list(index) {
      let that = this;
      that.loading = true;
      let request_form = {
        page: 1,
        page_size: 20,
      };
      address_list(request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            that.loading = false;
            res.data.err_msg.list.forEach((element) => {
              element.add_time = that.commonJs.timestampToTime(
                element.add_time
              );
            });
            that.extendList = res.data.err_msg.list;
            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
            if (index == 1) {
              that.$message({
                message: "刷新成功",
                type: "success",
              });
            }
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

    
    //设置默认地址
    addressDefault(row) {
      // this.$confirm("此操作将设置默认地址, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
          set_default({
            id: row.id,
            is_default:1
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "设置默认地址成功",
                type: "success",
              });
              this.get_agent_list();
            } else {
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: "error",
              });
            }
          });
        // })
        // .catch(() => {});
    },
    //单个删
    deletes(row) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          address_del({
            id: row.id,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.get_agent_list();
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
      address_list({
        page: page,
        page_size: number,
      }).then((res) => {
        if (res.data.err_code == 0) {
          that.loading = false;
          res.data.err_msg.list.forEach((element) => {
            element.add_time = that.commonJs.timestampToTime(
              element.add_time
            );
          });
          that.extendList = res.data.err_msg.list;
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
  },
};
</script>

<style scoped lang="less">
/deep/ .el-table td,
.el-table th.is-leaf {
  border-top: 1px solid #ebeef5;
  border-bottom: 0;
}

/deep/ .el-table__body {
  border-bottom: 1px solid #ebeef5;
}

/deep/ .el-date-editor {
  margin-left: 10px;
}

/deep/ .el-dialog {
  width: 1000px !important;
  input{
    width: 400px;
  }
  .shen{
    input{
      width: 200px;
      padding-right: 20px;
      margin-left: 20px;
    }
    .el-select:nth-of-type(1){
      input{
        margin-left: 0;
      }
    }
    
  }
}

.seach {
  display: flex;
  /deep/ .el-input {
    width: 150px;
    margin: 0 10px;
  }
}

.seach_copy {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width: 150px;
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
/deep/ .el-dialog {
  box-shadow: 0 0px 0px #ccc;
  -webkit-box-shadow: 0 0px 0px #ccc;
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