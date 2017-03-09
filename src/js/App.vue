<template>
    <div id="app">
        <!-- <header>
            <p class="cc-txt-center">
                <router-link :to="{name : 'home'}" exact>
                    <img src="./assets/logo.png" alt="VueJS logo">
                </router-link>
            </p>
        </header> -->

        <div class="columns">
            <nav class="cc-3">
                <ul>
                    <li>
                        <router-link :to="{name : 'home'}" class="fa-home" exact>Dashboard</router-link>
                    </li>
                    <li>
                        <router-link :to="{name : 'users'}" class="fa-users" >Users</router-link>
                    </li>
                </ul>
            </nav>

            <main>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </main>
        </div>
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
