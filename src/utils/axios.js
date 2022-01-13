import axios from 'axios'
import Qs from 'qs'
import store from '../store/index'
import router from '../router/index'
import publicFile from '../utils/publicFile'

import {
	Message
} from 'element-ui'

axios.defaults.baseURL = publicFile.address
axios.defaults.timeout = publicFile.overTime
// axios.defaults.withCredentials=true;

// 添加请求拦截器
// http request 拦截器
axios.interceptors.request.use(config => {
		if (store.state.user.token) {
			if(config.url == 'store_admin.php?c=public&a=upload' || config.url == 'store_admin.php?c=public&a=uploadfiles') {
				config.headers['Content-Type'] = `multipart/form-data`
				
			}
			// 判断是否存在token，如果存在的话，则每个http header都加上token
			// content-type: application/x-www-form-urlencoded
			config.headers['content-type'] = "application/x-www-form-urlencoded"
			config.headers['Authorization'] = `Bearer ${encodeURIComponent(store.state.user.token)}`
		}
		return config
	},
	err => {
		Message({
			message: err.message,
			type: 'error'
		})
		return Promise.reject(err)
	}
)

// 登出
export const quit = params => {
	return axios.post(`store_admin.php?c=login&a=logout`, Qs.stringify(params))
}

// http response 拦截器
let that = this
axios.interceptors.response.use(response => {
	if(response.data.err_code == 1001 && response.data.err_msg.indexOf("重新登录") != -1){
		Message.closeAll()
		Message({
			message: "登录失效，请重新登录",
			type: 'error'
		})
		// 清除token信息并跳转到登录页面
		quit().then((res) => {
			console.log(res);
			if (res.data.err_code == 0) {
				store.dispatch("user/resetToken");
				router.replace("/login");
				// router.push('/login')
			} else {
				
			}
		}).catch((error) => {
			console.log(error);
		});
	}
  	// if (response.data.code === 30006) {
    //   // 清除token信息并跳转到登录页面
    //   store.commit('logOut')
    //   that.$router.push('/login')
    // }
    return response
  },
  err => {
    Message({
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
)

// 以下都是接口

//全局模块
// 登录
export const Login = params => {
	return axios.post(`store_admin.php?c=login&a=login`, Qs.stringify(params))
}

//地址管理
//地址列表
export const address_list = params => {
	return axios.post(`store_admin.php?c=return_address&a=address_list`, Qs.stringify(params))
}

//地址列表-添加
export const address_add = params => {
	return axios.post(`store_admin.php?c=return_address&a=address_add`, Qs.stringify(params))
}

//地址列表-修改
export const address_edit = params => {
	return axios.post(`store_admin.php?c=return_address&a=address_edit`, Qs.stringify(params))
}

//地址列表-删除
export const address_del = params => {
	return axios.post(`store_admin.php?c=return_address&a=address_del`, Qs.stringify(params))
}

//地址列表-删除
export const set_default = params => {
	return axios.post(`store_admin.php?c=return_address&a=set_default`, Qs.stringify(params))
}


//—获取省
export const get_province = params => {
	return axios.post(`store_admin.php?c=public&a=get_province`, Qs.stringify(params))
}

//获取市
export const get_city = params => {
	return axios.post(`store_admin.php?c=public&a=get_city`, Qs.stringify(params))
}

//获取区
export const get_area = params => {
	return axios.post(`store_admin.php?c=public&a=get_area`, Qs.stringify(params))
}

//提现明细
export const store_withdrawal_list = params => {
	return axios.post(`store_admin.php?c=finance&a=store_withdrawal_list`, Qs.stringify(params))
}

//提现明细
export const order_tran_details = params => {
	return axios.post(`store_admin.php?c=finance&a=order_tran_details`, Qs.stringify(params))
}




//商品管理
//商品三级分类
export const goods_get_cate = params => {
	return axios.post(`store_admin.php?c=public&a=get_cate`, Qs.stringify(params))
}


//商品列表
export const goods_list = params => {
	return axios.post(`store_admin.php?c=product&a=product_list`, Qs.stringify(params))
}

//商品列表-下架
export const off_shelf = params => {
	return axios.post(`store_admin.php?c=product&a=product_status`, Qs.stringify(params))
}


//商品列表-商品发布
export const goods_add = params => {
	return axios.post(`store_admin.php?c=product&a=product_add`, Qs.stringify(params))
}

//商品列表-商品发布中需要的参数与sku模板
export const param_list = params => {
	return axios.post(`store_admin.php?c=product&a=param_list`, Qs.stringify(params))
}

//商品发布-添加销售属性名称
export const property_name = params => {
	return axios.post(`store_admin.php?c=product&a=property_name`, Qs.stringify(params))
}

//商品发布-添加销售属性值
export const property_value = params => {
	return axios.post(`store_admin.php?c=product&a=property_value`, Qs.stringify(params))
}

//商品发布-删除销售属性名称
export const property_name_del = params => {
	return axios.post(`store_admin.php?c=product&a=property_name_del`, Qs.stringify(params))
}

//商品发布-删除销售属性值
export const property_value_del = params => {
	return axios.post(`store_admin.php?c=product&a=property_value_del`, Qs.stringify(params))
}

//商品编辑
export const goods_edit = params => {
	return axios.post(`store_admin.php?c=product&a=product_edit`, Qs.stringify(params))
}


//商品分类-属性组列表
export const group_list = params => {
	return axios.post(`store_admin.php?c=product&a=group_list`, Qs.stringify(params))
}


//商品规格改价
export const save_price = params => {
	return axios.post(`store_admin.php?c=product&a=product_price`, Qs.stringify(params))
}

//获取商品规格
export const goods_info = params => {
	return axios.post(`store_admin.php?c=product&a=product_sku_list`, Qs.stringify(params))
} 

//获取商品详情
export const goods_info_product = params => {
	return axios.post(`store_admin.php?c=product&a=product_info`, Qs.stringify(params))
}

//运费列表
export const tpl_list = params => {
	return axios.post(`store_admin.php?c=postage_template&a=postage_list`, Qs.stringify(params))
}

//运费列表-详情
export const postage_tpl = params => {
	return axios.post(`store_admin.php?c=postage_template&a=postage_info`, Qs.stringify(params))
}

//新增运费模板
export const add_postage_tpl = params => {
	return axios.post(`store_admin.php?c=postage_template&a=postage_add`, Qs.stringify(params))
}

//编辑运费模板
export const save_postage_tpl = params => {
	return axios.post(`store_admin.php?c=postage_template&a=postage_update`, Qs.stringify(params))
}

//删除运费模板(可批量删除) 
export const postage_del = params => {
	return axios.post(`store_admin.php?c=postage_template&a=postage_del`, Qs.stringify(params))
}

//订单管理
//订单列表
export const order_list = params => {
	return axios.post(`store_admin.php?c=order&a=lst`, Qs.stringify(params))
}
//订单列表
// export const logistics = params => {
// 	return axios.post(`store_admin.php?c=order&a=logistics_save`, Qs.stringify(params))
// }

//订单列表
export const address_log = params => {
	return axios.post(`store_admin.php?c=order&a=address_log`, Qs.stringify(params))
}


//订单列表-订单详情
export const order_info = params => {
	return axios.post(`store_admin.php?c=order&a=order_info`, Qs.stringify(params))
}
//订单列表-订单详情
export const order_agree = params => {
	return axios.post(`store_admin.php?c=order&a=set_address`, Qs.stringify(params))
}

//订单列表-发货 获取未发货列表
export const order_product = params => {
	return axios.post(`store_admin.php?c=order&a=order_deliver_info`, Qs.stringify(params))
}

//订单列表-物流公司
export const express_list = params => {
	return axios.post(`store_admin.php?c=public&a=express`, Qs.stringify(params))
}

//订单列表-物流查询-供应商!!!
export const get_express = params => {
	return axios.post(`store_admin.php?c=order&a=get_express`, Qs.stringify(params))
}


//订单列表-发货
export const deliver = params => {
	return axios.post(`store_admin.php?c=order&a=deliver`, Qs.stringify(params))
}

//售后列表
export const refund_list = params => {
	return axios.post(`store_admin.php?c=return&a=return_list`, Qs.stringify(params))
}

//退款详情
export const refund_info = params => {
	return axios.post(`store_admin.php?c=return&a=return_info`, Qs.stringify(params))
}
//退款处理详情
export const return_order_info = params => {
	return axios.post(`store_admin.php?c=return&a=order_info`, Qs.stringify(params))
}
//虚拟发货
export const invented_deliver = params => {
	return axios.post(`store_admin.php?c=order&a=invented_deliver`, Qs.stringify(params))
}


//拒绝退款
export const refuse_apply = params => {
	return axios.post(`store_admin.php?c=return&a=return_refuse`, Qs.stringify(params))
}

//填写买家退货运单号
export const return_express = params => {
	return axios.post(`store_admin.php?c=return&a=fillout_order_sn`, Qs.stringify(params))
}

//同意退货地址信息
export const refuse_agree = params => {
	return axios.post(`store_admin.php?c=return&a=agree_stock`, Qs.stringify(params))
}
// //同意退款
// export const agree_refund = params => {
// 	return axios.post(`store_admin.php?c=return&a=return_agree`, Qs.stringify(params))
// }


//获取默认地址
export const default_address = params => {
	return axios.post(`store_admin.php?c=return&a=default_address_v1`, Qs.stringify(params))
}

//上传图片
export const upload_img = params => {
	return axios.post(`store_admin.php?c=public&a=upload`, params)
}

//修改订单物流（快递号，物流公司
export const logistics = params => {
	return axios.post(`store_admin.php?c=order&a=logistics_save`, Qs.stringify(params))
}

//上传文件
export const uploadfiles = params => {
	return axios.post(`store_admin.php?c=public&a=uploadfiles`, params)
}

//多图片上传
export const uploadImages = params => {
	return axios.post(`store_admin.php?c=public&a=uploadImages`, params)
}

//同意退款
export const return_agree = params => {
	return axios.post(`store_admin.php?c=return&a=agree`, Qs.stringify(params))
}

//客服IM登陆
export const kf_im_login = params => {
	return axios.post(`new_app.php?c=chat&a=kf_im_login`, Qs.stringify(params))
}

//用户绑定客服 
export const bind_kf = params => {
	return axios.post(`new_app.php?c=chat&a=bind_kf`, Qs.stringify(params))
}
//订单管理-获取快递公司
// export const get_express_jvbao = params => {
//     return axios.post(`store_admin.php?c=public&a=express`, Qs.stringify(params))
// }

//客服

//客服设置

export const save_kf_config = params => {
	return axios.post(`store_admin.php?c=chat&a=save_kf_config`, Qs.stringify(params))
}
export const kf_config = params => {
	return axios.post(`store_admin.php?c=chat&a=kf_config`, Qs.stringify(params))
}


//客服工作台
//客服请求用户消息列表
export const ask_get_list = params => {
	return axios.post(`store_admin.php?c=chat&a=get_lst`, Qs.stringify(params))
}

//客服请求用户聊天数据
export const get_chat_record = params => {
	return axios.post(`store_admin.php?c=chat&a=get_chat_record`, Qs.stringify(params))
}

//客服会话结束
export const redis_sql = params => {
	return axios.post(`store_admin.php?c=chat&a=redis_sql`, Qs.stringify(params))
}

//客服发消息
export const add_chat_record = params => {
	return axios.post(`store_admin.php?c=chat&a=add_chat_record`, Qs.stringify(params))
}

//客服设置在线不在线
export const set_online = params => {
	return axios.post(`store_admin.php?c=chat&a=set_online`, Qs.stringify(params))
}

//客服常用语
export const set_useful = params => {
	return axios.post(`store_admin.php?c=chat&a=useful_list`, Qs.stringify(params))
}

export const add_useful = params => {
	return axios.post(`store_admin.php?c=chat&a=add_useful`, Qs.stringify(params))
}
export const update_useful = params => {
	return axios.post(`store_admin.php?c=chat&a=update_useful`, Qs.stringify(params))
}
export const del_useful = params => {
	return axios.post(`store_admin.php?c=chat&a=del_useful`, Qs.stringify(params))
}

//订单管理-获取快递公司
export const get_express_jvbao = params => {
	return axios.post(`store_admin.php?c=public&a=express`, Qs.stringify(params))
}

//获取用户信息
export const user_info = params => {
	return axios.post(`store_admin.php?c=chat&a=user_info`, Qs.stringify(params))
}

//获取订单信息
export const order_search = params => {
	return axios.post(`store_admin.php?c=chat&a=order_search`, Qs.stringify(params))
}
//获取订单信息
export const get_duration = params => {
	return axios.post(`store_admin.php?c=chat&a=get_duration`, Qs.stringify(params))
}

//添加订单备注
export const order_bak = params => {
	return axios.post(`store_admin.php?c=order&a=order_bak`, Qs.stringify(params))
}

//获取查询历史对话
export const chat_search = params => {
	return axios.post(`store_admin.php?c=chat&a=chat_search`, Qs.stringify(params))
}

//获取查询历史对话分页
export const history_record_search = params => {
	return axios.post(`store_admin.php?c=chat&a=history_record`, Qs.stringify(params))
}

//订单发货修改买家收货地址
export const set_addre = params => {
	return axios.post(`store_admin.php?c=order&a=set_address`, Qs.stringify(params))
}

//店铺装修

//轮播列表
export const banner_list = params => {
	return axios.post(`store_admin.php?c=banner&a=banner_list`, Qs.stringify(params))
}
//添加轮播
export const banner_add = params => {
	return axios.post(`store_admin.php?c=banner&a=banner_add`, Qs.stringify(params))
}
//轮播详情
export const banner_info = params => {
	return axios.post(`store_admin.php?c=banner&a=banner_info`, Qs.stringify(params))
}
//修改轮播
export const banner_update = params => {
	return axios.post(`store_admin.php?c=banner&a=banner_update`, Qs.stringify(params))
}
//排序
export const store_sort = params => {
	return axios.post(`store_admin.php?c=banner&a=store`, Qs.stringify(params))
}
//更改状态
export const is_state = params => {
	return axios.post(`store_admin.php?c=banner&a=is_state`, Qs.stringify(params))
}
//删除轮播
export const banner_del = params => {
	return axios.post(`store_admin.php?c=banner&a=del`, Qs.stringify(params))
}

//商品分组管理
//添加分组
export const cate_add = params => {
	return axios.post(`store_admin.php?c=category&a=cate_add`, Qs.stringify(params))
}

//分组详情
export const cate_info = params => {
	return axios.post(`store_admin.php?c=category&a=cate_info`, Qs.stringify(params))
}

//编辑分组
export const cate_update = params => {
	return axios.post(`store_admin.php?c=category&a=cate_update`, Qs.stringify(params))
}

//分组商品管理

//添加商品
export const product_add = params => {
	return axios.post(`store_admin.php?c=product_relation&a=product_add`, Qs.stringify(params))
}
//删除商品
export const product_del = params => {
	return axios.post(`store_admin.php?c=product_relation&a=product_del`, Qs.stringify(params))
}
//商品列表
export const prouct_list = params => {
	return axios.post(`store_admin.php?c=product_relation&a=prouct_list`, Qs.stringify(params))
}
//排序
export const set_sort = params => {
	return axios.post(`store_admin.php?c=product_relation&a=set_sort`, Qs.stringify(params))
}

//首页装修

//店铺基础装修详情
export const basics_info = params => {
	return axios.post(`store_admin.php?c=fitment&a=basics_info`, Qs.stringify(params))
}
//店铺基础装修 修改
export const basics_update = params => {
	return axios.post(`store_admin.php?c=fitment&a=basics_update`, Qs.stringify(params))
}

//分类分组列表
export const cate_group_list = params => {
	return axios.post(`store_admin.php?c=category&a=cate_group_list`, Qs.stringify(params))
}

//分类分组添加
export const cate_group_add = params => {
	return axios.post(`store_admin.php?c=category&a=cate_group_add`, Qs.stringify(params))
}






//营销分类列表
export const categroup_list = params => {
	return axios.post(`store_admin.php?c=category&a=cate_list`, Qs.stringify(params))
}
//营销分类启用/禁用
export const market_status = params => {
	return axios.post(`store_admin.php?c=category&a=cate_state`, Qs.stringify(params))
}

//分组装修 列表
export const category_list = params => {
	return axios.post(`store_admin.php?c=fitment&a=category_list`, Qs.stringify(params))
}

//分组装修 添加
export const category_add = params => {
	return axios.post(`store_admin.php?c=fitment&a=category_add`, Qs.stringify(params))
}

//分组装修 编辑
export const category_update = params => {
	return axios.post(`store_admin.php?c=fitment&a=category_update`, Qs.stringify(params))
}

//分组装修 删除
export const category_del = params => {
	return axios.post(`store_admin.php?c=fitment&a=category_del`, Qs.stringify(params))
}

//分组装修 详情
export const category_info = params => {
	return axios.post(`store_admin.php?c=fitment&a=category_info`, Qs.stringify(params))
}

//分组装修 详情
export const order_bak_list = params => {
	return axios.post(`store_admin.php?c=order&a=order_bak_list`, Qs.stringify(params))
}

