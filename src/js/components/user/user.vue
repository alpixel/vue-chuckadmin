<template>
  <div>
    <h1 class="cc-txt-center">
      {{msg}} {{id}}
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
  props : {
    id : Number
  },
  watch: {
    '$route' (to, from) {
      // console.log(to);
      // console.log(from);
    }
  }
}
</script>
