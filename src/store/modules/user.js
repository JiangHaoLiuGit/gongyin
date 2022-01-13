import { getToken, setToken, removeToken } from '@/utils/auth'

// 令牌和角色信息
const state = { //存储状态  变量
    token: getToken(),
    roles: [], //角色
}

const mutations = { //提交修改 store.commit('SET_AGE', 18)
    SET_TOKEN: (state, token) => {
        state.token = token;
    },

    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
};

const actions = { //和mutations类似 不过actions支持异步操作 store.dispatch('nameAsyn')。
    // 用户登录
    login({ commit }, userInfo) { //this.$store.dispatch("user/login"
        console.log(userInfo)
        const { username } = userInfo;
        return new Promise((resolve) => {
            setTimeout(() => {
                // 保存状态
                commit('SET_TOKEN', username);
                // 写入cookie
                setToken(username)
                resolve()
            }, 1000)
        })
    },

    // 获取用户角色信息
    getInfo({ commit, state }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('9999999999999',state.token)
                const roles = state.token === 'admin' ? ['admin'] : ['admin']
                console.log(roles)
                commit('SET_ROLES', roles)
                resolve({ roles })
            }, 1000)
        })
    },

    // 重置令牌 退出登录
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken();
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}