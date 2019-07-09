import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)


// 应用初始状态
const state = {

    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: sessionStorage.getItem('token') || '',
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
        var _user = sessionStorage.getItem('user');
        if (!_user) {
            sessionStorage.setItem("user", JSON.stringify(user));
            _user = JSON.parse(sessionStorage.getItem('user'));
        } else {
            _user = JSON.parse(_user);
        }
        state.user = _user;
    },
    // 用户token
    token(state, token) {
        sessionStorage.setItem("token", token);
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
        sessionStorage.clear();

    },


}



// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})