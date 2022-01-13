<template>
  <div class="sidebar">
    <div class="sidebar-title" >
      <img src="../../assets/image/logo.png" alt="暂无图片" />
      <span v-show ="$store.state.is_if_show">橘椒供应商后台管理</span>
    </div>
    <div class="sidebar-box">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="false"
        :default-active="activeMenu"
        background-color="transparent"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 默认激活项
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return {
        menuText: "#ffffff",  // "#bfcbd9"
        menuActiveText: "#ffffff",
        menuBg:  "#001529"
       
      };
    }
  },
  mounted() {
    
  },

};
</script>

<style scoped lang='less'>
.sidebar {
  width: 100%;
  height: 100%;
}
.sidebar-title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dcdfe6;
  color: #ffffff;
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.sidebar-box {
  width: 100%;
  height: calc(100% - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: "-moz-scrollbars-none";
  scrollbar-width: none; /*  火狐   */
}
.sidebar-box::-webkit-scrollbar {
  display: none; /*  Chrome  */
  width: 0 !important ; /*  Chrome  */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>