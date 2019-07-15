//test

export const token = state => {
    return state.token;
}
export const router = state => {
    if (state.router) {
        return state.router;
    } else {
        var router = null;
        var r = JSON.parse(sessionStorage.getItem('router'));
        if (r) {
            router = r;
        }
        state.router = router;
        return router;

    }

}

export const user = state => {
    if (state.user) {
        return state.user;
    } else {
        var user = null;
        var u = JSON.parse(sessionStorage.getItem("user"));
        if (u) {
            user = u;
        }
        state.user = user;
        return user;
    }

}