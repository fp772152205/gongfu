//test

export const token = state => {
    return state.token;
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