<template>
  <div class="page1">
    <div class="work clearfix">
      <span>客服-----{{ coustServState }}</span>
      <div class="select">
        <!-- <el-select
          v-model="pick_condition"
          @change="selec"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="cover">
      <!-- 左侧用户列表 -->
      <div class="left">
        <div
          class="item"
          v-for="(item, index) in userList"
          :class="
            item.uid == toid ? 'active' : item.data.is_read == 0 ? 'bbb' : ''
          "
          :key="index"
          @click="user(item, index)"
        >
          <div class="img">
            <el-image
              style="width: 43px; height: 43px"
              :src="item.image"
            ></el-image>
          </div>
          <div class="text">
            <span class="span">{{ item.name }}</span>
            <span class="span" v-if="item.data.type == 1">{{
              item.data.content
            }}</span>
            <span class="span" v-else-if="item.data.type == 2">[图片]</span>
            <span class="span" v-else-if="item.data.type == 3">[视频]</span>
            <span class="span" v-else-if="item.data.type == 4">[商品]</span>
            <span class="span" v-else-if="item.data.type == 5">[订单]</span>
          </div>
        </div>
      </div>
      <!-- 中间客服和用户沟通界面 -->
      <div class="center">
        <p class="ing">正在服务</p>
        <div class="ings clearfix">
          <!-- 沟通用时：{{ commTime }} -->
          <span class="leftSpan"
            ><el-button
              class="btn"
              type="primary"
              style="position: absolute; top: -3px; left: 0px"
              @click="pick_seach"
              >刷新消息</el-button
            ></span
          >
          <span class="rightSpan">对话次数：{{ commNumber }}次</span>
        </div>
        <div class="commun" ref="messagesContainer" @wheel="handleWheel">
          <div v-if="endBlean" style="text-align: center; color: #7d7d7d">
            已经加载全部
          </div>
          <div v-for="(item, index) in newsList" :key="index">
            <div v-if="newsList.length > 0">
              <div v-if="item.type != 'save'">
                <!--  v-if="fromid == item.fromid" -->

                <div class="kf" v-if="toid != item.fromid">
                  <div class="tim">
                    {{ item.add_time }}
                  </div>

                  <div class="content clearfix">
                    <div class="img">客服</div>
                    <div
                      class="news"
                      v-if="item.type == 1 || item.type == 'text'"
                    >
                      {{ item.content }}
                    </div>
                    <div
                      class="news"
                      v-else-if="item.type == 2 || item.type == 'image'"
                    >
                      <el-image
                        style="width: 250px"
                        :src="item.content"
                        :preview-src-list="[item.content]"
                      ></el-image>
                    </div>
                    <div
                      class="news"
                      v-else-if="item.type == 3 || item.type == 'video'"
                    >
                      <video
                        style="width: 250px; height: 250px"
                        controls="controls"
                        poster="../../assets/image/logo.png"
                        :src="item.content"
                        id="video"
                      >
                        您的浏览器不支持H5播放器
                      </video>
                    </div>
                    <div class="news" v-else>
                      {{ item.content }}
                    </div>
                  </div>
                </div>
                <!-- v-else-if="item.toid == fromid" -->
                <div class="user" v-else>
                  <div class="tim clearfix" style="width: 397px">
                    <span>{{ userName }}</span>
                    <p v-if="item.add_time">{{ item.add_time }}</p>
                    <p v-else-if="item.time">{{ item.time }}</p>
                  </div>
                  <div class="content clearfix">
                    <div class="img">
                      <el-image
                        style="width: 37px; height: 37px"
                        :src="userImg"
                      ></el-image>
                    </div>
                    <div
                      class="news"
                      v-if="item.type == '1' || item.type == 'text'"
                    >
                      {{ item.content }}
                    </div>
                    <div
                      class="news"
                      v-else-if="item.type == '2' || item.type == 'image'"
                    >
                      <el-image
                        style="width: 250px"
                        :src="item.content"
                        :preview-src-list="[item.content]"
                      ></el-image>
                    </div>
                    <div
                      class="news"
                      v-else-if="item.type == '3' || item.type == 'video'"
                    >
                      <video
                        style="width: 250px; height: 250px"
                        controls="controls"
                        poster="../../assets/image/logo.png"
                        :src="item.content"
                        id="video"
                      >
                        您的浏览器不支持H5播放器
                      </video>
                    </div>
                    <div
                      class="news flexBet"
                      style="width: 350px; height: 119px; padding: 8px"
                      v-else-if="item.type == '4' || item.type == 'product'"
                    >
                      <div style="width: 100px; height: 100px" class="flexCen">
                        <el-image
                          :src="item.content.image"
                          style="width: 100px; height: 100px"
                          :preview-src-list="[item.content.image]"
                          fit="cover"
                        ></el-image>
                      </div>
                      <div style="width: 200px; height: 100px" class="flexShu">
                        <div class="yichu heightAuto">
                          商品名称 : {{ item.content.name }}
                        </div>
                        <div class="yichu heightAuto">
                          商品id : {{ item.content.product_id }}
                        </div>
                        <div class="yichu heightAuto">
                          结算价 : {{ item.content.primeCostPrice }}
                        </div>
                      </div>
                    </div>
                    <!-- 
                     -->
                    <div
                      class="news"
                      style="width: 472px"
                      v-else-if="item.type == 5 || item.type == 'order'"
                    >
                      <!-- 订单 -->
                      <div
                        class="flexBet"
                        style="width: 450px; padding: 8px; margin-bottom: 10px"
                      >
                        <div
                          style="width: 350px; height: 120px"
                          class="flexShu"
                        >
                          <div class="yichu heightAuto">
                            下单时间 : {{ item.content.addTime }}
                          </div>
                          <div class="yichu heightAuto">
                            订单号 : {{ item.content.order_no }}
                          </div>
                          <div class="yichu heightAuto">
                            订单数量 : {{ item.content.product_num }}
                          </div>
                        </div>
                        <div
                          style="width: 150px; height: 120px"
                          class="flexShu"
                        >
                          <div class="yichu heightAuto">
                            订单id : {{ item.content.order_id }}
                          </div>
                          <div class="yichu heightAuto">
                            订单状态 :
                            <span v-if="item.content.status == 0"
                              >临时订单</span
                            >
                            <span v-else-if="item.content.status == 1"
                              >待支付</span
                            >
                            <span v-else-if="item.content.status == 2"
                              >待发货</span
                            >
                            <span v-else-if="item.content.status == 3"
                              >待收货</span
                            >
                            <span v-else-if="item.content.status == 4"
                              >(待评价)已完成</span
                            >
                            <span v-else-if="item.content.status == 5"
                              >已取消</span
                            >
                            <span v-else-if="item.content.status == 7"
                              >待完成</span
                            >
                          </div>
                          <div class="yichu heightAuto">
                            订单结算价 : {{ item.content.costPrice }}
                          </div>
                        </div>
                      </div>

                      <!-- <div class="flexBet" style="width: 350px;height:119px;padding:8px;" v-for="(items,indexs) in item.content.product" :key="indexs">
                        <div style="width:100px;height:100px;" class="flexCen">
                          <el-image
                            :src="items.image"
                            style="width:100px;height:100px;"
                            :preview-src-list="[items.image]"
                            fit="cover"
                          ></el-image>
                        </div>
                        <div style="width:200px;height:100px;" class="flexShu">
                          <div class="yichu heightAuto">商品名称 : {{items.name}}</div>
                          <div class="yichu heightAuto">商品id : {{items.product_id}}</div>
                          <div class="yichu heightAuto">商品价格 : {{items.price}}</div>
                        </div>
                      </div> -->

                      <!-- <div class="flexBet" style="width: 339px;height:119px;padding:8px;">
                        <div style="width:100px;height:100px;" class="flexCen">
                          <el-image
                            :src="item.content.product.product_image"
                            style="width:100px;height:100px;"
                            :preview-src-list="[item.content.product.product_image]"
                            fit="cover"
                          ></el-image>
                        </div>
                        <div style="width:200px;height:100px;" class="flexShu">
                          <div class="yichu heightAuto">商品名称 : {{item.content.product.product_name}}</div>
                          <div class="yichu heightAuto">商品id : {{item.content.product.product_id}}</div>
                          <div class="yichu heightAuto">结算价 : {{item.content.product.pro_price}}</div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fun">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="video_upload"
            :show-file-list="false"
            :before-upload="video_beforeUpload"
            list-type="picture"
          >
            <el-button
              icon="el-icon-picture"
              v-loading.fullscreen.lock="fullscreenLoading"
              circle
            ></el-button>
            <el-button icon="el-icon-video-camera" circle></el-button>
          </el-upload>
        </div>
        <div class="news">
          <div class="avatar" style="display:none">
            <!-- 图片上传组件辅助-->
            <el-upload
              id="quill-upload"
              action="上传的路径"
              ref="annexUpload"
              name="content"
              :limit="1"
              list-type="picture"
              :on-exceed="handleExceed"
              :on-error="handleError"
              :on-success="uploadAttachment"
              :file-list="uploadList"
              :with-credentials="true"
              :auto-upload="true">
            </el-upload>
          </div>
          <!-- <textarea
            type="text"
            v-model="news"
            class="input"
            placeholder=" 请输入内容"
            @keyup.enter="searchFile"
            @keydown.ctrl.13="send()"
          ></textarea> -->
          <quill-editor
            v-model="news"
            ref="myQuillEditor"
            :options="options"
            style="width: 100%; height: 100%"
            >
          </quill-editor>
          <el-tooltip content="回车发送消息" placement="top">
            <button class="btn" @click="send">发送(S)</button>
          </el-tooltip>
        </div>
      </div>
      <!-- T1 vs HLE
      RNG vs EDG
      DK vs MAD
      GEN vs C9 -->

      <!-- 右侧客服查看用户功能栏 -->
      <div class="right">
        <div class="block">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="客户信息" name="first">
              <table class="table" border="1" cellspacing="0">
                <tr>
                  <td>昵称</td>
                  <td>{{ userinfo.nickname }}</td>
                  <td>手机号码</td>
                  <td>{{ userinfo.phone }}</td>
                </tr>
                <tr>
                  <td>等级</td>
                  <td>{{ userinfo.level_name }}</td>
                  <td>注册时间</td>
                  <td>{{ userinfo.reg_time }}</td>
                </tr>
                <tr>
                  <td>实名认证</td>
                  <td>
                    <span v-if="userinfo.is_authentication == 1">是</span>
                    <span v-else>否</span>
                  </td>
                  <td>认证时间</td>
                  <td>{{ userinfo.authentication_time }}</td>
                </tr>
                <tr>
                  <td>订单数量</td>
                  <td>{{ userinfo.order_count }}</td>
                  <td>售后订单</td>
                  <td>{{ userinfo.return_count }}</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="订单查询" name="second">
              <div class="order">
                <el-input
                  v-model="orderNum"
                  class="input"
                  placeholder="请输入订单号"
                   @keyup.enter.native="orderSeach"
                ></el-input>
                <el-button
                  icon="el-icon-search"
                  class="btn"
                  @click="orderSeach"
                  circle
                ></el-button>
              </div>
              <!-- orderNumObj -->
              <!-- add_time -->
              <div class="box">
                <table
                  class="table"
                  border="1"
                  style="margin: 0"
                  cellspacing="0"
                >
                  <tr>
                    <td>订单编号</td>
                    <td colspan="4">{{ orderNumObj.order_no }}</td>
                  </tr>
                  <tr>
                    <td>下单时间</td>
                    <td>{{ orderNumObj.add_time }}</td>
                    <td>支付方式</td>
                    <td>
                      <span v-if="userinfo.payment_method == 'weixin'"
                        >微信</span
                      >
                      <span v-else-if="userinfo.payment_method == 'test'"
                        >测试单</span
                      >
                      <span v-else>其他</span>
                    </td>
                  </tr>
                  <tr>
                    <td>收货人</td>
                    <td>{{ orderNumObj.address_user }}</td>
                    <td>联系电话</td>
                    <td>{{ orderNumObj.address_tel }}</td>
                  </tr>
                  <tr>
                    <td>收货地址</td>
                    <td colspan="4">
                      {{ orderNumObj.address.province
                      }}{{ orderNumObj.address.city
                      }}{{ orderNumObj.address.area
                      }}{{ orderNumObj.address.address }}
                    </td>
                  </tr>
                  <tr>
                    <td>商品名称</td>
                    <td colspan="4">{{ orderNumObj.order_no }}</td>
                  </tr>
                  <tr>
                    <td>规格</td>
                    <td colspan="4">{{ orderNumObj.order_no }}</td>
                  </tr>
                  <tr>
                    <td>购买数量</td>
                    <td>{{ orderNumObj.pro_num }}</td>
                    <td>快递数量</td>
                    <td>{{ orderNumObj.order_package.length }}</td>
                  </tr>
                  <tr>
                    <td>运营商</td>
                    <td>{{ orderNumObj.store_name }}</td>
                    <td>订单状态</td>
                    <td>
                      <span v-if="userinfo.payment_method == 'weixin'"
                        >微信</span
                      >
                      <span v-else-if="userinfo.payment_method == 'test'"
                        >测试单</span
                      >
                      <span v-else>其他</span>
                    </td>
                  </tr>
                  <tr>
                    <td>配送方式</td>
                    <td colspan="4">
                      <span v-if="userinfo.shipping_method == 'express'"
                        >快递发货</span
                      >
                      <span v-else-if="userinfo.shipping_method == 'selffetch'"
                        >上门自提</span
                      >
                      <span
                        v-else-if="userinfo.shipping_method == 'self_choice'"
                        >自选物流</span
                      >
                      <span v-else>其他</span>
                    </td>
                  </tr>
                  <tr>
                    <td>销售价</td>
                    <td>{{ orderNumObj.pay_money }}</td>
                    <!-- **** -->
                    <td>成本价</td>
                    <td>{{ orderNumObj.cost_price }}</td>
                  </tr>
                  <tr
                    v-for="(exp, expI) in orderNumObj.order_package"
                    :key="expI"
                  >
                    <td>物流公司</td>
                    <td>{{ exp.express_company }}</td>
                    <td>物流单号</td>
                    <td>{{ exp.express_no }}</td>
                  </tr>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="沟通历史" name="third">
              <div class="order">
                <el-input
                  v-model="contentText"
                  class="input"
                  placeholder="请输入查询内容"
                  @keyup.enter.native="contentSeach"
                ></el-input>
                <el-button
                  icon="el-icon-search"
                  class="btn"
                  @click="contentSeach"
                  circle
                ></el-button>
              </div>
              <div class="commun" v-if="seachState == 0">
                <div v-if="userSeeList.length > 0">
                  <div v-for="(item, index) in userSeeList" :key="index">
                    <div v-if="userSeeList.length != 0">
                      <div class="kf" v-if="fromid == item.fromid">
                        <div class="tim clearfix">
                          <span class="rt">{{ item.add_time }}</span>
                          <span class="lt btn" @click="look(item)"
                            >查看沟通记录</span
                          >
                        </div>
                        <div class="content clearfix">
                          <div class="img">客服</div>
                          <div class="news">
                            {{ item.content }}
                          </div>
                        </div>
                      </div>
                      <div class="user" v-else-if="item.toid == fromid">
                        <div class="tim clearfix">
                          <span class="rt btn" @click="look(item)"
                            >查看沟通记录</span
                          >
                          <span class="lt">{{ item.add_time }}</span>
                        </div>
                        <div class="content clearfix">
                          <div class="img">
                            <el-image
                              style="width: 37px; height: 37px"
                              :src="userImg"
                            ></el-image>
                          </div>
                          <div class="news">
                            {{ item.content }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="userSeeList.length == 0"
                  style="color: #afafaf; text-align: center"
                >
                  查询为空
                </div>
              </div>
              <div
                class="commun"
                v-else-if="seachState == 1"
                ref="messagesContainer1"
                @mousewheel="handleWheel1"
              >
                <span class="black" @click="seachState = 0">返回上一级</span>
                <div
                  v-if="topBlean1"
                  style="text-align: center; color: #7d7d7d"
                >
                  上面已经没有了
                </div>
                <div v-for="(item, index) in userSeeList1" :key="index">
                  <div v-if="userSeeList1.length != 0">
                    <div class="kf" v-if="fromid == item.fromid">
                      <div class="tim">
                        {{ item.add_time }}
                      </div>
                      <div class="content clearfix">
                        <div class="img">客服</div>
                        <div class="news" v-if="item.type == 1">
                          {{ item.content }}
                        </div>
                        <div class="news" v-else-if="item.type == 2">
                          <el-image
                            style="width: 250px"
                            :src="item.content"
                            :preview-src-list="[item.content]"
                          ></el-image>
                        </div>
                        <div class="news" v-else-if="item.type == 3">
                          <video
                            style="width: 250px; height: 250px"
                            controls="controls"
                            poster="../../assets/image/logo.png"
                            :src="item.content"
                            id="video"
                          >
                            您的浏览器不支持H5播放器
                          </video>
                        </div>
                      </div>
                    </div>
                    <div class="user" v-else-if="item.toid == fromid">
                      <div class="tim">
                        {{ item.add_time }}
                      </div>
                      <div class="content clearfix">
                        <div class="img">
                          <el-image
                            style="width: 37px; height: 37px"
                            :src="userImg"
                          ></el-image>
                        </div>
                        <div
                          class="news"
                          v-if="item.type == 1 || item.type == 'text'"
                        >
                          {{ item.content }}
                        </div>
                        <div
                          class="news"
                          v-else-if="item.type == 2 || item.type == 'image'"
                        >
                          <el-image
                            style="width: 250px"
                            :src="item.content"
                          ></el-image>
                        </div>
                        <div
                          class="news"
                          v-else-if="item.type == 3 || item.type == 'video'"
                        >
                          <video
                            style="width: 250px; height: 250px"
                            controls="controls"
                            poster="../../assets/image/logo.png"
                            :src="item.content"
                            id="video"
                          >
                            您的浏览器不支持H5播放器
                          </video>
                        </div>
                        <div
                          class="news"
                          style="width: 280px"
                          v-else-if="item.type == 4 || item.type == 'product'"
                        >
                          <!-- 商品 -->
                          <h4 style="marign: 10px 0">商品信息</h4>
                          <el-image
                            :src="item.content.image"
                            style="width: 100px; height: 100px"
                            fit="cover"
                            :preview-src-list="[item.content.image]"
                          ></el-image>
                          <div class="tiemBlock">
                            商品id : {{ item.content.product_id }}
                          </div>
                          <div class="tiemBlock">
                            商品价格 : {{ item.content.price }}元
                          </div>
                          <div class="tiemBlock">
                            商品名称 : {{ item.content.name }}
                          </div>
                        </div>
                        <div
                          class="news"
                          style="width: 280px"
                          v-else-if="item.type == 5 || item.type == 'order'"
                        >
                          <!-- 订单 -->
                          <h4 style="marign: 10px 0">订单信息</h4>
                          <div class="tiemBlock">
                            下单时间 : {{ item.content.addTime }}
                          </div>
                          <div class="tiemBlock">
                            订单id : {{ item.content.order_id }}
                          </div>
                          <div class="tiemBlock">
                            订单号 : {{ item.content.order_no }}
                          </div>
                          <!-- <div class="tiemBlock">
                            实际付款金额 : {{item.content.pay_money}}
                          </div> -->
                          <!-- <div class="tiemBlock">
                            订单商品总数量 : {{item.content.product_num}}
                          </div> -->
                          <!-- <div class="tiemBlock">
                            应付款 : {{item.content.should_price}}元
                          </div> -->
                          <div class="tiemBlock">
                            订单状态 :
                            <span v-if="item.content.status == 0"
                              >临时订单</span
                            >
                            <span v-else-if="item.content.status == 1"
                              >待支付</span
                            >
                            <span v-else-if="item.content.status == 2"
                              >待发货</span
                            >
                            <span v-else-if="item.content.status == 3"
                              >待收货</span
                            >
                            <span v-else-if="item.content.status == 4"
                              >(待评价)已完成</span
                            >
                            <span v-else-if="item.content.status == 5"
                              >已取消</span
                            >
                            <span v-else-if="item.content.status == 7"
                              >待完成</span
                            >
                          </div>
                          <!-- <div class="tiemBlock">
                            分享赚钱 : {{item.content.sub_total}}
                          </div> -->
                          <h4>订单商品信息</h4>
                          <el-image
                            :src="item.content.product.product_image"
                            :preview-src-list="[
                              item.content.product.product_image,
                            ]"
                            style="width: 100px; height: 100px"
                            fit="cover"
                          ></el-image>
                          <div class="tiemBlock">
                            商品名称 : {{ item.content.product.product_name }}
                          </div>
                          <div class="tiemBlock">
                            商品数量 : {{ item.content.product.pro_num }}
                          </div>
                          <div class="tiemBlock">
                            商品id : {{ item.content.product.product_id }}
                          </div>
                          <div class="tiemBlock">
                            商品价格 : {{ item.content.product.pro_price }}元
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="endBlean1"
                  style="text-align: center; color: #7d7d7d; margin-top: 20px"
                >
                  下面已经加载全部了
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="物流查询" name="fourth">
              <div class="order">
                <el-select
                  v-model="pick_condition1"
                  placeholder="请选择快递公司"
                >
                  <el-option
                    v-for="items in options1"
                    :key="items.pigcms_id"
                    :label="items.name"
                    :value="items.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="order">
                <el-input
                  v-model="contentText1"
                  class="input"
                  placeholder="请输入快递单号"
                  @keyup.enter.native="contentSeach1"
                ></el-input>
                <el-button
                  icon="el-icon-search"
                  class="btn"
                  @click="contentSeach1"
                  circle
                ></el-button>
              </div>
              <div class="orderBox">
                <div v-if="express.Reason == '暂无轨迹信息'">暂无轨迹信息</div>
                <div
                  class="item clearfix"
                  v-for="(item, index) in express.Traces"
                  :key="index"
                >
                  <div
                    class="itemLeft"
                    v-if="item.Action == 2 && item.blean == false"
                  ></div>
                  <div class="itemLeft" v-else>
                    {{ item.AcceptTime }}
                  </div>
                  <div class="itemCenter">
                    <div class="por">
                      <div class="icon" v-if="item.Action == 301">
                        <i class="el-icon-place"></i>
                      </div>
                      <div class="icon" v-else-if="item.Action == 304">
                        <i class="el-icon-finished"></i>
                      </div>
                      <div class="icon" v-else-if="item.Action == 202">
                        <i class="el-icon-user-solid"></i>
                      </div>
                      <div
                        class="icon"
                        v-else-if="item.Action == 2 && item.blean"
                      >
                        <i class="el-icon-truck"></i>
                      </div>
                      <div
                        class="icon dian"
                        v-else-if="item.Action == 2 && item.blean == false"
                      >
                        <i class=""></i>
                      </div>
                      <div class="icon" v-else-if="item.Action == 1">
                        <i class="el-icon-s-goods"></i>
                      </div>
                      <s></s>
                    </div>
                  </div>
                  <div class="itemRight">
                    <div class="big" v-if="item.Action == 301">待取件</div>
                    <div class="big" v-else-if="item.Action == 304">已完成</div>
                    <div class="big" v-else-if="item.Action == 202">派送中</div>
                    <div class="big" v-else-if="item.Action == 2 && item.blean">
                      运输中
                    </div>
                    <div class="big" v-else-if="item.Action == 1">已发货</div>
                    <div class="small">
                      {{ item.AcceptStation }}
                    </div>
                  </div>
                </div>
                <!-- <div class="item clearfix">
                  <div class="itemLeft">
                    05-09 08:49
                  </div>
                  <div class="itemCenter">
                    <div class="por">
                      <div class="icon">
                        <i class="el-icon-s-order"></i>
                      </div>
                      <s></s>
                    </div>
                  </div>
                  <div class="itemRight">
                    <div class="big">
                      已下单
                    </div>
                    <div class="small">
                      已经下单过了
                    </div>
                  </div>
                </div> -->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="bottom">
          <!-- 常用语 -->
          <div class="ings clearfix">常用语</div>
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title"> 问候用语 </template>
              <div
                v-for="(item, index) in useful.greetings"
                :key="index"
                @click="fulSend(item)"
              >
                {{ item }}
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title"> 售后用语 </template>
              <div
                v-for="(item, index) in useful.after_sale"
                :key="index"
                @click="fulSend(item)"
              >
                {{ item }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicFile from '../../utils/publicFile'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
function debounce(func, wait = 2000) {
  //可以放入项目中的公共方法中进行调用
  let timeout;
  return function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}
let toolbarOptions =[
  ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 几级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序列表，无序列表
  [{ script: "sub" }, { script: "super" }], // 下角标，上角标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文字输入方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 颜色选择
  [{ font: [] }], // 字体
  [{ align: [] }], // 居中
  ["link", "image"],
  ["clean"]
]
import {
  ask_get_list,
  get_chat_record,
  redis_sql,
  add_chat_record,
  user_info,
  order_search,
  chat_search,
  set_online,
  uploadfiles,
  set_useful,
  history_record_search,
  get_express_jvbao,
  get_express,
} from "../../utils/axios";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      seachState: 0,
      pick_condition: "1",
      pick_condition1: "",
      options1: [],
      options: [
        {
          value: "1",
          label: "在线",
        },
        {
          value: "0",
          label: "离线",
        },
      ],
      coustServState: "在线",
      contentText: "",
      contentText1: "",
      userinfo: {},
      activeName: "first",
      userImg: "",
      userName: "",
      news: "",
      fromid: 0,
      toid: "",
      userList: [],
      newsList: [],
      orderNum: "",
      orderNumObj: {
        order_package: {},
        address: {},
      },
      userSeeList: "1",
      userSeeList1: [],
      commNumber: "",
      commTime: "",
      time: 0,
      Minute: 0,
      timeClear: "",
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      timeout: 5 * 1000, //30秒一次心跳
      lockReconnect: false, //是否真正建立连接
      websock: null, //建立的连接
      video_upload_err: false,
      useful: {
        greetings: [],
        after_sale: [],
      },
      fullscreenLoading: false,
      videoUrl: "",
      videoType: "",
      searchPage: "",
      queryInfo: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      },
      queryInfo1: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      },
      queryInfo2: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      },
      endBlean: false,
      endBlean1: false,
      topBlean1: false,
      lookItem: "",
      express: "",
      interval: "",
      //节流data
      redisId: "",
      timess: 5,
      nowTime: 0,
      inter: "", //循环js
      numClone: 0,
      closeBlean: false,
      uploadList: [],
      options: {
        placeholder: "请输入内容",
        theme: 'snow',  // or 'bubble'
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 几级标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序列表，无序列表
              [{ script: "sub" }, { script: "super" }], // 下角标，上角标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文字输入方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ color: [] }, { background: [] }], // 颜色选择
              [{ font: [] }], // 字体
              [{ align: [] }], // 居中
              ["link", "image"],
              ["clean"]
            ],  // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                // 绑定上传图片按钮
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          keyboard:{
            bindings:{
              enter:{
                key:13,
                handler:(range,context)=>{
                  this.send()
                }
              }
            }
          }
        },
      },
      
    };
  },
  
  created() {
    this.fromid = JSON.parse(localStorage.getItem('admin_messages')).store_id
    // this.fromid = 699;

    this.selec("1");
    this.numClone = 0;
    this.closeBlean = false;
  },
  mounted: function () {
    if (this.websock) {
      //请求客服对话的用户列表
      this.askUseList();
    } else {
      //请求客服对话并开启websocket
      this.askUseList("1");
    }

    //开启60s请求一次用户列表
    this.interval = setInterval(() => {
      //请求客服对话的用户列表
      this.newsUserList();
    }, 60000);
    //请求常用语
    this.setUseful();
    this.getExpress();

    let quill = this.$refs.myQuillEditor.quill
    if (!this.disableFlag) {
      toolbarOptions[0] = ['image']
    }

    
    this.$forceUpdate()
    quill.root.addEventListener('paste', evt => {
      if (evt.clipboardData && evt.clipboardData.files && evt.clipboardData.files.length) {
        evt.preventDefault();
        [].forEach.call(evt.clipboardData.files, file => {
          if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
            return
          }
          this.uploadToServer(file, (res) => {
            // 获取光标内容
            var range = quill.getSelection()
            if (range) {
              this.uploadAttachment(res, file, null)
              //  将光标移动到图片后面
              this.$refs.myQuillEditor.quill.setSelection(range.index + 1)
            }
          })
        })
      }
    }, false)
  },
  destroyed() {
    //结束循环请求
    console.log("注销");
    clearInterval(this.interval);
    clearInterval(this.timeClear);
    //注销websocket
    console.log(this.websock);
    // this.selec("0")
  },
  methods: {
    getExpress() {
      get_express_jvbao({}).then((res) => {
        if (res.data.err_code == 0) {
          this.options1 = res.data.err_msg.list;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    doSth() {
      console.log("Ctrl + Click");
    },
    searchFile(e) {
      // if (e.ctrlKey && e.keyCode == 13) {
      //   //用户点击了ctrl+enter触发
      //   console.log("ctrl+enter");
      //   this.news += "\n";
      // } else {
      //   //用户点击了enter触发
      //   if (this.news.slice(this.news.length - 1) == "\n") {
      //     this.news = this.news.slice(0, this.news.length - 1);
      //   }
        this.send();
      // }
    },
    //上传视频
    video_upload(item) {
      console.log(item);
      if (this.pick_condition === 0) {
        this.$message({
          showClose: true,
          message: "客服处于离线状态.无法发送信息",
          type: "error",
        });
      } else {
        if (this.video_upload_err == false) {
          this.fullscreenLoading = true;
          let fd = new FormData();
          fd.append("file", item.file);
          console.log(fd.get("file"));
          uploadfiles(fd)
            .then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                this.videoUrl = res.data.err_msg.url;
                this.fullscreenLoading = false;
                var tim = this.commonJs.dataTime(new Date());
                var tim1 = this.commonJs.newTimestampToTime(new Date());
                var data = {
                  type: this.videoType,
                  uid: this.toid,
                  fromid: this.fromid,
                  toid: this.toid,
                  content: this.videoUrl,
                  add_time: tim1,
                };
                this.newsList.push(data);
                console.log(data);
                add_chat_record({
                  type: this.videoType,
                  uid: this.toid,
                  fromid: this.fromid,
                  toid: this.toid,
                  content: this.videoUrl,
                  time: tim,
                }).then((res) => {
                  if (res.data.err_code == 0) {
                    this.fullscreenLoading = false;
                    var date;
                    if (this.videoType == 2) {
                      date = {
                        content: this.videoUrl,
                        type: "image",
                        fromid: "store_" + this.fromid,
                        toid: this.toid,
                      };
                    } else if (this.videoType == 3) {
                      date = {
                        content: this.videoUrl,
                        type: "video",
                        fromid: "store_" + this.fromid,
                        toid: this.toid,
                      };
                    }
                    date = JSON.stringify(date);
                    console.log("send 图片视频");
                    console.log(date);
                    // 客户端给 getwayworker发送消息
                    this.websock.send(date);

                    this.commNumber++;
                    setTimeout(() => {
                      this.$refs.messagesContainer.scrollTop =
                        this.$refs.messagesContainer.scrollHeight;
                    }, 100);
                  } else {
                    this.$message({
                      showClose: true,
                      message: res.data.err_msg,
                      type: "error",
                    });
                  }
                });
                this.videoDetail = res.data.err_msg;
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
    //视频上传之前
    video_beforeUpload(file) {
      console.log(file);
      let str = file.name;
      var index = str.lastIndexOf(".");
      console.log(index);
      str = str.substring(index + 1, str.length);
      console.log(str);

      if (
        str == "mp4" ||
        str == "avi" ||
        str == "asf" ||
        str == "wmv" ||
        str == "mov" ||
        str == "jpg" ||
        str == "bmp" ||
        str == "png" ||
        str == "tif" ||
        str == "gif" ||
        str == "jpeg"
      ) {
        if (
          str == "mp4" ||
          str == "avi" ||
          str == "asf" ||
          str == "wmv" ||
          str == "mov"
        ) {
          this.videoType = 3;
        }
        if (
          str == "bmp" ||
          str == "png" ||
          str == "tif" ||
          str == "gif" ||
          str == "jpeg" ||
          str == "jpg"
        ) {
          this.videoType = 2;
        }
      } else {
        this.$message.error("请上传图片或者视频格式!");
        this.video_upload_err = true;
      }
      if (file.size / 1024 / 1024 > 200) {
        this.$message.error("文件大小不能超过 200MB!");
        this.video_upload_err = true;
      }
    },
    // times() {
    //   this.timeClear = setInterval(() => {
    //     this.time++;
    //     if (this.time == 60) {
    //       this.Minute++;
    //       this.time = 0;
    //     }
    //     this.commTime = this.Minute + "分 : " + this.time + "秒";
    //   }, 1000);

    // },
    contentSeach1() {
      if (this.pick_condition1 == "" || this.contentText1 == "") {
        this.$message({
          message: "搜索信息不能为空",
          type: "warning",
        });
        return;
      }
      get_express({
        express_code: this.pick_condition1,
        express_no: this.contentText1,
      }).then((res) => {
        if (res.data.err_code == 0) {
          console.log(res);
          res.data.err_msg.Traces.reverse();
          var blean = true;
          res.data.err_msg.Traces.forEach((element) => {
            if (element.Action == "2") {
              if (blean) {
                element.blean = true;
                blean = false;
              } else {
                element.blean = false;
              }
            }
          });
          this.express = res.data.err_msg;
          console.log(this.express);
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //客服搜索沟通记录
    contentSeach() {
      if (this.contentText == "") {
        this.$message({
          message: "搜索信息不能为空",
          type: "warning",
        });
        return;
      }
      chat_search({
        uid: this.toid,
        keys: this.contentText,
      }).then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach((element, i) => {
            element.add_time = this.commonJs.timestampToTime(element.add_time);
            if (element.type == 5) {
              element.content.addTime = this.commonJs.timestampToTime(
                element.content.addTime
              );
            }
          });
          this.userSeeList = res.data.err_msg.list;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    look(item) {
      this.queryInfo1.page = 1;
      this.lookItem = item;
      history_record_search({
        uid: item.fromid,
        chat_id: item.id,
        type: "2",
        page: this.queryInfo1.page,
        page_size: this.queryInfo1.pageSize,
      }).then((res) => {
        console.log(res);
        if (res.data.err_code == 0) {
          this.seachState = 1;
          res.data.err_msg.list.forEach((element, i) => {
            element.add_time = this.commonJs.timestampToTime(element.add_time);
          });
          if (res.data.err_msg.list.length < this.queryInfo1.pageSize) {
            this.endBlean1 = true;
          }
          this.userSeeList1 = res.data.err_msg.list;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    newLook(typ) {
      let data = {};
      if (typ == 1) {
        data = {
          uid: this.lookItem.fromid,
          chat_id: this.lookItem.id,
          type: typ,
          page: this.queryInfo1.page,
          page_size: this.queryInfo1.pageSize,
        };
      } else if (typ == 2) {
        data = {
          uid: this.lookItem.fromid,
          chat_id: this.lookItem.id,
          type: typ,
          page: this.queryInfo2.page,
          page_size: this.queryInfo2.pageSize,
        };
      }
      history_record_search(data).then((res) => {
        console.log(res);
        if (res.data.err_code == 0) {
          this.seachState = 1;
          res.data.err_msg.list.forEach((element, i) => {
            element.add_time = this.commonJs.timestampToTime(element.add_time);
          });
          if (res.data.err_msg.list.length < this.queryInfo1.pageSize) {
            if (typ == 2) {
              this.endBlean1 = true;
            } else {
              this.topBlean1 = true;
            }
          }
          if (typ == 2) {
            this.userSeeList1 = this.userSeeList1.concat(res.data.err_msg.list);
          } else {
            this.userSeeList1 = res.data.err_msg.list.concat(this.userSeeList1);
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    handleWheel1(e) {
      e.stopPropagation();
      this.throttle(this.pageUpOrDown1, 600)(e);
    },
    pageUpOrDown1(e) {
      if (e.deltaY > 0) {
        //向下
        //执行的事件逻辑。比如向下翻页
        if (
          this.$refs.messagesContainer.scrollHeight -
            this.$refs.messagesContainer.scrollTop -
            this.$refs.messagesContainer.clientHeight <
          100
        ) {
          this.queryInfo2.page = this.queryInfo2.page + 1;
          this.newLook(2);
        }
      } else if (e.deltaY < 0) {
        //向上
        if (this.$refs.messagesContainer1.scrollTop < 100) {
          this.queryInfo1.page = this.queryInfo1.page + 1;
          this.newLook(1);
        }
      }
    },

    orderSeach() {
      if (this.orderNum == "") {
        this.$message({
          message: "搜索信息不能为空",
          type: "warning",
        });
        return;
      }
      order_search({
        order_no: this.orderNum,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.orderNumObj = res.data.err_msg.info;
          console.log(this.orderNumObj);
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //开启心跳
    start() {
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        console.log("测试--------------------");
        console.log(self.websock);
        if (self.websock.readyState == 1) {
          //如果连接正常
          self.websock.send('{"type":"ping"}');
          console.log("发送消息");
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    //重新连接
    reconnect() {
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      //新连接
      that.webSocket();
      that.lockReconnect = false;
    },
    //重置心跳
    reset() {
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    webSocket() {
      const that = this;
      if (typeof WebSocket == "undefined") {
        this.$notify({
          title: "提示",
          message: "当前浏览器无法接收实时消息,请使用谷歌浏览器!",
          type: "warning",
          duration: 0,
        });
      } else {
        // 实例化socket,
        new WebSocket("wss://:8282");
        const socketUrl = "wss://:8282";

        this.websock = new WebSocket(socketUrl);
        this.websock.onopen = function () {
          //开启心跳
          // that.start();
          // setInterval(()=>{
          //   this.websock.send('Hello Server!');
          // },1000)
        };
        //监听socket消息接收
        this.websock.onmessage = function (msg) {
          //转换为json对象

          // console.log("接受的消息");

          const data = JSON.parse(msg.data);
          if (data.fromid) {
            if (data.fromid.indexOf("_") != -1) {
              data.fromid = data.fromid.split("_")[1];
            }
          }
          if (data.toid) {
            if (data.toid.indexOf("_") != -1) {
              data.toid = data.toid.split("_")[1];
            }
          }
          if (msg.type == "online") {
            if (msg.is_zj == 1) {
              // 对方在线
              // console.log("对方在线");
              that.userState = true;
            } else {
              // 对方不在线
              that.userState = false;
              // console.log("对方不在线");
            }
          }

          if (msg.type == "save") {
          }
          if (data.type == "product" || data.type == "order") {
            data.content = JSON.parse(data.content);
          }
          // console.log(data);
          if (data.add_time) {
            data.add_time = that.commonJs.timestampToTime(data.add_time);
          }
          if (data.time) {
            data.time = that.commonJs.timestampToTime(data.time);
          }
          if (data.content) {
            if (data.content.addTime) {
              data.content.addTime = that.commonJs.timestampToTime(
                data.content.addTime
              );
            }
          }

          if (
            data.type == "text" ||
            data.type == "image" ||
            data.type == "video" ||
            data.type == "product" ||
            data.type == "order"
          ) {
            that.commNumber++;
          }

          //判断这条接收的消息的来源id是否和此时正在对话的用户id一样.
          if (that.toid == data.fromid) {
            if (that.userState == false) {
              that.userState = true;
            }
            that.newsList.push(data);
          } else {
            //不一样稚只能循环列表.再次追加
            // that.userList.forEach(comm => {
            //   if(comm.uid == data.fromid){
            //     comm.data.content = data.content
            //   }
            // })
            that.newsUserList();
            // ask_get_list({
            //   kf_id: that.fromid,
            // }).then((res) => {
            //   if (res.data.err_code == 0) {
            //     if (res.data.err_msg.list.length > 0) {
            //       that.userList = res.data.err_msg.list;
            //     }
            //   } else {
            //     this.$message({
            //       showClose: true,
            //       message: res.data.err_msg,
            //       type: "error",
            //     });
            //   }
            // });
          }

          //定位到滚动条最下面
          setTimeout(() => {
            that.$refs.messagesContainer.scrollTop =
              that.$refs.messagesContainer.scrollHeight;
          }, 100);
          that.scroll();
          //收到服务器信息，心跳重置
          // that.reset();

          switch (data.type) {
            case "init":
              //绑定用户
              that.bindUser();
              //缺10 11 12
              //1 2 3 4 55 66 77 8 9
              return;
            case "close":
              that.userState = false;
              console.log("close-------------------------");
              //数据入库
              that.userClose();
              return;
            case "text":
              return;
            case "text":
              return;
            case "text":
              return;
            case "text":
              return;
            case "text":
              return;
          }
        };
        // 监听socket错误
        this.websock.onerror = function () {
          that.$notify({
            title: "错误",
            message: "服务器错误，无法接收实时报警信息",
            type: "error",
            duration: 0,
          });
          console.log("服务器错误，无法接收实时报警信息");
        };
        // 监听socket关闭
        this.websock.onclose = function (e) {
          that.numClone++;
          console.log(that.numClone);
          if (that.numClone >= 3) {
            that.$notify({
              title: "服务被迫暂停",
              message: "socket已经关闭了!请联系后端服务怎么了.",
              type: "error",
              duration: 0,
            });
            that.selec(0);
            that.closeBlean = true;
          } else {
            that.selec(0, "掉线");
          }
          console.log("socket已经关闭了!");
        };
      }
    },
    scroll() {
      // this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
    },
    bindUser() {
      let bind = {
        type: "bind",
        fromid: "store_" + this.fromid,
        toid: this.toid,
        uid: this.toid,
      };
      bind = JSON.stringify(bind);
      if (this.toid) {
        // console.log(bind);
        this.websock.send(bind);
      } else {
        // console.log(bind);
        // console.log("toid为空");
      }
    },
    pick_seach() {
      this.queryInfo = {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      };
      this.newsList = [];
      this.askNews(this.queryInfo.page);
    },
    user(item, index) {
      if (item.uid != this.toid) {
        clearInterval(this.timeClear);
        this.Minute = 0;
        this.time = 0;
        this.userSeeList = "1";
        this.userSeeList1 = [];
        this.userState = true;
        this.endBlean = false;
        this.endBlean1 = false;
        this.topBlean1 = false;
        this.seachState = 0;
        this.queryInfo = {
          page: 1,
          pageSize: 10,
          total: 1,
          totalPages: 1,
        };
        this.queryInfo1 = {
          page: 1,
          pageSize: 10,
          total: 1,
          totalPages: 1,
        };

        this.queryInfo2 = {
          page: 1,
          pageSize: 10,
          total: 1,
          totalPages: 1,
        };

        this.toid = item.uid;

        // //绑定新用户
        this.bindUser();

        //注销websocket
        // this.websock.close()
        // this.webSocket();

        //绑定之后重新请求客户消息记录
        this.askNews(this.queryInfo.page);
        this.userInfo();
        this.userImg = this.userList[index].image;
        this.userName = this.userList[index].name;
      }
    },
    userClose: debounce(function (e) {
      let that = this;
      console.log("掉接口");
      redis_sql({
        uid: that.toid,
      }).then((res) => {
        if (res.data.err_code == 0) {
        } else {
          that.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    }),
    setUseful() {
      set_useful({}).then((res) => {
        if (res.data.err_code == 0) {
          this.useful = res.data.err_msg.info;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    fulSend(talk) {
      // if (this.userState == false) {
      //   this.$message({
      //     message: "客户已经主动关闭会话了",
      //     type: "warning",
      //   });
      //   return;
      // }
      if (this.pick_condition === 0) {
        this.$message({
          showClose: true,
          message: "客服处于离线状态.无法发送信息",
          type: "error",
        });
      } else {
        var tim = this.commonJs.dataTime(new Date());
        var tim1 = this.commonJs.newTimestampToTime(new Date());
        var data = {
          type: "1",
          uid: this.toid,
          fromid: this.fromid,
          toid: this.toid,
          content: talk,
          add_time: tim1,
        };

        add_chat_record({
          type: "1",
          uid: this.toid,
          fromid: this.fromid,
          toid: this.toid,
          content: talk,
          time: tim,
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.newsList.push(data);
            var date;
            date = {
              content: talk,
              type: "text",
              fromid: "store_" + this.fromid,
              toid: this.toid,
            };
            date = JSON.stringify(date);
            // 客户端给 getwayworker发送消息
            this.websock.send(date);
            this.commNumber++;
            //定位到滚动条最下面
            setTimeout(() => {
              this.$refs.messagesContainer.scrollTop =
                this.$refs.messagesContainer.scrollHeight;
            }, 100);
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        });
      }
    },
    //仅仅更新用户列表
    newsUserList() {
      ask_get_list({
        kf_id: this.fromid,
      }).then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.err_msg.list.length > 0) {
            this.userList = res.data.err_msg.list;
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //客服请求用户列表
    askUseList(index) {
      ask_get_list({
        kf_id: this.fromid,
      }).then((res) => {
        if (res.data.err_code == 0) {
          if (index == "1") {
            this.webSocket();
          }

          if (res.data.err_msg.list.length > 0) {
            this.toid = res.data.err_msg.list[0].uid;

            //获取用户信息
            this.userInfo();

            this.userList = res.data.err_msg.list;
            this.userImg = res.data.err_msg.list[0].image;
            this.userName = res.data.err_msg.list[0].name;
            this.askNews(this.queryInfo.page);
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    userInfo() {
      user_info({
        uid: this.toid,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.userinfo = res.data.err_msg.info;
          this.userinfo.reg_time = this.commonJs.timestampToTime(
            this.userinfo.reg_time
          );
          this.userinfo.reg_time = this.userinfo.reg_time.split(" ")[0];

          this.userinfo.authentication_time = this.commonJs.timestampToTime(
            this.userinfo.authentication_time
          );
          this.userinfo.authentication_time =
            this.userinfo.authentication_time.split(" ")[0];
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //请求用户的数据
    askNews(pag) {
      get_chat_record({
        uid: this.toid,
        page_size: 20,
        page: pag,
      }).then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach((element, i) => {
            if (element.type == 5) {
              if (element.content.addTime) {
                element.content.addTime = this.commonJs.timestampToTime(
                  element.content.addTime
                );
              }

              if (element.add_time) {
                element.add_time = this.commonJs.timestampToTime(
                  element.add_time
                );
              }
            } else {
              element.add_time = this.commonJs.timestampToTime(
                element.add_time
              );
            }
          });
          this.newsList = res.data.err_msg.list;
          this.commNumber = res.data.err_msg.total_number;
          this.queryInfo.page = res.data.err_msg.page;
          this.queryInfo.pageSize = res.data.err_msg.page_size;
          this.queryInfo.total = parseInt(res.data.err_msg.total_number);
          this.queryInfo.totalPages =
            Math.floor(this.queryInfo.total / this.queryInfo.pageSize) + 1;
          // this.times()
          //定位到滚动条最下面
          setTimeout(() => {
            this.$refs.messagesContainer.scrollTop =
              this.$refs.messagesContainer.scrollHeight;
          }, 100);
        }
      });
    },
    //请求用户的数据分页
    askNewsPage(pag) {
      get_chat_record({
        uid: this.toid,
        page_size: this.queryInfo.pageSize,
        page: pag,
      }).then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.err_msg.list.length == 0) {
            this.endBlean = true;
          } else {
            res.data.err_msg.list.forEach((element, i) => {
              element.add_time = this.commonJs.timestampToTime(
                element.add_time
              );
              if (element.type == 5) {
                element.content.addTime = this.commonJs.timestampToTime(
                  element.content.addTime
                );
              }
            });

            this.newsList = res.data.err_msg.list.concat(this.newsList);
            this.queryInfo.page = res.data.err_msg.page;
            this.queryInfo.pageSize = res.data.err_msg.page_size;
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
            this.queryInfo.totalPages =
              Math.floor(this.queryInfo.total / this.queryInfo.pageSize) + 1;
          }
        }
      });
    },
    //客服设置在线不在线
    selec(value, names) {
      set_online({
        status: value,
      }).then((res) => {
        if (res.data.err_code == 0) {
          let name = "";

          if (value == 1) {
            name = "在线";
            this.webSocket();
          } else if (value == 0) {
            name = "离线";
            this.websock.close();
            if (names == "掉线") {
              this.selec("1");
            }
          }
          this.coustServState = name;
          if (name) {
          } else {
            this.$message({
              showClose: true,
              message: "成功切换到" + name,
              type: "success",
            });
          }
        } else if (res.data.err_code == 1000) {
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //客服发送消息
    send() {
      
      // this.news = '<p><img src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1634780700520/image.png">暗室逢灯</p> <p>郝煜跳绳</p> <p><img src="http://baidu.com/image/1634780700520/image.png">郝煜的手表</p> <p><img src="http://haoyuNaiTou.com/image/1634780700520/image.png"></p>'
      console.log(this.news)
      if (this.news == "") {
        this.$message({
          message: "不能发送空消息",
          type: "warning",
        });
        return;
      }
      if (this.userState == false) {
        this.$message({
          message: "客户已经主动关闭会话了",
          type: "warning",
        });
        return;
      }
      if (this.closeBlean) {
        this.$message({
          showClose: true,
          message: "WebSocket重连失败.服务暂停.请联系后端开发",
          type: "error",
        });
        return;
      }
      if (this.pick_condition === 0) {
        this.$message({
          showClose: true,
          message: "客服处于离线状态.无法发送信息",
          type: "error",
        });
        return;
      } else {
        let arr = this.news
        let arrImg = []
        if(arr.indexOf("<p>") != -1){
          arr = arr.split("<p>")
          arr.splice(0,1)
          for(let i = 0 ; i < arr.length ; i ++){
            arr[i] = arr[i].split("</p>")[0]
            if(arr[i].indexOf('">') != -1){
              let newArr = arr[i].split('">')
              arr[i] = newArr[1]
              let img = newArr[0]
              arrImg.push(img.split('src="')[1])
            }
          }
        }
        arr.forEach(item=>{
          if(item){
            //传文字
            var tim = this.commonJs.dataTime(new Date());
            var tim1 = this.commonJs.newTimestampToTime(new Date());
            console.log(tim1);
            if (item.indexOf("\n") == item.length - 1) {
              item = item.slice(0, item.length - 1);
            }
            var data = {
              type: "1",
              uid: this.toid,
              fromid: this.fromid,
              toid: this.toid,
              content: item,
              add_time: tim1,
            };
            this.newsList.push(data);
            let dat = {
              type: "1",
              uid: this.toid,
              fromid: this.fromid,
              toid: this.toid,
              content: item,
              time: tim,
            }
            
            add_chat_record(
              dat
            ).then((res) => {
              if (res.data.err_code == 0) {
                var date;
                date = {
                  content: item,
                  type: "text",
                  fromid: "store_" + this.fromid,
                  toid: this.toid,
                };
                date = JSON.stringify(date);
                console.log("send 客服用语");
                console.log(date);
                // 客户端给 getwayworker发送消息
                this.websock.send(date);
                this.news = "";
                //定位到滚动条最下面
                this.commNumber++;
                setTimeout(() => {
                  this.$refs.messagesContainer.scrollTop =
                    this.$refs.messagesContainer.scrollHeight;
                }, 100);
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.err_msg,
                  type: "error",
                });
              }
            });
          }
        })
        if(arrImg.length > 0){
          arrImg.forEach(item=>{
            if(item){
              //传图片
              this.videoUrl = item
              var tim = this.commonJs.dataTime(new Date());
              var tim1 = this.commonJs.newTimestampToTime(new Date());
              var data = {
                type: 2,
                uid: this.toid,
                fromid: this.fromid,
                toid: this.toid,
                content: this.videoUrl,
                add_time: tim1,
              };
              this.newsList.push(data);
              console.log(data);
              add_chat_record({
                type: 2,
                uid: this.toid,
                fromid: this.fromid,
                toid: this.toid,
                content: this.videoUrl,
                time: tim,
              }).then((res) => {
                if (res.data.err_code == 0) {
                  this.fullscreenLoading = false;
                  var date;
                  if (this.videoType == 2) {
                    date = {
                      content: this.videoUrl,
                      type: "image",
                      fromid: "store_" + this.fromid,
                      toid: this.toid,
                    };
                  } else if (this.videoType == 3) {
                    date = {
                      content: this.videoUrl,
                      type: "video",
                      fromid: "store_" + this.fromid,
                      toid: this.toid,
                    };
                  }
                  date = JSON.stringify(date);
                  console.log("send 图片视频");
                  console.log(date);
                  // 客户端给 getwayworker发送消息
                  this.websock.send(date);

                  this.commNumber++;
                  setTimeout(() => {
                    this.$refs.messagesContainer.scrollTop =
                      this.$refs.messagesContainer.scrollHeight;
                  }, 100);
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.err_msg,
                    type: "error",
                  });
                }
              });
            }
          })
        }
        this.news = "";
      }
    },
    //_lastTime
    //节流函数
    throttle(fn, gapTime) {
      let _this = this;
      return function () {
        let _nowTime = +new Date();
        if (_nowTime - _this._lastTime > gapTime || !_this._lastTime) {
          fn(...arguments); // 函数可以带参数
          _this._lastTime = _nowTime;
        }
      };
    },
    handleWheel(e) {
      e.stopPropagation();
      this.throttle(this.pageUpOrDown, 600)(e);
    },
    pageUpOrDown(e) {
      if (e.deltaY > 0) {
        //向下
        //执行的事件逻辑。比如向下翻页
        // console.log(this.$refs.messagesContainer.scrollHeight - this.$refs.messagesContainer.scrollTop - this.$refs.messagesContainer.clientHeight)
        if (this.$refs.messagesContainer.scrollBy < 100) {
        }
      } else if (e.deltaY < 0) {
        //向上

        if (this.$refs.messagesContainer.scrollTop < 100) {
          this.askNewsPage(this.queryInfo.page + 1);
        }
      }
    },
    uploadToServer(file, callback) {
        var xhr = new XMLHttpRequest()
        let fd = new FormData()
        fd.append('file', file)
        xhr.open('post', publicFile.address+"/store_admin.php?c=public&a=upload")
        xhr.withCredentials = true
        xhr.responseType = 'json'
        xhr.send(fd)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
            callback(xhr.response)
          }
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制一次性上传最多 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      handleError(err, file, fileList) {
        this.$message.warning(`文件上传失败，请尝试重新上传，文件失败原因为： ${err}`)
      },
      uploadAttachment(response, file, fileList) {
        console.log(response)
        // 保存文件信息
        if (response.err_code === 0) {
          // 获取富文本组件实例
          let quill = this.$refs.myQuillEditor.quill
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', response.err_msg.url)
          quill.setSelection(length + 1)
          // let params = {}
          // params = {
          //  // 保存文件上传的参数
          // }
          // workService.create(params).then((res) => {
          //   this.$message.success('上传成功')
          // }).catch((err) => {
          //   this.$message.error(err)
          // })
        } else {
          this.$message.error(response.status.message)
        }
        // 清空文件列表
        this.uploadList = []
      },
      // onEditorChange(e) {
      //   this.$emit('change', e.html)
      // }
  },
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.orderBox {
  height: 277px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 30px 20px 10px;
  color: #5f5f5f;
  .item {
    min-height: 100px;
    position: relative;
    .itemLeft {
      width: 100px;
      float: left;
      line-height: 23px;
    }
    .itemCenter {
      width: 40px;
      float: left;
      height: 100%;
      position: absolute;
      left: 100px;
      top: 0;
      .por {
        height: 100%;
      }
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 45px;
        border-radius: 50%;
        i {
          color: #ccc;
          font-size: 26px;
        }
      }
      .icon.dian {
        width: 10px;
        height: 10px;
        background: #ccc;
        left: 15px;
        top: 6px;
      }
      s {
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        top: -20px;
        left: 20px;
        z-index: 0;
        background: #d0d0d0;
      }
    }
    .itemRight {
      padding-left: 10px;
      width: calc(100% - 100px - 40px);
      float: right;
      padding-bottom: 40px;
      .big {
        font-size: 17px;
        margin-bottom: 5px;
      }
      .small {
        font-size: 15px;
      }
    }
  }
  .item.dian {
    min-height: 62px;
  }
}
.order {
  padding: 0 20px;
  margin: 20px 0;
  .input {
    width: 78%;
    margin-right: 20px;
  }
}
.table {
  margin-top: 57px;
  border-color: #bbb;
  text-align: center;
  width: 100%;
  tr {
    td {
      line-height: 26px;
      height: 45px;
      width: 25%;
    }
    td:nth-of-type(1) {
      width: 25%;
    }
    td:nth-of-type(2) {
      width: 15%;
    }
    td:nth-of-type(3) {
      width: 25%;
    }
    td:nth-of-type(4) {
      width: 35%;
    }
  }
}
.page1 {
  padding: 10px;
  .work {
    padding: 20px 50px 10px 20px;
    span {
      float: left;
    }
    .select {
      float: right;
    }
  }
  .cover {
    height: 750px;
    .left {
      width: 250px;
      float: left;
      height: 100%;
      border: 2px solid #bbb;
      overflow-y: auto;

      .item {
        cursor: pointer;
        height: 65px;
        padding: 10px;
        border-bottom: 2px solid #bbb;
        .text {
          width: calc(100% - 43px);
          float: left;
          .span {
            display: block;
            width: 100%;
            line-height: 24px;
            padding-left: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .span.padding {
            padding-left: 29px;
          }
        }
        .img {
          width: 43px;
          float: left;
        }
      }
      .item.active {
        background: #d2f2f7;
      }
      .item.bbb {
        background: #0000002b;
      }
    }
    .left::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .left::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    .left::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }

    .center {
      height: 100%;
      width: calc(100% - 650px);
      float: left;
      border-top: 2px solid #bbb;
      border-bottom: 2px solid #bbb;
      .commun {
        height: calc(100% - 270px);
        border-bottom: 2px solid #bbb;
        overflow-y: auto;
        padding: 34px 11px 20px;
        .tim {
          padding-right: 50px;
          text-align: right;
          padding-bottom: 10px;
          padding-top: 20px;
        }
        .content {
          .news {
            float: left;
            line-height: 37px;
            padding: 0 10px;
            border-radius: 5px;
            margin-right: 10px;
            border: 1px solid #101010;
            height: auto;
            max-width: 80%;
            .tiemBlock {
              float: left;
              margin-right: 20px;
              line-height: 35px;
            }
            h4 {
              margin: 15px 0 5px;
              text-align-last: center;
              width: 100%;
              float: left;
            }
            
          }
          .img {
            float: left;
            width: 37px;
            height: 37px;
            border-radius: 50%;
          }
        }
        .kf {
          .img {
            float: right;
            background: #d2f2f7;
            line-height: 37px;
            border: 1px solid #101010;
            text-align: center;
            font-size: 13px;
          }
          .news {
            margin-right: 10px;
            float: right;
            background: #d2f2f7;
          }
        }
        .user {
          .tim {
            padding-right: 0;
            span {
              float: left;
              width: auto;
              max-width: 100px;
              padding-right: 20px;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 21px;
            }
            p {
              line-height: 21px;
              float: left;
            }
          }
          .img {
            background: #0000002b;
          }
          .news {
            margin-left: 10px;
            background: #0000002b;
          }
        }
      }
      .commun::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .commun::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background-color: skyblue;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
        );
      }
      .commun::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
      }
      .fun {
        overflow: hidden;
        position: relative;
        background: #0000002b;
        height: 30px;
        border-bottom: 2px solid #bbb;
        padding: 3px 10px;
        i {
          float: left;
          margin-right: 10px;
          font-size: 24px;
        }
      }
      .news {
        height: 140px;
        position: relative;
        .input {
          width: 100%;
          padding: 10px;
          border: none;
          outline: none;
          height: 95px;
        }
        .btn {
          position: absolute;
          top: 100px;
          border: 1px solid #101010;
          right: 34px;
          width: 70px;
          height: 23px;
          border-radius: 4px;
          font-size: 14px;
          padding: 0 3px;
          line-height: 23px;
          background: #59dbff;
        }
      }
      .ing {
        padding: 12px 0;
        background: #0000002b;
        border-bottom: 2px solid #bbb;
        text-align: center;
        font-size: 18px;
        height: 50px;
      }
      .ings {
        background: #fbefdb;
        border-bottom: 2px solid #bbb;
        padding: 12px 20px;
        height: 50px;
        .leftSpan {
          float: left;
          position: relative;
          width: 20px;
          height: 21px;
        }
        .rightSpan {
          float: right;
        }
      }
    }
    .right {
      height: 100%;
      width: 400px;
      float: left;
      border: 2px solid #bbb;
      .block {
        border-bottom: 2px solid #bbb;
        height: 460px;

        .box {
          height: 339px;
          overflow-y: auto;
        }
        .box::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        .box::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: #535353;
        }
        .box::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background: #ededed;
        }
        .commun {
          height: 339px;
          position: relative;
          overflow-y: auto;
          padding: 34px 11px 20px;
          .black {
            position: absolute;
            top: 10px;
            left: 10px;
            color: #409eff;
          }
          .tim {
            padding-right: 50px;
            text-align: right;
            padding-bottom: 10px;
            padding-top: 20px;
            .rt {
              line-height: 21px;
            }
            .lt {
              line-height: 21px;
            }
            .btn {
              cursor: pointer;
              color: #409eff;
              font-size: 14px;
            }
          }
          .content {
            .news {
              float: left;
              line-height: 37px;
              padding: 0 10px;
              border-radius: 5px;
              margin-right: 10px;
              border: 1px solid #101010;
              height: auto;
              max-width: 80%;
            }
            .img {
              float: left;
              width: 37px;
              height: 37px;
              border-radius: 50%;
            }
          }
          .kf {
            .img {
              float: right;
              background: #d2f2f7;
              line-height: 37px;
              border: 1px solid #101010;
              text-align: center;
              font-size: 13px;
            }
            .news {
              margin-right: 10px;
              float: right;
              background: #d2f2f7;
            }
          }
          .user {
            .tim {
              padding-left: 50px;
              padding-right: 0;
              text-align: left;
            }
            .img {
              background: #0000002b;
            }
            .news {
              margin-left: 10px;
              background: #0000002b;
            }
          }
        }
        .commun::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        .commun::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          background-color: skyblue;
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
        }
        .commun::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: #ededed;
          border-radius: 10px;
        }
      }
      .bottom {
        .ings {
          background: #fbefdb;
          border-bottom: 2px solid #bbb;
          padding: 7px 20px;
          text-align: center;
        }
      }
    }
  }
}
/deep/ .ql-editor{
  height: 100px;
}
/deep/ .ql-toolbar.ql-snow{
  display: none;
}
/deep/ .news{
  img{
    max-width: 300px;
  }
}
</style>
