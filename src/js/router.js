import Vue from 'vue'
import VueRouter from 'vue-router'

// Import components

// Homepage - General Dashboard
import home from './views/dashboard/dashboard.vue'

// Admins
import admins from './views/persons/admins/admins.vue'
import adminprofile from './views/persons/admins/admin-profile.vue'
import adminadd from './views/persons/admins/admin-add.vue'

// Users
import users from './views/persons/users/users.vue'
import userprofile from './views/persons/users/user-profile.vue'
import useradd from './views/persons/users/user-add.vue'

// Pages
import news from './views/pages/news.vue'
import cms from './views/pages/cms.vue'


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
    // {
    //     path: '/admins/add',
    //     component: adminadd,
    //     name: 'admin-add'
    // },

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
