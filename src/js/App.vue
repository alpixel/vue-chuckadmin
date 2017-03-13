<template>
    <div id="app">
        <header id="main-header">
            <div class="cc-inside">
                <div class="columns cc-align-center">
                    <div>
                        <router-link :to="{name : 'home'}" exact class="logo cc-primary">
                            ChuckCSS & VueJS Admin
                        </router-link>
                    </div>

                    <div class="cc-w-auto cc-right">

                        <router-link :to="{name : 'home'}"  class="user-box">
                            <!-- User img -->
                            <img src="http://lorempixel.com/40/40/animals" />

                            <!-- User name -->
                            <span>Jean-Jacques</span>
                        </router-link>
                    </div>

                    <div class="cc-w-auto">
                        <router-link :to="{name : 'home'}"  class="logout" title="Logout">
                            <i class="ionicons ion-ios-unlocked-outline"></i>
                        </router-link>

                    </div>
                </div>
            </div>
        </header>

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
                                <router-link :to="{name: 'news'}">
                                    <i class="ion-arrow-right-b"></i>
                                    <span>News</span>
                                </router-link>
                            </li>
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

        <main>
            <!-- General transition effect when changing page -->
            <transition :duration="{ enter: 600, leave: 300 }" name="fade" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <!-- Page container -->
                <router-view></router-view>
            </transition>            
        </main>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
            }
        }
    }
</script>
