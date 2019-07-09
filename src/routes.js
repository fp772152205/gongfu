import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Profile from './views/user/profile.vue'
import ChangePwd from './views/user/changepwd.vue'
import { homedir } from 'os';

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        hidden: true,
        name: '首页',
        children: [{
            path: '/main',
            component: Main,
            name: '主页',

        }, ]
    },
    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        hidden: true,
        name: '首页',
        children: [{
            path: '/main',
            component: Main,
            name: '主页',

        }, ]
    },

    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        hidden: true,
        name: '首页',
        children: [{
                path: '/user/profile',
                component: Profile,
                name: '个人信息',

            },
            {
                path: '/user/changepwd',
                component: ChangePwd,
                name: '修改密码',

            },
        ]
    }


];


export default routes;