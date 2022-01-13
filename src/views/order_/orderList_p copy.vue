<template>
  <div class="goodsindex goodsindex1">
    <!-- 待付款订单取消之后为交易关闭 确认收货之后为已收货 点击交易完成之后或系统默认为交易完成-->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="margin-bottom: 20px"
    >
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="待付款" name="second"></el-tab-pane>
      <el-tab-pane label="待发货" name="third"></el-tab-pane>
      <el-tab-pane label="待收货" name="fourth"></el-tab-pane>
      <el-tab-pane label="待完成" name="six"></el-tab-pane>
      <el-tab-pane label="已完成" name="five"></el-tab-pane>
      <el-tab-pane label="已取消" name="fiveth"></el-tab-pane>
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
        <el-select v-model="payment_status_value" placeholder="请选择支付方式">
        <el-option
          v-for="item in payment_method_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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

    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24">
        <!-- stripe -->
        <!--  -->
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="order_s_list"
          border
          stripe
          :height="height"
          style="width: 100%"
          :span-method="cellMerge"
        >
          <el-table-column label="序号" prop="index" width="60">
          </el-table-column>
          
          <el-table-column label="订单信息" width="350">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left;font-weight:bold;color: #6a6ae0;">
                  订单编号：{{ scope.row.order_no }}
                </li>
                <li style="text-align: left;font-weight:bold;color: #6a6ae0;">
                  
                  三方交易单号：{{ scope.row.third_id }}
                </li>
                <li style="text-align: left; font-weight:bold;color: #f36e2f;" >
                  <span style="width:40%;display:inline-block;font-weight:bold;color: #f36e2f;">
                    支付方式：{{scope.row.pay_way_p}}
                  </span>
                  <span style="width:40%;display:inline-block;" v-if="scope.row.live_id == 0">
                    订单类型：{{scope.row.activity_type == 0 ? '普通订单' : '营销订单'}}
                  </span>
                  <span style="width:40%;display:inline-block;font-weight:bold;color: #f36e2f;" v-else>
                    订单类型：直播间订单
                  </span>
                  <span style="width:60%;display:inline-block">支付时间：{{ scope.row.paid_time }}</span>
                </li>
                <li style="text-align: left;" class="shen" v-if="scope.row.live_id != 0">
                  直播间名称: {{scope.row.live_title}}
                </li>
                <li style="text-align: left"></li>
                <li style="text-align: left">
                  
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="商品主图" width="120">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.image"
                fit="cover"
                :preview-src-list="[scope.row.image]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
                {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="商品规格">
            <template slot-scope="scope">
                {{ scope.row.sku_data }}
            </template>
          </el-table-column>
          <el-table-column label="商品单价/数量" width="220">
            <template slot-scope="scope">
              <div>原价: {{ scope.row.pro_cost_price }}元</div>
              <div>数量: <span style="color: red">{{scope.row.pro_num}}件</span></div>
              <!-- <div>ID: {{scope.row.product_id}}</div> -->
            </template>
          </el-table-column>
          <el-table-column label="订单金总额">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left">
                  成本价：{{ scope.row.cost_price }}
                </li>
                <li style="text-align: left; color: red">
                  商品数量：{{ scope.row.pro_num }}件
                </li>
                
              </ul>
            </template>
          </el-table-column>
          <!-- <el-table-column label="用户头像" width="100">
            <template slot-scope="scope">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.avatar"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column> -->
          <el-table-column label="收货人信息">
            <template slot-scope="scope">
              
              <ul>
                 <li style="text-align: left">
                  昵称：{{ scope.row.nickname }}
                </li>
                <li style="text-align: left">
                  收货人：{{ scope.row.address_user }}
                </li>
                <li style="text-align: left">
                  电话：{{ scope.row.phone }}
                </li>
                <li style="text-align: left">
                  买家ID：{{ scope.row.uid }}
                </li>
                <li style="text-align: left">
                  买家电话：{{ scope.row.address_tel }}
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
              <el-tag type="danger" v-if="scope.row.status == 1">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status == 2">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status == 3">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == 4">{{ scope.row.pay_status_p }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.status == 5">{{ scope.row.pay_status_p }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="see_details(scope.$index, scope.row)"
                >订单详情</el-button
              >
              <el-button
                size="mini"
                type="primary" 
                plain
                style="margin-top:10px;margin-left:0;"
                @click="lookRefund(scope.row)"
                v-if="scope.row.refund_status != '0'"
                >查看售后</el-button
              >
              <el-button
                size="mini"
                type="primary"
                plain
                style="margin-top: 10px"
                @click="remarks_add(scope.$index, scope.row)"
                v-if="scope.row.status == 2"
                >添加备注</el-button
              >
              <el-button
                size="mini"
                type="primary"
                style="margin-top:10px"
                v-show="scope.row.status == '2'"
                @click="go_delivery(scope.$index, scope.row)"
                >发货</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <!-- 取消订单弹窗 -->
    <el-dialog
      title="取消订单"
      :visible.sync="cancel_order_show"
      class="cancel_box"
    >
      <el-form :model="form_cancel">
        <el-form-item label="订单编号：" :label-width="remarks_formLabelWidth">
          <el-input v-model="form_cancel.bh" disabled></el-input>
        </el-form-item>
        <el-form-item label="取消原因：" :label-width="remarks_formLabelWidth">
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
      title="添加备注"
      :visible.sync="add_remarks_show"
      class="remarks_box"
    >
      <el-form :model="form_remarks">
        <el-form-item label="备注内容：" :label-width="remarks_formLabelWidth">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="add_remarks_show = false">取消</el-button>
        <el-button type="primary" @click="add_remarks">确认</el-button>
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
                
                 
                    ID：{{ scope.row.product_id }}
                
              </template>
            </el-table-column> -->
            <el-table-column label="商品名称" width="200">
              <template slot-scope="scope">
               
                
                    名称：{{ scope.row.name }}
                  
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
          label="物流公司："
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
        <el-form-item label="运单号：" style="position:relative" :label-width="remarks_formLabelWidth">
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
      title="订单发货"
      :visible.sync="delivery_show"
      class="delivery_box"
    >
      <p>
        订单编号 : {{ delivery_from.bh }} <span style="padding-left:100px">下单时间 : {{delivery_from.add_time}}</span>
      </p>
      <el-row :gutter="20" class="goodsindex-list tabs">
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="delivery_detalis_p.product_list"
            border
            style="width: 100%"
          >
            <el-table-column label="成本价/数量">
              <template slot-scope="scope">
                
                    <!-- <div style="text-align:center;">ID：{{ scope.row.product_id }}</div> -->
                    <div style="text-align:center;margin-top:5px;color:red;">{{ scope.row.pro_cost_price }}元</div>
                    <div style="text-align:center;margin-top:5px">{{ scope.row.pro_num }}件</div>
              </template>
            </el-table-column>
            <el-table-column label="商品规格">
              <template slot-scope="scope">
                <div style="text-align:center;line-height:15px;margin-top:5px">{{ scope.row.sku_data != "" ? scope.row.sku_data : "无" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称">
              <template slot-scope="scope">
                    名称：{{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="商品主图" width="120">
              <template slot-scope="scope">
                
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.image"
                      fit="cover"
                    ></el-image>
                  
              </template>
            </el-table-column>
            <el-table-column label="订单详情">
              <template>
                <ul>
                  <li style="text-align: left; color: red">
                    订单成本价：{{ delivery_detalis_p.cost_price }}
                  </li>
                </ul>
              </template>
            </el-table-column>
            
          </el-table>
            
        </el-col>
      </el-row>
      
      <div class="info_class">
        <ul>
          <li>
            <h5>买家备注</h5>
            <p>备注 : {{ delivery_from.comment == ''?'无':delivery_from.comment }}</p>
          </li>
          <li>
            <h5>卖家备注</h5>
            <p>备注 : {{ delivery_from.bak == ''?'无':delivery_from.bak }}</p>
          </li>
          <li>
            <h5>收件人信息</h5>
            <p>收货人 : {{ delivery_from.address_user }}</p>
            <p>收货人手机号 : {{ delivery_from.address_tel }}</p>
            <p>地址 : {{ delivery_from.address }}0</p>
            
            
            
            <el-form :model="form_adderess" v-show="form_adderess_show">
              <el-form-item
                label="收货人姓名："
                :label-width="remarks_formLabelWidth"
              >
                <el-input
                  v-model="form_adderess.name"
                  placeholder="请输入收货人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="手机号："
                :label-width="remarks_formLabelWidth"
              >
                <el-input
                  v-model="form_adderess.tel"
                  placeholder="请输入手机号"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="所在地区："
                :label-width="remarks_formLabelWidth"
              >
                <el-select
                  v-model="form_adderess.provinceValue"
                  placeholder="请选择省份"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.province_id"
                    :label="item.name"
                    :value="item.province_id"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="form_adderess.cityValue"
                  placeholder="请选择市"
                  v-show="city_ifShow"
                  style="margin-left: 10px"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.city_id"
                    :label="item.name"
                    :value="item.city_id"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="form_adderess.areaValue"
                  placeholder="请选择区"
                  v-show="area_ifShow"
                  style="margin-left: 10px"
                >
                  <el-option
                    v-for="item in areaList"
                    :key="item.area_id"
                    :label="item.name"
                    :value="item.area_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="详细地址："
                :label-width="remarks_formLabelWidth"
              >
                <el-input
                  style="width: 300px"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="form_adderess.mark"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <p>
              <el-button
                size="mini"
                type="success"
                v-show="form_adderess_show == false"
                @click="form_adderess_show = true"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="success"
                v-show="form_adderess_show == true"
                @click="form_adderess_show = false"
                >取消</el-button
              >
              <el-button
                size="mini"
                type="primary"
                v-show="form_adderess_show == true"
                @click="set_address"
              >修改</el-button>
            </p>
          </li>
          
        </ul>
        
        <div>
        <!-- v-show="active_type != 1 && active_type != 0" -->
        <!-- && active_type != 2  -->
          <ul>
            <li
              v-for="(item, index) in delivery_detalis_p.package"
              :key="index"
              style="margin-bottom: 10px;border-bottom:none;"
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
        <div class="clearfix" style="margin:10px 0">
          <h5 style="font-size:22px;float:left;margin:0">选择物流服务</h5>
          <el-button type="primary" style="float:right" @click="add_form">物流分包</el-button>          
        </div>
        
          
        <el-form>
          <template v-for="(item,index) in form_delivery" style="margin-top:20px"> 
            <div class="clearfix" style="margin:10px 0" :key="index+'ssss'" >
              <h5 style="font-size:20px;float:left;margin:0">{{index+1}}. 物流服务</h5>
              <el-button type="danger" style="float:right" v-show="form_delivery.length>1" @click="delete_form(index)">删除</el-button>          
            </div>
            <el-form-item
              :key="index" 
              label="物流公司："
              :label-width="remarks_formLabelWidth"
              style="position:relative"
            >
              <div class="wo"></div>
              <el-select
                v-model="item.express"
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
            <el-form-item label="运单号：" :key="index+'s'" style="position:relative" :label-width="remarks_formLabelWidth">
              <div class="wo"></div>
              <el-input
                v-model="item.ydh"
                placeholder="请输入运单号"
              ></el-input>
            </el-form-item>
            <el-form-item
              :key="index+'ss'" 
              label="商品名称："
              style="position:relative"
              :label-width="remarks_formLabelWidth"
            >
            <div class="wo"></div>
              <el-checkbox-group v-model="item.nameList">
                <div v-for="(itek,indexk) in item.comm_list" :key="indexk">
                  <el-checkbox :label="itek.name"></el-checkbox>
                  <el-input
                    style="margin-left:20px;"
                    placeholder="请输入发货数量"
                    v-model="itek.num"
                    type="number"
                    @wheel.native.prevent="stopScroll($event)"
                  >
                  </el-input>
                </div>
                
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              :key="index+'sss'" 
              label="发货备注："
              :label-width="remarks_formLabelWidth"
            >
              <el-input
                style="width: 300px"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="item.mark"
              >
              </el-input>
            </el-form-item>
            </template>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delivery_show = false">取消</el-button>
        <el-button type="primary" @click="sure_delivery">确认发货</el-button>
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
import publicFile from '../../utils/publicFile'
import {
  order_list,
  order_info,
  order_product,
  deliver,
  get_province,
  get_city,
  get_area,
  logistics,
  get_express,
  express_list,
  set_addre,
  order_bak
} from "../../utils/axios";
export default {
  data() {
    return {
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
      pick_condition: "",
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
      form_delivery: [{
        comm_list:[],
        express: "",
        ydh: "",
        mark: "",
        nameList:[]
      }],
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
      top_status:""
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
    this.get_order_list(); //获取全部订单列表
    this.get_province(); //获取省份
    this.expressList()
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
    //表格合并行
    cellMerge({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      
      if (columnIndex != 2 && columnIndex != 3 && columnIndex != 4 && columnIndex != 5) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row, //行
          colspan: _col, //列
        };
      }
    },
    // 获取物流公司
    expressList() {
      let that = this;
      express_list().then((res) => {
        console.log(res)
        if (res.data.err_code == 0) {
          this.express_list_p = res.data.err_msg.list
          //express_list_p pigcms_id name
          // if (res.data.err_msg) {
          //   for (let i in res.data.err_msg) {
          //     that.express_list_p.push({
          //       province_id: i,
          //       name: res.data.err_msg[i],
          //     });
          //   }
          //   console.log(that.provinceList)
          // }
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
    //tab切换
    handleClick(tab, event) {
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
      }
      this.top_status = status
      // 0全部订单 1待支付 2待发货 3待收货 4(待评价)已完成 5已取消 7待完成 -1全部订单
      let request_form = {
        page_size: 20,
        page: 1,
        top_status: this.top_status,
      };
      that.loading = true;
      that.payment_status_value = "";
      that.time_type = "0";
      that.order_status_value = "0"
      that.time_value = "";
      that.pick_condition = "";
      that.pick_value = "";
      
      order_list(request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            that.loading = false;
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
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
                element.pay_status_p = "已完成(待评价)";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "待完成";
              } else if (element.status == -1) {
                element.pay_status_p = "全部订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if(element.product_list.length == 1){
                this.spanArr.push(1)
              }else{
                this.spanArr.push(element.product_list.length)
                for(let i = 1 ; i < element.product_list.length ; i++){
                  this.spanArr.push(0)
                }
              }
              element.product_list.forEach((ele,ind) => {
                
                element.index = index+1
                var obj = JSON.parse(JSON.stringify(element))
                for(let i in ele){
                  obj[i] = element.product_list[ind][i]
                }
                that.order_s_list.push(obj)
              })
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
      that.pick_condition = "";
      that.pick_value = "";
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
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
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
                element.pay_status_p = "已完成(待评价)";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "待完成";
              } else if (element.status == -1) {
                element.pay_status_p = "全部订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if(element.product_list.length == 1){
                this.spanArr.push(1)
              }else{
                this.spanArr.push(element.product_list.length)
                for(let i = 1 ; i < element.product_list.length ; i++){
                  this.spanArr.push(0)
                }
              }
              element.product_list.forEach((ele,ind) => {
                
                element.index = index+1
                var obj = JSON.parse(JSON.stringify(element))
                for(let i in ele){
                  obj[i] = element.product_list[ind][i]
                }
                that.order_s_list.push(obj)
              })
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
      let that = this;
      that.loading = true;
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
              
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
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
                element.pay_status_p = "已完成(待评价)";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "待完成";
              } else if (element.status == -1) {
                element.pay_status_p = "全部订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if(element.product_list.length == 1){
                this.spanArr.push(1)
              }else{
                this.spanArr.push(element.product_list.length)
                for(let i = 1 ; i < element.product_list.length ; i++){
                  this.spanArr.push(0)
                }
              }
              element.product_list.forEach((ele,ind) => {
                
                element.index = index+1
                var obj = JSON.parse(JSON.stringify(element))
                for(let i in ele){
                  obj[i] = element.product_list[ind][i]
                }
                that.order_s_list.push(obj)
              })
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
      let that = this;
      console.log(this.time_value);
      if (
        this.payment_status_value == "" &&
        this.time_type == "0" &&
        this.pick_condition == "" && this.comm_status_value == ''
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
      } else if (this.pick_condition != "" && this.pick_value == "") {
        that.$message({
          message: "请输入搜索内容",
          type: "warning",
        });
        return;
      }
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
      that.order_s_list = []
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
        this.pick_condition == "" && this.comm_status_value == ''
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
      } else if (this.pick_condition != "" && this.pick_value == "") {
        that.$message({
          message: "请输入搜索内容",
          type: "warning",
        });
        return;
      }
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
      that.order_s_list = []
      order_list(that.request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.order_s_list = []
            this.spanArr = []
            res.data.err_msg.list.forEach((element,index) => {
              element.paid_time = that.commonJs.timestampToTime(
                element.paid_time
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
                element.pay_status_p = "已完成(待评价)";
              } else if (element.status == 5) {
                element.pay_status_p = "已取消";
              } else if (element.status == 6) {
                element.pay_status_p = "待完成";
              } else if (element.status == -1) {
                element.pay_status_p = "全部订单";
              } else if (element.status == 7) {
                element.pay_status_p = "待完成";
              } else {
                element.pay_status_p = "未知";
              }
              if(element.product_list.length == 1){
                this.spanArr.push(1)
              }else{
                this.spanArr.push(element.product_list.length)
                for(let i = 1 ; i < element.product_list.length ; i++){
                  this.spanArr.push(0)
                }
              }
              element.product_list.forEach((ele,ind) => {
                
                element.index = index+1
                var obj = JSON.parse(JSON.stringify(element))
                for(let i in ele){
                  obj[i] = element.product_list[ind][i]
                }
                that.order_s_list.push(obj)
              })
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

    //订单详情
    see_details(index, row) {
      console.log(row)
      let that = this;
      that.active_type = 0;
      that.order_detalis_p = [];
      that.order_time = "";
      that.pay_time = "";
      that.wlList_p = [];
      that.infoList = {};
      that.infoList = {
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
      };
      that.order_detalis_p = row.product_list;
      that.pay_time = row;
      
      // 订单状态 0临时订单 1未支付 2未发货 3已发货 4已完成 5已取消 6已收货
      if (row.status == 1) {
        that.active_type = 1;
      } else if (row.status == 2) {
        //未发货
        that.active_type = 2;
      } else if (row.status == 3) {
        //已发货
        that.active_type = 3;
      } else if (row.status == 4) {
        //已完成
        that.active_type = 5;
      } else if (row.status == 6) {
        //已收货
        that.active_type = 4;
      } else {
        that.active_type = 0;
      }
      
      
      that.details_order_show = true;
      order_info({
        order_id: row.order_id,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            let paymentMethod = ''
            if(res.data.err_msg.info.payment_method){
              if(res.data.err_msg.info.payment_method == "weixin"){
                paymentMethod = '微信'
              }else if(res.data.err_msg.info.payment_method == "test"){
                paymentMethod = '测试单'
              }else if(res.data.err_msg.info.payment_method == "balance"){
                paymentMethod = '其他'
              }
            }
            
            let rankName = ''
            if(res.data.err_msg.info.user_info.level){
              if(res.data.err_msg.info.user_info.level == "0"){
                rankName = '普通用户'
              }else if(res.data.err_msg.info.user_info.level == "1"){
                rankName = '专员'
              }else if(res.data.err_msg.info.user_info.level == "2"){
                rankName = '经理'
              }else if(res.data.err_msg.info.user_info.level == "3"){
                rankName = '总监'
              }
            }
            
            that.infoList = {};
            res.data.err_msg.info.return.forEach(element => {
              element.dateline = that.commonJs.timestampToTime (element.dateline)
            })
            that.infoList = {
              postage: res.data.err_msg.info.postage, //邮费
              sub_total: res.data.err_msg.info.cost_price, //商品金额
              payment_method: paymentMethod, //支付方式
              address_user: res.data.err_msg.info.address_user, //收货人
              address_tel: res.data.err_msg.info.address_tel, //收货人电话
              address: "", //收货人地址
              bak: res.data.err_msg.info.bak, //卖家备注
              comment: res.data.err_msg.info.comment, //买家备注
              avatar: res.data.err_msg.info.user_info.avatar, //用户头像
              nickname: res.data.err_msg.info.user_info.nickname, //用户名称
              uid: res.data.err_msg.info.user_info.uid, //用户ID
              phone: res.data.err_msg.info.user_info.phone, //用户手机号
              rank_name: rankName, //段位名称
              name: res.data.err_msg.info.name, //运营商名称
              linkman: res.data.err_msg.info.linkman, //运营商联系人
              tel: res.data.err_msg.info.tel, //运营商联系电话
              default_address: res.data.err_msg.info.user_info.default_address, //用户默认地址
              trade_no: res.data.err_msg.info.trade_no, //交易单号
              // delivery_time: that.commonJs.timestampToTime(
              //   res.data.err_msg.info.delivery_time
              // ), //收货时间
              express_code: "", //物流code
              express_c: "", //物流公司
              express_no: "", //物流单号
              wlList: res.data.err_msg.info.package,
              returnList:res.data.err_msg.info.return
            };
            if(res.data.err_msg.info.sent_time){
              //发货时间
              that.infoList.sent_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.sent_time
              )
            }
            if(res.data.err_msg.info.delivery_time){
              //收货时间
              that.infoList.delivery_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.delivery_time
              )
            }
            that.infoList.payment_method = row.pay_way_p;
            if(res.data.err_msg.info.address){
              that.infoList.address =
              res.data.err_msg.info.address.province +
              "、" +
              res.data.err_msg.info.address.city +
              "、" +
              res.data.err_msg.info.address.area +
              "、" +
              res.data.err_msg.info.address.address;
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
      
      order_product({
        order_id: this.broaid.order_id,
      })
        .then((res) => {
          console.log(res);
          //订单发货详情
          if (res.data.err_code == 0) {
            res.data.err_msg.info.d_product_list.forEach(ele => {
              ele.name = ele.name + '-----' + ele.pro_num + '(数量)' + '-----' + ele.sku_data + '(规格)'
            })
            let comObj = []
            let num = 0
            res.data.err_msg.info.d_product_list.forEach(comm => {
              let obj = {
                name:comm.name,
                num:""
              }
              num = num + parseInt(comm.pro_num)
              comObj.push(obj)
            })
            this.broaid.pro_num = num
            console.log(this.broaid.pro_num)
            let reuseObj = {
              comm_list:comObj,
              express: "",
              ydh: "",
              mark: "",
              nameList:[]
            }
            this.form_delivery.push(reuseObj)
          }
        })
      .catch((error) => {
        console.log(error);
      });
      
    },
    delete_form(index){
      this.form_delivery.splice(index,1)
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
    //发货
    go_delivery(index, row) {
      console.log(row)
      let that = this;
      
      this.broaid = row
      that.delivery_detalis_p = row;
      order_product({
        order_id: row.order_id,
      })
        .then((res) => {
          console.log(res);
          that.delivery_detalis_p.product_list = res.data.err_msg.info.product_list
          //订单发货详情
          if (res.data.err_code == 0) {
            // res.data.err_msg.info.d_product_list.forEach(ele => {
            //   ele.name = ele.name + '---' + ele.pro_num + '(数量)' + '-----' + ele.sku_data + '(规格)'
            // })
            this.delivery_detalis_p.package = res.data.err_msg.info.package
            row = res.data.err_msg.info
            if(res.data.err_msg.info.add_time){
              res.data.err_msg.info.add_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.add_time
              );
            }
            that.delivery_from = {};
            (that.delivery_from = {
              address_user: row.address_user,
              address_tel: row.address_tel,
              address: "",
              comment: row.comment,
              bak: row.bak,
              bh: row.order_no,
              add_time:res.data.err_msg.info.add_time
            }),
              (that.delivery_from.address =
                row.address.province +
                "、" +
                row.address.city +
                "、" +
                row.address.area+" "+row.address.address);
            that.form_adderess_show = false;
            that.form_adderess = {};
            that.form_adderess = {
              name: "",
              tel: "",
              provinceValue: "",
              cityValue: "",
              areaValue: "",
              mark: "",
            };
            // that.form_delivery = [];
            
            // let comObj = []
            // res.data.err_msg.info.d_product_list.forEach(comm => {
            //   let obj = {
            //     name:comm.name,
            //     num:""
            //   }
            //   comObj.push(obj)
            // })
            // this.reuseObj = comObj
            // let reuseObj = {
            //   comm_list:comObj,
            //   express: "",
            //   ydh: "",
            //   mark: "",
            //   nameList:[]
            // }
            // this.form_delivery.push(reuseObj)
            // that.pigcms_list = res.data.err_msg.info.d_product_list;
            console.log(res)
            that.delivery_detalis_p.bak = res.data.err_msg.info.bak
            that.delivery_detalis_p.comment = res.data.err_msg.info.comment
            that.delivery_detalis_p.package = res.data.err_msg.info.package
            
            // that.delivery_detalis_p = res.data.err_msg.info.product_list
            console.log(that.delivery_detalis_p)
            res.data.err_msg.info.d_product_list.forEach(ele => {
              ele.name = ele.name + '-----' + ele.pro_num + '(数量)' + '-----' + ele.sku_data + '(规格)'
            })
            that.pigcms_list = res.data.err_msg.info.d_product_list
            
            that.form_delivery = [];
            
            let comObj = []
            res.data.err_msg.info.d_product_list.forEach(comm => {
              let obj = {
                name:comm.name,
                num:""
              }
              comObj.push(obj)
            })
            this.reuseObj = comObj
            let reuseObj = {
              comm_list:comObj,
              express: "",
              ydh: "",
              mark: "",
              nameList:[]
            }
            this.form_delivery.push(reuseObj)
            that.pigcms_list = res.data.err_msg.info.d_product_list;
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
      that.delivery_show = true;
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
      let leg = false
      let leg1 = false
      this.form_delivery.forEach(comm => {
        if(comm.express == '' || comm.ydh == '' || comm.nameList.length == 0){
          leg = true
        }else{
          comm.nameList.forEach(arr => {
            comm.comm_list.forEach((item,ind) => {
              if(item.name == arr){
                if(comm.comm_list[ind].num == ''){
                  leg = true
                }
                if(comm.comm_list[ind].num < 0){
                  leg1 = true
                }
              }
            })
          })
          
        }

      })
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
        let param_data = []
        let arr = []
        let num = 0
        console.log(this.form_delivery)
        this.form_delivery.forEach(comm => {
          let obj = {}
          this.express_list_p.forEach((item,ind) => {
            if(item.code == comm.express){
              obj.express_company = this.express_list_p[ind].name
              // obj.express_code = this.express_list_p[ind].code
              return
            }
          })
          obj.express_code = comm.express
          obj.express_no = comm.ydh
          obj.remarks = comm.mark
          let objects = []

          comm.nameList.forEach(item => {
            let objec = {}
            that.pigcms_list.forEach(itek => {
              if(itek.name == item){
                objec.order_product_id = itek.pigcms_id
                objec.product_id = itek.product_id
                return
              }
            })
            comm.comm_list.forEach(itek => {
              if(itek.name == item){
                objec.num = itek.num
                num = parseInt(num) + parseInt(itek.num)
                return
              }
            })
            objects.push(objec)
          })
          
          obj.delivered = objects
          arr.push(obj)
        })
        arr = JSON.stringify(arr)
        params = {
          order_id: this.broaid.order_id,
          param_data:arr
        };
      // }
      // if(num > parseInt(this.broaid.pro_num)){
      //   that.$message({
      //     message: "商品总量超出订单商品数,请检查",
      //     type: "warning",
      //   });
      //   return;
      // }
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

/deep/ .el-date-editor {
  
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
    overflow-y: auto;
  }
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

// /deep/ .el-dialog__body {
//   height: 400px;
//   overflow-y: auto;
//   display: flex;
//   justify-content: space-between;
// }

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
/deep/ .el-button {
  // margin: 0 10px;
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
</style>