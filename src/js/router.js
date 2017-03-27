import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes = [
    // Homepage + login
    {
        path: '/',
        name: 'home',

        // Chargement synchrone du composant de webpack
        component: require('./views/dashboard/dashboard.vue')

        // ... OU ...

        // Chargement asynchrone du composant de webpack
        // component: resole => require(['./views/dashboard/dashboard.vue'], resolve)
    },

    // Admins
    {
        path: '/admins',
        component: require('./views/persons/admins/admins.vue'),
        // component: resolve => require(['./views/persons/admins/admins.vue'], resolve),
        name: 'admins'
    },
    {
        path: '/admins/edit/:id',
        component: require('./views/persons/admins/admin-profile.vue'),
        // component: resolve => require(['./views/persons/admins/admin-profile.vue'], resolve),
        name: 'admin-profile'
    },

    // Users
    {
        path: '/users',
        component: require('./views/persons/users/users.vue'),
        // component: resolve => require(['./views/persons/users/users.vue'], resolve),
        name: 'users'
    },
    {
        path: '/users/edit/:id',
        component: require('./views/persons/users/user-profile.vue'),
        // component: resolve => require(['./views/persons/users/user-profile.vue'], resolve),
        name: 'user-profile'
    },
    {
        path: '/users/add',
        component: require('./views/persons/users/user-add.vue'),
        // component: resolve => require(['./views/persons/users/user-add.vue'], resolve),
        name: 'user-add'
    },

    // Pages
    {
        path: '/pages/news',
        name: 'news',
        component: require('./views/pages/news/news.vue')
        // component: resolve => require(['./views/pages/news.vue'], resolve)
    },
    {
        path: '/pages/cms',
        name: 'cms',
        component: require('./views/pages/cms/cms.vue')
        // component: resolve => require(['./views/pages/cms.vue'], resolve)
    },

    // 404 -> redirect to Dashboard
    {
        path: '*',
        redirect: '/'
    }
]

var router = new VueRouter({
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
})

export default router
