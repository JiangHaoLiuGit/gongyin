<template>
  <div class="goodsindex">
    
    <div class="seach_copy">
      <div class="seach_select">
        <el-input v-model="seach_value" @keyup.enter.native="pick_seach" placeholder="商品ID/商品名称"></el-input>
        <el-cascader
          placeholder="请选择商品分类"
          v-model="classification_value"
          
          :options="classification_list"
          :props="{ expandTrigger: 'hover' , checkStrictly: true}"
          @change="pick_cate_change"></el-cascader>

        <el-select v-model="goods_status" placeholder="请选择商品状态">
          <el-option
            v-for="item in goods_status_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          :clearable = false
          v-model="time_value"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="button_type">
        <el-button type="success" @click="releaseProduct">发布商品</el-button>
        <el-button type="primary" @click="pick_seach">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)">刷新</el-button>
      </div>
    </div>
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="goodsList"
          border
          :height="height"
          stripe
          style="width: 100%"
        >
          <el-table-column 
            label="序号"
            type="index" 
            width="80"
          >
          </el-table-column>
          <el-table-column 
            prop="add_time" 
            label="创建时间" 
          >
          </el-table-column>
          <el-table-column 
            prop="product_name" 
            label="商品名称" 
            width="160"
          >
          </el-table-column>
          <el-table-column 
            prop="product_id" 
            label="商品ID" 
          >
          </el-table-column>
          <el-table-column label="商品主图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
                fit="cover"></el-image>
            </template>
          </el-table-column>
        <el-table-column label="商品分类" width="220">
          <template slot-scope="scope">
            {{scope.row.fid_name}}
            {{scope.row.id_name ? '>>' + scope.row.id_name : '' }}
            {{scope.row.tid_name ? '>>' + scope.row.tid_name : '' }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="运营分类" width="220">
          <template slot-scope="scope">
            {{scope.row.fname}}
            {{scope.row.sname ? '>>' + scope.row.sname : '' }}
            {{scope.row.tname ? '>>' + scope.row.tname : '' }}
          </template>
        </el-table-column> -->
          <!-- <el-table-column label="运营商" width="120">
            <template slot-scope="scope">
              {{scope.row.store_id   == '0' ? '平台自营' : scope.row.store_name }}
            </template>
          </el-table-column> -->
          <el-table-column 
            prop="sales" 
            label="销售总量" 
            sortable
          >
          </el-table-column>
          <el-table-column 
            prop="quantity" 
            label="库存数量" 
          >
          </el-table-column>
          <el-table-column 
            prop="prime_cost_price" 
            label="成本价(元)" 
            sortable
          >
          </el-table-column>
          <!-- <el-table-column 
            prop="original_price" 
            label="市场价(元)" 
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column 
            prop="price" 
            label="销售价(元)" 
            width="120"
            sortable
          >
          </el-table-column> -->
          <el-table-column label="是否禁用" width="120" >
            <template slot-scope="scope">
              <div v-if="scope.row.platform_status == 0">正常</div>
              <div v-else-if="scope.row.platform_status == 1">禁用</div>
              <div v-else>未知</div>
            </template>
          </el-table-column>
          <el-table-column label="上架状态" width="120" >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">已下架</span>
              <span v-else-if="scope.row.status == 1">已上架</span>
              <span v-else-if="scope.row.status == 2">已删除</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="120" >
            <template slot-scope="scope">
              <div v-if="scope.row.platform_check == 0 && scope.row.status == 0">未提审</div>
              <div v-else-if="scope.row.platform_check == 1 && scope.row.status == 0">等待审核</div>
              <div v-else-if="scope.row.platform_check == 2 && scope.row.status == 0">审核拒绝</div>
              <div v-else-if="scope.row.platform_check == 3 && scope.row.status == 1">审核通过</div>
              <div v-else>未知</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="reason" 
            label="拒绝原因" 
          >
          </el-table-column>
          <el-table-column label="操作" width="250" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="compile(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="primary"
                v-show="scope.row.platform_check != 1 && scope.row.platform_check != 3 && scope.row.status != 1"
                @click="grounding(scope.$index, scope.row)"
                >提审</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

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
import { goods_list , goods_get_cate , off_shelf } from "../../utils/axios";
export default {
  data() {
    return {
      goodsList: [], //商品列表
      loading : false,
      fn1: this.commonJs.Debounce(this.get_goods_list),
      O_message : {},
      queryInfo: {
        page: 1,
        pageSize: 20,
        total : 1
      },
      father_menu : [],
      operationType: [{//运营商类型
        value: '1',
        label: '平台自营'
      }, {
        value: '2',
        label: '供应商'
      }],
      operationTypeValue: '',//运营商类型
      seach_value : '',
      pageSize : 20,
      operationClassification_value:[],
      operationClassification_list :[],
      classification_list :[], //商品分类列表
      classification_value : [],
      height:"",
      goods_status_list : [//商品状态
        {
          id: '1',
          name: '在售'
        }, {
          id: '2',
          name: '已售罄'
        }
      ],
      goods_status_list_add : [//商品添加状态
        {
          id: '1',
          name: '已添加至橘宝商城'
        }, {
          id: '2',
          name: '未添加至橘宝商城'
        }
      ],
      goods_status_add:"",
      goods_status : '',//商品状态
      time_value : '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      second_cate : [],
      three_cate : [],
    };
  },

  created() {
    this.get_goods_list(); //获取商品列表
    this.get_cate() //获取商品三级分类
    this.height = document.body.clientHeight - 240
  },

  methods: {

    //获取商品列表
    get_goods_list (index) {
      let that = this
      that.classification_value = []
      that.goods_status = ''
      that.seach_value = ''
      that.time_value = ''
      that.loading = true
      let request_form = {
        page : 1,
        page_size: 20,
        list_type:2
      }
      goods_list(
        request_form
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.sales = Number(element.sales)
              element.prime_cost_price = Number(element.prime_cost_price)
              element.add_time = that.commonJs.timestampToTime (element.add_time)
            });
            that.goodsList = res.data.err_msg.list
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size)
            that.queryInfo.page = parseInt(res.data.err_msg.page)
            that.queryInfo.total = parseInt(res.data.err_msg.total_number)
            that.pageSize = res.data.err_msg.page_size
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

    // 获取商品三级分类
    get_cate(){
      let that = this
      goods_get_cate().then(res=>{
        if(res.data.err_code==0){
          if( res.data.err_msg.first.length > 0) {

            if(res.data.err_msg.second.length > 0) { //存在二级分类

              if(res.data.err_msg.third.length > 0) { //存在三级分类

                res.data.err_msg.first.forEach((element_first , first_index) => {
                  that.second_cate = []
                  that.classification_list.push({
                    value : element_first.cat_id,
                    label : element_first.cat_name,
                    cat_id : element_first.cat_id
                  })

                  res.data.err_msg.second.forEach(element_second => {
                    that.three_cate = []
                    if(element_first.cat_id == element_second.cat_fid) {//一级分类的ID等于二级分类的父级ID
                      that.second_cate.push({
                        value : element_second.cat_id,
                        label : element_second.cat_name,
                        cat_fid : element_second.cat_fid,
                        cat_id : element_second.cat_id
                      })
                      that.classification_list[first_index].children = that.second_cate

                      res.data.err_msg.third.forEach(element_third => {

                        if(element_second.cat_id == element_third.cat_fid) {
                          that.three_cate.push({
                            value : element_third.cat_id,
                            label : element_third.cat_name,
                            cat_fid : element_third.cat_fid,
                            cat_id : element_third.cat_id
                          })
                          let index = that.classification_list[first_index].children.length-1
                          that.classification_list[first_index].children[index].children = that.three_cate
                        }
                      })
                    }
                  })
                })
                
              } else {//不存在三级分类
                res.data.err_msg.first.forEach((element_first , first_index) => {
                  that.second_cate = []
                  that.classification_list.push({
                    value : element_first.cat_id,
                    label : element_first.cat_name,
                    cat_id : element_first.cat_id
                  })
                  res.data.err_msg.second.forEach(element_second => {
                    if(element_first.cat_id == element_second.cat_fid) {
                      that.second_cate.push({
                        value : element_second.cat_id,
                        label : element_second.cat_name,
                        cat_fid : element_second.cat_fid,
                        cat_id : element_second.cat_id
                      })
                      that.classification_list[first_index].children = that.second_cate
                    }
                  })
                })
              }

            } else {
              res.data.err_msg.first.forEach(element_first => {
                that.classification_list.push({
                  value : element_first.cat_id,
                  label : element_first.cat_name
                })
              })
            }
          }
          console.log(that.classification_list)
        }else{
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: 'error'
          });
        }
      })
    },

    //商品三级分类选择
    pick_cate_change(value) {
      this.classification_value = value
      console.log(this.classification_value)
    },

    //分页
    get_shop_list_page (page , number) {
      let that = this
      that.loading = true
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      goods_list(
        {
          page : page,
          page_size: number,
          keywords : this.seach_value,//模糊搜索id或商品名称
          is_sale : this.goods_status,//状态 1在售 2售罄
          category_fid : this.classification_value[0],//一级分类id-商品
          category_id : this.classification_value[1],//二级分类id-商品
          category_tid : this.classification_value[2],//三级分类id-商品
          start_time : time1,//开始时间
          end_time : time2,//结束时间
          list_type:2
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.add_time = that.commonJs.timestampToTime (element.add_time)
              element.sales = Number(element.sales)
              element.prime_cost_price = Number(element.prime_cost_price)
            });
            that.goodsList = res.data.err_msg.list
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size)
            that.queryInfo.page = parseInt(res.data.err_msg.page)
            that.queryInfo.total = parseInt(res.data.err_msg.total_number)
            that.pageSize = res.data.err_msg.page_size
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

    //每页显示条数改变
    handleSizeChange(val) {
      console.log(this.queryInfo)
      this.get_shop_list_page(1,val)
    },

    //当前页
    handleCurrentChange(val) {
      console.log(val)
      this.get_shop_list_page(val,this.pageSize)
    },
    //运营三级分类选择
    pick_operation_change(value) {
      this.operationClassification_value = value
      console.log(this.operationClassification_value)
    },
    //搜索
    pick_seach () {
      let that = this
      if(that.operationTypeValue == '' && that.seach_value == '' && that.goods_status == '' 
         && that.time_value == '' && that.classification_value == '' && that.operationClassification_value == ''
         && that.goods_status_add == ''
         ) {
        that.$message({
          message: '请选择任意一种搜索类型',
          type: 'warning'
        });
        return
      }
      that.loading = true
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      goods_list(
        {
          page : 1,
          page_size: this.pageSize,
          keywords : this.seach_value,//模糊搜索id或商品名称
          is_sale : this.goods_status,//状态 1在售 2售罄
          category_fid : this.classification_value[0],//一级分类id-商品
          category_id : this.classification_value[1],//二级分类id-商品
          category_tid : this.classification_value[2],//三级分类id-商品
          start_time : time1,//开始时间
          end_time : time2,//结束时间
          list_type:2
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.sales = Number(element.sales)
              element.prime_cost_price = Number(element.prime_cost_price)
              element.add_time = that.commonJs.timestampToTime (element.add_time)
            });
            that.goodsList = res.data.err_msg.list
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size)
            that.queryInfo.page = parseInt(res.data.err_msg.page)
            that.queryInfo.total = parseInt(res.data.err_msg.total_number)
            that.pageSize = res.data.err_msg.page_size
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
          console.log(error);
          that.loading = false
        });
    },

     //编辑
    compile (index , row) {
      let that = this
      this.$router.push({path:'/goods/update',query: {product_id: row.product_id,is_edit : true}});
    },

    //上架
    grounding (index , row) {
      let that = this
      this.$confirm('此操作将提审商品名称为 : ' + row.product_name + '的商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        off_shelf({
          product_id: row.product_id,
          status_type : 3, //1下架 2删除 3提审
        })
          .then((res_s) => {
            console.log(res_s);
            if (res_s.data.err_code == 0) {
              that.$message({
                message: '提审成功',
                type: 'success'
              });
              that.get_goods_list();
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
    },
    //上架
    deletes (index , row) {
      let that = this
      this.$confirm('此操作将删除的商品名称为 : ' + row.product_name + '的商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        off_shelf({
          product_id: row.product_id,
          status_type: 2, //1下架 2删除 3提审
        })
          .then((res_s) => {
            console.log(res_s);
            if (res_s.data.err_code == 0) {
              that.$message({
                message: '删除成功',
                type: 'success'
              });
              that.get_goods_list();
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
    },
    //发布商品
    releaseProduct () {
      this.$router.push({path:'/goods/add'});
    },

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
/deep/ .el-dialog {
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
  text-align-last: justify;
}
/deep/ .el-dialog__body {
  padding: 30px 50px;
}

</style>