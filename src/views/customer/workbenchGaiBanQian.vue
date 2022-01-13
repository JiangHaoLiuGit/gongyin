<template>
  <div class="page1">
    <div class="work clearfix">
      
      
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
          @click="clickUser(item, index)"
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
            
          </div>
          <textarea
            type="text"
            v-model="news"
            class="input"
            placeholder=" 请输入内容"
            @keyup.enter="searchFile"
            @keydown.ctrl.13="send"
          ></textarea>
          <!-- <quill-editor
            v-model="news"
            ref="myQuillEditor"
            :options="options"
            style="width: 100%; height: 100%"
            >
          </quill-editor> -->
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
  bind_kf,
  kf_im_login,
} from "../../utils/axios";
import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
let options = {
  SDKAppID: 1400339593// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
}
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
// tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
tim.setLogLevel(1)
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册 COS SDK 插件
tim.registerPlugin({'cos-js-sdk': COS});
export default {
  // components: {
  //   quillEditor,
  // },
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
      //节流data
      redisId: "",
      timess: 5,
      nowTime: 0,
      inter: "", //循环js
      uploadList: [],
      sign:"",
      huoBlean:false,
      nextReqMessageID:"",
      conversationID:"",
      zuxiao:false
    };
  },
  
  created() {
    this.fromid = JSON.parse(localStorage.getItem('admin_messages')).store_id

    // this.fromid = 699;
    //请求客服对话的用户列表
      // this.newsUserList();
      //第一次登录
      //第一次进来请求用户列表并渲染数据
    
    
      // this.askUseList()
  },
  mounted: function () {
    //请求常用语
    // this.setUseful();
    //快递公司
    // this.getExpress();
    let slef = this
    // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
    
    let onSdkNotReady = (event) => {
      if(this.zuxiao){

      }else{
        slef.$confirm('sdk，不可用，需要重新连接，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          slef.login()
        }).catch(() => {
          
        });
      }
    };
    tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);

    // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
    tim.on(TIM.EVENT.MESSAGE_RECEIVED,  (event) => {
      console.log("收到推送的单聊,进来了-----------------")
      console.log(event.data)
      var blean = false
      
      event.data.forEach((item,index) => {
        console.log(this.toid)
        console.log(item.from)
        if(item.from == this.toid){
          item.time = this.commonJs.timestampToTime(
            item.time
          );
          var pay00,pay11;
            // item.payload.text = JSON.parse(item.payload.text)
          if(item.payload.text.indexOf(",") != -1){
            var pay = item.payload.text.split(",")
            var pay0 = pay[0]
            var pay1 = pay[1]
            pay00 = parseInt(pay0.split(":")[1])
            pay11 = pay1.split(":")[1]
            pay11 = pay11.split('"')[1]
            if(pay00 == 2 || pay00 == 3){
              pay11 = "http" + pay1.split("http")[1]
              pay11 = pay11.split('"')[0]
            }else if(pay00 == 4){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }else if(pay00 == 5){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }
          }else{
            
            var pay11 = item.payload.text
            var pay00 = 1
          }
          let formid = ''
          let toid = ''
          if(item.from.indexOf("_") != -1){
            formid = item.from.split("_")[1]
            toid = item.to
          }else{
            toid = item.to.split("_")[1]
            formid = item.from
             
            
          }
          var data = {
            type:pay00,
            fromid:formid,
            toid:toid,
            content:pay11,
            is_read:item.isRead,
            add_time:item.time,
          }
          this.newsList.push(data)
          setTimeout(() => {
            this.$refs.messagesContainer.scrollTop =
              this.$refs.messagesContainer.scrollHeight;
          }, 100);
        }else{
          blean = true
        }
      })
      console.log(blean)
      if(blean){
        //用户来消息更新会话列表
        this.hlData();
      }
      

      
      
      
    });
    //监听SDK,已经到了ready
    let onSdkReady = (event)=> {
      console.log("监听SDK,已经到了ready")
      this.firstData();
      // 个人资料
      
      
    };
    tim.on(TIM.EVENT.SDK_READY, onSdkReady);

    this.login()
  },
  destroyed() {
    //结束循环请求
    this.zuxiao = true
    let promise = tim.logout();
    promise.then((imResponse) => {
      console.log("登出成功");
    }).catch(function(imError) {
      console.warn('logout error:', imError);
    });
  },
  methods: {
    // 
    login(){
      kf_im_login({
        id:"s_"+this.fromid
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.sign = res.data.err_msg.sign
          this.loginImg()
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    bindyong(){
      bind_kf({
        uid:this.toid,
        kf_id:"0",
        store_id:this.fromid
      }).then((res) => {
        if (res.data.err_code == 0) {
          if(this.huoBlean){
            //用完冰封他。丢弃
            this.userDuiHua()
            this.huoBlean = false
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    //上啦加载数据
    askNewsPage(pag) {
      var ID = this.nextReqMessageID
      var newList = []
      console.log(ID)
      
      let promise = tim.getMessageList({conversationID: 'C2C'+this.toid, nextReqMessageID:ID, count: 15});
      promise.then((imResponse) =>{
        const messageList = imResponse.data.messageList; // 消息列表。
        console.log(messageList)
        messageList.forEach((item,index) => {
          if(typeof item.time === 'number'){
            item.time = this.commonJs.timestampToTime(
              item.time
            );
          }
          var pay00,pay11;
            // item.payload.text = JSON.parse(item.payload.text)
          if(item.payload.text.indexOf(",") != -1){
            var pay = item.payload.text.split(",")
            var pay0 = pay[0]
            var pay1 = pay[1]
            pay00 = parseInt(pay0.split(":")[1])
            pay11 = pay1.split(":")[1]
            pay11 = pay11.split('"')[1]
            if(pay00 == 2 || pay00 == 3){
              pay11 = "http" + pay1.split("http")[1]
              pay11 = pay11.split('"')[0]
            }else if(pay00 == 4){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }else if(pay00 == 5){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }
          }else{
            
            var pay11 = item.payload.text
            var pay00 = 1
          }
          let formid = ''
          let toid = ''
          if(item.from.indexOf("_") != -1){
            formid = item.from.split("_")[1]
            toid = item.to
          }else{
            toid = item.to.split("_")[1]
            formid = item.from
              
            
          }
          var data = {
            type:pay00,
            fromid:formid,
            toid:toid,
            content:pay11,
            is_read:item.isRead,
            add_time:item.time,
          }
          
          newList.push(data)
        })
        this.newsList = newList.concat(this.newsList);
        this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        this.endBlean = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      });
    },
    userDuiHua(){
      //获取客服和用户的聊天记录
      let promise = tim.getMessageList({conversationID: 'C2C'+this.toid, count: 15});
      promise.then((imResponse) => {
        console.log(imResponse)
        this.newsList = []
        const messageList = imResponse.data.messageList; // 消息列表。
        messageList.forEach((item,index) => {
            if(typeof item.time === 'number'){
              item.time = this.commonJs.timestampToTime(
                item.time
              );
            }
          
          var pay00,pay11;
            // item.payload.text = JSON.parse(item.payload.text)
          if(item.payload.text.indexOf(",") != -1){
            var pay = item.payload.text.split(",")
            var pay0 = pay[0]
            var pay1 = pay[1]
            pay00 = parseInt(pay0.split(":")[1])
            pay11 = pay1.split(":")[1]
            pay11 = pay11.split('"')[1]
            if(pay00 == 2 || pay00 == 3){
              pay11 = "http" + pay1.split("http")[1]
              pay11 = pay11.split('"')[0]
            }else if(pay00 == 4){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }else if(pay00 == 5){
              var pay = item.payload.text
              var pay1 = JSON.parse(pay)
              var pay2 = pay1.content
              var pay3 = JSON.parse(pay2)
              pay11 = pay3
            }
          }else{
            
            var pay11 = item.payload.text
            var pay00 = 1
          }
          let formid = ''
          let toid = ''
          if(item.from.indexOf("_") != -1){
            formid = item.from.split("_")[1]
            toid = item.to
          }else{
            toid = item.to.split("_")[1]
            formid = item.from
              this.userName = item.nick
              this.userImg = item.avatar
            
          }
          var data = {
            type:pay00,
            fromid:formid,
            toid:toid,
            content:pay11,
            is_read:item.isRead,
            add_time:item.time,
          }
          this.newsList.push(data)
          
        })
        console.log(this.newsList)
        //定位到滚动条最下面
        setTimeout(() => {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        },100)
        // this.conversationID = imResponse.data.conversationID;
        this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        this.endBlean = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        
      });
    },
    loginImg(){
      
      let self = this
      let data = {
        userID: "s_"+this.fromid,
        userSig: this.sign
      }
      console.log("登录传参")
      console.log(data)
      tim.login(
        data
      ).then(function(imResponse) {
        if (imResponse.data.repeatLogin === true) {
          // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
          // console.log(imResponse.data.errorInfo);
        }
        if(imResponse.data.errorCode == 0){
          console.log("登录成功")
        }
      }).catch(function(imError) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
    },
    firstData(){
      let promise = tim.getConversationList();
      promise.then((imR) => {
        const conversationList = imR.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
        console.log("第一次进来更新会话列表")
        console.log(conversationList)
        
        if(conversationList.length>0){
          this.userList = []
          this.toid = conversationList[0].userProfile.userID
          this.userInfo();
          this.huoBlean = true
          this.bindyong()
          conversationList.forEach((item,index) => {
            var items = JSON.parse(item.lastMessage.messageForShow)
            var data = {
              uid:item.userProfile.userID,
              name:item.userProfile.nick,
              image:item.userProfile.avatar,
              count_noread:item.unreadCount,
              data:{
                type:items.type,
                content:items.content,
              }
            }
            this.userList.push(data)
          })
        }
        
        // this.userList = []
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    },
    hlData(){
      console.log("hlData")
      let promise = tim.getConversationList();
      promise.then((imR) => {
        const conversationList = imR.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
        console.log("更新会话列表")
        console.log(conversationList)
        if(conversationList.length>0){
          this.userList = []
          conversationList.forEach((item,index) => {
            var items = JSON.parse(item.lastMessage.messageForShow)
            var data = {
              uid:item.userProfile.userID,
              name:item.userProfile.nick,
              image:item.userProfile.avatar,
              count_noread:item.unreadCount,
              data:{
                type:items.type,
                content:items.content,
              }
            }
            this.userList.push(data)
          })
        }
        
        // this.userList = []
      }).catch(function(imError) {
        console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      });
    },
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
      if (e.ctrlKey && e.keyCode == 13) {
        //用户点击了ctrl+enter触发
        console.log("ctrl+enter");
        this.news += "\n";
      } else {
        //用户点击了enter触发
        if (this.news.slice(this.news.length - 1) == "\n") {
          this.news = this.news.slice(0, this.news.length - 1);
        }
        this.send();
      }
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

                let self = this
                // 1. 创建消息实例，接口返回的实例可以上屏
                // let news = {
                //   type:"",

                // }
                var news;
                  if (this.videoType == 2) {
                    news = {
                      type: 2,
                      content: this.videoUrl,
                      
                    };
                  } else if (this.videoType == 3) {
                    news = {
                      type: 3,
                      content: this.videoUrl,
                    };
                  }
                // let news = {
                //   type:1,
                //   content:this.news
                // }
                news = JSON.stringify(news)
                console.log(news)
                let message = tim.createTextMessage({
                  to: self.toid,
                  //
                  conversationType: TIM.TYPES.CONV_C2C,
                  // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
                  // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
                  // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
                  payload: {
                    text: news
                  },
                  //
                  // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
                  // cloudCustomData: 'your cloud custom data'
                  
                });
                // 2. 发送消息
                let promise = tim.sendMessage(message);
                promise.then((imResponse) => {
                  // 发送成功
                  this.fullscreenLoading = false;
                  setTimeout(() => {
                    this.$refs.messagesContainer.scrollTop =
                      this.$refs.messagesContainer.scrollHeight;
                  }, 100);

                  console.log("发送成功")
                  console.log(imResponse);
                }).catch(function(imError) {
                  // 发送失败
                  console.warn('sendMessage error:', imError);
                });

                // add_chat_record({
                //   type: this.videoType,
                //   uid: this.toid,
                //   fromid: this.fromid,
                //   toid: this.toid,
                //   content: this.videoUrl,
                //   time: tim,
                // }).then((res) => {
                //   if (res.data.err_code == 0) {
                    
                //   } else {
                //     this.$message({
                //       showClose: true,
                //       message: res.data.err_msg,
                //       type: "error",
                //     });
                //   }
                // });

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
    //用户聊天记录翻页
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

    webSocket() {
      
    },
    scroll() {
      // this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
    },
    //绑定用户
    bindUser() {
      // let bind = {
      //   type: "bind",
      //   fromid: "store_" + this.fromid,
      //   toid: this.toid,
      //   uid: this.toid,
      // };
      // bind = JSON.stringify(bind);
      // if (this.toid) {
      //   // console.log(bind);
      //   this.websock.send(bind);
      // } else {
      //   // console.log(bind);
      //   // console.log("toid为空");
      // }
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
    //点击左侧切换聊天用户
    clickUser(item, index) {
      if (item.uid != this.toid) {
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
        this.bindyong();
        //绑定之后重新请求客户消息记录
        this.userDuiHua()
        
        // this.askNews(this.queryInfo.page);
        this.userInfo();
        this.userImg = this.userList[index].image;
        this.userName = this.userList[index].name;
      }
    },
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
      // ask_get_list({
      //   kf_id: this.fromid,
      // }).then((res) => {
      //   if (res.data.err_code == 0) {
      //     if (index == "1") {
      //       this.webSocket();
      //     }

      //     if (res.data.err_msg.list.length > 0) {
      //       this.toid = res.data.err_msg.list[0].uid;

      //       //获取用户信息
      //       this.userInfo();

      //       this.userList = res.data.err_msg.list;
      //       this.userImg = res.data.err_msg.list[0].image;
      //       this.userName = res.data.err_msg.list[0].name;
      //       this.askNews(this.queryInfo.page);
      //     }
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: res.data.err_msg,
      //       type: "error",
      //     });
      //   }
      // });
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

      // get_chat_record({
      //   uid: this.toid,
      //   page_size: 20,
      //   page: pag,
      // }).then((res) => {
      //   if (res.data.err_code == 0) {
      //     res.data.err_msg.list.forEach((element, i) => {
      //       if (element.type == 5) {
      //         if (element.content.addTime) {
      //           element.content.addTime = this.commonJs.timestampToTime(
      //             element.content.addTime
      //           );
      //         }

      //         if (element.add_time) {
      //           element.add_time = this.commonJs.timestampToTime(
      //             element.add_time
      //           );
      //         }
      //       } else {
      //         element.add_time = this.commonJs.timestampToTime(
      //           element.add_time
      //         );
      //       }
      //     });
      //     this.newsList = res.data.err_msg.list;
      //     this.commNumber = res.data.err_msg.total_number;
      //     this.queryInfo.page = res.data.err_msg.page;
      //     this.queryInfo.pageSize = res.data.err_msg.page_size;
      //     this.queryInfo.total = parseInt(res.data.err_msg.total_number);
      //     this.queryInfo.totalPages =
      //       Math.floor(this.queryInfo.total / this.queryInfo.pageSize) + 1;
      //     // this.times()
      //     //定位到滚动条最下面
      //     setTimeout(() => {
      //       this.$refs.messagesContainer.scrollTop =
      //         this.$refs.messagesContainer.scrollHeight;
      //     }, 100);
      //   }
      // });
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
      let self = this
      // 1. 创建消息实例，接口返回的实例可以上屏
      // let news = {
      //   type:"",

      // }
      let news = {
        type:1,
        content:this.news
      }
      news = JSON.stringify(news)
      let message = tim.createTextMessage({
        to: self.toid,
        //
        conversationType: TIM.TYPES.CONV_C2C,
        // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
        // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
        // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: {
          text: news
        },
        //
        // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
        // cloudCustomData: 'your cloud custom data'
        
      });
      // 2. 发送消息
      let promise = tim.sendMessage(message);
      promise.then((imResponse) => {
        // 发送成功
        console.log("发送成功")
        console.log(imResponse);
        this.hlData()
        
        var tim1 = this.commonJs.newTimestampToTime(new Date())
        var data = {
          type:1,
          fromid:this.formid,
          toid:this.toid,
          content:this.news,
          is_read:true,
          add_time:tim1,
        }
        this.newsList.push(data)
        //定位到滚动条最下面
        setTimeout(() => {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        },100)
        this.news = ''
      }).catch(function(imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });

      // if (this.userState == false) {
      //   this.$message({
      //     message: "客户已经主动关闭会话了",
      //     type: "warning",
      //   });
      //   return;
      // }
      
      // if (this.pick_condition === 0) {
      //   this.$message({
      //     showClose: true,
      //     message: "客服处于离线状态.无法发送信息",
      //     type: "error",
      //   });
      //   return;
      // } else {
      //   var tim = this.commonJs.dataTime(new Date())
      //   var tim1 = this.commonJs.newTimestampToTime(new Date())
      //   console.log(tim1)
      //   if(this.news.indexOf("\n") == this.news.length-1){
      //     this.news = this.news.slice(0,this.news.length-1)
      //   }
      //   var data = {
      //     type: "1",
      //     uid: this.toid,
      //     fromid: this.fromid,
      //     toid: this.toid,
      //     content: this.news,
      //     add_time: tim1,
      //   };
      //   console.log(data)
      //   this.newsList.push(data);
      //   add_chat_record({
      //     type: "1",
      //     uid: this.toid,
      //     fromid: this.fromid,
      //     toid: this.toid,
      //     content: this.news,
      //     time: tim,
      //   }).then((res) => {
      //     if (res.data.err_code == 0) {
      //       console.log(this.news)
      //       var date
      //       date = {'content':this.news,'type':'text','fromid':"store_" + this.fromid,'toid':this.toid};
      //       date = JSON.stringify(date);
      //       console.log("send 客服用语")
      //       console.log(date)
      //       // 客户端给 getwayworker发送消息
      //       this.websock.send(date);
      //       this.news = "";
      //       //定位到滚动条最下面
      //       this.commNumber++
      //       setTimeout(() => {
      //         this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      //       },100)
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         message: res.data.err_msg,
      //         type: "error",
      //       });
      //     }
      //   });
      // }
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
          this.askNewsPage();
        }
      }
    },
  },
  // setTimeout(() => {
  //   this.$refs.messagesContainer.scrollTop =
  //     this.$refs.messagesContainer.scrollHeight;
  // }, 100);
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
        height: calc(100% - 220px);
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
