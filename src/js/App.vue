<template>
    <div id="vue-chuckadmin" v-cloak>
        <div class="cc-loader" v-if="loading">
            <div class="spinner"></div>
        </div>

        <div v-else>

            <div v-if="isLogged">

                <!-- App MAIN HEADER -->
                <app-header :loggedUser="loggedUser" @logout="logout"></app-header>

                <!-- App MAIN NAV -->
                <nav>
                    <div class="cc-inside">
                        <ul>
                            <li>
                                <router-link to="/" exact>
                                    <i class="ion-android-home"></i>
                                    <span>Dashboard</span>
                                </router-link>
                            </li>
                            <li>
                                <h3>
                                    <i class="ion-person-stalker"></i>
                                    Persons
                                </h3>
                                <ul>
                                    <li>
                                        <router-link :to="{name:'admins'}">
                                            <i class="ion-arrow-right-b"></i>
                                            <span>Administrators</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'users'}">
                                            <i class="ion-arrow-right-b"></i>
                                            <span>Users</span>
                                        </router-link>

                                        <ul>
                                            <li>
                                                <router-link :to="{name:'users'}">
                                                    <i class="ion-arrow-right-b"></i>
                                                    <span>Users list</span>
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{name:'user-add'}">
                                                    <i class="ion-arrow-right-b"></i>
                                                    <span>Add a user</span>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <h3>
                                    <i class="ion-android-folder"></i>
                                    Pages
                                </h3>

                                <ul>
                                    <li>
                                        <router-link :to="{name: 'cms'}">
                                            <i class="ion-arrow-right-b"></i>
                                            <span>CMS</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!-- App MAIN CONTENT -->
                <main>
                    <!-- General transition effect when changing page -->
                    <transition :duration="{ enter: 600, leave: 30 }" name="fade" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

                        <!-- Page container -->
                        <router-view></router-view>

                    </transition>
                </main>

            </div><!-- end/ v-if logged -->


            <div v-else class="login-form">
                <login-form @login="login"></login-form>
            </div><!-- end/ v-if not logged -->

        </div><!-- end/ v-if not loading -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import appHeader from './components/header.vue'
    import loginForm from './components/login-form.vue'

    const api = 'src/js/fakeapi/login.json'

    export default {
        name: 'app',
        data () {
            return {
                loggedUser: {},
                isLogged: false,
                loading: true
            }
        },
        created () {
            // check cookie for auto-login user
            this.checkCookie()
        },
        methods: {
            // Logout method
            logout() {
                // Empty this.loggedUser object
                this.loggedUser = {}

                // Set this.isLogged to false
                this.isLogged = false

                // Delete Cookie
                this.$cookie.delete('appLogged')

                // Go to Login page
                this.$router.push('/')
            },

            // Login method
            login(user) {

                if(!_.isEmpty(user)) {

                    // Fill this.loggedUser
                    this.loggedUser = user

                    // Set this.logged to true
                    this.isLogged = true

                } else {

                    // Set this.isLogged to false
                    this.isLogged = false

                    // Empty this.loggedUser
                    this.loggedUser = {}

                }
            },

            // Check if cookie exists
            checkCookie() {

                // If cookie exists, get user datas
                if(this.$cookie.get('appLogged'))  {

                    Vue.axios.get(api, {
                        // params
                    }).then(response => {

                        if(response.data.error || this.$cookie.get('appLogged') != response.data.token) {

                            // Error during login, logout the user
                            this.logout()

                        } else {

                            // Fill this.loggedUser with user datas
                            this.loggedUser = response.data

                            // Set this.isLogged to true
                            this.isLogged = true
                        }


                    }).catch(error => {

                        // Error when parsing json file, logout the user
                        this.logout()
                    })


                } else {
                    this.logout()
                }

                // Remove loading
                this.loading = false
            }
        },
        components: {
            appHeader,
            loginForm
        }
    }
</script>
