import * as Api from './index'

export const getMenu = params => {

    return Api.GET('/static/menu.json', params)
}
export const getUserInfo = (params) => {
    return Api.GET('/static/user.json', params)
}
export const getUserList = (params) => {
    return Api.GET('/static/userlist.json', params)
}
export const login = (params) => {
    return Api.POST('/login', params)
}