// NPM Packages
import Vue from 'vue'
import Vuex from 'vuex'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-ua'
import VueFlatpickr from 'vue-flatpickr'
import 'vue-flatpickr/theme/material_blue.css'
import router from './router.js'
import store from './store.js'

// ChuckCSS Framework, FontAwesome, Ionicons, fonts
import less from '../less/front.less'

// Custom Filters
import filters from './filters/filters.vue'

// Custom Directives
import './directives/directives.vue'


// Use Plugins
Vue.use(VueHead)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueCookie)
Vue.use(VueFlatpickr)
Vue.use(VueAnalytics, {
    appName: 'Vue-ChuckAdmin',
    appVersion: '1.0.0',
    trackingId: 'UA-9271946-13',
    debug: false,
    vueRouter: router
})


// Make the world better
const app = new Vue({
    store,
    router,
    render: h => h(require('./App.vue'))
}).$mount('#app');
