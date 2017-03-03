<template>
    <div id="app">
        <header>
            <p class="cc-txt-center">
                <router-link :to="{name : 'home'}" exact>
                    <img src="dist/logo.png" alt="VueJS logo">
                </router-link>
            </p>
        </header>

        <h1 class="cc-txt-center">{{msg}}</h1>

        <nav class="cc-mat-30 cc-mab-30">
            <ul class="tabs cc-underlined cc-align-center">
                <li>
                    <router-link :to="{name : 'home'}" exact>Home</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'users'}">Users</router-link>
                </li>
            </ul>
        </nav>

        <main>
            <!-- <transition name="fade" mode="out-in"> -->
                <router-view></router-view>
            <!-- </transition> -->
        </main>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>
