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
        <el-button type="primary" @click="pick_seach">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)">刷新</el-button>
        
        <!-- <el-button type="warning" @click="add_activity">加入营销活动</el-button> -->
        <el-button type="danger" @click="undercarriage">下架</el-button>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
          
        <!-- <el-table-column label="商品分类" width="220">
          <template slot-scope="scope">
            {{scope.row.fname}}
            {{scope.row.sname ? '>>' + scope.row.sname : '' }}
            {{scope.row.tname ? '>>' + scope.row.tname : '' }}
          </template>
        </el-table-column>
        <el-table-column label="运营分类" width="220">
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
          
          <el-table-column label="状态" >
            <template slot-scope="scope">
              {{parseInt(scope.row.quantity) > 0 ? '在售' : '已售罄'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="320" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="compile(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="priceChange(scope.$index, scope.row)"
                >改价</el-button
              >
              <!-- <el-button
                size="mini"
                type="success"
                v-show="scope.row.jvbao == 2"
                @click="addShoppingMall(scope.$index, scope.row)"
                >添加到橘宝商城</el-button
              > -->
              <!-- jvbao 1 已添加橘宝商城  2未添加橘宝商城 -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 添加到营销活动弹窗 -->
    <el-dialog title="营销活动" :visible.sync="add_activities_visible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in activityList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_activities_visible = false">取 消</el-button>
        <el-button type="primary" @click="add_activities">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 改价弹窗 -->
    <el-dialog title="商品改价" :visible.sync="price_change_visible">
      <el-form :model="form_specifications" v-if="priceList.sku_list.length == 0">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form_specifications.product_name" autocomplete="off"  disabled></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form_specifications.prime_cost_price" autocomplete="off" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form_specifications.quantity" autocomplete="off" style="width:200px"  disabled></el-input>
        </el-form-item>
      </el-form>

      <div v-else>
        <el-form :model="form_specifications">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form_specifications.product_name" autocomplete="off"  disabled></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form_specifications.prime_cost_price" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="20" class="goodsindex-list">
          <el-col :span="24">
            <el-table
              v-loading="loading"
              ref="multipleTable"
              :data="priceList.sku_list"
              border
              style="width: 100%"
            >
              <el-table-column 
                label="序号"
                type="index" 
                width="80"
              >
              </el-table-column>
              <el-table-column 
                prop="sku_name" 
                label="商品sku名称" 
                width="120"
              >
              </el-table-column>
              <el-table-column label="商品sku库存">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.quantity" autocomplete="off" ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="商品sku价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.prime_cost_price" autocomplete="off" ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      
      <div slot="footer" class="dialog-footer">
        <el-button @click="price_change_visible = false">取 消</el-button>
        <el-button type="primary" @click="priceChange_sure">确 定</el-button>
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
import { goods_list , goods_get_cate   , off_shelf  , goods_info , save_price  } from "../../utils/axios";
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
      seach_value : '',
      pageSize : 20,
      classification_list :[], //商品分类列表
      classification_value : [],
      operationClassification_list :[], //运营分类列表
      goods_status_list : [//商品状态
        {
          id: '1',
          name: '在售'
        }, {
          id: '2',
          name: '已售罄'
        }
      ],
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
      multipleSelection : [],//选中的数据
      operation_second_cate : [],
      operation_three_cate : [],
      add_activities_visible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      activityList : [
        {
          id: '1',
          name: '活动一'
        }, {
          id: '2',
          name: '活动二'
        }
      ],
      checkAll: false,
      checkedCities: ['1'],
      price_change_visible : false,
      form_specifications : {
        product_name : '',
        prime_cost_price:"",
        quantity:""
      },
      priceList : {sku_list:[]},//规格价格列表
    };
  },

  created() {
    let that = this
    this.get_cate() //获取商品三级分类
    that.get_operation() //获取运营三级分类
    this.height = document.body.clientHeight - 240
    if(this.$route.query.product_id != undefined){
      this.seach_value = this.$route.query.product_id
      this.pick_seach()
    }else{
      this.get_goods_list(); //获取商品列表
    }
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
        list_type:1
      }
      goods_list(
        request_form
      )
        .then((res) => {
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

    // 获取运营三级分类
    get_operation(){
      let that = this
      
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
          keywordss : this.seach_value,//模糊搜索id或商品名称
          is_sale : this.goods_status,//状态 1在售 2售罄
          category_fid : this.classification_value[0],//一级分类id-商品
          category_id : this.classification_value[1],//二级分类id-商品
          category_tid : this.classification_value[2],//三级分类id-商品
          start_time : time1,//开始时间
          end_time : time2,//结束时间
          list_type:1
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

    //搜索
    pick_seach () {
      let that = this
      if(that.seach_value == '' && that.goods_status == '' 
         && that.time_value == '' && that.classification_value == ''
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
          fid : this.classification_value[0],//一级分类id-商品
          sid : this.classification_value[1],//二级分类id-商品
          tid : this.classification_value[2],//三级分类id-商品
          start_time : time1,//开始时间
          end_time : time2,//结束时间
          list_type:1
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

    

    //添加营销活动
    add_activity () {
      let that = this
      if(that.multipleSelection.length < 1) {
        that.$message({
          showClose: true,
          message: '请至少选择一条数据',
          type: 'error'
        });
      } else {
        let name = ''
        that.multipleSelection.forEach(element => {
          if(name == '') {
            name = element.name
          } else {
            name = name + '、' + element.name
          }
        })
        this.$confirm('此操作将把商品名称为 : ' + name + '的商品加入营销活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.add_activities_visible = true
        })
      }
    },

    //勾选
    handleCheckedCitiesChange(value) {
      console.log(this.checkedCities)
    },

    //加入活动
    add_activities () {
      let that = this
      if(that.checkedCities.length < 1) {
        that.$message({
          message: '请至少勾选一项活动',
          type: 'warning'
        });
        return
      }
      that.$message({
        message: '加入成功',
        type: 'success'
      });
      that.add_activities_visible = false
    },

    //下架
    undercarriage () {
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
        that.multipleSelection.forEach(element => {
          if(name == '') {
            name = element.name
            idArr = element.product_id
          } else {
            name = name + '、' + element.name
            idArr = idArr + ',' + element.product_id
          }
        })
        this.$confirm('此操作将下架商品名称为 : ' + name + '的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          off_shelf({
            product_id: idArr,
            status_type : 1, //状态(1 上架->下架 2 下架->上架)
          })
            .then((res_s) => {
              console.log(res_s);
              if (res_s.data.err_code == 0) {
                that.$message({
                  message: '下架成功',
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
      }
    },

    //当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },

     //编辑
    compile (index , row) {
      let that = this
      this.$router.push({path:'/goods/update',query:{product_id:row.product_id,is_edit : true}});
    },

    //改价
    priceChange (index , row) {
      let that = this
      that.O_message = row
      this.$confirm('此操作存在风险, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.get_goods_info(row.product_id)
        // that.form_specifications.name = row.name
        that.price_change_visible = true
      }).catch(() => {
               
      });
    },

    //获取商品规格价格
    get_goods_info (product_id) {
      let that = this
      goods_info({
        product_id: product_id
      })
        .then((res_s) => {
          console.log(res_s);
          if (res_s.data.err_code == 0) {
              that.form_specifications = res_s.data.err_msg.list
              that.priceList = res_s.data.err_msg.list
            console.log(that.priceList)
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
    },

    //确认改价
    priceChange_sure () {
      let that = this
      let leg = false
      let leg1 = false
      let leg2 = false
      let leg3 = false
      that.priceList.sku_list.forEach(element => {
        if(element.prime_cost_price == '' || element.quantity == '' ) {
          leg = true
          return;
        }
        //  else if (parseFloat(element.original_price) < 0.1 || parseFloat(element.price) < 0.1 ) {
        //   leg1 = true
        //   return;
        // } else if (parseFloat(element.original_price) < parseFloat(element.price) ) {
        //   leg2 = true
        //   return;
        // } else if (parseFloat(element.prime_cost_price) > parseFloat(element.price) ) {
        //   leg3 = true
        //   return;
        // }
      })
      if(leg == true) {
        that.$message({
          message: '请将表格信息填写完整',
          type: 'warning'
        });
        return
      }
      // if(leg1 == true) {
      //   that.$message({
      //     message: '市场价与销售价不能低于0.1元',
      //     type: 'warning'
      //   });
      //   return
      // }
      // if(leg2 == true) {
      //   that.$message({
      //     message: '市场价需要大于销售价',
      //     type: 'warning'
      //   });
      //   return
      // }
      // if(leg3 == true) {
      //   that.$message({
      //     message: ' 结算价需要小于销售价',
      //     type: 'warning'
      //   });
      //   return
      // }
      // let price = ''
      // let original_price = ''
      // let result = []
      // if(that.priceList.length == 1) {
      //   price =  that.priceList[0].price
      //   original_price =  that.priceList[0].original_price
      // } else {
      //   that.priceList.forEach(item => {
      //     result.push({
      //       sku_id : item.sku_id,
      //       price : item.price,
      //       original_price : item.original_price,
      //     })
      //   })
      // }
      let sku_data = []
      if(that.priceList.sku_list.length != 0){
        that.priceList.sku_list.forEach(element=>{
          let obj = {
            sku_id:element.sku_id,
            prime_cost_price:element.prime_cost_price,
            quantity:element.quantity
          }
          sku_data.push(obj)
        })
      }
      sku_data = JSON.stringify(sku_data)
      let data = {
        product_id: that.O_message.product_id,
        prime_cost_price : that.priceList.prime_cost_price,
        sku_data : sku_data	
      }
      console.log(data)
      save_price(data)
        .then((res_s) => {
          console.log(res_s);
          if (res_s.data.err_code == 0) {
            that.price_change_visible = false
            that.$message({
              message: '改价成功',
              type: 'success'
            });
            that.get_goods_list();
          } else {
            that.price_change_visible = false
            that.$message({
              showClose: true,
              message: res_s.data.err_msg,
              type: 'error'
            });
          }
        })
        .catch((error) => {
          that.price_change_visible = false
          console.log(error);
        });
    },

    //添加到橘宝商城
    addShoppingMall (index , row) {
      let that = this
      
    }

  },
};
</script>

<style scoped lang="less">
/deep/ .el-table td, .el-table th.is-leaf{
    border-top: 1px solid #EBEEF5;
    border-bottom:0;
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