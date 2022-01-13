<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login_box">
      <h2>橘椒供应商后台管理系统</h2>
      <div class="login_form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="off"
              placeholder="请输入用户名"
              maxlength="12"
              prefix-icon="iconfont icon-yonghuming"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              placeholder="请输入密码"
              maxlength="20"
              prefix-icon="iconfont icon-mima"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type="text"
              v-model="ruleForm.code"
              autocomplete="off"
              placeholder="请输入验证码"
              prefix-icon="iconfont icon-yanzhengma"
              maxlength="6"
              @keyup.enter.native="fn1('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="identifybox">
              <div @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <el-button @click="refreshCode" type="text" class="textbtn"
                >看不清，换一张</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fn1('ruleForm')"
              >登录</el-button
            >
            <el-button @click="fn2('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/identify.vue";
import { Login, get_menu_list } from "../utils/axios";
export default {
  components: {
    SIdentify,
  },
  data() {
    var flag = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
    );
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (flag.test(value)) {
        return callback(new Error("账号不能包含特殊字符"));
      } else {
        return callback ()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (flag.test(value)) {
        return callback(new Error("密码不能包含特殊字符"));
      } else if (reg.test(value)) {
        return callback(new Error("密码不能包含中文"));
      } else {
        return callback ()
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (flag.test(value)) {
        return callback(new Error("验证码不能包含特殊字符"));
      } else if (reg.test(value)) {
        return callback(new Error("验证码不能包含中文"));
      } else if (value != this.identifyCode) {
        return callback(new Error("验证码错误"));
      } else {
        return callback ()
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
        code: "",
      },
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      identifyCode: "",
      identifyCodes: "1234567890",
      fn1: this.commonJs.Debounce(this.submitForm),
      fn2: this.commonJs.Debounce(this.resetForm),
      loading : ''
    };
  },

  created() {
   
  },

  mounted() {
    // 验证码初始化
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    
    
  },

  methods: {

    //提交
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        console.log('222222222')
        if (valid) {
          this.loading = this.$loading({
            lock: true,
            text: "登录中,请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          
          let data = {
            account: this.ruleForm.account,
            pwd: this.ruleForm.password,
          }
          console.log(location.href)
          if(location.href.indexOf("localhost") != -1){
            data = {
              type: 1,
              uid: 10234
            }
          }
          Login(data)
            .then((res) => {
              localStorage.setItem('admin_messages',JSON.stringify(res.data.err_msg))
              if (res.data.err_code == 0) {
              //   get_menu_list()
              //     .then((res) => {
                    
              //       console.log(res)
              //       if (res.data.err_code == 0) {
              //         localStorage.setItem('menuList', JSON.stringify(res.data.err_msg.list))
                      that.login();
              //       } else {
              //         that.loading.close();
              //         that.$message({
              //           showClose: true,
              //           message: res.data.err_msg,
              //           type: 'error'
              //         });
              //       }
              //     })
              //     .catch((error) => {
              //       console.log(error);
              //       that.loading.close();
              //     });
              } else {
                that.loading.close();
                that.$message({
                  showClose: true,
                  message: res.data.err_msg,
                  type: 'error'
                });
              }
            })
            .catch((error) => {
              console.log(error);
              that.loading.close();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
    //登录
    login() {
      let that = this
      this.$store
        .dispatch("user/login", { username: this.ruleForm.account})
        .then(() => {
          console.log(that.$route.query);
          console.log(document.cookie)
          that.loading.close();
          // 登陆成功后重定向
          that.$router.push({
            path: that.$route.query.redirect || "/index",
          });
        })
        .catch((err) => {
          that.$message({
            showClose: true,
            message: '登录失败,请稍后再试!',
            type: 'error'
          });
        });
    },

    //重置
    resetForm(formName) {
      if (
        this.ruleForm.account == "" &&
        this.ruleForm.password == "" &&
        this.ruleForm.code == ""
      ) {
        this.$message({
          message: "暂无可重置信息",
          type: "warning",
        });
      } else {
        this.$refs[formName].resetFields(); //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      }
    },

    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },

    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
  },
};
</script>

<style scoped lang = "less">
/deep/ .el-input .el-input__prefix{
  top: 2px!important;
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    display: flex;
    padding: 30px;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 30px;
    h2 {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      font-weight: 800;
      text-align: center;
    }
    .login_form {
      width: 80%;
      margin: 0 auto;
    }
    /deep/ .el-input__suffix {
      display: none;
    }
    /deep/ .el-input__icon {
      font-size: 22px;
      color: #63bcfd;
    }
    /deep/ .el-input__inner {
      padding-left: 34px;
    }
    /deep/ .el-form-item__label {
      width: 80px !important;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines; 
      
    }
    /deep/ .el-form-item__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-left: 0px !important;
    }

    //兼容火狐浏览器写法
    .el-input__suffix {
      display: none;
    }
    .el-input__icon {
      font-size: 22px;
      color: #63bcfd;
    }
    .el-input__inner {
      padding-left: 34px;
    }
    .el-form-item__label {
      width: 80px !important;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines; // 这行必加，bai兼容ie浏览器
    }
    .el-form-item__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-left: 0px !important;
    }
    .identifybox {
      display: flex;
      flex-wrap: wrap;
      margin-top: 2px;
      padding-left: 30px;
      .textbtn {
        margin-left: 15px;
      }
    }
  }
}
.login-bg {
  width: 100%;
  height: 100%;
  background: #3e3e3e;
}
.login-box {
  width: 350px;
  /* height: 287px; */
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 5px;
  box-shadow: 0 0 2px #f7f7f7;
  border: 1px solid #f7f7f7;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -150px;
}
.login-box-title {
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}
.login-box-from {
  width: 100%;
  height: auto;
  padding: 30px;
  box-sizing: border-box;
}

</style>