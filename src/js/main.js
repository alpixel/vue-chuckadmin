import Vue from 'vue'
import Less from '../less/front.less';
import App from './App.vue'
import VueRouter from 'vue-router'


// ================
// ROUTES
// ================
Vue.use(VueRouter)
var viewPath = './components/';
var routes = [
  { path: '/', component: require(viewPath + 'home.vue')},
  { path: '/page1', component: require(viewPath + 'page1.vue')}
];
var router = new VueRouter({
  routes: routes
});


// ================
// VUE INSTANCE
// ================
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
