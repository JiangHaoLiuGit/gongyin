<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="from" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品品牌：" prop="brand">
        <el-input v-model="value.brand"></el-input>
      </el-form-item> -->
      <el-form-item label="商品分类(原)：" >
        <el-input v-model="value.classification_value_copy" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="classification_value">
        <el-cascader
          placeholder="请选择商品分类"
          v-model="value.classification_value"
          :options="classification_list"
          :props="{ expandTrigger: 'hover' , checkStrictly: true}"
          @change="pick_cate_change"></el-cascader>
      </el-form-item>
      <!-- <el-form-item label="操作：">
        <div style="display:flex;justify-content: space-between;">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="img_upload"
            :before-upload="img_beforeUpload"
            :show-file-list = "false"
            list-type="picture">
            <el-button size="small" type="primary">上传商品主图</el-button>
          </el-upload>
          
          <el-upload
            class="upload-demo"
            action=""
            :http-request="file_upload"
            :before-upload="file_beforeUpload"
            :show-file-list = "false"
            list-type="picture">
            <el-button size="small" type="primary">上传视频</el-button>
          </el-upload>

          <el-button slot="trigger" size="small" type="primary" @click="upload_group_img">上传商品组图</el-button>
        </div>
        
      </el-form-item> -->
      <!-- <el-form-item label="商品组图选取：">
        <div style="display:flex;justify-content: space-between;">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :file-list="fileList"
            :on-remove="handleRemove"
            :http-request="img_upload_group"
            :before-upload="img_beforeUpload_group"
            :auto-upload="true">
            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>
        
      </el-form-item> -->
      <el-form-item label="商品主图：" prop="image">
        <el-upload
            class="upload-demo"
            action=""
            :http-request="img_upload"
            :before-upload="img_beforeUpload"
            :show-file-list = "false"
            list-type="picture"
            style="margin-bottom:20px">
            <el-button size="small" type="primary">上传商品主图</el-button>
          </el-upload>
        <el-image
          style="width:100px;height:100px;"
          :src="value.image"
          fit="cover"></el-image>
      </el-form-item>
      <el-form-item label="商品视频：">
        <div class="clearfix">
          <el-upload
            class="upload-demo lt"
            action=""
            :http-request="file_upload"
            :before-upload="file_beforeUpload"
            :show-file-list = "false"
            list-type="picture"
            style="margin-bottom:20px">
            <el-button size="small" type="primary">上传视频</el-button>
          </el-upload>
          <el-button size="small" type="danger" class="lt" style="margin-left:20px;margin-top:1px;" v-if="value.video" @click="value.video = ''">删除</el-button>
        </div>
         <video  style="width:300px;height:300px;" controls="controls" poster="../../../../assets/image/logo.png" :src= value.video id="video">
          您的浏览器不支持H5播放器
        </video>
      </el-form-item>
      <el-form-item label="商品组图：">
        
        <div style="display: flow-root;margin-bottom:20px">
          <div class="wo"></div>
          <div class="img" style="margin-bottom:10px">
            <draggable 
              v-model:personInfo="value.diagram" 
              group="site" 
              animation="300" 
              dragClass="dragClass" 
              ghostClass="ghostClass" 
              chosenClass="chosenClass" 
              @end="drag_end"
              @add="drag_add"
            >
              <transition-group style="display:flex;flex-wrap:wrap;padding-top:20px;">
                <div class="imgBlock" @mouseover="changeActive($event)" @mouseout="removeAactive($event)" v-for="(item,index) in value.diagram" :key="index" style="height:150px;width:150px;display:inline-block;margin-right:10px;margin-top:10px;">
                  <!-- value.diagram -->
                  <!-- <div style="height:150px;width:100%;">{{item}}</div> -->
                  <div class="deleteDiv" @click="edleteDiv(index)">
                    <i class="el-icon-delete"></i>
                  </div>
                  <el-image
                    :src="item"
                    fit="cover"
                    style="height:150px;width:100%;"
                    :preview-src-list="[item]"
                  ></el-image>
                </div>
              </transition-group>
            </draggable>
          </div>
          <el-upload
              action=""
              list-type="picture-card"
              :file-list='fileList'
              :http-request="img_upload_group"
              :on-preview="handlePreview"
              accept="image/jpeg, image/jpg, image/png"
              multiple
              :before-upload="img_beforeUpload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        <el-carousel height="150px">
          <el-carousel-item v-for="(item,index) in value.diagram" :key="index">
            <el-image
              style="height:150px;width:100%;"
              :src="item"
              fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-form-item>
      <el-form-item label="参数规格：" prop="norm">
        <el-radio v-model="value.norm" label="1">添加多规格</el-radio>
        <el-radio v-model="value.norm" label="2">不添加规格</el-radio>
      </el-form-item>
      <el-form-item label="销售属性：" prop="specifications">
        <el-radio v-model="value.specifications" label="1">显示销售属性</el-radio>
        <el-radio v-model="value.specifications" label="2">不显示销售属性</el-radio>
      </el-form-item>
      <el-form-item label="库存数量：" prop="quantity" v-show="!specifications_show">
        <el-input v-model="value.quantity"></el-input>
      </el-form-item>
      <!-- 结算价： -->
      <el-form-item label="成本价：" prop="prime_cost_price" v-show="!specifications_show">
        <el-input v-model="value.prime_cost_price"></el-input>
      </el-form-item>
      <el-form-item label="重量：" prop="weight" v-show="!specifications_show">
        <el-input v-model="value.weight"></el-input>
      </el-form-item>
      <!-- <el-form-item label="结算比例(%)：" prop="settle_ratio">
        <el-input v-model="value.settle_ratio" type="number" placeholder="请填写结算比例"></el-input>
        <span style="color:red">结算比例范围15%-20%,太高会影响商品销售</span>
      </el-form-item> -->
      <el-form-item label="发货地址(原)：" >
        <el-input v-model="value.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="发货地址：" prop="area">
        <div style="display:flex;justify-content: space-between;margin-bottom:20px;">
          <el-select v-model="value.province" placeholder="请选择省份">
            <el-option
              v-for="item in provinceList"
              :key="item.province_id"
              :label="item.name"
              :value="item.province_id">
            </el-option>
          </el-select>
          <el-select v-model="value.city" placeholder="请选择市" v-show="city_ifShow">
            <el-option
              v-for="item in cityList"
              :key="item.city_id"
              :label="item.name"
              :value="item.city_id">
            </el-option>
          </el-select>
        </div>
        <el-select v-model="value.area" placeholder="请选择区"  v-show="area_ifShow">
          <el-option
            v-for="item in areaList"
            :key="item.area_id"
            :label="item.name"
            :value="item.area_id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="上架方式：" prop="groundingWay">
        <el-radio v-model="value.groundingWay" label="1">立即上架</el-radio>
        <el-radio v-model="value.groundingWay" label="2">定时开售</el-radio>
      </el-form-item>
      <el-form-item label="开售时间：" prop="sell_time" v-show="!timingw">
        <el-date-picker
          :clearable = false
          v-model="value.sell_time"
          type="date"
          placeholder="请选择日期">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="运费模式：" prop="freightWay">
        <el-radio v-model="value.freightWay" label="1">包邮</el-radio>
        <!-- <el-radio v-model="value.freightWay" label="2">运费模板</el-radio> -->
      </el-form-item>
      <el-form-item label="运费模板(原)：" prop="postage_template_id" v-show="value.freightWay === 2" >
        <el-input v-model="value.postage_template_id_copy" disabled></el-input>
      </el-form-item>
      <el-form-item label="运费模板：" v-show="value.freightWay == 2" >
        <el-input v-model="value.postage_template_name" style="width:200px;margin-bottom:10px;" disabled v-show="value.postage_template_name != ''"></el-input>
        <el-button type="primary" style="display:block" @click="addNewTemplate">选择运费模板</el-button>
      </el-form-item>

      <!-- 添加商品弹窗 -->
      <el-dialog title="添加商品" :visible.sync="goods_examine_change_ifShow">
        <div class="seach">
        
        </div>
        <div class="seach_copy">
          <div class="seach_select">
            <el-input v-model="product_name" placeholder="请输入运费模板名称"></el-input>
          </div>
          <div class="button_type">
            <el-button type="primary" icon="el-icon-refresh" @click="fn1(1)"
                    >刷新</el-button
                >
            <el-button type="primary" @click="pick_seach2">搜索</el-button>
            
            
          </div>
        </div>
        <div class="box">
          <el-row :gutter="20" class="goodsindex-list">
            <el-col :span="24">
              <el-table
                v-loading="loading"
                ref="multipleTable"
                :data="newGoodsList"
                border
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="100" align="center">
                </el-table-column>
                <el-table-column 
                  prop="tpl_name" 
                  align="center"
                  label="模板名称" 
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="optTpl(scope.row)">选择模板</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
          
        <!-- 分页 -->
        <el-row :gutter="20" class="goodsindex-list">
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
      <el-form-item label="新建模板：">
        <el-button type="primary" @click="newTemplate">新建运费模板</el-button>
      </el-form-item>
      <el-form-item label="备注：" prop="intro">
        <el-input v-model="value.intro"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('from')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
  import { goods_get_cate , upload_img ,  uploadfiles , get_province , get_city , get_area , param_list , uploadImages,tpl_list } from "../../../../utils/axios";
  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      },
    },
    components: {
      draggable,
    },
    data() {
      return {
        imgList:[],//组图参数
        fileList:[],//组图参数
        dialogImageUrl:"",
        dialogVisible:false,
        classification_list :[], //商品分类列表
        second_cate : [],
        three_cate : [],
        provinceList :[], //省
        cityList :[],//市
        areaList :[],//区
        city_ifShow : false,
        area_ifShow : false,
        specifications_show : true,//参数规格
        timingw : true,//上架方式
        freight_T : true,//运费模式
        postageList :  [],//运费模板
        other_img_upload_err : false,
        other_file_upload_err : false,
        other_img_upload_err_group : false,
        classification_value : [],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          // settle_ratio: [
          //   { required: true, message: '请输入结算比例', trigger: 'blur' },
          // ],
          classification_value: [
            { required: false, message: '请选择商品分类', trigger: 'change' }
          ],
          image: [
            { required: true, message: '请上传商品主图', trigger: 'change' }
          ],
          norm: [
            { required: true, message: '请选择参数规格单选', trigger: 'change' }
          ],
          specifications: [
            { required: true, message: '请选择规格参数', trigger: 'change' }
          ],
          area: [
            { required: false, message: '请选择发货地址', trigger: 'change' }
          ],
          // groundingWay: [
          //   { required: true, message: '请选择上架方式', trigger: 'change' }
          // ],
          freightWay: [
            { required: true, message: '请选择运费模式', trigger: 'change' }
          ],
        },
        fileList : [],
        goods_examine_change_ifShow:false,
        product_name:"",
        newGoodsList:[],
        queryInfo2: {
          page: 1,
          pageSize: 20,
          total: 1,
        },
        fn1: this.commonJs.Debounce(this.goodList),
        loading:false
      };
    },

    watch:{

      'value.province':{//省
        handler:function(news,olds){
          if(news){
            this.city_ifShow = true
            this.value.area = ''
            this.value.city = ''
            this.area_ifShow = false
            this.get_city(news)
          } else {
            this.city_ifShow = false
            this.value.area = ''
            this.value.city = ''
            this.area_ifShow = false
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

      'value.city':{//市
        handler:function(news,olds){
          if(news){
            this.area_ifShow = true
            this.value.area = ''
            this.get_area(news)
          } else {
            this.value.area = ''
            this.area_ifShow = false
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

      'value.specifications':{//参数规格
        handler:function(news,olds){
          if(news == 2){
            this.specifications_show = false
          } else {
            this.specifications_show = true
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

      'value.groundingWay':{//上架方式
        handler:function(news,olds){
          if(news == 2){
            this.timingw = false
          } else {
            this.timingw = true
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },
      'value.norm':{//运费模式
        handler:function(news,olds){
          if(news == 2){
            //不显示
            this.value.param_group_list = []
          } else {
            //要显示
            if(this.value.param_group_list.length > 0){
              return
            }
            let category_id = ""
            if(this.value.category_tid != ''){
              category_id = this.value.category_tid
            }else{
              if(this.value.category_id != ''){
                category_id = this.value.category_id
              }else{
                if(this.value.category_fid != ''){
                  category_id = this.value.category_fid
                }
              }
            }
            console.log(category_id)
            if(category_id){
              param_list(
                {category_id : category_id}
              )
              .then((res) => {
                if (res.data.err_code == 0) {
                  //规格属性
                  res.data.err_msg.param_group_list.forEach(element => {
                    element.value.forEach(element_first => {
                      let arr = element_first.value.split(',')
                      element_first.array = arr
                      element_first.final_value = ''
                      element_first.data = ''
                      element_first.selectValue = []
                    })
                  })
                  this.value.param_group_list = res.data.err_msg.param_group_list
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
            }else{
              setTimeout(() => {
                console.log(this.value.param_group_list)
                if(this.value.param_group_list.length > 0){
                  return
                }
                let category_id = ""
                if(this.value.category_tid != ''){
                  category_id = this.value.category_tid
                }else{
                  if(this.value.category_id != ''){
                    category_id = this.value.category_id
                  }else{
                    if(this.value.category_fid != ''){
                      category_id = this.value.category_fid
                    }
                  }
                }
                param_list(
                  {category_id : category_id}
                )
                .then((res) => {
                  if (res.data.err_code == 0) {
                    //规格属性
                    res.data.err_msg.param_group_list.forEach(element => {
                      element.value.forEach(element_first => {
                        let arr = element_first.value.split(',')
                        element_first.array = arr
                        element_first.final_value = ''
                        element_first.data = ''
                        element_first.selectValue = []
                      })
                    })
                    this.value.param_group_list = res.data.err_msg.param_group_list
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
              },2000)
            }
          }
            
        },
        deep:true ,//true 深度监听
        immediate: true,
        intervalue:""
      },
      'value.freightWay':{//运费模式
        handler:function(news,olds){
          if(news == 2){
            // if(this.classification_value.length == 0) {
            //   this.$message({
            //     message: '请先选择商品分类',
            //     type: 'warning'
            //   });
            //   if(olds == 1) {
            //     this.value.freightWay = '1'
            //   } else {
            //     this.value.freightWay = ''
            //   }
            // } else {
            //   this.freight_T = false
            // }
            
          } else {
            // this.freight_T = true
          }
        },
        deep:true ,//true 深度监听
        immediate: true
      },

    },

    created() {
      this.get_cate() //获取商品三级分类
      this.get_province() //获取省份
      this.goodList()//运费模板列表请求
      setTimeout(() => {
        if(this.value.diagram.length == 0){
          setTimeout(() => {
            this.value.diagram.forEach(item => {
              let arr = item.split("/")
              let obj = {
                url:item,
                name:encodeURIComponent(arr[arr.length-1])
              }
              this.fileList.push(obj)
            })
            console.log(this.fileList)
          },500)
        }else{
          this.value.diagram.forEach(item => {
            let arr = item.split("/")
            let obj = {
              url:item,
              name:encodeURIComponent(arr[arr.length-1])
            }
            this.fileList.push(obj)
          })
          console.log(this.fileList)
        }
        
      },500)
      
      
    },
    mounted(){
      setTimeout(() => {
        let category_id = ""
        let that = this
        if(this.value.category_tid != ''){
          category_id = this.value.category_tid
        }else{
          if(this.value.category_id != ''){
            category_id = this.value.category_id
          }else{
            if(this.value.category_fid != ''){
              category_id = this.value.category_fid
            }
          }
        }
         
        
        console.log(this.value)
        console.log(category_id)
          param_list(
            {category_id : category_id}
            // {category_id : category_id }
          )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              //规格属性
              
              
              //销售属性
              if(that.value.specifications == 2){
                that.value.specifications = "2"
              }
              if(that.value.specifications == 1){
                that.value.specifications = "1"
              }
              res.data.err_msg.param_group_list.forEach(element => {
                element.value.forEach(element_first => {
                  let arr = element_first.value.split(',')
                  element_first.array = arr
                  element_first.final_value = ''
                  element_first.data = ''
                  element_first.selectValue = []
                })
              })
              if(that.value.norm == 2){
                that.value.norm = "2"
                //这个是补丁.怕用户从不显示变成显示.不加这行会直接显示空
                this.value.param_group_list = res.data.err_msg.param_group_list
                console.log(this.value.param_group_list)
              }
              if(that.value.norm == 1){
                that.value.norm = "1"
              }
              //param_group_list 第二页的东西
              // this.value.param_group_list = res.data.err_msg.param_group_list
              // console.log(this.value.param_group_list)
              res.data.err_msg.property_list.forEach(ele => {
                if(ele.pid == this.value.templateValue){
                  ele.checked = true
                }else{
                  ele.checked = false
                }
                
                if(ele.value.length > 0) {
                  ele.value.forEach(item => {
                    item.image = ''
                  })
                }
              })
              that.value.property_list = res.data.err_msg.property_list
              that.value.property_list.forEach(el => {
                let leg = true
                that.value.property_list_value.forEach(ele => {
                  if(el.name == ele.name){
                    leg = false
                  }
                })
                if(leg){
                  that.value.property_list_value.push(el)
                }
              })
              
              that.postageList = res.data.err_msg.postage_template_list
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
      },1000)
    },

    methods: {
      changeActive(e){
        e.currentTarget.className="imgBlock active"
      },
      removeAactive(e){
        e.currentTarget.className="imgBlock"
      },
      edleteDiv(index){
        this.value.diagram.splice(index,1)
      },
      drag_add(e){
        console.log(e)
      },
      drag_end(e){
        console.log(e.newIndex)
        console.log(e.oldIndex)
        let arr = this.value.diagram
        if(e.oldIndex > e.newIndex){
          // arr.splice(e.newIndex,0,arr[e.oldIndex]);
          // arr.splice(e.oldIndex+1,1)
        } else {
        //如果当前元素在拖动目标位置的上方(即把该元素向下拖)，
        //同样，给数组newIndex+1的地方新增一个和当前元素值一样的元素，
        //这时，将之前的那个拖动的元素删除掉，索引不变，还是oldIndex
          // arr.splice(e.newIndex+1,0,arr[e.oldIndex]);
          // arr.splice(e.oldIndex,1)
        }
        console.log(arr)
        this.value.diagram = arr
        console.log(this.value.diagram)
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
              // that.provinceList = res.data.err_msg.province
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

      // 获取商品三级分类
      get_cate(){
        let that = this
        goods_get_cate().then(res=>{
          if(res.data.err_code==0){
            if( res.data.err_msg.first.length > 0) {

              if(res.data.err_msg.second.length > 0) { //存在二级分类

                if(res.data.err_msg.third.length > 0) { //存在三级分类

                  res.data.err_msg.first.forEach((element_first , first_index) => {
                    that.second_cate = []
                    that.classification_list.push({
                      value : element_first.cat_id,
                      label : element_first.cat_name,
                      cat_id : element_first.cat_id
                    })

                    res.data.err_msg.second.forEach(element_second => {
                      that.three_cate = []
                      if(element_first.cat_id == element_second.cat_fid) {//一级分类的ID等于二级分类的父级ID
                        that.second_cate.push({
                          value : element_second.cat_id,
                          label : element_second.cat_name,
                          cat_fid : element_second.cat_fid,
                          cat_id : element_second.cat_id
                        })
                        that.classification_list[first_index].children = that.second_cate

                        res.data.err_msg.third.forEach(element_third => {

                          if(element_second.cat_id == element_third.cat_fid) {
                            that.three_cate.push({
                              value : element_third.cat_id,
                              label : element_third.cat_name,
                              cat_fid : element_third.cat_fid,
                              cat_id : element_third.cat_id
                            })
                            let index = that.classification_list[first_index].children.length-1
                            that.classification_list[first_index].children[index].children = that.three_cate
                          }
                        })
                      }
                    })
                  })
                  
                } else {//不存在三级分类
                  res.data.err_msg.first.forEach((element_first , first_index) => {
                    that.second_cate = []
                    that.classification_list.push({
                      value : element_first.cat_id,
                      label : element_first.cat_name,
                      cat_id : element_first.cat_id
                    })
                    res.data.err_msg.second.forEach(element_second => {
                      if(element_first.cat_id == element_second.cat_fid) {
                        that.second_cate.push({
                          value : element_second.cat_id,
                          label : element_second.cat_name,
                          cat_fid : element_second.cat_fid,
                          cat_id : element_second.cat_id
                        })
                        that.classification_list[first_index].children = that.second_cate
                      }
                    })
                  })
                }

              } else {
                res.data.err_msg.first.forEach(element_first => {
                  that.classification_list.push({
                    value : element_first.cat_id,
                    label : element_first.cat_name
                  })
                })
              }
            }
            console.log(that.classification_list)
          }else{
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: 'error'
            });
          }
        })
      },

      //商品三级分类选择
      pick_cate_change(value) {
        this.classification_value = value
        this.get_param()
        console.log(this.classification_value)
      },

      //商品管理—商品发布中需要的参数与sku模板
      get_param () {
        // this.value.name = "sb彭涛"
        // this.$nextTick(() => {
          
        // })
        
        let that = this
        let category_id = ''
        if(this.classification_value.length == 1 ) {
          category_id = this.classification_value[0]
        } else if (this.classification_value.length == 2) {
          category_id = this.classification_value[1]
        } else {
          category_id = this.classification_value[2]
        }
        
        // if(this.value.category_tid != ''){
        //   category_id = this.value.category_tid
        // }
        //  if(this.value.category_id != ''){
        //   category_id = this.value.category_id
        // }
        //  if(this.value.category_fid != ''){
        //   category_id = this.value.category_fid
        // }
        console.log(category_id)
        console.log(that.value)
        console.log(that.value.id)
        
          //第一页点击选择
          if(that.value.id != category_id ) {
            param_list(
              {category_id : category_id}
              // {category_id : category_id }
            )
              .then((res) => {
                console.log(res);
                if (res.data.err_code == 0) {
                  if(res.data.err_msg.param_group_list.length == 0) {
                    that.value.norm = '2' //销售属性规格-单选
                  } else {
                    that.value.norm = '1' //测试
                  }
                  res.data.err_msg.param_group_list.forEach(element => {
                    element.value.forEach(element_first => {
                      let arr = element_first.value.split(',')
                      element_first.array = arr
                      element_first.final_value = ''
                      element_first.data = ''
                      element_first.selectValue = []
                    })
                  })
                  //param_group_list 第二页的东西
                  that.value.param_group_list = res.data.err_msg.param_group_list
                  console.log(that.value.param_group_list)
                  res.data.err_msg.property_list.forEach(ele => {
                    ele.checked = false
                    if(ele.value.length > 0) {
                      ele.value.forEach(item => {
                        item.image = ''
                      })
                    }
                  })
                  that.value.property_list = res.data.err_msg.property_list
                  that.value.property_list_value = res.data.err_msg.property_list
                  that.postageList = res.data.err_msg.postage_template_list
                  // that.value.enableTemplate = ''
                  that.value.templateValue = []
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
        
       
      },

      //上传图片
      img_upload: function(item) {
        console.log(item)
        let that = this
        if (this.other_img_upload_err == false) {
          let fd = new FormData()
          fd.append('file', item.file)
          console.log(fd.get("file"))
          upload_img(
            fd
          )
            .then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                that.value.image = res.data.err_msg.url
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
      },

      //上传图片之前
      img_beforeUpload (file) {
        console.log(file)
        if(file.type != 'image/jpeg' && file.type != 'image/jpg' && 
            file.type != 'image/png' && file.type != 'image/gif' &&
            file.type != 'image/JPEG' && file.type != 'image/JPG' &&
            file.type != 'image/PNG' && file.type != 'image/GIF'
            ) {
            this.$message.error('请上传图片格式!');
            this.other_img_upload_err = true
        } else if ( file.size / 1024 / 1024 > 200) {
          this.$message.error('图片大小不能超过 200MB!');
          this.other_img_upload_err = true
        }
      },

      //组图移除
      handleRemove(file, fileList) {
        let that = this
        this.fileList.forEach((comm,index) => {
          //编码URL用汉字转URL编码
          var str = encodeURIComponent(file.name)
          if(str == encodeURIComponent(comm.name)){
            this.fileList.splice(index,1)
            that.value.diagram.splice(index,1)
          }
        })
      },

       //上传图片之前-组图
      img_beforeUpload_group (file) {
        console.log(file)
        if(file.type != 'image/jpeg' && file.type != 'image/jpg' && 
            file.type != 'image/png' && file.type != 'image/gif' &&
            file.type != 'image/JPEG' && file.type != 'image/JPG' &&
            file.type != 'image/PNG' && file.type != 'image/GIF'
            ) {
            this.$message.error('请上传图片格式!');
            this.other_img_upload_err_group = true
            return false
        } else if ( file.size / 1024 / 1024 > 200) {
          this.$message.error('图片大小不能超过 200MB!');
          this.other_img_upload_err_group = true
          return false
        }
      },
      handlePreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
       //上传图片-组图
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
            that.fileList.push(obj)
            console.log(that.value)
            if(!that.value.diagram){
              that.value.diagram = []
            }
            that.value.diagram.push(res.data.err_msg.url)
            console.log("轮播arr")
            console.log(that.value.diagram)
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

      upload_group_img () {
        let that = this
        if(this.value.fileList_copy.length > 0) {
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
                console.log(that.value.fileList_copy)
                if(that.value.diagram.length == 0) {
                  that.value.diagram = res.data.err_msg.url_list
                } else {
                  res.data.err_msg.url_list.forEach(element => {
                    that.value.diagram.push(element)
                  })
                }
                console.log(that.value.diagram)
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
            message: '请选择商品组图',
            type: 'warning'
          });
        }
      },


      //上传文件之前
      file_beforeUpload (file) {
        console.log(file)
        let str = file.name
        var index = str.lastIndexOf(".");  
        console.log(index)
        str  = str .substring(index + 1, str.length);
        console.log(str)
        if(str != 'mp4') {
            this.$message.error('请上传视频格式!');
            this.other_file_upload_err = true
        } else if ( file.size / 1024 / 1024 > 200) {
          this.$message.error('文件大小不能超过 200MB!');
          this.other_file_upload_err = true
        }
      },

      //上传文件
      file_upload: function(item) {
        console.log(item)
        let that = this
        if (this.other_file_upload_err == false) {
          let fd = new FormData()
          fd.append('file', item.file)
          console.log(fd.get("file"))
          uploadfiles(
            fd
          )
            .then((res) => {
              console.log(res);
              if (res.data.err_code == 0) {
                that.value.video = res.data.err_msg.url
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
      },

      //新建运费模板
      newTemplate () {
        this.$router.push("/goods/freightTemplate")
      },
      //选择运费模板
      addNewTemplate(){
        this.goods_examine_change_ifShow = true
      },
      goodList(index){
        let that = this
        this.loading = true
        tpl_list(
          {
            page : 1,
            page_size: 20
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.loading = false
            this.newGoodsList = res.data.err_msg.list
            this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size)
            this.queryInfo2.page = parseInt(res.data.err_msg.page)
            this.queryInfo2.total = parseInt(res.data.err_msg.total_number)
            if(index == 1) {
              that.$message({
                message: '刷新成功',
                type: 'success'
              });
            }
          } else {
            this.loading = false
            this.$message({
              showClose: true,
              message: res.data.err_msg,
              type: 'error'
            });
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error);
        });
      },
      //分页
      get_shop_list_page2 (page , number) {
        this.loading = true
        tpl_list(
          {
            page : page,
            page_size: number,
            tpl_name : this.product_name,//模糊搜索id或商品名称
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              this.loading = false
              this.newGoodsList = res.data.err_msg.list
              this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size)
              this.queryInfo2.page = parseInt(res.data.err_msg.page)
              this.queryInfo2.total = parseInt(res.data.err_msg.total_number)
            } else {
              this.loading = false
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.loading = false
            console.log(error);
          });
      },

      //每页显示条数改变
      handleSizeChange2(val) {
        this.get_shop_list_page2(1,val)
      },

      //当前页
      handleCurrentChange2(val) {
        this.get_shop_list_page2(val,this.pageSize)
      },

      //搜索
      pick_seach2 () {
        
        if(this.product_name == '') {
          this.$message({
            message: '请选择任意一种搜索类型',
            type: 'warning'
          });
          return
        }
        this.loading = true
        tpl_list(
          {
            page : 1,
            page_size: 20,
            tpl_name : this.product_name,//模糊搜索id或商品名称
          }
        )
          .then((res) => {
            console.log(res);
            if (res.data.err_code == 0) {
              this.loading = false
              this.newGoodsList = res.data.err_msg.list
              this.queryInfo2.pageSize = parseInt(res.data.err_msg.page_size)
              this.queryInfo2.page = parseInt(res.data.err_msg.page)
              this.queryInfo2.total = parseInt(res.data.err_msg.total_number)
            } else {
              this.loading = false
              this.$message({
                showClose: true,
                message: res.data.err_msg,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.loading = false
            console.log(error);
          });
      },
      optTpl(row){
        this.goods_examine_change_ifShow = false
        this.value.postage_template_name = row.tpl_name
        this.value.postage_template_id = row.tpl_id
      },
      //下一步
      handleNext(formName){
        console.log(this.$refs[formName])
        let that = this
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            if(that.value.diagram.length == 0) {
              that.$message({
                message: '请上传商品组图',
                type: 'warning'
              });
              return;
            }
            if(that.value.specifications == 2) {
              if(that.value.quantity == '' || that.value.prime_cost_price == '' || that.value.weight == ''
                
                ) {
                that.$message({
                  message: '请将不显示规格参数处的表单填写完整',
                  type: 'warning'
                });
                return
              } 
              else if (parseInt(that.value.quantity) < 1 ) {
                that.$message({
                  message: '库存数量需要大于1',
                  type: 'warning'
                });
                return
              }
            }
            if(that.value.province_c  == '0' && (that.value.province == '' || that.value.city == '' || that.value.area  == '')) {
              that.$message({
                message: '请选择发货地址',
                type: 'warning'
              });
              return
            }
            // that.value.province  =  that.value.province ? that.value.province :  that.value.province_c //省
            // that.value.city =  that.value.city ? that.value.city :  that.value.city_c //市
            // that.value.area = that.value.area ? that.value.area :  that.value.area_c //区

            that.value.province_c  =  that.value.province ? that.value.province :  that.value.province_c //省
            that.value.city_c =  that.value.city ? that.value.city :  that.value.city_c //市
            that.value.area_c = that.value.area ? that.value.area :  that.value.area_c //区
            console.log(that.value.province , that.value.city , that.value.area)
            console.log(111)
            that.$emit('nextStep')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  }
.wo:before{
  content: "*";
  color: #F56C6C;
  margin-right: 4px;
  position: absolute;
  top: 0;
  left: -93px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.seach_copy {
  margin-top: 20px;
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
/deep/ .goodsindex-list.el-row{
  margin: 0!important;
}
/deep/ .goodsindex-page-box{
  margin-top:10px
}
.box{
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
}
/deep/ .el-upload-list.el-upload-list--picture-card{
  li{
    display: none;
  }
}
.imgBlock{
  position: relative;
  .deleteDiv{
    width: 30px;
    height: 30px;
    text-align:center;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    i{
      font-size: 20px;
      color: #fff;
    }
  }
}
.imgBlock.active{
  position: relative;
  .deleteDiv{
    width: 30px;
    height: 30px;
    text-align:center;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    i{
      font-size: 20px;
      color: #000;
    }
  }
}
</style>
