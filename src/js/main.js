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
        component: require(viewPath + 'pages/page.vue')
    },
    {
        path: '/user/:id',
        name:'user',
        component: require(viewPath + 'user/user.vue'),
        children : [
            {
                path : '',
                name: 'user-home',
                component : require(viewPath + 'user/userHome.vue')
            },
            {
                path : 'profile',
                name: 'user-profile',
                component : require(viewPath + 'user/userProfile.vue')
            }
        ]
    }
];
var router = new VueRouter({
  routes: routes
});

// // push a new route
// router.push({
//     path: '/page2',
//     component: require(viewPath + 'pages/page2.vue')
// });


// ================
// VUE INSTANCE
// ================
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
