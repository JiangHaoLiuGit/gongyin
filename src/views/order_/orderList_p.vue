<template>
  <div class="goodsindex goodsindex1">
    <!-- 待付款订单取消之后为交易关闭 确认收货之后为已收货 点击交易完成之后或系统默认为交易完成-->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="margin-bottom: 20px"
    >
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="待付款" name="second">
        <span slot="label" class="por">
            待付款
          <span class="poa boxSpan" v-if="mark.one">{{mark.one}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="third">
        <span slot="label" class="por">
            待发货
          <span class="poa boxSpan" v-if="mark.two">{{mark.two}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="fourth">
        <span slot="label" class="por">
            待收货
          <span class="poa boxSpan" v-if="mark.three">{{mark.three}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="待完成" name="six">
        <span slot="label" class="por">
            待完成
          <span class="poa boxSpan" v-if="mark.four">{{mark.four}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="five"></el-tab-pane>
      <el-tab-pane label="交易取消" name="fiveth"></el-tab-pane>
      <el-tab-pane label="交易关闭" name="seven"></el-tab-pane>
    </el-tabs>
    <div class="seach">
      
      <!-- <el-date-picker
        :clearable="false"
        v-model="time_value"
        unlink-panels
        align="right"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker> -->
    </div>
    <div class="seach_copy">
      <div class="seach_select">
        <el-select v-model="pick_condition" placeholder="请选择搜索类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input v-model="pick_value" placeholder="请输入搜索内容" @keyup.enter.native="pick_seach" style="width:240px"></el-input>
        <!-- <el-select v-model="payment_status_value" placeholder="请选择支付方式">
        <el-option
          v-for="item in payment_method_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <!-- <el-select v-model="order_status_value" placeholder="请选择订单状态">
        <el-option
          v-for="item in order_method_value"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <el-select v-model="comm_status_value" placeholder="请选择订单类型">
          <el-option
            v-for="item in comm_method_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      <el-select v-model="time_type" placeholder="时间类型">
        <el-option
          v-for="item in time_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="time_value"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
        
        
      </div>
      <div class="button_type">
        <el-button type="success" @click="user_derive_excel1">导出</el-button>
        <el-button type="primary" @click="pick_seach">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)"
          >刷新</el-button
        >
      </div>
    </div>

    <el-row :gutter="20" class="goodsindex-list2">
      <el-col :span="24">
        <!-- stripe -->
        <!--  -->
        <el-table
          v-loading="loading"
          ref="multipleTables"
          :data="order_s_list"
          border
          stripe
          :height="height"
          style="width: 100%"
          @cell-mouse-leave="cellLeave"
          @cell-mouse-enter="mouseHover"
          :span-method="cellMerge"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="序号" prop="index" width="60">
          </el-table-column>
          
          <el-table-column label="商品名称" width="300">
            <template slot-scope="scope">
              <div v-if="spanArr[scope.$index]>0" class="clearfix" style="text-align: left">
                <div class="lt" style="width:80%">
                  <div>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">订单编号:{{ scope.row.order_no }}</span>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">商户单号:{{ scope.row.relation_no }}</span>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">三方交易号:{{ scope.row.third_id }}</span>
                  </div>
                  <div class="ltSpan clearfix">
                    <span style="margin-right:20px;">下单时间:{{ scope.row.add_time }}</span>
                    <span style="margin-right:20px;">支付时间:{{ scope.row.paid_time }}</span>
                    <span style="margin-right:20px;">买家备注：{{ scope.row.comment?scope.row.comment:"无" }}</span>
                    <span style="margin-right:20px;">
                      卖家备注：
                      <el-input
                        type="textarea"
                        :rows="1"
                        placeholder="请输入备注"
                        v-model="scope.row.bak"
                        @focus="inputf(scope.row.bak)"
                        @blur="inputs(scope.row)"
                        style="width:200px;min-height:23px!important;"
                      >
                    </el-input>
                    </span>
                    <el-button
                      class="lt"
                      type="success"
                      style="margin-right: 20px;display:inline-block;height:20px!important;"
                      @click="seeBei(scope.row,scope.$index)"
                      >记录</el-button
                    >
                    <!-- <span style="margin-right:20px;">支付方式:{{ scope.row.pay_way_p }}</span> -->
                  </div>
                  
                </div>
                <div class="rt" style="width:20%;text-align: right;padding-top:10px;padding-right: 13px;">
                  <!--   -->
                  <!-- <el-tag type="success" style="margin-right:10px" v-if="scope.row.live_id != 0">直播间订单</el-tag> -->
                  
                  
                </div>
                
              </div>
              <div v-else style="text-align:left;">
                <div style="min-height:80px;display:flex;align-items: center;">
                  {{ scope.row.name1 }}
                </div>
                <div>规格:{{ scope.row.sku_data1 != "" ? scope.row.sku_data1 : "无" }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="150">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.image1"
                fit="cover"
                :preview-src-list="[scope.row.image1]"
              ></el-image>
            </template>
          </el-table-column>
          
          <el-table-column label="数量/单价/合计">
            <template slot-scope="scope">
              <div style="color: red;font-weight:bold;">数量: <span >{{scope.row.pro_num1}}件</span></div>
              <div>结算价: {{ scope.row.pro_cost_price1 }}元</div>
              <!-- <div>ID: {{scope.row.product_id}}</div> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="退款/退货">
            <template slot-scope="scope">
              <div style="color:#e722ff;font-weight:bold;">退款中: {{ scope.row.refun_of1 }}件</div>
              <div style="color:#e722ff;font-weight:bold;">退款完成: {{ scope.row.refund_complete1 }}件</div>
            </template>
          </el-table-column> -->
          <el-table-column label="退款明细" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.refund_complete1 == '0' && scope.row.refun_of1 == '0'">
                - -
              </div>
              <div v-else-if="scope.row.refund_status != '0'">
                <div style="color:#e722ff;">退款中: {{ scope.row.refun_of1 }}件</div>
                <div style="color:#e722ff;">退款完成: {{ scope.row.refund_complete1 }}件</div>
                <el-tag type="danger" v-if="(scope.row.refun_of1 != '0' || scope.row.refund_complete1 != '0') && scope.row.refund_status != '0'" @click="lookRefund(scope.row)" style="cursor:pointer;margin-top:5px">
                  <span style="color:rgb(231, 34, 255);">查询</span>
                </el-tag>
              </div>
              <div v-else>
                - -
              </div>
            </template>
          </el-table-column>
          <el-table-column label="退款类型" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.refund_status != '0'">
                <div v-if="scope.row.refund_status == '0'" style="color:rgb(231, 34, 255);">未退款</div>
                <div v-else-if="scope.row.refund_status == '1'" style="color:rgb(231, 34, 255);">部分退款</div>
                <div v-else-if="scope.row.refund_status == '2'" style="color:rgb(231, 34, 255);">全部退款</div>
                <div v-else-if="scope.row.refund_status == '3'" style="color:rgb(231, 34, 255);">部分退款完成</div>
                <div v-else-if="scope.row.refund_status == '4'" style="color:rgb(231, 34, 255);">全部退款完成</div>
              </div>
              <div v-else>
                - -
              </div>
            </template>
          </el-table-column>
          <el-table-column label="订单合计">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left;color: red;">
                    合计:{{ scope.row.cost_price }}元
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="支付金额">
            <!--  slot-scope="scope" -->
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left;">
                    支付:{{ scope.row.cost_price }} 元
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="收货人/买家信息" width="250">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left;">
                  <span>姓名:</span><span>{{ scope.row.address_user }}</span>
                </li>
                <li style="text-align: left;">
                  <span>电话:</span><span>{{ scope.row.address_tel }}</span>
                </li>
                <li style="text-align: left;margin-top:10px;" class="clearfix">
                  <span class="lt">昵称:</span><span class="lt shen1" style="width:120px">{{ scope.row.nickname }}</span>
                  <el-button
                    size="mini"
                    style="padding:5px 8px;position:relative;bottom:6px;"
                    class="lt"
                    type="warning"
                    @click="linkUser(scope.row)"
                    >联系用户</el-button
                  >
                </li>
                <li style="text-align: left;">
                  <span>账号:</span><span>{{ scope.row.phone }}</span>
                </li>

              </ul>
            </template>
          </el-table-column>
          <el-table-column label="支付/订单状态" width="120">
            <template slot-scope="scope">
              <!-- <div style="text-align: center">{{scope.row.pay_type == 0 ? "未支付" : "已支付"}}</div>
              <div>{{scope.row.pay_status_p}}</div> -->
              <div style="margin-bottom:10px;">
                <el-tag type="danger" v-if="scope.row.status == 1 || scope.row.status == 5">未支付</el-tag>
                <el-tag type="success" v-else>已支付</el-tag>
                <!-- {{
                  scope.row.status == 1 || scope.row.status == 5
                    ? "未支付"
                    : "已支付"
                }} -->
              </div>
              <div v-if="scope.row.status == 1"></div>
              <el-tag type="warning" v-else-if="scope.row.status == 2">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status == 3">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == 4">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.status == 5">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.status == 6">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.status == 7">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="info" v-else>未知</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" >
            <template slot-scope="scope">
              <!-- <div class="por" style="height:20px">
                    <div class="frame" v-show="bei_blean && bei_index == scope.$index" @click.stop="bei_blean = true">
                      <div v-if="addressList.length > 0">
                        <div class="items" v-for="(item,index) in addressList" :key="index">
                          <div>
                            修改{{index+1}}：{{item.after}}
                            <p class="time">{{item.create_time}}</p></div>
                        </div>
                      </div>
                      <div v-else class="items">
                        空空如也
                      </div>
                    </div>
                  </div> -->
              <el-button
                size="mini"
                type="success"
                
                v-show="scope.row.status == '2' && scope.row.refund_status != 2 && scope.row.is_deliver == 2"
                @click="go_delivery(scope.$index, scope.row)"
                >发货</el-button
              >
              <el-button
                size="mini"
                type="success"
                style="margin-top:10px"
                @click="go_Xdelivery(scope.$index, scope.row)"
                v-if="scope.row.is_deliver == 1"
                >虚拟发货</el-button
              >
              <el-button
                size="mini"
                type="primary"
                style="margin-top:10px"
                @click="see_details(scope.$index, scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 增加问答 -->
    <el-dialog
      class="remarks_box"
      :visible.sync="bei_blean"
    >
      <div class="info">历史记录</div>
      <div class="frame">
        <div v-if="addressList.length > 0">
          <div class="items" v-for="(item,index) in addressList" :key="index">
            <!--  -->
            <div>
              修改{{index+1}}：{{item.after}}
              <p class="time">{{item.create_time}}</p></div>
          </div>
        </div>
        <div v-else class="items">
          空空如也
        </div>
      </div>
    </el-dialog>

    <!-- 取消订单弹窗 -->
    <el-dialog
      title="取消订单"
      :visible.sync="cancel_order_show"
      class="cancel_box"
    >
      <el-form :model="form_cancel">
        <el-form-item label="订单编号:" :label-width="remarks_formLabelWidth">
          <el-input v-model="form_cancel.bh" disabled></el-input>
        </el-form-item>
        <el-form-item label="取消原因:" :label-width="remarks_formLabelWidth">
          <el-radio-group v-model="form_cancel.reason">
            <el-radio :label="1">商品缺货</el-radio>
            <el-radio :label="2">买家原因</el-radio>
            <el-radio :label="3">无效订单</el-radio>
            <el-radio :label="4">其他原因</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_order_show = false">取消</el-button>
        <el-button type="primary" @click="order_cancel">确认</el-button>
      </div>
    </el-dialog>

    <!-- 查看物流弹窗 -->
    <el-dialog
      title="物流信息"
      :visible.sync="express_show"
      class="express_box"
    >
      <ul>
        <li
          v-for="(item, index) in wlList"
          :key="index"
          style="margin-bottom: 10px"
        >
          物流单号: {{ item.express_no }}
          <el-button type="primary" @click="pick_see_(item)"
            >查看物流</el-button
          >
        </li>
      </ul>
      <el-row :gutter="20" class="goodsindex-list">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="wlList_po"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" type="index" width="80">
            </el-table-column>
            <el-table-column prop="AcceptTime" label="时间" width="160">
            </el-table-column>
            <el-table-column prop="AcceptStation" label="位置">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 添加备注弹窗 -->
    <el-dialog
      
      :visible.sync="add_remarks_show"
      class="remarks_box"
    >
    <div class="info">
      添加备注
    </div>
      <div style="padding:20px">
        <el-form :model="form_remarks">
          <el-form-item label="备注内容:" :label-width="remarks_formLabelWidth">
            <el-input
              style="width: 300px"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_remarks.remarks"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer clearfix" style="margin-top:80px">
          <el-button class="rt" @click="add_remarks_show = false">取消</el-button>
          <el-button class="rt" style="margin-right:20px;" type="primary" @click="add_remarks">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 订单详情弹窗 -->
    <el-dialog
      title="订单详情"
      :visible.sync="details_order_show"
      class="details_box"
    >
      <el-steps
        :active="active_type"
        finish-status="success"
        style="margin-bottom: 20px"
      >
        <el-step title="买家已下单" :description="order_time"></el-step>
        <el-step title="买家已付款" :description="pay_time.paid_time"></el-step>
        <el-step title="卖家已发货" :description="infoList.sent_time"></el-step>
        <el-step
          title="买家已收货"
          :description="infoList.delivery_time"
        ></el-step>
        <el-step title="交易完成"></el-step>
      </el-steps>

      <el-row :gutter="20" class="goodsindex-list tabs1">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="order_detalis_p"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" type="index" width="80">
            </el-table-column>
            <!-- <el-table-column label="商品ID">
              <template slot-scope="scope">
                
                 
                    ID:{{ scope.row.product_id }}
                
              </template>
            </el-table-column> -->
            <el-table-column label="商品名称" width="200">
              <template slot-scope="scope">
               
                
                    名称:{{ scope.row.name }}
                  
              </template>
            </el-table-column>
            <!-- <el-table-column label="商品主图">
              <template slot-scope="scope">
                
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.image"
                      fit="cover"
                    ></el-image>
                  
              </template>
            </el-table-column> -->
            
            <el-table-column label="商品原价">
              <template slot-scope="scope">
                
                    {{ scope.row.pro_cost_price }}元
                  
              </template>
            </el-table-column>
            <el-table-column label="商品数量">
              <template slot-scope="scope">
                
                    {{ scope.row.pro_num }}件
                  
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <div class="info_class">
        <ul>
          <li>
            <h5>售后详情</h5>
            
            <div v-for="(item,index) in infoList.returnList" :key="index">
              <div>
                <span style="padding-right:20px">售后单号 : {{item.return_no}}</span>
                <span style="padding-right:20px">申请时间 : {{item.dateline}}</span>
                <span style="padding-right:20px">成本价 : {{item.pro_cost_price}}元</span>
              </div>
              <div style="margin-top:10px;position: relative;">
                <span style="padding-right:20px" v-if="item.refund_status == 0">售后状态 : 未收货</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 1">售后状态 : 已退款</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 2">售后状态 : 退款取消</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 3">售后状态 : 等待平台退款</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 4">售后状态 : 等待商家确认收货</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 5">售后状态 : 商家退款已拒绝</span>
                <span style="padding-right:20px" v-else-if="item.refund_status == 6">售后状态 : 退货退款拒收已拒绝</span>
                <el-button style="bottom:0;position:absolute;right:0;" type="primary" @click="lookRefund1(item.return_no)">查看售后</el-button>
              </div>
              <el-row :gutter="20" class="goodsindex-list">
                <el-col :span="24">
                  <el-table
                    ref="multipleTable"
                    :data="item.return_product"
                    border
                    style="width: 100%"
                  >
                    <el-table-column 
                      label="序号"
                      type="index" 
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column label="商品名称">
                      <template slot-scope="scope">
                        {{scope.row.name}}
                      </template>
                    </el-table-column>
                    <el-table-column label="商品主图" width="120">
                      <template slot-scope="scope">
                        <el-image
                          style="width:100px;height:100px;"
                          :src="scope.row.image"
                          fit="cover"></el-image>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品规格">
                      <template slot-scope="scope">
                        {{scope.row.sku_data !='' ? scope.row.sku_data : '无'}}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column label="商品数量">
                      <template>
                        {{order_detalis_b.store_id == '0' ? '平台自营' :  order_detalis_b.store_name}}
                      </template>
                    </el-table-column> -->
                    <el-table-column
                     label="商品数量"
                     >
                     <template slot-scope="scope">
                        {{scope.row.pro_num}}
                      </template>
                    </el-table-column>
                    <el-table-column
                     label="成本价"
                     >
                     <template slot-scope="scope">
                        {{scope.row.pro_cost_price}}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </li>
          <li>
            <h5>订单信息</h5>
            <p>
              订单总金额: ￥{{ infoList.sub_total }} (含运费: ￥{{
                infoList.postage
              }}) (含优惠: 无)
            </p>
            <p v-show="active_type != 1 && infoList.payment_method != ''">
              支付方式: {{ infoList.payment_method }}
            </p>
            <p v-show="active_type != 1 && infoList.trade_no != ''">
              支付流水号: {{ infoList.trade_no }}
            </p>
          </li>
          <!-- <li>
            <p>优惠活动: 无</p>
          </li> -->
          <li>
            <h5>用户信息</h5>
            <p>用户ID : {{ infoList.uid == ''?'暂无': infoList.uid }}</p>
            <p>用户昵称 : {{ infoList.nickname == ''?'暂无': infoList.nickname }}</p>
            <p>用户手机号 : {{ infoList.phone == ''?'暂无': infoList.phone}}</p>
            <p>用户默认地址 : {{ infoList.default_address }}</p>
            <p>用户头像 :</p>
            <p style="padding-left: 100px">
              <el-image
                style="width: 100px; height: 100px"
                :src="infoList.avatar"
                fit="cover"
              ></el-image>
            </p>
          </li>
          <li>
            <h5>收货人信息</h5>
            <p>收货人 : {{ infoList.address_user }}</p>
            <p>收货人手机号 : {{ infoList.address_tel }}</p>
            <p>地址 : {{ infoList.address }}</p>
            <!-- active_type != 1 && active_type != 0 -->
            <div
              v-show="infoList.wlList.length>0"
            >
            <!-- && active_type != 2  -->
              <ul>
                <li
                
                  v-for="(item, index) in infoList.wlList"
                  :key="index"
                  style="margin-bottom: 10px"
                >
                  <h4 style="font-size:17px">包裹{{index+1}}.</h4>
                  <el-row :gutter="20" class="goodsindex-list" v-if="item.product.length > 0">
                    <el-col :span="24">
                      <el-table
                        ref="multipleTable"
                        :data="item.product"
                        border
                        style="width: 100%"
                      >
                        <el-table-column 
                          label="序号"
                          type="index"
                        >
                        </el-table-column>
                        <el-table-column 
                          label="名称"
                          prop="name"
                        >
                        </el-table-column>
                        <el-table-column 
                          label="规格"
                          prop="sku_data"
                        >
                        </el-table-column>
                        <el-table-column 
                          label="数量"
                          prop="num"
                        >
                        </el-table-column>
                        <el-table-column label="商品主图" width="120">
                          <template slot-scope="scope">
                            <el-image
                              style="width:100px;height:100px"
                              :src="scope.row.image"
                              fit="cover"></el-image>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                  <p>物流公司: {{ item.express_company }}</p>
                  <p>物流单号: {{ item.express_no }}</p>
                  <p>物流备注: {{item.remarks}} </p>
                  <el-button type="primary" @click="edit_wl(item,index)"
                    >修改物流</el-button
                  >
                  <el-button type="primary" @click="see_wl(item,index)"
                    >查看物流</el-button
                  >
                  <el-row
                    :gutter="20"
                    class="goodsindex-list"
                    v-show="wlList_p.length > 0 && index == whIndex"
                  >
                    <el-col :span="24">
                      <el-table
                        ref="multipleTable"
                        :data="wlList_p"
                        border
                        style="width: 100%"
                      >
                        <el-table-column label="序号" type="index" width="80">
                        </el-table-column>
                        <el-table-column prop="AcceptTime" label="时间" width="160">
                        </el-table-column>
                        <el-table-column prop="AcceptStation" label="位置">
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
            
            <!-- active_type != 1 && active_type != 2 && active_type != 0 -->
            
          </li>
          <li>
            <h5>买家备注</h5>
            <p>备注 : {{ infoList.comment == ''?'无':infoList.comment }}</p>
          </li>
          <li>
            <h5>卖家备注</h5>
            <p>备注 : {{ infoList.bak == ''?'无':infoList.bak }}</p>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      title="修改物流"
      :visible.sync="edit_wl_blean"
      class="details_box"
    >
      <el-form :model="wlListObj">
        <el-form-item
          label="物流公司:"
          :label-width="remarks_formLabelWidth"
          style="position:relative"
        >
          <div class="wo"></div>
          <el-select
            v-model="wlListObj.express"
            placeholder="请选择物流公司"
          >
            <el-option
              v-for="ite in express_list_p"
              :key="ite.pigcms_id"
              :label="ite.name"
              :value="ite.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号:" style="position:relative" :label-width="remarks_formLabelWidth">
          <div class="wo"></div>
          <el-input
            v-model="wlListObj.ydh"
            placeholder="请输入运单号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        style="text-align: right"
      >
        <el-button
          type="danger"
          
          @click="edit_wl_blean = false"
          >取消</el-button
        >
        <el-button type="success" @click="edit_wl_info"
          >修改</el-button
        >
      </div>
    </el-dialog>
    <!-- 发货弹窗 -->
    <el-dialog
      :visible.sync="delivery_blean"
      class="delivery_box el-dialog1"
    >
      <div class="info">订单详情/发货</div>
      <div class="ship">
        <div style="padding:20px 50px">
          <div class="item clearfix">
            <div class="lt father clearfix">
              <div class="lt cont">
                <div class="text pr">收件信息 : </div>
              </div>
              <div class="lt cont" style="padding-right:20px;width:500px;">
                <div class="text">收件人 : {{order_info.address_user}}</div>
                <div class="text">联系电话 : {{order_info.address_tel}}</div>
                <div class="text">收货地址 : {{order_info.address.province}}{{order_info.address.city}}{{order_info.address.area}}{{order_info.address.address}}</div>
              </div>
              <div class="lt cont">
                <div class="text pr">发货方式 : </div>
              </div>
              <div class="lt cont">
                <div class="text"><el-radio v-model="radio" label="1">快递物流</el-radio></div>
                <div class="text" style="margin-top:5px"><el-radio v-model="radio" label="2">买家自提</el-radio></div>
              </div>
            </div>
            <div class="lt son">
              <div class="img clearfix">
                <div class="lt clearfix">
                  <img src="../../assets/image/wuliu.png" @click="add_form" class="lt" :class="img?'active':''" style="width: 40px; height: 40px" alt="" />
                  <span :class="img?'active':''" @click="add_form">新增分包</span>
                </div>
                <div class="rt">
                  <img src="../../assets/image/xinzen.png" @click="add_form" :class="img?'active':''" class="lt" style="width: 30px; height: 30px" alt="" />
                </div>
              </div>
              <p>商品分两个以上单号同时发出使用</p>
            </div>
          </div>
        </div>
        
        <div class="item3">
            <div class="item item2 clearfix" v-for="(item,index) in form_delivery" :key="index">
          <div class="tit lt">
            <img src="../../assets/image/wuliu.png" class="lt" style="width: 40px; height: 40px" alt="" />
            <span class="lt" v-if="index == 0">默认分包</span>
            <span class="lt" v-else>新增分包{{index}}</span>
            <el-button
                type="danger"
                style="float: right"
                v-show="form_delivery.length > 1"
                @click="delete_form(index)"
                >删除</el-button
              >
          </div>
          <div class="firm clearfix">
            <div v-if="radio == 1">
              <div class="lt" style="width:50%;padding-top:10px">
                <div class="clearfix">
                  <div class="lt tex" style="width:20%">
                    物流公司 : 
                  </div>
                  <div class="lt" style="width:80%">
                    <el-select v-model="item.express" placeholder="请选择物流公司" style="width:300px">
                      <el-option
                        v-for="ite in express_list_p"
                        :key="ite.pigcms_id"
                        :label="ite.name"
                        :value="ite.name"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-cascader
                      v-model="item.express"
                      placeholder="试试搜索:关键字"
                      :options="express_list_b"
                      filterable></el-cascader> -->
                  </div>
                </div>
                
              </div>
              <div class="lt" style="width:50%;padding-top:10px">
                <div class="clearfix">
                  <div class="lt tex" style="width:20%">
                    快递单号 : 
                  </div>
                  <div class="lt" style="width:80%">
                    <el-input
                      style="width:300px"
                      v-model="item.ydh"
                      placeholder="请输入运单号"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix" v-else>
                <div class="tex">买家自提</div>
              </div>
          </div>

          <el-row :gutter="20" class="goodsindex-list1" style="margin: 0 0 0 0" @selection-change="handleSelectionChange">
            <el-col :span="24" style="padding: 0; margin-top: 20px">
              <el-table :data="item.pigcms_list" border :span-method="cellMerge1">
                <el-table-column label="序号" type="index"> </el-table-column>
                <el-table-column label="商品名称" prop="product_name"> </el-table-column>
                <el-table-column label="规格">
                  <template slot-scope="scope">
                    <div>{{scope.row.sku_data===''?"无":scope.row.sku_data}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="下单数量" prop="pro_num"> </el-table-column>
                <el-table-column label="可发数量" prop="delivered_num" class="num2"> </el-table-column>
                <el-table-column label="输入数量" width="150">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.number"
                      placeholder="输入数量"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="150">
                  <template slot-scope="scope">
                    <el-input
                      class="el-input1"
                      v-model="scope.row.bei"
                      placeholder="输入备注(选填)"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          
        </div>
        <p style="text-align: right; padding: 20px 0 20px">
            <el-button type="danger" @click="delivery_blean = false">取消</el-button>
            <el-button type="success" @click="sure_delivery">发货</el-button>
          </p>
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
    <!-- 历史记录 -->
    <el-dialog
      class="remarks_box lishi"
      :visible.sync="bei_blean"
    >
      <div class="info">历史记录</div>
      <div class="frame" style="padding:20px">
        <div v-if="addressList.length > 0">
          <div class="items" v-for="(item,index) in addressList" :key="index">
            <!--  -->
            <div>
              {{item.after}}
              <p class="time">{{item.create_time}}</p></div>
          </div>
        </div>
        <div v-else class="items">
          空空如也
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicFile from '../../utils/publicFile'
import {
  order_list,
  order_info,
  order_product,
  deliver,
  get_province,
  get_city,
  order_bak_list,
  get_area,
  logistics,
  get_express,
  express_list,
  set_addre,
  order_bak,
  invented_deliver
} from "../../utils/axios";
let num = 0
import $ from 'jquery'
export default {
  data() {
    return {
      
      goodsArrList:[],
      order_s_list: [], //订单列表
      loading: false,
      remarks_formLabelWidth: "100px",
      fn1: this.commonJs.Debounce(this.get_order_list),
      
      O_message: {},
      queryInfo: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      remarks_row: {},
      height:"",
      pick_condition: "1",
      options: [
        {
          value: "1",
          label: "订单编号",
        },
        {
          value: "2",
          label: "商品名称",
        },
        {
          value: "3",
          label: "物流单号",
        },
        {
          value: "4",
          label: "收货人姓名",
        },
        {
          value: "8",
          label: "收货人电话",
        },
        {
          value: "6",
          label: "三方交易单号搜索",
        },
        {
          value: "7",
          label: "买家昵称",
        },
        {
          value: "5",
          label: "买家电话",
        },
      ],
      express_list_b:[],
      time_list: [
        {
          value: "0",
          label: "时间搜索类型",
        },
        {
          value: "1",
          label: "下单时间",
        },
        {
          value: "2",
          label: "支付时间",
        },
      ],
      time_type: "0",
      
      pick_value: "",
      pageSize: 0,
      
      comm_status_value:'',
      comm_method_list: [
        {
          //支付方式选择
          value: "1",
          label: "营销订单",
        },
        {
          value: "2",
          label: "普通订单",
        }
      ],
      whIndex:"",
      order_status_value:"0",
      order_method_value:[
        //订单状态
        {
          value: "0",
          label: "请选择订单状态",
        },
        {
          value: "1",
          label: "待支付",
        },
        {
          value: "2",
          label: "待发货",
        },
        {
          value: "3",
          label: "待收货",
        },
        {
          value: "4",
          label: "已完成(待评价)",
        },
        {
          value: "5",
          label: "已取消",
        },
        {
          value: "7",
          label: "待完成",
        },
        {
          value: "-1",
          label: "全部订单",
        }
      ],
      goodsList: {
        package: [],
      },
      order_info:{
        address:{}
      },
      payment_method_list: [
        {
          //支付方式选择
          value: "weixin",
          label: "微信",
        },
        {
          value: "alipay",
          label: "支付宝",
        },
        {
          value: "balance",
          label: "余额",
        },
        {
          value: "score",
          label: "橘宝",
        },
        {
          value: "blend",
          label: "混合",
        }
      ],
      mark:{
        one:"",
        two:"",
        three:"",
        four:""
      },
      payment_status_value: "",
      time_value: "",
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        // },
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
      indexArr:[],
      activeName: "first",
      remarks_row: {},
      form_remarks: {
        remarks: "",
      },
      add_remarks_show:false,
      order_row: {},
      cancel_order_show: false,
      form_cancel: {
        bh: "",
        reason: "",
      },
      wlListObj:{
        ydh:"",
        express:"",
      },
      ind:"",
      express_show: false,
      wlList: [],
      details_order_show: false,
      active_type: 0,
      pay_time: "",
      order_time:"",
      order_detalis_p: [],
      infoList: {
        postage: "", //邮费
        sub_total: "", //商品金额
        payment_method: "", //支付方式
        address_user: "", //收货人
        address_tel: "", //收货人电话
        address: "", //收货人地址
        bak: "", //卖家备注
        comment: "", //买家备注
        avatar: "", //用户头像
        nickname: "", //用户名称
        uid: "", //用户ID
        phone: "", //用户手机号
        rank_name: "", //段位名称
        name: "", //运营商名称
        linkman: "", //运营商联系人
        tel: "", //运营商联系电话
        default_address: "", //用户默认地址
        trade_no: "", //交易单号
        sent_time: "", //发货时间
        delivery_time: "", //收货时间
        express_code: "", //物流code
        express_c: "", //物流公司
        express_no: "", //物流单号
        wlList: [],
      },
      wlList_p: [],
      delivery_row: {},
      delivery_show: false,
      delivery_detalis_p: {
        package:[]
      },
      delivery_from: {
        address_user: "",
        address_tel: "",
        address: "",
        comment: "",
        order_time: "",
        bh: "",
      },
      reuseObj:{},
      from:{},
      form_adderess: {
        name: "",
        tel: "",
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        mark: "",
      },
      form_adderess: {
        name: "",
        tel: "",
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        mark: "",
      },
      pigcms_list: [],
      form_adderess_show: false,
      express_list_p: [],
      express_list_b:[],
      provinceList: [], //省
      cityList: [], //市
      city_ifShow: false,
      areaList: [], //区
      area_ifShow: false,
      wlList_po: [],
      param_data:[
        {

        }
      ],//发货最后一步选择物流服务要写成活的
      broaid:"",
      spanArr:[],
      edit_wl_blean:false,
      top_status:"0",
      delivery_blean: false,
      img:false,
      radio:"1",
      form_delivery:[
        {
          pigcms_list:[
            {
              sku_data: "", //商品规格
              pro_num: "", //订单商品数量
              product_name: "", //商品名称
              delivered_num: 0, //可发货数量
              number:"",
              bei:"",
            }
          ],
          express: "",
          ydh: "",
        }
      ],
      multipleSelection:[],
      product_id:"",
      spanBrr:[],
      bei_blean:false,
      bei_index:"",
      addressList:[],
      inputFirst:"",
    };
  },
  computed: {
    
  },
  watch: {
    "form_adderess.provinceValue": {
      handler: function (news, olds) {
        if (news) {
          this.city_ifShow = true;
          this.form_adderess.cityValue = "";
          this.form_adderess.areaValue = "";
          this.area_ifShow = false;
          this.get_city(news);
        } else {
          this.city_ifShow = false;
          this.form_adderess.cityValue = "";
          this.form_adderess.areaValue = "";
          this.area_ifShow = false;
        }
      },
    },
    "edit_wl_blean":{
      handler: function(news){
        if(!news){
          this.wlListObj = {
            express:"",
            ydh:"",
          }
          this.ind = ""
        }
      }
    },
    "form_adderess.cityValue": {
      handler: function (news, olds) {
        console.log(news);
        if (news) {
          this.area_ifShow = true;
          this.form_adderess.areaValue = "";
          this.get_area(news);
        } else {
          this.area_ifShow = false;
        }
      },
    },
  },

  created() {
    if(this.$route.query.order_id != undefined){
      this.pick_value = this.$route.query.order_id
      this.pick_condition = "1"
      this.pick_seach()
    }else{
      this.get_order_list(); //获取全部订单列表
    }
    this.get_province(); //获取省份
    this.expressList()
    //获取角标
    // this.firstFun("second")
    // this.firstFun("third")
    // this.firstFun("fourth")
    // this.firstFun("six")
    this.height = document.body.clientHeight - 300
  },

  methods: {
    edit_wl(item,index){
      console.log(item)
      console.log(index)
      this.wlListObj.express = item.express_code
      this.wlListObj.ydh = item.express_no
      this.ind = item.package_id
      this.edit_wl_blean = true
    },
    edit_wl_info(){
      //掉接口
      let express_name = ''
      this.express_list_p.forEach(item => {
        if(item.code == this.wlListObj.express){
          express_name = item.name
        }
      })
      let data = {
        package_id:this.ind,
        express_code:this.wlListObj.express,
        express_company:express_name,
        express_no:this.wlListObj.ydh,
      }
      console.log(data)
      logistics(
        data
      ).then((res) => {
        if (res.data.err_code == 0) {
          console.log(this.infoList.wlList)
          this.infoList.wlList.forEach(item => {
            if(item.package_id == this.ind){
              item.express_code = this.wlListObj.express
              item.express_no = this.wlListObj.ydh
              item.express_company = express_name
            }
          })
          this.edit_wl_blean = false
          
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //划入
    mouseHover(row){
      this.indexArr = []
      for(let i = 0 ; i < this.order_s_list.length ; i++ ){
        if(this.order_s_list[i].index == row.index){
          this.indexArr.push(i)
        }
      }
      this.indexArr.forEach((item,index) => {
        $('.goodsindex-list2 tbody tr:nth-of-type('+ (this.indexArr[index]+1) +')').addClass("active")
      })
    },
    //划出
    cellLeave(row,colum){
      this.indexArr.forEach((item,index) => {
        $('.goodsindex-list2 tbody tr:nth-of-type('+ (this.indexArr[index]+1) +')').removeClass("active")
      })
    },
    //表格合并行
    cellMerge({ row, column, rowIndex, columnIndex }) {
      
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      if(columnIndex == 0 || columnIndex == 1){
        _row = this.spanArr[rowIndex]
      }
      let _col = _row > 0 ? 1 : 0;
      if(this.spanArr[rowIndex] > 2){
        if(columnIndex == 7){
          _row = 6
        }
        
      }
      if(this.spanArr[rowIndex] > 0){
        if (columnIndex == 0 || columnIndex == 1){
          _col = 1
        }else if (columnIndex == 2){
          _col = 10
          
        }else{
          if(this.spanArr[rowIndex] > 0){
            $('.goodsindex-list2 tbody tr:nth-of-type('+ rowIndex +')').css({"border-bottom":"5px solid #c1c1c1"})
          }
          _col = 0
        }
      }
      if(this.spanBrr[rowIndex]>0){
        if(columnIndex == 11 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10){
          _row = this.spanBrr[rowIndex]
        }
      }else{
        if(columnIndex == 11 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10){
          _row = 0
        }
      }

      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      // let _row = 1;
      // if(columnIndex == 0){
      //   _row = this.spanArr[rowIndex]
      // }
      // let _col = _row > 0 ? 1 : 0;
      // if(this.spanArr[rowIndex] > 2){
      //   if(columnIndex == 6){
      //     _row = 6
      //   }
        
      // }
      // if(this.spanArr[rowIndex] > 0){
      //   if (columnIndex == 0){
      //     _col = 1
      //   }else if (columnIndex == 1){
      //     _col = 10
          
      //   }else{
      //     if(this.spanArr[rowIndex] > 0){
      //       $('.goodsindex-list2 tbody tr:nth-of-type('+ rowIndex +')').css({"border-bottom":"5px solid #c1c1c1"})
      //     }
      //     _col = 0
      //   }
      // }
      // if(this.spanBrr[rowIndex]>0){
      //   if(columnIndex == 5 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10){
      //     _row = this.spanBrr[rowIndex]
      //   }
      // }else{
      //   if(columnIndex == 5 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10){
      //     _row = 0
      //   }
      // }

      return {
        rowspan: _row, //行
        colspan: _col, //列
      };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    //表格合并行
    cellMerge1({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (columnIndex == 6) {
        if (rowIndex == 0) {
          _row = 6;
        } else {
          _row = 0;
        }
      }

      return {
        rowspan: _row, //行
        colspan: _col, //列
      };
    },
    // 获取物流公司
    expressList() {
      let that = this;
      express_list().then((res) => {
        console.log(res)
        if (res.data.err_code == 0) {
          this.express_list_p = res.data.err_msg.list
          res.data.err_msg.list.forEach((item,index) => {
            var obj = {}
            obj.value = item.pigcms_id
            obj.label = item.name
            this.express_list_b.push(obj)
          })
        } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    // 获取省
    get_province() {
      let that = this;
      get_province().then((res) => {
        console.log(res)
        if (res.data.err_code == 0) {
          if (res.data.err_msg) {
            for (let i in res.data.err_msg) {
              that.provinceList.push({
                province_id: i,
                name: res.data.err_msg[i],
              });
            }
          }
        } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //添加备注
    remarks_add(index, row) {
      this.remarks_row = row;
      this.form_remarks.remarks = "";
      this.add_remarks_show = true;
      //备注
      // orderInfo.info.bak
      order_info({
        order_id: row.order_id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.err_code == 0) {
          if(res.data.err_msg.bak){
            this.form_remarks.remarks = res.data.err_msg.bak
          }
          
          } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //确认添加备注
    add_remarks() {
      let that = this;
      if (that.form_remarks.remarks == "") {
        that.$message({
          message: "请填写备注",
          type: "warning",
        });
        return;
      }
      order_bak({
        order_id: that.remarks_row.order_id,
        bak: that.form_remarks.remarks,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.add_remarks_show = false;
            that.$message({
              message: "添加成功",
              type: "success",
            });
            this.get_consumer_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
            
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取市
    get_city(province_id) {
      let that = this;
      this.cityList = [];
      get_city({ province_id: province_id }).then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.err_msg) {
            for (let i in res.data.err_msg) {
              that.cityList.push({
                city_id: i,
                name: res.data.err_msg[i],
              });
            }
          }
        } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },

    // 获取区
    get_area(city_id) {
      let that = this;
      this.areaList = [];
      get_area({ city_id: city_id }).then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.err_msg) {
            for (let i in res.data.err_msg) {
              that.areaList.push({
                area_id: i,
                name: res.data.err_msg[i],
              });
            }
          }
        } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    firstFun(name){
      let that = this
      that.request_form = {
        page: 1,
        page_size: 20
      }
      let status;
      that.order_s_list = []
      this.spanArr = []
      this.spanBrr = []
      if (name == "second") {
        status = 1; //待付款
      } else if (name == "third") {
        status = 2; //待发货
      } else if (name == "fourth") {
        status = 3; //待收货
      } else if (name == "six") {
        status = 7; //待完成
      }
      // this.top_status = status
      that.request_form.status = status,
      that.request_form.top_status = status
      order_list(that.request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if(res.data.err_msg.total_number > 99){
              res.data.err_msg.total_number = "99+"
            }
            if (name == "second") {
              this.mark.one = res.data.err_msg.total_number; //待付款
            } else if (name == "third") {
              this.mark.two = res.data.err_msg.total_number;//待发货
            } else if (name == "fourth") {
              this.mark.three = res.data.err_msg.total_number;//待收货
            } else if (name == "six") {
              this.mark.four = res.data.err_msg.total_number;//待完成
            }
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //tab切换
    handleClick(tab, event) {
      let page = 1;
      let number = 20
      let that = this;
      let status = "";
      if(tab.name == 'first') {
        status = 0 //全部
      }else if (tab.name == "second") {
        status = 1; //待付款
      } else if (tab.name == "third") {
        status = 2; //待发货
      } else if (tab.name == "fourth") {
        status = 3; //待收货
      } else if (tab.name == "five") {
        status = 4; //(待评价)已完成
      }  else if (tab.name == "fiveth") {
        status = 5; //已取消
      }  else if (tab.name == "six") {
        status = 7; //交易完成
      }  else if (tab.name == "seven") {
        status = 6; //
      }
      
      that.top_status = status
      that.request_form = {}
      that.request_form.top_status = status
      // that.request_form.status = status
      // this.top_status = status
      // that.loading = true;
      // that.order_s_list = []
      // this.spanArr = []
      // this.spanBrr = []
      
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      that.order_s_list = []
            this.spanArr = []
            this.spanBrr = []
      if (that.pick_condition == 1) {
        //订单编号
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: that.pick_value, //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 2) {
        //商品名称
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: that.pick_value, //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 3) {
        //物流单号
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: that.pick_value, //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 4) {
        //收货人姓名
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: that.pick_value, //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 5) {
        //收货人电话
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: that.pick_value, //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
        
      } else if (that.pick_condition == 6) {
        //三方交易单号搜索
        that.request_form = {
          third_id:that.pick_value,
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 7) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:that.pick_value,//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 8) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:that.pick_value,//买家电话
        };
      } else {
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      }
      that.request_form.top_status = status
      that.request_form.status = status
      order_list(that.request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            that.loading = false;
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              element.product_list.push(element.product_list[0])
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
              );
              element.add_time = that.commonJs.timestampToTime(
                element.add_time
              );
              if (element.payment_method == "weixin") {
                element.pay_way_p = "微信";
              } else if (element.payment_method == "alipay") {
                element.pay_way_p = "支付宝";
              } else if (element.payment_method == "balance") {
                element.pay_way_p = "余额";
              } else if (element.payment_method == "score") {
                element.pay_way_p = "橘宝";
              } else if (element.payment_method == "blend") {
                element.pay_way_p = "混合";
              } else {
                element.pay_way_p = "暂无";
              }

              if (element.status == 1) {
                element.pay_status_p = "待支付";
              } else if (element.status == 2) {
                element.pay_status_p = "待发货 ";
              } else if (element.status == 3) {
                element.pay_status_p = "待收货";
              } else if (element.status == 4) {
                element.pay_status_p = "已完成";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "交易关闭";
              } else if (element.status == 0) {
                element.pay_status_p = "临时订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if (element.product_list.length > 2) {
                this.spanBrr.push(0);
                for (let i = 1; i < element.product_list.length; i++) {
                  if(i == 1){
                    this.spanBrr.push(element.product_list.length-1);
                  }else{
                    this.spanBrr.push(0);
                  }
                }
              }else{
                this.spanBrr.push(1);
                this.spanBrr.push(1);
              }
              this.spanArr.push(element.product_list.length);
              for (let i = 1; i < element.product_list.length; i++) {
                this.spanArr.push(0);
              }
              
              element.product_list.forEach((ele, ind) => {
                element.index = index + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product_list 每个属性键值 + "1" 这样可以避免给element.product_list属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo.page = parseInt(res.data.err_msg.page);
            that.queryInfo.total = parseInt(res.data.err_msg.total_number);
            that.pageSize = res.data.err_msg.page_size;
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
          console.log(error);
        });
    },

    //获取订单列表
    get_order_list(index) {
      let that = this;
      this.comm_status_value = ''
      that.activeName = "first";
      that.loading = true;
      that.payment_status_value = "";
      that.time_type = "0";
      that.order_status_value = "0";
      that.time_value = "";
      that.pick_condition = "1";
      that.pick_value = "";
      that.order_s_list = []
            this.spanArr = []
            this.spanBrr = []
      let request_form = {
        page: 1,
        page_size: 20,
        top_status:this.top_status
      };
      order_list(request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            if(res.data.err_msg.stay_pay_num > 99){
              res.data.err_msg.stay_pay_num = "99+"
            }
            if(res.data.err_msg.stay_deliver_num > 99){
              res.data.err_msg.stay_deliver_num = "99+"
            }
            if(res.data.err_msg.stay_collect_num > 99){
              res.data.err_msg.stay_collect_num = "99+"
            }
            if(res.data.err_msg.stay_complete_num > 99){
              res.data.err_msg.stay_complete_num = "99+"
            }
            this.mark.one = res.data.err_msg.stay_pay_num; //待付款
            this.mark.two = res.data.err_msg.stay_deliver_num;//待发货
            this.mark.three = res.data.err_msg.stay_collect_num;//待收货
            this.mark.four = res.data.err_msg.stay_complete_num;//待完成

            res.data.err_msg.list.forEach((element,index) => {
              
              element.product_list.push(element.product_list[0])
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
              );
              element.add_time = that.commonJs.timestampToTime(
                element.add_time
              );
              if (element.payment_method == "weixin") {
                element.pay_way_p = "微信";
              } else if (element.payment_method == "alipay") {
                element.pay_way_p = "支付宝";
              } else if (element.payment_method == "balance") {
                element.pay_way_p = "余额";
              } else if (element.payment_method == "score") {
                element.pay_way_p = "橘宝";
              } else if (element.payment_method == "blend") {
                element.pay_way_p = "混合";
              } else {
                element.pay_way_p = "暂无";
              }
              
              if (element.status == 1) {
                element.pay_status_p = "待支付";
              } else if (element.status == 2) {
                element.pay_status_p = "待发货 ";
              } else if (element.status == 3) {
                element.pay_status_p = "待收货";
              } else if (element.status == 4) {
                element.pay_status_p = "已完成";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "交易关闭";
              } else if (element.status == 0) {
                element.pay_status_p = "临时订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              
              if (element.product_list.length > 2) {
                this.spanBrr.push(0);
                for (let i = 1; i < element.product_list.length; i++) {
                  if(i == 1){
                    this.spanBrr.push(element.product_list.length-1);
                  }else{
                    this.spanBrr.push(0);
                  }
                }
              }else{
                this.spanBrr.push(1);
                this.spanBrr.push(1);
              }
              this.spanArr.push(element.product_list.length);
              for (let i = 1; i < element.product_list.length; i++) {
                this.spanArr.push(0);
              }
              element.product_list.forEach((ele, ind) => {
                element.index = index + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product_list 每个属性键值 + "1" 这样可以避免给element.product_list属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo.page = parseInt(res.data.err_msg.page);
            that.queryInfo.total = parseInt(res.data.err_msg.total_number);
            that.pageSize = res.data.err_msg.page_size;
            
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
          console.log(error);
        });
    },

    //分页
    get_consumer_list_page(page, number) {
      this.multipleSelection.forEach((item, index) => {
        this.goodsArrList.push(item);
      });

      let that = this;
      that.loading = true;
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      that.order_s_list = []
            this.spanArr = []
            this.spanBrr = []
      if (that.pick_condition == 1) {
        //订单编号
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: that.pick_value, //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 2) {
        //商品名称
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: that.pick_value, //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 3) {
        //物流单号
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: that.pick_value, //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 4) {
        //收货人姓名
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: that.pick_value, //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 5) {
        //收货人电话
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: that.pick_value, //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
        
      } else if (that.pick_condition == 6) {
        //三方交易单号搜索
        that.request_form = {
          third_id:that.pick_value,
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 7) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:that.pick_value,//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 8) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:that.pick_value,//买家电话
        };
      } else {
        that.request_form = {
          third_id:"",
          page: page,
          page_size: number,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          express_no: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      }
      that.request_form.top_status = this.top_status
      that.request_form.status = this.top_status
      order_list(that.request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            
            that.loading = false;
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              element.product_list.push(element.product_list[0])
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
              );
              element.add_time = that.commonJs.timestampToTime(
                element.add_time
              );
              if (element.payment_method == "weixin") {
                element.pay_way_p = "微信";
              } else if (element.payment_method == "alipay") {
                element.pay_way_p = "支付宝";
              } else if (element.payment_method == "balance") {
                element.pay_way_p = "余额";
              } else if (element.payment_method == "score") {
                element.pay_way_p = "橘宝";
              } else if (element.payment_method == "blend") {
                element.pay_way_p = "混合";
              } else {
                element.pay_way_p = "暂无";
              }

              if (element.status == 1) {
                element.pay_status_p = "待支付";
              } else if (element.status == 2) {
                element.pay_status_p = "待发货 ";
              } else if (element.status == 3) {
                element.pay_status_p = "待收货";
              } else if (element.status == 4) {
                element.pay_status_p = "已完成";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "交易关闭";
              } else if (element.status == 0) {
                element.pay_status_p = "临时订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if (element.product_list.length > 2) {
                this.spanBrr.push(0);
                for (let i = 1; i < element.product_list.length; i++) {
                  if(i == 1){
                    this.spanBrr.push(element.product_list.length-1);
                  }else{
                    this.spanBrr.push(0);
                  }
                }
              }else{
                this.spanBrr.push(1);
                this.spanBrr.push(1);
              }
              this.spanArr.push(element.product_list.length);
              for (let i = 1; i < element.product_list.length; i++) {
                this.spanArr.push(0);
              }
              
              element.product_list.forEach((ele, ind) => {
                element.index = index + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product_list 每个属性键值 + "1" 这样可以避免给element.product_list属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo.page = parseInt(res.data.err_msg.page);
            that.queryInfo.total = parseInt(res.data.err_msg.total_number);
            that.pageSize = res.data.err_msg.page_size;
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
          console.log(error);
        });
    },

    //每页显示条数改变
    handleSizeChange(val) {
      console.log(this.queryInfo);
      this.get_consumer_list_page(1, val);
    },

    //当前页
    handleCurrentChange(val) {
      console.log(val);
      this.get_consumer_list_page(val, this.pageSize);
    },
    stopScroll(evt) {
      evt = evt || window.event;
      if (evt.preventDefault) {
        // Firefox
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        // IE
        evt.cancelBubble = true;
        evt.returnValue = false;
      }
      return false;
    },
    //导出
    user_derive_excel1(){
      this.multipleSelection.forEach((item, index) => {
        this.goodsArrList.push(item);
      });
      let that = this;
      console.log(this.time_value);
      if (
        this.payment_status_value == "" &&
        this.time_type == "0" &&
        this.pick_value == "" && this.comm_status_value == '' &&
        this.goodsArrList.length == 0
      ) {
        that.$message({
          message: "请选择任意一种搜索条件",
          type: "warning",
        });
        return;
      } else if (
        (this.time_type != "0" && this.time_value == "") ||
        (this.time_type == "0" && this.time_value != "")
      ) {
        that.$message({
          message: "时间类型未选择或者未选择时间",
          type: "warning",
        });
        return;
      } 
      // else if (this.pick_condition != "" && this.pick_value == "") {
      //   that.$message({
      //     message: "请输入搜索内容",
      //     type: "warning",
      //   });
      //   return;
      // }
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      if (that.pick_condition == 1) {
        //订单编号
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: that.pick_value, //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 2) {
        //商品名称
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: that.pick_value, //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 3) {
        //物流单号
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: that.pick_value, //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
        
      } else if (that.pick_condition == 4) {
        //收货人姓名
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: that.pick_value, //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 5) {
        //收货人电话
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: that.pick_value, //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 6) {
        //三方交易单号搜索
        that.request_form = {
          third_id:that.pick_value,
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
        
      } else if (that.pick_condition == 7) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:that.pick_value,//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 8) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:that.pick_value,//买家电话
        };
      } else {
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      }
      that.request_form.top_status = this.top_status
      that.request_form.status = this.top_status
      console.log(that.request_form);
      // that.order_s_list = []
      order_list(that.request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if(res.data.err_msg.list.length == 0){
              that.$message({
                showClose: true,
                message: "暂无数据",
                type: "error",
              });
            }else{
              var result = [];
              var obj = {};
              for (var i = 0; i < this.goodsArrList.length; i++) {
                if (!obj[this.goodsArrList[i].order_id]) {
                  result.push(this.goodsArrList[i]);
                  obj[this.goodsArrList[i].order_id] = true;
                }
              }
              var str = "";
              result.forEach((element) => {
                if (str == "") {
                  str += element.order_id;
                } else {
                  str += "," + element.order_id;
                }
              });
              console.log(str)
              this.goodsArrList = []
              var time1 = "";
              var time2 = "";
              if (this.time_value != "") {
                
                time1 = this.commonJs.dataTime(this.time_value[0]);
                time2 = this.commonJs.dataTime(this.time_value[1]);
              }
              if (that.pick_condition == 1) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="+ that.pick_value
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
                
                
              }else if (that.pick_condition == 2) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="+ that.pick_value
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
              }else if (that.pick_condition == 3) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&store="+ that.pick_value
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
              }else if (that.pick_condition == 4) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                  +"&order_time_type=" + that.time_type
                  +"&start_time="+ time1 
                  +"&end_time="+ time2
                  +"&order_no="
                  +"&goods_name="
                  +"&express_no="
                  +"&address_user="+ that.pick_value
                  +"&address_tel="
                  +"&payment_method="+ that.payment_status_value
                  +"&activity_type="+that.comm_status_value
                  +"&third_id="
                  +"&user_nickname="
                  +"&user_phone="
                  +"&order_ids=" + str
                )
                
              }else if (that.pick_condition == 5) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="+ that.pick_value
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
              }else if (that.pick_condition == 6) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="+ that.pick_value
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
              }else if (that.pick_condition == 7) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="+ that.pick_value
                +"&user_phone="
                +"&order_ids=" + str
                )
              }else if (that.pick_condition == 8) {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="+ that.pick_value
                +"&order_ids=" + str
                )
              }else {
                window.open(publicFile.address + "/store_admin.php?c=order&a=order_derive_excel&top_status="+this.top_status
                +"&order_time_type=" + that.time_type
                +"&start_time="+ time1 
                +"&end_time="+ time2
                +"&order_no="
                +"&goods_name="
                +"&express_no="
                +"&address_user="
                +"&address_tel="
                +"&payment_method="+ that.payment_status_value
                +"&activity_type="+that.comm_status_value
                +"&third_id="
                +"&user_nickname="
                +"&user_phone="
                +"&order_ids=" + str
                )
              }
            }
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //搜索
    pick_seach() {
      let that = this;
      console.log(this.time_value);
      
      if (
        this.payment_status_value == "" &&
        this.time_type == "0" &&
        this.pick_value == "" && this.comm_status_value == ''
      ) {
        that.$message({
          message: "请选择任意一种搜索条件",
          type: "warning",
        });
        return;
      } else if (
        (this.time_type != "0" && this.time_value == "") ||
        (this.time_type == "0" && this.time_value != "")
      ) {
        that.$message({
          message: "时间类型未选择或者未选择时间",
          type: "warning",
        });
        return;
      } 
      // else if (this.pick_condition != "" && this.pick_value == "") {
      //   that.$message({
      //     message: "请输入搜索内容",
      //     type: "warning",
      //   });
      //   return;
      // }
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      that.order_s_list = []
      this.spanArr = []
      this.spanBrr = []
      if (that.pick_condition == 1) {
        //订单编号
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: that.pick_value, //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 2) {
        //商品名称
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: that.pick_value, //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 3) {
        //物流单号
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: that.pick_value, //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 4) {
        //收货人姓名
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: that.pick_value, //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 5) {
        //收货人电话
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: that.pick_value, //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 6) {
        //三方交易单号搜索
        that.request_form = {
          third_id:that.pick_value,
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 7) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:that.pick_value,//买家昵称
          user_phone:"",//买家电话
        };
      } else if (that.pick_condition == 8) {
        //三方交易单号搜索
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:that.pick_value,//买家电话
        };
      } else {
        that.request_form = {
          third_id:"",
          page: 1,
          page_size: this.pageSize,
          status:this.order_status_value, //订单状态 1待付款 2代发货 3待收货 4交易完成 5已取消 6已收货
          order_no: "", //订单编号
          order_time_type: that.time_type, //1下单时间 2支付时间
          start_time: time1,
          end_time: time2,
          goods_name: "", //商品名称
          address_user: "", //收货人姓名
          address_tel: "", //收货人电话
          payment_method: that.payment_status_value, //支付方式 weixin/alipay/balance (微信/支付宝/余额)
          store: "", //运营商名称
          activity_type:that.comm_status_value,
          user_nickname:"",//买家昵称
          user_phone:"",//买家电话
        };
      }
      // 
      that.request_form.top_status = this.top_status
      that.request_form.status = this.top_status
      console.log(that.request_form);
      that.order_s_list = []
      order_list(that.request_form)
        .then((res) => {
          
          console.log(res);
          if (res.data.err_code == 0) {
            if(res.data.err_msg.stay_pay_num > 99){
              res.data.err_msg.stay_pay_num = "99+"
            }
            if(res.data.err_msg.stay_deliver_num > 99){
              res.data.err_msg.stay_deliver_num = "99+"
            }
            if(res.data.err_msg.stay_collect_num > 99){
              res.data.err_msg.stay_collect_num = "99+"
            }
            if(res.data.err_msg.stay_complete_num > 99){
              res.data.err_msg.stay_complete_num = "99+"
            }
            this.mark.one = res.data.err_msg.stay_pay_num; //待付款
            this.mark.two = res.data.err_msg.stay_deliver_num;//待发货
            this.mark.three = res.data.err_msg.stay_collect_num;//待收货
            this.mark.four = res.data.err_msg.stay_complete_num;//待完成
            // 
            
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              element.product_list.push(element.product_list[0])
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
              );
              element.add_time = that.commonJs.timestampToTime(
                element.add_time
              );
              if (element.payment_method == "weixin") {
                element.pay_way_p = "微信";
              } else if (element.payment_method == "alipay") {
                element.pay_way_p = "支付宝";
              } else if (element.payment_method == "balance") {
                element.pay_way_p = "余额";
              } else if (element.payment_method == "score") {
                element.pay_way_p = "橘宝";
              } else if (element.payment_method == "blend") {
                element.pay_way_p = "混合";
              } else {
                element.pay_way_p = "暂无";
              }

              if (element.status == 1) {
                element.pay_status_p = "待支付";
              } else if (element.status == 2) {
                element.pay_status_p = "待发货 ";
              } else if (element.status == 3) {
                element.pay_status_p = "待收货";
              } else if (element.status == 4) {
                element.pay_status_p = "已完成";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "交易关闭";
              } else if (element.status == 0) {
                element.pay_status_p = "临时订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if (element.product_list.length > 2) {
                this.spanBrr.push(0);
                for (let i = 1; i < element.product_list.length; i++) {
                  if(i == 1){
                    this.spanBrr.push(element.product_list.length-1);
                  }else{
                    this.spanBrr.push(0);
                  }
                }
              }else{
                this.spanBrr.push(1);
                this.spanBrr.push(1);
              }
              this.spanArr.push(element.product_list.length);
              for (let i = 1; i < element.product_list.length; i++) {
                this.spanArr.push(0);
              }
              
              element.product_list.forEach((ele, ind) => {
                element.index = index + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product_list 每个属性键值 + "1" 这样可以避免给element.product_list属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            that.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo.page = parseInt(res.data.err_msg.page);
            that.queryInfo.total = parseInt(res.data.err_msg.total_number);
            that.pageSize = res.data.err_msg.page_size;
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //取消订单
    cancel_order(index, row) {
      this.form_cancel.bh = row.order_no;
      this.form_cancel.reason = "";
      this.order_row = row;
      this.cancel_order_show = true;
    },

    //确认取消订单
    order_cancel() {
      let that = this;
      let reason = "";
      if (this.form_cancel.reason == "") {
        that.$message({
          message: "请请选择取消原因",
          type: "warning",
        });
        return;
      }
      if (this.form_cancel.reason == 1) {
        reason = "商品缺货";
      } else if (this.form_cancel.reason == 2) {
        reason = "买家原因";
      } else if (this.form_cancel.reason == 3) {
        reason = "无效订单";
      } else if (this.form_cancel.reason == 4) {
        reason = "其他原因";
      }
      cancel_order({
        order_id: that.order_row.order_id,
        reason: reason,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.cancel_order_show = false;
            that.$message({
              message: "取消成功",
              type: "success",
            });
            that.get_order_list();
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //查看物流
    see_express(index, row) {
      let that = this;
      if (row.express.length == 0) {
        that.$message({
          showClose: true,
          message: "暂无物流信息",
          type: "error",
        });
      } else {
        that.express_show = true;
        that.wlList = row.express;
      }
    },

    pick_see_(item) {
      let that = this;
      get_express({
        express_code: item.express_code,
        express_no: item.express_no,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if (that.wlList_p.length == 0) {
              that.wlList_po = res.data.err_msg.Traces;
              if(res.data.err_msg.Traces.length == 0){
                that.$message({
                  showClose: true,
                  message: res.data.err_msg.Reason,
                  type: "error",
                });
              }
            }
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    inputf(val){
      this.inputFirst = val
    },
    inputs(val){
      let that = this;
      if(this.inputFirst == val.bak){
        return
      }
      console.log(this.inputFirst)
      console.log(val)
      order_bak({
        order_id: val.order_id,
        bak: val.bak,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.$message({
              message: "修改备注成功",
              // 
              type: "success",
            });
            this.get_consumer_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
            // that.get_order_list()
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //订单详情
    see_details(index, row) {
      localStorage.setItem("infoIds",row.order_id)
      this.$router.push({path:"/order_/orderInfo",query:{product_id:row.order_id,status:row.status}})
    },

    //查看物流
    see_wl(item,index) {
      let that = this;
      this.whIndex = index
      get_express({
        express_code: item.express_code,
        express_no: item.express_no,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.wlList_p = res.data.err_msg.Traces;
            if (that.wlList_p.length == 0) {
              that.$message({
                showClose: true,
                message: res.data.err_msg.Reason,
                type: "error",
              });
            }
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add_form(){
      
      if (this.img) {
        this.$confirm("商品就一种且可发数量是一,确认分包, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            order_product({
              order_id: this.product_id,
            })
              .then((res) => {
                console.log(res);
                //订单发货详情
                if (res.data.err_code == 0) {
                  res.data.err_msg.info.product_list.forEach((ele) => {
                    ele.bei = ''
                    ele.number = ''
                  });
                  let reuseObj = {
                    express: "",
                    ydh: "",
                  }
                  reuseObj.pigcms_list = res.data.err_msg.info.product_list;
                  this.form_delivery.push(reuseObj);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {});
      } else {
        order_product({
          order_id: this.product_id,
        })
          .then((res) => {
            console.log(res);
            //订单发货详情
            if (res.data.err_code == 0) {
              res.data.err_msg.info.product_list.forEach((ele) => {
                ele.bei = ''
                ele.number = ''
              });
              let reuseObj = {
                express: "",
                ydh: "",
              }
              reuseObj.pigcms_list = res.data.err_msg.info.product_list;
              this.form_delivery.push(reuseObj);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
    },
    delete_form(index){
      this.form_delivery.splice(index,1)
    },
    //联系用户
    linkUser(item) {
      this.$router.push({ path: "/customer/workbench", query: { uid: item.uid } });
    },
    //查看售后
    lookRefund(item){
      this.$router.push({path:'/order_/refund',query:{order_no:item.order_no}})
    },

    lookRefund1(item){
      this.$router.push({path:'/order_/refund',query:{return_no:item}})
    },
    //修改修改人信息
    set_address(){
      let that = this
      let params = {}
      let province = ''
      let city = ''
      let area = ''
      
      var reg_tel = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ )
      if(that.form_adderess.name == '') {
        that.$message({
          message: '请输入收货人姓名',
          type: 'warning'
        });
        return;
      }
      if(that.form_adderess.tel == '') {
        that.$message({
          message: '请输入手机号',
          type: 'warning'
        });
        return;
      }
      if(that.form_adderess.provinceValue == '') {
        that.$message({
          message: '请选择省份',
          type: 'warning'
        });
        return;
      }
      if(that.form_adderess.cityValue == '') {
        that.$message({
          message: '请选择市',
          type: 'warning'
        });
        return;
      }
      if(that.form_adderess.areaValue == '') {
        that.$message({
          message: '请选择区',
          type: 'warning'
        });
        return;
      }
      if(that.form_adderess.mark == '') {
        that.$message({
          message: '请填写详细地址',
          type: 'warning'
        });
        return;
      }
      if(!reg_tel.test(that.form_adderess.tel)) {
        that.$message({
          message: '请填写正确的手机号',
          type: 'warning'
        });
        return;
      }
      that.provinceList.forEach(ele => {
        if(that.form_adderess.provinceValue == ele.province_id) {
          province = ele.name
        }
      })
      that.cityList.forEach(ele => {
        if(that.form_adderess.cityValue == ele.city_id) {
          city = ele.name
        }
      })
      that.areaList.forEach(ele => {
        if(that.form_adderess.areaValue == ele.area_id) {
          area = ele.name
        }
      })
      params = {
        // id : that.refund_row.return_id,
        // address_user : that.form_adderess.name,
        // address_tel : that.form_adderess.tel,
        // address : that.form_adderess.mark,
        // province_txt :province ,
        // city_txt : city,
        // county_txt :area,
        // province_id : that.form_adderess.provinceValue,
        // city_id : that.form_adderess.cityValue,
        // area_id : that.form_adderess.areaValue,
        // order_id
        order_id : that.delivery_detalis_p.order_id,
        address_user : that.form_adderess.name,
        address_tel : that.form_adderess.tel,
        address : that.form_adderess.mark,
        province :that.form_adderess.provinceValue,
        city : that.form_adderess.cityValue,
        area :that.form_adderess.areaValue,

        // id : that.delivery_detalis_p.product_id,
        // address_user : that.form_adderess.name,
        // address_tel : that.form_adderess.tel,
        // address : that.form_adderess.mark,
        // province_txt :province,
        // city_txt : city,
        // county_txt :area,
        // province_id : that.form_adderess.provinceValue,
        // city_id : that.form_adderess.cityValue,
        // area_id : that.form_adderess.areaValue,
      }
      console.log(params)
      set_addre(
        params
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.$message({
              message: '地址修改成功',
              type: 'success'
            });
            that.form_adderess_show = false
            that.delivery_from = {
              address_user : that.form_adderess.name,
              address_tel : that.form_adderess.tel,
              address : that.form_adderess.mark,
            },
            that.delivery_from.address = province + '、' + city + 
            '、' + area + '、' + that.form_adderess.mark
            // 
            that.form_adderess = {
              name : '',
              tel : '',
              provinceValue : '',
              cityValue : '',
              areaValue : '',
              mark : ''
            }
            
            that.get_order_list()
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
    go_Xdelivery(index,row){
      let that = this
      this.$confirm('虚拟发货成功，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          invented_deliver({
            order_id: row.order_id,
          })
            .then((res) => {
              if (res.data.err_code == 0) {
                that.$message({
                  message: "虚拟发货成功",
                  type: "success",
                });
                this.get_consumer_list_page(
                  this.queryInfo.page,
                  this.queryInfo.pageSize
                );                        
              } else {
                that.$message({
                  showClose: true,
                  message: res.data.err_msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {});
        }).catch(() => {
          
        });
      
    },
    //发货
    go_delivery(index, row) {
      let that = this;
      this.form_delivery = [
        {
          pigcms_list:[
            {
              sku_data: "", //商品规格
              pro_num: "", //订单商品数量
              product_name: "", //商品名称
              delivered_num: 0, //可发货数量
              number:"",
              bei:"",
            }
          ],
          express: "",
          ydh: "",
        }
      ],
      this.product_id = row.order_id
      order_product({
        order_id: row.order_id,
      })
        .then((res) => {
          if (res.data.err_code == 0) {
            that.delivery_blean = true;
            this.order_info = res.data.err_msg.info
            that.goodsList.bak = res.data.err_msg.info.bak;
            that.goodsList.comment = res.data.err_msg.info.comment;
            that.goodsList.package = res.data.err_msg.info.package;
            
            if(res.data.err_msg.info.express_list.length>0){
              that.express_list_p = res.data.err_msg.info.express_list;
            }
            that.delivery_detalis_p = res.data.err_msg.info.product_list;
            // res.data.err_msg.info.product_list.forEach((ele) => {
            //   ele.bei = ''
            //   ele.number = ''
            // });
            if(res.data.err_msg.info.product_list.length == 1 && res.data.err_msg.info.product_list[0].delivered_num == 1){
              this.img = true
            }
            console.log('测试2')
            
            that.form_delivery[0].pigcms_list = res.data.err_msg.info.product_list;
            console.log(that.form_delivery)
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((err) => {});
    },
    //点击物流分包
    add_form() {
      if (this.img) {
        this.$confirm("商品就一种且可发数量是一,确认分包, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            order_product({
              order_id: this.product_id,
            })
              .then((res) => {
                console.log(res);
                //订单发货详情
                if (res.data.err_code == 0) {
                  res.data.err_msg.info.product_list.forEach((ele) => {
                    ele.bei = ''
                    ele.number = ''
                  });
                  let reuseObj = {
                    express: "",
                    ydh: "",
                  }
                  reuseObj.pigcms_list = res.data.err_msg.info.product_list;
                  this.form_delivery.push(reuseObj);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {});
      } else {
        order_product({
          order_id: this.product_id,
        })
          .then((res) => {
            console.log(res);
            //订单发货详情
            if (res.data.err_code == 0) {
              res.data.err_msg.info.product_list.forEach((ele) => {
                ele.bei = ''
                ele.number = ''
              });
              let reuseObj = {
                express: "",
                ydh: "",
              }
              reuseObj.pigcms_list = res.data.err_msg.info.product_list;
              this.form_delivery.push(reuseObj);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //确认发货
    sure_delivery() {
      let that = this;
      let params = {};
      let province = "";
      let city = "";
      let area = "";
      let express_company = "";
      let express_code = "";
      let result = [];
      let result_p = [];
      let leg = false;
      let leg1 = false;
      let leg2 = false
      let names = ""
      let blean = false
      console.log(this.form_delivery)
      this.form_delivery.forEach((comm) => {
        comm.pigcms_list.forEach((ite) => {
          console.log(ite)
          if(ite.number){
            ite.number = parseInt(ite.number)
            ite.delivered_num = parseInt(ite.delivered_num)
            if(ite.number === "" || ite.number == 0){
              blean = true
              console.log(blean)
              leg = true;
            }
            if(ite.number < 0){
              leg1 = true;
            }
            console.log(ite.number)
            console.log(ite.delivered_num)
            if(ite.number > ite.delivered_num){
              leg2 = true;
              names = ite.product_name
            }
          }else{
            blean = true
            leg = true;
          }
        })
        if (comm.express == "" || comm.ydh == "") {
          if(this.radio == 1){
            leg = true;
          }
          
          
        } 
      });
      console.log(blean)
      let arr1 = this.form_delivery
      let form_delivery1 = arr1
      if(blean){
        let blea = false
        form_delivery1.forEach((comm) => {
          comm.pigcms_list.forEach((ite) => {
            if(ite.number){
              blea = true
            }
          })
        })
        if(blea){
          if(leg){
            leg = false
            this.form_delivery.forEach((comm) => {
              if (comm.express == "" || comm.ydh == "") {
                if(this.radio == 1){
                  leg = true;
                }
              } 
            });
            if(leg){

            }else{
              form_delivery1.forEach((comm) => {
                let arr = []
                comm.pigcms_list.forEach((ite,inde) => {
                  if(ite.number){
                    
                  }else{
                    arr.push(inde)
                  }
                })
                if(arr.length > 0){
                  arr = arr.reverse()
                  arr.forEach(item => {
                    comm.pigcms_list.splice(item,1)
                    
                  })
                }
              })
            }
            
            
          }
        }
      }
      console.log(this.form_delivery)
      if (leg) {
        that.$message({
          message: "请完整填写表格内容",
          type: "warning",
        });
        return;
      }
      if (leg1) {
        that.$message({
          message: "发货数量不能为负数",
          type: "warning",
        });
        return;
      }
      if (leg2) {
        that.$message({
          message: "商品:" +names+"发货数量大于可发货数量",
          type: "warning",
        });
        return;
      }
      let param_data = [];
      let arr = [];
      let num = 0;
      console.log(this.form_delivery);
      // express_list_p
      form_delivery1.forEach((comm) => {
        let obj = {};
        this.express_list_p.forEach((item, ind) => {
          if(comm.express.length == 1){
            comm.express = this.express_list_p[(comm.express[0]-1)].name
          }
          if (item.name == comm.express) {
            
            obj.express_code = this.express_list_p[ind].code;
            return;
          }
        });
        obj.express_company = comm.express;
        obj.express_no = comm.ydh;
        obj.remarks = comm.pigcms_list[0].bei;
        let objects = [];
        comm.pigcms_list.forEach((item) => {
          let objec = {};
              objec.order_product_id = item.pigcms_id;
              objec.product_id = item.product_id;
              objec.num = item.number;
          
          objects.push(objec);
        });
        obj.delivered = objects;
        arr.push(obj);
      });
      arr = JSON.stringify(arr);
      params = {
        order_id: this.product_id,
        param_data: arr,
        delivery_mode:this.radio
      };
      console.log(params)
      deliver(params)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.delivery_show = false;
            that.$message({
              message: "发货成功",
              type: "success",
            });
            this.delivery_blean = false
            this.form_delivery = [
              {
                pigcms_list:[
                  {
                    sku_data: "", //商品规格
                    pro_num: "", //订单商品数量
                    product_name: "", //商品名称
                    delivered_num: 0, //可发货数量
                    number:"",
                    bei:"",
                  }
                ],
                express: "",
                ydh: "",
              }
            ]
            this.get_consumer_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    seeBei(val,index){
      if(this.bei_blean){
        this.bei_blean = false
      }else{
        this.bei_blean = true
      }
      this.bei_index = index
      order_bak_list({
        order_id: val.order_id,
        page: 1,
        page_size: 100,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((element,inde) => {
              element.create_time = this.commonJs.timestampToTime(
                element.create_time
              );
            })
            this.addressList = res.data.err_msg.list
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-table td,
.el-table th.is-leaf {
  border-top: 1px solid #717b90;
  border-bottom: 0;
}

/deep/ .el-table__body {
  border-bottom: 1px solid #ebeef5;
}

.seach {
  display: flex;
  /deep/ .el-input {
    width: 150px;
    margin: 0 10px 0 10px;
  }
}

.remarks_box {
  /deep/ .el-dialog {
    width: 500px !important;
    height: 320px;
    overflow-y: auto;
    /deep/ .el-input {
      overflow-y: auto; /*溢出隐藏*/
      // text-overflow: ellipsis; /*以省略号...显示*/
      // white-space: nowrap;  /*强制不换行*/
    }
    
  }
}

.cancel_box {
  /deep/ .el-dialog {
    width: 650px !important;
    height: 320px;
  }
}

.express_box {
  /deep/ .el-dialog {
    width: 1300px !important;
    height: 700px;
    overflow-y: auto;
  }
}

.details_box {
  /deep/ .el-dialog {
    width: 1300px !important;
    height: 700px;
    overflow-y: auto;
  }
}

.delivery_box {
  /deep/ .el-dialog {
    width: 1300px !important;
    height: 700px;
  }
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}


.seach_copy {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width: 150px;
    margin: 0 20px 0 10px;
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
  padding: 0 15px 0;
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
}

/* 分页 */
.goodsindex-page-box {
  width: 100%;
  height: auto;
  padding-top:15px;
  padding-bottom: 15px;
  background: #ccc;
  display: flex;
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
/deep/ .goodsindex-list.goodsindex1{
  padding-top: 10px;
  position: relative;
  margin-top: 0!important;
  .back{
    position: absolute;
    bottom: -98px;
    left: 0;
    width: 100%;
    height: 100px;
    background: #ccc;
    z-index: 0;
    display: none;
  }
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

.info_class {
  ul {
    li {
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
      padding-bottom: 20px;
      h5 {
        font-size: 22px;
      }
      p {
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
  }
}
/deep/ .el-tabs.el-tabs--top {
  position: fixed;
  z-index: 100;
  width: 87%;
  background: #fff;
}
/deep/ .seach {
  padding-top: 60px;
}
.info_class {
  ul {
    li {
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
      padding-bottom: 20px;
      h5 {
        font-size: 22px;
      }
      p {
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
  }
}
.uls {
  li {
    border-top: 1px solid #ebeef5;
    padding-top: 10px;
    padding-bottom: 10px;
    padding: 10px 0;
  }
  li:nth-of-type(1) {
    border-top: none;
  }
}
/deep/ .el-radio__input.is-checked+.el-radio__label{
  color: #ee8f29;
}
/deep/ .el-radio__input.is-checked .el-radio__inner{
  border-color:#ee8f29;
  background: #ee8f29;
}
/deep/.el-radio__inner::after{
  width: 8px;
  height: 8px;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
  border-color:#ee8f29!important;
  background: #ee8f29!important;
}
/deep/ .el-step__description.is-wait{
  color: #000;
}
/deep/ .el-step__title.is-wait{
  color: #000;
}
/deep/ .el-step__head.is-wait{
      color: #000;
    border-color: #000;
}
/deep/ .el-step__description.is-wait{
  color: #000;
}
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  border-color:#ee8f29!important;
  background: #ee8f29!important;
}
/deep/ .el-radio__inner{
  width: 20px;
  height: 20px;
}
/deep/ .el-radio__label{
  font-size: 15px;
}
.ship{
  
  min-height: 550px;
  background: #eeebeb;
  // padding: 20px 50px;
  .item3{
    height: 480px;
    overflow-y: auto;
    padding: 20px 35px 20px 50px;
  }
  .item.item2{
    padding-bottom: 20px;
  }
  .item{
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    border: 1px solid #bbb;
    padding: 0 20px;
    margin-top: 20px;
    .firm{
      .tex{
        font-size: 19px;
        font-weight: bold;
      }
    }
    .father{
      box-sizing: border-box;
      width: 75%;
      border-right:1px solid #bbb;
      padding-right: 30px;
    }
    .son{
      box-sizing: border-box;
      width: 25%;
      padding: 20px 0 20px 20px;
      span{
        color: #ee8f29;
        font-size: 18px;
        display: inline-block;
        line-height: 40px;
        padding-left: 10px;
        cursor: pointer;
      }
      img{
        cursor: pointer;
        display: inline-block;
      }
      span.active,img.active{
        cursor: no-drop;
      }

      p{
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .cont{
      padding: 20px 0;
      .text{
        line-height: 25px;
        font-size: 16px;
      }
      .text.pr{
        padding-right: 30px;
      }
    }
    .tit{
      padding: 10px 0;
      width: 100%;
      span{
        display: block;
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }
}

/deep/ .el-input1{
  input{
    text-align: center;
    border: none!important;
  }
}
.body {
  min-height: 80vh;
  padding: 50px;
  background: #f5f5f5;
}
/deep/.el-dialog1 {
  .el-dialog {
    width: 1300px;
    max-height: 740px;
    background: #eeebeb;
  }
}
/deep/ .el-step__icon {
  width: 40px;
  height: 40px;
}
/deep/ .el-step__icon-inner.is-status {
  font-size: 25px;
  color: #fff;
}
/deep/ .el-step__icon-inner {
  font-size: 25px;
  font-weight: 200;
}
/deep/ .el-step__head.is-success .el-step__icon {
  background: #67c23a;
}
/deep/.el-step__title.is-success {
  color: #000;
}
/deep/ .el-step__description.is-success {
  color: #000;
}
/deep/ .el-step.is-horizontal .el-step__line {
  top: 19px;
}
/deep/ .el-textarea textarea {
  height: 100%;
}
.item {
  .head {
    .qizhi {
      position: relative;
      img {
        height: 32px;
      }
      span {
        position: absolute;
        top: 4px;
        left: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #1a4ecc;
      }
      display: inline-block;
    }
    .title {
      display: inline-block;
      height: 32px;
      background: #1a4ecc;
      color: #fff;
      font-size: 16px;
      padding: 4px 50px 0 15px;
      margin-left: 10px;
      position: relative;
      .san {
        position: absolute;
        right: -16px;
        bottom: 0;
        transform: rotate(-45deg);
        width: 0;
        height: 0;
        border-top: 32px solid #f5f5f5;
        border-right: 32px solid transparent;
      }
    }
  }
}
.info {
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  background: #ee8f29;
}
/deep/ .el-dialog__body {
  padding: 0 0;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog__headerbtn {
  font-size: 20px;
  top: 10px;
  right: 10px;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.item.item1 {
  margin-top: 50px;
}
.table {
  margin-top: 20px;
  border: 1px solid #bbb;
  > div {
    border-bottom: 1px solid #bbb;
  }
  > div:last-child {
    border-bottom: none;
  }
  .thead {
    padding: 10px 14px;
    background: #eeebeb;
  }
  .tbody {
    background: #fff;
    .div {
      float: left;
      height: 100%;
      span {
        display: block;
      }
      .title {
        font-size: 30px;
        color: #39aa3a;
        margin-bottom: 15px;
      }
    }
  }
}
/deep/ .el-table .has-gutter th,
.el-table .has-gutter tr {
  background: #eeebeb !important;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color:#fff!important;
}
/deep/ .el-table--enable-row-hover .el-table__body:hover tr.active>td{
  background-color:#dce1e8!important;
  // #dce1e8
}
/deep/ .el-table__body-wrapper {
  overflow-y: auto !important;
  padding-right: 1px;
}
/deep/ .el-table--border th .cell {
  color: #000;
  font-weight: bold;
}
/deep/ .el-table__body, .el-table__footer, .el-table__header{
  border-collapse: collapse;
}
.boxSpan{
  // position: relative;
  width: auto;
  padding: 0 9px;
  height: 20px;
  text-align:center;
  line-height: 20px;
  border-radius: 20px;
  background: red;
  color: #fff;
}
/deep/ .el-tabs__item{
  padding: 0 30px;
}

.frame{
  height: 239px;
  padding: 20px;
  overflow-y: auto;
    // 
  .items{
    // margin-bottom: 20px;
    font-size: 14px;
    div{
      line-height: 20px;
      margin-bottom: 10px;
      text-align: left;
      .time{
        color: #a9a9a9;
      }
    }
  }
  background: #fff;
}
.frame {
  overflow-y: auto;
}

.frame::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 15px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.frame::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #89989f;
}
.frame::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}
/deep/ .el-table .cell{
  overflow: visible;
}
/deep/ .remarks_box.lishi .el-dialog{
  width: 500px!important;
  height: 320px;
    overflow-y: auto;
}
/deep/ .el-textarea__inner{
  min-height:23px!important;
  padding: 0 15px!important;
}
</style>