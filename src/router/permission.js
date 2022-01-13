// 路由的全局守卫

// 权限控制逻辑
import router from './index'
import store from '../store/index'

//引入nprogress 进度条插件
import NProgress from 'nprogress'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import { Login ,quit} from "../utils/axios";

// 简单配置  进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


const whiteList = ['/login'] //排除的路径

router.beforeEach(async (to, from, next) => {
    let str = to.fullPath
    if(str.indexOf("?url=") != -1){
        str=str.split("?")
        if(str.length > 1){
            if(str[1].indexOf("=")){
                str[1] = str[1].split("=")
                if(str[1][0] == "url"){
                    var id = str[1][1]
                    //白名单路由放过
                    Login({
                        type: 1,
                        uid: id,
                    }).then((res) => {
                        if (res.data.err_code == 0) {
                            let hasToken = getToken()
                            
                                localStorage.setItem('admin_messages',JSON.stringify(res.data.err_msg))
                                store.dispatch("user/login", { username: res.data.err_msg.name})
                                .then(() => {
                                    next({
                                        path: "/index",
                                    });
                                })
                                .catch((err) => {
                                    
                                });
                                
                            // }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    // next()
                }else{
                    
                }
            }
            

        }
        
    }else{
        NProgress.start()
        // 获取令牌判断用户是否登陆
        let hasToken = getToken()
        console.log(hasToken)
        // if(hasToken == undefined){
        //     hasToken = true
        // }
        // 有令牌 表示已经登陆
        if (hasToken) {

            if (to.path === '/login') {
                
                // 已登录重定向到首页
                next({ path: '/' })
            } else {

                //若用户角色已附加则说明动态路由已经添加
                const hasRoles = store.getters.roles && store.getters.roles.length > 0

                if (hasRoles) {
                    console.log('角色存在')
                    //角色存在
                    next() //继续即可
                } else {
                    try {
                        // 先请求获取用户角色 dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
                        // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
                        const { roles } = await store.dispatch('user/getInfo')

                        // 根据当前用户角色动态生成路由
                        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                        // 添加这些路由至路由器
                        router.addRoutes(accessRoutes)

                        // 继续路由切换,确保addRoutes完成
                        next({ ...to, replace: true })
                    } catch (error) {
                        // 出错需要重置令牌并重新登陆(令牌过期,网络错误等原因)
                        await store.dispatch('user/resetToken')
                        Message.error(error || "网络错误")
                        next(`/login?redirect=${to.path}`)
                    }
                }

            }
        } else {
            // 用户无令牌
            if (whiteList.indexOf(to.path) !== -1) {
                //白名单路由放过
                next()
            } else {
                // 重定向至登录页
                next(`/login?redirect=${to.path}`)
            }
        }
    }
    
    
})

router.afterEach(() => {
    NProgress.done()//进度条完成
})