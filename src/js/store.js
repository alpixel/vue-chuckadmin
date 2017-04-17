import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {

    // Does the user enabled/disabled tootlips ?
    showTooltips: false
}

const getters =  {
    isTooltipActive: state => {
        return state.showTooltips
    }
}

const mutations = {
    switchTooltips (state, payload) {
        state.showTooltips = !state.showTooltips
    }
}

const actions = {
    switchTooltips ({commit}) {
        commit('switchTooltips')
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
