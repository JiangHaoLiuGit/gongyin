<template>
  <div class="page">
    <div v-if="listType == 1">
      <div class="topHead clearfix">
        <s class="lt"></s>
        <span class="lt">商品分组</span>
      </div>
      <div class="seach">
        <div class="seach_copy">
          <div class="seach_select">
            <el-input
              v-model="keywords"
              placeholder="请输入分组ID/分组名称"
              clearable
            ></el-input>
          </div>
          <div class="button_type">
            
            <el-button type="primary" @click="pick_seach1">搜索</el-button>
            <el-button type="primary" @click="pick_add">增加</el-button>
            <el-button
              type="primary"
              @click="pick_delete"
              v-show="multipleSelection.length > 0"
              >删除</el-button
            >
            <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)"
              >刷新</el-button
            >
          </div>
        </div>
      </div>
      <!-- 列表开始 -->
      <el-row :gutter="20" class="goodsindex-list" v-if="listType == 1">
        <el-col :span="24">
          <el-table
            v-loading="loading"
            :data="extendList"
            border
            :height="height"
            style="width: 100%"
            @selection-change="handleSelectionChange"
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
            <el-table-column label="图标" width="120" v-if="listType == 1">
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
            <!-- <el-table-column label="排序" width="120">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.sort"
                  @blur="likai1(scope.row)"
                  placeholder="请输入序号"
                ></el-input>
              </template>
            </el-table-column> -->
            <el-table-column label="状态" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.state == 1"> 启用 </span>
                <span v-else-if="scope.row.state == 2"> 禁用 </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="400">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-show="scope.row.state == 1"
                  type="danger"
                  @click="jinyong(scope.row, '1')"
                  >禁用</el-button
                >
                <el-button
                  size="mini"
                  v-show="scope.row.state == 2"
                  type="primary"
                  @click="jinyong(scope.row, '2')"
                  >启用</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="deletes(scope.row)"
                  v-if="extendList.length>1"
                  >删除</el-button
                >
                <el-button
                  size="mini"
                  v-show="scope.row.market_type != 1 && scope.row.market_type != 8"
                  type="success"
                  @click="see(scope.row)"
                  >商品列表</el-button
                >
                <el-button
                  size="mini"
                  v-show="listType == 1"
                  type="warning"
                  @click="modify(scope.row)"
                  >修改</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
      <!-- 修改,删除弹窗 -->
      <el-dialog
        width="30%"
        :visible.sync="opening_change_ifShow"
        class="remarks_box add"
      >
      <div class="info" v-if="type == 1">增加分组</div>
      <div class="info" v-else>修改分组</div>
        <!-- <h2 style="margin-top:0;" v-if="type == 1">增加营销分类</h2>
                <h2 style="margin-top:0;" v-else-if="type == 2">修改营销分类</h2> -->
        <el-form :model="form">
          <!-- <div style="position:relative"> -->
          <el-form-item label="分组名称" :label-width="formLabelWidth">
            <el-input
              v-model="form.live_id"
              placeholder="请输入新增分组名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="类型:" :label-width="formLabelWidth">
            <el-select
              v-model="form.level"
              class="el-inpu"
              placeholder="请选择分组类型"
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
          <el-form-item label="配图:" class="clearfix" :label-width="formLabelWidth">
            
            <el-image
              style="width: 100px; height: 100px"
              :src="form.img_url"
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
              <el-button size="small" type="primary" style="margin-top:70px">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="opening_change_ifShow = false">取 消</el-button>
          <div v-if="type == 1" style="display: inline-block">
            <el-button type="success" @click="submit_saveChanges_level"
              >增加</el-button
            >
          </div>

          <div v-else-if="type == 2" style="display: inline-block">
            <el-button type="warning" @click="submit_saveChanges_level"
              >修改</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
    <div v-else-if="listType == 2">
      <!-- <div class="seach">
                <div class="seach_copy">
                    <div class="seach_select"></div>
                    <div class="button_type">
                    
                    <el-button type="primary" icon="el-icon-back" @click="listType = 1"
                        >返回</el-button
                    >
                    </div>
                </div>
            </div> -->
      <div class="topHead clearfix">
        <s class="lt"></s>
        <span class="lt">商品列表</span>
      </div>
      <div class="seach" style="margin-top:20px">
        <span class="seachSpan">
          分组名称:{{seeInfo.name}}
        </span>
        <span class="seachSpan">
           
          使用位置:<span v-for="(item1,index1) in seeInfo.position.category_position" :key="index1">商品分类 >> {{item1}}</span>
            <span>
              <span v-for="(item,index) in seeInfo.position.index_position" :key="index">首页推荐 >> {{item}}</span>
            </span>
        </span>
        <span class="seachSpan">
          商品数量:{{seeInfo.product_num}}
        </span>
      </div>
      <div class="seach_copy">
        <div class="seach_select">
          <el-input
            v-model="seach_value"
            style="margin-left:0;"
            @keyup.enter.native="pick_seach"
            placeholder="商品ID/商品名称"
          ></el-input>
          <el-cascader
            placeholder="筛选平台商品分类"
            style="line-height: 0"
            v-model="classification_value"
            :options="classification_list"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="pick_cate_change"
          ></el-cascader>
          <el-date-picker
            :clearable = false
            v-model="store_name"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-input
            v-model="store_name"
            @keyup.enter.native="pick_seach"
            placeholder="请输入运营商名称"
          ></el-input> -->
          
        </div>
        <div class="button_type">
          <el-button type="primary" @click="pick_seach">搜索</el-button>
          <el-button type="primary" icon="el-icon-back" @click="back"
            >返回</el-button
          >
          <el-button size="mini" type="primary" @click="examine2()"
            >添加商品</el-button
          >
          <el-button
            type="primary"
            @click="pick_delete1"
            v-show="multipleSelection1.length > 0"
            >删除</el-button
          >
          <el-button type="primary" icon="el-icon-refresh" @click="fn2(1)"
            >刷新</el-button
          >
        </div>
      </div>
      <el-row :gutter="20" class="goodsindex-list" v-if="listType == 2">
        <el-col :span="24">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="goodsList"
            border
            :height="height"
            style="width: 100%"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="序号" type="index" width="100">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="200">
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

            <el-table-column prop="prime_cost_price" label="商品售价"> </el-table-column>

            <el-table-column prop="quantity" label="商品库存">
              <template slot-scope="scope">
                <span>{{scope.row.quantity}}</span>
              </template>
            </el-table-column>
            
            <el-table-column prop="fcat_name" label="一级分类名称">
              <template slot-scope="scope">
                <span>{{scope.row.fcat_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cat_name" label="二级分类名称">
              <template slot-scope="scope">
                <span>{{scope.row.cat_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tcat_name" label="三级分类名称">
              <template slot-scope="scope">
                <span>{{scope.row.tcat_name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="排序" width="120">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.sort"
                  @blur="likai(scope.row)"
                  placeholder="请输入序号"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deletes1(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 添加商品弹窗 -->
      <el-dialog  class="remarks_box add" :visible.sync="goods_examine_change_ifShow">
        <div class="info">添加商品</div>

        <div class="seach" style="margin-top:20px;padding-left:20px">
          <span class="seachSpan">
            分组名称:{{seeInfo.name}}
          </span>
          <span class="seachSpan">
            
            使用位置:<span v-for="(item1,index1) in seeInfo.position.category_position" :key="index1">商品分类 >> {{item1}}</span>
              <span>
                <span v-for="(item,index) in seeInfo.position.index_position" :key="index">首页推荐 >> {{item}}</span>
              </span>
          </span>
          <span class="seachSpan">
            商品数量:{{seeInfo.product_num}}
          </span>
        </div>
        <div class="seach_copy" style="padding:20px 30px 0 10px;margin-bottom:0;">
          <div class="seach_select">
            <el-input
              v-model="product_name"
              @keyup.enter.native="pick_seach2"
              placeholder="商品ID/商品名称/店铺名称"
            ></el-input>
            <el-cascader
              placeholder="请选择商品分类"
              style="line-height: 0"
              v-model="classification_value2"
              :options="classification_list"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              @change="pick_cate_change2"
            ></el-cascader>
          </div>
          <div class="button_type">
            <el-button type="primary" @click="pick_seach2">搜索</el-button>

            <el-button size="mini" type="primary" @click="add_pro()"
              >添加商品</el-button
            >
          </div>
        </div>
        <div class="box" style="padding:20px 20px 0">
          <el-row :gutter="20" class="goodsindex-list" style="margin:0;">
            <el-col :span="24" style="padding:0">
              <el-table
                v-loading="loading"
                :data="newGoodsList"
                ref="interfaceTable"
                @row-click="rowClick"
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
        <el-row :gutter="20" class="goodsindex-list" style="margin:0;padding:0 20px 20px">
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
      </el-dialog>

      <!-- 分页 -->
      <el-row :gutter="20" class="goodsindex-list">
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
</template>

<script>
import {
  categroup_list,
  cate_add,
  del_category,
  cate_update,
  prouct_list,
  del_product,
  goods_list,
  product_add,
  set_sort,
  category_sort,
  upload_img,
  goods_get_cate,
  cate_info,
  market_status,
} from "../../utils/axios";
export default {
  data() {
    return {
      
      product_name: "",
      newGoodsList: [],
      multipleSelection2: "",
      multipleSelection3: "",
      classification_list: [], //商品分类列表
      classification_value: [],
      seach_value: "",
      store_name: "",
      opening_change_ifShow: false,
      broadId: "",
      extendList: [], //列表
      goodsList: [], //列表
      fn1: this.commonJs.Debounce(this.get_agent_list),
      fn2: this.commonJs.Debounce(this.get_goods_list),
      queryInfo: {
        page: 1,
        pageSize: 20,
        total: 1,
      },
      pageSize: 20,
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
      level: "",
      levelList: [
        {
          value: "1",
          label: "普通",
        }
      ],
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
      height: "",
      multipleSelection1: "",
      multipleSelection: [],
      form: {
        live_id: "",
        level: "",
        img_url: "",
      },
      formLabelWidth: "80px",
      formLabelWidth1: "120px",
      //申請人姓名
      keywords: "",
      
      listType: 1,
      type: 1,
      loading: false,
      other_img_upload_err: false,
      goods_examine_change_ifShow: false,
      opening_change_ifShow: false,
      multipleSelection2: "",
      product_name: "",
      broad: {
        id: "1",
        market_id: "12",
      },
      classification_value2: [],
      classification_list1: [], //商品分类列表
      market_id: "",
      seeInfo:{
        position:{
          category_position:[],
          index_position:[],
        }
      },
    };
    // seeInfo.position.category_position" :key="index1">商品分类 >> {{item1}}</span>
    //         <span>
    //           <span v-for="(item,index) in seeInfo.position.index_position
  },
  watch: {
    
    opening_change_ifShow: {
      handler(newVal) {
        console.log(newVal);
        if (!newVal) {
          this.form.live_id = "";
          this.form.level = "";
          this.form.img_url = "";
        }
      },
    },
  },
  // 
  created() {
    this.get_agent_list();
    this.get_cate1(); //获取商品三级分类
    this.get_cate(); //获取商品三级分类
    this.height = document.body.clientHeight - 300;
    
    console.log(this.height);
  },
  methods: {
    rowClick(row, column, event) {
      this.toggleSelection([this.newGoodsList[row.index]]);
    },
    likai(row) {
      if (row.sort >= 0) {
        set_sort({
          id: row.id,
          sort: row.sort,
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "排序成功",
              type: "success",
            });
            this.get_shop_list_page1(
              this.queryInfo1.page,
              this.queryInfo1.pageSize
            );
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
    likai1(row) {
      category_sort({
        market_id: row.id,
        sort: row.sort,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.$message({
            message: "排序成功",
            type: "success",
          });
          this.get_shop_list_page(this.queryInfo.page, this.queryInfo.pageSize);
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },

    // this.$message({
    //     message: '停用成功',
    //     type: 'success'
    // });
    //修改
    modify(item) {
      this.opening_change_ifShow = true;
      
      cate_info({
        id: item.id,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.type = 2;
          this.broadId = item.id;
          this.form.live_id = res.data.err_msg.info.name;
          this.form.level = res.data.err_msg.info.type;
          this.form.img_url = res.data.err_msg.info.image;
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
    },
    pick_add(index) {
      this.opening_change_ifShow = true;
      this.type = 1;
    },
    submit_saveChanges_level() {
      if (this.form.live_id == "" || this.form.level == "" || this.form.img_url == '') {
        this.$message({
          message: "请完整填写选项",
          type: "warning",
        });
        return;
      }
      if (this.type == 1) {
        //增加
        cate_add({
          name: this.form.live_id,
          type: this.form.level,
          image: this.form.img_url,
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "增加成功",
              type: "success",
            });
            console.log(this.queryInfo)
            this.get_shop_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
            this.opening_change_ifShow = false;
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
        console.log(this.form);
        cate_update({
          id: this.broadId,
          name: this.form.live_id,
          type:this.form.level,
          image: this.form.img_url,
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // this.get_agent_list();
            this.get_shop_list_page(
              this.queryInfo.page,
              this.queryInfo.pageSize
            );
            this.opening_change_ifShow = false;
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
    //查看
    see(item) {
      console.log(item);
      this.seeInfo = item
      this.market_id = item.id;
      // category_info
      this.listType = 2;

      this.get_goods_list();
    },
    toT(item) {
      //特价页
      this.market_id = item.id;
      this.listType = 3;
      this.get_goods_list1();
    },
    toM(item) {
      //秒杀页
      this.$router.push({ path: "/marketing/spike", query: { id: item.id } });
      console.log(item.id);
    },
    //批量
    pick_delete() {
      if(this.multipleSelection.length == 0){
        this.$message({
            showClose: true,
            message: "请选择数据",
            type: "error",
        });
        return
      }
      this.$confirm("此操作将删除选中的多条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        let str = "";
        this.multipleSelection.forEach((element) => {
          if (str == "") {
            str += element.id;
          } else {
            str += "," + element.id;
          }
        });
        console.log(str);
        del_category({
          market_ids: str,
        }).then((res) => {
          if (res.data.err_code == 0) {
            this.$message({
              message: "批量删除成功",
              type: "success",
            });
            // this.get_agent_list();
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
        });
      })
      .catch(() => {});
    },
    jinyong(row, index) {
      console.log(index);
      let tex = "";
      if (index == 1) {
        tex = "禁用";
      } else if (index == 2) {
        tex = "启用";
      }
      this.$confirm("此操作将切换成" + tex + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          market_status({
            id: row.id,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "成功切换" + tex,
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
          });
        })
        .catch(() => {});
    },
    
    //单个删
    deletes(row) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.id);
          del_category({
            id: row.id,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              // this.get_agent_list();
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
          });
        })
        .catch(() => {});
    },
    //批量
    pick_delete1() {
      this.$confirm("此操作将删除选中的多条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let str = "";
          this.multipleSelection1.forEach((element) => {
            if (str == "") {
              str += element.id;
            } else {
              str += "," + element.id;
            }
          });
          console.log(str);
          del_product({
            market_product_ids: str,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "批量删除成功",
                type: "success",
              });
              this.get_shop_list_page1(
                this.queryInfo1.page,
                this.queryInfo1.pageSize
              );
              
            } else {
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },
    //单个删
    deletes1(row) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.id);
          del_product({
            market_product_ids: row.id,
          }).then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.get_shop_list_page1(
                this.queryInfo1.page,
                this.queryInfo1.pageSize
              );
              
            } else {
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },

    
    handleSelectionChange(val) {
      console.log("之前");
      console.log(this.multipleSelection);
      console.log("以后");
      console.log(val);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      console.log(this.multipleSelection1);
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },

    //每页显示条数改变
    handleSizeChange(val) {
      this.get_shop_list_page(1, val);
    },
    back() {
      this.listType = 1;
      this.goodsList = [];
    },
    //当前页
    handleCurrentChange(val) {
      this.get_shop_list_page(val, this.pageSize);
    },
    //分页

    get_shop_list_page(page, number) {
      let that = this;
      that.loading = true;

      categroup_list({
        page: page,
        page_size: number,
        keywords: that.keywords,
      })
        .then((res) => {
          that.loading = false;
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.create_time = this.commonJs.timestampToTime(
                item.create_time
              );
            });
            this.extendList = res.data.err_msg.list;

            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
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
          that.loading = false;
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
      that.loading = true;
      categroup_list({
        page: 1,
        page_size: 20,
        keywords: that.keywords,
      })
      .then((res) => {
        that.loading = false;
        if (res.data.err_code == 0) {
          res.data.err_msg.list.forEach((item, index) => {
            item.create_time = this.commonJs.timestampToTime(
              item.create_time
            );
          });
          this.extendList = res.data.err_msg.list;
          this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
          this.queryInfo.page = parseInt(res.data.err_msg.page);
          this.queryInfo.total = parseInt(res.data.err_msg.total_number);
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
    get_agent_list(index) {
      this.keywords = "";
      let that = this;
      that.loading = true;
      let request_form = {
        page: 1,
        page_size: 20,
      };
      categroup_list(request_form)
        .then((res) => {
          that.loading = false;
          if (res.data.err_code == 0) {
            res.data.err_msg.list.forEach((item, index) => {
              item.create_time = this.commonJs.timestampToTime(
                item.create_time
              );
            });
            this.extendList = res.data.err_msg.list;
            this.queryInfo.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo.page = parseInt(res.data.err_msg.page);
            this.queryInfo.total = parseInt(res.data.err_msg.total_number);
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
          that.loading = false;
          console.log(error);
        });
    },
    //上传图片
    img_upload1: function (item) {
      console.log(item);
      let that = this;
      if (this.other_img_upload_err == false) {
        let fd = new FormData();
        fd.append("file", item.file);
        console.log(fd.get("file"));
        upload_img(fd)
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              that.form.img_url = res.data.err_msg.url;
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
        this.other_img_upload_err = true;
      } else if (file.size / 1024 / 1024 > 200) {
        this.$message.error("图片大小不能超过 200MB!");
        this.other_img_upload_err = true;
      }
    },
    //获取营销分类商品列表
    get_goods_list(index) {
      let that = this;
      that.classification_value = [];
      this.store_name = "";
      that.seach_value = "";
      that.loading = true;
      let request_form = {
        page: 1,
        page_size: 20,
        category_id: this.market_id,
      };

      prouct_list(request_form)
        .then((res) => {
          if (res.data.err_code == 0) {
            that.loading = false;
            that.goodsList = res.data.err_msg.list;
            that.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo1.page = parseInt(res.data.err_msg.page);
            that.queryInfo1.total = parseInt(res.data.err_msg.total_number);
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

    // 获取商品三级分类
    get_cate() {
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
                  that.classification_list.push({
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
                      that.classification_list[first_index].children =
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
                            that.classification_list[first_index].children
                              .length - 1;
                          that.classification_list[first_index].children[
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
                  that.classification_list.push({
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
                      that.classification_list[first_index].children =
                        that.second_cate;
                    }
                  });
                });
              }
            } else {
              res.data.err_msg.first.forEach((element_first) => {
                that.classification_list.push({
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
    pick_cate_change(value) {
      this.classification_value = value;
      console.log(this.classification_value);
    },

    //分页

    get_shop_list_page1(page, number) {
      let that = this;
      that.loading = true;
      var time1 = "";
      var time2 = "";
      if (this.store_name != "") {
        time1 = this.commonJs.dataTime(this.store_name[0]);
        time2 = this.commonJs.dataTime(this.store_name[1]);
      }
      prouct_list({
        page: page,
        page_size: number,
        category_id: this.market_id,
        seach: this.seach_value, //名称或id搜索
        start_time: time1, 
        end_time: time2, 
        cate_fid: this.classification_value[0], //一级分类id
        cate_id: this.classification_value[1], //二级分类id
        cate_tid: this.classification_value[2], //三级分类id
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            that.goodsList = res.data.err_msg.list;
            that.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo1.page = parseInt(res.data.err_msg.page);
            that.queryInfo1.total = parseInt(res.data.err_msg.total_number);
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
    handleSizeChange1(val) {
      console.log(val);
      this.get_shop_list_page1(1, val);
    },
    //当前页
    handleCurrentChange1(val) {
      this.get_shop_list_page1(val, this.pageSize);
    },

    //搜索
    pick_seach() {
      let that = this;
      if (
        that.seach_value == "" &&
        that.store_name == "" &&
        that.classification_value.length == 0
      ) {
        that.$message({
          message: "请选择任意一种搜索类型",
          type: "warning",
        });
        return;
      }
      var time1 = "";
      var time2 = "";
      if (this.store_name != "") {
        time1 = this.commonJs.dataTime(this.store_name[0]);
        time2 = this.commonJs.dataTime(this.store_name[1]);
      }
      that.loading = true;
      prouct_list({
        page: 1,
        page_size: 20,
        category_id: this.market_id,
        seach: this.seach_value, //名称或id搜索
        start_time: time1, 
        end_time: time2, 
        cate_fid: this.classification_value[0], //一级分类id
        cate_id: this.classification_value[1], //二级分类id
        cate_tid: this.classification_value[2], //三级分类id
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.loading = false;
            that.goodsList = res.data.err_msg.list;
            that.queryInfo1.pageSize = parseInt(res.data.err_msg.page_size);
            that.queryInfo1.page = parseInt(res.data.err_msg.page);
            that.queryInfo1.total = parseInt(res.data.err_msg.total_number);
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

    //添加
    examine2() {
      this.goods_examine_change_ifShow = true;
      this.goodList();
    },
    goodList(tex) {
      this.loading = true;
      goods_list({
        page: 1,
        page_size: 20,
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.loading = false;
            // if(tex == "ses"){
            //   this.goodsList = res.data.err_msg.list
            // }else{
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            // }

            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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
    get_shop_list_page2(page, number) {
      this.loading = true;
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
            this.loading = false;
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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
      if (this.product_name == "" && this.classification_value2.length == 0) {
        this.$message({
          message: "请选择任意一种搜索类型",
          type: "warning",
        });
        return;
      }
      this.loading = true;
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
            this.loading = false;
            res.data.err_msg.list.forEach((item, index) => {
              item.index = index;
            });
            this.newGoodsList = res.data.err_msg.list;
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size);
            this.queryInfo2.page = parseInt(res.data.err_msg.page);
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number);
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
    add_pro() {
      if (this.multipleSelection2.length == 0) {
        this.$message({
          message: "请选择一种商品",
          type: "warning",
        });
        return;
      }
      var str = "";
      this.multipleSelection2.forEach((element) => {
        if (str == "") {
          str += element.product_id;
        } else {
          str += "," + element.product_id;
        }
      });
      product_add({
        product_ids: str,
        category_id: this.market_id,
      }).then((res) => {
        if (res.data.err_code == 0) {
          this.$message({
            message: "批量添加成功",
            type: "success",
          });
          this.goods_examine_change_ifShow = false;
          
          this.get_shop_list_page1(
            this.queryInfo1.page,
            this.queryInfo1.pageSize
          );
        } else {
          this.$message({
            showClose: true,
            message: res.data.err_msg,
            type: "error",
          });
        }
      });
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
    
    
    
  },
};
</script>

<style scoped lang="less">
.divImg {
  width: 150px;
  position: relative;
  .icon {
    position: absolute;
    top: 0;
    right: -25px;
    z-index: 10;
    color: #bbb;
    font-size: 20px;
    cursor: pointer;
  }
  .icon:hover {
    color: #409eff;
  }
}
.box {
  max-height: 500px;
  overflow-y: auto;
}
.page {
  padding: 15px 15px 0;
}
.seach {
  /deep/ .el-input {
    width: 200px;
    margin: 0 20px 0 10px;
  }
}
.seach_copy {
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
    width: 200px;
    margin: 0 20px 0 10px;
  }
  .button_type {
    display: flex;
  }
  .seach_select {
    display: flex;
  }
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
  padding-top: 15px;
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
/deep/ .el-button {
  margin: 0 10px;
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
.seachSpan{
  color: #f49c3e;
  font-size: 20px;
  margin-right: 60px;
}

</style>
