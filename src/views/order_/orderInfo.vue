<template>
  <div class="body" @click="frameBlean = false">
    <div class="item">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/qizhi.png" alt="" />
          <span>1</span>
        </div>
        <div class="title lt">
          订单主要信息
          <span class="san"></span>
        </div>
      </div>
      <div class="table">
        <div class="thead">
          
          <div style="margin-bottom: 5px">
            <span style="margin-right: 20px; color: #1b2ba6"
              >订单编号：{{orderInfo.info.order_no}}</span
            >
            <span style="margin-right: 20px; color: #1b2ba6"
              >商户单号：{{orderInfo.info.relation_no}}</span
            >
            <span style="margin-right: 20px; color: #1b2ba6"
              >三方交易号：{{orderInfo.info.third_id}}</span
            >
          </div>
          <div style="font-size: 15px">
            <span style="margin-right: 20px"
              >下单时间：{{orderInfo.info.add_time}}</span
            >
            <span style="margin-right: 20px"
              >支付时间：{{orderInfo.info.paid_time}}</span
            >
          </div>
        </div>
        <div class="tbody clearfix" style="height: 130px">
          <div
            class="div"
            style="
              width: 30%;
              padding: 20px 0 0 20px;
              border-right: 1px solid #bbb;
            "
          >
            <!-- <div v-if="active_type == 1">
              <span class="title">买家已下单,请尽快发货</span>
              <span class="text">请尽快安排发货</span>
            </div>
            <div v-else-if="active_type == 2">
              <span class="title">买家已付款,请尽快发货</span>
              <span class="text">请尽快安排发货</span>
            </div>
            <div v-else-if="active_type == 3">
              <span class="title">买家已发货,请尽快派送</span>
              <span class="text">请尽快派送</span>
            </div>
            <div v-else-if="active_type == 4">
              <span class="title">买家已收货,订单待完成</span>
              <span class="text">订单待评价</span>
            </div>
            <div v-else-if="active_type == 5">
              <span class="title">交易完成,买家享有售后服务</span>
              <span class="text">交易完成</span>
            </div> -->
            <div v-if="active_type == 1">
              <span class="title">买家已下单,未付款</span>
              <span class="text">关注买家动态</span>
            </div>
            <div v-else-if="active_type == 2">
              <span class="title">买家已付款,请尽快发货</span>
              <span class="text">请尽快安排发货</span>
            </div>
            <div v-else-if="active_type == 3">
              <span class="title">卖家已发货，请关注物流进度</span>
              <span class="text">协助买家查询物流信息</span>
            </div>
            <div v-else-if="active_type == 4">
              <span class="title">买家已收货,订单待完成</span>
              <span class="text">买家享有售后服务</span>
            </div>
            <div v-else-if="active_type == 5">
              <span class="title">订单交易完成</span>
              <span class="text">除商品本身质量问题不予售后</span>
            </div>
            <div v-else-if="orderInfo.info.status == 5">
              <span class="title">订单已取消</span>
              <span class="text">买家手动取消或自动取消</span>
            </div>
            <div v-else-if="orderInfo.info.status == 6">
              <span class="title">交易已关闭</span>
              <span class="text">交易关闭</span>
            </div>
          </div>
          <div class="div" style="width: 69%; padding: 20px 0 0 20px">
            <el-steps
              :active="active_type"
              :space="200"
              finish-status="success"
              style="margin-bottom: 20px"
              
            >
              <el-step title="买家已下单" :description="orderInfo.info.add_time"></el-step>
              <el-step title="买家已付款" :description="orderInfo.info.paid_time"></el-step>
              <el-step title="卖家已发货" :description="orderInfo.info.sent_time"></el-step>
              <el-step
                title="买家已收货"
                :description="orderInfo.info.delivery_time"
              ></el-step>
              <el-step title="交易完成"></el-step>
            </el-steps>
          </div>
        </div>
        <div class="tbody" style="padding: 15px 0 15px 20px">
          <span style="color: #ee8f29">商家备注：{{ orderInfo.info.bak==""?"无": orderInfo.info.bak}}</span>
        </div>
      </div>
      <el-row :gutter="20" class="goodsindex-list goodsindex-list2" style="margin: 0 0 0 0">
        <el-col :span="24" style="padding: 0; margin-top: 20px">
          <el-table :data="orderInfo.info.product_list" border :span-method="cellMerge2" @cell-mouse-leave="cellLeave" @cell-mouse-enter="mouseHover">
            <el-table-column label="商品信息" width="400">
              <template slot-scope="scope">
                <div class="clearfix" style="padding-top: 10px">
                  <div class="lt">
                    <el-image
                      :src="scope.row.product_image"
                      fit="cover"
                      style="width: 80px; height: 80px"
                      :preview-src-list="[scope.row.product_image]"
                    ></el-image>
                  </div>
                  <div
                    class="lt"
                    style="
                      width: calc(100% - 80px);
                      padding-left: 20px;
                      padding-right: 10px;
                      line-height: 17px;
                    "
                  >
                    <div style="min-height: 66px">
                      {{scope.row.product_name}}
                    </div>
                    <div>{{scope.row.sku_data}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单价（结算价）" width="150">
              <template slot-scope="scope">
                <!-- <div>余额支付: {{ scope.row.product_balance }}元</div> -->
                <div>单价: {{ scope.row.pro_cost_price }}元</div>
                <!-- <div>结算价: {{ scope.row.pro_cost_price }}元</div> -->
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <div>{{ scope.row.pro_num }}件</div>
              </template>  
            </el-table-column>
            <el-table-column label="售后详情" width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.refund_complete == '0' && scope.row.refun_of == '0'">
                  - -
                </div>
                <div v-else-if="orderInfo.info.refund_status != 0">
                  <div style="color:rgb(231, 34, 255);">退款中: {{scope.row.refun_of}}</div>
                  <div style="color:rgb(231, 34, 255);">退款完成: {{scope.row.refund_complete}}</div>
                  <el-tag type="danger" v-if="scope.row.refun_of != '0' || scope.row.refund_complete != '0'" @click="lookRefund(orderInfo.info.order_no)" style="cursor:pointer;margin-top:5px">
                    <span style="color:rgb(231, 34, 255);">查询</span>
                  </el-tag>
                </div>
                <div v-else style="text-align: center">- -</div>
              </template>
            </el-table-column>
            <el-table-column label="退款类型" width="150">
              <template>
                <div v-if="orderInfo.info.refund_status != 0">
                  <div v-if="orderInfo.info.refund_status == '0'" style="color:rgb(231, 34, 255);">未退款</div>
                  <div v-else-if="orderInfo.info.refund_status == '1'" style="color:rgb(231, 34, 255);">部分退款</div>
                  <div v-else-if="orderInfo.info.refund_status == '2'" style="color:rgb(231, 34, 255);">全部退款</div>
                  <div v-else-if="orderInfo.info.refund_status == '3'" style="color:rgb(231, 34, 255);">部分退款完成</div>
                  <div v-else-if="orderInfo.info.refund_status == '4'" style="color:rgb(231, 34, 255);">全部退款完成</div>
                </div>
                <div v-else style="text-align: center">- -</div>
              </template>
            </el-table-column>
            <el-table-column label="运费" prop="number">
              <template>
                <div>{{ orderInfo.info.postage }}元</div>
              </template>  
            </el-table-column>
            <el-table-column label="优惠"> 
               <template>
                <div>暂无</div>
              </template>
            </el-table-column>
            <el-table-column label="订单金额">
              <template>
                <div>{{ orderInfo.info.cost_price }}元</div>
              </template>
            </el-table-column>
            <el-table-column label="支付金额">
              <template>
                <div>{{ orderInfo.info.cost_price }} 元</div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="支付详情" width="150">
              <template slot-scope="scope">
                <div>实付: {{ scope.row.pro_price }}元</div>
                <div>余额: {{ scope.row.product_balance }}元</div>
                <div>橘宝: {{ scope.row.product_score }}个</div>
              </template>
            </el-table-column> -->
            
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="item item1 por">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/qizhi.png" alt="" />
          <span>2</span>
        </div>
        <div class="title lt">
          订单辅助信息
          <span class="san"></span>
        </div>
      </div>
      <el-row :gutter="20" class="goodsindex-list" style="margin: 0 0 0 0">
        <el-col :span="24" style="padding: 0; margin-top: 20px">
          <!--  -->
          
          <el-table  :data="order_s_list1" border :span-method="cellMerge">
            <!-- <el-table-column label="总额" prop="number">
                        </el-table-column> -->
            <!-- <el-table-column label="买家备注" style="display:none">
              <template slot-scope="scope">
                <div v-if="scope.$index == 1">
                  <span style="color: #1b2ba6; padding: 10px 0"
                    >备注: {{orderInfo.info.comment === ''?'无':orderInfo.info.comment}}</span
                  >
                  
                </div>
                <div v-else>
                  <div>昵称: {{orderInfo.info.nickname}}</div>
                  <div>账号: {{orderInfo.info.phone}}</div>
                  <div>UID: {{orderInfo.info.uid}}</div>
                  <div>区域代理: 暂无</div>
                  <div>销售代理: 
                    <span v-if="orderInfo.info.level == 0">普通用户</span>
                    <span v-else-if="orderInfo.info.level == 1">专员</span>
                    <span v-else-if="orderInfo.info.level == 2">经理</span>
                    <span v-else-if="orderInfo.info.level == 3">总监</span>
                  </div>
                  <div>段位星级: {{orderInfo.info.level_name}}</div>
                </div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="下单渠道">
              <template>
                暂无
              </template>
            </el-table-column>
            <el-table-column label="订单类型">
              <template>
                <div>
                  <span v-if="orderInfo.info.live_id == 0">
                    <span v-if="orderInfo.info.type == 0">
                      普通订单
                    </span>
                    <span v-else-if="orderInfo.info.type == 1">
                      代付订单
                    </span>
                    <span v-else-if="orderInfo.info.type == 2">
                      送礼订单
                    </span>
                    <span v-else-if="orderInfo.info.type == 3">
                      分销订单
                    </span>
                    <span v-else-if="orderInfo.info.type == 10">
                      在线预约订单
                    </span>
                  </span>
                  <span v-else>直播间订单</span>
                </div>
                <div>直播间ID: {{ orderInfo.info.live_id }}</div>
                <div v-if="orderInfo.info.live_id != 0">主播昵称: {{ orderInfo.info.anchor_name }}</div>
                <div v-if="orderInfo.info.live_id != 0">主播ID: {{ orderInfo.info.anchor_id }}</div>
              </template>
            </el-table-column>

            <el-table-column label="支付类型">
              <template>
                <div>
                  <span v-if="orderInfo.info.payment_method == 'weixin'">
                      微信支付
                    </span>
                    <span v-else-if="orderInfo.info.payment_method == 'alipay'">
                      支付宝支付
                    </span>
                    <span v-else-if="orderInfo.info.payment_method == 'balance'">
                      余额支付
                    </span>
                    <span v-else-if="orderInfo.info.payment_method == 'score'">
                      橘宝支付
                    </span>
                    <span v-else-if="orderInfo.info.payment_method == 'blend'">
                      混合支付
                    </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运营商">
              <template>
                <div style="color:#1a4ecc" v-if="orderInfo.info.store_uid != 0" @click="go(orderInfo.info.store_uid)">{{ orderInfo.info.store_name }}</div>
                <div v-else>{{ orderInfo.info.store_name }}</div>
                <div v-if="orderInfo.info.store_uid != 0">账号: {{ orderInfo.info.account }}</div>
                <div v-if="orderInfo.info.store_uid != 0">昵称: {{ orderInfo.info.linkman }}</div>
                <div v-if="orderInfo.info.store_uid != 0">联系电话: {{ orderInfo.info.tel }}</div>
              </template>
            </el-table-column> -->
            <el-table-column label="买家信息" style="display:none" width="500">
              <template slot-scope="scope">
                <div v-if="scope.$index == 1">
                  <span style="color: #ee8f29; padding: 10px 0"
                    >买家备注: {{orderInfo.info.comment === ''?'无':orderInfo.info.comment}}
                  </span>
                </div>
                <div v-else>
                  <div>昵称: {{orderInfo.info.nickname}}</div>
                  <div>账号: {{orderInfo.info.phone}}</div>
                </div>
                  <!-- <div>UID: {{orderInfo.info.uid}}</div>
                  <div>区域代理: 暂无</div>
                  <div>销售代理: 
                    <span v-if="orderInfo.info.level == 0">普通用户</span>
                    <span v-else-if="orderInfo.info.level == 1">专员</span>
                    <span v-else-if="orderInfo.info.level == 2">经理</span>
                    <span v-else-if="orderInfo.info.level == 3">总监</span>
                  </div>
                  <div>段位星级: {{orderInfo.info.level_name}}</div> -->
              </template>
            </el-table-column>
            <el-table-column label="收货地址">
              <template>
                  <div>收货人: {{ orderInfo.info.address_user }}</div>
                  <div>电话:  {{ orderInfo.info.address_tel }}</div>
                  <div>地址:  {{ orderInfo.info.addre}}</div>
                  <el-button
                    type="success"
                    v-if="orderInfo.info.status == 2"
                    style="margin-bottom: 10px; margin-right: 10px"
                    @click="edit"
                    >修改</el-button
                  >
                  <el-button
                    type="success"
                    style="margin-bottom: 10px"
                    v-if="orderInfo.info.status == 2"
                    @click.stop="editInfo"
                    >修改记录</el-button
                  >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="frame" v-show="frameBlean" @click.stop="frameBlean = true">
        <div v-if="addressList.length > 0">
          <div class="items" v-for="(item,index) in addressList" :key="index">
            <div>修改{{index+1}}：</div>
            <div>收货人：{{item.address_user}}</div>
            <div>电话：{{item.address_tel}}</div>
            <div>地址：{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
          </div>
        </div>
        <div v-else class="items">
          空空如也
        </div>
      </div>
    </div>
    <div class="item item1">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/qizhi.png" alt="" />
          <span>3</span>
        </div>
        <div class="title lt">
          快递物流信息
          <span class="san"></span>
        </div>
        <!-- <el-button
          class="rt"
          type="success"
          style="margin-bottom: 10px"
          @click="go_delivery"
          v-if="orderInfo.info.status == 2"
        >
          发货
        </el-button> -->
      </div>
      <div class="tables clearfix" v-if="orderInfo.info.refund_status == 2">
        <img src="../../assets/image/gantan.png" alt="" />
        <span class="span">订单商品已经全部申请售后</span>
      </div>
      <div class="tables clearfix" v-else-if="orderInfo.info.status == 2 && orderInfo.info.express.length == 0">
        <img src="../../assets/image/gantan.png" alt="" />
        <span class="span">暂无发货记录,请尽快发出,避免买家等待太久导致退款</span>
        <el-button
          type="success"
          style="margin-bottom: 10px"
          @click="go_delivery"
          
        >
          立即发货
        </el-button>
      </div>
      <div class="tables clearfix" v-else-if="orderInfo.info.status == 2 && orderInfo.info.express.length > 0">
        <img src="../../assets/image/gantan.png" alt="" />
        <span class="span">该订单部分货物未发出,请尽快完成发货</span>
        <el-button
          type="success"
          style="margin-bottom: 10px"
          @click="go_delivery"
        >
          继续发货
        </el-button>
      </div>
      <div class="tables clearfix" v-else-if="orderInfo.info.status > 2">
        <img src="../../assets/image/duihao.png" alt="" />
        <span class="span">该订单全部货物均已发出</span>
      </div>
      <div v-for="(item,index) in orderInfo.info.express" :key="index">
        <p style="margin: 20px 0 0" v-if="index == 0">默认分包</p>
        <p style="margin: 20px 0 0" v-else>新增分包{{index}}</p>
        <el-row :gutter="20" class="goodsindex-list" style="margin: 0 0 0 0">
          <el-col :span="24" style="padding: 0; margin-top: 20px">
            <el-table :data="item.product" border  :span-method="cellMerge3">
              <el-table-column label="商品信息" width="600">
                <template slot-scope="scope">
                  
                  <div class="clearfix" style="padding-top: 10px">
                    <div class="lt" style="width: 250px">
                      {{scope.row.product_name}}
                    </div>
                    <div
                      class="lt"
                      style="
                        width: 200px;
                        padding-left: 20px;
                        padding-right: 10px;
                        line-height: 17px;
                      "
                    >
                      规格:{{scope.row.sku_data!=''?scope.row.sku_data:"无"}}
                    </div>
                    <div
                      class="lt"
                      style="
                        width: 100px;
                        padding-left: 20px;
                        padding-right: 10px;
                        line-height: 17px;
                      "
                    >
                      数量:{{scope.row.pro_num}}件
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="数量">
                <template slot-scope="scope">
                  <div v-if="item.delivery_mode == 1">发货数量: {{scope.row.num}}件</div>
                  <div v-if="item.delivery_mode == 2">自提数量: {{scope.row.num}}件</div>
                </template>
              </el-table-column>
              <el-table-column label="物流信息">
                <template>
                  <div v-if="item.delivery_mode == 1">
                    <div>物流公司: {{item.express_company}}</div>
                    <div>快递单号: {{item.express_no}}</div>
                  </div>
                  <div v-else-if="item.delivery_mode == 2">
                    <div>用户自提</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template>
                  <el-button type="primary" v-if="item.delivery_mode == 1 && (orderInfo.info.status == 2 ||  orderInfo.info.status == 3)" style="margin-bottom:10px;" @click="edit_wl(item, index)"
                    >修改物流</el-button
                  >
                  <el-button
                    v-if="item.delivery_mode == 1"
                    type="info"
                    plain
                    @click="seeInfo(item)"
                    >物流查询</el-button
                  >
                   <el-button
                    v-else-if="item.delivery_mode == 2"
                    type="info"
                    style="cursor:no-drop;"
                    plain
                    >自提查询</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="发货备注" width="250">
                <template>
                  <span style="display: none"></span>
                  <div style="text-align: center">{{ item.remarks!==""?item.remarks:"- -"}}</div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      
    </div>
    <!-- 物流查询 -->
    <el-dialog :visible.sync="wlList_show" class="delivery_box">
      <div class="info">物流查询</div>
      <el-row
        :gutter="20"
        class="goodsindex-list active1"
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
    </el-dialog>
    <el-dialog :visible.sync="delivery_show" class="delivery_box">
      <div class="info">修改收货人信息</div>
      <el-form :model="form_adderess" style="margin-top: 20px; padding: 0 20px">
        <el-form-item label="收货人：" :label-width="remarks_formLabelWidth">
          <el-input
            v-model="form_adderess.name"
            style="width: 300px"
            placeholder="请输入收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="remarks_formLabelWidth">
          <el-input
            v-model="form_adderess.tel"
            placeholder="请输入手机号"
            style="width: 300px"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" :label-width="remarks_formLabelWidth">
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
        <el-form-item label="详细地址：" :label-width="remarks_formLabelWidth">
          <el-input
            style="width: 600px; height: 124px"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="form_adderess.mark"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <p style="text-align: right; padding: 0 20px 20px">
        <el-button type="danger" @click="delivery_show = false">取消</el-button>
        <el-button type="success" @click="set_address">保存</el-button>
      </p>
    </el-dialog>
    <!-- 发货弹窗 -->
    <el-dialog
      :visible.sync="delivery_blean"
      class="delivery_box el-dialog1"
    >
      <div class="info">订单详情/发货</div>
      <div class="ship">
        <div style="padding: 20px 50px;">
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
                        placeholder="试试搜索：关键字"
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
    <el-dialog
      :visible.sync="edit_wl_blean"
      class="details_box"
    >
    <div class="info">修改物流</div>
      <div style="padding:20px 50px;">
        <el-form :model="wlListObj">
          <el-form-item
            label="物流公司："
            :label-width="remarks_formLabelWidth"
            style="position: relative"
          >
            <div class="wo"></div>
            <el-select v-model="wlListObj.express" placeholder="请选择物流公司">
              <el-option
                v-for="ite in express_list_p"
                :key="ite.pigcms_id"
                :label="ite.name"
                :value="ite.code"
              >
              </el-option>
            </el-select>
            <!-- <el-cascader
            v-model="wlListObj.express"
            placeholder="试试搜索：关键字"
            :options="express_list_b"
            filterable></el-cascader> -->
          </el-form-item>
          <el-form-item
            label="运单号："
            style="position: relative"
            :label-width="remarks_formLabelWidth"
          >
            <div class="wo"></div>
            <el-input
              v-model="wlListObj.ydh"
              placeholder="请输入运单号"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <el-button type="danger" @click="edit_wl_blean = false">取消</el-button>
          <el-button type="success" @click="edit_wl_info">修改</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  express_list,
  get_province,
  get_area,
  get_city,
  deliver,
  order_agree,
  order_product,
  logistics,
  order_info,
  get_express,
  address_log
} from "../../utils/axios";
import $ from 'jquery'
export default {
  data() {
    return {
      img:false,
      radio:"1",

      form_adderess: {
        name: "",
        tel: "",
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        mark: "",
      },
      addressList:[],
      frameBlean:false,
      wlList_show:false,
      delivery_blean: false,
      provinceList: [], //省
      cityList: [], //市
      city_ifShow: false,
      areaList: [], //区
      area_ifShow: false,
      remarks_formLabelWidth: "100px",
      delivery_show: false,
      product_id: "",
      active_type: "0",
      order_time: "2021-12-01 22:09:23",
      pay_time: "2021-12-01 22:09:23",
      sent_time: "2021-12-01 22:09:23",
      delivery_time: "2021-12-01 22:09:23",
      order_s_list: [],
      wlList_p: [],
      order_s_list1: ["1","2"],
      goodsList: {
        package: [],
      },
      indexArr:[],
      express_list_p: [],
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
      
      items:{
        comm_list: [],
        express: "",
        ydh: "",
        mark: "",
        nameList: [],
      },
      express_list_b:[],
      multipleSelection:[],
      order_info:{
        address:{}
      },
      orderInfo:{
        info:""
      },
      edit_wl_blean: false,
      wlListObj: {
        ydh: "",
        express: "",
      },
      ind:"",
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
    if (this.$route.query.product_id != undefined) {
      this.product_id = this.$route.query.product_id;
      //获取商品信息
      this.info()
    }else{
      this.product_id = localStorage.getItem("infoIds")
      //获取商品信息
      this.info()
    }
    this.get_province(); //获取省份
    this.expressList(); //获取物流公司
    
  },
  methods: {
    edit_wl(item, index) {
      this.wlListObj.express = item.express_code;
      this.wlListObj.ydh = item.express_no;
      this.ind = item.package_id;
      this.edit_wl_blean = true;
    },
    edit_wl_info() {
      //掉接口
      let express_name = "";
      console.log(this.wlListObj.express)
      console.log(this.express_list_p)
      if(this.wlListObj.express.length == 1){
        this.wlListObj.express = this.express_list_p[(this.wlListObj.express[0]-1)].name
      }
      
      this.express_list_p.forEach((item) => {
        if (item.code == this.wlListObj.express) {
          express_name = item.name;
        }
      });
      let data = {
        package_id: this.ind,
        express_code: this.wlListObj.express,
        express_company: express_name,
        express_no: this.wlListObj.ydh,
      };
      console.log(this.express_list_b)
      console.log(data);
      logistics(data).then((res) => {
        if (res.data.err_code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.info()
          this.edit_wl_blean = false;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    info(){
      let that = this
      order_info({
        order_id: this.product_id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.err_code == 0) {
          // 1待支付 2待发货 3待收货 4(待评价)已完成 5已取消 7待完成
          if (res.data.err_msg.status == 1) {
            that.active_type = 1;
          } else if (res.data.err_msg.status == 2) {
            //未发货
            that.active_type = 2;
          } else if (res.data.err_msg.status == 3) {
            //已发货
            that.active_type = 3;
          } else if (res.data.err_msg.status == 4) {
            //已完成
            that.active_type = 5;
          } else if (res.data.err_msg.status == 7) {
            //已收货
            that.active_type = 4;
          } else {
            that.active_type = 0;
          }
          res.data.err_msg.sent_time = that.commonJs.timestampToTime(
            res.data.err_msg.sent_time
          ), //发货时间
          res.data.err_msg.delivery_time = that.commonJs.timestampToTime(
            res.data.err_msg.delivery_time
          ), 
          res.data.err_msg.add_time = that.commonJs.timestampToTime(
            res.data.err_msg.add_time
          ), 
          res.data.err_msg.paid_time = that.commonJs.timestampToTime(
            res.data.err_msg.paid_time
          ), 
          this.orderInfo.info = res.data.err_msg
          this.orderInfo.info.addre = res.data.err_msg.address.province + res.data.err_msg.address.city + res.data.err_msg.address.area + res.data.err_msg.address.address
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取物流公司
    expressList() {
      let that = this;
      express_list().then((res) => {
        if (res.data.err_code == 0) {
          this.express_list_p = res.data.err_msg.list;
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
    
    go(uid){
      window.open("https://www.rcwisdom.com/h5/admin/supplier/index.html#/?url=" + uid)
    },
    //物流
    //点击发货按钮
    go_delivery() {
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
      ]
      order_product({
        order_id: that.product_id,
      })
        .then((res) => {
          if (res.data.err_code == 0) {
            console.log(res);
            that.delivery_blean = true;
            this.order_info = res.data.err_msg.info
            that.goodsList.bak = res.data.err_msg.info.bak;
            that.goodsList.comment = res.data.err_msg.info.comment;
            that.goodsList.package = res.data.err_msg.info.package;
            // if(res.data.err_msg.info.express_list.length>0){
            //   that.express_list_p = res.data.err_msg.info.express_list;
            // }
            that.delivery_detalis_p = res.data.err_msg.info.product_list;
            // res.data.err_msg.info.product_list.forEach((ele) => {
            //   ele.bei = ''
            //   ele.number = ''
            // });
            if(res.data.err_msg.info.product_list.length == 1 && res.data.err_msg.info.product_list[0].delivered_num == 1){
              this.img = true
            }
            
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
    //查看售后
    lookRefund(item) {
      this.$router.push({ path: "/order_/refund", query: { order_no: item } });
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
      // pigcms_list
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
            this.info()
            this.delivery_blean = false
            // that.get_order_list();
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
    seeInfo(item){
      let that = this;
      get_express({
        express_code: item.express_code,
        express_no: item.express_no,
      })
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
    edit() {
      this.delivery_show = true;
    },
    //表格合并行
    cellMerge({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (rowIndex == 1) {
        if (columnIndex == 0) {
          _col = 6;
        } else {
          _col = 0;
        }
      }

      return {
        rowspan: _row, //行
        colspan: _col, //列
      };
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

    //划入
    mouseHover(row){
      this.indexArr = []
      for(let i = 0 ; i < this.orderInfo.info.product_list.length ; i++ ){
        if(this.orderInfo.info.product_list[i].index == row.index){
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
      if (columnIndex == 6 || columnIndex == 4 || columnIndex == 5 || columnIndex == 7 || columnIndex == 8) {
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

    //表格合并行
    cellMerge3({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (columnIndex == 2 || columnIndex == 3 || columnIndex == 4) {
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

    delete_form(index) {
      this.form_delivery.splice(index, 1);
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
    //修改物流地址
    editInfo() {
      this.frameBlean = !this.frameBlean
      if(this.frameBlean){
        // this.addressList= [
        //   {
        //     address_user:"刘江浩",
        //     address_tel:"刘江浩",
        //     province:"刘江浩",
        //     city:"刘江浩",
        //     area:"刘江浩",
        //     address:"刘江浩",
        //   }
        // ]
        address_log({
          order_id:this.product_id
        })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.addressList = res.data.err_msg.list
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
    //修改修改人信息
    set_address() {
      let that = this;
      let params = {};
      let province = "";
      let city = "";
      let area = "";
      var reg_tel = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      );
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
          message: "请填写详细地址",
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
      console.log(that.provinceList);
      that.provinceList.forEach((ele) => {
        if (that.form_adderess.provinceValue == ele.province_id) {
          province = ele.product_name;
        }
      });
      that.cityList.forEach((ele) => {
        if (that.form_adderess.cityValue == ele.city_id) {
          city = ele.product_name;
        }
      });
      that.areaList.forEach((ele) => {
        if (that.form_adderess.areaValue == ele.area_id) {
          area = ele.product_name;
        }
      });
      console.log(that.form_adderess);
      params = {
        order_id: that.product_id,
        address_user: that.form_adderess.name,
        address_tel: that.form_adderess.tel,
        address: that.form_adderess.mark,
        province: that.form_adderess.provinceValue,
        city: that.form_adderess.cityValue,
        area: that.form_adderess.areaValue,
      };
      console.log(params);
      order_agree(params)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.$message({
              message: "地址修改成功",
              type: "success",
            });
            that.delivery_show = false;
            (that.delivery_from = {
              address_user: that.form_adderess.name,
              address_tel: that.form_adderess.tel,
              address: that.form_adderess.mark,
            }),
              (that.delivery_from.address =
                province +
                "、" +
                city +
                "、" +
                area +
                "、" +
                that.form_adderess.mark);
            //
            this.info()
            that.form_adderess = {
              name: "",
              tel: "",
              provinceValue: "",
              cityValue: "",
              areaValue: "",
              mark: "",
            };
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
* {
  box-sizing: border-box;
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
    overflow-y:auto;
    padding: 20px 35px 20px 50px;
  }
  .item.item2{
    padding-bottom: 20px;
  }
  .item{
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
      width: 75%;
      border-right:1px solid #bbb;
      padding-right: 30px;
    }
    .son{
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
/deep/ .el-table__body-wrapper {
  overflow-y: auto !important;
}
/deep/ .el-table--border th .cell {
  color: #000;
  font-weight: bold;
}
/deep/ .tables{
  padding: 20px;
  margin-top: 20px;
  background: #fff;
  border: 1px solid #bbb;
  .span{
    float: left;
    margin: 15px 20px 0;
  }
  img{
    width: 50px;
    float: left;
  }
  .el-button{
    padding: 12px 18px;
    margin-top: 10px;
    float: left;
  }
}

.frame{
  position: absolute;
  bottom: -240px;
  z-index: 100;
  width: 300px;
  height: 280px;
  overflow-y: auto;
  left: 512px;
  padding: 20px;
  border: 1px solid #bbb;
  .items{
    margin-bottom: 20px;
    font-size: 14px;
    div{
      line-height: 30px;
    }
  }
  background: #fff;
}
.frame {
  overflow-y: auto;
}
/deep/ .goodsindex-list.el-row.active1{
  max-height: 700px;
  overflow-y: auto;
  width: 100%;
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
</style>