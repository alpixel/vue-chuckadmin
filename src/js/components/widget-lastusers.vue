<template>

    <div class="wrap-widget">
        <div class="cc-loader" v-if="loading">
            <div class="spinner"></div>
        </div>

        <div v-else>
            <div v-if="!fetchError" class="widget-lastusers">

                <div class="columns">

                    <div v-for="(user, index) in users" class="user-item">

                        <router-link :to="{name:'user-profile', params:{id: user.id.value}}">
                            <img :src="user.picture.medium" :alt="user.name.first" />

                            <p class="user-name">
                                {{user.name.first|capitalize}} {{user.name.last|upper}}
                            </p>
                            <p class="user-date">
                                {{user.registered | fromnow('fr')}}
                            </p>
                        </router-link>
                    </div>
                </div>

            </div>

            <div v-else class="alert alert-error">
                {{fetchError}}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    // Set const api url to get admins
    const api = 'https://randomuser.me/api/?results=5&nat=fr'

	export default {
        // Name of the component
        name: 'widget-lastusers',

        // Datas : model
        data () {
            return {
                // ============
                // General datas
                // ============
                // Is the page loading ?
                loading:true,

                // If fetchData() returns an error, will be filled with error detail
                fetchError : '',


                // ============
                // last users datas
                // ============
                // Tab contains all last users
                users: []
            }
        },

        // When view is created, launch ajax fetchData
        created () {
            this.fetchData()
        },

        // Methods
        methods: {

            // Ajax to get admins
            fetchData () {

                // Reset error msg
                this.fetchError = ''

                // It's loading dude :)
                this.loading = true


                // AJAX FIRE!
                Vue.axios.get(api, {

                    // params

                }).then(response => {

                    if(response.data.error) {

                        this.showError('data.error : API return an error value')

                    } else {

                        // Loading is finished :)
                        this.loading = false

                        // Contains 5 last users, sort by date asc
                        this.users = _.reverse(_.sortBy(response.data.results, 'registered'))
                    }

                }).catch(error => {

                    // Set the error msg
                    this.showError('Error : JSON file not found OR error during fetching datas')

                })
            },

            // Show Error message if fetching data return an error
            showError(msg) {
                this.fetchError = msg
                this.loading = false
                this.users = []
            }
        }
    }

</script>
