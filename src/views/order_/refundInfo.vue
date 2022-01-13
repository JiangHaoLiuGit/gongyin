<template>
  <div class="body">
    <div class="item">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/newQizhi.png" alt="" />
          <span>1</span>
        </div>
        <div class="title lt">
          售后主要信息
          <span class="san"></span>
        </div>
      </div>
      <div class="table">
        <div class="thead por">
          <div style="margin-bottom: 5px">
            <span style="margin-right: 20px; color: #1b2ba6"
              >售后单号：{{ refundInfo.info.return_no }}</span
            >
            <span style="margin-right: 20px; color: #1b2ba6"
              >订单编号：{{ refundInfo.info.order_no }}</span
            >
            <span style="margin-right: 20px; color: #1b2ba6"
              >商户单号：{{ refundInfo.info.relation_no }}</span
            >
            <span style="margin-right: 20px; color: #1b2ba6"
              >三方交易号：{{refundInfo.info.third_id}}</span
            >
            <!-- <span style="margin-right: 20px; color: #1b2ba6"
              >货到没：{{refundInfo.info.product_status == 2?"收到":"没到"}}</span
            > -->
            
          </div>
          <div style="font-size: 15px">
            <span style="margin-right: 20px"
              >申请时间：{{ refundInfo.info.dateline }}</span
            >
            <span style="margin-right: 20px"
              >下单时间：{{refundInfo.info.add_time}}</span
            >
            <span style="margin-right: 20px">支付时间：{{ refundInfo.info.paid_time }}</span>
          </div>
          <!-- <img
            src="../../assets/image/newChuo.png"
            v-if="
              refundInfo.info.refundStatus != 0 &&
              refundInfo.info.refundStatus != 3 &&
              refundInfo.info.refundStatus != 4
            "
            alt=""
            class="poa"
            style="right: -36px; top: -100px; width: 200px"
          /> -->
          <img src="../../assets/image/yongChuo.png" v-if="refundInfo.info.refundStatus == 2" class="poa" style="width:200px;z-index:1000;top:-94px;right:0;" alt="" />
          <img
            v-else-if="refundInfo.info.refundStatus == 1"
            src="../../assets/image/newChuo.png"
            alt=""
            class="poa"
            style="width:200px;z-index:1000;top:-94px;right:0;"
          />
          <img
            v-else-if="refundInfo.info.refundStatus == 5 || refundInfo.info.refundStatus == 6"
            src="../../assets/image/juChuo.png"
            alt=""
            class="poa"
            style="width:200px;z-index:1000;top:-94px;right:0;"
          />
        </div>
        <div
          class="tbody clearfix jin"
          style="height: 130px"
          v-if="refundInfo.info.method == '仅退款' || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '未收货')"
        >
          <div
            class="div"
            style="
              width: 30%;
              padding: 20px 0 0 20px;
              border-right: 1px solid #bbb;
            "
          >
            <div v-if="active_type == 1">
              <span class="title">买家已申请,请尽快审核</span>
              <span class="text">如果您逾期未处理,系统将自动退还给买家</span>
            </div>
            <div v-else-if="active_type == 2">
              <span class="title">客服介入受理,请尽快处理售后</span>
              <span class="text">请尽快处理售后</span>
            </div>
            <div v-else-if="active_type == 3">
              <span class="title">退款完成,本次售后结束</span>
              <span class="text">本次售后结束</span>
            </div>
          </div>
          <div class="div" style="width: 69%; padding: 20px 0 0 20px">
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
          style="height: 130px"
          v-else-if="refundInfo.info.method == '退货退款' || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '已收货')"
        >
          <div
            class="div"
            style="
              width: 30%;
              padding: 20px 0 0 20px;
              border-right: 1px solid #bbb;
            "
          >
            <div v-if="active_type == 1">
              <span class="title">买家已申请,请尽快审核</span>
              <span class="text"
                >如果您逾期未处理,视作同意买家申请，系统将自动将当前交易的退货地址发个给买家</span
              >
            </div>
            <div v-else-if="active_type == 2">
              <span class="title">客服介入受理,请尽快处理售后</span>
              <span class="text"
                >如果您逾期未处理,视作同意买家申请，系统将自动将当前交易的退货地址发个给买家</span
              >
            </div>
            <div v-else-if="active_type == 3">
              <span class="title">同意退款,寄回地址已给买家</span>
              <span class="text">请客服尽快确认买家寄回的商品是否完好！</span>
            </div>
            <div v-else-if="active_type == 4">
              <span class="title">退款完成,本次售后结束</span>
              <span class="text">本次售后结束</span>
            </div>
          </div>
          <div class="div" style="width: 69%; padding: 20px 0 0 20px">
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

        <!-- <div class="tbody" style="padding: 15px 0 15px 20px">
          <span style="color: #1b2ba6"
            >商家备注：{{
              refundInfo.info.bak == "" ? "无" : refundInfo.info.bak
            }}</span
          >
        </div> -->
      </div>

      <el-row :gutter="20" class="goodsindex-list goodsindex-list2" style="margin: 0 0 0 0">
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
            <el-table-column label="图片" width="130" align="center">
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
            <el-table-column label="退款明细" width="150">
              <template>
                <div style="color: red">
                  订单合计: {{ refundInfo.info.cost_price }}元
                </div>
                <div style="color: red">
                  退款合计: {{ refundInfo.info.pro_cost_price }}元
                </div>
              </template>
            </el-table-column>
            <el-table-column label="运费" prop="number">
              <template>
                <div v-if="refundInfo.info.postage">{{ refundInfo.info.postage }}</div>
                <div v-else>暂无</div>
              </template>
            </el-table-column>
            <el-table-column label="优惠">
              <template>
                <div>暂无</div>
              </template>
            </el-table-column>

            

            <el-table-column label="退款人" width="150">
              <template>
                <div>{{ refundInfo.info.nickname }}</div>
                <!-- <div>UID: {{ refundInfo.info.uid }}</div> -->
                <div>{{ refundInfo.info.address_tel }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div class="item item1">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/newQizhi.png" alt="" />
          <span>2</span>
        </div>
        <div class="title lt">
          售后辅助信息
          <span class="san"></span>
        </div>
      </div>
      <el-row :gutter="20" class="goodsindex-list goodsindex-list2" style="margin: 0 0 0 0">
        <el-col :span="24" style="padding: 0; margin-top: 20px">
          <el-table :data="order_s_list1" border>
            <el-table-column label="退款人信息">
              <template>
                <div>昵称: {{ refundInfo.info.nickname }}</div>
                <div>账号: {{ refundInfo.info.address_tel }}</div>
                <!-- <div>UID: {{ refundInfo.info.uid }}</div> -->
              </template>
            </el-table-column>
            <el-table-column label="退款原因">
              <template>
                <div>{{ refundInfo.info.type }}</div>
              </template>
            </el-table-column>
            <el-table-column label="退货说明">
              <template>
                <div>{{ refundInfo.info.content }}</div>
              </template>
            </el-table-column>
            <el-table-column label="退货凭证" width="100">
              <template>
                <!-- images -->
                <div v-for="(item,index) in refundInfo.info.images" :key="index">
                  <el-image
                    :src="item"
                    fit="cover"
                    style="width: 80px; height: 80px"
                    :preview-src-list="[item]"
                  ></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品收货状态">
              <template>
                <div style="color: #ee8f29">
                  {{ refundInfo.info.product_status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="收货人信息">
              <template>
                <div>收货人: {{ refundInfo.info.address_user }}</div>
                <div>电话: {{ refundInfo.info.address_tel }}</div>
                <div>
                  地址: {{ refundInfo.info.address.province }}
                  {{ refundInfo.info.address.city }}
                  {{ refundInfo.info.address.area }}
                  {{ refundInfo.info.address.address }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 退货退款区域 -->
    <!-- 第三步 -->
    <div class="item item1" v-if="refundInfo.info.method == '退货退款'">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/newQizhi.png" alt="" />
          <span>3</span>
        </div>
        <div class="title lt">
          商家寄出快递物流信息
          <span class="san"></span>
        </div>
      </div>
      <div v-for="(item,index) in refundInfo.info.express" :key="index">
        <p style="margin: 20px 0 0" v-if="index == 0">默认分包</p>
        <p style="margin: 20px 0 0" v-else>新增分包{{index}}</p>
        <el-row :gutter="20" class="goodsindex-list goodsindex-list2" style="margin: 0 0 0 0">
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
                  <el-button
                    v-if="item.delivery_mode == 1"
                    type="info"
                    plain
                    @click="seeInfo('1',item)"
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
    <!-- 退货退款区域 -->
    <!-- 第四步 -->
    <!-- 选择用户退回地址 -->
    <div v-if="
        refundInfo.info.method == '退货退款' &&
        refundInfo.info.refundStatus == '0' &&
         refundInfo.info.product_status == '已收货'
      ">
      <div
        class="item item1"
      >
        <div class="head clearfix">
          <div class="qizhi lt">
            <img src="../../assets/image/newQizhi.png" alt="" />
            <span>4</span>
          </div>
          <div class="title lt">
            选择用户退回地址
            <span class="san"></span>
          </div>
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
          <div v-if="address_p.length > 0">
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
          <div class="kong" v-else>
            空空如也
          </div>
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
    
    <!-- 卖家点了已同意退货退款。 -->
    <div class="item item1" v-else-if="refundInfo.info.method == '退货退款' && (refundInfo.info.refundStatus == '3' || refundInfo.info.refundStatus == '4' || refundInfo.info.refundStatus == '1') && refundInfo.info.product_status == '已收货'">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/newQizhi.png" alt="" />
          <span>4</span>
        </div>
        <div class="title lt">
          用户回寄物流信息
          <span class="san"></span>
        </div>
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
            <el-table-column label="物流查询">
              <template>
                <div class="clearfix">
                  <span class="lt" style="width:200px;display:block;line-height:30px">运单号：{{refundInfo.info.express_no}}</span>
                  <el-button
                    class="rt"
                    type="primary"
                    @click="seeInfo('2')"
                    v-if="(refundInfo.info.refund_status == 4 || refundInfo.info.refund_status == 1) && refundInfo.info.express_no != ''"
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
      <div v-if="refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '3'">
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
      <div v-else>
        
        
      </div>
    </div>
    <div v-if="refundInfo.info.method == '退货退款'">
      <div class="textDiv" v-if="refundInfo.info.refundStatus == 2">
        <p>【退款取消】</p>
        <p>该售后订单已退款取消！</p>
      </div>
      <div class="textDiv" v-else-if="refundInfo.info.refundStatus == 5 || refundInfo.info.refundStatus == 6">
        <p>【退款拒绝】</p>
        <p>该售后订单已退款拒绝！</p>
      </div>
      <div class="textDiv" v-else-if="refundInfo.info.refundStatus == 1">
        <p>【处理完成】</p>
        <p>该售后订单已处理完成！</p>
      </div>
    </div>
    

    <!-- 仅退款区域 -->
    <div class="item item1" v-if="refundInfo.info.method == '仅退款'">
      <div class="head clearfix">
        <div class="qizhi lt">
          <img src="../../assets/image/newQizhi.png" alt="" />
          <span>3</span>
        </div>
        <div class="title lt">
          商家寄出物流信息
          <span class="san"></span>
        </div>
      </div>

      <div class="tables clearfix" v-if="refundInfo.info.order_status == '待发货'">
        <img src="../../assets/image/gantan.png" alt="" />
        <span class="span">该订单未发货，用户已申请退款</span>
      </div>
      <div class="tables clearfix" v-else-if="refundInfo.info.order_status == '待收货'">
        <img src="../../assets/image/gantan.png" alt="" />
        <span class="span">订单已经发出,用户可以直接申请退款,或退货退款</span>
      </div>
    </div>
    
    <!-- 第一步：买家已经申请 -->
    <div v-if="(refundInfo.info.method == '仅退款' && active_type == '1') || (refundInfo.info.method == '退货退款' && refundInfo.info.refundStatus == '0' && refundInfo.info.product_status == '未收货')">
      <div class="textDiv">
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
    <div v-if="refundInfo.info.method == '仅退款' && active_type == '3'">
      <div class="textDiv" v-if="refundInfo.info.refundStatus == 2">
        <p>【退款取消】</p>
        <p>该售后订单已退款取消！</p>
      </div>
      <div class="textDiv" v-else-if="refundInfo.info.refundStatus == 5 || refundInfo.info.refundStatus == 6">
        <p>【退款拒绝】</p>
        <p>该售后订单已退款拒绝！</p>
      </div>
      <div class="textDiv" v-else-if="refundInfo.info.refundStatus == 1">
        <p>【处理完成】</p>
        <p>该售后订单已处理完成！</p>
      </div>
    </div>
    
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
      <!-- 拒绝申请 -->
      <el-dialog
        width="30%"
        class="remarks_box"
        :visible.sync="refuse_innerVisible"
        append-to-body>
        <div class="info">拒绝申请</div>
        <el-form :model="form_refuse" style="margin-top:20px">
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
  </div>
</template>
<script>
import {
  refund_info,
  express_list,
  get_province,
  get_express,
  refuse_apply,
  agree_refund,
  get_area,
  get_city,
  default_address,
  address_add,
  refuse_agree,
  return_express,
  upload_img,
  return_agree,
} from "../../utils/axios";
export default {
  data() {
    return {
      form_refuse : {
        remarks : ''
      },
      type:"0",
      kuang_show:false,
      dialogImageUrl:"",
      show_write_loading:false,
      dialogVisible:false,
      write_show:false,
      order_s_list1: ["1"],
      refundInfo: { info: {
        store_id:""
      } },
      wlList_show:false,
      wlList_p: [],
      wlList_show: false,
      delivery_blean: false,
      provinceList: [], //省
      cityList: [], //市
      city_ifShow: false,
      areaList: [], //区
      area_ifShow: false,
      remarks_formLabelWidth: "100px",
      product_id: "",
      active_type: "1",
      blean: false,
      wlList_p: [],
      yuanActive: "0",
      moren:"0",
      yuanList: [1, 2, 3],
      agree_to_return_show : false,
      refuse_innerVisible:false,
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
      express_list_b:[],
      address_p:[],
      form_adderess_p : {
        express : '',
        ydh : '',
        yf : ''
      },
      fileList:[],//组图参数
      value : {
        fileList_copy : []  ,
        fileList_copy_p : []
      },
      refuseType:"0",
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
      this.info();
    } else {
      this.product_id = localStorage.getItem("refundId");
      //获取商品信息
      this.info();
    }
    this.get_province(); //获取省份
    this.expressList(); //获取物流公司
  },
  methods: {
    go(uid,name){
      this.$confirm('此操作将跳往<' + name + '>供应商店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open("https://www.rcwisdom.com/h5/admin/supplier/index.html#/?url=" + uid)
      }).catch(() => {
                  
      });
    },
    typeClick(index){
      this.type = index
      this.kuang_show = true
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

    }
    ,
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
              if(res.data.err_msg){
                that.address_p = res.data.err_msg;
                if(res.data.err_msg.length > 0){
                  res.data.err_msg.forEach((item,index) => {
                    if(item.is_default == 1){
                      this.moren = index
                      this.yuanActive = index
                    }
                  })
                }
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
    //按钮事件开始
    //同意退货地址
    sure_address(){
      let that = this
      let data = this.address_p[parseInt(this.yuanActive)]
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
    // 同意申请
    agree_btn(){
      
      let that = this
      // (
      //   {
      //     return_id : that.refundInfo.info.return_id,
      //   }
      // )
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
    //拒绝申请
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
    seeInfo(ind,item){
      let that = this;

      let　data;
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
    info() {
      let that = this;
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

            res.data.err_msg.info.express_time = that.commonJs.timestampToTime(
              res.data.err_msg.info.express_time
            );
            res.data.err_msg.info.refund_time = that.commonJs.timestampToTime(
              res.data.err_msg.info.refund_time
            );
            if (res.data.err_msg.info.paid_time) {
              res.data.err_msg.info.paid_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.paid_time
              );
            }
            if (res.data.err_msg.info.add_time) {
              res.data.err_msg.info.add_time = that.commonJs.timestampToTime(
                res.data.err_msg.info.add_time
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
            console.log(this.refundInfo.info.express_images)
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
    //表格合并行
    cellMerge2({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (
        columnIndex == 6 ||
        columnIndex == 4 ||
        columnIndex == 5 ||
        columnIndex == 7 ||
        columnIndex == 8
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
    //表格合并行
    cellMerge3({ row, column, rowIndex, columnIndex }) {
      // console.log(columnIndex)
      //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
      let _row = 1;
      let _col = 1;
      if (
        columnIndex == 2 ||
        columnIndex == 3 ||
        columnIndex == 4
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
  },
};
</script>

<style scoped lang="less">
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
  margin-top: 20px;
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
  margin-top: 20px;
  border: 1px solid #bbb;
  .kong{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #fff;
  }
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
    // .td:nth-of-type(1) {
    //   width: 100px;
    // }
    // .td:nth-of-type(2) {
    //   width: 120px;
    // }
    // .td:nth-of-type(3) {
    //   width: 150px;
    // }
    // .td:nth-of-type(4) {
    //   width: 250px;
    // }
    // .td:nth-of-type(5) {
    //   width: 300px;
    // }
    // .td:nth-of-type(6) {
    //   width: 400px;
    // }
    // .td:nth-of-type(7) {
    //   width: 282px;
    // }
    .td:last-child {
      border-right: none;
    }
  }
  .tr:last-child {
    border-bottom: none;
  }
  &>.tr:nth-of-type(1){
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
  z-index: 1000;
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
/deep/ .goodsindex-list2 .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color:#fff!important;
}
/deep/ .goodsindex-list2 .goodsindex-list .el-table__body tr:last-child{
  border-bottom: 1px solid #717b90;
}
/deep/ .goodsindex-list2 .el-table--enable-row-hover .el-table__body:hover tr.active>td{
  background-color:#dce1e8!important;
  // #dce1e8
}

</style>