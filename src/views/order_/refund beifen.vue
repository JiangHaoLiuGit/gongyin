<template>
  <div class="goodsindex goodsindex2">
    <!-- 待付款订单取消之后为交易关闭 确认收货之后为已收货 点击交易完成之后或系统默认为交易完成-->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="margin-bottom: 20px"
    >
      <el-tab-pane label="全部" name="second"></el-tab-pane>
      <el-tab-pane label="申请退款" name="third"></el-tab-pane>
      <el-tab-pane label="商品待退回" name="six"></el-tab-pane>
      <el-tab-pane label="商家待收货" name="seven"></el-tab-pane>
      <el-tab-pane label="退款成功" name="fourth"></el-tab-pane>
      <el-tab-pane label="退款取消" name="five"></el-tab-pane>
      <el-tab-pane label="商家退款已拒绝" name="eight"></el-tab-pane>
      <el-tab-pane label="退货退款已拒绝" name="nine"></el-tab-pane>
    </el-tabs>
    <div class="seach">
      
    </div>
    <div class="seach_copy">
      <div class="seach_select">
        <!-- <el-select v-model="order_status_value" placeholder="请选择售后状态">
          <el-option
            v-for="item in order_method_value"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <!-- <el-input v-model="pick_value" @keyup.enter.native="pick_seach" style="width:200px" placeholder="请输入订单号"></el-input> -->
        <el-input v-model="refund_search" @keyup.enter.native="pick_seach" style="width:300px" placeholder="订单/售后/三方交易号/收货人/收货人电话"></el-input>
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
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="order_s_list"
          border
          :height="height"
          style="width: 100%"
          stripe
        >
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column label="售后详情">
            <template slot-scope="scope">
              <div>退款金额: {{ scope.row.pro_cost_price}}元</div>
              <div>退款类型: {{ scope.row.method == 1 ? "退货退款" : "仅退款不退货" }}</div>
              <div>售后状态: {{ scope.row.pay_status_p}}</div>
              <div>订单状态：{{ scope.row.order_status_p }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="下单/支付/申请" width="150">
            <template slot-scope="scope">
              <!-- 下单时间 -->
              <div>{{ scope.row.add_time }}</div>
              <!-- 支付时间 -->
              <div>{{ scope.row.paid_time }}</div>
              <!-- 申请时间 -->
              <div>{{ scope.row.dateline }}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单/售后/三方交易单号" width="250">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left">
                  {{ scope.row.order_no }}
                </li>
                <li style="text-align: left">
                  {{ scope.row.return_no }}
                </li>
                <li style="text-align: left">
                  {{ scope.row.third_id }}
                </li>
                <li style="text-align: left">
                  订单金额：{{ scope.row.cost_price }}元
                </li>
                <li style="text-align: left; color: red">
                  支付方式：{{ scope.row.pay_way_p }}
                </li>
                
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="收货人信息">
            <template slot-scope="scope">
              <ul>
                <li style="text-align: left">
                  收货人：{{ scope.row.address_user }}
                </li>
                <li style="text-align: left">
                  手机号：{{ scope.row.address_tel }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="商品名称" width="120">
          </el-table-column>
          <el-table-column label="商品主图" width="120">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.image"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column> -->
          <el-table-column label="商品名称" width="200">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  v-for="(item, index) in scope.row.product_list"
                  :key="index"
                  style="text-align: left;min-height:100px"
                >
                  名称：{{ item.name }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="商品主图" width="120">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  v-for="(item, index) in scope.row.product_list"
                  :key="index"
                  style="text-align: left"
                >
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="item.image"
                    :preview-src-list="[item.image]"
                    fit="cover"
                  ></el-image>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="商品原价/数量/ID">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  v-for="(item, index) in scope.row.product_list"
                  :key="index"
                  style="text-align: left;min-height:100px"
                >
                  <div>商品原价: {{ item.pro_cost_price }}元 </div>
                  <div><span style="color: red">数量: {{item.pro_num}}件</span></div>
                  <div>ID: {{item.product_id}}</div>
                  <!-- <span style="padding:0 2px">/</span>  <span style="padding:0 2px">/</span>  -->
                </li> 
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品规格">
            <template slot-scope="scope">
              <ul class="uls">
                <li
                  v-for="(item, index) in scope.row.product_list"
                  :key="index"
                  style="text-align: left;min-height:100px"
                >
                  {{ item.sku_data == ''?'无': item.sku_data}}
                </li> 
              </ul>
            </template>
          </el-table-column>
          
          
          
          <el-table-column label="操作" width="120" >
            <template slot-scope="scope">
              
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.refund_status == 0 || (scope.row.refund_status == 3 ||scope.row.refund_status == 4)"
                @click="handle_refund(scope.$index, scope.row)"
                >处理</el-button
              >
              <el-button
                size="mini"
                type="success"
                style="margin-top:10px"
                @click="see_details(scope.$index, scope.row)"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    
    <!-- 仅退款弹窗 -->
    
    <el-dialog
      title="退款处理"
      :visible.sync="refund_only_show"
      class="details_box"
    >
      <el-steps
        :active="active_type"
        finish-status="success"
        style="margin-bottom: 20px"
      >
        <el-step title="买家申请仅退款"></el-step>
        <el-step title="卖家处理退款申请"></el-step>
        <el-step title="退款完毕"></el-step>
      </el-steps>
      <div>
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款处理</span>
            </div>
            <div>
              <h2>请处理退款申请</h2>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">请及时联系买家协商退款事宜</li>
                <li style="margin-bottom: 20px">
                  如果您同意退款，将直接退款给买家
                </li>
                <li style="margin-bottom: 20px">
                  如果您拒绝申请，买家可以联系客服
                </li>
                <li style="margin-bottom: 20px">
                  如果您逾期未处理，系统将自动退款给买家
                </li>
              </ul>
            </div>
            <div
              style="text-align: right"
            >
              <el-button
                size="mini"
                type="danger"
                @click="refuse_innerVisible = true"
                >拒绝申请</el-button
              >
              <el-button size="mini" @click="successBtn" type="success">同意退款</el-button>
            </div>
          </el-card>
        </div>
        
        <div style="margin-top: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>订单详情</span>
            </div>
            <div>
              <ul style="font-size: 14px">
                
                <li style="margin-bottom: 20px">
                  买家昵称 : {{ refund_from.address_user }}
                </li>
                <li style="margin-bottom: 20px">
                  订单编号 : {{ refund_from.order_no }}
                </li>
                <li style="margin-bottom:20px;">
                  订单状态 : {{refund_from.order_status}}
                </li>
                <li style="margin-bottom: 20px">
                  成交时间 : {{ refund_from.add_time }}
                </li>
                <li style="margin-bottom: 20px">
                  订单金额 : ￥{{ refund_from.sub_total }}
                </li>
                <li style="margin-bottom: 20px">
                  <!-- ￥{{ refund_from.postage }} -->
                  运费 : ￥{{ refund_from.postage }}
                </li>
                
              </ul>
            </div>
          </el-card>
        </div>
        <div style="margin-top: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款商品信息</span>
            </div>
            <div>
              <ul v-for="(item,index) in refund_from.product_list" :key="index" style="margin-bottom: 20px;">
                <li style="float:left;margin-right:20px">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item.image"
                    fit="cover"
                  ></el-image>
                </li>
                <li style="line-height:25px">
                  商品名称 : {{ item.name }}
                </li>
                <li style="line-height:25px">
                  商品规格 : {{ item.sku_data }}
                </li>
                <li style="line-height:25px">
                  单价 : ￥{{ item.pro_cost_price }}
                </li>
                <li style="line-height:25px">
                  商品数量 : {{ item.pro_num }}
                </li>
              </ul>
            </div>
          </el-card>
        </div>
        <div style="margin-top: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款详情</span>
            </div>
            <div>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">
                  售后编号 : {{ refund_from.return_no }}
                </li>
                <li style="margin-bottom: 20px">
                  退款金额 : ￥{{ refund_from.refund_money }}
                </li>
                <li style="margin-bottom: 20px">
                  货物状态 : {{ refund_from.product_status }}
                </li>
                <li style="margin-bottom: 20px">退款类型 : {{refund_row.method == 1 ?'退货退款':'仅退款'}}</li>
                <li style="margin-bottom: 20px">
                  退款原因 : {{ refund_from.type }}
                </li>
                <li style="margin-bottom: 20px">
                  补充描述 : {{ refund_from.content }}
                </li>
                <li style="margin-bottom: 20px">凭证 :</li>
                <li
                  style="margin-bottom: 20px"
                  v-show="refund_from.images.length > 0"
                >
                  <ul>
                    <li
                      v-for="(item, index) in refund_from.images"
                      :key="index"
                    >
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="item"
                        fit="cover"
                        :preview-src-list="[item]"
                      ></el-image>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 拒绝申请弹窗 -->
      <el-dialog
        width="30%"
        title="拒绝申请"
        class="remarks_box"
        :visible.sync="refuse_innerVisible"
        append-to-body
      >
        <el-form :model="form_refuse">
          <el-form-item
            label="拒绝原因："
            :label-width="remarks_formLabelWidth"
          >
            <el-input
              style="width: 300px"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_refuse.remarks"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refuse_innerVisible = false">取消</el-button>
          <el-button type="primary" @click="sure_refuse('1')">确认</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <!-- 退款退货弹窗 -->
    <el-dialog
      title="退款处理"
      :visible.sync="reimburse_show"
      class="details_box"
    >
      <el-steps
        :active="active_type"
        finish-status="success"
        style="margin-bottom: 20px"
      >
        <el-step title="买家申请退货退款"></el-step>
        <el-step title="卖家处理退货申请"></el-step>
        <el-step title="买家退货"></el-step>
        <el-step title="退款完毕"></el-step>
      </el-steps>
      <div>
        <!-- refund_row.refund_status -->
        <!-- 同意退货。拒绝退货 -->
        
        <div v-if="refund_row.refund_status == 0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款处理</span>
            </div>
            <div>
              <h2>请处理退货申请</h2>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">
                  如果您同意，请点击"同意退货"，将正确地址给买家
                </li>
                <li style="margin-bottom: 20px">
                  如果您逾期未处理申请，视作同意买家申请，系统会自动将当前交易的退货地址发给买家
                </li>
              </ul>
            </div>
            <div
              style="text-align: right"
            >
              <el-button
                size="mini"
                type="danger"
                
                @click="open_inner('2')"
                >拒绝申请</el-button
              >
              <el-button size="mini" type="success" @click="agree_to_return"
                >同意退货</el-button
              >
            </div>
          </el-card>
        </div>

        <!-- 填写物流单号 -->
        <div v-else-if="refund_row.refund_status == 3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款处理</span>
              
            </div>
            <div>
              <h2>请等待买家退货</h2>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">
                  收到买家退款时，请验货后同意退款
                </li>
                <li style="margin-bottom: 20px">
                  如果买家在超时结束前未退货，退货申请将自动关闭
                </li>
              </ul>
            </div>
            <div
              style="text-align: right"
            >
              <el-button size="mini" type="success" @click="write_show = true"
                >添加买家退货运单号</el-button
              >
            </div>
          </el-card>
        </div>

        <!-- 确认收货、拒绝退款 -->
        <div v-else-if="refund_row.refund_status == 4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款处理</span>
            </div>
            <div>
              <h2>请确认收货</h2>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">
                  买家已退货，收到买家退货时，请验货后退款
                </li>
                <li style="margin-bottom: 20px">
                  如果拒绝退款，请填写拒绝原因
                </li>
              </ul>
            </div>
            <div
              style="text-align: right"
            >
              <el-button
                size="mini"
                type="primary"
                v-show="express_show == false"
                @click="see_express"
                >查看物流</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="open_inner('3')"
                >拒绝退款</el-button
              >
              <el-button size="mini" @click="successBtn1" type="success"
                >确认收货，同意退款</el-button
              >
            </div>

            <el-row
              :gutter="20"
              class="goodsindex-list"
              v-show="express_show == true"
            >
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
          </el-card>
        </div>

        <div style="margin-top: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>订单详情</span>
            </div>
            <div>
              
              <ul style="font-size: 14px">
                
                <li style="margin-bottom: 20px">
                  买家昵称 : {{ reimburse.address_user }}
                </li>
                <li style="margin-bottom: 20px">
                  订单编号 : {{ reimburse.order_no }}
                </li>
                <li style="margin-bottom:20px;">
                  订单状态 : {{reimburse.order_status}}
                </li>
                <li style="margin-bottom: 20px">
                  成交时间 : {{ reimburse.add_time }}
                </li>
                <li style="margin-bottom: 20px">
                  订单总额 : ￥{{ reimburse.sub_total }}
                </li>
                <li style="margin-bottom: 20px">
                  <!-- ￥{{ refund_from.postage }} -->
                  运费 : ￥{{ reimburse.postage }}
                </li>
                
              </ul>
            </div>
          </el-card>
        </div>

        <div style="margin-top: 20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>退款详情</span>
            </div>
            <div>
              <ul v-for="(item,index) in reimburse.product_list" :key="index" style="margin-bottom: 20px;">
                <li style="float:left;margin-right:20px">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item.image"
                    fit="cover"
                  ></el-image>
                </li>

                <li style="line-height:25px">
                  商品名称 : {{ item.name }}
                </li>
                <li style="line-height:25px">
                  商品规格 : {{ item.sku_data }}
                </li>
                <li style="line-height:25px">
                  单价 : ￥{{ item.pro_cost_price }}
                </li>
                <li style="line-height:25px">
                  商品数量 : {{ item.pro_num }}
                </li>
              </ul>
              <ul style="font-size: 14px">
                <li style="margin-bottom: 20px">
                  售后编号 : {{ reimburse.return_no }}
                </li>
                <li style="margin-bottom: 20px">
                  退款金额 : ￥{{ reimburse.refund_money }}
                </li>
                <li style="margin-bottom: 20px">
                  货物状态 : {{ reimburse.product_status }}
                </li>
                <li style="margin-bottom: 20px">退款类型 : {{refund_row.method == 1 ?'退货退款':'仅退款'}}</li>
                <li style="margin-bottom: 20px">
                  退款原因 : {{ reimburse.type }}
                </li>
                <li style="margin-bottom: 20px">
                  补充描述 : {{ reimburse.content }}
                </li>
                <li style="margin-bottom: 20px">凭证 :</li>
                <li
                  style="margin-bottom: 20px"
                  v-show="reimburse.images.length > 0"
                >
                  <ul>
                    <li
                      v-for="(item, index) in reimburse.images"
                      :key="index"
                    >
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="item"
                        fit="cover"
                        :preview-src-list="[item]"
                      ></el-image>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 拒绝弹窗 -->
      <el-dialog
        width="30%"
        title="拒绝申请"
        class="remarks_box"
        :visible.sync="reimburse_innerVisible"
        append-to-body
      >
        <el-form :model="form_refuse">
          <el-form-item
            label="拒绝原因："
            :label-width="remarks_formLabelWidth"
          >
            <el-input
              style="width: 300px"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="form_refuse.remarks"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="原因(选填)："
            v-if="innerType == 3"
            :label-width="remarks_formLabelWidth"
          >
          <!-- 测试 -->
            <!-- <el-button size="small" type="primary" @click="upload_group_img"
              >上传文件</el-button
            >
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :file-list="fileList"
              :on-remove="handleRemove"
              :http-request="img_upload_group"
              :before-upload="img_beforeUpload_group"
              :auto-upload="true"
            >
              <el-button size="small" type="primary">选取文件</el-button>
            </el-upload> -->
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
        
        <!-- <div v-if="value.fileList_copy_p.length > 0 && innerType == 3" class="clearfix" style="padding-left:100px">
          <div v-for="(item,index) in value.fileList_copy_p" style="width:100px;height:100px;position:relative;float:left;margin-right:10px" :key="index">
            <el-image
              style="width: 100px; height: 100px"
              :src="item"
              fit="cover"
            ></el-image>
            <el-button type="danger" style="position:absolute;top:0;right:0" icon="el-icon-delete" @click="delete value.fileList_copy_p.splice(index,1)" circle></el-button>
          </div>
        </div> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="reimburse_innerVisible = false">取消</el-button>
          <el-button type="primary" v-if="innerType == 3" @click="sure_refuse('3')">确认</el-button>
          <el-button type="primary" v-else @click="sure_refuse('2')">确认</el-button>
          
        </div>
      </el-dialog>

      <!-- 地址填写弹窗 -->
      <el-dialog
        width="30%"
        title="收件信息"
        class="remarks_box"
        :visible.sync="agree_to_return_show"
        append-to-body
      >
        <h3>默认收件人信息</h3>
        <p style="margin-bottom: 10px">
          收货人 : {{ delivery_from.address_user }}
        </p>
        <p style="margin-bottom: 10px">
          收货人手机号 : {{ delivery_from.address_tel }}
        </p>
        <p style="margin-bottom: 10px">地址 : {{ delivery_from.address }}</p>
        <p>
          <el-button
            size="mini"
            type="success"
            style="margin-left:0;"
            v-show="form_adderess_show == false"
            @click="form_adderess_show = true"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="success"
            style="margin-left:0;"
            v-show="form_adderess_show == true"
            @click="form_adderess_show = false"
            >取消</el-button
          >
          <span style="color:#67c23a;">如果开启取表单的值.关闭取默认收件人信息</span>
        </p>
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
          <el-form-item label="手机号：" :label-width="remarks_formLabelWidth">
            <el-input
              v-model="form_adderess.tel"
              placeholder="请输入手机号"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="省：" :label-width="remarks_formLabelWidth">
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
          </el-form-item>
          <el-form-item
            label="市："
            :label-width="remarks_formLabelWidth"
            v-show="city_ifShow"
          >
            <el-select v-model="form_adderess.cityValue" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :key="item.city_id"
                :label="item.name"
                :value="item.city_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="区："
            :label-width="remarks_formLabelWidth"
            v-show="area_ifShow"
          >
            <el-select v-model="form_adderess.areaValue" placeholder="请选择区">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="agree_to_return_show = false">取消</el-button>
          <el-button type="primary" @click="sure_address">确认</el-button>
        </div>
      </el-dialog>

      <!-- 物流信息填写弹窗 -->
      <el-dialog
        width="30%"
        title="运单号填写"
        class="remarks_box"
        :visible.sync="write_show"
        append-to-body
      >
        <el-form :model="form_adderess_p" v-loading="show_write_loading">
          <el-form-item
            label="快递公司："
            :label-width="remarks_formLabelWidth"
          >
            <el-select
              v-model="form_adderess_p.express"
              placeholder="请选择快递公司"
            >
              <el-option
                v-for="item in express_list_p"
                :key="item.pigcms_id"
                :label="item.name"
                :value="item.pigcms_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运单号：" :label-width="remarks_formLabelWidth">
            <el-input
              v-model="form_adderess_p.ydh"
              placeholder="请输入运单号"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="运费(￥)："
            :label-width="remarks_formLabelWidth"
          >
            <el-input
              v-model="form_adderess_p.yf"
              placeholder="请输入运费"
            ></el-input>
          </el-form-item> -->
          <el-form-item
            label="凭证(必填)："
            :label-width="remarks_formLabelWidth"
          >
            
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
        <!-- <div v-if="value.fileList_copy_p.length > 0" class="clearfix" style="padding-left:100px">
          <div v-for="(item,index) in value.fileList_copy_p" style="width:100px;height:100px;position:relative;float:left;margin-right:10px" :key="index">
            <el-image
              style="width: 100px; height: 100px"
              :src="item"
              fit="cover"
            ></el-image>
            <el-button type="danger" style="position:absolute;top:0;right:0" icon="el-icon-delete" @click="value.fileList_copy_p.splice(index,1)" circle></el-button>
          </div>
        </div> -->
        <div
          slot="footer"
          class="dialog-footer"
        >
        <!-- v-show="value.fileList_copy_p.length != 0" -->
          <el-button @click="write_show = false">取消</el-button>
          <el-button type="primary" @click="sure_write">确认</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog
      title="售后详情"
      :visible.sync="refund_details_show"
      class="details_box"
    >
      <div style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>退款详情</span>
          </div>
          
          <div>
            <ul style="font-size: 14px">
              <li style="margin-bottom: 20px;">
                售后状态 : {{ refund_from_d.return_status_p }}
              </li>
              <li style="margin-bottom: 20px;">
                退货用户 : {{ refund_from_d.address_user }}
              </li>
              <li style="margin-bottom: 20px;">
                退款类型 : {{ refund_from_d.type_p }}
              </li>
              <li style="margin-bottom: 20px">
                退款原因 : {{ refund_from_d.type }}
              </li>
              <li style="margin-bottom: 20px;">
                货物状态 : {{ refund_from_d.product_status }}
              </li>
              <li style="margin-bottom: 20px">
                退货说明 : {{ refund_from_d.content }}
              </li>
              <li style="margin-bottom: 20px">凭证 : <span v-if="refund_from_d.images.length == 0 || refund_from_d.images == false">无</span></li>
              <li
                style="margin-bottom: 20px"
                v-if="refund_from_d.images.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, index) in refund_from_d.images"
                    :key="index"
                  >
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item"
                      fit="cover"
                      :preview-src-list="[item]"
                    ></el-image>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <div style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审核信息</span>
          </div>
          <div>
            <ul style="font-size: 14px">
              <li style="margin-bottom: 20px">
                收货人 : {{ refund_from_d.th_name }}
              </li>
              <li style="margin-bottom: 20px">
                收货人手机号 : {{ refund_from_d.th_tel }}
              </li>
              <li style="margin-bottom: 20px">
                收货地址 : {{ refund_from_d.th_address }}
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <div
        style="margin-top: 20px"
        v-show="refund_from_d.type_p == '退货退款'"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>买家退货物流信息</span>
            <span></span>
          </div>
          <div>
            <ul style="font-size: 14px">
              <li style="margin-bottom: 20px" v-if="refund_from_d.refund_status == 1 || refund_from_d.refund_status == 4 || refund_from_d.refund_status == 6">
                买家 : {{ refund_from_d.shr }}
              </li>
              <li style="margin-bottom: 20px" v-if="refund_from_d.refund_status == 1 || refund_from_d.refund_status == 4 || refund_from_d.refund_status == 6">
                买家手机号 : {{ refund_from_d.shr_tel }}
              </li>
              <li style="margin-bottom: 20px" v-if="refund_from_d.refund_status == 1 || refund_from_d.refund_status == 4 || refund_from_d.refund_status == 6">
                买家地址 : {{ refund_from_d.shr_address }}
              </li>
              <li style="margin-bottom: 20px">
                退款金额 : ￥{{ refund_from_d.refund_money }}
              </li>
              <li style="margin-bottom: 20px">
                快递公司 : {{ refund_from_d.th_company }}
              </li>
              <li style="margin-bottom: 20px">
                运单号 : {{ refund_from_d.th_ydh }}
              </li>
              
            </ul>
          </div>
          <el-button
            size="mini"
            type="primary"
            v-show="refund_from_d.express_show_p == false"
            @click="see_express_p"
            >查看物流</el-button
          >
          <el-row
            :gutter="20"
            class="goodsindex-list"
            v-show="refund_from_d.express_show_p == true"
          >
            <el-col :span="24">
              <el-table
                ref="multipleTable"
                :data="refund_from_d.wlList_po"
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
        </el-card>
      </div>
      <div style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>退货相关</span>
          </div>
          <div>
            <ul style="font-size: 14px">
              <!-- 缺个地址 -->
              <li style="margin-bottom: 20px; color: red">
                售后编号 : {{ refund_from_d.return_no }}
              </li>
              <li style="margin-bottom: 20px; color: red">
                退款金额 : {{ refund_from_d.refund_money }}
              </li>
              <li style="margin-bottom: 20px; color: red">
                退货申请时间 : {{ refund_from_d.dateline }}
              </li>
              <li style="margin-bottom: 20px; color: red" v-if="refund_from_d.refund_time != '---'">
                退款处理时间 : {{ refund_from_d.refund_time }}
              </li>
              <li style="margin-bottom: 20px; color: red" v-if="refund_from_d.refund_status != 0 && refund_from_d.refund_status != 2">
                退款处理 : 
                <span v-if="refund_from_d.refund_status == 1 || refund_from_d.refund_status == 3 || refund_from_d.refund_status == 4">平台退款</span>
                <span v-else-if="refund_from_d.refund_status == 5 || refund_from_d.refund_status == 6">商家拒绝退款</span>
              </li>
              <li style="margin-bottom: 20px; color: red" v-if="refund_from_d.refund_status == 5 || refund_from_d.refund_status == 6">
                拒绝原因 : {{ refund_from_d.store_content }}
              </li>
            </ul>
          </div>
        </el-card>
      </div>
       <div style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>退款商品信息</span>
          </div>
          <div>
            <ul v-for="(item,index) in refund_from_d.product_list" :key="index" style="margin-bottom: 20px;">
              <li style="float:left;margin-right:20px">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.product_image"
                  fit="cover"
                ></el-image>
              </li>

              <li style="line-height:25px">
                商品名称 : {{ item.product_name }}
              </li>
              <li style="line-height:25px">
                商品规格 : {{ item.sku_data }}
              </li>
              <li style="line-height:25px">
                单价 : ￥{{ item.pro_cost_price }}
              </li>
              <li style="line-height:25px">
                商品数量 : {{ item.pro_num }}
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <div>
      <div style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单详情</span>
          </div>
          <div>
            
            <ul style="font-size: 14px">
              <li style="margin-bottom: 20px; ">
                订单编号 : {{ refund_from_d.order_no }}
              </li>
              <li style="margin-bottom: 20px">
                订单金额 : ￥{{ refund_from_d.cost_price }}
              </li>
              <li style="margin-bottom: 20px">
                支付时间 : {{ refund_from_d.paid_time }}
              </li>
              <li style="margin-bottom:20px;">
                订单状态 : {{refund_from_d.order_status}}
              </li>
              <li style="margin-bottom: 20px; ">
                售后单号 : {{ refund_from_d.return_no }}
              </li>
              <li style="margin-bottom: 20px; ">
                支付方式 : {{ refund_from_d.pay_way }}
              </li>
              <li style="margin-bottom: 20px">
                售后运费 : ￥{{ refund_from_d.postage }}
              </li>
            </ul>
            
          </div>
        </el-card>
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
import publicFile from '../../utils/publicFile'
import {
  refund_list,
  refund_info,
  refuse_apply,
  default_address,
  get_province,
  get_city,
  get_area,
  refuse_agree,
  uploadImages,
  express_list,
  return_express,
  get_express,
  return_order_info,
  return_agree,
  upload_img 
} from "../../utils/axios";
export default {
  data() {
    return {
      imgList:[],//组图参数
      fileList:[],//组图参数
      dialogImageUrl:"",
      dialogVisible:false,
      order_s_list: [], //订单列表
      loading: false,
      remarks_formLabelWidth: "100px",
      fn1: this.commonJs.Debounce(this.get_order_list),
      add_remarks_show: false,
      O_message: {},
      queryInfo: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      pick_condition: "",
      pick_value: "",
      refund_search:"",//订单号搜索
      pageSize: 20,
      time_value: "",
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
      height:"",
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
      activeName: "second",
      refund_only_show: false,
      refuse_innerVisible: false,
      refund_from: {
        refund_time: "", //退款处理时间
        product_name: "", //商品名称
        product_image: "", //商品主图
        sku_data: "", //商品规格
        address_user: "", //买家昵称
        order_no: "", //订单号
        add_time: "", //成交时间-订单时间
        pro_price: "", //商品单价
        postage: "", //邮费
        sub_total: "", //商品金额（不含邮费）
        return_no: "", //退货单号-售后编号
        refund_money: "", //申请退款金额
        product_status: "", //货物状态 买家是否收到货 1未收到 2收到
        type: "", //退货类型-退款原因
        content: "", //用户的退货说明-补充说明
        pro_num: "", //订单中 商品数量
        images: [],
        videos: [],
        
      },
      timer: null,
      timer_p: 0,
      form_refuse: {
        remarks: "",
      },
      refund_row: {},

      reimburse_show: false,
      reimburse_innerVisible: false,
      reimburse: {
        refund_time: "", //退款处理时间
        product_list: "", //商品列表
        address_user: "", //买家昵称
        order_no: "", //订单号
        add_time: "", //成交时间-订单时间
        postage: "", //邮费
        sub_total: "", //商品金额（不含邮费）
        return_no: "", //退货单号-售后编号
        refund_money: "", //申请退款金额
        product_status: "", //货物状态 买家是否收到货 1未收到 2收到
        type: "", //退货类型-退款原因
        content: "", //用户的退货说明-补充说明
        pro_num: "", //订单中 商品数量
        images: [],
        videos: [],
        refund_status: "",
        express_code: "",
      },

      agree_to_return_show: false,
      form_adderess: {
        name: "",
        tel: "",
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        mark: "",
      },
      provinceList: [], //省
      cityList: [], //市
      city_ifShow: false,
      areaList: [], //区
      area_ifShow: false,
      form_adderess_show: false,
      delivery_from: {
        address_user: "",
        address_tel: "",
        address: "",
      },
      address_p: {},
      write_show: false,
      fileList: [],
      other_img_upload_err_group: false,
      value: {
        fileList_copy: [],
        fileList_copy_p: [],
      },
      form_adderess_p: {
        express: "",
        ydh: "",
        yf: "",
      },
      express_list_p: [],
      show_write_loading: false,
      express_show: false,
      wlList_po: [],
      active_type: 0,
      ppp: [],
      refund_details_show: false,
      refund_from_d: {
        refund_time: "", //退款处理时间
        product_name: "", //商品名称
        product_image: "", //商品主图
        sku_data: "", //商品规格
        address_user: "", //买家昵称
        order_no: "", //订单号
        add_time: "", //成交时间-订单时间
        pro_price: "", //商品单价
        postage: "", //邮费
        sub_total: "", //商品金额（不含邮费）
        return_no: "", //退货单号-售后编号
        refund_money: "", //申请退款金额
        product_status: "", //货物状态 买家是否收到货 1未收到 2收到
        type: "", //退货类型-退款原因
        content: "", //用户的退货说明-补充说明
        pro_num: "", //订单中 商品数量
        images: [],
        videos: [],
        pay_way: "", //支付方式
        return_status_p: "", //售后状态
        shr: "", //收货人
        shr_tel: "", //收货人手机号
        shr_address: "", //收货人地址
        s_reason: "", //拒绝原因
        th_name: "", //退货——收货人
        th_tel: "", //收货人手机号
        th_address: "", //地址
        th_company: "", //快递公司
        th_ydh: "", //运单号
        express_show_p: false,
        wlList_po: [],
        y_name: "", //运营商名称
        y_lxr: "", //运营商联系人
        y_tel: "", //运营商电话
        express_code: "",
        type_p: "",
      },
      top_status:"-1",
      innerType:"",//拒绝退货退款的情况
    };
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
    if (this.$route.query.order_no) {
      this.refund_search = this.$route.query.order_no;
      this.pick_seach();
    }else if (this.$route.query.return_no) {
      this.pick_value = this.$route.query.return_no;
      this.pick_seach();
    } else {
      this.get_order_list();//获取全部订单列表
    }
    this.get_province(); //获取省份
    this.get_express_list(); //获取物流公司列表
    this.height = document.body.clientHeight - 300
  },

  methods: {
    open_inner(index){
      this.reimburse_innerVisible = true
      this.innerType = index
    },
    get_express_list() {
      let that = this;
      express_list()
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.express_list_p = res.data.err_msg.list;
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

    // 获取省
    get_province() {
      let that = this;
      get_province().then((res) => {
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
      let request_form = {
        page_size: 20,
        page: 1,
        top_status: status,
      };
      that.loading = true;
      that.payment_status_value = "";
      that.time_type = "";
      that.time_value = "";
      that.pick_condition = "";
      that.pick_value = "";
      that.refund_search = ''

      refund_list(request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            res.data.err_msg.list.forEach((element) => {
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
            });
            that.order_s_list = res.data.err_msg.list;
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
      that.pick_status = -1;
      that.loading = true;
      that.payment_status_value = "";
      that.time_type = "";
      that.time_value = "";
      that.pick_condition = "";
      that.pick_value = "";
      that.refund_search = ''
      let request_form = {
        page: 1,
        page_size: 20,
        top_status:-1
      };
      refund_list(request_form)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            
            res.data.err_msg.list.forEach((element) => {
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
            });
            that.order_s_list = res.data.err_msg.list;
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
      refund_list({
        page: page,
        page_size: number,
        top_status: that.pick_status,
        return_no: that.pick_value,
        status:that.pick_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            res.data.err_msg.list.forEach((element) => {
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
            });
            that.order_s_list = res.data.err_msg.list;
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
    //导出
    user_derive_excel1() {
      let that = this;
      console.log(this.time_value);
      if (this.pick_value == "" && this.time_value == "" && that.refund_search == '') {
        that.$message({
          message: "请选择任意一种搜索条件",
          type: "warning",
        });
        return;
      }
      that.order_s_list = []
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      refund_list({
        page: 1,
        page_size: this.pageSize,
        top_status: that.pick_status,
        return_no: that.pick_value,
        status:that.pick_status,
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
              var time1 = "";
              var time2 = "";
              if (this.time_value != "") {
                time1 = this.commonJs.dataTime(this.time_value[0]);
                time2 = this.commonJs.dataTime(this.time_value[1]);
              }
              window.open(publicFile.address + "/store_admin.php?c=return&a=return_derive_excel&top_status="+ that.pick_status 
              +"&return_no="+ that.pick_value +"&search="+ that.refund_search 
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
      console.log(this.time_value);
      if (this.pick_value == "" && this.time_value == "" && that.refund_search == '') {
        that.$message({
          message: "请选择任意一种搜索条件",
          type: "warning",
        });
        return;
      }
      that.order_s_list = []
      var time1 = "";
      var time2 = "";
      if (this.time_value != "") {
        time1 = this.commonJs.dataTime(this.time_value[0]);
        time2 = this.commonJs.dataTime(this.time_value[1]);
      }
      refund_list({
        page: 1,
        page_size: this.pageSize,
        top_status: that.pick_status,
        return_no: that.pick_value,
        status:that.pick_status,
        search:that.refund_search,
        start_time: time1,
        end_time: time2,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((element) => {
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
            });
            that.order_s_list = res.data.err_msg.list;
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
    //仅退款同意
    successBtn(){
      let that = this
      let data = {
        return_id: this.refund_row.return_id,
      }
      console.log(this.refund_row.return_id)
      console.log(data)
      
     return_agree({
        params: {
          id: this.refund_row.return_id
        }
      }).then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.refund_only_show = false
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "success",
            });
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
    //退货退款同意
    successBtn1(){
      let that = this
      let data = {
        return_id: this.refund_row.return_id,
      }
      console.log(data)
      return_agree({
        params: {
          id: this.refund_row.return_id
        }
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.reimburse_show = false;
            that.get_order_list();
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "success",
            });
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
    handle_refund(index, row) {
      console.log(row)
      let that = this;
      let refund_time = "";
      let day = 0;
      let hour = 0;
      let second = 0;
      that.refund_row = row;
      
      that.ppp = [];
      //scope.row.method == 1 ? '退货退款' : '仅退款不退货'
      if (row.method == 2) {
        if (row.refund_status == 0) {
          //申请中
          that.active_type = 0;
        } else{
          //退货完成
          that.active_type = 2;
        }
        this.refund_only_show = true;
        that.refund_from = {};
        that.refund_from = {
          refund_time: "", //退款处理时间
          product_name: "", //商品名称
          product_image: "", //商品主图
          sku_data: "", //商品规格
          address_user: "", //买家昵称
          order_no: "", //订单号
          add_time: "", //成交时间-订单时间
          pro_price: "", //商品单价
          postage: "", //邮费
          sub_total: "", //商品金额（不含邮费）
          return_no: "", //退货单号-售后编号
          refund_money: "", //申请退款金额
          product_status: "", //货物状态 买家是否收到货 1未收到 2收到
          type: "", //退货类型-退款原因
          content: "", //用户的退货说明-补充说明
          pro_num: "", //订单中 商品数量
          images: [],
          videos: [],
        };
        let data = {
          return_id: row.return_id,
        }
        console.log(row.return_id)
        console.log()
        return_order_info(data)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              res.data.err_msg = res.data.err_msg.info
              if (res.data.err_msg.type == 1) {
                res.data.err_msg.type = "买/卖双方协商一致";
              } else if (res.data.err_msg.type == 2) {
                res.data.err_msg.type = "买错/多买/不想要";
              } else if (res.data.err_msg.type == 3) {
                res.data.err_msg.type = "商品质量问题";
              } else if (res.data.err_msg.type == 4) {
                res.data.err_msg.type = "未到货品";
              } else if (res.data.err_msg.type == 5) {
                res.data.err_msg.type = "其它";
              } else {
                res.data.err_msg.type = "未知";
              }

              if (res.data.err_msg.product_status == 1) {
                res.data.err_msg.product_status = "未收到";
              } else if (res.data.err_msg.product_status == 2) {
                res.data.err_msg.product_status = "收到";
              } else {
                res.data.err_msg.product_status = "未知";
              }
              if (res.data.err_msg.order_status == 1) {
                res.data.err_msg.order_status = "待支付";
              } else if (res.data.err_msg.order_status == 2) {
                res.data.err_msg.order_status = "待发货";
              }else if (res.data.err_msg.order_status == 3) {
                res.data.err_msg.order_status = "待收货";
              }else if (res.data.err_msg.order_status == 4) {
                res.data.err_msg.order_status = "已完成";
              }else if (res.data.err_msg.order_status == 5) {
                res.data.err_msg.order_status = "已取消";
              }else if (res.data.err_msg.order_status == 7) {
                res.data.err_msg.order_status = "待完成";
              } else {
                res.data.err_msg.order_status = "未知";
              }
              that.refund_from = {};
              that.refund_from = {
                
                refund_time: refund_time, //退款处理时间
                product_list: res.data.err_msg.product_list, //商品列表
                product_image: res.data.err_msg.product_image, //商品主图
                sku_data: res.data.err_msg.sku_data, //商品规格
                address_user: res.data.err_msg.nickname, //买家昵称
                order_no: res.data.err_msg.order_no, //订单号
                order_status: res.data.err_msg.order_status, //订单状态
                add_time: that.commonJs.timestampToTime(
                  res.data.err_msg.paid_time
                ), //成交时间-订单时间
                pro_price: res.data.err_msg.pro_price, //商品单价
                postage: res.data.err_msg.postage, //邮费
                sub_total: res.data.err_msg.cost_price, //商品金额（不含邮费）
                return_no: res.data.err_msg.return_no, //退货单号-售后编号
                refund_money: res.data.err_msg.pro_cost_price, //申请退款金额
                product_status: res.data.err_msg.product_status, //货物状态 买家是否收到货 1未收到 2收到
                type: res.data.err_msg.type, //退货类型-退款原因
                content: res.data.err_msg.content, //用户的退货说明-补充说明
                pro_num: res.data.err_msg.pro_num, //订单中 商品数量
                images: res.data.err_msg.express_images,
                videos: res.data.err_msg.videos,
              };
              that.ppp = res.data.err_msg;
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
      } else {
        if (row.refund_status == 0) {
          //申请中
          that.active_type = 1;
        } else{
          //退货完成
          that.active_type = 2;
        }
        this.reimburse_show = true;
        that.express_show = false;
        that.reimburse_innerVisible = false;
        that.agree_to_return_show = false;
        that.write_show = false;
        that.wlList_po = [];
        that.reimburse = {};
        that.reimburse = {
          refund_time: "", //退款处理时间
          product_list: "", //商品名列表
          address_user: "", //买家昵称
          order_no: "", //订单号
          add_time: "", //成交时间-订单时间
          postage: "", //邮费
          sub_total: "", //商品金额（不含邮费）
          return_no: "", //退货单号-售后编号
          refund_money: "", //申请退款金额
          product_status: "", //货物状态 买家是否收到货 1未收到 2收到
          type: "", //退货类型-退款原因
          content: "", //用户的退货说明-补充说明
          pro_num: "", //订单中 商品数量
          images: [],
          videos: [],
          refund_status: "",
        };
        let data = {
          return_id: row.return_id,
        }
        console.log(data)
        return_order_info(data)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              res.data.err_msg = res.data.err_msg.info
              if (res.data.err_msg.type == 1) {
                res.data.err_msg.type = "买/卖双方协商一致";
              } else if (res.data.err_msg.type == 2) {
                res.data.err_msg.type = "买错/多买/不想要";
              } else if (res.data.err_msg.type == 3) {
                res.data.err_msg.type = "商品质量问题";
              } else if (res.data.err_msg.type == 4) {
                res.data.err_msg.type = "未到货品";
              } else if (res.data.err_msg.type == 5) {
                res.data.err_msg.type = "其它";
              } else {
                res.data.err_msg.type = "未知";
              }

              if (res.data.err_msg.product_status == 1) {
                res.data.err_msg.product_status = "未收到";
              } else if (res.data.err_msg.product_status == 2) {
                res.data.err_msg.product_status = "收到";
              } else {
                res.data.err_msg.product_status = "未知";
              }
              if (res.data.err_msg.order_status == 1) {
                res.data.err_msg.order_status = "待支付";
              } else if (res.data.err_msg.order_status == 2) {
                res.data.err_msg.order_status = "待发货";
              }else if (res.data.err_msg.order_status == 3) {
                res.data.err_msg.order_status = "收到";
              }else if (res.data.err_msg.order_status == 4) {
                res.data.err_msg.order_status = "收到";
              }else if (res.data.err_msg.order_status == 5) {
                res.data.err_msg.order_status = "收到";
              }else if (res.data.err_msg.order_status == 6) {
                res.data.err_msg.order_status = "收到";
              }else if (res.data.err_msg.order_status == 7) {
                res.data.err_msg.order_status = "收到";
              } else {
                res.data.err_msg.order_status = "未知";
              }
              that.reimburse = {};
              that.reimburse = {
                refund_time: refund_time, //退款处理时间
                product_list: res.data.err_msg.product_list, //商品列表
                address_user: res.data.err_msg.nickname, //买家昵称
                order_no: res.data.err_msg.order_no, //订单号
                add_time: that.commonJs.timestampToTime(
                  res.data.err_msg.paid_time
                ), //成交时间-订单时间
                order_status: res.data.err_msg.order_status, //订单状态
                postage: res.data.err_msg.postage, //邮费
                sub_total: res.data.err_msg.cost_price, //商品金额（不含邮费）
                return_no: res.data.err_msg.return_no, //退货单号-售后编号
                refund_money: res.data.err_msg.pro_cost_price, //申请退款金额
                product_status: res.data.err_msg.product_status, //货物状态 买家是否收到货 1未收到 2收到
                type: res.data.err_msg.type, //退货类型-退款原因
                content: res.data.err_msg.content, //用户的退货说明-补充说明
                images: res.data.err_msg.express_images,
                videos: res.data.err_msg.videos,
                refund_status: res.data.err_msg.refund_status,
                express_code: res.data.err_msg.express_code,
                
                
              };
              that.ppp = res.data.err_msg;
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
      }
    },

    //确认拒绝
    sure_refuse(index) {
      console.log(index)
      let that = this;
      if (that.form_refuse.remarks == "") {
        that.$message({
          message: "请填写拒绝原因",
          type: "warning",
        });
        return;
      }
      let data = {
        return_id: that.refund_row.return_id,
        store_content: that.form_refuse.remarks,
        type:index,
      }
      
      if(that.innerType != 3){
        
        refuse_apply(
            data
          )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.add_remarks_show = false;
              that.$message({
                message: "拒绝成功",
                type: "success",
              });3
              that.reimburse_innerVisible = false
              that.reimburse_show = false
              that.refund_only_show = false;
              that.refuse_innerVisible = false;
              that.get_order_list();
              that.form_refuse.remarks = ""
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
      }else{
        if(that.value.fileList_copy_p.length>0){
          data.images = JSON.stringify(that.value.fileList_copy_p)
        }
        
        if(that.value.fileList_copy_p.length == 0 && that.value.fileList_copy.length > 0){
          this.$confirm("检测到图片还没有上传, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
              
            refuse_apply(
              data
            ).then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                that.add_remarks_show = false;
                that.$message({
                  message: "拒绝成功",
                  type: "success",
                });
                that.reimburse_innerVisible = false
                that.reimburse_show = false
                that.refund_only_show = false;
                that.refuse_innerVisible = false;
                that.get_order_list();
                that.form_refuse.remarks = ""
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
          })
          .catch(() => {
            
          });
        }else{
          refuse_apply(
            data
          ).then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.add_remarks_show = false;
              that.$message({
                message: "拒绝成功",
                type: "success",
              });
              that.reimburse_innerVisible = false
              that.reimburse_show = false
              that.refund_only_show = false;
              that.refuse_innerVisible = false;
              that.get_order_list();
              that.form_refuse.remarks = ""
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
        }
      }
      
      
      
    },

    //同意退货 获取默认地址
    agree_to_return() {
      let that = this;
      that.form_adderess = {};
      (that.form_adderess = {
        name: "",
        tel: "",
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        mark: "",
      }),
        (that.form_adderess_show = false);
      that.agree_to_return_show = true;
      that.delivery_from = {
        address_user: "",
        address_tel: "",
        address: "",
      };
      console.log({id: that.refund_row.id})
      default_address({
        id: that.refund_row.id,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            // address_user: that.address_p.name,
            // address_tel: that.address_p.phone,
            // address: that.address_p.address.address,
            // province: that.address_p.address.province_id,
            // city: that.address_p.address.city_id,
            // area: that.address_p.address.area_id,
            if (!res.data.err_msg) {
            } else {
              // res.data.err_msg.info.phone = res.data.err_msg.info.tel
              // that.address_p = res.data.err_msg.info;
              // that.delivery_from = {
              //   address_user: res.data.err_msg.info.name,
              //   address_tel: res.data.err_msg.info.phone,
              //   address: "",
              // };
              
              // if(res.data.err_msg.info.province_name&&res.data.err_msg.info.city_name&&res.data.err_msg.info.area_name&&res.data.err_msg.info.address)
              // that.delivery_from.address =
              //   res.data.err_msg.info.province_name +
              //   "、" +
              //   res.data.err_msg.info.city_name +
              //   "、" +
              //   res.data.err_msg.info.area_name +
              //   "、" +
              //   res.data.err_msg.info.address;
              that.address_p = res.data.err_msg.info
              that.delivery_from = {
                address_user : res.data.err_msg.info.name,
                address_tel : res.data.err_msg.info.tel,
                address : '',
              }
              if(res.data.err_msg.info.province_name && res.data.err_msg.info.city_name && res.data.err_msg.info.area_name && res.data.err_msg.info.address){
                that.delivery_from.address = res.data.err_msg.info.province_name + '、' +
                res.data.err_msg.info.city_name + '、' + res.data.err_msg.info.area_name + '、' + res.data.err_msg.info.address
              }
              if(res.data.err_msg.info.province){
              that.form_adderess.provinceValue = res.data.err_msg.info.province
              if(res.data.err_msg.info.city){
                setTimeout(() => {
                  that.form_adderess.cityValue = res.data.err_msg.info.city
                  if(res.data.err_msg.info.area){
                    setTimeout(() => {
                      that.form_adderess.areaValue = res.data.err_msg.info.area
                    },500)
                  }
                },500)
                
              }
            }
            that.form_adderess.name = res.data.err_msg.info.name
            that.form_adderess.tel = res.data.err_msg.info.tel
            that.form_adderess.mark = res.data.err_msg.info.address
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

    //填写退货地址
    sure_address() {
      let that = this;
      let params = {};
      let province = "";
      let city = "";
      let area = "";
      var reg_tel = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      );
      if (that.form_adderess_show == true) {
        if (that.form_adderess.name == "") {
          that.$message({
            message: "请输入收货人姓名",
            type: "warning",
          });
          return;
        }
        if (that.form_adderess.tel == "") {
          that.$message({
            message: "请输入手机号",
            type: "warning",
          });
          return;
        }
        if (that.form_adderess.provinceValue == "") {
          that.$message({
            message: "请选择省份",
            type: "warning",
          });
          return;
        }
        if (that.form_adderess.cityValue == "") {
          that.$message({
            message: "请选择市",
            type: "warning",
          });
          return;
        }
        if (that.form_adderess.areaValue == "") {
          that.$message({
            message: "请选择区",
            type: "warning",
          });
          return;
        }
        if (that.form_adderess.mark == "") {
          that.$message({
            message: "请选择详细地址",
            type: "warning",
          });
          return;
        }
        if (!reg_tel.test(that.form_adderess.tel)) {
          that.$message({
            message: "请填写正确的手机号",
            type: "warning",
          });
          return;
        }
      }

      if (that.form_adderess_show == true) {
        that.provinceList.forEach((ele) => {
          if (that.form_adderess.provinceValue == ele.province_id) {
            province = ele.province_id;
          }
        });
        that.cityList.forEach((ele) => {
          if (that.form_adderess.cityValue == ele.city_id) {
            city = ele.city_id;
          }
        });
        
        
        that.areaList.forEach((ele) => {
          if (that.form_adderess.areaValue == ele.area_id) {
            area = ele.area_id;
          }
        });
        console.log("省市区列表")
        console.log(that.provinceList)
        console.log(that.cityList)
        console.log(that.areaList)
        console.log("that.form_adderess")
        console.log(that.form_adderess)
        params = {
          return_id: that.refund_row.return_id,
          address_user: that.form_adderess.name,
          address_tel: that.form_adderess.tel,
          address: that.form_adderess.mark,
          // province_txt: province,
          // city_txt: city,
          // county_txt: area,
          province: that.form_adderess.provinceValue,
          city: that.form_adderess.cityValue,
          area: that.form_adderess.areaValue,
          address: that.form_adderess.mark,
        };
      } else {
        //判断没有编辑状态是否有信息
        if (that.delivery_from.address_user == "") {
          that.$message({
            message: "请填写收件信息",
            type: "warning",
          });
          return;
        } else {
          //有信息
          console.log("that.address_p")
          console.log(that.address_p)
          params = {
            return_id: that.refund_row.return_id,
            address_user: that.address_p.name,
            address_tel: that.address_p.tel,
            address: that.address_p.address,
            province: that.address_p.province,
            city: that.address_p.city,
            area: that.address_p.area,
          };
        }
      }
      
      refuse_agree(params)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.reimburse_show = false;
            that.agree_to_return_show = false;
            that.$message({
              message: "同意退货成功",
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
    img_beforeUpload_group(file) {
      console.log(file);
      if (file.size / 1024 / 1024 > 200) {
        this.$message.error("文件大小不能超过 200MB!");
        this.other_img_upload_err_group = true;
        return false;
      }
    },
    handlePreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //上传
    img_upload_group: function (item) {
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
      // let that = this;
      // if (this.other_img_upload_err_group == false) {
      //   if (this.value.fileList_copy.length > 0) {
      //     let leg = false;
      //     this.value.fileList_copy.forEach((ele) => {
      //       if (ele.uid == item.file.uid) {
      //         leg = true;
      //         return;
      //       }
      //     });
      //     if (leg == false) {
      //       that.value.fileList_copy.push(item.file);
      //     }
      //   } else {
      //     that.value.fileList_copy.push(item.file);
      //   }
      // }
      // console.log(that.value.fileList_copy);
    },

    upload_group_img() {
      let that = this;
      that.value.fileList_copy_p = [];
      if (this.value.fileList_copy.length > 0) {
        let params = new FormData();
        that.show_write_loading = true;
        this.$refs.upload.submit();
        this.value.fileList_copy.forEach((item,i)=>{
          params.append(`file[${i}]`,item)
        })
        console.log(params)
        uploadImages(params)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.fileList = [];
              that.value.fileList_copy = [];
              that.value.fileList_copy_p = res.data.err_msg.url_list;
              that.show_write_loading = false;
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
      } else {
        that.$message({
          message: "请选择要上传的文件",
          type: "warning",
        });
      }
    },

    //确认填写运单号
    sure_write() {
      
      let that = this;
      let express_company = "";
      let express_code = "";
      if (that.form_adderess_p.express == "") {
        that.$message({
          message: "请选择快递公司",
          type: "warning",
        });
        return;
      }
      if (that.form_adderess_p.ydh == "") {
        that.$message({
          message: "请填写运单号",
          type: "warning",
        });
        return;
      }
      // if (that.form_adderess_p.yf == "") {
      //   that.$message({
      //     message: "请填写运费",
      //     type: "warning",
      //   });
      //   return;
      // }
      if (that.value.fileList_copy_p.length == 0) {
        that.$message({
          message: "请上传凭证",
          type: "warning",
        });
        return;
      }
      that.express_list_p.forEach((ele) => {
        if (ele.pigcms_id == that.form_adderess_p.express) {
          express_company = ele.name;
          express_code = ele.code;
        }
      });
      let data = {
        return_id: that.refund_row.return_id,
        express_code: express_code,
        // that.form_adderess_p.yf
        fee: 0,
        express_company: express_company,
        express_no: that.form_adderess_p.ydh,
        
        express_images: JSON.stringify(that.value.fileList_copy_p),
      }
      return_express(data)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.add_remarks_show = false;
            that.$message({
              message: "填写成功",
              type: "success",
            });
            that.value.fileList_copy_p = []
            that.reimburse_show = false;
            that.write_show = false;
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
    see_express() {
      let that = this;
      console.log(that.ppp);
      that.express_show = true;
      get_express({
        express_code: that.ppp.express_code,
        express_no: that.ppp.express_no,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.wlList_po = res.data.err_msg.Traces;
            if (that.wlList_po.length == 0) {
              that.$message({
                showClose: true,
                message: "暂无物流信息",
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

    //查看物流
    see_express_p() {
      let that = this;
      console.log(that.ppp);
      that.refund_from_d.express_show_p = true;
      get_express({
        express_code: that.refund_from_d.express_code,
        express_no: that.refund_from_d.th_ydh,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.refund_from_d.wlList_po = res.data.err_msg.Traces;
            if (that.refund_from_d.wlList_po.length == 0) {
              that.$message({
                showClose: true,
                message: "暂无物流信息",
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

    //查看详情
    see_details(index, row) {
      let that = this;
      console.log(row);
      // if(row.status == 1) { //申请中
      //   that.active_type = 1
      // } else if (row.status == 6) { //退货完成
      //   that.active_type = 3
      // } else {
      //   that.active_type = 0
      // }
      this.refund_details_show = true;
      that.refund_from_d = {};
      that.refund_from_d = {
        refund_time: "", //退款处理时间
        product_name: "", //商品名称
        product_image: "", //商品主图
        sku_data: "", //商品规格
        address_user: "", //买家昵称
        order_no: "", //订单号
        add_time: "", //成交时间-订单时间
        pro_price: "", //商品单价
        postage: "", //邮费
        sub_total: "", //商品金额（不含邮费）
        return_no: "", //退货单号-售后编号
        refund_money: "", //申请退款金额
        product_status: "", //货物状态 买家是否收到货 1未收到 2收到
        type: "", //退货类型-退款原因
        content: "", //用户的退货说明-补充说明
        pro_num: "", //订单中 商品数量
        images: [],
        videos: [],
        pay_way: "", //支付方式
        return_status_p: "", //售后状态
        shr: "", //收货人
        shr_tel: "", //收货人手机号
        shr_address: "", //收货人地址
        s_reason: "", //拒绝原因
        th_name: "", //退货——收货人
        th_tel: "", //收货人手机号
        th_address: "", //地址
        th_company: "", //快递公司
        th_ydh: "", //运单号
        express_show_p: false,
        wlList_po: [],
        y_name: "", //运营商名称
        y_lxr: "", //运营商联系人
        y_tel: "", //运营商电话
        express_code: "",
        type_p: "",
      };
      refund_info({
        return_id: row.return_id,
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
              res.data.err_msg.info.product_status = "未收到";
            } else if (res.data.err_msg.info.product_status == 2) {
              res.data.err_msg.info.product_status = "收到";
            } else {
              res.data.err_msg.info.product_status = "未知";
            }
            that.refund_from_d = {};
              res.data.err_msg.info.refund_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.refund_time
              );
              if(res.data.err_msg.info.paid_time){
                res.data.err_msg.info.paid_time = that.commonJs.timestampToTime(
                  res.data.err_msg.info.paid_time
                );
              }
              res.data.err_msg.info.dateline = that.commonJs.timestampToTime(
                res.data.err_msg.info.dateline
              );
              // res.data.err_msg.info.paid_time = that.commonJs.timestampToTime(
              //   res.data.err_msg.info.paid_time
              // );
              // res.data.err_msg.info.add_time = that.commonJs.timestampToTime(
              //   res.data.err_msg.info.add_time
              // );
            if (res.data.err_msg.info.order_status == 1) {
              res.data.err_msg.info.order_status = "待支付";
            } else if (res.data.err_msg.info.order_status == 2) {
              res.data.err_msg.info.order_status = "待发货";
            }else if (res.data.err_msg.info.order_status == 3) {
              res.data.err_msg.info.order_status = "收到";
            }else if (res.data.err_msg.info.order_status == 4) {
              res.data.err_msg.info.order_status = "收到";
            }else if (res.data.err_msg.info.order_status == 5) {
              res.data.err_msg.info.order_status = "收到";
            }else if (res.data.err_msg.info.order_status == 6) {
              res.data.err_msg.info.order_status = "收到";
            }else if (res.data.err_msg.info.order_status == 7) {
              res.data.err_msg.info.order_status = "收到";
            } else {
              res.data.err_msg.info.order_status = "未知";
            }
            that.refund_from_d = {
              
              refund_time : res.data.err_msg.info.refund_time,//退款处理时间
              order_status:res.data.err_msg.info.order_status,//订单状态
              product_list: res.data.err_msg.info.product_list, //商品列表
              address_user: res.data.err_msg.info.nickname, //买家昵称
              order_no: res.data.err_msg.info.order_no, //订单号
              postage: res.data.err_msg.info.product_money, //邮费
              paid_time: res.data.err_msg.info.paid_time, //下单时间
              sub_total: res.data.err_msg.info.sub_total, //商品金额（不含邮费）
              return_no: res.data.err_msg.info.return_no, //退货单号-售后编号
              refund_money: res.data.err_msg.info.pro_cost_price, //申请退款金额
              product_status: res.data.err_msg.info.product_status, //货物状态 买家是否收到货 1未收到 2收到
              type: res.data.err_msg.info.type, //退货类型-退款原因
              content: res.data.err_msg.info.content, //用户的退货说明-补充说明
              images: res.data.err_msg.info.images,
              videos: res.data.err_msg.info.videos,
              pay_way: row.pay_way_p, //支付方式
              return_status_p: row.pay_status_p, //售后状态
              shr: res.data.err_msg.info.t_address_user, //买家
              shr_tel: res.data.err_msg.info.t_address_tel, //买家手机号
              shr_address:  "", //买家地址
              s_reason: res.data.err_msg.info.store_content, //拒绝原因
              th_name: res.data.err_msg.info.address_user, //退货——收货人
              th_tel: res.data.err_msg.info.address_tel, //收货人手机号
              th_address: "", //收货地址
              th_company: res.data.err_msg.info.express_company, //快递公司
              th_ydh: res.data.err_msg.info.express_no, //运单号
              express_show_p: false,
              wlList_po: [],
              y_name: row.store_id == 0 ? "平台自营" : row.store_name, //运营商名称
              y_lxr: res.data.err_msg.info.store_user, //运营商联系人
              y_tel: res.data.err_msg.info.store_tel, //运营商电话
              express_code: res.data.err_msg.info.express_code,
              type_p: row.method == 2 ? "仅退款" : "退货退款",
              dateline:res.data.err_msg.info.dateline, //退货申请时间
              refund_time:res.data.err_msg.info.refund_time, //退款处理时间
              refund_status:res.data.err_msg.info.refund_status, //退款状态
              store_content:res.data.err_msg.info.store_content, //不予退款原因说明
              cost_price:res.data.err_msg.info.cost_price, //订单金额
              
            };
            if (res.data.err_msg.info.address) {
              that.refund_from_d.th_address =
                res.data.err_msg.info.address.province +
                "、" +
                res.data.err_msg.info.address.city +
                "、" +
                res.data.err_msg.info.address.area +
                "、" +
                res.data.err_msg.info.address.address;
              
            }
            if(res.data.err_msg.info.t_address.length > 1){
              that.refund_from_d.shr_address =
              res.data.err_msg.info.t_address[0].province +
              "、" +
              res.data.err_msg.info.t_address[0].city +
              "、" +
              res.data.err_msg.info.t_address[0].area +
              "、" +
              res.data.err_msg.info.t_address[0].address;
            }else if (res.data.err_msg.info.t_address && res.data.err_msg.info.t_address.length != 0) {
              that.refund_from_d.shr_address =
              res.data.err_msg.info.t_address.province +
              "、" +
              res.data.err_msg.info.t_address.city +
              "、" +
              res.data.err_msg.info.t_address.area +
              "、" +
              res.data.err_msg.info.t_address.address;
            }
            that.ppp = res.data.err_msg.info;
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
  border-top: 1px solid #ebeef5;
  border-bottom: 0;
}

/deep/ .el-table__body {
  border-bottom: 1px solid #ebeef5;
}

/deep/ .el-date-editor {
  margin-left: 10px;
}
.seach {
  display: flex;
  /deep/ .el-input {
    width: 150px;
    margin: 0 10px;
  }
}

.remarks_box {
  /deep/ .el-dialog {
    width: 700px !important;
    height: 500px;
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
    width: 1000px !important;
    height: 500px;
    overflow-y: auto;
  }
}

.details_box {
  /deep/ .el-dialog {
    width: 1000px !important;
    height: 700px;
    overflow-y: auto;
  }
}

.delivery_box {
  /deep/ .el-dialog {
    width: 1000px !important;
    height: 500px;
    overflow-y: auto;
  }
}

// /deep/ .el-dialog__body {
//   height: 400px;
//   overflow-y: auto;
//   display: flex;
//   justify-content: space-between;
// }

.seach_copy {
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


.uls{
  li{
    border-top: 1px solid #ebeef5;
    max-height: 100px;
  }
  li:nth-of-type(1){
    border-top: none;
  }
}
</style>