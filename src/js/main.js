import Vue from 'vue'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import Vuelidate from 'vuelidate'
import less from '../less/front.less'
import App from './App.vue'
import router from './router'
import filters from './components/utils/filters.vue'




// Use plugin axios
Vue.use(VueHead)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)



// ================
// VUE INSTANCE
// ================
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
