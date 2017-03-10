<template>
    <div id="app">
        <!-- <header>
            <p class="cc-txt-center">
                <router-link :to="{name : 'home'}" exact>
                    <img src="./assets/logo.png" alt="VueJS logo">
                </router-link>
            </p>
        </header> -->

        <nav>
            <h3 class="cc-txt-center">Menu</h3>
            <ul>
                <li>
                    <router-link :to="{name : 'home'}" exact>
                        <i class="ion-android-home"></i>
                        <span>Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name : 'users'}">
                    <i class="ion-person-stalker"></i>
                        <span>Users</span>
                    </router-link>
                </li>
            </ul>
        </nav>

        <main>
            <transition :duration="{ enter: 600, leave: 300 }" name="fade" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
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
