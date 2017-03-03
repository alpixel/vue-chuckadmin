<template>
  <div>
    <div class="cc-loader" v-if="loading">
      <div class="spinner"></div>
    </div>

    <div v-else>

        <div v-if="!error">
            <p class="cc-txt-center">
                <router-link class="btn cc-bg-primary" :to="{name : 'users'}">Back to users</router-link>
            </p>

            <pre>{{user}}</pre>
        </div>

        <div v-else class="alert alert-error">
            {{error}}
        </div>
    </div>

  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios, axios)

    export default {
        name: 'user-profile',
        data () {
            return {
                loading:false,
                error : '',
                user: []
            }
        },
        props : {
            id : null
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

                this.error = null;
                this.loading = true;

                const api = 'https://randomuser.me/api/?id='+this.id+'&nat=fr';

                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    this.loading = false;
                    this.user = response.data.results;

                }).catch(error => {

                    this.error = 'User not found';
                    this.loading = false;
                    this.users = [];

                });
            },
            capitalizeFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
            getFullname(index) {
                return this.capitalizeFirstLetter(this.user.name.first)+' '+this.user.name.last.toUpperCase()
            }
        }
    }
</script>
