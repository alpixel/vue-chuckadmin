<template>
  <div>
    <h1 class="cc-txt-center">
      {{msg}} {{$route.params.id}}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'page1',
  data () {
    return {
      msg: 'I am the page'
    }
  }
}
</script>
