export default file => {
    return map[file] || (() =>
        import ('../views/common/404.vue'));
}

const map = {
    "/": () =>
        import ('@/views/Home'),
    "organize": () =>
        import (`@/views/system/organize`),
    "log": () =>
        import ('@/views/system/log'),
    'module': () =>
        import ('@/views/system/module'),
    'user': () =>
        import ('@/views/user/list'),
    'role': () =>
        import ('@/views/user/role'),
    'bankcash': () =>
        import ('@/views/report/bankcash'),
    'accountinganalysis': () =>
        import ('@/views/report/accountinganalysis'),
    'costanalysis': () =>
        import ('@/views/report/costanalysis'),
    'subbudget': () =>
        import ('@/views/report/subbudget'),

}