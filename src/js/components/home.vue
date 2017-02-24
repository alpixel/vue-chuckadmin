<template>
  <div>
    <h1 class="cc-txt-center">
      {{msg}}
    </h1>

    <div class="alert alert-success">
      <i class="fa fa-thumbs-up"></i> Install success :) Good work dude!
    </div>
  </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                msg: 'I am the homepage'
            }
        }
    }
</script>
