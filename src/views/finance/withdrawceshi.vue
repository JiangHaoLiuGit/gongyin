<template>
  <div class="goodsindex">
    <el-button type="primary" @click="successBtn">测试</el-button>
    
  </div>
</template>

<script>
import { return_agree ,goods_info_product,address_list} from "../../utils/axios";
import axios from 'axios'
export default {
  data() {
    return {
   
    };
  },

  methods: {
      //仅退款同意
      successBtn(){
      let that = this
      // address_list({
      //   page: 1,
      //   page_size: 20,
      // }).then((res) => {
      //   if (res.data.err_code == 0) {
          
      //   } else {
      //     that.$message({
      //       showClose: true,
      //       message: res.data.err_msg,
      //       type: "error",
      //     });
      //   }
      // })
      // .catch((error) => {
      //   that.loading = false;
      // });
      let data = {
        return_id: 4984,
      }
      // let data = {
      //   product_id: 4984,
      // }
      // console.log(data)
      //goods_info_product
      //product_id : 4984
      // return_id
      return_agree({
        params: {
          return_id: 12345
        }
      })
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "success",
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
      
    },

  },
};
</script>

<style scoped lang="less">


</style>