//全局方法
export const local = {
    saveObjArr: function(name, data) { //localStorage 存储数组对象的方法
        localStorage.setItem(name, JSON.stringify(data))
    },
    getObjArr(name) { //localStorage 获取数组对象的方法
        return JSON.parse(window.localStorage.getItem(name));
    }
}
export const session = {
    saveObjArr: function(name, data) { //localStorage 存储数组对象的方法
        sessionStorage.setItem(name, JSON.stringify(data))
    },
    getObjArr(name) { //localStorage 获取数组对象的方法
        return JSON.parse(window.sessionStorage.getItem(name));
    }
}