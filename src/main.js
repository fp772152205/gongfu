import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/main.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import 'font-awesome/css/font-awesome.min.css'
import Vuex from 'vuex'
import Fragment from 'vue-fragment'
import routes from './router/routes'
import routerComponent from './router/index'
import { apiGetMenu } from './api/api'
import global_variable from './common/js/global_variable'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Fragment.Plugin)

Vue.prototype.GLOBAL = global_variable; //设置全局变量

const router = new VueRouter({
    mode: 'history',
    base: '/',
    scorllBehavior: () => ({
        y: 0
    }),
    routes

})

var getRouter //用来接收后台拿到的路由
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        localStorage.removeItem('user');
        next()
    } else {
        let user = store.getters.user;
        if (!user && to.path != '/login') {
            next({ path: '/login' })
        } else {
            if (!getRouter) {
                // if (!store.getters.router || store.getters.router.length === 0) {
                apiGetMenu({}).then((res) => { //后台拿到路由
                        if (res.success) {
                            let data = res.data;
                            getRouter = processingPermissions(data, []);
                            //getRouter = GenerateRoutes(data)
                            store.commit('router', getRouter);
                            routerGo(to, next);
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    // } else {
                    //     getRouter = store.state.router; //从store拿到了路由
                    //     routerGo(to, next);
                    // }
            } else {
                next()
            }
        }
    }

})



function routerGo(to, next) {
    var arr = router.options.routes.concat(getRouter);
    arr.push({
        path: "*", // 此处需特别注意置于最底部
        redirect: { name: "404" },
        hidden: true,
    });
    router.options.routes = arr; //动态添加路由
    router.addRoutes(arr);
    global.Router = router;
    next({...to, replace: true })
}

// 配置菜单路由格式
function processingPermissions(datas, arr) {
    datas.forEach((data, index) => {
        if (!data.name) {
            data.name = "/";
        } else {
            data.name = data.name.toLowerCase();
        }
        arr.push({
            path: data.name === "/" ? data.name : "/" + data.name,
            name: data.title,
            component: routerComponent(data.name),
            iconCls: data.icon,
        })
        if (data.children && data.children.length > 0) {
            let childArr = processingPermissions(data.children, []);
            arr[index].children = childArr;
        }
    })
    return arr;
}

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')