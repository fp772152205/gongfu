//test

export const token = state => {
    return state.token;
}

export const user = state => {
    debugger
    if (state.user && Object.keys(state.user).length > 0) {
        return state.user;
    } else {

        var user = null;
        var u = JSON.parse(localStorage.getItem("user"));
        if (u) {
            user = u;
        }
        state.user = user;
        return user;
    }

}