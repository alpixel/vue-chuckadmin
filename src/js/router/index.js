import Vue from 'vue'
import VueRouter from 'vue-router'

// Import components

// Homepage - General Dashboard
import home from '../components/home.vue'

// Users
import admins from '../components/user/admins.vue'
import adminprofile from '../components/user/admin-profile.vue'
import user from '../components/user/users.vue'
import userprofile from '../components/user/user-profile.vue'

// Pages
import news from '../components/pages/news.vue'
import cms from '../components/pages/cms.vue'


Vue.use(VueRouter)

var routes = [


    // Homepage
    {
        path: '/',
        name: 'home',
        component: home
    },


    // Users Dashboard
    // Users Dashboard
    {
        path: '/admins',
        component: admins,
        name: 'admins'
    },
    {
        path: '/admins/edit/:id',
        component: adminprofile,
        name: 'admin-profile'
    },
    {
        path: '/users',
        component: user,
        name: 'users'
    },
    {
        path: '/users/edit/:id',
        component: userprofile,
        name: 'user-profile'
    },


    // Pages Dashboard
    {
        path: '/pages/news',
        name: 'news',
        component: news
    },
    {
        path: '/pages/cms',
        name: 'cms',
        component: cms
    },
];


export default new VueRouter({
    mode: 'hash',
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
