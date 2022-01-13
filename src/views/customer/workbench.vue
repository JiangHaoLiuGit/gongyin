<template>
  <div class="page1" @click="page">
    
    <div class="cover clearfix">
      <div class="top clearfix">
        <div class="ding">
          <div class="lt first">
            <div class="lt img">
              
              <img :src="kfInfo.avatar" v-if="kfInfo.avatar != ''" alt="">
              <img v-else src="../../assets/image/pic012.png" alt="">
            </div>
            <div class="lt">
              <span>{{kfInfo.nick}}</span>
              <span>登录时间:{{kfInfo2.lastTime}}</span>
            </div>
          </div>
          <div class="lt second">
            <div class="items clearfix">
              <div class="lt img">
                <img src="../../assets/image/pic017.png" alt="">
              </div>
              <div class="lt">
                <p>{{kfInfo2.kf_onlint_time}}</p>
                <span>历史在线时长</span>
              </div>
            </div>
            <div class="items clearfix">
              <div class="lt img">
                <img src="../../assets/image/pic018.png" alt="">
              </div>
              <div class="lt">
                <p>{{userNum}}人数</p>
                <span>历史接待人数</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 左侧用户列表 -->
        <div class="left">
          <div class="sreach">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="sreach"
              @keyup.enter.native="sreachChange"
              @input="inputs"
              >
            </el-input>
          </div>
          <div class="title">
            <span v-if="userType == 1">
              对话列表
            </span>
            <span v-else-if="userType == 2">
              搜索
            </span>
          </div>
          <div v-if="userType == 1" class="leftBox" ref="userBox">
            <div v-if="userList.length>0">
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
                  <p class="clearfix p1">
                    <span class="span lt">{{ item.name }}</span>
                    <span class="spans lt"><span v-if="item.count_noread>0">{{item.count_noread}}</span></span>
                  </p>
                  <p class="clearfix p2">
                    <span class="span lt" v-if="item.data.type == 1">{{item.data.content}}</span>
                    <span class="span lt" v-else-if="item.data.type == 2">[图片]</span>
                    <span class="span lt" v-else-if="item.data.type == 3">[视频]</span>
                    <span class="span lt" v-else-if="item.data.type == 4">[商品]</span>
                    <span class="span lt" v-else-if="item.data.type == 5">[订单]</span>
                    <span class="spans lt">{{item.lastTime}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-else style="color:#ccc;text-align:center;margin-top:20px">
              暂无用户
            </div>
          </div>
          <div v-else-if="userType == 2" class="leftBox" ref="userBox">
            <div v-if="userSearchList.length>0">
              <div
                class="item"
                v-for="(item, index) in userSearchList"
                
                :class="
                  item.uid == toid ? 'active' : item.data.is_read == 0 ? 'bbb' : ''
                "
                :key="index"
                @click="clickSearchUser(item, index)"
              >
                <div class="img">
                  <el-image
                    style="width: 43px; height: 43px"
                    :src="item.image"
                  ></el-image>
                </div>
                <div class="text">
                  <p class="clearfix p1">
                    <span class="span lt">{{ item.name }}</span>
                    <span class="spans lt"><span v-if="item.count_noread>0">{{item.count_noread}}</span></span>
                  </p>
                  <p class="clearfix p2">
                    <span class="span lt" v-if="item.data.type == 1">{{item.data.content}}</span>
                    <span class="span lt" v-else-if="item.data.type == 2">[图片]</span>
                    <span class="span lt" v-else-if="item.data.type == 3">[视频]</span>
                    <span class="span lt" v-else-if="item.data.type == 4">[商品]</span>
                    <span class="span lt" v-else-if="item.data.type == 5">[订单]</span>
                    <span class="spans lt">{{item.lastTime}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-else style="color:#ccc;text-align:center;margin-top:20px">
              暂无用户
            </div>
          </div>
          
        </div>
        <!-- 中间客服和用户沟通界面 -->
        <div class="center">
          <div class="ing clearfix">
              <el-image
                style="width: 37px; height: 37px;border-radius:50%;"
                :src="userImg"
                class="lt img"
              ></el-image>
              <span class="lt">
                {{ userName }}
              </span>
          </div>
          <div class="commun" ref="messagesContainer" @wheel="handleWheel">
            <div v-if="endBlean" style="text-align: center; color: #7d7d7d;margin-bottom:10px">
              已经加载全部
            </div>
            <div v-for="(item, index) in newsList" :key="index" style="margin:20px 0;">
              <div v-if="newsList.length > 0">
                <div v-if="item.type != 'save'">
                  <!--  v-if="fromid == item.fromid" -->

                  <div class="kf" v-if="toid != item.fromid">
                    

                    <div class="content clearfix">
                      <!-- kfInfo.avatar -->
                      <!-- <div class="img">客服</div> -->
                      <div class="img">
                        <el-image
                          style="width: 37px; height: 37px"
                          :src="kfInfo.avatar"
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
                      <div
                        class="news shang"
                        @click="toProduct(item.content.product_id)"
                        v-else-if="item.type == '4' || item.type == 'product'"
                      >
                        <div class="img por lt">
                          <!-- :preview-src-list="[ite.product_image]" -->
                          <el-image
                            :src="item.content.image"
                            style="width:60px;height:60px"
                            class="lt"
                            fit="cover"
                          ></el-image>
                          <span class="poa span" v-if="item.content.is_baby == 1">悦淘专享</span>
                        </div>
                        
                        <!-- :preview-src-list="[item.content.image]" -->
                        <div class="div lt">
                          <div class="shen2">
                             {{ item.content.name }}
                          </div>
                          <div class="clearfix">
                            <div class="lt">
                              ￥{{ item.content.price}}
                            </div>
                            <div class="rt">
                              <i class="el-icon-takeaway-box" style="font-size:16px"></i> {{item.content.store_name?item.content.store_name:"供应商店铺"}}
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 
                      -->
                      <div
                        class="news order"
                        @click="toOrder(item.content.order_no)"
                        v-else-if="item.type == 5 || item.type == 'order'"
                      >
                        <!-- 订单 -->
                        <div
                          class="flexBet"
                          style="width: 350px; padding: 8px 13px 0;"
                        >
                          <div class="items">
                            <div class="first clearfix">
                              <span class="lt">订单编号</span>
                              <span class="lt" style="margin-left:5px;">{{item.content.order_no}}</span>
                              <span class="rt">{{item.content.statusStr}}</span>
                            </div>
                            <div class="second clearfix" v-for="(ite,ind) in [item.content.product]" :key="ind">
                              <div class="img por">
                                <!-- :preview-src-list="[ite.product_image]" -->
                                <el-image
                                :src="ite.product_image"
                                fit="cover"></el-image>
                                <span class="poa span" v-if="ite.is_baby == 1">悦淘专享</span>
                              </div>
                              <div class="jia">
                                <!-- {{ite.product_name}} -->
                                <p class="shen2">{{ite.product_name}} </p>
                                <div class="div1 clearfix">
                                  <!-- {{ite.sku_data}} -->
                                  <span class="c lt">规格:{{ite.sku_data?ite.sku_data:"无"}}</span>
                                  <span class="c rt">X{{ite.pro_num}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="third">
                              <div class="clearfix">
                                <span class="lt">订单合计:<span style="color: #f7a062;">￥{{item.content.sub_total}}</span></span>
                                <span class="rt">供应商:{{item.content.store_name}}</span>
                              </div>
                              <div class="clearfix div2">
                                <span class="lt">下单时间:{{item.content.addTime}}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="news" v-else>
                        {{ item.content }}
                      </div>
                    </div>
                    <div class="tim">
                      {{ item.add_time }}
                    </div>
                  </div>
                  <!-- v-else-if="item.toid == fromid" -->
                  <div class="user" v-else>
                   
                    <div class="content clearfix">
                      <div class="img">
                        <el-image
                          :src="userImg"
                          fit="cover"
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
                        class="news shang"
                        @click="toProduct(item.content.product_id)"
                        v-else-if="item.type == '4' || item.type == 'product'"
                      >
                        <div class="img por lt">
                          <!-- :preview-src-list="[ite.product_image]" -->
                          <el-image
                            :src="item.content.image"
                            style="width:60px;height:60px"
                            class="lt"
                            fit="cover"
                          ></el-image>
                          <span class="poa span" v-if="item.content.is_baby == 1">悦淘专享</span>
                        </div>
                        <!-- :preview-src-list="[item.content.image]" -->
                        <div class="div lt">
                          <div class="shen2">
                            {{ item.content.name }}
                          </div>
                          <div class="clearfix">
                            <div class="lt">
                              ￥{{ item.content.price}}
                            </div>
                            <div class="rt">
                              <i class="el-icon-takeaway-box" style="font-size:16px"></i> {{item.content.store_name?item.content.store_name:"供应商店铺"}}
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 
                      -->
                      <div
                        class="news order"
                        @click="toOrder(item.content.order_no)"
                        v-else-if="item.type == 5 || item.type == 'order'"
                      >
                        <!-- 订单 -->
                        <div
                          class="flexBet"
                          style="width: 350px; padding: 8px 13px 0;"
                        >

                          <div class="items">
                            <div class="first clearfix">
                              <span class="lt">订单编号</span>
                              <span class="lt" style="margin-left:5px;">{{item.content.order_no}}</span>
                              <span class="rt">{{item.content.statusStr}}</span>
                            </div>
                            <div class="second clearfix" v-for="(ite,ind) in [item.content.product]" :key="ind">
                              <div class="img por">
                                <!-- :preview-src-list="[ite.product_image]" -->
                                <el-image
                                :src="ite.product_image"
                                fit="cover"></el-image>
                                <span class="poa span" v-if="ite.is_baby == 1">悦淘专享</span>
                              </div>
                              <div class="jia">
                                <!-- {{ite.product_name}} -->
                                <p class="shen2">{{ite.product_name}} </p>
                                <div class="div1 clearfix">
                                  <!-- {{ite.sku_data}} -->
                                  <span class="c lt">规格:{{ite.sku_data?ite.sku_data:"无"}}</span>
                                  <span class="c rt">X{{ite.pro_num}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="third">
                              <div class="clearfix">
                                <span class="lt">订单合计:<span style="color: #f7a062;">￥{{item.content.sub_total}}</span></span>
                                <span class="rt">供应商:{{item.content.store_name}}</span>
                              </div>
                              <div class="clearfix div2">
                                <span class="lt">下单时间:{{item.content.addTime}}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="tim clearfix" style="width: 397px">
                      <span></span>
                      <p v-if="item.add_time">{{ item.add_time }}</p>
                      <p v-else-if="item.time">{{ item.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fun por">
            <div class="duanyu poa" v-show="hidden1" @click.stop="funs">
              <div class="divTop clearfix">
                <div class="lt clearfix">
                  <img src="../../assets/image/shouqianB.png" class="lt" alt="">
                  <span class="lt">售前短语</span>
                </div>
                <div class="rt" style="cursor:pointer;" @click="hidden1 = false">
                  <img src="../../assets/image/guanbi.png" alt="">
                </div>
              </div>
              <div class="box clearfix">
                <div class="items" v-for="(item, index) in useful.greetings" :key="index" @click="fulSend(item.content)">
                  {{item.content}}
                </div>
              </div>
            </div>
            <div class="duanyu poa" v-show="hidden2" @click.stop="funs">
              <div class="divTop clearfix">
                <div class="lt clearfix">
                  <img src="../../assets/image/shouqianB.png" class="lt" alt="">
                  <span class="lt">售后短语</span>
                </div>
                <div class="rt" style="cursor:pointer;" @click="hidden2 = false">
                  <img src="../../assets/image/guanbi.png" alt="">
                </div>
              </div>
              <div class="box clearfix">
                <div class="items" v-for="(item, index) in useful.after_sale" :key="index" @click="fulSend(item.content)">
                  {{item.content}}
                </div>
              </div>
            </div>
            <el-upload
              class="upload-demo clearfix"
              action=""
              :http-request="video_upload"
              :show-file-list="false"
              :before-upload="video_beforeUpload"
              list-type="picture"
            >
              <!-- icon="el-icon-picture" -->
              <el-button v-loading.fullscreen.lock="fullscreenLoading" class="btn" circle>
                <img src="../../assets/image/tupianA.png" class="imgA" alt="">
                <img src="../../assets/image/tupianB.png" class="imgB" alt="">
                <span>发送图片</span>
              </el-button>
              <!-- icon="el-icon-video-camera" -->
              <el-button class="btn" circle>
                <img src="../../assets/image/shipinA.png" class="imgA" alt="">
                <img src="../../assets/image/shipinB.png" class="imgB" alt="">
                <span>发送视频</span>
              </el-button>
            </el-upload>
            <div class="btn btn1" style="margin-left:153px" @click.stop="click1">
              <img src="../../assets/image/shouqianA.png" class="imgA" alt="">
              <img src="../../assets/image/shouqianB.png" class="imgB" alt="">
              <span>售前短语</span>
            </div>
            <div class="btn btn1" @click.stop="click2">
              <img src="../../assets/image/shouhouA.png" class="imgA" alt="">
              <img src="../../assets/image/shouhouB.png" class="imgB" alt="">
              <span>售后短语</span>
            </div>
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
      </div>
      <!-- 右侧客服查看用户功能栏 -->
      <div class="right">
        <div class="block">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="客户信息" name="first">

              <div class="list clearfix">
                <div class="items">
                  <img src="../../assets/image/pic003.png" alt="">
                  <span class="span1">昵称</span>
                  <span class="span2">{{userinfo.nickname}}</span>
                </div>
                
                <div class="items">
                  <img src="../../assets/image/pic006.png" alt="">
                  <span class="span1">用户UID</span>
                  <span class="span2">{{userinfo.uid}}</span>
                </div>
                
                <div class="items">
                  <img src="../../assets/image/pic014.png" alt="">
                  <span class="span1">账号</span>
                  <span class="span2">{{userinfo.phone}}</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic008.png" alt="">
                  <span class="span1">消费金额</span>
                  <span class="span2">{{userinfo.consume}}元</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic008.png" alt="">
                  <span class="span1">退款金额</span>
                  <span class="span2">{{userinfo.refund}}元</span>
                </div>
              </div>

              <!-- <div class="list clearfix" style="margin-top:20px">
                <div class="tit">
                  <span>账户数据</span>
                </div>
                <div class="tit">
                  <span></span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic008.png" alt="">
                  <span class="span1">消费金额</span>
                  <span class="span2">{{userinfo.consume}}元</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic008.png" alt="">
                  <span class="span1">退款金额</span>
                  <span class="span2">{{userinfo.refund}}元</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic015.png" alt="">
                  <span class="span1">直接推荐</span>
                  <span class="span2">{{userinfo.recommend_num}}人(有效{{userinfo.recommend_valid}}人)</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic015.png" alt="">
                  <span class="span1">团队人数</span>
                  <span class="span2">{{userinfo.team}}人</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic001.png" alt="">
                  <span class="span1">橘宝余额</span>
                  <span class="span2">{{userinfo.point_balance}}</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic002.png" alt="">
                  <span class="span1">橘宝待用</span>
                  <span class="span2">{{userinfo.stay_use_score}}</span>
                </div>
              </div>

              <div class="list clearfix" style="margin-top:26px">
                <div class="tit">
                  <span>账户认证</span>
                </div>
                <div class="tit">
                  <span>其他信息</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic006.png" alt="">
                  <span class="span1">实名认证</span>
                  <span class="span2" style="text-align:center;">{{userinfo.is_authentication==1?'是':'否'}}</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic005.png" alt="">
                  <span class="span1">认证时间</span>
                  <span class="span2">{{userinfo.authentication_time}}</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic009.png" alt="">
                  <span class="span1">微信绑定</span>
                  <span class="span2" style="text-align:center;">{{userinfo.is_weixin==1?'是':'否'}}</span>
                </div>
                <div class="items">
                  <img src="../../assets/image/pic005.png" alt="">
                  <span class="span1">注册时间</span>
                  <span class="span2">{{userinfo.reg_time}}</span>
                </div>
                
              </div> -->
            </el-tab-pane>
            <el-tab-pane label="订单查询" name="second">
              <div class="orderInfo">
                <div class="list active clearfix" style="border:none;margin-bottom:10px;padding-bottom:10px">
                  <div class="items" style="border:none">
                    <img src="../../assets/image/pic020.png" alt="">
                    <span class="span1">订单总数</span>
                    <span class="span2">{{orderInfo.order_num}}件</span>
                  </div>
                  <div class="items" style="border:none">
                    <img src="../../assets/image/pic019.png" alt="">
                    <span class="span1">完成订单</span>
                    <span class="span2">{{orderInfo.accomplish_num}}单</span>
                  </div>
                  <div class="items" style="border:none">
                    <img src="../../assets/image/pic022.png" alt="">
                    <span class="span1">未完成数</span>
                    <span class="span2">{{orderInfo.unfinished_num}}单</span>
                  </div>
                  <div class="items" style="border:none">
                    <img src="../../assets/image/pic021.png" alt="">
                    <span class="span1">售后记录</span>
                    <span class="span2">{{orderInfo.return_num}}条</span>
                  </div>
                  <s class="ss"></s>
                </div>
              </div>
              <div class="order">
                <el-input
                  class="input"
                  style="width:100%"
                  placeholder="输入未完成订单号"
                  prefix-icon="el-icon-search"
                  v-model="orderNum"
                  @keyup.enter.native="orderSeach"
                >
                </el-input>
              </div>
              <div class="box">
                <div class="items" v-for="(item,index) in orderList" :key="index">
                  <div class="first clearfix">
                    <span class="lt">订单编号</span>
                    <span class="lt" style="margin-left:5px;">{{item.order_no}}</span>
                    <span class="rt">{{item.product_status}}</span>
                  </div>
                  <div class="second clearfix" v-for="(ite,ind) in item.product" :key="ind">
                    <div class="img">
                      <el-image
                      :src="ite.product_image"
                      fit="cover"></el-image>
                      <span class="poa span" v-if="ite.is_baby == 1">悦淘专享</span>
                    </div>
                    <div class="jia">
                      <p class="shen1">{{ite.product_name}}</p>
                      <div class="div1 clearfix">
                        <span class="c lt">{{ite.sku_data}}</span>
                        <span class="c rt">X{{ite.pro_num}}</span>
                      </div>
                      <div class="clearfix">
                        <span class="lt">销售价:￥{{ite.pro_price}}</span>
                        <span class="ct rt" style="color: #f7a062;" v-show="parseInt(ite.return_accomplish_num) > 0">退款完成:{{ite.return_accomplish_num}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="third">
                    <div class="clearfix">
                     <span class="lt">收货人:{{item.address_user}}</span>
                      <span class="rt">下单时间:{{item.add_time}}</span>
                    </div>
                    <div class="clearfix div2">
                      <span class="lt">订单合计: <span style="color: #f7a062;">￥{{item.sub_total}}</span></span>
                      <span class="rt">电话:{{item.address_tel}}</span>
                    </div>
                    <div class="clearfix">
                      
                      <span class="rt bt" @click="openOrder(item)">发送</span>
                    </div>
                  </div>
                </div>
                <!-- 分页 -->
                <el-row :gutter="20" class="goodsindex-list" v-if="orderList.length>0" style="margin:0;">
                  <el-col :span="24" class="goodsindex-page-box">
                    <div class="por">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo3.page"
                        :page-sizes="[5, 10, 20, 30, 50]"
                        :page-size="queryInfo3.pageSize"
                        layout="total,prev,next, jumper"
                        :total="queryInfo3.total"
                      >
                      </el-pagination>
                      <span class="poa" style="bottom:0;right:0;height:32px;line-height:32px;color:#666;font-size:13px">共{{Math.ceil(queryInfo3.total/queryInfo3.pageSize)}}页</span>
                    </div>
                  </el-col>
                </el-row>
                
              </div>
            </el-tab-pane>
            <el-tab-pane label="沟通历史" name="third">
              <div class="order">
                <el-input
                  class="input"
                  style="width:100%"
                  placeholder="请输入查询内容"
                  prefix-icon="el-icon-search"
                  v-model="contentText"
                  @keyup.enter.native="contentSeach"
                >
                </el-input>
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
                              >已完成</span
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
          </el-tabs>
        </div>
        <div class="bottom active">
          <!-- 快捷工具 -->
          <div class="ings clearfix">快捷工具</div>
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">物流查询</template>
              <div class="order">
                <el-select
                  v-model="pick_condition1"
                  class="select"
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
                <el-input
                  class="input"
                  placeholder="请输入快递单号"
                  prefix-icon="el-icon-search"
                  v-model="contentText1"
                  @keyup.enter.native="contentSeach1"
                >
                </el-input>
                <!-- <el-input
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
                ></el-button> -->
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
            </el-collapse-item>
            <!-- <el-collapse-item>
              <template slot="title"> 售后用语 </template>
              <div>
                
              </div>
            </el-collapse-item> -->
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  get_chat_record,
  user_info,
  order_search,
  chat_search,
  uploadfiles,
  set_useful,
  history_record_search,
  get_express_jvbao,
  get_express,
  bind_kf,
  kf_user_search,
  kf_im_login,
  get_duration,
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
      hidden1:false,
      hidden2:false,
      _lastTime:"",
      sreach:"",
      coustServState: "在线",
      contentText: "",
      contentText1: "",
      userinfo: {},
      //  first
      activeName: "first",
      userImg: "",
      userName: "",
      news: "",
      fromid: 0,
      toid: "",
      userList: [],
      userType:1,
      userSearchList:[],
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
      queryInfo3: {
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
      zuxiao:false,
      kfInfo2:{
        lastTime:"",
        kf_onlint_time:"",
      },
      kfInfo:{
        avatar:"",
        nick:"",
        lastUpdatedTime:"",
      },
      orderList:[],
      orderInfo:{
        order_num:0,
        accomplish_num:0,
        unfinished_num:0,
        return_num:0
      },
      userNum:0,
      userLength:"",
    };
  },
  created() {
    if (this.$route.query.uid) {
      // this.refund_search = ;
      this.toid = this.$route.query.uid
    }
    this.fromid = JSON.parse(localStorage.getItem('admin_messages')).store_id
    // this.fromid = 68

    // this.fromid = 699;
  },
  
  mounted: function () {
    //获取获取客服时长/登陆时间
    this.kfDeng()
    //请求常用语
    this.setUseful();
    //快递公司
    this.getExpress();
    let slef = this
    // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示:
    
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
        if(item.from == this.toid){
          if(typeof item.time == "number"){
            item.time = this.commonJs.timestampToTime(
              item.time
            );
          }
          
          var pay00,pay11;
          console.log("测试")
            console.log(item.payload.text)
            let cont = JSON.parse(item.payload.text)
            console.log(cont)
            pay00 = cont.type
            pay11 = cont.content
            if(pay00 == 4 || pay00 == 5){
              if(typeof pay11 == "string"){
                pay11 = JSON.parse(pay11)
                if(typeof pay11.addTime == "number"){
                pay11.addTime = this.commonJs.timestampToTime(
                  pay11.addTime
                );
              }
              }
            }
            console.log(pay00)
            console.log(pay11)
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
      this.hlData();
    });
    //监听SDK,已经到了ready
    let onSdkReady = (event)=> {
      console.log("监听SDK,已经到了ready")
      this.firstData();
      if(this.toid){
        console.log(this.toid)
        let promise = tim.getConversationProfile("C2C" + this.toid);
        promise.then((imResponse) => {
          // 获取成功
          
          // console.log(imResponse.data.conversation); // 会话资料
          let item = imResponse.data.conversation
          var items;
          if(item.lastMessage.messageForShow){
            items = JSON.parse(item.lastMessage.messageForShow)
          }else{
            items = {
              type:1,
              content:""
            }
          }
          if(typeof item.lastMessage.lastTime == "number"){
            //获取当前年月日
            var date = new Date();
            let nian = date.getFullYear();
            let yue = date.getMonth() + 1;
            let ri = date.getDate();
            let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
            if(now - item.lastMessage.lastTime <= 0){
              //年月日
              if(typeof item.lastMessage.lastTime == "number"){
                item.lastMessage.lastTime = this.commonJs.timestampToTime(
                  item.lastMessage.lastTime
                );
              }
              item.lastMessage.lastTime = String(item.lastMessage.lastTime)
              item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[1]
            }else{
              //时分秒
              if(typeof item.lastMessage.lastTime == "number"){
                item.lastMessage.lastTime = this.commonJs.timestampToTime(
                  item.lastMessage.lastTime
                );
              }
              item.lastMessage.lastTime = String(item.lastMessage.lastTime)
              item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[0]
            }
          }
          var data = {
            uid:item.userProfile.userID,
            name:item.userProfile.nick,
            image:item.userProfile.avatar,
            count_noread:item.unreadCount,
            lastTime:item.lastMessage.lastTime,
            data:{
              type:items.type,
              content:items.content,
            }
          }
          
          this.userSearchList.push(data)
          this.userType = 2
          console.log("测试----------")
          this.userName = data.name
          this.userImg = data.image
          this.userLength = 999999
          console.log(this.userSearchList)
          console.log(this.userName)
          console.log(this.userImg)
        }).catch(function(imError) {
          console.warn('getConversationProfile error:', imError); // 获取会话资料失败的相关信息
        });
      }
      // 个人资料
      let promise = tim.getMyProfile();
      promise.then((imResponse) => {
        imResponse.data.lastUpdatedTime = parseInt(imResponse.data.lastUpdatedTime/1000)
        imResponse.data.lastUpdatedTime = this.commonJs.timestampToTime(
          imResponse.data.lastUpdatedTime
        );
        // 1637292493
        // 1637043260
        this.kfInfo = imResponse.data // 个人资料 - Profile 实例
      }).catch(function(imError) {
        console.warn('getMyProfile error:', imError); // 获取个人资料失败的相关信息
      });1637292493581
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
    toProduct(id){
      window.open("https://www.rcwisdom.com/h5/admin/supplier/index.html#/goods/onSale?product_id=" + id)
      // this.$router.push({path:"/goods/onSale",query:{product_id:id}})
    },
    toOrder(id){
      // windows.open()
      window.open("https://www.rcwisdom.com/h5/admin/supplier/index.html#/order_/orderList_p?order_id=" + id)
      // this.$router.push({path:"/order_/orderList_p",query:{order_id:id}})
    },
    page(){
      if(this.hidden1){
        this.hidden1 = false
      }
      if(this.hidden2){
        this.hidden2 = false
      }
    },
    funs(){},
    click1(){
      if(this.hidden2){
        this.hidden2 = false
      }
      this.hidden1 = !this.hidden1
    },
    click2(){
      if(this.hidden1){
        this.hidden1 = false
      }
      this.hidden2 = !this.hidden2
    },
    inputs(){
      if(this.sreach == ''){
        this.hlData()
      }
    },
    sreachChange(){
      if(this.sreach){
        kf_user_search({
          search:this.sreach
        }).then((res) => {
          if (res.data.err_code == 0) {
            let list = []
            if(res.data.err_msg.list.length == 0){
              this.userList = []
            }else{
              res.data.err_msg.list.forEach( (item,index) => {
                var str = "C2C" + item.uid
                list.push(str)
              })
              console.log(list)
              // 获取指定的会话列表
              this.hlData(list)
            }
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
      }else if(this.sreach == ''){
        this.hlData()
      }
    },
    //登录获取密钥
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
    //绑定用户
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
            console.log("测试")
            console.log(item.payload.text)
            let cont = JSON.parse(item.payload.text)
            console.log(cont)
            pay00 = cont.type
            pay11 = cont.content
            if(pay00 == 4 || pay00 == 5){
              if(typeof pay11 == "string"){
                pay11 = JSON.parse(pay11)
              }
            }
            console.log(pay00)
            console.log(pay11)
            
          //   // item.payload.text = JSON.parse(item.payload.text)
          // if(item.payload.text.indexOf(",") != -1){
          //   var pay = item.payload.text.split(",")
          //   var pay0 = pay[0]
          //   var pay1 = pay[1]
          //   pay00 = parseInt(pay0.split(":")[1])
          //   pay11 = pay1.split(":")[1]
          //   pay11 = pay11.split('"')[1]
            
          //   if(pay00 == 2 || pay00 == 3){
          //     pay11 = "http" + pay1.split("http")[1]
          //     pay11 = pay11.split('"')[0]
          //   }else if(pay00 == 4){
          //     var pay = item.payload.text
          //     var pay1 = JSON.parse(pay)
          //     var pay2 = pay1.content
          //     var pay3 = JSON.parse(pay2)
          //     pay11 = pay3
          //   }else if(pay00 == 5){
          //     var pay = item.payload.text
          //     var pay1 = JSON.parse(pay)
          //     var pay2 = pay1.content
          //     if(typeof pay2 == "string"){
          //       var pay3 = JSON.parse(pay2)
          //       pay11 = pay3
          //     }else{
          //       pay11 = pay2
          //     }
          //   }
          //   if(pay00){

          //   }else{
          //     pay = item.payload.text.split(",")
          //     pay0 = pay[1]
          //     pay1 = pay[0]
          //     pay00 = parseInt(pay0.split(":")[1])
          //     pay11 = pay1.split(":")[1]
          //     pay11 = pay11.split('"')[1]
          //   }
          //   if(index == 14){
          //     console.log(item.payload.text)
          //     console.log(pay)
          //     console.log(pay00)
          //     console.log(pay11)
          //     if(typeof pay11 == "string"){
                
          //     }
          //   }
            
          // }else{
            
          //   var pay11 = item.payload.text
          //   var pay00 = 1
          // }
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
    //获取客服和用户的聊天记录
    userDuiHua(){
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
            console.log("测试")
            console.log(item.payload.text)
            let cont = JSON.parse(item.payload.text)
            console.log(cont)
            pay00 = cont.type
            pay11 = cont.content
            if(pay00 == 4 || pay00 == 5){
              if(typeof pay11 == "string"){
                pay11 = JSON.parse(pay11)
              }
            }
            console.log(pay00)
            console.log(pay11)
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
        console.log("列表")
        console.log(this.newsList)
        this.newsList.forEach(item => {
          if(item.content.addTime){
            item.content.addTime = this.commonJs.timestampToTime(
              item.content.addTime
            );
          }
          
        })
        
        //定位到滚动条最下面
        setTimeout(() => {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        },100)
        // this.conversationID = imResponse.data.conversationID;
        this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        this.endBlean = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        
      });
    },
    //登录IM
    loginImg(){
      
      let self = this
      let data = {
        userID: "s_"+this.fromid,
        userSig: this.sign
      }
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
    //第一次登录获取全量用户列表
    firstData(){
      console.log("第一次")
      let promise = tim.getConversationList();
      promise.then((imR) => {
        const conversationList = imR.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
        
        console.log(conversationList)
        if(conversationList.length>0){
          this.userNum = conversationList.length
          this.userList = []
          if(conversationList[0].unreadCount > 0){
            
            // 将某会话下所有未读消息已读上报
            let promise = tim.setMessageRead({conversationID: 'C2C' + conversationList[0].userProfile.userID});
            promise.then((imResponse) => {
              // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
              conversationList[0].unreadCount = 0
            }).catch((imError)=> {
              // 已读上报失败
              console.warn('setMessageRead error:', imError);
            });
          }
          if(this.toid){

          }else{
            this.toid = conversationList[0].userProfile.userID
          }
          this.orderSeach(this.toid)
          this.userInfo();
          this.huoBlean = true
          this.bindyong()
          conversationList.forEach((item,index) => {
            var items;
            if(item.lastMessage.messageForShow){
              items = JSON.parse(item.lastMessage.messageForShow)
            }else{
              items = {
                type:1,
                content:""
              }
            }
            //获取当前年月日
            var date = new Date();
            let nian = date.getFullYear();
            let yue = date.getMonth() + 1;
            let ri = date.getDate();
            let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
            if(now - item.lastMessage.lastTime <= 0){
              //年月日
              if(typeof item.lastMessage.lastTime == "number"){
                item.lastMessage.lastTime = this.commonJs.timestampToTime(
                  item.lastMessage.lastTime
                );
              }
              item.lastMessage.lastTime = String(item.lastMessage.lastTime)
              item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[1]
            }else{
              //时分秒
              if(typeof item.lastMessage.lastTime == "number"){
                item.lastMessage.lastTime = this.commonJs.timestampToTime(
                  item.lastMessage.lastTime
                );
              }
              item.lastMessage.lastTime = String(item.lastMessage.lastTime)
              item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[0]
            }
            var data = {
              uid:item.userProfile.userID,
              name:item.userProfile.nick,
              image:item.userProfile.avatar,
              count_noread:item.unreadCount,
              lastTime:item.lastMessage.lastTime,
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
    //仅仅跟新用户列表
    hlData(list){
      console.log("hlData")
      let promise = tim.getConversationList();
      if(list && list.length > 0){
        promise = tim.getConversationList(list);
      }
      promise.then((imR) => {
        const conversationList = imR.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
        console.log("更新会话列表")
        console.log(conversationList)
        if(conversationList.length>0){
          this.userList = []
          conversationList.forEach((item,index) => {
            var items;
            if(item.lastMessage.messageForShow){
              items = JSON.parse(item.lastMessage.messageForShow)
            }else{
              items = {
                type:1,
                content:""
              }
            }
            if(item.userProfile.userID == this.toid){
              console.log("用户")
              console.log(item)
              if(item.unreadCount > 0){
                // 将某会话下所有未读消息已读上报
                let promise = tim.setMessageRead({conversationID: 'C2C' + item.userProfile.userID});
                promise.then((imResponse) => {
                  // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
                  // item.count_noread = 0
                  this.hlData()
                }).catch((imError)=> {
                  // 已读上报失败
                  console.warn('setMessageRead error:', imError);
                });
              }
            }
            if(typeof item.lastMessage.lastTime == "number"){
              //获取当前年月日
              var date = new Date();
              let nian = date.getFullYear();
              let yue = date.getMonth() + 1;
              let ri = date.getDate();
              let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
              if(now - item.lastMessage.lastTime <= 0){
                //年月日
                if(typeof item.lastMessage.lastTime == "number"){
                  item.lastMessage.lastTime = this.commonJs.timestampToTime(
                    item.lastMessage.lastTime
                  );
                }
                item.lastMessage.lastTime = String(item.lastMessage.lastTime)
                item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[1]
              }else{
                //时分秒
                if(typeof item.lastMessage.lastTime == "number"){
                  item.lastMessage.lastTime = this.commonJs.timestampToTime(
                    item.lastMessage.lastTime
                  );
                }
                item.lastMessage.lastTime = String(item.lastMessage.lastTime)
                item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[0]
              }
            }
            var data = {
              uid:item.userProfile.userID,
              name:item.userProfile.nick,
              image:item.userProfile.avatar,
              count_noread:item.unreadCount,
              lastTime:item.lastMessage.lastTime,
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
    //快递公司
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
                news = JSON.stringify(news)
                console.log(news)
                let message = tim.createTextMessage({
                  to: self.toid,
                  conversationType: TIM.TYPES.CONV_C2C,
                  payload: {
                    text: news
                  },
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
        str == "jpeg" ||
        str == "jfif" ||
        str == "webp"
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
          str == "jpg" ||
          str == "jfif" ||
          str == "webp"
          
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
    //用户发送订单
    openOrder(item){
      let self = this
      this.$confirm('是否给用户发送这条订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item)
        var news;
        var newss = {
          type:5,
          content:{
            addTime: item.addTime,
            add_time: item.addTime,
            costPrice: item.cost_price,
            order_id: item.order_id,
            order_no: item.order_no,
            pay_money: item.pay_money,
            product:item.product[0],
            product_num: item.product.length,
            should_price: item.should_price,
            status: item.status,
            statusStr: item.product_status,
            sub_total: item.sub_total,
            store_name:this.kfInfo.nick,
          }
        }
        var newData = {
          type:5,
          content:{
            addTime: item.addTime,
            add_time: item.addTime,
            costPrice: item.cost_price,
            order_id: item.order_id,
            order_no: item.order_no,
            pay_money: item.pay_money,
            product:item.product[0],
            product_num: item.product.length,
            should_price: item.should_price,
            status: item.status,
            statusStr: item.product_status,
            sub_total: item.sub_total,
            store_name:this.kfInfo.nick,
          }
        }
        newss.content = JSON.stringify(newss.content)
        news = JSON.stringify(newss)
        let message = tim.createTextMessage({
          to: self.toid,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            text: news
          },
        });
        
        // 2. 发送消息
        let promise = tim.sendMessage(message);
        promise.then((imResponse) => {
          // 发送成功
          console.log("发送成功")
          console.log(imResponse);
          this.hlData()
          var tim1 = this.commonJs.newTimestampToTime(new Date())
          console.log(newData)
          if(newData.content.addTime){
            newData.content.addTime = this.commonJs.timestampToTime(
              newData.content.addTime
            );
          }
          var data = {
            type:5,
            fromid:this.formid,
            toid:this.toid,
            content:newData.content,
            is_read:true,
            add_time:tim1,
          }
          console.log(data)
          this.newsList.push(data)
          //定位到滚动条最下面
          setTimeout(() => {
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
          },100)
        }).catch(function(imError) {
          // 发送失败
          console.warn('sendMessage error:', imError);
        });
      }).catch(() => {
        
      });
    },
    orderSeach(index) {
      let data = {
        order_no: this.orderNum,
        uid:this.toid,
        page_size:10,
        page:1
      }
      if(index == 1){
        data.order_no = ''
      }
      order_search(
        data
      ).then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach(item => {
            item.addTime = item.add_time;
            item.add_time = this.commonJs.timestampToTime(item.add_time);
            if(item.status == 1){
              item.product_status = "待支付"
            }else if(item.status == 2){
              item.product_status = "待发货"
            }else if(item.status == 3){
              item.product_status = "待收货"
            }else if(item.status == 4){
              item.product_status = "已完成"
            }else if(item.status == 5){
              item.product_status = "已取消"
            }else if(item.status == 7){
              item.product_status = "待完成"
            }
          })
          this.orderList = res.data.err_msg.list
          this.orderInfo.order_num = res.data.err_msg.order_num
          this.orderInfo.return_num = res.data.err_msg.return_num
          this.orderInfo.total_number = res.data.err_msg.total_number
          this.orderInfo.unfinished_num = res.data.err_msg.unfinished_num
          this.orderInfo.accomplish_num = res.data.err_msg.accomplish_num
          this.queryInfo3.pageSize = parseInt(res.data.err_msg.page_size)
          this.queryInfo3.page = parseInt(res.data.err_msg.page)
          this.queryInfo3.total = parseInt(res.data.err_msg.total_number)
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    //分页
    get_shop_list_page (page , number) {
      let that = this
      let data = {
        order_no: this.orderNum,
        uid:this.toid,
        page_size:number,
        page:page
      }
      order_search(
        data
      ).then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach(item => {
            item.add_time = this.commonJs.timestampToTime(item.add_time);
          })
          this.orderList = res.data.err_msg.list
          this.orderInfo.order_num = res.data.err_msg.order_num
          this.orderInfo.return_num = res.data.err_msg.return_num
          this.orderInfo.total_number = res.data.err_msg.total_number
          this.orderInfo.unfinished_num = res.data.err_msg.unfinished_num
          this.orderInfo.accomplish_num = res.data.err_msg.accomplish_num
          that.queryInfo3.pageSize = parseInt(res.data.err_msg.page_size)
          that.queryInfo3.page = parseInt(res.data.err_msg.page)
          that.queryInfo3.total = parseInt(res.data.err_msg.total_number)
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
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
    //点击左侧搜索到的用户切换聊天用户
    clickSearchUser(itemObj,index){
      console.log("写逻辑")
      console.log(itemObj)
      console.log(index)
      let promise = tim.getConversationProfile('C2C' + itemObj.uid);
      promise.then((imResponse) => {
        // 获取成功
        // console.log(imResponse.data.conversation); // 会话资料
        let items = imResponse.data.conversation
        var obj;
        if(items.lastMessage.messageForShow){
          obj = JSON.parse(items.lastMessage.messageForShow)
        }else{
          obj = {
            type:1,
            content:""
          }
        }
        if(typeof items.lastMessage.lastTime == "number"){
          //获取当前年月日
          var date = new Date();
          let nian = date.getFullYear();
          let yue = date.getMonth() + 1;
          let ri = date.getDate();
          let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
          if(now - items.lastMessage.lastTime <= 0){
            //年月日
            if(typeof items.lastMessage.lastTime == "number"){
              items.lastMessage.lastTime = this.commonJs.timestampToTime(
                items.lastMessage.lastTime
              );
            }
            items.lastMessage.lastTime = String(items.lastMessage.lastTime)
            items.lastMessage.lastTime = items.lastMessage.lastTime.split(" ")[1]
          }else{
            //时分秒
            if(typeof items.lastMessage.lastTime == "number"){
              items.lastMessage.lastTime = this.commonJs.timestampToTime(
                items.lastMessage.lastTime
              );
            }
            items.lastMessage.lastTime = String(items.lastMessage.lastTime)
            items.lastMessage.lastTime = items.lastMessage.lastTime.split(" ")[0]
          }
        }
        var data1 = {
          uid:items.userProfile.userID,
          name:items.userProfile.nick,
          image:items.userProfile.avatar,
          count_noread:items.unreadCount,
          lastTime:items.lastMessage.lastTime,
          data:{
            type:obj.type,
            content:obj.content,
          }
        }
        this.userType = 1
        let promise = tim.getConversationList();
        promise.then((imR) => {
          const conversationList = imR.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
          console.log("全量的会话列表")
          console.log(conversationList)
          if(conversationList.length>0){
            this.userNum = conversationList.length
            
            this.userList = []
            // this.orderSeach(1)
            // this.userInfo();
            // this.huoBlean = true
            // this.bindyong()
            conversationList.forEach((item,index) => {
              
              var items;
              if(item.lastMessage.messageForShow){
                items = JSON.parse(item.lastMessage.messageForShow)
              }else{
                items = {
                  type:1,
                  content:""
                }
              }
              //获取当前年月日
              var date = new Date();
              let nian = date.getFullYear();
              let yue = date.getMonth() + 1;
              let ri = date.getDate();
              let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
              if(now - item.lastMessage.lastTime <= 0){
                if(typeof item.lastMessage.lastTime == "number"){
                  item.lastMessage.lastTime = this.commonJs.timestampToTime(
                    item.lastMessage.lastTime
                  );
                }
                //年月日
                // item.lastMessage.lastTime = this.commonJs.timestampToTime(
                //   item.lastMessage.lastTime
                // );
                item.lastMessage.lastTime = String(item.lastMessage.lastTime)
                item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[1]
              }else{
                //时分秒
                if(typeof item.lastMessage.lastTime == "number"){
                  item.lastMessage.lastTime = this.commonJs.timestampToTime(
                    item.lastMessage.lastTime
                  );
                }
                // item.lastMessage.lastTime = this.commonJs.timestampToTime(
                //   item.lastMessage.lastTime
                // );
                item.lastMessage.lastTime = String(item.lastMessage.lastTime)
                item.lastMessage.lastTime = item.lastMessage.lastTime.split(" ")[0]
              }
              var data = {
                uid:item.userProfile.userID,
                name:item.userProfile.nick,
                image:item.userProfile.avatar,
                count_noread:item.unreadCount,
                lastTime:item.lastMessage.lastTime,
                data:{
                  type:items.type,
                  content:items.content,
                }
              }
              if(data1.uid != data.uid){
                this.userList.push(data)
              }
              
            })
            //奇怪的数据，怎么也想不通 --！ this.userList
            //做兼容操作
            // this.userNum
            this.userList.unshift(data1)
            if(this.userList.length > this.userLength){
              this.userList.splice(1,this.userLength)
            }
            setTimeout(() => {
              this.$refs.userBox.scrollTop = 0
            }, 100);
          }
          
          // this.userList = []
        }).catch(function(imError) {
          console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
        });

        this.time = 0;
        this.userSeeList = "1";
        this.userSeeList1 = [];
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

        this.toid = itemObj.uid;

        // //绑定新用户
        this.bindyong();
        //绑定之后重新请求客户消息记录
        this.userDuiHua()
        this.orderSeach(this.toid)
        if(itemObj.count_noread > 0){
          // 将某会话下所有未读消息已读上报
          let promise = tim.setMessageRead({conversationID: 'C2C' + itemObj.uid});
          promise.then((imResponse) => {
            // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
            // item.count_noread = 0
          }).catch((imError)=> {
            // 已读上报失败
            console.warn('setMessageRead error:', imError);
          });
        }
        this.userInfo();
        //
        this.userImg = itemObj.image;
        this.userName = itemObj.name;

      })

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
        this.orderSeach(this.toid)
        this.userDuiHua()
        console.log(item.count_noread)
        if(item.count_noread > 0){
          // 将某会话下所有未读消息已读上报
          let promise = tim.setMessageRead({conversationID: 'C2C' + item.uid});
          promise.then((imResponse) => {
            // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
            // item.count_noread = 0
            this.hlData()
          }).catch((imError)=> {
            // 已读上报失败
            console.warn('setMessageRead error:', imError);
          });
        }
        this.userInfo();
        this.userImg = this.userList[index].image;
        this.userName = this.userList[index].name;
      }else{
        console.log(item.count_noread)
        if(item.count_noread > 0){
          // 将某会话下所有未读消息已读上报
          let promise = tim.setMessageRead({conversationID: 'C2C' + item.uid});
          promise.then((imResponse) => {
            // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
            // item.count_noread = 0
            this.hlData()
          }).catch((imError)=> {
            // 已读上报失败
            console.warn('setMessageRead error:', imError);
          });
        }
      }
    },
    kfDeng(){
      get_duration({

      }).then((res) => {
        
        if (res.data.err_code == 0) {
          res.data.err_msg = res.data.err_msg.info
          res.data.err_msg.last_kf_login_time = this.commonJs.timestampToTime(
            res.data.err_msg.last_kf_login_time
          );
          this.kfInfo2.lastTime = res.data.err_msg.last_kf_login_time
          this.kfInfo2.kf_onlint_time = this.shijian(res.data.err_msg.kf_onlint_time)
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    shijian(value){
      let result = parseInt(value)
      let tian = Math.floor(result / 86400) < 10 ? '0' + Math.floor(result / 86400) : Math.floor(result / 86400);
      let h = Math.floor((result / 3600 % 24)) < 10 ? '0' + Math.floor((result / 3600 % 24)) : Math.floor((result / 3600 % 24));
      let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
      let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  
      let ress = '';
      if(tian !== '00') ress += `${tian}天`;
      if(h !== '00') ress += `${h}小时`;
      if(m !== '00') ress += `${m}分`;
      ress += `${s}秒`;
      return ress
    },
    //请求常用语
    setUseful() {
      set_useful({

      }).then((res) => {
        if (res.data.err_code == 0) {
          if(res.data.err_msg.list.greetings){
            if(res.data.err_msg.list.greetings.length > 0){
              if(res.data.err_msg.list.greetings.length < 8){
                var num = 8-res.data.err_msg.list.greetings.length
                var arr = []
                for(let i = 0 ; i < num ; i ++){
                  arr.push("")
                }
                res.data.err_msg.list.greetings = res.data.err_msg.list.greetings.concat(arr)
              }
            }
            if(res.data.err_msg.list.greetings.length%2 != 0){
              res.data.err_msg.list.greetings.push("")
            }
          }
          if(res.data.err_msg.list.after_sale){
            if(res.data.err_msg.list.after_sale.length > 0){
              if(res.data.err_msg.list.after_sale.length < 8){
                var num = 8-res.data.err_msg.list.after_sale.length
                var arr = []
                for(let i = 0 ; i < num ; i ++){
                  arr.push("")
                }
                res.data.err_msg.list.after_sale = res.data.err_msg.list.after_sale.concat(arr)
              }
            }
            if(res.data.err_msg.list.after_sale.length%2 != 0){
              res.data.err_msg.list.after_sale.push("")
            }
          }
          this.useful = res.data.err_msg.list;

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
      if(talk){
        let self = this
        let news = {
          type:1,
          content:talk
        }
        news = JSON.stringify(news)
        let message = tim.createTextMessage({
          to: self.toid,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            text: news
          },
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
            content:talk,
            is_read:true,
            add_time:tim1,
          }
          this.hidden2 = false
          this.hidden1 = false
          this.newsList.push(data)
          //定位到滚动条最下面
          setTimeout(() => {
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
          },100)
          
        }).catch(function(imError) {
          // 发送失败
          console.warn('sendMessage error:', imError);
        });
      }
      
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
          this.userinfo.uid = this.toid
          this.userinfo.consume = res.data.err_msg.info.consume
          this.userinfo.refund = res.data.err_msg.info.refund
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
        // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考:https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
        // 支持的枚举值:TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
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
    },
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
  height: 233px;
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
        font-size: 12px;
      }
    }
  }
  .item.dian {
    min-height: 62px;
  }
}
/deep/ .order {
  margin: 0 0 5px!important;
  padding: 0!important;
  .select{
    width: 40%;
    padding: 0 5% 0 0!important;
    margin: 0!important;
    .el-input{
      padding-left: 10px!important;
    }
  }
  .input {
    width: 55%;
    margin-right: 20px;
    padding: 0!important;
    margin: 0!important;
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
  min-height: calc(100vh - 85px);
  
  background: #eaeaea;
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
    height: calc(100vh - 120px);
    .top{
      width: calc(100% - 400px);
      float: left;
      height: 100%;
      padding-right: 5px;
      
      .ding{
        height: 114px;
        background: #fff;
        border: 2px solid #bbb;
        border-radius: 10px;
        margin-bottom: 5px;
        .first{
          width: 400px;
          border-right: 1px solid #bbb;
          padding: 30px;
            .img{
              margin-right: 10px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
            }
            span{
              line-height: 25px;
              display: block;
              font-size: 14px;
            }

        }
        .second{
          width: calc(100% - 400px);
          .items{
            padding: 30px 20px;
            float: left;
            .img{
                margin-right: 10px;
              }
            .lt{
              
              img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
              span{
                display: block;
                line-height: 15px;
                font-size: 14px;
              }
              p{
                line-height: 35px;
                font-size: 18px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .left {
      width: 295px;
      margin-right: 5px;
      float: left;
      background: #fff;
      border-radius: 10px;
      height: calc(100% - 119px);
      border: 2px solid #bbb;
      overflow-y: auto;
      .sreach{
        padding: 10px;
        .div{
          height:30px;
          border:1px solid #bbb;
          border-radius:3px;
          padding: 0 10px;
          overflow: hidden;
          i{
            color: #ccc;
            margin: 5px 10px 0 0;
          }
          input{
            width: calc(100% - 30px);
            height: 28px;
            border:none;
            outline: none;
          }
        }
      }
      .title{
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-top: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        background: #e3e2e1;
      }
      .leftBox{
        overflow-y: auto;
        height: calc(100% - 97px);
      }
      .leftBox::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .leftBox::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
      }
      .leftBox::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
      }
      .item {
        cursor: pointer;
        height: 65px;
        padding: 10px;
        .text {
          width: calc(100% - 43px);
          float: left;
          .p1{
            .span{
              width: 80%;
            }
            .spans{
              width: 20%;
              
              span{
                float: right;
                display: block;
                border-radius: 50%;
                color: #fff;
                background: red;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 22px;
                font-size: 12px;
              }
            }
          }
          .p2{
            .span{
              width: 68%;
              color: #999;
              font-size: 12px;
            }
            .spans{
              line-height: 24px;
              width: 30%;
              color: #999;
              font-size: 12px;
              text-align: right;
            }
          }
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
          height: 43px;
          float: left;
          border-radius:50%;
          overflow: hidden;
        }
      }
      .item:hover{
        background:#eee;
      }
      .item.active {
        background: #d2f2f7!important;
      }
      .item.bbb {
        background: #0000002b;
      }

    }

    .center {
      background: #fff;
      border-radius: 10px;
      height: calc(100% - 119px);
      width: calc(100% - 300px);
      float: left;
      border: 2px solid #bbb;
      overflow: hidden;
      .commun {
        height: calc(100% - 280px);
        border-bottom: 2px solid #bbb;
        overflow-y: auto;
        padding: 34px 11px 20px;
        .tim {
          padding-right: 50px;
          text-align: right;
          padding-top: 5px;
              color: #999;
        }
        .content {
          .news {
            float: left;
            padding-bottom: 10px;
            padding-top: 20px;
            line-height: 37px;
            padding: 0 10px;
            border-radius: 5px;
            margin-right: 10px;
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
          .news.shang{
            cursor: pointer;
            margin: 0 10px!important;
            color: #000;
            background: #e3e3e3;
            border: 1px solid #bbb;
            line-height: 20px;
            width: 260px;
            padding: 0;
            padding:4px 8px 8px;
            .img{
              width: 60px;
              height: 60px;
              overflow: hidden;
              border-radius: initial;
              img{
                width: 100%;
              }
              span.span{
                bottom: 0;
                left: 0;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                background: rgba(0,0,0,.73);
                color: #fff;
                text-align: center;
              }
            }
            .shen2{
              line-height: 19px;
              font-size: 12px;
              height: 38px;
              margin-bottom: 2px;
            }
            .div{
              width: 170px;
              padding-left: 10px;
              .lt{
                color: #f7a062;
                font-size: 13px;
              }
              .rt{
                color: #848484;
                font-size: 12px;
                i{
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
          .news.order{
            cursor: pointer;
            margin: 0 10px!important;
            color: #000;
            background: #e3e3e3;
            border: 1px solid #bbb;
            line-height: 20px;
            .items{
              font-size: 12px;
              width: 100%;
              .first{
                padding: 5px 10px 10px 0;
                line-height: 16px;
                .lt{
                  line-height: 16px;
                }
                .rt{
                  font-size: 16px;
                  color: #f7a062;
                  line-height: 16px;
                }
              }
              .second{
                padding: 10px 10px;
                background: #0000001a;
                border-radius: 5px;
                .img{
                  border-radius: 0%;
                  float: left;
                  margin-right:10px;
                  width: 60px;
                  height: 60px;
                  overflow: hidden;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                  span.span{
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    background: rgba(0,0,0,.73);
                    color: #fff;
                    text-align: center;
                    font-weight: bold;
                  }
                }
                .jia{
                  float: left;
                  width: calc(100% - 70px);
                  .shen2{
                    line-height: 20px;
                    min-height: 40px;
                  }
                  span.lt{
                    line-height: 20px;
                  }
                  .div1{
                    color: #a6a4a4;
                    margin: 3px 0;
                    span{
                      line-height: 16px;
                    }
                  }
                  .colorSpan{
                    color: #f86370;
                  }
                }
              }
              .third{
                padding:10px 0;
                span{
                  line-height: 16px;
                }
                .div2{
                  margin:5px 0;
                }
                .bt{
                  background: #1a98ec;
                  color: #fff;
                  border-radius: 3px;
                  padding: 2px 8px;
                  cursor:pointer;
                  display: block;
                }
              }
            } 
          }
          .img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #bbb;
            img{
              width: 40px;
              height: 40px;
            }
          }
        }
        .kf {
          .img {
            float: right;
            background: #d2f2f7;
            line-height: 37px;
            text-align: center;
            font-size: 13px;

          }
          .news {
            margin-right: 10px;
            float: right;
            color: #fff;
            background: #d28a57;
            border: 1px solid #d28a57;
          }
        }
        .user {
          .tim {
            padding-right: 0;
            span {
              width: 48px;
              
              height: 20px;
              float: left;
              max-width: 100px;
              padding-right: 20px;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 21px;
            }
            p {
              color: #999;
              line-height: 21px;
              float: left;
            }
          }
          .img {
            background: #0000002b;
            img{
              border-radius: 50%;
            }
          }
          .news {
            margin-left: 10px;
            background: #53a8d2;
            color: #fff;
            border: 1px solid #53a8d2;
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
        position: relative;
        background: #0000002b;
        height: 60px;
        border-bottom: 2px solid #bbb;
        padding: 3px 10px;
        .duanyu{
          width: 99%;
          height: 240px;
          background: #e5e4e3;
          bottom: 62px;
          border: 1px solid #bbb;
          left: 0.5%;
          border-radius:10px;
          padding-bottom: 10px;
          .divTop{
            padding: 10px 20px 5px;
            .lt{
              img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
              }
              span{
                font-size: 18px;
                line-height: 30px;
                color: #f76336;

              }
            }
            .rt{
              img{
                width: 30px;
                height: 30px;
              }
            }
          }
          .box{
            height: calc(100% - 45px);
            overflow-y:auto;
            width: 100%;
            margin-top: 5px;
            border-top: 1px solid #000;
            // border-bottom: 1px solid #000;
            position: relative;
            .s{
              position: absolute;
              bottom: 2px;
              left: 0;
              width: 100%;
              display: block;
              height: 1px;
              background: #000;
            }
            .items{
              height: 45px;
              border-bottom: 1px solid #000;
              width: 50%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              line-height: 45px;
              padding-left: 10px;
              float: left;
              cursor: pointer;
            }
            .items:nth-of-type(2n-1){
              border-right: 1px solid #000;
            }
          }
          .box::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
          }
          .box::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            /* border-radius: 10px; */
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #89989f;
          }
          .box::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            /* border-radius: 10px; */
            background: #ededed;
          }
          
        }
        .btn1{
          width: 70px;
          position: relative;
          bottom: 3px;
          cursor: pointer;
        }
        .btn{
          margin-right: 10px;
          float: left;
          text-align:center;
          img{
            width: 30px;
            height: 30px;
            margin: 5px auto 3px;
          }
          span{
            display: block;
            font-size: 14px;
            color: #606266;
            line-height: 1;
          }
          .imgA{
            display: block;
          }
          .imgB{
            display: none;
          }
          
        }
        .btn:hover{
          span{
            color: #f76336;  
          }
          .imgA{
            display: none;
          }
          .imgB{
            display: block;
          }
        }
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
        padding: 0 20px;
        background: #0000002b;
        border-bottom: 2px solid #bbb;
        font-size: 18px;
        height: 50px;
        .img{
          margin-top:6px;
          margin-right: 10px;
        }
        span{
          height: 50px;
          line-height: 50px;
        }
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
      float: right;
      background: #fff;
      border-radius: 10px;
      border: 2px solid #bbb;
      overflow: hidden;
      .block {
        height: 570px;
        .list{
          border: 1px solid #000;
          position: relative;
          .ss{
            width: 400px;
            height: 1px;
            background: #bbb;
            position: absolute;
            bottom: 0px;
            left: 50%;
            margin-left: -200px;
          }
          .tit{
            padding-left: 5px;
            width: 50%;
            float: left;
            height: 30px;
            span{
              line-height: 30px;
              color: #f76336;
              font-size: 12px;
              font-weight: bold;
            }
          }
          .tit:nth-of-type(2){
            border-left: 1px solid #000;
          }
          .items{
            border-top: 1px solid #bdbdbd;
            padding-left: 5px;
            height: 30px;
            span{
              font-size: 13px;
            }
            img{
              float: left;
              width: 20px;
              height: auto;
              margin-top: 5px;
              margin-right: 5px;
            }
            .span1{
              line-height: 30px;
              width: 110px;
              float: left;
              color: #555;
              padding-left: 20px;
            }
            .span2{
              float: left;
              line-height: 30px;
              width: calc(100% - 135px);
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              color: #555;
            }
          }
          
        }
        .list.active{
          .items{
            width: 50%;
            float: left;
          }
          .span1{
            width: 60px;
            padding: 0;
          }
          .span2{
            width: calc(100% - 85px);
          }
        }
        .box {
          height: 396px;
          overflow-y: auto;
          .items{
            font-size: 12px;
            background: #f4f1f1;
            border: 1px solid #c6c6c6;
            border-radius: 5px;
            margin: 5px 0;
            .first{
              padding: 10px 20px 0;
              .lt{
                line-height: 16px;
              }
              .rt{
                font-size: 14px;
                color: #f7a062;
                line-height: 16px;
              }
            }
            .second{
              padding: 10px 20px;
              border-bottom: 1px solid #d5d4d4;
              .img{
                float: left;
                margin-right:10px;
                width: 60px;
                height: 60px;
                overflow: hidden;
                position: relative;
                img{
                  width: 100%;
                  height: 100%;
                }
                span.span{
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 20px;
                  line-height: 20px;
                  font-size: 12px;
                  background: rgba(0,0,0,.73);
                  color: #fff;
                  text-align: center;
                }
              }
              .jia{
                float: left;
                width: calc(100% - 70px);
                
                .div1{
                  color: #a6a4a4;
                  margin: 5px 0;
                  span{
                    line-height: 16px;
                  }
                }
              }
            }
            .third{
              padding:10px 20px;
              span{
                line-height: 16px;
              }
              .div2{
                margin:5px 0;
              }
              .bt{
                background: #1a98ec;
                color: #fff;
                border-radius: 3px;
                padding: 2px 8px;
                cursor:pointer;
                display: block;
              }
            }
          }
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
          background: #f7a062;
          color: #fff;
          padding: 7px 20px;
          text-align: center;
        }
        .orderBox{
          padding: 0!important;
        }
        .itemLeft{
          padding-left: 5px;
          width: 80px;
        }
        .itemCenter{
          left:71px;
        }
        .itemRight{
          width: calc(100% - 64px - 40px);
        }
        
        .el-collapse-item__header{
          height: 40px!important;
          line-height: 40px!important;
        }
        .orderBox{
          height: 148px;
        }
      }
    }
  }
}
/deep/ .bottom{
  .el-collapse-item__header{
    height: 40px!important;
          line-height: 40px!important;
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
/deep/ .el-tabs__nav-scroll{
  background:#e4e3e2!important;
}
.right /deep/ .el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  width: 131px;
  text-align: center;
}
/deep/.itemCenter .icon{
  padding-left: 0!important;
}
/deep/ .el-button.is-circle{
  padding: 0px 5px!important;
}
/deep/ .fun .upload-demo .el-button{
  bottom: 1px;
}

</style>
