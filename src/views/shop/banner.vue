<template>
  <div class="page">
    <div class="pageItem" style="margin-top: 20px">
      <div class="topHead clearfix">
        <s class="lt"></s>
        <span class="lt">轮播图管理</span>
      </div>
      <div class="textItem">
        <div class="clearfix" style="margin-bottom: 20px">
            <el-select v-model="seachVale" class="lt" placeholder="请选择展示状态">
                <el-option
                v-for="item in goods_status_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
          <el-button type="danger" class="rt" @click="shan('1')">删除</el-button>
          <el-button
            type="warning"
            class="rt"
            style="margin-right: 10px"
            @click="edits"
            >编辑</el-button
          >
          <!-- sy，纵欲报应:阳痿，早泄，神经衰弱，脑力下降，骨密度低，脸上爆痘，长相猥琐没精神， -->
          <el-button
            type="success"
            class="rt"
            style="margin-right: 10px"
            @click="shan('3')"
            >展示</el-button
          >
          <el-button
            type="info"
            class="rt"
            style="margin-right: 10px"
            @click="shan('2')"
            >下架</el-button
          >
          <el-button
            type="primary"
            class="rt"
            style="margin-right: 10px"
            @click="adds"
            >添加</el-button
          >

          <el-button
            type="primary"
            class="rt"
            style="margin-right: 10px"
            @click="pick_seach"
            >搜索</el-button
          >
          <el-button
            class="rt"
            style="margin-right: 10px"
            @click="fn1(1)"
            >刷新</el-button
          >
        </div>
        <el-row :gutter="20" class="goodsindex-list">
          <el-col :span="24">
            <el-table
              v-loading="loading"
              ref="multipleTable"
              :data="extendList"
              border
              
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="序号" type="index" width="80" align="center">
              </el-table-column>
              <el-table-column label="开始时间/结束时间" align="center" width="300">
                <template slot-scope="scope">
                  <div v-if="scope.row.is_always == 1">长期</div>
                  <div v-else><div>始:{{scope.row.start_time}}</div>末:{{scope.row.end_time}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.is_always == 1">长期</div>
                  <div v-else>{{scope.row.end_time}}</div>
                </template>
              </el-table-column> -->
              <el-table-column prop="relation_id" label="关联ID" align="center">
              </el-table-column>
              <el-table-column label="关联类型" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.type == 1">商品</div>
                  <div v-else-if="scope.row.type == 2">商品分组</div>
                  <div v-else>未知</div>
                </template>
              </el-table-column>
              <el-table-column label="样式" width="270">
                <template slot-scope="scope">
                    <div class="clearfix" v-if="scope.row.tag == 1">
                      <div class="lt" style="width:80px;height:80px">
                          <el-image
                              style="width:80px;height:80px"
                              :src="scope.row.image"
                              :preview-src-list="[scope.row.image]"
                              fit="cover">
                          </el-image>
                          <!-- <img :src="scope.row.product.image" alt="" style="width:80px;height:80px"> -->
                      </div>
                      <div class="lt" style="width:150px;height:80px;padding-left:10px;">
                        <!--  -->
                          <p class="shen2" style="height:32px">{{scope.row.product.name}}{{scope.row.product.name}}{{scope.row.product.name}}</p>
                          <p style="margin:8px 0 6px;" class="shen2 red">￥{{scope.row.product.price}}</p>
                          <p class="shen1">推荐理由:{{scope.row.recommended_reason?scope.row.recommended_reason:"无"}}</p>
                      </div>
                    </div>
                    <div class="clearfix" v-else-if="scope.row.tag == 2">
                      <el-image
                          style="width:250px;height:80px"
                          :src="scope.row.image"
                          :preview-src-list="[scope.row.image]"
                          fit="cover">
                      </el-image>
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.banner_pos == 1">首页</div>
                  <div v-else-if="scope.row.banner_pos == 2">个人中心</div>
                  <div v-else>未知</div>
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.state == 1" style="color:#2942ee;font-weight:bold">展示中</div>
                  <div v-else-if="scope.row.state == 2" style="color:#fdac61;font-weight:bold">未展示</div>
                  <div v-else-if="scope.row.state == 3" style="color:#ff0000;font-weight:bold">展示中（已到期）</div>
                  <div v-else-if="scope.row.state == 4" style="color:#ff0000;font-weight:bold">未展示（已到期）</div>
                  <div v-else>未知</div>
                </template>
              </el-table-column>
              <el-table-column label="展示位置" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.sort == 1">位置一</div>
                  <div v-else-if="scope.row.sort == 2">位置二</div>
                  <div v-else-if="scope.row.sort == 3">位置三</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <el-row :gutter="20" class="goodsindex-list" style="margin-top: 20px">
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

        <!-- 增加/编辑问答 -->
        <el-dialog
          width="40%"
          class="remarks_box add"
          :visible.sync="add_tan"
          append-to-body
        >
          <div class="info" v-if="addType == 1">增加轮播</div>
          <div class="info" v-else-if="addType == 2">编辑轮播</div>
          <div style="padding: 0 0 30px">
            <div class="blockBox divs">
              <el-form :model="add_wen" class="form por clearfix">
                <el-form-item
                  label="位置:"
                  class="yiban lt"
                  :label-width="formLabelWidth1"
                >
                
                  <el-select v-model="add_wen.banner_pos" class="lt" placeholder="请选择展示位置" style="width:80%">
                    <el-option
                    v-for="item in banner_pos_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="模板:"
                  class="yiban lt"
                  :label-width="formLabelWidth1"
                >
                  <el-select v-model="add_wen.moban" class="lt" placeholder="请选择展示模板" style="width:80%">
                    <el-option
                    v-for="item in moban_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="关联类型:"
                  class="yiban lt"
                  :label-width="formLabelWidth1"
                >
                  <el-select v-model="add_wen.type" class="lt" placeholder="请选择关联类型" style="width:80%">
                    <el-option
                    v-for="item in type_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="关联ID:"
                  class="yiban lt clearfix"
                  :label-width="formLabelWidth1"
                >
                  
                  <el-input
                    type="text"
                    class="lt"
                    style="width:62%"
                    placeholder="请输入关联ID"
                    @blur="seach_id(add_wen.relation_id)"
                    v-model="add_wen.relation_id"
                  ></el-input>
                  <el-button
                    type="success"
                    style="margin-top:6px"
                    class="rt"
                    @click="examine('1')"
                    v-if="add_wen.type == 1 || add_wen.type == ''"
                    >选 择</el-button
                  >
                  <el-button
                    type="success"
                    style="margin-top:6px"
                    class="rt"
                    @click="examine('2')"
                    v-else-if="add_wen.type == 2"
                    >选 择</el-button
                  >
                </el-form-item>

                <el-form-item
                  label="时间:"
                  class="lt"
                  style="width:70%"
                  :label-width="formLabelWidth1"
                >
                  <el-date-picker
                    :clearable = false
                    v-model="add_wen.time_value"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                
                <div class="lt" style="width:30%;margin:10px 0;height:40px;padding-top:10px;padding-left:10px;box-sizing:border-box;">
                    <el-checkbox-group v-model="is_always">
                      <el-checkbox label="长期"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <el-form-item
                  v-if="add_wen.moban == '2'"
                  label="图片:"
                  class="lt clearfix"
                  style="width:100%"
                  :label-width="formLabelWidth1"
                >
                  <el-upload
                    class="upload-demo lt"
                    action=""
                    :http-request="img_upload1"
                    :before-upload="img_beforeUpload1"
                    :show-file-list="false"
                    list-type="picture"
                    style="margin-bottom: 20px"
                  >
                
                    <button class="bigButton lt">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="cat_pic"
                        fit="cover"
                      >
                        <div
                          slot="error"
                          class="image-slot"
                          style="
                            width: 98px;
                            height: 98px;
                            text-align: center;
                          "
                        >
                          <i
                            class="el-icon-circle-plus"
                            style="font-size: 25px; margin-top: 32px"
                          ></i>
                        </div>
                      </el-image>
                    </button>
                    
                  </el-upload>
                  <div class="lt" style="padding-top:60px;color:#999;padding-left:10px;">
                      请上传制作好的轮播图片
                    </div>
                  
                </el-form-item>
                <div v-else-if="add_wen.moban == '1'" class="lt blockDiv">
                  <el-form-item
                    label="推荐商品:"
                    :label-width="formLabelWidth1"
                  >
                    <span class="shen1" style="display:block;margin-top:12px">{{orderInfo.name?orderInfo.name:'无'}}</span>
                  </el-form-item>
                  <div class="clearfix">
                    <el-form-item
                      label="价格显示:"
                      class="lt yiban"
                      :label-width="formLabelWidth1"
                    >
                      <span><span style="color:#f73636;">￥</span>{{orderInfo.price?orderInfo.price:'0.00'}}</span>
                    </el-form-item>
                    <el-form-item
                      label="商品ID:"
                      class="lt yiban"
                      :label-width="formLabelWidth1"
                    >
                      <span>{{orderInfo.product_id?orderInfo.product_id:'0'}}</span>
                    </el-form-item>
                  </div>
                  <el-form-item
                    style="width:90%;"
                      label="推荐理由:"
                      :label-width="formLabelWidth1"
                    >
                      <el-input
                        type="text"
                        placeholder="请输入推荐理由"
                        v-model="add_wen.recommended_reason"
                        style="margin-bottom:10px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                    style="width:90%"
                      label="推荐图片:"
                      :label-width="formLabelWidth1"
                    >
                      <el-upload
                        class="upload-demo lt"
                        action=""
                        :http-request="img_upload"
                        :before-upload="img_beforeUpload"
                        :show-file-list="false"
                        list-type="picture"
                        style="margin-bottom: 20px"
                      >
                      
                        <button class="bigButton lt">
                          <el-image
                            style="width: 100px; height: 100px"
                            :src="tuijian_pic"
                            fit="cover"
                          >
                            <div
                              slot="error"
                              class="image-slot"
                              style="
                                width: 98px;
                                height: 98px;
                                text-align: center;
                              "
                            >
                              <i
                                class="el-icon-circle-plus"
                                style="font-size: 25px; margin-top: 32px"
                              ></i>
                            </div>
                          </el-image>
                        </button>
                        
                      </el-upload>
                      <div class="lt" style="padding-top:60px;color:#999;padding-left:10px;">
                          默认主图不满意时可替换
                        </div>
                    </el-form-item>
                </div>
              </el-form>
            </div>
            <div
              slot="footer"
              class="dialog-footer clearfix"
              style="padding: 10px 40px 10px 30px; margin-top: 20px"
            >
              <el-button
                type="success"
                class="rt"
                @click="addWen"
                v-if="addType == 1"
                style="margin-left: 15px"
                >增 加</el-button
              >
              <el-button
                type="success"
                class="rt"
                @click="editWen"
                 v-else-if="addType == 2"
                style="margin-left: 15px"
                >修 改</el-button
              >
              <el-button type="danger" class="rt" @click="add_tan = false"
                >取 消</el-button
              >
            </div>
          </div>
        </el-dialog>
        <!-- 反复确认框。烦啊 -->
        <div class="boxs" v-show="kuang_show">
          <div class="content" @click="kuang_show = false">
            <div class="kuang" @click.stop="kuang_show = true">
              <img src="../../assets/image/gantan.png" alt="" />
              <div class="text" v-if="type == 1">是否确认删除？</div>
              <div class="text" v-else-if="type == 2">是否确认下架？</div>
              <div class="text" v-else-if="type == 3">是否确认展示？</div>
              <el-button
                type="danger"
                @click.stop="kuang_show = false"
                style="margin-bottom: 10px; margin-right: 36px"
              >
                取消
              </el-button>
              <el-button type="success" @click.stop="sure_address"> 确认 </el-button>
            </div>
          </div>
        </div>

        

      </div>
      <!-- 添加商品弹窗 -->
    <el-dialog  class="remarks_box add" :visible.sync="goods_examine_change_ifShow">
      <div class="info">添加商品</div>
      <div v-show="goodsIndex == 1">
        <div class="seach_copy clearfix" style="padding:20px 30px 0 10px;margin-bottom:0;">
          <div class="seach_select lt clearfix">
            <el-input
              v-model="product_name"
              @keyup.enter.native="pick_seach2"
              class="lt"
              style="width:200px;margin-right:20px;"
              placeholder="商品ID/商品名称/店铺名称"
            ></el-input>
            <!-- <el-cascader
              placeholder="请选择商品分类"
              class="lt"
              style="line-height: 0"
              v-model="classification_value2"
              :options="classification_list"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              @change="pick_cate_change2"
            ></el-cascader> -->
          </div>
          <div class="button_type rt">
            <el-button type="primary" @click="pick_seach2">搜索</el-button>

            <el-button size="mini" type="primary" @click="add_pro('1')"
              >添加商品</el-button
            >
            <!--  -->
          </div>
        </div>
        <div class="box" style="padding:20px 30px 0 10px">
          <el-row :gutter="20" class="goodsindex-list" style="margin:0;">
            <el-col :span="24" style="padding:0">
              <!-- @row-click="rowClick" -->
              <el-table
                :data="newGoodsList"
                ref="interfaceTable"
                
                border
                height="500"
                style="width: 100%"
                @selection-change="handleSelectionChange2"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="序号" type="index" width="100">
                </el-table-column>
                <el-table-column prop="product_id" label="商品ID">
                </el-table-column>
                <el-table-column label="商品分类/运营分类">
                  <template slot-scope="scope">
                    <!--  || scope.row.fname == '悦淘专区' -->
                    <!-- <div v-if="scope.row.is_colour == 1" style="color: #ee8f29"> -->
                      {{ scope.row.fid_name }}
                      {{ scope.row.id_name ? ">>" + scope.row.id_name : "" }}
                      {{ scope.row.tid_name ? ">>" + scope.row.tid_name : "" }}
                    <!-- </div> -->
                    <!-- <div v-else-if="scope.row.is_colour == 2">
                      {{ scope.row.fid_name }}
                      {{ scope.row.id_name ? ">>" + scope.row.id_name : "" }}
                      {{ scope.row.tid_name ? ">>" + scope.row.tid_name : "" }}
                    </div> -->
                  </template>
                </el-table-column>
                <el-table-column prop="product_name" label="商品名称" width="200">
                </el-table-column>
                <el-table-column label="商品图片" width="180">
                  <template slot-scope="scope">
                    <el-image
                      :src="scope.row.image"
                      style="width: 80px; height: 80px"
                      :preview-src-list="[scope.row.image]"
                      fit="cover"
                    ></el-image>
                  </template>
                </el-table-column>

                <el-table-column prop="prime_cost_price" label="商品售价">
                </el-table-column>
                <el-table-column prop="quantity" label="商品库存">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>

        <!-- 分页 -->
        <el-row :gutter="20" class="goodsindex-list" style="margin:0;padding:20px 20px 20px">
          <el-col :span="24" class="goodsindex-page-box">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="queryInfo2.page"
              :page-sizes="[5, 10, 20, 30, 50]"
              :page-size="queryInfo2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInfo2.total"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <div v-show="goodsIndex == 2">
        <div class="seach_copy clearfix" style="padding:20px 30px 0 10px;margin-bottom:0;">
          <div class="seach_select lt clearfix">
            <el-input
              v-model="keywords"
              @keyup.enter.native="pick_seach1"
              class="lt"
              
              clearable
              style="width:200px;margin-right:20px;"
              placeholder="请输入分组ID/分组名称"
            ></el-input>
            <!-- <el-input
              v-model="keywords"
              placeholder="请输入分组ID/分组名称"
              clearable
            ></el-input> -->
          </div>
          <div class="button_type rt">
            <el-button type="primary" @click="pick_seach1">搜索</el-button>
            <el-button size="mini" type="primary" @click="add_pro('2')"
              >添加分组</el-button
            >
            <!--  -->
          </div>
        </div>
        <div class="box" style="padding:20px 30px 0 10px">
          <el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24">
              <el-table
                :data="newGoodsList1"
                border
                ref="interfaceTable1"
                height="550"
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
                        style="width:80px;height:80px"
                        :src="scope.row.image"
                        :preview-src-list="[scope.row.image]"
                        fit="cover">
                    </el-image>
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
          <!-- 分页 -->
          <el-row :gutter="20" class="goodsindex-list" style="margin:0;padding:20px 20px 20px">
            <el-col :span="24" class="goodsindex-page-box">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="queryInfo1.page"
                :page-sizes="[5, 10, 20, 30, 50]"
                :page-size="queryInfo1.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryInfo1.total"
              >
              </el-pagination>
            </el-col>
          </el-row>
        </div>
        
      </div>
      
    </el-dialog>
    </div>
    
  </div>
</template>
<script>
import { banner_list , upload_img ,goods_info_product,banner_add,banner_update,is_state,banner_del,goods_list,goods_get_cate,categroup_list} from "../../utils/axios";
export default {
  data() {
    return {
      classification_list: [], //商品分类列表
      classification_value2: [],
      product_name:"",
      queryInfo: {
        page: 1,
        pageSize: 10,
        total: 1,
      },
      newGoodsList1:[],
      queryInfo1: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      queryInfo2: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      addType:0,
      type:0,
      kuang_show: false,
      formLabelWidth1: "100px",
      formLabelWidth2: "80px",
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
      classification_list1:[],
      goodsIndex:0,
      add_wen:{
        banner_pos:"",
        moban:"1",
        type:"",
        relation_id:"",
        time_value:"",
        
        recommended_reason:"",
        tuijian_pic:"",
      },
      tuijian_pic:"",
      cat_pic:"",
      is_always:[],
      bannerInfo:{},
      goods_status_list : [//商品状态
        {
          id: '1',
          name: '展示'
        }, {
          id: '2',
          name: '不展示'
        }
      ],
      edit_wen: {
        content: "",
      },
      
      edit_tan: false,
      add_tan: false,
      fn1: this.commonJs.Debounce(this.get_agent_list),
      extendList: [],
      seachVale: "",
      loading: false,
      multipleSelection: [],
      other_img_upload_err:false,
      other_img_upload_err1:false,
      banner_pos_list:[
        {
          name:"首页",
          id:"1"
        },
        {
          name:"个人中心",
          id:"2"
        },
      ],
      keywords:"",
      moban_list:[
        {
          name:"模板轮播",
          id:"1"
        },
        {
          name:"图片轮播",
          id:"2"
        },
      ],
      type_list:[
        {
          name:"商品",
          id:"1"
        }
      ],
      orderInfo:{

      },
      newGoodsList: [],
      orderListInfo:{

      },
      goods_examine_change_ifShow:false
    };
  },
 
  created() {
    this.get_agent_list(); //获取推广列表
    this.get_cate1(); //获取商品三级分类
    // this.goodsIndex = 2
    // this.goods_examine_change_ifShow = true;
    // this.get_agent_list2()
  },
  watch:{
    "add_wen.moban":{
      handler:function(news,olds){
        if(news){
          if(news == 1){
            this.type_list = [
              {
                name:"商品",
                id:"1"
              }
            ]
          }else if(news == 2){
            this.type_list = [
              {
                name:"商品",
                id:"1"
              },
              {
                name:"商品分组",
                id:"2"
              },
            ]
          }
          this.add_wen.type=""
          this.add_wen.relation_id = ""
        }
      }
    }
  },
  methods: {
    //搜索
    seach_id (product_id) {
      console.log()
      if(product_id){
        goods_info_product( { 
          product_id : product_id
        }).then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.orderInfo = res.data.err_msg.list.product_info
            
            this.tuijian_pic = res.data.err_msg.list.product_info.image
          } else {
            this.$message({
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
    },
    //上传图片 推荐图片
    img_upload: function (item) {
      console.log(item);
      if (this.other_img_upload_err == false) {
        let fd = new FormData();
        fd.append("file", item.file);
        console.log(fd.get("file"));
        upload_img(fd)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              console.log(res.data.err_msg.url)
              
                this.tuijian_pic = res.data.err_msg.url
              
              
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
    //上传图片 图片
    img_upload1: function (item) {
      console.log(item);
      if (this.other_img_upload_err1 == false) {
        let fd = new FormData();
        fd.append("file", item.file);
        console.log(fd.get("file"));
        upload_img(fd)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              // cat_pic//
              this.cat_pic = res.data.err_msg.url;
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
    img_beforeUpload(file) {
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
        this.other_img_upload_err1 = true;
      } else if (file.size / 1024 / 1024 > 200) {
        this.$message.error("图片大小不能超过 200MB!");
        this.other_img_upload_err1 = true;
      }
    },
    
    addWen() {
      if (this.add_wen.banner_pos == "") {
        this.$message({
          showClose: true,
          message: "位置必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.type == "") {
        this.$message({
          showClose: true,
          message: "关联类型必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.relation_id == "") {
        this.$message({
          showClose: true,
          message: "关联ID必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.time_value == "" && this.is_always.length == 0) {
        console.log(this.add_wen.time_value)
        this.$message({
          showClose: true,
          message: "活动时间必填",
          type: "error",
        });
        return;
      }
      if(this.add_wen.moban == '2'){
        if (this.cat_pic == "") {
          this.$message({
            showClose: true,
            message: "轮播图片必填",
            type: "error",
          });
          return;
        }
      }else{
        if (this.tuijian_pic == "") {
          this.$message({
            showClose: true,
            message: "推荐图片必填",
            type: "error",
          });
          return;
        }
        
      }
      var time1 = "";
      var time2 = "";
      if (this.add_wen.time_value != "") {
        time1 = this.commonJs.dataTime(this.add_wen.time_value[0]);
        time2 = this.commonJs.dataTime(this.add_wen.time_value[1]);
      }
      let data = {
        banner_pos:this.add_wen.banner_pos,
        tag:this.add_wen.moban,
        type:this.add_wen.type,
        relation_id:this.add_wen.relation_id,
      }
      if(this.is_always.length > 0){
        data.is_always = 1
      }else{
        data.is_always = 2
        data.start_time = time1
        data.end_time = time2
      }
      if(this.add_wen.moban == 1){
        data.image = this.tuijian_pic
        data.recommended_reason = this.add_wen.recommended_reason
      }else if(this.add_wen.moban == 2){
        data.image = this.cat_pic
      }
      banner_add(
        data
      ).then((res) => {
          if (res.data.err_code == 0) {
            this.get_agent_list()
            this.add_tan = false
            this.$message({
              message: "增加成功",
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
    },
    editWen() {
      if (this.add_wen.banner_pos == "") {
        this.$message({
          showClose: true,
          message: "位置必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.type == "") {
        this.$message({
          showClose: true,
          message: "关联类型必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.relation_id == "") {
        this.$message({
          showClose: true,
          message: "关联ID必填",
          type: "error",
        });
        return;
      }
      if (this.add_wen.time_value == "" && this.is_always.length == 0) {
        console.log(this.add_wen.time_value)
        this.$message({
          showClose: true,
          message: "活动时间必填",
          type: "error",
        });
        return;
      }
      if(this.add_wen.moban == '2'){
        if (this.cat_pic == "") {
          this.$message({
            showClose: true,
            message: "轮播图片必填",
            type: "error",
          });
          return;
        }
      }else{
        if (this.tuijian_pic == "") {
          this.$message({
            showClose: true,
            message: "推荐图片必填",
            type: "error",
          });
          return;
        }
        
      }
      console.log(this.add_wen);
      var time1 = "";
      var time2 = "";
      if (this.add_wen.time_value != "") {
        console.log(this.add_wen.time_value)
        time1 = this.commonJs.dataTime(this.add_wen.time_value[0]);
        time2 = this.commonJs.dataTime(this.add_wen.time_value[1]);
      }
      let data = {
        id:this.orderListInfo.id,
        banner_pos:this.add_wen.banner_pos,
        tag:this.add_wen.moban,
        type:this.add_wen.type,
        relation_id:this.add_wen.relation_id,
      }
      if(this.is_always.length > 0){
        data.is_always = 1
      }else{
        data.is_always = 2
        data.start_time = time1
        data.end_time = time2
      }
      if(this.add_wen.moban == 1){
        data.image = this.tuijian_pic
        data.recommended_reason = this.add_wen.recommended_reason
      }else if(this.add_wen.moban == 2){
        data.image = this.cat_pic
      }
      banner_update(
        data
      ).then((res) => {
          if (res.data.err_code == 0) {
            this.get_agent_list()
            this.add_tan = false
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
      
    },
    adds() {
      if(this.addType == 2){
        this.add_wen = {
          banner_pos:"",
          moban:"1",
          type:"",
          relation_id:"",
          time_value:"",
          cat_pic:"",
          recommended_reason:"",
          tuijian_pic:"",
        }
        this.is_always = []
      }
      this.addType = 1
      this.add_tan = true;
    },
    edits() {
      if(this.multipleSelection.length == 0){
        this.$message({
          showClose: true,
          message: "请选择要编辑的数据",
          type: "error",
        });
        return
      }
      this.orderListInfo = JSON.parse(JSON.stringify(this.multipleSelection[0]))
      console.log(this.orderListInfo)
      if(this.multipleSelection.length > 1){
          this.$confirm('检测到选中两条数据，默认选择第一次选中数据', '是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.add_wen = {
                banner_pos:this.orderListInfo.banner_pos,
                moban:this.orderListInfo.tag,
                type:this.orderListInfo.type,
                relation_id:this.orderListInfo.relation_id,
                recommended_reason:this.orderListInfo.recommended_reason,
                time_value:"",
              }
              
              if(this.add_wen.moban == 1){
                this.tuijian_pic = this.orderListInfo.image
              }else{
                this.cat_pic = this.orderListInfo.image
              }
              if(this.orderListInfo.is_always == 2){
                this.is_always = []
                this.add_wen.time_value = [new Date(this.orderListInfo.start_time),new Date(this.orderListInfo.end_time)]
              }else{
                this.is_always = ["长期"]
              }
              goods_info_product( { 
                product_id : this.orderListInfo.relation_id
              }).then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  this.orderInfo = res.data.err_msg.list.product_info
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.err_msg,
                    type: 'error'
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
              console.log(this.add_wen)
              this.addType = 2
              this.add_tan = true;
          }).catch(() => {

          });
      }else{
        this.add_wen = {
          banner_pos:this.orderListInfo.banner_pos,
          moban:this.orderListInfo.tag,
          type:this.orderListInfo.type,
          relation_id:this.orderListInfo.relation_id,
          recommended_reason:this.orderListInfo.recommended_reason,
          time_value:"",
        }
        
        if(this.add_wen.moban == 1){
          this.tuijian_pic = this.orderListInfo.image
        }else{
          this.cat_pic = this.orderListInfo.image
        }
        if(this.orderListInfo.is_always == 2){
          this.is_always = []
          this.add_wen.time_value = [new Date(this.orderListInfo.start_time),new Date(this.orderListInfo.end_time)]
        }else{
          this.is_always = ["长期"]
        }
        goods_info_product( { 
          product_id : this.orderListInfo.relation_id
        }).then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.orderInfo = res.data.err_msg.list.product_info
          } else {
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: 'error'
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(this.add_wen)
        this.addType = 2
        this.add_tan = true;
      }
      
    },
    examine(index) {
      this.goodsIndex = index
      this.goods_examine_change_ifShow = true;
      if(index == 1){
        this.goodList();
      }else if(index == 2){
        this.get_agent_list2()
      }
      
    },
    goodList(tex) {
      goods_list({
        page: 1,
        page_size: 20,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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
    //分页
    get_shop_list_page2(page, number) {
      goods_list({
        page: page,
        page_size: number,
        keyword: this.product_name, //模糊搜索id或商品名称
        fid: this.classification_value2[0], //一级分类id
        sid: this.classification_value2[1], //二级分类id
        tid: this.classification_value2[2], //三级分类id
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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

    //每页显示条数改变
    handleSizeChange2(val) {
      this.get_shop_list_page2(1, val);
    },

    //当前页
    handleCurrentChange2(val) {
      this.get_shop_list_page2(val, this.pageSize);
    },

    //搜索
    pick_seach2() {
      let that = this;
      //  && this.classification_value2.length == 0
      if (this.product_name == "") {
        this.$message({
          message: "请选择任意一种搜索类型",
          type: "warning",
        });
        return;
      }
      goods_list({
        page: 1,
        page_size: 20,
        keyword: this.product_name, //模糊搜索id或商品名称
        fid: this.classification_value2[0], //一级分类id
        sid: this.classification_value2[1], //二级分类id
        tid: this.classification_value2[2], //三级分类id
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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
    // newGoodsList1
    rowClick1(row, column, event) {
      // interfaceTable1
      this.toggleSelection1([this.newGoodsList1[row.index]]);
    },
    toggleSelection1(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.interfaceTable1.toggleRowSelection(row);
        });
      } else {
        this.$refs.interfaceTable1.clearSelection();
      }
    },
    rowClick(row, column, event) {
      this.toggleSelection([this.newGoodsList[row.index]]);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.interfaceTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.interfaceTable.clearSelection();
      }
    },
    handleSelectionChange1(val) {
      this.multipleSelection2 = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    add_pro() {
      if (this.multipleSelection2.length == 0) {
        this.$message({
          message: "请选择一种商品",
          type: "warning",
        });
        return;
      }
      if (this.multipleSelection2.length > 1) {
        this.$message({
          message: "最多选择一个",
          type: "warning",
        });
        return;
      }
      console.log(this.multipleSelection2)

      if(this.goodsIndex == 1){
        this.seach_id(this.multipleSelection2[0].product_id)
        this.add_wen.relation_id = this.multipleSelection2[0].product_id
      }else{
        this.add_wen.relation_id = this.multipleSelection2[0].id
      }
      
      this.goods_examine_change_ifShow = false
    },
    // 获取商品三级分类
    get_cate1() {
      let that = this;
      goods_get_cate().then((res) => {
        if (res.data.err_code == 0) {
          if (res.data.err_msg.first.length > 0) {
            if (res.data.err_msg.second.length > 0) {
              //存在二级分类

              if (res.data.err_msg.third.length > 0) {
                //存在三级分类

                res.data.err_msg.first.forEach((element_first, first_index) => {
                  that.second_cate = [];
                  that.classification_list1.push({
                    value: element_first.cat_id,
                    label: element_first.cat_name,
                    cat_id: element_first.cat_id,
                  });

                  res.data.err_msg.second.forEach((element_second) => {
                    that.three_cate = [];
                    if (element_first.cat_id == element_second.cat_fid) {
                      //一级分类的ID等于二级分类的父级ID
                      that.second_cate.push({
                        value: element_second.cat_id,
                        label: element_second.cat_name,
                        cat_fid: element_second.cat_fid,
                        cat_id: element_second.cat_id,
                      });
                      that.classification_list1[first_index].children =
                        that.second_cate;

                      res.data.err_msg.third.forEach((element_third) => {
                        if (element_second.cat_id == element_third.cat_fid) {
                          that.three_cate.push({
                            value: element_third.cat_id,
                            label: element_third.cat_name,
                            cat_fid: element_third.cat_fid,
                            cat_id: element_third.cat_id,
                          });
                          let index =
                            that.classification_list1[first_index].children
                              .length - 1;
                          that.classification_list1[first_index].children[
                            index
                          ].children = that.three_cate;
                        }
                      });
                    }
                  });
                });
              } else {
                //不存在三级分类
                res.data.err_msg.first.forEach((element_first, first_index) => {
                  that.second_cate = [];
                  that.classification_list1.push({
                    value: element_first.cat_id,
                    label: element_first.cat_name,
                    cat_id: element_first.cat_id,
                  });
                  res.data.err_msg.second.forEach((element_second) => {
                    if (element_first.cat_id == element_second.cat_fid) {
                      that.second_cate.push({
                        value: element_second.cat_id,
                        label: element_second.cat_name,
                        cat_fid: element_second.cat_fid,
                        cat_id: element_second.cat_id,
                      });
                      that.classification_list1[first_index].children =
                        that.second_cate;
                    }
                  });
                });
              }
            } else {
              res.data.err_msg.first.forEach((element_first) => {
                that.classification_list1.push({
                  value: element_first.cat_id,
                  label: element_first.cat_name,
                });
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
    
    //商品三级分类选择
    pick_cate_change2(value) {
      this.classification_value2 = value;
    },
    zhanshi(){
        if (this.multipleSelection.length == 0) {
            this.$message({
            showClose: true,
            message: "请选择要展示的数据",
            type: "error",
            });
            return;
        }
        let data = "";
        if (this.multipleSelection.length > 1) {
            this.multipleSelection.forEach((item) => {
            if (data) {
                data = data + "," + item.id;
            } else {
                data = item.id;
            }
            });
        } else {
            data = this.multipleSelection[0].id;
        }
          del_questions({
            ids: data,
          })
            .then((res) => {
              if (res.data.err_code == 0) {
                this.$message({
                  message: "展示成功",
                  type: "success",
                });
                this.get_shop_list_page(
                  this.queryInfo.page,
                  this.queryInfo.pageSize
                );
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
    sure_address() {
      let data = "";
      if (this.multipleSelection.length > 1) {
        this.multipleSelection.forEach((item) => {
          if (data) {
            data = data + "," + item.id;
          } else {
            data = item.id;
          }
        });
      } else {
        data = this.multipleSelection[0].id;
      }
      //is_state
      // banner_del
      if(this.type == 1){
        banner_del({
          ids: data,
        })
        .then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.kuang_show = false;
            this.get_shop_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
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
      }else if(this.type == 2){
        is_state({
          ids: data,
          state: 2
        })
        .then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "下架成功",
              type: "success",
            });
            this.kuang_show = false;
            this.get_shop_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
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
      }else if(this.type == 3){
        is_state({
          ids: data,
          state: 1
        })
        .then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "展示成功",
              type: "success",
            });
            this.kuang_show = false;
            this.get_shop_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
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
    shan(index) {
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要操作的数据",
          type: "error",
        });
        return;
      }
      this.type = index
      this.kuang_show = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取推广列表
    get_agent_list(index) {
      this.seachVale = "";

      this.loading = true;
      let request_form = {
        page: 1,
        page_size: 10,
        // state:1,
      };
      banner_list(
        request_form
      ).then((res) => {
        if (res.data.err_code == 0) {
          this.loading = false;
          res.data.err_msg.list.forEach((element,index) => {
            element.start_time = this.commonJs.timestampToTime(
              element.start_time
            );
            element.end_time = this.commonJs.timestampToTime(
              element.end_time
            );
            let state = element.state
            let last = parseInt(this.commonJs.dataTime(element.end_time))
            if(last != 'NaN'){
              let news = Date.parse(new Date())/1000
              if(news > last){
                if(state == 1){
                  element.state = 3
                }else if(state == 2){
                  element.state = 4
                }
              }
            }
          });
          this.extendList = res.data.err_msg.list;
          this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
          this.queryInfo.page = parseInt(res.data.err_msg.page);
          this.queryInfo.total = parseInt(res.data.err_msg.total_number);
          this.pageSize = res.data.err_msg.page_size;
          if (index == 1) {
            this.$message({
              message: "刷新成功",
              type: "success",
            });
          }
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
    //分页
    get_shop_list_page(page, number) {
      this.loading = true;
      banner_list({
        page: page,
        page_size: number,
        state: this.seachVale,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.loading = false;
            res.data.err_msg.list.forEach((element) => {
              element.start_time = this.commonJs.timestampToTime(
                element.start_time
              );
              element.end_time = this.commonJs.timestampToTime(
                element.end_time
              );
              let state = element.state
              let last = parseInt(this.commonJs.dataTime(element.end_time))
              if(last != 'NaN'){
                let news = Date.parse(new Date())/1000
                if(news > last){
                  if(state == 1){
                    element.state = 3
                  }else if(state == 2){
                    element.state = 4
                  }
                }
              }
            });
            this.extendList = res.data.err_msg.list;
            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
            this.pageSize = res.data.err_msg.page_size;
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
    
    //每页显示条数改变
    handleSizeChange(val) {
      console.log(this.queryInfo);
      this.get_shop_list_page(1, val);
    },
    //当前页
    handleCurrentChange(val) {
      console.log(val);
      this.get_shop_list_page(val, this.pageSize);
    },
    //搜索
    pick_seach() {
      if (this.seachVale == "") {
        this.$message({
          message: "请填写搜索内容",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      banner_list({
        page: 1,
        page_size: this.pageSize,
        state: this.seachVale,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.loading = false;
            res.data.err_msg.list.forEach((element) => {
              element.start_time = this.commonJs.timestampToTime(
                element.start_time
              );
              element.end_time = this.commonJs.timestampToTime(
                element.end_time
              );
              let state = element.state
              let last = parseInt(this.commonJs.dataTime(element.end_time))
              if(last != 'NaN'){
                let news = Date.parse(new Date())/1000
                if(news > last){
                  if(state == 1){
                    element.state = 3
                  }else if(state == 2){
                    element.state = 4
                  }
                }
              }
            });
            this.newGoodsList1 = res.data.err_msg.list;
            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
            this.pageSize = res.data.err_msg.page_size;
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
          console.log(error);
          this.loading = false;
        });
    },


    //每页显示条数改变
    handleSizeChange1(val) {
      console.log(val);
      this.get_shop_list_page1(1, val);
    },
    //当前页
    handleCurrentChange1(val) {
      this.get_shop_list_page1(val, this.pageSize);
    },
    //分页

    get_shop_list_page1(page, number) {
      let that = this;

      categroup_list({
        page: page,
        page_size: number,
        keywords: that.keywords,
      })
        .then((res) => {
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.create_time = this.commonJs.timestampToTime(
                item.create_time
              );
            });
            this.newGoodsList1 = res.data.err_msg.list;

            this.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo1.page = parseInt(res.data.err_msg.page);
            this.queryInfo1.total = parseInt(res.data.err_msg.total_number);
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
            // 
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.interfaceTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.interfaceTable.clearSelection();
      }
    },
    //搜索
    pick_seach1() {
      let that = this;
      if (that.keywords == "") {
        that.$message({
          message: "请填写搜索内容",
          type: "warning",
        });
        return;
      }
      categroup_list({
        page: 1,
        page_size: 20,
        keywords: that.keywords,
      })
      .then((res) => {
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach((item, index) => {
            item.create_time = this.commonJs.timestampToTime(
              item.create_time
            );
          });
          this.newGoodsList1 = res.data.err_msg.list;
          this.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
          this.queryInfo1.page = parseInt(res.data.err_msg.page);
          this.queryInfo1.total = parseInt(res.data.err_msg.total_number);
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
    //加载第一页
    get_agent_list2(index) {
      this.keywords = "";
      let that = this;
      let request_form = {
        page: 1,
        page_size: 20,
      };
      categroup_list(request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.create_time = this.commonJs.timestampToTime(
                item.create_time
              );
            });
            this.newGoodsList1 = res.data.err_msg.list;
            this.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo1.page = parseInt(res.data.err_msg.page);
            this.queryInfo1.total = parseInt(res.data.err_msg.total_number);
            if (index == 1) {
              that.O_message_c = {};
              that.$message({
                message: "刷新成功",
                type: "success",
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

  },
};
</script>
<style scoped lang="less">
.page {
  position: relative;
  padding: 10px;
  .pageItem {
    border-radius: 10px;
    background: #fff;
    .topHead {
      padding: 10px 30px;
      border-bottom: 1px solid #bbb;
      //
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
    .textItem {
      padding: 15px 30px;
      .content {
        border: 1px solid #bbb;
        .head {
          padding: 5px 50px;
          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          span {
            line-height: 30px;
            height: 30px;
            color: #f76336;
          }
        }
        .item {
          width: 50%;

          .itemDiv {
            cursor: pointer;
            height: 40px;
            border-top: 1px solid #bbb;
            line-height: 40px;
          }
        }
        .item.lt {
          .itemDiv {
            padding-left: 50px;
          }
        }
        .item.rt {
          width: calc(50% - 1px);
          border-left: 1px solid #bbb;
          .itemDiv {
            padding-left: 15px;
            .kuai {
              margin-top: 8px;
              float: left;
              margin-right: 5px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 1px solid #000;
              span {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: 1px solid #000;
                margin: 4px;
              }
            }
            .span {
              float: left;
            }
            .kuai.active {
              border-color: #ee8f29;
              background: #ee8f29;
              span {
                border-color: #ee8f29;
              }
            }
          }
        }
      }
      .form {
        .span {
          color: #bbb;
          font-size: 13px;
          position: absolute;
          bottom: -37px;
          left: 0;
        }
        .span1 {
          color: #bbb;
          font-size: 13px;
          display: block;
          margin-bottom: 10px;
        }
      }
    }
    /deep/ .textItem .el-input {
      input {
        max-width: 900px;
      }
    }
  }
}
/deep/ .upload-demo.lt.active {
  .el-upload {
    text-align: left;
  }
}

/deep/ .pageItem.first .el-input input {
  height: 40px !important;
  line-height: 40px !important;
}
/deep/ .el-form-item {
  margin-bottom: 45px;
}
/deep/ .el-form-item.active {
  margin-bottom: 0;
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
.info {
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  background: #ee8f29;
}
.boxs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  .content {
    border: none !important;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    .kuang {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      width: 200px;
      margin-top: -330px;
      margin-left: -100px;
      background: #fff;
      border: 5px solid #ee8f29 !important;
      border-radius: 30px;
      padding: 35px 35px;
      img {
        margin: 0 auto 30px;
        width: 50px;
      }
      .text {
        margin-bottom: 40px;
      }
    }
  }
}
/deep/ .el-table .has-gutter tr,
/deep/ .el-table .has-gutter th {
  background: #d7d5d5 !important;
}
/deep/ .el-date-editor--datetimerange.el-input__inner{
  width: 100%;
}
.remarks_box {
  .el-form-item {
    margin: 0;
  }
  h2 {
    margin-bottom: 15px;
    margin-top: 0;
    font-size: 18px;
  }
}
.remarks_box.add {
  .form {
    margin-top: 10px;
    border-radius: 10px;
    padding: 15px 30px;
    .el-form-item {
      margin: 10px 0;
    }
    .formI {
      right: 20px;
      bottom: 20px;
      color: red;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .blockBox {
    // max-height: 453px;
    // overflow-y: auto;
  }
  .divs {
    
  }
}
/deep/ .shen2,/deep/ .shen1{
  line-height: 16px;
  font-weight: bold;
}
/deep/ .shen2.red{
  color: #f8616a;
}
/deep/ .el-form-item__label{
  text-align: right;
}
/deep/ .bigButton{
  width: 100px;
  height: 100px;
  border: none;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  background: #e3e3e3;
  padding: 0;
  el-image,.image-slot{
    background: #e3e3e3;
  }
  i{
    color: #f49c3e;
  }
}
/deep/ .blockDiv{
  border:2px solid #bbb;
  border-radius: 10px;
  width: 70%;
  margin-left: 15%;
  padding: 10px 10px 20px;
  .el-form-item{
    margin: 0!important;
  }
}
/deep/ .goodsindex-list {
  margin-top: 0;
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
.info {
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  background: #ee8f29;
}
</style>