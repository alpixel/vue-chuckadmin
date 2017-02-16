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
    {
        path: '/',
        name: 'home',
        component: require(viewPath + 'home.vue')
    },
    {
        path: '/page/:id',
        name:'page',
        component: require(viewPath + 'pages/page.vue'),
        props : true
    },
    {
        path: '/user/:id',
        name:'user',
        component: require(viewPath + 'user/user.vue'),
        props: true,
        children : [
            {
                path: '',
                name: 'user-home',
                component: require(viewPath + 'user/userHome.vue'),
                props: true
            },
            {
                path: 'profile',
                name: 'user-profile',
                component: require(viewPath + 'user/userProfile.vue'),
                props: true
            }
        ]
    }
];
var router = new VueRouter({
  routes: routes
});



// ================
// VUE INSTANCE
// ================
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
