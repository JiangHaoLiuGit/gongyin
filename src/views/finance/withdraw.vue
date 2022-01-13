<template>
  <div class="goodsindex">
    <div class="seach">
      
    </div>
    <div class="seach_copy">
      <div class="seach_select">
        <el-select v-model="pick_condition" placeholder="请选择审核状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
          <el-table-column 
            prop="third_id" 
            label="交易单号" 
          >
          </el-table-column>
          <el-table-column 
            prop="apply_time" 
            label="申请时间" 
          >
          </el-table-column>
          <el-table-column 
            prop="apply_amount" 
            label="申请金额" 
          >
          </el-table-column>
          <el-table-column 
            prop="current_amount" 
            label="当前金额" 
          >
          </el-table-column>
          <el-table-column 
            prop="surplus_amount" 
            label="当前剩余金额" 
          >
          </el-table-column>
          <el-table-column label="提现状态">
            <template slot-scope="scope">
            <div v-if="scope.row.status == 0">待审核</div>
            <div v-else-if="scope.row.status == 1">审核通过</div>
            <div v-else-if="scope.row.status == -1">已拒绝</div>
            <div v-else-if="scope.row.status == 2">打款成功</div>
            <div v-else-if="scope.row.status == 3">打款失败</div>
            <div v-if="scope.row.status == -1">{{scope.row.reason}}</div>
            </template>
          </el-table-column>
          
          <!-- <div class="boxDiv clearfix">
            <div class="labelDiv">
              店铺id:
            </div>
            <div class="textDiv">
              {{broad.id}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              展示类型:
            </div>
            <div class="textDiv" v-if="broad.apply_phone == '1'">
              评论区
            </div>
            <div class="textDiv" v-else-if="broad.apply_phone == '2'">
              中心GIF
            </div>
            <div class="textDiv" v-else-if="broad.apply_phone == '3'">
              中心svga
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              已打款:
            </div>
            <div class="textDiv">
              {{broad.already_paid}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              说明:
            </div>
            <div class="textDiv">
              {{broad.remark}}
            </div>
          </div> -->
          <el-table-column 
            label="提现服务费" 
            width="100"
          >
            <template slot-scope="scope">
                {{scope.row.bond_withdrawal_ratio}}%
            </template>
          </el-table-column>
           <el-table-column 
            prop="real_amount" 
            label="实际金额" 
          >
          </el-table-column>
          
          <el-table-column 
            prop="balance" 
            label="可提现余额" 
          >
          </el-table-column>
          <!-- <el-table-column 
            prop="reason" 
            label="拒绝原因" 
          >
          </el-table-column> -->
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
              店铺id:
            </div>
            <div class="textDiv">
              {{broad.id}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              展示类型:
            </div>
            <div class="textDiv" v-if="broad.apply_phone == '1'">
              评论区
            </div>
            <div class="textDiv" v-else-if="broad.apply_phone == '2'">
              中心GIF
            </div>
            <div class="textDiv" v-else-if="broad.apply_phone == '3'">
              中心svga
            </div>
          </div>
        </div>
        <div class="divRow clearfix">
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              已打款:
            </div>
            <div class="textDiv">
              {{broad.already_paid}}
            </div>
          </div>
          <div class="boxDiv clearfix">
            <div class="labelDiv">
              说明:
            </div>
            <div class="textDiv">
              {{broad.remark}}
            </div>
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
import { store_withdrawal_list } from "../../utils/axios";
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
      height:"",
      options: [{
        value: '-2',
        label: '全部'
      },{
        
        value: '-1',
        label: '已拒绝'
      }, {
        value: '0',
        label: '待审核'
      },
      {
        value: '2',
        label: '审核成功'
      }, {
        value: '3',
        label: '打款失败'
      }],
      broad:"",
      pick_condition: '',
      pick_value : '',
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
      this.pick_condition = ''
      this.time_value = ''
      let that = this
      that.loading = true
      let request_form = {
        page : 1,
        page_size: 20,
        status:-2
      }
      store_withdrawal_list(
        request_form
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.apply_time = that.commonJs.timestampToTime (element.apply_time)
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
      store_withdrawal_list(
        {
          page : page,
          page_size: number,
          status : this.pick_condition,
          start_time : time1,
          end_time : time2,
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.apply_time = that.commonJs.timestampToTime (element.apply_time)
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
      if(that.pick_condition == '' && that.time_value == '') {
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
      store_withdrawal_list(
        {
          page : 1,
          page_size: this.pageSize,
          status : this.pick_condition,
          start_time : time1,
          end_time : time2,
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false
            res.data.err_msg.list.forEach(element => {
              element.apply_time = that.commonJs.timestampToTime (element.apply_time)
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