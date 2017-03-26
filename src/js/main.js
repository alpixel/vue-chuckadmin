// NPM Packages
import Vue from 'vue'
// import Vuex from 'vuex'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-ua'

// App specific features
import less from '../less/front.less'
import router from './router.js'
import filters from './components/filters.vue'



// Vue.use(Vuex)
Vue.use(VueHead)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueCookie)

Vue.use(VueAnalytics, {
    appName: 'Vue-ChuckAdmin',
    appVersion: '1.0.0',
    trackingId: 'UA-9271946-13',
    debug: false, 
    vueRouter: router
})

// ================
// VUE INSTANCE
// ================
const app = new Vue({
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app');
