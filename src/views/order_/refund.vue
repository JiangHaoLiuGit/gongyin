<template>
  <div class="goodsindex">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom:20px;">
      <el-tab-pane label="全部" name="second"></el-tab-pane>
      <el-tab-pane label="申请退款" name="third">
        <span slot="label" class="por">
            申请退款
          <span class="poa boxSpan" v-if="mark.one">{{mark.one}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="商品待退回" name="six">
        <span slot="label" class="por">
            商品待退回
          <span class="poa boxSpan" v-if="mark.two">{{mark.two}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="商家待收货" name="seven">
        <span slot="label" class="por">
            商家待收货
          <span class="poa boxSpan" v-if="mark.three">{{mark.three}}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="退款成功" name="fourth"></el-tab-pane>
      <el-tab-pane label="退款取消" name="five"></el-tab-pane>
      <el-tab-pane label="商家退款已拒绝" name="eight"></el-tab-pane>
      <el-tab-pane label="退货退款已拒绝" name="nine"></el-tab-pane>
    </el-tabs>
    <div class="seach">
      
    </div>
    <div class="sreachDiv clearfix">
      
       
    </div>
    <div class="seach_copy">
      <div class="seach_select">
      <el-date-picker
        v-model="time_value" 
        class="lt"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input  class="lt" v-model="refund_search" @keyup.enter.native="pick_seach()" style="width:300px" placeholder="订单/售后/三方交易号/收货人/收货人电话"></el-input>
      <!-- <el-date-picker
        :clearable="false"
        v-model="time_value"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker> -->
      <!-- <el-input v-model="pick_value" @keyup.enter.native="pick_seach()" placeholder="请输入售后单号"></el-input> -->
      <!-- <el-select v-model="order_status_value" placeholder="请选择售后状态">
          <el-option
            v-for="item in order_method_value"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        
      </div>
      <div class="button_type">
       <el-button  class="lt" type="success" @click="user_derive_excel1">导出</el-button>
        <el-button  class="lt" type="primary" @click="pick_seach">搜索</el-button>
        <el-button class="lt" type="primary" icon="el-icon-refresh" @click="fn1(1)"
          >刷新</el-button
        >
      </div>
    </div>

    <el-row :gutter="20" class="goodsindex-list goodsindex-list2">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="order_s_list"
          border
          :height="height"
          :span-method="cellMerge"
          @selection-change="handleSelectionChange"
          @cell-mouse-leave="cellLeave"
          @cell-mouse-enter="mouseHover"
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="序号" prop="index" width="80">
          </el-table-column>
          
          <el-table-column label="商品名称/规格" width="200">
            <template slot-scope="scope">
              <div v-if="spanArr[scope.$index]>0" class="clearfix" style="text-align: left">
                <div class="lt" style="width:80%">
                  <div>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">售后单号：{{ scope.row.return_no }}</span>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">订单编号：{{ scope.row.order_no }}</span>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">商户单号：{{ scope.row.relation_no }}</span>
                    <span style="margin-right:20px;font-weight: bold; color: #6a6ae0;font-size: 14px;">三方交易号：{{ scope.row.third_id }}</span>
                  </div>
                  <div class="ltSpan clearfix">
                    <span style="margin-right:20px;">申请时间：{{ scope.row.dateline }}</span>
                    <span style="margin-right:20px;">下单时间：{{ scope.row.add_time }}</span>
                    <span style="margin-right:20px;">支付时间：{{ scope.row.paid_time }}</span>
                    <!-- <span style="margin-right:20px;">支付方式：{{ scope.row.pay_way_p }}</span> -->
                    <!-- <span style="margin-right:20px;" v-if="scope.row.live_id != '0'">直播间ID：{{ scope.row.live_id }}</span> -->
                    <!-- <span style="margin-right:20px;" v-if="scope.row.live_id == 0">订单类型：{{scope.row.activity_type == 0 ? '普通订单' : '营销订单'}}</span> -->
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
                      v-if="scope.row.save_log_total != 0"
                      >记录</el-button
                    >
                  </div>
                </div>
                <div class="rt por" style="width:20%;text-align: right;padding-top:10px;padding-right: 13px;">
                  <!-- <el-tag type="success" style="margin-right:10px" v-if="scope.row.live_id != 0">直播间订单</el-tag> -->
                  <!-- <img src="../../assets/image/newChuo.png" v-if="scope.row.refund_status != 0 && scope.row.refund_status != 3 && scope.row.refund_status != 4" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" /> -->
                  <img src="../../assets/image/newChuo.png" v-if="scope.row.refund_status == 1" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" />
                  <img src="../../assets/image/juChuo.png" v-else-if="scope.row.refund_status == 5 || scope.row.refund_status == 6" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" />
                  <img src="../../assets/image/yongChuo.png" v-else-if="scope.row.refund_status == 2" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" />
                </div>
              </div>
              <div v-else style="text-align:left;">
                <div style="min-height:80px;display:flex;align-items: center;">
                  {{ scope.row.name1 }}
                </div>
                <div>规格：{{ scope.row.sku_data1 != "" ? scope.row.sku_data1 : "无" }}</div>
                
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  style="text-align: left"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.image1"
                    :preview-src-list="[scope.row.image1]"
                    fit="cover"
                  ></el-image>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="购买明细">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  style="text-align: left;min-height:100px"
                >
                  <div style="margin:10px 0;">
                    数量：{{scope.row.o_pro_num1}}件
                  </div>
                  <div style="margin:10px 0">
                    单价：{{ scope.row.pro_cost_price1 }}元 
                  </div>
                  <div style="margin:10px 0">
                    小计：{{ scope.row.return_price1 }}元 
                  </div>
                </li> 
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="" label="退货申请">
            <template slot-scope="scope">
              <div v-if="scope.row.refund_status == 0" style="color:red;">
                <div style="margin:10px 0;font-weight:bold;">
                  类型：{{ scope.row.method == 1 ? "退货退款" : "仅退款" }}
                </div>
                <div style="margin:10px 0;">
                  退货数量：{{ scope.row.pro_num1 }}件
                </div>
                <div style="margin:10px 0;">
                  退货金额：{{ scope.row.return_price1 }}元
                </div>
              </div>
              <div v-else-if="scope.row.refund_status == 3 || scope.row.refund_status == 4" style="color:#ee8f29;">
                <div style="margin:10px 0;font-weight:bold;">
                  类型：{{ scope.row.method == 1 ? "退货退款" : "仅退款" }}
                </div>
                <div style="margin:10px 0;">
                  退货数量：{{ scope.row.pro_num1 }}件
                </div>
                <div style="margin:10px 0;">
                  退货金额：{{ scope.row.return_price1 }}元
                </div>
              </div>
              <div v-else style="color:#000;">
                <div style="margin:10px 0;">
                  类型：{{ scope.row.method == 1 ? "退货退款" : "仅退款" }}
                </div>
                <div style="margin:10px 0;">
                  退货数量：{{ scope.row.pro_num1 }}件
                </div>
                <div style="margin:10px 0;">
                  退货金额：{{ scope.row.return_price1 }}元
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="退款明细">
            <template slot-scope="scope">
              <div v-if="scope.row.refund_status == 0" style="color:red;">
                <div style="margin:10px 0;">
                  订单合计：{{ scope.row.cost_price }}元 
                </div>
                <div style="margin:10px 0;">
                  退款合计：{{ scope.row.pro_cost_price }}元 
                </div>
              </div>
              <div v-else-if="scope.row.refund_status == 3 || scope.row.refund_status == 4" style="color:#ee8f29;">
                <div style="margin:10px 0;">
                  订单合计：{{ scope.row.cost_price }}元 
                </div>
                <div style="margin:10px 0;">
                  退款合计：{{ scope.row.pro_cost_price }}元 
                </div>
              </div>
              <div v-else style="color:#000;">
                <div style="margin:10px 0;">
                  订单合计：{{ scope.row.cost_price }}元 
                </div>
                <div style="margin:10px 0;">
                  退款合计：{{ scope.row.pro_cost_price }}元 
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="退款人">
            <template slot-scope="scope">
              <div style="margin:10px 0;">
                {{ scope.row.nickname }} 
              </div>
              <!-- <div style="margin:10px 0;">
                UID：{{ scope.row.uid }}
              </div> -->
              <div style="margin:10px 0;">
                {{ scope.row.phone }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="收货人">
            <template slot-scope="scope">
              <div style="margin:10px 0;">
                {{ scope.row.address_user }} 
              </div>
              <div style="margin:10px 0;">
                {{ scope.row.address_tel }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品收货状态">
            <template slot-scope="scope">
              <div style="margin:10px 0;" v-if="scope.row.product_status == 2">
                已收货
              </div>
              <div style="margin:10px 0;" v-else>
                未收货
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.refund_status == 0"
                @click="handle_refund(scope.$index, scope.row)"
                >
                  待处理
                </el-button
              >
              <el-button
                size="mini"
                type="warning"
                v-else-if="scope.row.refund_status == 3 || scope.row.refund_status == 4"
                @click="handle_refund(scope.$index, scope.row)"
                >
                  处理中
                </el-button
              >
              <!-- <el-button
                size="mini"
                type="warning"
                v-else-if="scope.row.refund_status == 2 ||scope.row.refund_status == 1 ||scope.row.refund_status == 5 ||scope.row.refund_status == 6 "
                @click="handle_refund(scope.$index, scope.row)"
                >
                  处理完成
                </el-button
              > -->
              <el-button
                size="mini"
                type="primary"
                style="margin-top:10px;min-width:68px;"
                @click="see_details(scope.$index, scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 退货弹窗 -->
    
    <el-dialog :visible.sync="reimburse_show" class="details_box pop">
      <div class="info">售后/处理</div>
        <div
          class="tbody clearfix jin"
          v-if="refundInfo.info.method == '仅退款' || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '未收货')"
        >
          
          <div class="div" style="padding: 20px 0 0 20px">
            <el-steps
              :active="active_type"
              :space="200"
              finish-status="success"
              style="margin-bottom: 20px"
            >
              <el-step
                title="买家已申请"
                :description="refundInfo.info.dateline"
              ></el-step>
              <el-step
                title="卖家处理退款"
                :description="refundInfo.info.refund_time"
              ></el-step>
              <el-step title="退款完成"></el-step>
            </el-steps>
          </div>
        </div>
        <div
          class="tbody clearfix huo"
          v-else-if="refundInfo.info.method == '退货退款' || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '已收货')"
        >
          <div class="div" style="padding: 20px 0 0 20px">
            <el-steps
              :active="active_type"
              :space="200"
              finish-status="success"
              style="margin-bottom: 20px"
            >
              <el-step
                title="买家已申请"
                :description="refundInfo.info.dateline"
              ></el-step>
              <el-step
                title="卖家处理退款"
                :description="refundInfo.info.refund_time"
              ></el-step>
              <el-step title="买家寄回商品" :description="refundInfo.info.express_time"></el-step>
              <el-step title="退款完成"></el-step>
            </el-steps>
          </div>
        </div>
        <div class="title clearfix">
          <span class="lt">退款商品信息</span>
          
        </div>
        <el-row :gutter="20" class="goodsindex-list" style="margin: 0 0 0 0">
          <el-col :span="24" style="padding: 0; margin-top: 20px">
            <el-table
              :data="refundInfo.info.product_list"
              border
              :span-method="cellMerge2"
            >
              <!-- <el-image
                        :src="scope.row.product_image"
                        fit="cover"
                        style="width: 80px; height: 80px"
                        :preview-src-list="[scope.row.product_image]"
                      ></el-image> -->
              <el-table-column label="商品名称/规格" width="400">
                <template slot-scope="scope">
                  <div style="min-height: 66px">
                    {{ scope.row.product_name }}
                  </div>
                  <div>
                    规格:
                    {{ scope.row.sku_data == "" ? "无" : scope.row.sku_data }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="图片" width="100">
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.product_image"
                    fit="cover"
                    style="width: 80px; height: 80px"
                    :preview-src-list="[scope.row.product_image]"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="购买明细">
                <template slot-scope="scope">
                  <div>
                  数量: 
                  <span v-if="scope.row.o_pro_num">{{scope.row.o_pro_num}}</span>
                  <el-tooltip class="item" effect="dark" content="我JB也不知道为啥是null，我这次真没写死，问后端去" v-else placement="top-start">
                    <span>Null</span>
                  </el-tooltip>
                  件
                </div>
                <div>单价: {{ scope.row.pro_cost_price }}元</div>
                </template>
              </el-table-column>
              <el-table-column label="退款申请" width="150">
                <template slot-scope="scope">
                  <div style="color: red; font-weight: bold">
                  类型: {{ refundInfo.info.method }}
                </div>
                <div style="color: red">退货数量: {{scope.row.pro_num}} 件</div>
                <div style="color: red">退款金额: {{(Number(scope.row.pro_cost_price)*Number(scope.row.pro_num).toFixed(2)).toFixed(2)}} 元</div>
                </template>
              </el-table-column>
              <el-table-column label="商品收货状态">
                <template>
                  <div>
                    <div style="margin:10px 0;">
                      {{refundInfo.info.product_status}}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="退款明细" width="250">
                <template>
                  <div style="color: red">
                  订单合计: {{ refundInfo.info.cost_price }}元
                </div>
                <div style="color: red">
                  退款合计: {{ refundInfo.info.pro_cost_price }}元
                </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div style="height:20px"></div>
        <!-- 仅退款操作 -->
        <!-- 第一步 -->
        <!--  -->
        <div v-if="(refundInfo.info.method == '仅退款' && active_type == '1') || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '未收货')" style="width:90%;margin:0 auto;">
          <div class="textDiv" style="width:100%;">
            <p>【审核用户仅退款申请】</p>
            <p>如果您同意，请点击“同意”，该订单所支付款将原路退回。</p>
            <p>
              如果您逾期未处理申请，视作同意买家申请，系统会自动将当前交易的退货地址发给买家。
            </p>
          </div>
          <div>
            <el-button type="success" style="margin-bottom: 10px" class="rt" @click="typeClick('2')">
              同意申请
            </el-button>
            <el-button
              class="rt"
              type="danger"
              @click="refuse_innerVisible = true;refuseType = 1"
              style="margin-bottom: 10px; margin-right: 20px"
            >
              拒绝申请
            </el-button>
          </div>
        </div>
        <!-- 第三步：处理完成 -->
        <div v-else-if="refundInfo.info.method == '仅退款' && active_type == '3'" style="width:90%;margin:0 auto;">
          
          <div class="textDiv por" style="margin:0;">
            <img src="../../assets/image/yongChuo.png" v-if="refundInfo.info.refund_status == 2" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" />
            <img
              v-else-if="refundInfo.info.refund_status == 1"
              src="../../assets/image/newChuo.png"
              alt=""
              class="poa"
              style="right: -36px; top: -20px; width: 200px"
            />
            <img
              v-else-if="refundInfo.info.refund_status == 5 || refundInfo.info.refund_status == 6"
              src="../../assets/image/juChuo.png"
              alt=""
              class="poa"
              style="right: -36px; top: -20px; width: 200px"
            />
            <div v-if="refundInfo.info.refundStatus == 2">
              <p>【退款取消】</p>
              <p>该售后订单已退款取消！</p>
            </div>
            <div v-else-if="refundInfo.info.refundStatus == 5 || refundInfo.info.refundStatus == 6">
              <p>【退款拒绝】</p>
              <p>该售后订单已退款拒绝！</p>
            </div>
            <div v-else>
              <p>【处理完成】</p>
              <p>该售后订单已处理完成！</p>
            </div>
          </div>
        </div>
        <!-- 退货退款申请操作 -->
        <div v-if="refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '已收货'">
          <div class="title clearfix">
            <span class="lt">选择用户退回地址</span>
            <el-button class="rt" type="primary" @click="agree_to_return_show = true">去添加</el-button>
          </div>
          <div class="tabl">
            <div class="tr clearfix">
              <div class="td">选择</div>
              <div class="td">序号</div>
              <div class="td">收货人</div>
              <div class="td">电话</div>
              <div class="td">省市区</div>
              <div class="td">详细地址</div>
              <div class="td">备注</div>
            </div>
            <!--  -->
            <div
              class="tr clearfix"
              v-for="(item, index) in address_p"
              :key="index"
              @click="yuanActive = index"
            >
              <div class="td">
                <span
                  class="span"
                  :class="yuanActive == index ? 'active' : ''"
                  style="cursor: pointer"
                >
                </span>
              </div>
              <div class="td">{{index+1}} {{moren==index?"默认":''}}</div>
              <div class="td">{{item.name}}</div>
              <div class="td">{{item.tel}}</div>
              <div class="td">{{item.province_name}} {{item.city_name}} {{item.area_name}}</div>
              <div class="td">{{item.address}}</div>
              <div class="td">{{item.remark}}</div>
            </div>
          </div>
          <div class="textDiv">
            <p>【审核用户退货退款申请】</p>
            <p>如果您同意，请点击“同意”，该订单所支付款将原路退回。</p>
            <p>
              如果您逾期未处理申请，视作同意买家申请，系统会自动将当前交易的退货地址发给买家。
            </p>
          </div>
          <div>
            <!-- 退货退款申请按钮 -->
            <el-button type="success" style="margin-bottom: 10px" class="rt" @click="typeClick('1')">
              同意申请
            </el-button>
            <el-button
              class="rt"
              @click="refuse_innerVisible = true;refuseType = 2"
              type="danger"
              style="margin-bottom: 10px; margin-right: 20px"
            >
              拒绝申请
            </el-button>
          </div>
        </div>
        
      <div v-else-if="refundInfo.info.method == '退货退款' && ( refundInfo.info.refundStatus == '3' || refundInfo.info.refundStatus == '4') &&  refundInfo.info.product_status == '已收货'">
        <div class="title clearfix">
          <span class="lt">回寄地址</span>
        </div>
        <el-row :gutter="20" class="goodsindex-list active" style="margin: 0 0 0 0">
          <el-col :span="24" style="padding: 0; margin-top: 20px">
            <el-table
              :data="[1]"
              border
            >
              <el-table-column label="收货人">
                <template>
                  <div>
                    {{ refundInfo.info.t_address_user }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="电话">
                <template>
                  <div>
                    {{ refundInfo.info.t_address_tel }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="省市区">
                <template>
                  <div>
                    {{ refundInfo.info.t_address.province }} {{ refundInfo.info.t_address.city }} {{ refundInfo.info.t_address.area }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="详细地址">
                <template>
                  <div>
                    {{ refundInfo.info.t_address.address }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物流查询" width="320">
                <template>
                  <div class="clearfix">
                    <span class="lt" style="width:200px;display:block;line-height:30px">运单号：{{refundInfo.info.express_no}}</span>
                    <el-button
                      class="rt"
                      type="primary"
                      @click="seeInfo('2')"
                      v-if="refundInfo.info.refund_status == 4 && refundInfo.info.express_no != ''"
                    >
                      查询
                    </el-button>
                    <el-button
                      class="rt"
                      style="cursor:no-drop;"
                      type="info"
                      v-else
                    >
                      查询
                    </el-button>

                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        
      </div>
      <div v-if="refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '3' && refundInfo.info.product_status == '已收货'">
        <div class="textDiv">
          <p>【等待买家回寄货物】</p>
          <p>买家将使用退货地址回寄货物，请耐心等待。</p>
          <p>
            如用户未及时更新物流单号，您也可以并协助买家填写运单号，以便尽快完成售后服务。
          </p>
        </div>
        <div>
          <!-- 协助卖家输入退回运单号按钮 -->
          <el-button type="success" style="margin-bottom: 10px" class="rt" @click="write_show = true">
            协助卖家输入退回运单号
          </el-button>
        </div>
      </div>
      <div v-else-if="refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '4' && refundInfo.info.product_status == '已收货'">
        <div class="textDiv">
          <p>【确认是否收到货物】</p>
          <p>卖家回寄货物确认收到后，检查商品是否正常。如商品有问题可拒绝。</p>
          <p>
            如商品正常，请尽快给用户审核同意退款
          </p>
        </div>
        <div>
          <!-- 协助卖家输入退回运单号按钮 -->
          <el-button type="success" style="margin-bottom: 10px" class="rt" @click="typeClick('2')">
            货物正常同意退款
          </el-button>
          <el-button
            class="rt"
            type="danger"
            @click="refuse_innerVisible = true;refuseType = 3"
            style="margin-bottom: 10px; margin-right: 20px"
          >
            有疑问拒绝退款
          </el-button>
        </div>
      </div>
      <div v-else-if="refundInfo.info.method == '退货退款' && active_type == '4'">
        <div class="textDiv por">
          <img src="../../assets/image/yongChuo.png" v-if="refundInfo.info.refund_status == 2" class="poa" style="width:100px;z-index:1000;top:15px;right:0;" alt="" />
            <img
              v-else-if="refundInfo.info.refund_status == 1"
              src="../../assets/image/newChuo.png"
              alt=""
              class="poa"
              style="right: -36px; top: -20px; width: 200px"
            />
            <img
              v-else-if="refundInfo.info.refund_status == 5 || refundInfo.info.refund_status == 6"
              src="../../assets/image/juChuo.png"
              alt=""
              class="poa"
              style="right: -36px; top: -20px; width: 200px"
            />
          <div v-if="refundInfo.info.refundStatus == 2">
            <p>【退款取消】</p>
            <p>该售后订单已退款取消！</p>
          </div>
          <div v-else-if="refundInfo.info.refundStatus == 5 || refundInfo.info.refundStatus == 6">
            <p>【退款拒绝】</p>
            <p>该售后订单已退款拒绝！</p>
          </div>
          <div v-else>
            <p>【处理完成】</p>
            <p>该售后订单已处理完成！</p>
          </div>
        </div>
      </div>

    </el-dialog>
    <!-- 拒绝申请 -->
      <el-dialog
        width="30%"
        class="remarks_box active"
        :visible.sync="refuse_innerVisible"
        append-to-body>
        <div class="info">拒绝申请</div>
        <el-form :model="form_refuse" style="margin-top:20px;width:90%;margin-left:20px;">
          <el-form-item label="拒绝原因：" :label-width="remarks_formLabelWidth">
            <el-input
              style="width:300px;"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_refuse.remarks">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refuse_innerVisible = false">取消</el-button>
          <el-button type="primary" @click="sure_refuse">确认</el-button>
        </div>
      </el-dialog>
    
      <!-- 物流信息填写弹窗 -->
      <el-dialog
        width="30%"
        class="remarks_box"
        :visible.sync="write_show"
        append-to-body>
        <div class="info">运单号填写</div>
        <el-form :model="form_adderess_p" v-loading="show_write_loading" style="margin-top:20px;width:90%;margin-left:20px;">
          <el-form-item label="快递公司：" :label-width="remarks_formLabelWidth">
            <el-select v-model="form_adderess_p.express" placeholder="请选择快递公司">
              <el-option
                v-for="item in express_list_p"
                :key="item.pigcms_id"
                :label="item.name"
                :value="item.pigcms_id">
              </el-option>
            </el-select>
            <!-- <el-cascader
              v-model="form_adderess_p.express"
              placeholder="试试搜索：关键字"
              :options="express_list_b"
              filterable></el-cascader> -->
          </el-form-item>
          <el-form-item label="运单号：" :label-width="remarks_formLabelWidth">
            <el-input v-model="form_adderess_p.ydh" placeholder="请输入运单号"></el-input>
          </el-form-item>
          <!-- <el-form-item label="运费(￥)：" :label-width="remarks_formLabelWidth">
            <el-input v-model="form_adderess_p.yf" placeholder="请输入运费"></el-input>
          </el-form-item> -->
          <el-form-item label="凭证(必填)：" :label-width="remarks_formLabelWidth">
             <el-upload
              action=""
              list-type="picture-card"
              :file-list='fileList'
              :http-request="img_upload_group"
              accept="image/jpeg, image/jpg, image/png"
              multiple
              :on-remove="handleRemove">
              <!-- :on-preview="handlePreview" -->
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="write_show = false">取消</el-button>
          <el-button type="primary" @click="sure_write">确认</el-button>
        </div>
      </el-dialog>
      <!-- 添加收货地址填写弹窗 -->
      <el-dialog
        width="50%"
        class="remarks_box teshu"
        :visible.sync="agree_to_return_show"
        append-to-body>
        <div class="info">收件信息</div>
        <el-form :model="form_adderess" style="width:90%;margin:20px 0 0 20px;">
          
          <el-form-item label="默认地址：" :label-width="remarks_formLabelWidth">
            <el-radio v-model="form_adderess.radio" label="1">默认地址</el-radio>
            <el-radio v-model="form_adderess.radio" label="0">非默认</el-radio>
          </el-form-item>
          <el-form-item label="收货人姓名：" :label-width="remarks_formLabelWidth">
            <el-input v-model="form_adderess.name" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" :label-width="remarks_formLabelWidth">
            <el-input v-model="form_adderess.tel" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="省市区：" :label-width="remarks_formLabelWidth">
            <el-select v-model="form_adderess.provinceValue" placeholder="请选择省份" style="margin-right:30px;">
              <el-option
                v-for="item in provinceList"
                :key="item.province_id"
                :label="item.name"
                :value="item.province_id">
              </el-option>
            </el-select>
            <el-select v-model="form_adderess.cityValue" placeholder="请选择市" v-show="city_ifShow" style="margin-right:30px;">
              <el-option
                v-for="item in cityList"
                :key="item.city_id"
                :label="item.name"
                :value="item.city_id">
              </el-option>
            </el-select>
            <el-select v-model="form_adderess.areaValue" placeholder="请选择区"  v-show="area_ifShow">
              <el-option
                v-for="item in areaList"
                :key="item.area_id"
                :label="item.name"
                :value="item.area_id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="市：" :label-width="remarks_formLabelWidth">
            
          </el-form-item> -->
           <!-- <el-form-item label="区：" :label-width="remarks_formLabelWidth">
            
          </el-form-item> -->
          <el-form-item label="详细地址：" :label-width="remarks_formLabelWidth">
            <el-input
              style="width:300px;"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_adderess.mark">
            </el-input>
          </el-form-item>
          <el-form-item label="备注：" :label-width="remarks_formLabelWidth">
            <el-input
              style="width:300px;"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_adderess.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="agree_to_return_show = false">取消</el-button>
          <el-button type="primary" @click="sure_address1">确认</el-button>
        </div>
      </el-dialog>
      <!-- 第一部sure_address 最后一步agree_btn -->
      <div class="box" v-show="kuang_show">
        <div class="content" @click="kuang_show = false">
          <div class="kuang" @click.stop="kuang_show = true">
            <img src="../../assets/image/gantan.png" alt="" />
            <div class="text">
              是否确认同意买家退款申请？
            </div>
            <el-button
              type="danger"
              @click.stop="kuang_show = false"
              style="margin-bottom: 10px; margin-right: 36px"
            >
              取消
            </el-button>
            <el-button
              v-if="type == 1"
              type="success"
              @click="sure_address"
            >
              确认
            </el-button>
            <el-button
              v-else-if="type == 2"
              type="success"
              @click="agree_btn"
            >
              确认
            </el-button>
          </div>
        </div>
      </div>
      <!-- 物流查询 -->
      <el-dialog :visible.sync="wlList_show" class="delivery_box">
        <div class="info">物流查询</div>
        <div v-if="wlList_p.length > 0">
          <el-row
            :gutter="20"
            class="goodsindex-list"
            v-show="wlList_p.length > 0"
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
        </div>
        <div v-else style="padding:30px">
          暂无轨迹
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
import $ from 'jquery'
import { refund_list , refund_info , refuse_apply , default_address , get_province , get_city , get_area , return_order_info,
         refuse_agree ,address_add, uploadImages ,  express_list , return_express  , agree_refund  , get_express,upload_img,return_agree,order_bak,order_bak_list  } from "../../utils/axios";
export default {
  data() {
    return {
      multipleSelection:[],
      goodsArrList:[],
      imgList:[],//组图参数
      fileList:[],//组图参数
      dialogImageUrl:"",
      dialogVisible:false,
      order_s_list: [], //订单列表
      loading : false,
      remarks_formLabelWidth: "100px",
      fn1: this.commonJs.Debounce(this.get_order_list),
      add_remarks_show : false,
      O_message : {},
      queryInfo: {
        page: 1,
        pageSize: 20,
        total : 1
      },
      pick_condition: '',
      pick_value : '',
      pageSize : 20,
      type:'0',
      kuang_show:false,
      time_value : '',
      order_status_value:"",//售后状态值
      order_method_value:[
        //售后状态
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "未处理（申请退款）",
        },
        {
          value: "1",
          label: "已退款（退款成功）",
        },
        {
          value: "2",
          label: "退款取消（退款关闭）",
        },
        {
          value: "3",
          label: "商品待退回",
        },
        {
          value: "4",
          label: "商家待收货",
        },
        {
          value: "5",
          label: "商家退款已拒绝（商家拒绝）",
        },
        {
          value: "6",
          label: "退货退款拒收已拒绝（商家拒收获）",
        }
      ],
      mark:{
        one:"",
        two:"",
        three:""
      },
      height:"",
      agree_to_return_show : false,
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
      activeName : 'first',
      refuse_innerVisible : false,
      refund_from : {
        refund_time : '',//退款处理时间
        product_name : '',//商品名称
        product_image : '',//商品主图
        sku_data : '',//商品规格
        address_user : '',//买家昵称
        order_no : '',//订单号
        add_time : '',//成交时间-订单时间
        pro_price : '',//商品单价
        postage : '',//邮费
        sub_total : '',//商品金额（不含邮费）
        return_no : '',//退货单号-售后编号
        refund_money : '',//申请退款金额
        product_status : '',//货物状态 买家是否收到货 1未收到 2收到
        type : '',//退货类型-退款原因
        content : '',//用户的退货说明-补充说明
        pro_num : '',  //订单中 商品数量
        images : [],
        videos : [],
      },
      timer : null,
      timer_p : 0,
      form_refuse : {
        remarks : ''
      },
      refund_row : {},
      refund_search:"",//订单号搜索
      reimburse_show : false,
      reimburse : {
        refund_time : '',//退款处理时间
        product_name : '',//商品名称
        product_image : '',//商品主图
        sku_data : '',//商品规格
        address_user : '',//买家昵称
        order_no : '',//订单号
        add_time : '',//成交时间-订单时间
        pro_price : '',//商品单价
        postage : '',//邮费
        sub_total : '',//商品金额（不含邮费）
        return_no : '',//退货单号-售后编号
        refund_money : '',//申请退款金额
        product_status : '',//货物状态 买家是否收到货 1未收到 2收到
        type : '',//退货类型-退款原因
        content : '',//用户的退货说明-补充说明
        pro_num : '',  //订单中 商品数量
        images : [],
        videos : [],
        refund_status : '',
        express_code : ''
      },

      form_adderess : {
        name : '',
        tel : '',
        provinceValue : '',
        cityValue : '',
        areaValue : '',
        mark : '',
        remark:"",
        radio:"0"
      },
      provinceList :[], //省
      cityList :[],//市
      city_ifShow : false,
      areaList :[],//区
      area_ifShow : false,
      form_adderess_show : false,
      delivery_from : {
        address_user : '',
        address_tel : '',
        address : '',
      },
      address_p : {},
      write_show : false,
      fileList : [],
      other_img_upload_err_group : false,
      value : {
        fileList_copy : []  ,
        fileList_copy_p : []
      },
      form_adderess_p : {
        express : '',
        ydh : '',
        yf : ''
      },
      express_list_p : [],
      show_write_loading : false,
      express_show : false,
      wlList_po : [],
      active_type : 0,
      ppp : [],
      refund_from_d : {
        refund_time : '',//退款处理时间
        product_name : '',//商品名称
        product_image : '',//商品主图
        sku_data : '',//商品规格
        address_user : '',//买家昵称
        order_no : '',//订单号
        add_time : '',//成交时间-订单时间
        pro_price : '',//商品单价
        postage : '',//邮费
        sub_total : '',//商品金额（不含邮费）
        return_no : '',//退货单号-售后编号
        refund_money : '',//申请退款金额
        product_status : '',//货物状态 买家是否收到货 1未收到 2收到
        type : '',//退货类型-退款原因
        content : '',//用户的退货说明-补充说明
        pro_num : '',  //订单中 商品数量
        images : [],
        videos : [],
        pay_way : '',//支付方式
        return_status_p : '',//售后状态
        shr : '',//收货人
        shr_tel : '',//收货人手机号
        shr_address : '',//收货人地址
        s_reason : '',//拒绝原因
        th_name : '',//退货——收货人
        th_tel : '',//收货人手机号
        th_address : '',//地址
        th_company : '',//快递公司
        th_ydh : '',//运单号
        express_show_p : false,
        wlList_po : [],
        y_name : '',//运营商名称
        y_lxr : '',//运营商联系人
        y_tel : '',//运营商电话
        express_code : '',
        type_p : '',
        spanArr:[],
      },
      wlList_p:[],
      top_status:"-1",
      refundInfo:{ info: {} },
      yuanActive: "0",
      wlList_show:false,
      spanBrr:[],
      express_list_b:[],
      refuseType:"0",
      inputFirst:"",
      bei_blean:false,
      addressList:[],
    };
  },

   watch:{

    'form_adderess.provinceValue':{
      handler:function(news,olds){
        if(news){
          console.log(news)
          this.city_ifShow = true
          this.form_adderess.cityValue = ''
          this.form_adderess.areaValue = ''
          this.area_ifShow = false
          this.get_city(news)
        } else {
          this.city_ifShow = false
          this.form_adderess.cityValue = ''
          this.form_adderess.areaValue = ''
          this.area_ifShow = false
        }
      }
    },

    'form_adderess.cityValue':{
      handler:function(news,olds){
        console.log(news)
        if(news){
          this.area_ifShow = true
          this.form_adderess.areaValue = ''
          this.get_area(news)
        } else {
          this.area_ifShow = false
        }
      }
    },

  },

  created() {
    if (this.$route.query.order_no) {
      this.refund_search = this.$route.query.order_no;
      this.pick_seach();
    }else if (this.$route.query.return_no) {
      this.pick_value = this.$route.query.return_no;
      this.pick_seach();
    } else {
      this.get_order_list();//获取全部订单列表
    }
    this.get_province() //获取省份
    this.get_express_list();//获取物流公司列表
    //获取角标
    // this.firstFun("seven")
    // this.firstFun("third")
    // this.firstFun("six")
    this.height = document.body.clientHeight - 270
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加退货地址
    sure_address1 () {
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
          name : that.form_adderess.name,
          tel : that.form_adderess.tel,
          address : that.form_adderess.mark,
          is_default: that.form_adderess.radio,
          province : that.form_adderess.provinceValue,
          city : that.form_adderess.cityValue,
          area : that.form_adderess.areaValue,
          remark : that.form_adderess.remark,
        }

      address_add(
        params
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.agree_to_return_show = false
            that.$message({
              message: '添加成功成功',
              type: 'success'
            });
            
            this.addressInfo()
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
    typeClick(index){
      this.type = index
      this.kuang_show = true
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
    cellMerge2({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (
        columnIndex == 4
        || columnIndex == 5
      ) {
        if (rowIndex == 0) {
          _row = 100;
        } else {
          _row = 0;
        }
      }

      return {
        rowspan: _row, //行
        colspan: _col, //列
      };
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
    seeBei(val,index){
      if(this.bei_blean){
        this.bei_blean = false
      }else{
        this.bei_blean = true
      }
      console.log(this.bei_blean)
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
    seeInfo(ind,item){
      let that = this;

      let data;
      if(ind == 1){
        data = {
          express_code: item.express_code,
          express_no: item.express_no,
        }
      }else{
        data = {
          express_code: this.refundInfo.info.express_code,
          express_no: this.refundInfo.info.express_no,
        }
      }
      get_express(
        data
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
              
              this.wlList_show = true
              that.wlList_p = res.data.err_msg.Traces;
              if (res.data.err_msg.Traces.length == 0) {
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
    //表格合并行
    cellMerge({ row, column, rowIndex, columnIndex }) {
      let _row = 1;
      if(columnIndex == 0 || columnIndex == 1){
        _row = this.spanArr[rowIndex]
      }
      let _col = _row > 0 ? 1 : 0;
      if(this.spanArr[rowIndex] > 0){
        if (columnIndex == 0 || columnIndex == 1){
          _col = 1
        }else if (columnIndex == 2){
          _col = 9
        }else{
          if(columnIndex == 7){
            
            _row = 10
          }else{
            _row = 1
            if(this.spanArr[rowIndex] > 0){
              // transparent
              $('.goodsindex-list2 tbody tr:nth-of-type('+ rowIndex +')').css({"border-bottom":"5px solid #c1c1c1"})
            }
            
          }
          _col = 0
        }
      }
      if(this.spanBrr[rowIndex]>0){
        if(columnIndex == 10 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9){
          _row = this.spanBrr[rowIndex]
        }
      }else{
        if(columnIndex == 10 || columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9){
          _row = 0
        }
      }
      return {
        rowspan: _row, //行
        colspan: _col, //列
      };
      // return {
      //   rowspan: 1, //行
      //   colspan: 1, //列
      // };
    },
    get_express_list () {
      let that = this
      
      express_list(
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.express_list_p = res.data.err_msg.list
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
              type: 'error'
            });
          }
        })
        .catch((error) => {
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
    firstFun(name){
      let that = this;
      let status = "";
      if (name == "third") {
        status = 0; //申请退款
      } else if (name == "six") {
        status = 3; //商品待退回
      } else if (name == "seven") {
        status = 4; //商家待收货
      }
      that.pick_status = status;
      let request_form = {
        page_size: 20,
        page: 1,
        top_status: status,
        status:status,
      };
      refund_list(request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if(res.data.err_msg.total_number > 99){
              res.data.err_msg.total_number = "99+"
            }
            if (name == "third") {
              this.mark.one = res.data.err_msg.total_number; //申请退款
            } else if (name == "six") {
              this.mark.two = res.data.err_msg.total_number; //商品待退回
            } else if (name == "seven") {
              this.mark.three = res.data.err_msg.total_number; //商家待收货
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
      let that = this;
      let status = "";
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      // <el-tab-pane label="全部" name="second"></el-tab-pane>
      // <el-tab-pane label="申请退款" name="third"></el-tab-pane>
      // <el-tab-pane label="退款成功" name="fourth"></el-tab-pane>
      // <el-tab-pane label="退款取消" name="five"></el-tab-pane>
      // <el-tab-pane label="商品待退回" name="six"></el-tab-pane>
      // <el-tab-pane label="商家待收货" name="seven"></el-tab-pane>
      // <el-tab-pane label="商家退款已拒绝" name="eight"></el-tab-pane>
      // <el-tab-pane label="退货退款已拒绝" name="nine"></el-tab-pane>
      if (tab.name == "second") {
        status = -1; //全部
      } else if (tab.name == "third") {
        status = 0; //申请退款
      } else if (tab.name == "fourth") {
        status = 1; //退款成功
      } else if (tab.name == "five") {
        status = 2; //退款取消
      } else if (tab.name == "six") {
        status = 3; //商品待退回
      } else if (tab.name == "seven") {
        status = 4; //商家待收货
      } else if (tab.name == "eight") {
        status = 5; //商家退款已拒绝
      }else if (tab.name == "nine") {
        status = 6; //退货退款已拒绝
      }
      that.pick_status = status;
      this.top_status = status
      let request_form = {
        page_size: 20,
        page: 1,
        top_status: status,
        return_no: that.pick_value,
        status:that.top_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      };
      that.loading = true;
      that.order_s_list = []
      that.spanArr = []
      that.spanBrr = []

      
      refund_list(request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            res.data.err_msg.list.forEach((element,inde) => {
              element.product_list.push(element.product_list[0])
              element.dateline = that.commonJs.timestampToTime(
                element.dateline
              );
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
              element.refund_money = Number(element.refund_money).toFixed(2)
              if (element.refund_status == 0) {
                element.pay_status_p = "未处理";
              } else if (element.refund_status == 1) {
                element.pay_status_p = "已退款";
              } else if (element.refund_status == 2) {
                element.pay_status_p = "退款取消 ";
              } else if (element.refund_status == 3) {
                element.pay_status_p = "商品待退回";
              } else if (element.refund_status == 4) {
                element.pay_status_p = "商家待收货";
              } else if (element.refund_status == 5) {
                element.pay_status_p = "退款商家已拒绝";
              } else if (element.refund_status == 6) {
                element.pay_status_p = "退货完成";
              } else if (element.refund_status == 7) {
                element.pay_status_p = "商家退货退款已拒绝拒收";
              } else {
                element.pay_status_p = "未知";
              }

              if (element.order_status == 1) {
                element.order_status_p = "未支付";
              } else if (element.order_status == 2) {
                element.order_status_p = "未发货  ";
              } else if (element.order_status == 3) {
                element.order_status_p = "已发货";
              } else if (element.order_status == 4) {
                element.order_status_p = "已完成";
              } else if (element.order_status == 5) {
                element.order_status_p = "已取消";
              } else if (element.order_status == 6) {
                element.order_status_p = "退款中 ";
              } else if (element.order_status == 0) {
                element.order_status_p = "临时订单";
              } else if (element.order_status == 7) {
                element.order_status_p = "已收货";
              } else {
                element.order_status_p = "未知";
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
                element.index = inde + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product 每个属性键值 + "1" 这样可以避免给element.product属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            console.log(that.order_s_list)
            // that.order_s_list = res.data.err_msg.list;
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
      that.activeName = "second";
      that.pick_status = "";
      that.loading = true;
      that.payment_status_value = "";
      that.time_type = "";
      that.top_status = -1;
      that.time_value = "";
      that.pick_condition = "";
      that.pick_value = "";
      that.refund_search = ''
      that.order_s_list = []
      that.spanArr = []
      that.spanBrr = []
      let request_form = {
        page: 1,
        page_size: 20,
        top_status:-1
      };
      refund_list(request_form)
        .then((res) => {
          console.log(res);
          //测试数据
          if (res.data.err_code == 0) {
            if(res.data.err_msg.apply_refund > 99){
              res.data.err_msg.apply_refund = "99+"
            }
            if(res.data.err_msg.stay_refund > 99){
              res.data.err_msg.stay_refund = "99+"
            }
            if(res.data.err_msg.stay_delivery > 99){
              res.data.err_msg.stay_delivery = "99+"
            }
            this.mark.one = res.data.err_msg.apply_refund; //申请退款
            this.mark.two = res.data.err_msg.stay_refund; //商品待退回
            this.mark.three = res.data.err_msg.stay_delivery; //商家待收货

            that.loading = false;
            this.spanArr = [];
            res.data.err_msg.list.forEach((element,inde) => {
              element.product_list.push(element.product_list[0])
              element.dateline = that.commonJs.timestampToTime(
                element.dateline
              );
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
              
              element.refund_money = Number(element.refund_money).toFixed(2)
              if (element.refund_status == 0) {
                element.pay_status_p = "未处理";
              } else if (element.refund_status == 1) {
                element.pay_status_p = "已退款";
              } else if (element.refund_status == 2) {
                element.pay_status_p = "退款取消 ";
              } else if (element.refund_status == 3) {
                element.pay_status_p = "商品待退回";
              } else if (element.refund_status == 4) {
                element.pay_status_p = "商家待收货";
              } else if (element.refund_status == 5) {
                element.pay_status_p = "退款商家已拒绝";
              } else if (element.refund_status == 6) {
                element.pay_status_p = "退货完成";
              } else if (element.refund_status == 7) {
                element.pay_status_p = "商家退货退款已拒绝拒收";
              } else {
                element.pay_status_p = "未知";
              }

              if (element.order_status == 1) {
                element.order_status_p = "未支付";
              } else if (element.order_status == 2) {
                element.order_status_p = "未发货  ";
              } else if (element.order_status == 3) {
                element.order_status_p = "已发货";
              } else if (element.order_status == 4) {
                element.order_status_p = "已完成";
              } else if (element.order_status == 5) {
                element.order_status_p = "已取消";
              } else if (element.order_status == 6) {
                element.order_status_p = "退款中 ";
              } else if (element.order_status == 0) {
                element.order_status_p = "临时订单";
              } else if (element.order_status == 7) {
                element.order_status_p = "已收货";
              } else {
                element.order_status_p = "未知";
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
                element.index = inde + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product 每个属性键值 + "1" 这样可以避免给element.product属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            console.log(this.order_s_list)
            // that.order_s_list = res.data.err_msg.list;
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
      that.order_s_list = []
      that.spanArr = []
      this.spanBrr = []
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      refund_list({
        page: page,
        page_size: number,
        
        top_status: that.top_status,
        return_no: that.pick_value,
        status:that.top_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            res.data.err_msg.list.forEach((element,inde) => {
              element.product_list.push(element.product_list[0])
              element.dateline = that.commonJs.timestampToTime(
                element.dateline
              );
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
element.refund_money = Number(element.refund_money).toFixed(2)
              if (element.refund_status == 0) {
                element.pay_status_p = "未处理";
              } else if (element.refund_status == 1) {
                element.pay_status_p = "已退款";
              } else if (element.refund_status == 2) {
                element.pay_status_p = "退款取消 ";
              } else if (element.refund_status == 3) {
                element.pay_status_p = "商品待退回";
              } else if (element.refund_status == 4) {
                element.pay_status_p = "商家待收货";
              } else if (element.refund_status == 5) {
                element.pay_status_p = "退款商家已拒绝";
              } else if (element.refund_status == 6) {
                element.pay_status_p = "退货完成";
              } else if (element.refund_status == 7) {
                element.pay_status_p = "商家退货退款已拒绝拒收";
              } else {
                element.pay_status_p = "未知";
              }

              if (element.order_status == 1) {
                element.order_status_p = "未支付";
              } else if (element.order_status == 2) {
                element.order_status_p = "未发货  ";
              } else if (element.order_status == 3) {
                element.order_status_p = "已发货";
              } else if (element.order_status == 4) {
                element.order_status_p = "已完成";
              } else if (element.order_status == 5) {
                element.order_status_p = "已取消";
              } else if (element.order_status == 6) {
                element.order_status_p = "退款中 ";
              } else if (element.order_status == 0) {
                element.order_status_p = "临时订单";
              } else if (element.order_status == 7) {
                element.order_status_p = "已收货";
              } else {
                element.order_status_p = "未知";
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
                element.index = inde + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product 每个属性键值 + "1" 这样可以避免给element.product属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            // that.order_s_list = res.data.err_msg.list;
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
      console.log(this.queryInfo)
      this.get_consumer_list_page(1,val)
    },

    //当前页
    handleCurrentChange(val) {
      console.log(val)
      this.get_consumer_list_page(val,this.pageSize)
    },
    //导出
    user_derive_excel1() {
      this.multipleSelection.forEach((item, index) => {
        this.goodsArrList.push(item);
      });
      let that = this;
      if (this.pick_value == "" && this.time_value == "" && that.refund_search == ''&&this.goodsArrList.length == 0) {
        that.$message({
          message: "请选择任意一种搜索条件",
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
      refund_list({
        page: 1,
        page_size: this.pageSize,
        top_status: that.top_status,
        return_no: that.pick_value,
        status:that.top_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      })
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
                if (!obj[this.goodsArrList[i].return_id]) {
                  result.push(this.goodsArrList[i]);
                  obj[this.goodsArrList[i].return_id] = true;
                }
              }
              var str = "";
              result.forEach((element) => {
                if (str == "") {
                  str += element.return_id;
                } else {
                  str += "," + element.return_id;
                }
              });
              console.log(str)
              this.goodsArrList = []
              window.open(publicFile.address + "/new_admin.php?c=order&a=return_derive_excel&top_status="+ that.top_status 
              +"&return_no="+ that.pick_value 
              +"&search="+ that.refund_search 
              +"&return_ids="+ str
              +"&start_time="+ time1 +"&end_time="+ time2)
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
      console.log(this.top_status)
      console.log(this.time_value);
      if (this.pick_value == "" && this.time_value == "" && that.refund_search == '') {
        that.$message({
          message: "请选择任意一种搜索条件",
          type: "warning",
        });
        return;
      }
      that.order_s_list = []
      that.spanArr = []
      that.spanBrr = []
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      refund_list({
        page: 1,
        page_size: this.pageSize,
        top_status: that.top_status,
        return_no: that.pick_value,
        status:that.top_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((element,inde) => {
              if(res.data.err_msg.apply_refund > 99){
                res.data.err_msg.apply_refund = "99+"
              }
              if(res.data.err_msg.stay_refund > 99){
                res.data.err_msg.stay_refund = "99+"
              }
              if(res.data.err_msg.stay_delivery > 99){
                res.data.err_msg.stay_delivery = "99+"
              }
              this.mark.one = res.data.err_msg.apply_refund; //申请退款
              this.mark.two = res.data.err_msg.stay_refund; //商品待退回
              this.mark.three = res.data.err_msg.stay_delivery; //商家待收货
              element.product_list.push(element.product_list[0])
              element.dateline = that.commonJs.timestampToTime(
                element.dateline
              );
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
element.refund_money = Number(element.refund_money).toFixed(2)
              if (element.refund_status == 0) {
                element.pay_status_p = "未处理";
              } else if (element.refund_status == 1) {
                element.pay_status_p = "已退款";
              } else if (element.refund_status == 2) {
                element.pay_status_p = "退款取消 ";
              } else if (element.refund_status == 3) {
                element.pay_status_p = "商品待退回";
              } else if (element.refund_status == 4) {
                element.pay_status_p = "商家待收货";
              } else if (element.refund_status == 5) {
                element.pay_status_p = "退款商家已拒绝";
              } else if (element.refund_status == 6) {
                element.pay_status_p = "退货完成";
              } else if (element.refund_status == 7) {
                element.pay_status_p = "商家退货退款已拒绝拒收";
              } else {
                element.pay_status_p = "未知";
              }

              if (element.order_status == 1) {
                element.order_status_p = "未支付";
              } else if (element.order_status == 2) {
                element.order_status_p = "未发货  ";
              } else if (element.order_status == 3) {
                element.order_status_p = "已发货";
              } else if (element.order_status == 4) {
                element.order_status_p = "已完成";
              } else if (element.order_status == 5) {
                element.order_status_p = "已取消";
              } else if (element.order_status == 6) {
                element.order_status_p = "退款中 ";
              } else if (element.order_status == 0) {
                element.order_status_p = "临时订单";
              } else if (element.order_status == 7) {
                element.order_status_p = "已收货";
              } else {
                element.order_status_p = "未知";
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
                element.index = inde + 1;
                var obj = JSON.parse(JSON.stringify(element));
                //给element.product 每个属性键值 + "1" 这样可以避免给element.product属性和给element属性重名导致给element的值被覆盖现象
                for (let i in ele) {
                  let ii = i + "1"
                  obj[ii] = element.product_list[ind][i];
                }
                
                that.order_s_list.push(obj);
              });
            });
            // that.order_s_list = res.data.err_msg.list;
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
    info(){
      let that = this
      refund_info({
        return_id: this.product_id,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if (res.data.err_msg.info.type == 1) {
              res.data.err_msg.info.type = "买/卖双方协商一致";
            } else if (res.data.err_msg.info.type == 2) {
              res.data.err_msg.info.type = "买错/多买/不想要";
            } else if (res.data.err_msg.info.type == 3) {
              res.data.err_msg.info.type = "商品质量问题";
            } else if (res.data.err_msg.info.type == 4) {
              res.data.err_msg.info.type = "未到货品";
            } else if (res.data.err_msg.info.type == 5) {
              res.data.err_msg.info.type = "其它";
            } else {
              res.data.err_msg.info.type = "未知";
            }

            if (res.data.err_msg.info.product_status == 1) {
              res.data.err_msg.info.product_status = "未收货";
            } else if (res.data.err_msg.info.product_status == 2) {
              res.data.err_msg.info.product_status = "已收货";
            } else {
              res.data.err_msg.info.product_status = "未知";
            }
            res.data.err_msg.info.refundStatus =
              res.data.err_msg.info.refund_status;
            if (res.data.err_msg.info.method == 1) {
              res.data.err_msg.info.method = "退货退款";
              if (res.data.err_msg.info.refund_status == 0) {
                this.active_type = "1";
                //获取默认地址
                this.addressInfo()
              } else if (res.data.err_msg.info.refund_status == 3) {
                this.active_type = "2";
              } else if (res.data.err_msg.info.refund_status == 4) {
                this.active_type = "3";
              } else {
                this.active_type = "4";
              }
            } else if (res.data.err_msg.info.method == 2) {
              res.data.err_msg.info.method = "仅退款";
              if (res.data.err_msg.info.refund_status == 0) {
                this.active_type = "1";
              } else if (
                res.data.err_msg.info.refund_status == 3 ||
                res.data.err_msg.info.refund_status == 4
              ) {
                this.active_type = "2";
              } else {
                this.active_type = "3";
              }
            } else {
              res.data.err_msg.info.method = "未知";
            }

            res.data.err_msg.info.refund_time = that.commonJs.timestampToTime(
              res.data.err_msg.info.refund_time
            );
            res.data.err_msg.info.express_time = that.commonJs.timestampToTime(
              res.data.err_msg.info.express_time
            );
            if (res.data.err_msg.info.paid_time) {
              res.data.err_msg.info.paid_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.paid_time
              );
            }

            res.data.err_msg.info.dateline = that.commonJs.timestampToTime(
              res.data.err_msg.info.dateline
            );
            if (res.data.err_msg.info.order_status == 1) {
              res.data.err_msg.info.order_status = "待支付";
            } else if (res.data.err_msg.info.order_status == 2) {
              res.data.err_msg.info.order_status = "待发货";
            } else if (res.data.err_msg.info.order_status == 3) {
              res.data.err_msg.info.order_status = "待收货";
            } else if (res.data.err_msg.info.order_status == 4) {
              res.data.err_msg.info.order_status = "(待评价)已完成";
            } else if (res.data.err_msg.info.order_status == 5) {
              res.data.err_msg.info.order_status = "已取消";
            } else if (res.data.err_msg.info.order_status == 7) {
              res.data.err_msg.info.order_status = "待完成";
            } else {
              res.data.err_msg.info.order_status = "未知";
            }
            this.refundInfo = res.data.err_msg;
            this.reimburse_show = true
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
    //处理
    handle_refund (index , row) {
      let that = this
      console.log(row)
      that.refund_row = row;
      this.product_id = that.refund_row.return_id
      this.info()
    },
    //获取默认地址
    addressInfo() {
      let that = this;
      default_address({
        id: this.product_id,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            if (!res.data.err_msg) {
            } else {
              if(that.address_p = res.data.err_msg.length>0){
                that.address_p = res.data.err_msg;
                res.data.err_msg.forEach((item,index) => {
                  if(item.is_default == 1){
                    this.moren = index
                    this.yuanActive = index
                  }
                })
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
    agree_btn(){
      
      let that = this
      
      return_agree({
        id: that.refundInfo.info.return_id
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.$message({
              message: '处理成功',
              type: 'success'
            });
            this.info()
            that.refuse_innerVisible = false
            that.kuang_show = false
            this.get_consumer_list_page(this.queryInfo.page,this.queryInfo.pageSize)
            // that.get_order_list()
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
    //确认拒绝
    sure_refuse () {
      let that = this
      if (that.form_refuse.remarks == '') {
        that.$message({
          message: '请填写拒绝原因',
          type: 'warning'
        });
        return
      }
      refuse_apply(
        {
          return_id : that.refundInfo.info.return_id,
          store_content : that.form_refuse.remarks,
          type:this.refuseType
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.form_refuse.remarks = ""
            that.$message({
              message: '拒绝成功',
              type: 'success'
            });
            that.refuse_innerVisible = false
            this.info()
            this.get_consumer_list_page(this.queryInfo.page,this.queryInfo.pageSize)
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

    

    //填写退货地址
    sure_address () {
      if(this.address_p.length == 0){
        this.$message({
          showClose: true,
          message: "请先填写退货地址",
          type: 'error'
        });
      }
      let that = this
      let data = this.address_p[parseInt(this.yuanActive)]
      if(!data.name){
        this.$message({
          showClose: true,
          message: "请先填写退货地址",
          type: 'error'
        });
      }
      let add;
      add = {
        return_id : that.refundInfo.info.return_id,
        address_user : data.name,
        address_tel : data.tel,
        address : data.address,
        // province_txt :data.province_name ,
        // city_txt : data.city_name,
        // county_txt :data.area_name,
        province : data.province,
        city : data.city,
        area : data.area,
      }
      refuse_agree(
        add
      )
      .then((res) => {
        console.log(res);
        if (res.data.err_code == 0) {
          that.agree_to_return_show = false
          that.$message({
            message: '同意退货成功',
            type: 'success'
          });
          this.info()
          this.kuang_show = false
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

    //移除
    handleRemove(file, fileList) {
      let that = this
      this.fileList_copy.forEach((comm,index) => {
        //编码URL用汉字转URL编码
        var str = encodeURIComponent(file.name)
        if(str == encodeURIComponent(comm.name)){
          this.fileList_copy.splice(index,1)
          that.value.fileList_copy.splice(index,1)
        }
      })
    },

     //上传之前
    img_beforeUpload_group (file) {
      console.log(file)
      if ( file.size / 1024 / 1024 > 200) {
        this.$message.error('文件大小不能超过 200MB!');
        this.other_img_upload_err_group = true
        return false
      }
    },
    handlePreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
     //上传
    img_upload_group: function(item) {
      let that = this
      console.log(item)
      
      let fd = new FormData();
      fd.append("file", item.file);
      console.log(item.file)
      console.log(item.file.name)
      upload_img(
        fd
      ).then((res) => {
        if (res.data.err_code == 0) {
          that.dialogImageUrl = res.data.err_msg.url;
          let obj = {
            url:res.data.err_msg.url,
            name:item.file.name
          }
          // if(that.value.diagram.length == 0) {
          //   that.value.diagram = res.data.err_msg.url_list
          // } else {
          //   res.data.err_msg.url_list.forEach(element => {
          //     that.value.diagram.push(element)
          //   })
          // }
          that.value.fileList_copy.push(obj)
          if(!that.value.fileList_copy_p){
            that.value.fileList_copy_p = []
          }
          that.value.fileList_copy_p.push(res.data.err_msg.url)
          // console.log("fileList")
          // setTimeout(() => {
          //   console.log(that.fileList)
          // },1000)
          // console.log("img")
          
          // this.dialogVisible = true;
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
      console.log(item);
    },

    upload_group_img () {
      let that = this
      that.value.fileList_copy_p = []
      if(this.value.fileList_copy.length > 0) {
        that.show_write_loading = true
        let params = new FormData();
        this.$refs.upload.submit();
        this.value.fileList_copy.forEach((item,i)=>{
          params.append(`file[${i}]`,item)
        })
        uploadImages(
          params
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) { 
              that.fileList = []
              that.value.fileList_copy = []
              that.value.fileList_copy_p = res.data.err_msg.url_list
              that.show_write_loading = false
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
      } else {
        that.$message({
          message: '请选择要上传的文件',
          type: 'warning'
        });
      }
    },

    //确认填写运单号
    sure_write () {
      let that = this
      let express_company = ''
      let express_code = ''
      if (that.form_adderess_p.express == '') {
        that.$message({
          message: '请选择快递公司',
          type: 'warning'
        });
        return
      }
      if (that.form_adderess_p.ydh == '') {
        that.$message({
          message: '请填写运单号',
          type: 'warning'
        });
        return
      }
      if (that.value.fileList_copy_p.length == 0) {
        that.$message({
          message: '请上传凭证',
          type: 'warning'
        });
        return
      }
      that.express_list_p.forEach(ele => {
        if(ele.pigcms_id == that.form_adderess_p.express) {
          express_company = ele.name
          express_code = ele.code
        }
      })
      let data = {
          return_id : that.refundInfo.info.return_id,
          express_code : express_code,
          express_company : express_company,
          express_no : that.form_adderess_p.ydh,
          express_images : JSON.stringify(that.value.fileList_copy_p)
        }
        // console.log(that.form_adderess_p)
        // console.log(data)
        // return
      return_express(
        data
      )
      
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.add_remarks_show = false
            that.$message({
              message: '填写成功',
              type: 'success'
            });
            that.write_show = false
            that.info()
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

    //查看物流
    see_express () {
      let that = this
      console.log(that.ppp)
      that.express_show = true
      get_express(
        {
          express_code : that.ppp.express_code,
          express_no : that.ppp.express_no
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.wlList_po = res.data.err_msg.Traces
            if(that.wlList_po.length == 0) {
              that.$message({
                showClose: true,
                message: '暂无物流信息',
                type: 'error'
              });
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
    },

     //查看物流
    see_express_p () {
      let that = this
      console.log(that.ppp)
      that.refund_from_d.express_show_p = true
      get_express(
        {
          express_code : that.refund_from_d.express_code,
          express_no : that.refund_from_d.th_ydh
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.refund_from_d.wlList_po = res.data.err_msg.Traces
            if(that.refund_from_d.wlList_po.length == 0) {
              that.$message({
                showClose: true,
                message: '暂无物流信息',
                type: 'error'
              });
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
    },

    //查看详情
    see_details (index , row) {
      localStorage.setItem("refundId",row.return_id)
      this.$router.push({path:"/order_/refundInfo",query:{product_id:row.return_id}})
    }
  },
};
</script>

<style scoped lang="less">

/deep/ .el-table td, .el-table th.is-leaf{
    border-top: 1px solid #717b90;
    border-bottom:0
}

/deep/ .el-table__body{
  border-bottom: 1px solid #EBEEF5;
}

/deep/ .el-date-editor {
  margin-right: 20px;
}
.seach {
  display: flex;
  /deep/ .el-input {
    width:200px;
    margin: 0 20px 0 10px;
  }
}

.remarks_box {
  /deep/ .el-dialog {
    width: 700px !important;
    height: 520px;
    overflow-y: auto; 
    /deep/ .el-input {
      overflow-y: auto;  /*溢出隐藏*/
      // text-overflow: ellipsis; /*以省略号...显示*/
      // white-space: nowrap;  /*强制不换行*/
    }
  }
}
.remarks_box.active {
  /deep/ .el-dialog {
    width: 700px !important;
    height: auto;
    overflow-y: auto; 
    /deep/ .el-input {
      overflow-y: auto;  /*溢出隐藏*/
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

.details_box  {
  /deep/ .el-dialog {
    width: 1300px !important;
    height: 750px;
    overflow-y: auto;
    background: #eeebeb;
    padding-bottom: 75px;
  }
}

.delivery_box {
  /deep/ .el-dialog {
    width: 1300px !important;
    max-height: 700px;
    overflow-y: auto; 
  }
}

/deep/ .el-tabs.el-tabs--top{
  position: fixed;
  z-index: 100;
  width: 87%;
  background: #fff;
}
/deep/ .seach{
  padding-top: 40px;
}


// /deep/ .el-dialog__body {
//   height: 400px;
//   overflow-y: auto;
//   display: flex;
//   justify-content: space-between;
// }


.seach_copy {
  padding-top:20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width:200px;
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
  margin-top: 10px;
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
// /deep/ .el-button {
//   margin: 0 10px;
// }
/deep/ .goodsindex-list {
  margin-top: 0;
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

.info_class {
  ul {
    li {
      border-bottom: 2px solid #ccc;
      margin-bottom :20px;
      padding-bottom : 20px;
      h5 {
        font-size : 22px;
      }
      p {
        margin-bottom : 10px;
        font-size : 16px;
      }
    }
  }
}
/deep/.el-table .cell{
  overflow: visible;
}
.spanFirst{
  display: inline-block;
  border: 1px solid #ee8f29;
  color: #ee8f29;
  padding: 0 5px;
  border-radius: 7px;
}
.spanSecond{
  display: inline-block;
  border: 1px solid #f00f0f;
  color: #f00f0f;
  padding: 0 5px;
  border-radius: 7px;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color:#fff!important;
}
/deep/ .goodsindex-list .el-table__body tr:last-child{
  border-bottom: 1px solid #717b90;
}
/deep/ .el-table--enable-row-hover .el-table__body:hover tr.active>td{
  background-color:#dce1e8!important;
  // #dce1e8
}

/deep/ .el-table__body, .el-table__footer, .el-table__header{
  border-collapse: collapse;
}
* {
  box-sizing: border-box;
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
        color: #ee8f29;
      }
      display: inline-block;
    }
    .title {
      display: inline-block;
      height: 32px;
      background: #ee8f29;
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
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #ee8f29;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #ee8f29;
  background: #ee8f29;
}
/deep/.el-radio__inner::after {
  width: 8px;
  height: 8px;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #ee8f29 !important;
  background: #ee8f29 !important;
}
/deep/ .el-step__description.is-wait {
  color: #000;
}
/deep/ .el-step__title.is-wait {
  color: #000;
}
/deep/ .el-step__head.is-wait {
  color: #000;
  border-color: #000;
}
/deep/ .el-step__description.is-wait {
  color: #000;
}
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #ee8f29 !important;
  background: #ee8f29 !important;
}
/deep/ .el-radio__inner {
  width: 20px;
  height: 20px;
}
/deep/ .el-radio__label {
  font-size: 15px;
}
.ship {
  min-height: 550px;
  background: #eeebeb;
  padding: 20px 50px;
  .item.item2 {
    padding-bottom: 20px;
  }
  .item {
    width: 100%;
    background: #fff;
    border: 1px solid #bbb;
    padding: 0 20px;
    margin-top: 20px;
    .firm {
      .tex {
        font-size: 19px;
        font-weight: bold;
      }
    }
    .father {
      width: 75%;
      border-right: 1px solid #bbb;
      padding-right: 30px;
    }
    .son {
      width: 25%;
      padding: 20px 0 20px 20px;
      span {
        color: #ee8f29;
        font-size: 18px;
        display: inline-block;
        line-height: 40px;
        padding-left: 10px;
        cursor: pointer;
      }
      img {
        cursor: pointer;
        display: inline-block;
      }
      span.active,
      img.active {
        cursor: no-drop;
      }

      p {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .cont {
      padding: 20px 0;
      .text {
        line-height: 25px;
        font-size: 16px;
      }
      .text.pr {
        padding-right: 30px;
      }
    }
    .tit {
      padding: 10px 0;
      width: 100%;
      span {
        display: block;
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }
}

/deep/ .el-input1 {
  input {
    text-align: center;
    border: none !important;
  }
}
.body {
  min-height: 80vh;
  padding: 50px;
  background: #f5f5f5;
}
/deep/.el-dialog1 {
  .el-dialog {
    overflow-y: auto;
    width: 1300px;
    max-height: 740px;
    background: #eeebeb;
  }
}
/deep/ .textDiv {
  width: 90%;
  margin: 20px auto;
  p {
    color: #9a9b9e;
    line-height: 30px;
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
  background: #ee8f29;
}
/deep/ .el-step__head.is-success {
  border-color: #ee8f29;
}

.tabl {
  width: 90%;
  margin: 20px auto 0;
  border: 1px solid #bbb;
  .tr {
    width: 100%;
    border-bottom: 1px solid #bbb;
    .td {
      color: #727272;
      float: left;
      background: #fff;
      text-align: center;
      border-right: 1px solid #bbb;
      height: 35px;
      line-height: 35px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 15px;
      span.span {
        width: 20px;
        height: 20px;
        display: block;
        border: 1px solid #bbb;
        background: transparent;
        margin: 8px auto;
        border-radius: 50%;
      }
      span.span.active {
        border: 1px solid #ee8f29;
        background: #ee8f29;
      }
    }
    .td:nth-of-type(1) {
      width: 11%;
    }
    .td:nth-of-type(2) {
      width: 11%;
    }
    .td:nth-of-type(3) {
      width: 11%;
    }
    .td:nth-of-type(4) {
      width: 11%;
    }
    .td:nth-of-type(5) {
      width: 22%;
    }
    .td:nth-of-type(6) {
      width: 22%;
    }
    .td:nth-of-type(7) {
      width: 12%;
    }
    .td:last-child {
      border-right: none;
    }
  }
  .tr:last-child {
    border-bottom: none;
  }
  .tr:nth-of-type(1){
    .td{
      color: #000;
    }
  }
}
/deep/.el-step__title.is-success {
  color: #ee8f29;
}
/deep/ .el-step__description.is-success {
  color: #ee8f29;
}
/deep/ .el-step.is-horizontal .el-step__line {
  top: 19px;
}
/deep/ .el-textarea textarea {
  height: 100%;
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
.box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .content{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: relative;
    .kuang{
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 266px;
      margin-top: -300px;
      margin-left: -150px;
      background: #fff;
      border: 5px solid #ee8f29!important;
      border-radius: 30px;
      padding: 50px 35px;
      img{
        margin: 0 auto 30px;
        width: 50px;

      }
      .text{
        margin-bottom: 40px;
      }
    }
  }
}


/deep/.el-dialog__header {
  padding: 0;
}
// /deep/ .teshu .el-dialog__body {
//   padding: 30px 20px!important;
// }
// /deep/ .teshu .el-dialog__header {
//   padding: 20px 20px 10px!important;
// }
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
    background: #fff;
  }
  .tbody {
    background: #fff;
    .div {
      float: left;
      height: 100%;
      span {
        display: block;
        color: #949499;
      }
      .title {
        font-size: 30px;
        color: #ee8f29;
        margin-bottom: 15px;
      }
    }
  }
}
/deep/  .el-table .has-gutter th,
 .el-table .has-gutter tr {
  background: #eeebeb !important;
}
/deep/ .goodsindex-list.active .el-table .has-gutter th,
.goodsindex-list.active .el-table .has-gutter tr {
  background: #fff !important;
}
/deep/ .goodsindex-list.active th,/deep/ .goodsindex-list.active td{
  text-align: center;
}

/deep/ .el-table__body-wrapper {
  overflow-y: auto !important;
}
/deep/ .el-table--border th .cell {
  color: #000;
  font-weight: bold;
}

/deep/ .tables {
  padding: 20px;
  margin-top: 20px;
  background: #fff;
  border: 1px solid #bbb;
  .span {
    float: left;
    margin: 15px 20px 0;
  }
  img {
    width: 50px;
    float: left;
  }
  .el-button {
    padding: 12px 18px;
    margin-top: 10px;
    float: left;
  }
}

/deep/ .jin .el-step.is-horizontal {
  flex-basis: 500px !important;
}
/deep/ .jin .el-steps .el-step.is-horizontal:nth-of-type(3) {
  flex-basis: 100px !important;
}
/deep/ .huo .el-step.is-horizontal {
  flex-basis: 400px !important;
}
/deep/ .huo .el-steps .el-step.is-horizontal:nth-of-type(4) {
  flex-basis: 100px !important;
}
.info {
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  background: #ee8f29;
}
.details_box.pop{
  .tbody{
    width: 90%;
    margin: 20px auto 40px;
    background: #fff;
    border: 1px solid #bbb;
  }
  .title{
    span.lt{
      font-size: 19px;
      font-weight: bold;
      color: #ee8f29;
    }
    span.rt{
      border: 1px solid #f00f0f;
      color: #ee8f29;
      padding: 5px;
      border-radius: 5px;
    }
  }
  
  .goodsindex-list{
    width: 90%;
    margin: 0 auto!important;;
  }
  .title{
    width: 90%;
    margin: 0 auto!important;;
  }
}
/deep/ .details_box.pop .el-table .has-gutter th{
    background: #fff!important;
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
/deep/ .el-textarea__inner{
  min-height:23px!important;
  padding: 0 15px!important;
}
/deep/ .remarks_box.lishi .el-dialog{
  width: 500px!important;
  height: 320px;
    overflow-y: auto;
}
.frame{
  height: 279px;
  padding: 20px;
  overflow-y: auto;
  .items{
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
</style>