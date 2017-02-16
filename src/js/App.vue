<template>
    <div id="app">
        <header>
            <p class="cc-txt-center">
                <img src="./assets/logo.png" alt="VueJS logo">
            </p>
        </header>

        <nav>
            <ul>
                <li>
                    <router-link :to="{name : 'home'}" exact>Home</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'page', params: {id: 1}}" exact>Page 1</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'user-home', params: {id:1}}" exact>User</router-link>
                    <ul>
                        <li><router-link :to="{name : 'user-profile', params: {id:1}}" exact>User profil</router-link></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <main>
            <router-view></router-view>
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
