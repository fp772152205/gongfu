import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions' //异步更改数据
import * as getters from './getters' //获取数据

Vue.use(Vuex)


// 应用初始状态
const state = {
    user: JSON.parse(sessionStorage.getItem('user')) || null, //拿到的是json字符串成js对象
    token: sessionStorage.getItem('token') || '', //token是对象
    router: [],
}

// 定义所需的 mutations  同步更改全局数据
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    // 用户信息
    user(state, user) {
        var _user = sessionStorage.getItem('user'); //获取对象
        if (!_user) {
            sessionStorage.setItem("user", JSON.stringify(user)); //转字符串
            _user = JSON.parse(sessionStorage.getItem('user')); //转js对象
        } else {
            _user = JSON.parse(_user);  //转js对象
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
        sessionStorage.setItem('router', router)
    },
    // 退出登录
    logout(state) {
        state.token = '';
        state.user = null;
        state.router = [];
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