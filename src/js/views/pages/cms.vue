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
                    CMS pages
                </h1>
            </div>
        </div>

        <div class="cc-inside">

            <div v-if="!fetchError">

                <div class="boxed">
                    <div class="alert alert-success">
                      <i class="fa fa-thumbs-up"></i> Welcome on CMS Pages
                    </div>
                </div>

            </div>

            <div v-else class="alert alert-error">
                {{fetchError}}
            </div>
        </div>
    </div>

  </div>
</template>

<script>
    import Vue from 'vue'

    const api = 'src/js/fakeapi/cms.json'

    export default {
        name: 'cms-pages',
        data () {
            return {
                loading:true,
                fetchError : null,
                cms: []
            }
        },
        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: 'CMS Pages panel',
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
            this.fetchData()
        },
        methods: {
            fetchData () {

                // It's loading dude :)
                this.loading = true
                this.fetchError = null

                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    if(response.data.error) {

                        this.showError('data.error : JSON file return an error value')

                    } else {

                        this.cms = response.data.results
                        this.loading = false

                    }

                }).catch(error => {

                    this.showError('JSON file not found')
                    
                })
            },

            showError(msg) {

                this.fetchError = msg
                this.loading = false
                this.cms = []

            }
        }
    }
</script>
