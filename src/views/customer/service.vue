<template>
  <div class="page">
    <div class="pageItem">
      <div class="topHead clearfix">
        <s class="lt"></s>
        <span class="lt">客服设置</span>
      </div>
      <div class="textItem">
        <el-form :model="form" class="form clearfix">
          
            
            <el-form-item label="工作时间：" :label-width="formLabelWidth">
            
                <el-time-picker
                    class="lt"
                    v-model="start_time"
                    placeholder="上班开始时间">
                </el-time-picker>
                <el-time-picker
                    class="lt"
                    style="margin-left:20px"
                    v-model="end_time"
                    placeholder="上班结束时间">
                </el-time-picker>
                
            </el-form-item>
            <el-form-item label="详情页对话欢迎语：" :label-width="formLabelWidth">
                <el-input v-model="form.welcome1" autocomplete="off"></el-input>
                <span class="span">对话开始，客服号首先发一条欢迎语。（如：您好！请问有什么可以帮助您？）</span>
            </el-form-item>
        </el-form>
        
        

      </div>
      <div slot="footer" class="dialog-footer clearfix" style="border-top:1px solid #bbb;padding:20px">
          <el-button type="success" class="rt" @click="save_class">保 存</el-button>
        </div>
    </div>

    <div class="pageItem" style="margin-top:20px">
      <div class="topHead clearfix">
        <s class="lt"></s>
        <span class="lt">常用短语</span>
      </div>
      <div class="textItem">
        
        <div class="content clearfix">
            <div class="head clearfix">
                <img class="lt" src="../../assets/image/shouqianB.png" alt="">
                <span class="lt">售前短语</span>
            </div>
            <div class="item lt">
                <div class="itemDiv">
                    通用短语（不可修改）
                </div>
                <div class="itemDiv" v-for="(item,index) in qianList.buKe" :key="index">
                    {{item.content}}
                </div>
            </div>
            <div class="item rt">
                <div class="itemDiv">
                    自定义短语
                </div>
                <div class="itemDiv clearfix" v-for="(item,index) in qianList.ke" :key="index" @click="clicks(item)">
                    <!-- <div class="kuai" v-show="item.type != -1">
                        <span></span>
                    </div> -->
                    <div class="kuai" :class="id == item.id ? 'active':''" v-show="item.type != -1">
                        <span></span>
                    </div>
                    <span class="span">
                        {{item.content}}
                    </span>
                </div>
            </div>
        </div>

        <div class="content clearfix" style="margin-top:20px;">
            <div class="head clearfix">
                <img class="lt" src="../../assets/image/shouhouB.png" alt="">
                <span class="lt">售后短语</span>
            </div>
            <div class="item lt">
                <div class="itemDiv">
                    通用短语（不可修改）
                </div>
                <div class="itemDiv" v-for="(item,index) in houList.buKe" :key="index">
                    {{item.content}}
                </div>
            </div>
            <div class="item rt">
                <div class="itemDiv">
                    自定义短语
                </div>
                <div class="itemDiv clearfix" v-for="(item,index) in houList.ke" :key="index" @click="clicks(item)">
                    <!-- <div class="kuai" v-show="item.type != -1">
                        <span></span>
                    </div> -->
                    <div class="kuai" :class="id == item.id ? 'active':''" v-show="item.type != -1">
                        <span></span>
                    </div>
                    <span class="span">
                        {{item.content}}
                    </span>
                </div>
            </div>
        </div>

      </div>
      <div slot="footer" class="dialog-footer clearfix" style="padding:20px">
          <el-button type="success" class="rt" @click="add_tan = true">添 加</el-button>
          <el-button type="primary" class="rt" @click="xiu" style="margin-right:15px">修 改</el-button>
          <el-button type="danger" class="rt" @click="shan">删 除</el-button>
        </div>
    </div>
    <el-dialog
        width="50%"
        class="remarks_box"
        :visible.sync="add_tan"
        append-to-body>
        <div class="info">添加短语</div>
        <div style="padding:20px;">
            <el-form :model="add_form" class="form clearfix">

                <el-form-item label="短语类型：" :label-width="formLabelWidth2">
                    <el-radio v-model="add_form.type" label="1">售前短语</el-radio>
                    <el-radio v-model="add_form.type" label="2">售后短语</el-radio>
                </el-form-item>
                <el-form-item label="新增短语：" :label-width="formLabelWidth2">
                    <el-input type="textarea" v-model="add_form.title"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer clearfix" style="padding:20px">
                <el-button type="success" class="rt" @click="addDuan" style="margin-left:15px">添 加</el-button>
                <el-button type="danger" class="rt" @click="add_tan = false">取 消</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog
        width="50%"
        class="remarks_box"
        :visible.sync="edit_tan"
        append-to-body>
        <div class="info">修改短语</div>
        <div style="padding:20px;">
            <el-form :model="edit_title" class="form clearfix">

                <el-form-item label="修改内容：" :label-width="formLabelWidth2">
                    <el-input type="textarea" v-model="edit_title"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer clearfix" style="padding:20px">
                <el-button type="success" class="rt" @click="editDuan" style="margin-left:15px">修 改</el-button>
                <el-button type="danger" class="rt" @click="edit_tan = false">取 消</el-button>
            </div>
        </div>
    </el-dialog>
    <!-- 反复确认框。烦啊 -->
    <div class="box" v-show="kuang_show">
        <div class="content" @click="kuang_show = false">
          <div class="kuang" @click.stop="kuang_show = true">
            <img src="../../assets/image/gantan.png" alt="" />
            <div class="text">
              是否确认删除？
            </div>
            <el-button
              type="danger"
              @click.stop="kuang_show = false"
              style="margin-bottom: 10px; margin-right: 36px"
            >
              取消
            </el-button>
            <el-button
              type="success"
              @click="sure_address"
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
  upload_img,
  kf_config,
  save_kf_config,
  set_useful,
  update_useful,
  del_useful,
  add_useful,
} from "../../utils/axios";
export default {
    data(){
        return {
            add_form:{
                type:0,
                title:""
            },
            fromid:"",
            edit_title:"",
            kuang_show:false,
            add_tan:false,
            edit_tan:false,
            
            id:"",
            value1: new Date(2016, 9, 10, 18, 40),
            formLabelWidth: "200px",
            formLabelWidth1: "100px",
            formLabelWidth2: "150px",
            form: {
                kf_nickname: "",
                kf_avatar: "",
                welcome1:"",
                welcome2:"",
            },
            start_time:"",
            end_time:"",
            qianList:{
                ke:[],
                buKe:[],
            },
            houList:{
                ke:[],
                buKe:[],
            },
        }
    },
    created(){
        this.serviceInfo()
        this.fromid = JSON.parse(localStorage.getItem('admin_messages')).store_id
    },
    methods:{
        
        shan(){
            if(this.id){
                this.kuang_show = true
            }else{
                this.$message({
                    message: "先选择要删除的短语",
                    type: "warning",
                });
                return;
            }
        },
        xiu(){
            if(this.id){
                this.edit_tan = true
                // this.edit_title = ""
            }else{
                this.$message({
                    message: "先选择要修改的短语",
                    type: "warning",
                });
                return;
            }
        },
        clicks(item){
            console.log(item)
            this.id = item.id
            this.edit_title = item.content
            console.log(this.edit_title)
        },
        sure_address(){
            del_useful({
                ids: this.id
            })
            .then((res) => {
                if (res.data.err_code == 0) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                    this.kuang_show = false
                    this.serviceInfo()
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
        editDuan(){
            if (this.edit_title == "") {
                this.$message({
                    message: "修改内容必填",
                    type: "warning",
                });
                return;
            }
            update_useful({
                id: this.id,
                content:this.edit_title,
            })
            .then((res) => {
                if (res.data.err_code == 0) {
                    this.edit_tan = false
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    this.edit_title = ""
                    this.serviceInfo()
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
        addDuan(){
            if (this.add_form.title == "" || this.add_form.type == 0) {
                this.$message({
                message: "都是必填哦",
                type: "warning",
                });
                return;
            }
            console.log(this.add_form)
            add_useful({
                type:this.add_form.type,
                content:this.add_form.title,
            })
            .then((res) => {
                if (res.data.err_code == 0) {
                    this.add_tan = false
                    this.$message({
                        message: "编辑成功",
                        type: "success",
                    });
                    this.add_form = {
                        type:0,
                        title:""
                    }
                    this.serviceInfo()
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
        
        serviceInfo(){
            this.form = {
                kf_nickname: "",
                kf_avatar: "",
                welcome1:"",
                welcome2:"",
            }
            this.qianList = {
                ke:[],
                buKe:[],
            }
            this.houList = {
                ke:[],
                buKe:[],
            }
            kf_config({
                type: 1
            })
            .then((res) => {
                if (res.data.err_code == 0) {
                    console.log(res.data.err_msg.info)
                    if(parseInt(res.data.err_msg.info.start_time) > 0){
                        var date = new Date();
                        let nian = date.getFullYear();
                        let yue = date.getMonth() + 1;
                        let ri = date.getDate();
                        let result = parseInt(res.data.err_msg.info.start_time)
                        let h = Math.floor((result / 3600)) < 10 ? '0' + Math.floor((result / 3600)) : Math.floor((result / 3600));
                        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                        this.start_time = new Date(nian, yue, ri, h, m,s)
                    }
                    if(parseInt(res.data.err_msg.info.end_time) > 0){
                        var date = new Date();
                        let nian = date.getFullYear();
                        let yue = date.getMonth() + 1;
                        let ri = date.getDate();
                        let result = parseInt(res.data.err_msg.info.end_time)
                        let h = Math.floor((result / 3600)) < 10 ? '0' + Math.floor((result / 3600)) : Math.floor((result / 3600));
                        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                        this.end_time = new Date(nian, yue, ri, h, m,s)
                    }
                    this.form= {
                        kf_nickname: res.data.err_msg.info.kf_nickname,
                        kf_avatar: res.data.err_msg.info.kf_avatar,
                        welcome1:res.data.err_msg.info.welcome1,
                        welcome2:res.data.err_msg.info.welcome2
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
            
            //获取常用语
            set_useful({
                
            })
            .then((res) => {
                if (res.data.err_code == 0) {
                    console.log(res.data.err_msg.list)
                    res.data.err_msg.list.greetings.forEach((item,index) => {
                        if(item.type == 0){
                            this.qianList.buKe.push(item)
                        }else{
                            this.qianList.ke.push(item)
                        }
                    })
                    let num1 = ''
                    if(this.qianList.buKe > this.qianList.ke){
                        num1 = this.qianList.buKe.length
                    }else{
                        num1 = this.qianList.ke.length
                    }
                    if(num1 > this.qianList.buKe.length){
                        var num = num1 - this.qianList.buKe.length
                        for(let i = 0 ; i < num ; i ++){
                            this.qianList.buKe.push({
                                type:-1,
                                content:""
                            })
                        }
                    }
                    if(num1 > this.qianList.ke.length){
                        var num = num1 - this.qianList.ke.length
                        for(let i = 0 ; i < num ; i ++){
                            this.qianList.ke.push({
                                type:-1,
                                content:""
                            })
                        }
                    }
                    res.data.err_msg.list.after_sale.forEach((item,index) => {
                        if(item.type == 0){
                            this.houList.buKe.push(item)
                        }else{
                            this.houList.ke.push(item)
                        }
                    })
                    
                    let num2 = ''
                    if(this.houList.buKe > this.houList.ke){
                        num2 = this.houList.buKe.length
                    }else{
                        num2 = this.houList.ke.length
                    }
                    
                    console.log(num2)
                    if(num2 > this.houList.buKe.length){
                        var num = num2 - this.houList.buKe.length
                        for(let i = 0 ; i < num ; i ++){
                            this.houList.buKe.push({
                                type:-1,
                                content:""
                            })
                        }
                    }
                    if(num2 > this.houList.ke.length){
                        var num = num2 - this.houList.ke.length
                        for(let i = 0 ; i < num ; i ++){
                            this.houList.ke.push({
                                type:-1,
                                content:""
                            })
                        }
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
        // shijian(value){
        //     let result = parseInt(value)
        //     let h = Math.floor((result / 3600)) < 10 ? '0' + Math.floor((result / 3600)) : Math.floor((result / 3600));
        //     let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        //     let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        //     let ress = '';
        //     if(h !== '00') ress += `${h}小时`;
        //     if(m !== '00') ress += `${m}分`;
        //     ress += `${s}秒`;
        //     return ress
        // },
        //保存
        save_class() {
            if (this.form.welcome1 == "" || this.start_time == "" || this.end_time == "") {
                this.$message({
                message: "请完善表格信息",
                type: "warning",
                });
                return;
            }
            
            if (this.start_time != "") {
                this.start_time = this.commonJs.dataTime(this.start_time);
            }
            if (this.end_time != "") {
                this.end_time = this.commonJs.dataTime(this.end_time);
            }
            //获取当前年月日
            var date = new Date();
            let nian = date.getFullYear();
            let yue = date.getMonth() + 1;
            let ri = date.getDate();
            let now = Date.parse(new Date(nian + "-" + yue + "-" + ri + ' 00:00:00'))/1000
            //当天时间戳
            let str1 = this.start_time - now
            let str2 = this.end_time - now
            let data = {
                welcome1: this.form.welcome1,
                start_work_time: str1,
                end_work_time: str2,
            }
            console.log(data)
            save_kf_config(
                data
            )
            .then((res_s) => {
                console.log(res_s.data.err_code);
                if (res_s.data.err_code == 0) {
                    this.$message({
                        message: "编辑成功",
                        type: "success",
                    });
                    this.serviceInfo()
                } else {
                    this.dialogFormVisible = false;
                    this.$message({
                    showClose: true,
                    message: res_s.data.err_msg,
                    type: "error",
                    });
                }
            })
            .catch((error) => {
                this.dialogFormVisible = false;
                console.log(error);
            });
        },
        
        //上传图片
        img_upload1: function (item) {
            console.log(item);
            if (this.other_img_upload_err == false) {
                let fd = new FormData();
                fd.append("file", item.file);
                console.log(fd.get("file"));
                upload_img(fd)
                .then((res) => {
                    console.log(res);
                    if (res.data.err_code == 0) {
                    this.form.kf_avatar = res.data.err_msg.url;
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
    }
}

</script>
<style scoped lang="less">
.page {
  min-height: calc(100vh - 85px);
  background: #eaeaea;
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
        line-height: 25px;
        color: #ee8f29;
      }
    }
    .textItem {
      padding: 15px 30px;
        .content{
            border: 1px solid #bbb;
            .head{
                padding: 5px 50px;
                img{
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }
                span{
                    line-height: 30px;
                    height: 30px;
                    color: #f76336;
                }
            }
            .item{
                width: 50%;
                
                .itemDiv{
                    cursor: pointer;
                    height: 40px;
                    border-top: 1px solid #bbb;
                    line-height: 40px;
                }
            }
            .item.lt{
                .itemDiv{
                    padding-left: 50px;
                }
            }
            .item.rt{
                width: calc(50% - 1px);
                border-left: 1px solid #bbb;
                .itemDiv{
                    padding-left: 15px;
                    .kuai{
                        margin-top: 8px;
                        float: left;
                        margin-right: 5px;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 1px solid #000;
                        span{
                            display: block;
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            border: 1px solid #000;
                            margin: 4px;
                        }
                    }
                    .span{
                        float: left;
                    }
                    .kuai.active{
                        border-color: #ee8f29;
                        background: #ee8f29;
                        span{
                            border-color: #ee8f29;
                        }
                    }
                }
            }
        }
        .form{
            .span{
                color: #bbb;
                font-size: 13px;
                position: absolute;
                bottom: -37px;
                left: 0;
            }
            .span1{
                color: #bbb;
                font-size: 13px;
                display: block;
                margin-bottom: 10px;
            }
        }
    }
    /deep/ .textItem .el-input{
        input{
            max-width: 900px;
        }
    }
  }
}
/deep/ .upload-demo.lt.active{
    .el-upload{
        text-align: left;
    }
}
/deep/ .el-input input{
    height: 40px!important;
    line-height: 40px!important;
}
/deep/ .el-form-item{
    margin-bottom:45px;
}
/deep/ .el-form-item.active{
    margin-bottom:0;
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
      width: 200px;
      margin-top: -330px;
      margin-left: -100px;
      background: #fff;
      border: 5px solid #ee8f29!important;
      border-radius: 30px;
      padding: 35px 35px;
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
</style>
        
          