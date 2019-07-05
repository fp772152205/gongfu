import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import axiosApi from '../src/api/api'
import Home from '@/views/Home'
import global_variable from './common/js/global_variable'
import { session } from './common/js/global_function';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.prototype.GLOBAL = global_variable; //设置全局变量
Vue.prototype.axiosApi = axiosApi; //设置全局axios




const router = new VueRouter({
    routes
})


var getRouter //用来获取后台拿到的路由
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        localStorage.removeItem('user');
    }
    let user = store.getters.user;
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        if (!getRouter) {
            if (store.state.router.length == 0) {
                axiosApi.getMenu().then(res => { //后台拿到路由
                    let data = res;
                    getRouter = processingPermissions(data, []);
                    store.commit('router', router);
                    routerGo(to, next)
                })
            } else {
                getRouter = store.state.router; //从store拿到了路由
                routerGo(to, next)
            }
        } else {
            next()
        }
    }
})

function routerGo(to, next) {
    router.addRoutes(getRouter);
    router.options.routes = getRouter; //动态添加路由

    global.Router = router //将路由数据传递给全局变量
    next({...to, replace: true })
}


// 配置菜单路由格式
function processingPermissions(datas, arr) {
    datas.forEach((data, index) => {
            if (!data.address) {}
            arr.push({
                path: !data.address ? '/' : data.address,
                name: data.title,
                component: getComponent(data.address),
                iconCls: data.icon,
            })
            if (data.children && data.children.length > 0) {
                let childArr = processingPermissions(data.children, []);
                arr[index].children = childArr;
            }
        })
        // arr.push({
        //     path: "*",
        //     redirect: '/404',
        //     hidden: true,
        // })
    return arr;
}

function getComponent(path) {
    if (!path) {
        return Home;
    } else {
        return () =>
            import (`@/views${path}.vue`)
    }
}


//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')