<template>
  <div>
    <h2 class="cc-txt-center">
      {{msg}} {{$route.params.id}}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'userHome',
  data () {
    return {
      msg: 'Homepage of user'
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
