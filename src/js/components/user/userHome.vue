<template>
  <div>
    <h2 class="cc-txt-center">
      {{msg}} {{id}}
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
