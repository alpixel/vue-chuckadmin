<template>
  <div class="home">
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
                msg: 'VueJS App Dashboard'
            }
        },
        head: {
            title() {
                return {
                    inner: this.msg,
                    separator: '-',
                    complement: 'complement'
                }
            },
            meta() {
                return [
                    { name: 'application-name', content: 'Name of my application' },
                    { name: 'description', content: 'A description of the page', id: 'desc' }, // id to replace intead of create element
                    // ...
                    // Twitter
                    { name: 'twitter:title', content: 'Content Title' },
                    // with shorthand
                    { n: 'twitter:description', c: 'Content description less than 200 characters'},
                    // ...
                    // Google+ / Schema.org
                    { itemprop: 'name', content: 'Content Title' },
                    { itemprop: 'description', content: 'Content Title' },
                    // ...
                    // Facebook / Open Graph
                    { property: 'fb:app_id', content: '123456789' },
                    { property: 'og:title', content: 'Content Title' },
                    // with shorthand
                    { p: 'og:image', c: 'https://example.com/image.jpg' }
                ]
            }
        }
    }
</script>
