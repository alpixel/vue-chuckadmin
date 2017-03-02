import Vue from 'vue'
import Less from '../less/front.less'
import App from './App.vue'
import router from './router'
import _ from 'lodash'

Vue.use(_);





// ================
// VUE INSTANCE
// ================
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
