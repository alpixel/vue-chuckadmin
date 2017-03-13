<template>
  <div class="pages">
    <div class="cc-loader" v-if="loading">
      <div class="spinner"></div>
    </div>

    <div v-else>

        <!-- Page title -->
        <div class="top-page">
            <div class="cc-inside">
                <h1>
                    News
                </h1>
            </div>
        </div>

        <div class="cc-inside">

            <div v-if="!error">

                <div class="boxed">
                    <div class="alert alert-success">
                      <i class="fa fa-thumbs-up"></i> Welcome on News Pages
                    </div>
                </div>

            </div>

            <div v-else class="alert alert-error">
                {{error}}
            </div>
        </div>
    </div>

  </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'news-pages',
        data () {
            return {
                loading:false,
                error : ''
            }
        },
        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: 'News Pages panel',
                    separator: '-',
                    complement: 'Made by ALPIXEL agency'
                }
            },
            meta() {
                return [
                ]
            }
        },
        props : {

        },
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData'
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {

                this.loading = false;

                // this.error = null;
                // this.loading = true;

                // const api = 'https://randomuser.me/api/?id='+this.id+'&nat=fr';

                // Vue.axios.get(api, {
                //     // params
                // }).then(response => {

                //     this.loading = false;
                //     this.user = response.data.results[0];

                // }).catch(error => {

                //     this.error = 'User not found';
                //     this.loading = false;
                //     this.user = [];

                // });
            }
        }
    }
</script>
