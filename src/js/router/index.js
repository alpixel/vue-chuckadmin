import Vue from 'vue'
import VueRouter from 'vue-router'

// Import components
import home from '../components/home.vue'
import user from '../components/user/user.vue'
import userprofile from '../components/user/userprofile.vue'


Vue.use(VueRouter)

var routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/users',
        name: 'users',
        component: user
    },
    {
        path: '/users/edit/:id',
        name: 'user',
        component: userprofile,
        props : true
    }
];


export default new VueRouter({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {

        // In the exemple below, if the user change route, the new view scroll to 0,0 position (top of page)
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }

    }
});
