<template>
    <div id="app">
        <header>
            <!-- <p class="cc-txt-center">
                <router-link :to="{name : 'home'}" exact>
                    <img src="./assets/logo.png" alt="VueJS logo">
                </router-link>
            </p> -->
            <div class="columns">
                <div>Admin</div>
                <div>
                    coucou
                </div>
            </div>
        </header>

        <nav>
            <h3>Navigation</h3>
            
            <ul>
                <li>
                    <router-link to="/" exact>
                        <i class="ion-android-home"></i>
                        <span>Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'users'}">
                        <i class="ion-person-stalker"></i>
                        <span>Users</span>
                    </router-link>
                </li>

                <li>
                    <router-link :to="{name: 'pages'}">
                        <i class="ion-android-folder"></i>
                        <span>Pages</span>
                    </router-link>

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
