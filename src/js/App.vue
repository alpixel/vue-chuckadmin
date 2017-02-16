<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{msg}}</h1>

    <div class="alert alert-success">
      <i class="fa fa-thumbs-up"></i> Install success :) Good work dude!
    </div>
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
