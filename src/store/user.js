const key = 'user'
const user = {
    state() {
        return {
            user: null
        }
    },
    getters: {
        getUser: function (state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        }
    },
    mutations: {
        $_setStorage (state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeStorage (state) {
            state.user = null
            localStorage.removeItem(key)
        }
    },
    actions: {
        saveUserInfo({ commit }, data) {
            commit('$_setStorage', data)
        },
        clearUserInfo({ commit }) {
            commit('$_removeStorage');
        }
    }
};

export default user
