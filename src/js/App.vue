<template>
    <div id="app">
        <header>
            <p class="cc-txt-center">
                <router-link :to="{name : 'home'}" exact>
                    <img src="./assets/logo.png" alt="VueJS logo">
                </router-link>
            </p>
        </header>

        <nav>
            <ul>
                <li>
                    <router-link :to="{name : 'home'}" exact>Home</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'page', params: {id: 1}}">Page 1</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'user-home', params: {id: 1}}">User 1</router-link>
                    <ul>
                        <li><router-link :to="{name : 'user-profile', params: {id: 1}}">User profil</router-link></li>
                    </ul>
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
