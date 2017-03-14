<template>
  <div class="home">
    <div class="top-page">
        <div class="cc-inside">
            <h1>
              {{msg}}
            </h1>
        </div>
    </div>

    <div class="cc-inside">
        <div class="alert alert-success">
            <i class="fa fa-thumbs-up"></i> Install success :) Good work dude!
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                msg: 'Dashboard'
            }
        },

        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: this.msg,
                    separator: '-',
                    complement: 'Made by ALPIXEL agency'
                }
            },
            meta() {
                return [
                    { name: 'application-name', content: 'ChuckAdmin' },
                    { name: 'description', content: 'A VueJS & ChuckCSS administration', id: 'desc' }, // id to replace intead of create element
                    // ...
                    // Twitter
                    { name: 'twitter:title', content: 'ChuckAdmin' },
                    // with shorthand
                    { n: 'twitter:description', c: 'A VueJS & ChuckCSS administration'},
                    // ...
                    // Google+ / Schema.org
                    { itemprop: 'name', content: 'ChuckAdmin' },
                    { itemprop: 'description', content: 'A VueJS & ChuckCSS administration' }
                    // ...
                    // Facebook / Open Graph
                    // { property: 'fb:app_id', content: '123456789' },
                    // { property: 'og:title', content: 'Content Title' },
                    // with shorthand
                    // { p: 'og:image', c: 'https://example.com/image.jpg' }
                ]
            }
        }
    }
</script>
