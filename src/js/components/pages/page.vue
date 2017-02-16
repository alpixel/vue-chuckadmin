<template>
  <div>
    <h1 class="cc-txt-center">
      {{msg}} {{id}}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      msg: 'I am the page'
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
