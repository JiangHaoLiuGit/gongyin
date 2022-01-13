<template>
  <div class="goodsindex">
    
    <div class="seach_copy">
      <div class="seach_select">
        <el-select v-model="water_status" placeholder="请选择财务状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="pay_type	" placeholder="请选择支付类型">
            <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="status" placeholder="请选择订单状态">
            <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
          <el-input v-model="trade_no" placeholder="请输入交易号" @keyup.enter.native="pick_seach" type="number"></el-input>
          <el-input v-model="order_no" placeholder="请输入订单号" @keyup.enter.native="pick_seach" type="number"></el-input>
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
      </div>
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
          stripe
        >
          <el-table-column 
            label="序号"
            type="index" 
            width="80"
          >
          </el-table-column>
          <el-table-column label="支付方式/流水号">
            <template slot-scope="scope">
            <div v-if="scope.row.pay_type == 1">支付宝</div>
            <div v-else-if="scope.row.pay_type == 2">微信</div>
            <div>{{scope.row.trade_no}}</div>
            </template>
          </el-table-column>
          
          <el-table-column label="财务状态/编号">
            <template slot-scope="scope">
            <div v-if="scope.row.water_status == 1">收入</div>
            <div v-else-if="scope.row.water_status == 2">支出</div>
            <div>{{scope.row.order_no}}</div>
            </template>
          </el-table-column>
          
            <el-table-column 
            prop="create_time" 
            label="创建时间" 
          >
          </el-table-column>
          
          
          
          <el-table-column 
            
            label="用户昵称/id" 
          >
            <template slot-scope="scope">
              <div>{{scope.row.nickname}}</div>
              <div>id:{{scope.row.user_id}}</div>
            </template> 
          </el-table-column>
            <el-table-column 
            prop="phone" 
            label="用户账号" 
          >
          </el-table-column>
            
          <el-table-column 
            label="订单成本价" 
          >
            <template slot-scope="scope">
              <div>{{scope.row.cost_price}}元</div>
            </template> 
          </el-table-column>
          <el-table-column 
            label="价格" 
          >
            <template slot-scope="scope">
              <div>{{scope.row.cost_money}}元</div>
            </template> 
          </el-table-column>
          <el-table-column 
            label="利润" 
          >
            <template slot-scope="scope">
              <div>{{scope.row.cost_profit}}元</div>
            </template> 
          </el-table-column>
          <el-table-column 
            label="备注" 
          >
          <template slot-scope="scope">
              <div>{{scope.row.remarks?scope.row.remarks:'无'}}</div>
            </template> 
          </el-table-column>
          
          <el-table-column label="订单状态">
            <template slot-scope="scope">
            <div v-if="scope.row.status == 2">待发货</div>
            <div v-else-if="scope.row.status == 3">待收货</div>
            <div v-else-if="scope.row.status == 4">已完成(待评价)</div>
            <div v-else-if="scope.row.status == 7">待完成</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="see(scope.$index, scope.row)"
                >查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
    <!-- 查看详情 -->
    <el-dialog title="查看详情" :visible.sync="opening_change_ifShow">
        <div class="divRow clearfix">
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              店铺名称:
            </div>
            <div class="textDiv">
              {{broad.name}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              店铺id:
            </div>
            <div class="textDiv">
              {{broad.store_id}}
            </div>
          </div>
        </div>
        <div class="divRow clearfix">
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              用户id:
            </div>
            <div class="textDiv">
              {{broad.user_id}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              交易记录id:
            </div>
            <div class="textDiv">
              {{broad.id}}
            </div>
          </div>
        </div>
        <div class="divRow clearfix">
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              备注:
            </div>
            <div class="textDiv">
              {{broad.remarks}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            
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
import { order_tran_details } from "../../utils/axios";
export default {
  data() {
    return {
    opening_change_ifShow:false,
      extendList: [], //推广列表
      loading : false,
      fn1: this.commonJs.Debounce(this.get_agent_list),
      formLabelWidth: "100px",
      queryInfo: {
        page: 1,
        pageSize: 20,
        total : 1
      },
      trade_no:"",
      order_no:"",
      options: [
      {
        value: '1',
        label: '收入'
      }, {
        value: '2',
        label: '支出'
      }],
      height:"",
      options2: [
      {
        value: '1',
        label: '支付宝'
      }, {
        value: '2',
        label: '微信'
      }],
      options3: [{
        value: '2',
        label: '待发货'
      }, {
        value: '3',
        label: '待收货'
      },
      {
        value: '4',
        label: '已完成(待评价)'
      }, {
        value: '7',
        label: '待完成'
      }],
      broad:"",
      water_status: '',
    pay_type:"",
    status:"",
      pageSize : 20,
      levelValue :'',
      time_value : '',
      form_X: {
        level: "",
      },
      title : '修改等级',
      opening_change_ifShow : false,
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
    };
  },

  created() {
    this.get_agent_list(); //获取推广列表
    this.height = document.body.clientHeight - 240
  },

  methods: {
      see(index,row){
          this.opening_change_ifShow = true
          this.broad = row
      },
    //获取推广列表
    get_agent_list (index) {
      this.trade_no = ''
      this.time_value = ''
      this.order_no = ''
      this.water_status = ''
      this.pay_type = ''
      this.status = ''
      let that = this
      that.loading = true
      let request_form = {
        page : 1,
        page_size: 20
      }
      order_tran_details(
        request_form
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.create_time = that.commonJs.timestampToTime (element.create_time)
              element.cost_profit = Number(Number(element.cost_money).toFixed(2)) - Number(Number(element.cost_price).toFixed(2))
            });
            that.extendList = res.data.err_msg.list
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
      order_tran_details(
        {
          page : page,
          page_size: number,
          trade_no : this.trade_no,
          order_no : this.order_no,
          water_status : this.water_status,
          pay_type : this.pay_type,
          status : this.status,
          start_time : time1,
          end_time : time2,
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.create_time = that.commonJs.timestampToTime (element.create_time)
              element.cost_profit = Number(Number(element.cost_money).toFixed(2)) - Number(Number(element.cost_price).toFixed(2))
            });
            that.extendList = res.data.err_msg.list
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
      console.log("搜索")
      console.log(this.time_value)
      let that = this
      if(that.trade_no == '' && that.time_value == '' && that.order_no == '' && that.water_status == '' && that.pay_type == '' && that.status == '') {
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
      order_tran_details(
        {
          page : 1,
          page_size: this.pageSize,
          trade_no : this.trade_no,
          order_no : this.order_no,
          water_status : this.water_status,
          pay_type : this.pay_type,
          status : this.status,
          start_time : time1,
          end_time : time2,
          start_time : time1,
          end_time : time2,
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.create_time = that.commonJs.timestampToTime (element.create_time)
              element.cost_profit = Number(Number(element.cost_money).toFixed(2)) - Number(Number(element.cost_price).toFixed(2))
            });
            that.extendList = res.data.err_msg.list
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

/deep/ .el-dialog {
  width: 700px !important;
}

.seach {
  display: flex;
  /deep/ .el-input {
    width:150px;
    margin: 0 10px;
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
.divRow{
  margin: 10px 0;
  .boxDiv{
    width: 50%;
    float: left;
    .labelDiv{
      width: 30%;
      float: left;
      font-size: 16px;
      line-height: 25px;
    }
    .textDiv{
      width: 70%;
      float:left;
      font-size: 16px;
      line-height: 25px;
    }
  }
}
</style>