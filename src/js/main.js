import Vue from 'vue'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import less from '../less/front.less'
import App from './App.vue'
import router from './router'
import filters from './components/utils/filters.vue'



// Use plugin axios
Vue.use(VueHead)
Vue.use(VueAxios, axios)




// ================
// VUE INSTANCE
// ================
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
