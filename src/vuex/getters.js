//test

export const token = state => {
    if (state.token && state.token.length > 0) {
        return state.token;
    } else {
        var token = null;
        var r = sessionStorage.getItem('token');
        if (r) {
            token = r;
        }
        state.token = token;
        return token;

    }

}
export const router = state => {
    if (state.router && state.router.length > 0) {
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