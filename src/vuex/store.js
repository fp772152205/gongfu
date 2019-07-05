import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)



// 应用初始状态
const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || '',
    router: [],
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    // 用户信息
    user(state, user) {
        var _user = localStorage.getItem('user');
        if (!_user) {
            localStorage.setItem("user", JSON.stringify(user));
            _user = JSON.parse(localStorage.getItem('user'));
        } else {
            _user = JSON.parse(_user);
        }
        state.user = _user;
    },
    // 用户token
    token(state, token) {
        localStorage.setItem("token", token);
        state.token = token;
    },
    // 用户权限路由
    router(state, router) {
        state.router = router;
    },
    // 退出登录
    logout(state) {
        state.token = '';
        state.user = null;
        localStorage.clear();

    },


}



// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})