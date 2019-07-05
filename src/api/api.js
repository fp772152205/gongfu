import * as Api from './index'

export default {
    // 获取权限菜单
    getMenu: params => {
        return Api.GET('/static/menu.json', params)
    },
    //获取用户信息
    getUserInfo: params => {
        return Api.GET('/static/user.json', params)
    }
}