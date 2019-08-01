import Home from '@/views/Home'
import Login from '@/views/common/login'
import NotFound from '@/views/common/404'
import Main from '@/views/common/main'
import Profile from '@/views/user/profile'
import ChangePwd from '@/views/user/changepwd'

let routes = [{
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true
    },
    {
        path: "/404",
        name: "404",
        hidden: true,
        component: NotFound
    },
    {
        path: "/403",
        name: "403",
        hidden: true,
        component: () =>
            import ('@/views/common/403'),
    },
    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        leaf: true,
        name: '',
        children: [{
            path: '/main',
            component: Main,
            name: '首页',

        }, ]
    },
    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        name: '基础组件',
        children: [{
                path: '/table',
                component: () =>
                    import ('@/views/common/table'),
                name: '列表',

            },
            {
                path: '/form',
                component: () =>
                    import ('@/views/common/form'),
                name: '表单'
            },
            {
                path: '/upload',
                component: () =>
                    import ('@/views/common/upload'),
                name: '上传'
            }
        ]
    },

    {
        path: '/',
        iconCls: 'el-icon-message', //图标样式class
        component: Home,
        hidden: true,
        name: '公共',
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
    },
];

export default routes;