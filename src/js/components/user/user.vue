<template>
  <div>

    <!-- If loading -->
    <div class="cc-loader" v-if="loading">
      <div class="spinner"></div>
    </div>

    <!-- else -->
    <div v-else>

        <!-- If no errors after fetching datas -->
        <div v-if="!error">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Picture</th>
                        <th>Full name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Picture</th>
                        <th>Full name</th>
                        <th>Action</th>
                    </tr>
                </tfoot>

                <tbody>
                    <tr v-for="(user,index) in users">
                        <td>
                            {{index}}
                        </td>
                        <td>
                            <img :src="user.picture.thumbnail" :alt="user.name.first" />
                        </td>
                        <td>
                            {{getFullname(index)}}
                        </td>
                        <td>
                            <router-link class="btn cc-bg-primary" :to="{name : 'user', params: {id: user.id.value}}">Edit</router-link>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>

        <!-- else, show errors logs -->
        <div v-else class="alert alert-error">
            {{error}}
        </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'


    Vue.use(VueAxios, axios)

    export default {
        name: 'user',
        data () {
            return {
                loading:false,
                error : '',
                users: [],
                searchUser : '',
                paginate: ['users']
            }
        },
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData'
        },
        created () {
            this.fetchData();
            console.log('created');
        },
        methods: {
            fetchData () {
                console.log('fetchData');

                this.error = null;
                this.loading = true;

                const api = 'https://randomuser.me/api/?results=10&nat=fr';

                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    this.loading = false;
                    this.users = response.data.results;
                    console.log(this.users);

                }).catch(error => {

                    this.error = 'Users not found';
                    this.loading = false;
                    this.users = [];

                });
            },
            capitalizeFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
            getFullname(index) {
                return this.capitalizeFirstLetter(this.users[index].name.first)+' '+this.users[index].name.last.toUpperCase()
            }
        }
    }
</script>
