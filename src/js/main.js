// NPM Packages
import Vue from 'vue'
// import Vuex from 'vuex'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'

// App spacific features
import less from '../less/front.less'
import router from './router.js'
import filters from './components/filters.vue'


// Vue.use(Vuex)
Vue.use(VueHead)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueCookie)


// ================
// VUE INSTANCE
// ================
const app = new Vue({
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app');
