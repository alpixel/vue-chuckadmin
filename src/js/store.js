// EXEMPLE FOR TESTS 

// Vuex IS NOT USED IN THIS PROJECT



import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isLogged: false
}

const getters =  {
    isLogged: state  => state.isLogged
}

const mutations = {
    LOG_USER(state) {
        state.isLogged = true
    },
    UNLOG_USER(state)  {
        state.isLogged = false
    }
}

const actions = {
    logUser: ({commit}) => {
        commit('LOG_USER')
    },
    unlogUser: ({commit}) => {
        commit('UNLOG_USER')
    }
}


let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict : process.env.NODE_ENV !== 'production'
})


global.store = store

export default store