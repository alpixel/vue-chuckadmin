<template>
    <div class="user-profil">
        <div class="cc-loader" v-if="loading">
            <div class="spinner"></div>
        </div>

        <div v-else>

            <div v-if="!error">
            
                <div class="top-page">
                    <div class="cc-inside">
                        <div class="columns">
                            <h1>
                                Administrator 
                                <small>• #{{user.id.value}} </small>
                            </h1>
                            <div class="cc-w-auto cc-right">
                                <router-link class="btn cc-bg-green fa-angle-left" :to="{name : 'admins'}">Back to admins</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cc-inside">
                    <div class="boxed">
                        <pre>{{user}}</pre>
                    </div>
                </div><!-- /end cc-inside -->       

            </div><!-- /end v-if="!error" -->

            <div v-else class="alert alert-error">
                {{error}}
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'

    // Admin info - call Rest API
    const api = 'https://randomuser.me/api/?id='+this.id+'&nat=fr'

    export default {
        name: 'admin-profile',
        data () {
            return {
                loading:true,
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

                // It's loading dude :)
                this.loading = true

                // Set var before fetching datas
                this.error = null;

                // API call with Axios
                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    this.loading = false;
                    this.user = response.data.results[0];

                }).catch(error => {

                    this.error = 'User not found';
                    this.loading = false;
                    this.user = [];

                });
            }
        }
    }
</script>
