import Vue from 'vue'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'
import less from '../less/front.less'
import router from './router.js'
import filters from './components/filters.vue'



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
