<template>
  <div class="page">
    <div class="nav">
      <span class="span1" :class="type == 1 ? 'active' : ''" @click="typeCl(1)"
        >首页装修</span
      >
      <span class="span2" :class="type == 2 ? 'active' : ''" @click="typeCl(2)"
        >商品分类装修</span
      >
    </div>
    <div class="navBox clearfix">
      <div class="iphone lt">
        <div class="box">
          <div class="bg">
            <div class="top" :style="{background:stores.color}">
              <el-image
                class="img lt"
                :src="stores.img_url"
                :preview-src-list="[stores.img_url]"
                fit="cover">
              </el-image>
              <div class="lt" style="width:calc(100% - 70px)">
                <div class="clearfix">
                  <div class="lt fff">
                    {{stores.store_name}}
                  </div>
                  <div class="rt por">
                    <i class="el-icon-circle-close fff poa" style="font-size:25px;top:-4px;left:-23px" @click="close"></i>
                  </div>
                </div>
                <div class="clearfix dianRight">
                  <div class="lt shen1 fff" style="width:130px;">
                    {{stores.store_sign}}
                  </div>
                  <div class="rt clearfix">
                    <span class="span1 lt">关注</span>
                    <span class="span2 lt">2399人关注</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="padd" v-if="navType == 0">
              <div class="banner">
                <div v-if="extendList1.length == 0">
                  <div style="text-align: center; padding: 20px 20px 20px">
                    <i
                      class="el-icon-folder-delete"
                      style="
                        font-size: 50px;
                        margin-bottom: 20px;
                        margin-right: 10px;
                        display: block;
                      "
                    ></i
                    ><span>您还有空余的轮播图位置，快去添加增加曝光率</span>
                  </div>
                </div>
                <el-carousel trigger="click" v-else>
                  <el-carousel-item v-for="(item,index) in extendList1" :key="index">
                    <div class="clearfix" v-if="item.tag == 1">
                      <div class="lt" style="width:110px;height:110px">
                          <el-image
                              style="width:110px;height:110px;border-radius:10px"
                              :src="item.product.image"
                              :preview-src-list="[item.product.image]"
                              fit="cover">
                          </el-image>
                      </div>
                      <!--  -->
                      <div class="lt" style="width:calc(100% - 110px);height:110pxpx;padding-left:10px;">
                          <p class="shen2" style="height:46px">{{item.product.name}}</p>
                          <p style="margin:8px 0 6px;color:#f4673c" class="shen2">￥{{item.product.price}}</p>
                          <p class="shen1">推荐理由：{{item.recommended_reason?item.recommended_reason:'无'}}</p>
                      </div>
                    </div>
                    <div class="clearfix" v-else-if="item.tag == 2">
                      <el-image
                          style="width:100%;height:110px;border-radius:10px"
                          :src="item.image"
                          :preview-src-list="[item.image]"
                          fit="cover">
                      </el-image>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="tabNav">
                <div class="navs clearfix">
                  <div class="blockBox">
                    <div class="nabBox">
                      <div class="content lt" v-for="(item , index) in zu_list" :key="index" :class="btnNavType == index ? 'active':''" @click="clic(item,index)">{{item.name}}</div>
                    </div>
                  </div>
                </div>
                <div class="commList clearfix" v-if="goodsList.length == 0">
                  <div class="text">
                    此分类暂无商品，请前往分组设置添加
                  </div>
                </div>
                <div class="commList clearfix" v-else-if="goodsList.length > 0 && zu_list[btnNavType].mould_type == 1">
                  
                  <div class="content active" v-for="(item , index) in goodsList" :key="index">
                    <div class="img lt">
                      <el-image
                        :src="item.image"
                        :preview-src-list="[item.image]"
                        fit="cover">
                      </el-image>
                    </div>
                    <div class="lt tet">
                      <span class="shen2">
                        {{item.name}}
                      </span>
                      <div class="price">
                        <span class="span1">
                          ￥
                        </span>
                        <span class="span2">
                          {{item.prime_cost_price}}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="commList clearfix" v-else-if="goodsList.length > 0 && zu_list[btnNavType].mould_type == 2">
                  
                  <div class="content" v-for="(item , index) in goodsList" :key="index">
                    <el-image
                        :src="item.image"
                        :preview-src-list="[item.image]"
                        fit="cover">
                    </el-image>
                    <span class="shen2">
                      {{item.name}}
                    </span>
                    <div class="price">
                      <span class="span1">
                        ￥
                      </span>
                      <span class="span2">
                        {{item.prime_cost_price}}
                      </span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="padd" v-else-if="navType == 1">
              <div class="text">暂无{{navList[navType]}}</div>
            </div>
            <div class="padd" v-else-if="navType == 2">
              <el-input
                placeholder="请输入内容"
                disabled
                prefix-icon="el-icon-search"
                v-model="input2">
              </el-input>
              <div class="conn" v-for="(item , index) in cate_list" :key="index">
                <div class="tops clearfix">
                  <div class="lt">
                    {{item.name}}
                  </div>
                  <div class="rt">
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="bottoms">
                  <div class="box1" v-for="(ite , ind) in item.category_list" :key="ind">
                    <span class="span1">{{ite.name}}</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="padd" v-else-if="navType == 3">
              <div class="text">暂无{{navList[navType]}}</div>
            </div>
            <div class="bottomNav clearfix">
              <div class="content lt" v-for="(item , index) in navList" :key="index" :class="navType == index ? 'active':''" @click="navType = index">{{item}}</div>
            </div>
            
          </div>
          
        </div>
      </div>
      <div class="iphoneRight lt">
        <div v-if="type == 1">
          <div class="content">
          <div class="topHead clearfix">
            <s class="lt"></s>
            <span class="lt">店铺装修</span>
            <el-button type="primary" class="rt" @click="save" size="mini"
              >保存</el-button
            >
          </div>
          <div class="bottom clearfix">
            <div class="cont clearfix">
              <span class="lt active">店铺配色：</span>
              <el-color-picker
                v-model="store.color"
                color-format="hex"
                class="lt"
                :predefine="predefineColors"
              >
              <!-- show-alpha -->
              </el-color-picker>
            </div>
            <div class="cont clearfix">
              <span class="lt active">头像修改：</span>
              <el-image
                style="width: 60px; height: 60px; border-radius: 50%"
                :src="store.img_url"
                fit="cover"
                class="lt"
                :preview-src-list="[store.img_url]"
              >
                <div
                  slot="error"
                  class="image-slot"
                  style="
                        width: 58px; height: 58px
                        text-align: center;
                        border: 1px solid #bbb;
                        border-radius:50%;
                        "
                ></div>
              </el-image>
              <el-upload
                class="upload-demo lt"
                action=""
                :http-request="img_upload1"
                :before-upload="img_beforeUpload1"
                :show-file-list="false"
                list-type="picture"
                style="margin-bottom: 20px"
              >
                <el-button
                  size="medium"
                  icon="el-icon-edit"
                  circle
                  class="btn"
                  style="margin-left: 35px; border: none"
                ></el-button>
              </el-upload>
            </div>
            <div class="cont clearfix">
              <span class="lt active">店铺名称：</span>
              <el-input
                class="lt"
                style="width: calc(100% - 85px); margin-top: 6px"
                v-model="store.store_name"
                placeholder="请输入店铺名称"
                clearable
              ></el-input>
            </div>
            <div class="cont clearfix">
              <span class="lt active">店铺签名：</span>
              <el-input
                class="lt"
                style="width: calc(100% - 85px); margin-top: 6px"
                v-model="store.store_sign"
                placeholder="请输入店铺名称"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="topHead clearfix">
            <s class="lt"></s>
            <span class="lt">轮播图装修</span>
          </div>
          <div class="bottom bann clearfix" style="width:100%">
            <!-- v-model:personInfo="extendList" -->
            <draggable
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @end="drag_end"
              @add="drag_add"
              style="width:100%"
            >
              <transition-group style="width:100%">
                <div
                  class="banner"
                  v-for="(item, index) in extendList"
                  :key="index"
                >
                  <div class="topHead clearfix">
                    <s class="lt"></s>
                    <span class="lt" v-if="index == 0">位置一</span>
                    <span class="lt" v-else-if="index == 1">位置二</span>
                    <span class="lt" v-else-if="index == 2">位置三</span>
                  </div>
                  <div class="box" v-if="item.tag == 1">
                    <div class="comm">
                      <div class="info clearfix" style="margin-bottom: 0px">
                        <span class="left">推荐商品:</span>
                        <span class="shen2 right">{{ item.product.name }}</span>
                      </div>
                      <div class="info active clearfix">
                        <span class="left">价格显示:</span>

                        <span class="shen1 right">
                          <span style="color: #f4673c">￥</span
                          >{{ item.product.price }}
                        </span>
                      </div>
                      <div class="info active clearfix">
                        <span class="left" style="width: 56px">商品ID:</span>
                        <span class="shen1 right">{{
                          item.product.product_id
                        }}</span>
                      </div>
                      <div class="info clearfix">
                        <span class="left">推荐理由:</span>
                        <span class="shen1 right">{{
                          item.recommended_reason
                        }}</span>
                      </div>
                      <div class="info clearfix">
                        <span class="left">推荐图片:</span>
                        <span class="shen1 right">
                          <el-image
                            style="width: 100px; height: 60px"
                            :src="item.product.image"
                            fit="cover"
                            class="lt"
                            :preview-src-list="[item.product.image]"
                          >
                          </el-image>
                        </span>
                      </div>
                      <div class="info clearfix">
                        <el-button size="medium" class="btn rt"
                          >去编辑</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <div class="box" v-else-if="item.tag == 2">
                    <div class="comm">
                      <div class="info clearfix">
                        <span class="left">推荐图片:</span>
                        <span class="shen1 right">
                          <el-image
                            style="width: 150px; height: 66px"
                            :src="item.image"
                            fit="cover"
                            class="lt"
                            :preview-src-list="[item.image]"
                          >
                          <!--  -->
                          </el-image>
                        </span>
                      </div>
                      <div class="info clearfix">
                        <span class="left">名称:</span>
                        <span class="shen2 right">暂无</span>
                      </div>
                      <div class="info clearfix" style="margin-bottom: 0px">
                        <span class="left">关联类型:</span>
                        <span class="shen1 right" v-if="item.type == 1">
                          商品
                        </span>
                        <span class="shen1 right" v-else-if="item.type == 2">
                          商品分组
                        </span>
                      </div>
                      <div class="info active clearfix">
                        <span class="left">分组名称:</span>
                        <span class="shen1 right">暂无</span>
                      </div>
                      <div class="info active clearfix">
                        <span class="left">分组ID:</span>
                        <span class="shen1 right">暂无</span>
                      </div>
                      <div class="info clearfix">
                        <el-button size="medium" class="btn rt"
                          >去编辑</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <div class="box" v-else-if="item.tag == 10000">
                    <div class="comm">
                      <div style="text-align: center; padding: 70px 20px 0">
                        <i
                          class="el-icon-folder-delete"
                          style="
                            font-size: 50px;
                            margin-bottom: 20px;
                            margin-right: 10px;
                            display: block;
                          "
                        ></i
                        ><span>您还有空余的轮播图位置，快去添加增加曝光率</span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="content">
          <div class="topHead clearfix">
            <s class="lt"></s>
            <span class="lt">推荐分组设置</span>
          </div>
          <div class="seach">

          </div>
          <div class="bottom clearfix">
            <div class="seach">
              <div class="seach_copy">
                <div class="seach_select">
                  <!-- <el-input
                    v-model="keywords"
                    placeholder="请输入分组ID/分组名称"
                    clearable
                  ></el-input> -->
                </div>
                <div class="button_type" style="text-align:right;margin-bottom:20px">
                  <el-button type="primary" @click="zu_add">增加</el-button>
                  <el-button type="warning" @click="zu_edit">修改</el-button>
                  <el-button
                    type="danger"
                    @click="zu_delete"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
            <!-- 列表开始 -->
            <el-row :gutter="20" class="goodsindex-list">
              <el-col :span="24">
                <el-table
                  :data="zu_list"
                  border
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"> </el-table-column>
                  <el-table-column label="序号" type="index">
                  </el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column prop="id" label="ID" width="80"></el-table-column>
                  <!-- <el-table-column label="商品名称">
                    <template>
                      暂无
                    </template>
                  </el-table-column>
                  <el-table-column label="销售价格">
                    <template>
                      暂无
                    </template>
                  </el-table-column> -->
                  <el-table-column label="市场价" width="80">
                    <template slot-scope="scope">
                      <span v-if="scope.row.show_price == 1"> 显示 </span>
                      <span v-else-if="scope.row.show_price == 2"> 隐藏 </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="排序" width="150">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.sort"
                        placeholder="请输入排序"
                        clearable
                      ></el-input>
                    </template>
                  </el-table-column>
                  <!--  -->
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
        </div>
        <div v-if="type == 2">
          <div class="content a">
            <div class="topHead clearfix">
              <s class="lt"></s>
              <span class="lt">操作样板展示</span>
            </div>
            <div class="bottom clearfix">
              <div class="conn">
                <div class="tops clearfix">
                  <div class="lt">
                    型男必备
                  </div>
                  <div class="rt">
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="bottoms active">
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                </div>
              </div>
              <div class="conn">
                <div class="tops clearfix">
                  <div class="lt">
                    靓女好靓
                  </div>
                  <div class="rt">
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="bottoms">
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                  <div class="box1">
                    <span class="span1">羽绒服</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content a">
            <div class="topHead clearfix">
              <s class="lt"></s>
              <span class="lt">装修操作</span>
              <el-button type="primary" class="rt" @click="save1" size="mini"
                >保存</el-button
              >
            </div>
            <div class="bottom clearfix">
              
              <div class="conn" v-for="(item , index) in cate_lists" :key="index">
                <div class="tops clearfix">
                  <div class="lt">
                    <span>{{item.name}}</span>
                    <i class="el-icon-edit-outline" @click="edit_opening(item,index)" style="font-size:21px;position: relative;top:3px;left:5px;cursor:pointer"></i>
                  </div>
                  <div class="rt">
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="bottoms">
                  <div class="box1" v-for="(ite , ind) in item.category_list" :key="ind">
                    <span class="span1">{{ite.name}}</span>
                    <i class="el-icon-edit i1" @click="iconEdit(item)"></i>
                    <i class="el-icon-remove i2" @click="smallShan(index,ind)"></i>
                  </div>
                  <div class="box2">
                    <i class="el-icon-circle-plus-outline i4" @click="add_small_tag(item,index)"></i>
                  </div>
                  
                </div>
                <i class="el-icon-remove i3" @click="bigShan(index)"></i>
                <div class="bottomNum">
                  
                  <span>已添加<span style="color:#000">{{item.category_list.length}}</span>个分类，共<span style="color:#000">86</span>款商品</span>
                </div>
              </div>
              <div class="conn" style="text-align: center;">
                <i
                  class="el-icon-circle-plus"
                  @click="add_opening"
                  style="font-size: 100px; margin-top: 33px;color:#f2840e;cursor:pointer;"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品分类装修修改,删除弹窗 -->
    <el-dialog
      width="30%"
      :visible.sync="opening_ifShow"
      class="remarks_box add"
    >
    <div class="info" v-if="opening_type == 1">增加主分类</div>
    
    <div class="info" v-else>修改主分组</div>
      <!-- <h2 style="margin-top:0;" v-if="type == 1">增加营销分类</h2>
              <h2 style="margin-top:0;" v-else-if="type == 2">修改营销分类</h2> -->
      <el-form :model="fors" style="min-height:200px">
        <!-- <div style="position:relative"> -->
        <el-form-item label="分组名称" :label-width="formLabelWidth">
          <el-input
            v-model="fors.live_name"
            placeholder="请输入新增分组名称"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="配图：" class="clearfix" :label-width="formLabelWidth">
          
          <el-image
            style="width: 100px; height: 100px"
            :src="fors.img_url"
            fit="cover"
            class="lt"
          >
            <div
              slot="error"
              class="image-slot"
              style="
                width: 98px;
                height: 98px;
                text-align: center;
                border: 1px solid #bbb;
              "
            >
              <i
                class="el-icon-picture-outline"
                style="font-size: 25px; margin-top: 32px"
              ></i>
            </div>
          </el-image>
          <el-upload
            class="upload-demo lt"
            action=""
            :http-request="img_upload1"
            :before-upload="img_beforeUpload1"
            :show-file-list="false"
            list-type="picture"
            style="margin-bottom: 20px"
          >
            <el-button size="small" type="primary" style="margin-top:70px;margin-left:20px">上传</el-button>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="opening_ifShow = false">取 消</el-button>
        <div v-if="opening_type == 1" style="display: inline-block;margin-left:20px">
          <el-button type="success" @click="submit_level"
            >增加</el-button
          >
        </div>

        <div v-else-if="opening_type == 2" style="display: inline-block;margin-left:20px">
          <el-button type="warning" @click="submit_level"
            >修改</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 商品分类装修修改,删除弹窗 -->
    <el-dialog
      width="70%"
      :visible.sync="group_ifShow"
      class="remarks_box add"
    >
      <div class="info">选择商品分组展示</div>
      <div style="padding:20px 40px 50px">
        <div class="seach">
          <div class="seach_copy">
            <div class="seach_select">
              
            </div>
            <div class="button_type clearfix" style="margin-bottom:20px">
              
              <el-button type="primary" class="rt" @click="groupAdd">确认添加</el-button>
            </div>
          </div>
        </div>
        <el-row :gutter="20" class="goodsindex-list">
          <el-col :span="24">
            <el-table
              :data="groupList"
              border
              height="500"
              style="width: 100%"
              @selection-change="handleSelectionChange1"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="序号" type="index">
              </el-table-column>
              <el-table-column prop="name" label="分组名称"></el-table-column>
              <el-table-column label="分类ID" prop="id">
              </el-table-column>
              <el-table-column label="添加时间" prop="create_time">
              </el-table-column>
              <el-table-column label="类型">
                <template slot-scope="scope">
                  <div v-if="scope.row.type == 1">普通</div>
                  <!-- <div v-else-if="scope.row.market_type == 1">秒杀</div> -->
                  <div v-else>未知</div>
                </template>
              </el-table-column>
              <el-table-column label="图标" width="120">
                <template slot-scope="scope">
                  <el-image
                    v-if="scope.row.image"
                      style="width:80px;height:80px"
                      :src="scope.row.image"
                      :preview-src-list="[scope.row.image]"
                      fit="cover">
                  </el-image>
                  <!--  -->
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column label="已使用位置">
                <template slot-scope="scope" v-if="extendList.length > 0">
                  <div v-for="(item1,index1) in scope.row.position.category_position" :key="index1">商品分类 >> {{item1}}</div>
                  <div>
                    <div v-for="(item,index) in scope.row.position.index_position" :key="index">首页推荐 >> {{item}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="product_num"
                label="商品数量"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      
    </el-dialog>
    <!-- 首页装修修改,删除弹窗 -->
      <el-dialog
        width="30%"
        :visible.sync="opening_change_ifShow"
        class="remarks_box add"
      >
        <div class="info" v-if="zu_type == 1">新增展示分组</div>
        <div class="info" v-else>编辑展示分组</div>
        <!-- <h2 style="margin-top:0;" v-if="type == 1">增加营销分类</h2>
                <h2 style="margin-top:0;" v-else-if="type == 2">修改营销分类</h2> -->
        <el-form :model="form">
          <!-- <div style="position:relative"> -->
          <el-form-item label="展示位置：" :label-width="formLabelWidth">
            <el-input
              v-model="form.sort"
              placeholder="请输入排序"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="类型：" :label-width="formLabelWidth">
            <el-select
              v-model="form.category_id"
              class="el-inpu"
              placeholder="请选择分组"
            >
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            
          </el-form-item>
          <!-- <el-form-item
            label="分类状态"
            :label-width="formLabelWidth"
            v-show="form.ifAdd"
          >
            <el-radio v-model="form.status" label="1">启用</el-radio>
            <el-radio v-model="form.status" label="2">禁用</el-radio>
          </el-form-item> -->
          <!-- <el-form-item label="展示样式：" class="clearfix" :label-width="formLabelWidth">
            <el-radio-group v-model="mould_type">
              <el-radio label="1">单列样式</el-radio>
              <el-radio label="2">双列样式</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="展示样式：" class="clearfix" :label-width="formLabelWidth">
              <el-radio label="1" v-model="form.mould_type">单列样式</el-radio>
              <el-radio label="2" v-model="form.mould_type">双列样式</el-radio>
              <!-- <input type="radio" name="radio1" value="单列样式"/>
              <input type="radio" name="radio1" value="双列样式"/> -->
          </el-form-item>
          <el-form-item label="展示类型：" class="clearfix" :label-width="formLabelWidth">
            <el-switch
              v-model="form.show_price"
              active-color="#13ce66"
              inactive-color="#bbb"
              active-value="1"
              inactive-value="2">
            </el-switch>
            <span style="position:relative;left:10px;top:2px">市场价</span>
          </el-form-item>
          <el-form-item label="展示预览：" class="clearfix" :label-width="formLabelWidth">
            <div class="yulan">
              <div class="tabNav">
                <div class="navs clearfix">
                  <div class="blockBox">
                    <div class="nabBox">
                      <!--  -->
                      <div class="content lt" v-for="(item , index) in zu_copy_list" :key="index" :class="btnNavType1 == index ? 'active':''" @click="clic1(item,index)">{{item.name}}</div>
                    </div>
                  </div>
                </div>
                <div class="commList clearfix" v-if="goodsList1.length == 0">
                  <div class="text">
                    此分类暂无商品，请前往分组设置添加
                  </div>
                </div>
                <div class="commList clearfix" v-else-if="goodsList1.length > 0 && form.mould_type == 1">
                  
                  <div class="content active" v-for="(item , index) in goodsList1" :key="index">
                    <div class="img lt">
                      <el-image
                        :src="item.image"
                        :preview-src-list="[item.image]"
                        fit="cover">
                      </el-image>
                    </div>
                    <div class="lt tet">
                      <span class="shen2">
                        {{item.name}}
                      </span>
                      <div class="price">
                        <span class="span1">
                          ￥
                        </span>
                        <span class="span2">
                          {{item.prime_cost_price}}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="commList clearfix" v-else-if="(goodsList1.length > 0 && form.mould_type == 2) || (goodsList1.length > 0 && form.mould_type == '')">
                  
                  <div class="content" v-for="(item , index) in goodsList1" :key="index">
                    <el-image
                        :src="item.image"
                        :preview-src-list="[item.image]"
                        fit="cover">
                    </el-image>
                    <span class="shen2">
                      {{item.name}}
                    </span>
                    <div class="price">
                      <span class="span1">
                        ￥
                      </span>
                      <!--  -->
                      <!--  -->
                      <span class="span2">
                        {{item.prime_cost_price}}
                      </span>
                    </div>
                  </div>
                </div>
                <!--  -->
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="opening_change_ifShow = false" style="margin-right:20px;">取 消</el-button>
          <div v-if="zu_type == 1" style="display: inline-block">
            <el-button type="success" @click="submit_saveChanges_level"
              >增加</el-button
            >
          </div>

          <div v-else-if="zu_type == 2" style="display: inline-block">
            <el-button type="warning" @click="submit_saveChanges_level"
              >修改</el-button
            >
          </div>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { banner_list, upload_img,store_sort,
category_list,
category_add,
cate_group_list,
cate_group_add,
category_update,
category_del,
basics_update,
prouct_list,
basics_info,
categroup_list,
category_info, } from "../../utils/axios";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      groupList:[],
      group_obj:{},
      groupListNew:[],
      group_ifShow:false,
      opening_ifShow:false,
      opening_type:1,
      input2:"",
      fors:{
        img_url:'',
        live_name:"",
      },
      levelList: [],
      goodsList1:[],
      goodsList:[],
      extendList: [],
      extendList1: [],
      opening_change_ifShow:false,
      zu_type:1,
      type: 1,
      store: {
        store_name: "",
        store_sign: "",
        img_url: "",
        color: "",
      },
      form: {
        sort: "",
        show_price: 2,
        mould_type: "",
        category_id: "",
      },
      formLabelWidth: "85px",
      formLabelWidth1: "120px",
      stores: {
        store_name: "",
        store_sign: "",
        img_url: "",
        color: "",
      },
      cate_index:0,
      cate_small:0,
      navList:["首页","全部宝贝","宝贝分类","联系客服"],
      zu_list:[],
      zu_copy_list:[],
      multipleSelection:[],
      multipleSelection1:[],
      value: { diagram: "" },
      navType:0,
      btnNavType1:0,
      btnNavType:0,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
      //你现在还年轻，看到的机会少，
      other_img_upload_err: false,
      other_img_upload_err1:false,
      edit:{},
      cate_list:[],
      cate_lists:[],
    };
  },
  watch:{
    "opening_change_ifShow":{
      handler:function(news,old){
        // 
        if(!news){
          this.form = {
            sort: "",
            show_price: 2,
            mould_type: "",
            category_id: "",
          }
          this.get_la_list()
          this.zu_copy_list = JSON.parse(JSON.stringify(this.zu_list))
        }
      }
    },
    
    "form.category_id":{
      handler:function(news,olds){
        console.log("来了，老弟")
        console.log(news)
        console.log(this.zu_copy_list)
        this.groupListNew.forEach((item,index) => {
          console.log(item)
          if(item.id == news){
            if(this.zu_type == 2){

            }else{
              this.zu_copy_list.push({
                name:item.name,
                category_id:news
              })
            }
            
          }
        })
        console.log("老弟来了")
        console.log(this.zu_copy_list)
      }
    }
  },
  //
  created() {
    this.banner();
    this.get_agent_list()
    this.basics()
    this.get_la_list()
    this.cate_group()
  },
  methods: {
    save1(){
      console.log("修改")
      let data = []
      this.cate_lists.forEach(item => {
        var arr = []
        item.category_list.forEach(ite => {
          arr.push({
            category_id:ite.category_id
          })
        })
        var obj = {
          name:item.name,
          category_list:arr
        }
        data.push(obj)
      })
      data = JSON.stringify(data)
      cate_group_add({
        param_data:data,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.$message({
              message: "修改成功",
              type: "success",
          });
          this.cate_group()
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
    add_small_tag(item,index){
      this.cate_lists[index].category_list.push({
        name:"选择展示分组",
        id:999
      })
    },
    //
    groupAdd(){
      console.log("加辣")
      if(this.multipleSelection1.length == 0){
          this.$message({
            showClose: true,
            message: "请选择要添加的数据",
            type: "error",
          });
          return
      }
      this.multipleSelection1.forEach(item => {
        item.category_id = item.id
      })
      console.log(this.multipleSelection1)
      console.log(this.group_obj)
      this.cate_lists.forEach(item => {
        if(item.category_id == this.group_obj.category_id){
          this.multipleSelection1.forEach(ite => {
            item.category_list.push(ite)
          })
          let num = 0
          item.category_list.forEach((ite,ind) => {
            if(ite.name == '选择展示分组'){
              num ++
            }
          })
          for(let i = 0 ; i < num ; i++){
            item.category_list.forEach((ite,ind) => {
              if(ite.name == '选择展示分组'){
                item.category_list.splice(ind,1)
              }
            })
          }
          console.log(item.category_list)
        }
      })
      this.group_ifShow = false
    },
    iconEdit(obj1){
      this.group_obj = obj1
      let obj = obj1.category_list
      console.log("iconEdit")
      console.log(obj)
      this.group_ifShow = true
      
      this.groupList = JSON.parse(JSON.stringify(this.groupListNew))
      this.groupList.forEach((item,index) => {
        if(item.state == 2){
          this.groupList.splice(index,1)
        }
      })
      obj.forEach((ite,inde) => {
        this.groupList.forEach((item,index) => {
          if(ite.name == item.name && ite.category_id == item.id){
            if(this.groupList.length == 1){
              this.groupList = []
            }else{
              this.groupList.splice(index,1)
            }
          }
        })
      })
    },
    add_opening(){
      this.opening_ifShow = true
      this.opening_type = 1
    },
    edit_opening(item,index){
      this.fors.live_name = item.name
      this.cate_index = index
      this.opening_ifShow = true
      this.opening_type = 2

    },
    smallShan(index,ind){
      this.cate_index = index
      this.cate_small = ind
      this.cate_lists[this.cate_index].category_list.splice(this.cate_small,1)

    },
    bigShan(index){
      this.cate_index = index
      console.log(index)
      console.log(this.cate_lists)
        this.cate_lists.splice(this.cate_index,1)
     
      
      console.log(this.cate_lists)
    },
    submit_level() {
      //  || this.fors.img_url == ''
      if (this.fors.live_name == "") {
        this.$message({
          message: "请完整填写选项",
          type: "warning",
        });
        return;
      }
      if (this.opening_type == 1) {
          this.cate_lists.push({
            name:this.fors.live_name,
            category_list:[{
              name:"选择展示分组",
              id:999              
            }],
            // image:this.fors.img_url
          })
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.opening_ifShow = false;
      } else {
        //修改
        console.log(this.cate_index)
        console.log(this.fors);
        this.cate_lists[this.cate_index].name = this.fors.live_name
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.opening_ifShow = false;
      }
    },
    typeCl(type){
      this.type = type
      if(type == 1){
        this.navType = 0
      }else{
        this.navType = 2
      }
      
    },
    close(){
      this.$router.go(-1);
      // $router.back(-1)
      console.log("close")
    },
    zu_delete(){
      if(this.multipleSelection.length == 0){
          this.$message({
            showClose: true,
            message: "请选择要删除的数据",
            type: "error",
          });
          return
      }
      //
      let data = ''
      this.$confirm('删除后不可恢复', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          if(this.multipleSelection.length > 1){
              this.multipleSelection.forEach(item => {
                  if(data){
                      data = data + "," +item.id
                  }else{
                      data = item.id
                  }
              })
              // 
          }else{
              data = this.multipleSelection[0].id
          }
          console.log(data)
          category_del({
              ids:data,
          }).then((res) => {
            if (res.data.err_code == 0) {
                this.$message({
                    message: "删除成功",
                    type: "success",
                });
                this.get_agent_list1();
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
      }).catch(() => {
          
      });
    },
    zu_add(){
      this.opening_change_ifShow = true;
      this.zu_type = 1;
      this.get_goods_list1(this.zu_copy_list[0].category_id)
      // this.form.mould_type = 2
    },
    
    zu_edit(){
      if(this.multipleSelection.length == 0){
        this.$message({
          showClose: true,
          message: "请选择要编辑的数据",
          type: "error",
        });
        
        return
      }
      let edit = this.multipleSelection[0]
      this.edit = JSON.parse(JSON.stringify(edit))
      if(this.multipleSelection.length > 1){
        this.$confirm('检测到选中两条数据，默认修改第一次选中数据', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(edit.category_id == 0){
            this.$message({
              showClose: true,
              message: "此条数据是系统默认不可修改",
              type: "error",
            });
            return
          }
          console.log(edit)
          
          category_info({
            id:this.edit.id
          })
          .then((res) => {
            if (res.data.err_code == 0) {
              this.get_la_list(1)
              this.form = {
                sort: res.data.err_msg.info.sort,
                show_price: res.data.err_msg.info.show_price,
                mould_type: res.data.err_msg.info.mould_type,
                category_id: res.data.err_msg.info.category_id,
              }
              this.opening_change_ifShow = true;
              console.log(this.zu_copy_list[0])
              this.get_goods_list1(this.zu_copy_list[0].category_id)
              // 
              this.zu_type = 2;
            } else {
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: "error",
              });
            }
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });

        }).catch(() => {
          // 
        });
      }else{
        if(edit.category_id == 0){
            this.$message({
              showClose: true,
              message: "此条数据是系统默认不可修改",
              type: "error",
            });
            return
          }
        console.log(edit)
        
          
        category_info({
          id:this.edit.id
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.get_la_list(1)
            this.form = {
              sort: res.data.err_msg.info.sort,
              show_price: res.data.err_msg.info.show_price,
              mould_type: res.data.err_msg.info.mould_type,
              category_id: res.data.err_msg.info.category_id,
            }
            this.opening_change_ifShow = true;
            console.log(this.zu_copy_list[0])
            this.get_goods_list1(this.zu_copy_list[0].category_id)
            // 
            this.zu_type = 2;
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
      }
    },
    drag_add(e) {
      console.log(e);
    },
    drag_end(e) {
      console.log(e.newIndex);
      console.log(e.oldIndex);
      let arr = this.extendList;
      if (e.oldIndex > e.newIndex) {
        arr.splice(e.newIndex,0,arr[e.oldIndex]);
          arr.splice(e.oldIndex+1,1)
      } else {
        arr.splice(e.newIndex+1,0,arr[e.oldIndex]);
          arr.splice(e.oldIndex,1)
      }
      console.log(arr);
      // this.extendList = arr;
      console.log(this.extendList);
      
      let data = []
      this.extendList.forEach((item,index) => {
        if(item.tag != 10000){
          data.push({
            id:item.id,
            // sort:index+1
          })
        }
      })
      console.log(data)
      data.forEach((item,index) => {
        item.sort = index+1
      })
      data = JSON.stringify(data)
      console.log(data)
      console.log(this.extendList)
      // return
      store_sort({
        json:data
      })
        .then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "排序成功",
              type: "success",
            });
            this.banner()
          } else {
            this.loading = false;
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    //上传图片
    img_upload1: function (item) {
      console.log(item);
      let that = this;
      if (this.other_img_upload_err1 == false) {
        let fd = new FormData();
        fd.append("file", item.file);
        console.log(fd.get("file"));
        upload_img(fd)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.fors.img_url = res.data.err_msg.url;
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

    //上传图片之前
    img_beforeUpload1(file) {
      console.log(file);
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/JPEG" &&
        file.type != "image/JPG" &&
        file.type != "image/PNG" &&
        file.type != "image/GIF"
      ) {
        this.$message.error("请上传图片格式!");
        this.other_img_upload_err1 = true;
      } else if (file.size / 1024 / 1024 > 200) {
        this.$message.error("图片大小不能超过 200MB!");
        this.other_img_upload_err1 = true;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    //

    clic(item,index){
      console.log(item)
      this.btnNavType = index
      this.get_goods_list(item.category_id)
    },
    clic1(item,index){
      console.log(item)
      this.btnNavType1 = index
      this.get_goods_list1(item.category_id)
    },
    //
    submit_saveChanges_level() {
      if (this.form.sort == "" || this.form.category_id == "" || this.form.mould_type == "") {
        this.$message({
          message: "请完整填写选项",
          type: "warning",
        });
        return;
      }
      //
      if (this.zu_type == 1) {
        //增加
        console.log(this.form);
        category_add(
          this.form
        ).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "增加成功",
              type: "success",
            });
            this.opening_change_ifShow = false;
            this.get_agent_list1();
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        });
      } else {
        //修改
        this.form.id = this.edit.id
        console.log(this.form);
        category_update(
          this.form
        ).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.opening_change_ifShow = false;
            this.get_agent_list1();
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
    //获取营销分类商品列表
    get_goods_list(market_id) {
      this.goodsList = []
      let that = this;
      let request_form = {
        page: 1,
        page_size: 4,
        category_id: market_id,
      };

      prouct_list(request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            that.goodsList = res.data.err_msg.list;
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
    //获取营销分类商品列表
    get_goods_list1(market_id) {
      this.goodsList1 = []
      let that = this;
      let request_form = {
        page: 1,
        page_size: 4,
        category_id: market_id,
      };

      prouct_list(request_form)
        .then((res) => {
          console.log(res)
          if (res.data.err_code == 0) {
            if(res.data.err_msg.list.length > 2){
              that.goodsList1 = res.data.err_msg.list.slice(0,2)
            }
            console.log(that.goodsList1)
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
    banner() {
      this.extendList = []
      this.extendList1 = []
      banner_list({
        page: 1,
        page_size: 10,
        state: 1,
      })
        .then((res) => {
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((element, index) => {
              element.start_time = this.commonJs.timestampToTime(
                element.start_time
              );
              element.end_time = this.commonJs.timestampToTime(
                element.end_time
              );
              let state = element.state;
              let last = parseInt(this.commonJs.dataTime(element.end_time));
              if (last != "NaN") {
                let news = Date.parse(new Date()) / 1000;
                if (news > last) {
                  if (state == 1) {
                    element.state = 3;
                  } else if (state == 2) {
                    element.state = 4;
                  }
                } else {
                    this.extendList1.push(element);
                    this.extendList.push(element);
                }
              }
            });
            if (this.extendList.length == 1) {
              this.extendList.push({ tag: 10000 });
              this.extendList.push({ tag: 10000 });
            } else if (this.extendList.length == 2) {
              this.extendList.push({ tag: 10000 });
            } else if (this.extendList.length == 0) {
              this.extendList.push({ tag: 10000 });
              this.extendList.push({ tag: 10000 });
              this.extendList.push({ tag: 10000 });
            }
            console.log(this.extendList);
          } else {
            this.loading = false;
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    cate_group(){
      let that = this
      
      cate_group_list(
      ).then((res) => {
        if (res.data.err_code == 0) {
          this.cate_list = JSON.parse(JSON.stringify(res.data.err_msg.list))
          this.cate_lists = JSON.parse(JSON.stringify(res.data.err_msg.list))
        } else {
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
    //加载下拉分组数据
    get_la_list(index) {
      let that = this
      this.levelList = []
      categroup_list({
        page: 1,
        page_size: 20,
      }).then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach((item, index) => {
            item.create_time = this.commonJs.timestampToTime(
              item.create_time
            );
            var blean = true
            
            this.zu_list.forEach(ite => {
              if(item.name == ite.name && item.id == ite.category_id){
                blean = false
              }
            })
            if(blean){
              var obj = {
                value:item.id,
                label:item.name
              }
              // 
              this.levelList.push(obj)
            }
            
          });
          if(index == 1){
            console.log(this.edit)
            console.log(this.levelList)
            this.levelList.push({
              value:this.edit.category_id,
              label:this.edit.name
            })
          }
          this.groupListNew = res.data.err_msg.list;
          console.log(this.groupListNew)
        } else {
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
    //加载第一页
    get_agent_list() {
      category_list()
        .then((res) => {
          this.loading = false;
          if (res.data.err_code == 0) {
            this.zu_list = res.data.err_msg.list;
            this.zu_copy_list = JSON.parse(JSON.stringify(this.zu_list))
            if(res.data.err_msg.list.length>0){
              this.get_goods_list(res.data.err_msg.list[0].category_id)
            }
            
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
    //加载第一页
    get_agent_list1() {
      category_list()
        .then((res) => {
          this.loading = false;
          if (res.data.err_code == 0) {
            this.zu_list = res.data.err_msg.list;
            this.zu_copy_list = JSON.parse(JSON.stringify(this.zu_list))
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
    
    //上传图片
    img_upload1: function (item) {
      if (this.other_img_upload_err == false) {
        let fd = new FormData();
        fd.append("file", item.file);
        upload_img(fd)
          .then((res) => {
            if (res.data.err_code == 0) {
              this.store.img_url = res.data.err_msg.url;
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
      }
    },

    //上传图片之前
    img_beforeUpload1(file) {
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/JPEG" &&
        file.type != "image/JPG" &&
        file.type != "image/PNG" &&
        file.type != "image/GIF"
      ) {
        this.$message.error("请上传图片格式!");
        this.other_img_upload_err = true;
      } else if (file.size / 1024 / 1024 > 200) {
        this.$message.error("图片大小不能超过 200MB!");
        this.other_img_upload_err = true;
      }
    },
    basics(){
      basics_info(

      ).then((res) => {
          this.loading = false;
          if (res.data.err_code == 0) {
            this.stores = {
              store_name:res.data.err_msg.info.name,
              store_sign:res.data.err_msg.info.intro,
              img_url:res.data.err_msg.info.logo,
              color:res.data.err_msg.info.blendent
            }
            this.store = {
              store_name:res.data.err_msg.info.name,
              store_sign:res.data.err_msg.info.intro,
              img_url:res.data.err_msg.info.logo,
              color:res.data.err_msg.info.blendent
            }
            
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
    
    //
    save(){
      if (
        this.store.store_name == "" ||
        this.store.store_sign == "" ||
        this.store.img_url == "" ||
        this.store.color == ""
      ) {
        this.$message({
          message: "请完整填写内容",
          type: "warning",
        });
        return;
      }
      let data = {
        name:this.store.store_name,
        logo:this.store.img_url,
        intro:this.store.store_sign,
        blendent:this.store.color,
      }
      console.log(data)
      basics_update(
        data
      ).then((res) => {
          if (res.data.err_code == 0) {
            this.basics()
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    }
  },
};
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.content.a{
  .bottom{
    padding: 20px 10px!important;
    .conn{
      .box1{
        padding:3px 10px;
      }
    }
  }
  .bottoms.active{
    .box1{
      padding:3px 20px;
    }
  }
}

.conn{
  border: 1px solid #ef912c;
  position: relative;
  border-radius: 10px;
  padding: 10px 20px 50px;
  margin-top: 20px;
  background: #fff;
  
  .tops{
    .lt{
      font-size: 16px;
      color: #ef912c;
      font-weight: bold;
    }
    .rt{
      color: #ef912c;
    }
  }
  .bottoms{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .box1{
      margin-top: 10px;
      border: 1px solid #a1a1a1;
      border-radius: 10px;
      padding: 3px 20px;
      margin-right: 10px;
      .span1{
        
        
      }
    }
  }
  .bottomNum{
    font-size: 15px;
    position: absolute;
    width: 100%;
    text-align: right;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #bbb;
    color: #888888;
    padding-right: 10px;
    bottom: 0;
    left: 0;
  }
}
.iphoneRight {
  min-height: 919px;
  .bottom{
    .conn{
      width:375px;
      float: left;
      margin-right: 35px;
      position: relative;
      min-height: 200px;
      // width: 563px;
      // margin-right: 50px;
      .tops{
        .lt{
          
        }
        .rt{
          
        }
      }
      .bottoms{
        
        .box1{
          margin-top: 20px;
          position: relative;
          .span1{
            
          }
          .i1{
            color: #f2840e;
            margin-left: 10px;
            cursor:pointer;
          }
          .i2{
            position: absolute;
            cursor: pointer;
            color: #e13030;
            top: -15px;
            right: -20px;
            font-size: 20px;
          }
          
        }
        .box2{
          padding: 3px 0 3px 10px;
          margin-right: 10px;
          margin-top: 20px;
          .i4{
            color: #f2840e;
            font-size: 20px;
            cursor:pointer;
          }
        }
      }
      .i3{
        position: absolute;
        cursor: pointer;
        color: #e13030;
        top: -30px;
        right: -35px;
        font-size: 35px;
      }
    }
    // .conn:nth-of-type(3n){
    //   margin-right: 0;
    // }
  }
}
.page {
  .nav {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: center;
    span {
      border: 2px solid #bbb;
      padding: 10px 20px;
      color: #111;
      display: block;
      background: #fff;
      cursor: pointer;
    }
    span.active {
      color: #fff;
      border-color: #ec8211;
      background: #ec8211;
    }
    span.span1 {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    span.span2 {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .navBox {
    border-top: 4px solid #bbb;
    .iphone {
      width: 400px;
      min-height: calc(100vh - 160px);
      height: 100%;
      
      .box {
        .bg{
          background: #efefef;
          .text{
            text-align: center;
            padding: 20px 0;
            color: #aaa;
          }
        }
        .padd{
          padding: 0 10px;
          margin-top: 10px;
          min-height: 713px;
        }
        padding: 30px 20px;
        .top {
          height: 80px;
          padding: 10px;
          background: #ff4040;
          .img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #fff;
            margin-right: 10px;
          }
        }
        .banner{
          padding: 15px 15px 10px;
          border: 1px solid #000;
          border-radius: 5px;
          background: #fff;
        }
        
        

        .bottomNav{
          border-top: 2px solid #cfcfcf;
          background: #dedede;
          margin-top: 20px;
          padding: 10px 20px;
          .content{
            padding: 1px 7px 3px;
            border-radius: 20px;
            margin-right: 13px;
            cursor: pointer;
          }
          .content.active{
            background: #f4673c;
            color: #fff;
          }
          .content:last-child{
            margin-right: 0;
          }
        }
      }
    }
    .iphoneRight {
      border-left: 4px solid #bbb;
      padding: 20px 20px;
      width: calc(100% - 400px);
      .content {
        margin-top: 20px;
        border: 4px solid #bbb;
        border-radius: 10px;
        .topHead {
          padding: 10px 30px;
          border-bottom: 1px solid #bbb;
          s {
            background: #ee8f29;
            width: 5px;
            height: 25px;
            margin-right: 10px;
          }
          span {
            font-size: 20px;
            line-height: 28px;
            color: #ee8f29;
          }
        }
        .bottom {
          padding: 20px 50px;
          .cont {
            margin-right: 40px;
            max-width: 400px;
            float: left;
            min-width: 200px;
            span {
              margin-right: 5px;
            }
            span.active {
              margin-top: 6px;
            }
          }
        }
        .bottom.bann {
          padding: 20px 0 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 450px;
          .banner {
            height: 370px;
            float: left;
            width: 30%;
            border: 1px solid #bbb;
            border-radius: 5px;
            margin-right:40px;
            .topHead {
              padding: 5px 20px;
              border-bottom: 1px solid #bbb;
              s {
                background: #ee8f29;
                width: 3px;
                height: 20px;
                margin-top: 5px;
                margin-right: 10px;
              }
              span {
                font-size: 14px;
                line-height: 28px;
                color: #ee8f29;
              }
            }
            .box {
              padding: 20px;
              .comm {
                height: 290px;
                border: 1px solid #000;
                border-radius: 10px;
                padding: 20px 15px;
                font-size: 14px;
                .info {
                  margin: 15px 0;
                  span {
                    line-height: 19px;
                  }
                }
                .info.active {
                  width: 50%;
                  float: left;
                }
                .left {
                  float: left;
                  padding-right: 9px;
                  width: 75px;
                  text-align: right;
                }
                .right {
                  width: calc(100% - 75px);
                  float: left;
                }
              }
            }
          }
          .banner:last-child{
            margin-right: 0px;
          }
        }
      }
    }
  }
}
/deep/ .el-button.is-circle {
  padding: 7px 8px !important;
}
/deep/ .btn .el-icon-edit {
  font-size: 17px;
  cursor: pointer;
}
.dianRight{
  margin-top: 10px;
  .lt{
    font-size: 13px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
  .rt{
    .span1{
      width:50px;
      height: 30px;
      line-height: 30px;
      background: #5044ed;
      color: #fff;
      border-radius: 30px;
      display: block;
      text-align: center;
      cursor: pointer;
    }
    .span2{
      display: block;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      color: #111;
    }
  }
}
/deep/ .el-carousel__container{
  height: 130px;
}
/deep/ .el-carousel__indicator.el-carousel__indicator--horizontal.is-active button{
  background: #000;
}
/deep/ .el-carousel__indicator.el-carousel__indicator--horizontal button{
  background: rgba(0,0,0,.7);
}
/deep/ .el-carousel__indicators--horizontal{
  bottom: -10px;
}
/deep/ .el-carousel--horizontal{
  overflow-y: hidden;
}
/deep/ .el-carousel__button{
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

/deep/ .el-dialog {
  box-shadow: 0 0px 0px #ccc;
  -webkit-box-shadow: 0 0px 0px #ccc;
}
/deep/ .el-dialog {
  width: 80%;
}
/deep/ .block .el-dialog {
  width: 30%;
}
/deep/ .el-form-item__label {
  text-align-last: justify;
}
/deep/ .el-dialog__body {
  padding: 30px 50px;
}
/deep/ .teshu .el-dialog {
  width: 30%;
}
/deep/ .el-dialog__body {
  padding: 0 0;
  .el-form{
    padding: 50px;
  }
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
.remarks_box .info {
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  background: #ee8f29;
}
.tabNav{
  margin-top: 20px;
  .navs{
    background: #fff;
    padding: 10px 20px 9px;
    border:1px solid #f4673c;
    border-radius: 10px;
    .blockBox{
      width: 100%;
      overflow-x: auto;
    }
    .blockBox::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 100%; /*高宽分别对应横竖滚动条的尺寸*/
      height: 10px;
    }
    .blockBox::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 15px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #89989f;
    }
    .blockBox::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 15px;
    }
    .nabBox{
      height: 27px;
      width: max-content;
      .content{
        cursor:pointer;
        padding: 1px 10px 3px;
        border-radius: 20px;
        margin-right: 10px;
      }
      .content.active{
        background: #f4673c;
        color: #fff;
      }
      .content:last-child{
        margin-right: 0;
      }
    }
    //
  }
  .commList{
      padding: 10px;
      margin-top: 10px;
      background: #fff;
      border-radius: 10px;
      min-height: 468px;
      position: relative;
      .text{
        padding: 20px 0;
        text-align: center;
        color: #bbb;
        position: absolute;
        bottom: 50%;
        left: 0;
        width: 100%;
      }
      .content{
        float: left;
        width: 150px;
        overflow: hidden;
        margin-right: 20px;
        margin-top: 10px;
        /deep/ .el-image{
          width: 100%;
        }

        /deep/ .el-image__inner{
          width: 100%;
          height: 150px;
        }
        .shen2{
          height: 46px;

        }
        .price{
          color:#f4673c;
          .span1{
            font-size: 13px;
          }
          .span2{
            font-size: 15px;
          }
        }
      }
      .content:nth-of-type(2n){
        margin-right: 0;
      }
      .content.active{
        width: 100%;
        .img{
          width: 110px;
          /deep/ .el-image{
            width: 100%;
            height: 110px;
          }
        }
        /deep/ .el-image__inner{
          width: 100%;
          height: 110px;
        }
        .tet{
          width: calc(100% - 110px);
          padding-left: 20px;
          height: 110px;
          
        }
      }
  }
}
.yulan .commList{
  min-height: 190px;
}
/deep/ .yulan .el-form-item__content{
  line-height: 30px;
}
/deep/ .yulan .content{
  line-height: 23px;
}
/deep/ .el-dialog__body .el-form{
  padding: 20px 50px 0;
}
/deep/ .el-table .has-gutter th, /deep/.el-table .has-gutter tr{
  background: #d9d9d9;
}
</style>
