<template>
  <div>
    <h1 class="cc-txt-center">
      {{msg}} {{$route.params.id}}
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'User'
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to);
      // console.log(from);
    }
  }
}
</script>
