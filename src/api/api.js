import * as Api from './index'
import Axios from 'axios';

// 获取登录验证码
export const apiGetLoginPIN = (params) => {
    return Api.GET('/api/account/authcode', params)
};
// 用户登录
export const apiLogin = (params) => {
    return Api.POST('/api/Account/Login', params)
};
// 获取用户菜单
export const apiGetMenu = (params) => {
    return Api.POST('/api/home/menu', params)
};
// 获取日志列表
export const apiGetLogList = (params) => {
    return Api.GET('/api/Log/GetListJson', params)
};
// 获取日志详细信息
export const apiGetLogInfo = (params) => {
    return Api.GET2('/api/Log/Get', params)
};
// 保留日志信息
export const apiSaveLogInfo = (params) => {
    return Api.POST2('/api/Log/Delete', params)
};
//获取组织机构的列表
export const apiGetOrganizeList = (params) => {
    return Api.GET('/api/Organize/GetListJson', params)
};
//组织机构新增
export const apiGetOrganizeIncrease = (params) => {
    return Api.POST('/api/Organize/Create', params)
};
//组织机构修改拿数据
export const apiGetOrganizeReviseAll = (params) => {
    return Api.GET2('/api/Organize/Form', params)
};
//组织机构确定修改
export const apiGetOrganizeRevise = (params) => {
    return Api.POST('/api/Organize/Modify', params)
};
//组织机构删除
export const apiGetOrganizeDelete = (params) => {
    return Api.POST('/api/Organize/Delete', params)
};
