<template>
    <div id="app">
        <header>
            <p class="cc-txt-center">
                <img src="./assets/logo.png" alt="VueJS logo">
            </p>
        </header>

        <nav>
            <ul>
                <router-link to="/" tag="li">Home</router-link>
                <router-link to="/page1" tag="li">Page 1</router-link>
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
