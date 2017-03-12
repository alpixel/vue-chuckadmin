import Vue from 'vue'
import VueRouter from 'vue-router'

// Import components

// Homepage - General Dashboard
import home from '../components/home.vue'

// Admins
import admins from '../components/admins/admins.vue'
import adminprofile from '../components/admins/admin-profile.vue'
import adminadd from '../components/admins/admin-add.vue'

// Users
import users from '../components/users/users.vue'
import userprofile from '../components/users/user-profile.vue'
import useradd from '../components/users/user-add.vue'

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


    // Admins
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
        path: '/admins/add',
        component: adminadd,
        name: 'admin-add'
    },

    // Users
    {
        path: '/users',
        component: users,
        name: 'users'
    },
    {
        path: '/users/edit/:id',
        component: userprofile,
        name: 'user-profile'
    },
    {
        path: '/users/add',
        component: useradd,
        name: 'user-add'
    },


    // Pages
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
