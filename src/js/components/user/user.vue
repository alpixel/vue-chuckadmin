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

            <h2 class="cc-txt-center cc-purple">{{maxUsers|pluralize}}</h2>

            <!-- Pagination, pages -->
            <div class="columns cc-align-center">
                <form>
                    <div class="form-item cc-inline">
                        <select v-model="nbPerPageSelect">
                            <option value="1">1 ligne</option>
                            <option value="5">5 lignes</option>
                            <option value="10">10 lignes</option>
                            <option value="20">20 lignes</option>
                            <option value="50">50 lignes</option>
                        </select>
                    </div>

                    <div class="form-item cc-inline">
                        <input type="text" v-model="searchQuery" placeholder="Search in names..." />
                    </div>
                </form>

                <pagination class="cc-w-auto" :records="maxUsers" :currentpage="currentPage" :number-per-page="nbPerPage"  @changepage="changePage"></pagination>
            </div>

            <!-- Results table datas -->
            <table v-show="userShowed.length >= 1">
                <thead>
                    <tr>
                        <th @click="sortBy(['id.value'])">ID</th>
                        <th>Picture</th>
                        <th @click="sortBy(['name.first', 'name.last'])">Full name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                         <th @click="sortBy(['id.value'])">ID</th>
                        <th>Picture</th>
                        <th @click="sortBy(['name.first', 'name.last'])">Full name</th>
                        <th>Action</th>
                    </tr>
                </tfoot>

                <tbody>
                    <tr v-for="(user,index) in userShowed">
                        <td width="200">
                            {{user.id.value}}
                        </td>
                        <td width="100">
                            <img :src="user.picture.thumbnail" :alt="user.name.first" />
                        </td>
                        <td>
                            {{user.name.first|capitalizeFirstLetter}} {{user.name.last|toUppercase}}
                        </td>
                        <td width="60">
                            <router-link class="btn cc-bg-primary" :to="{name : 'user', params: {id: user.id.value}}">Edit</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="alert alert-error" v-show="userShowed.length < 1">
                No users found, please change your filters
            </div>

            <!-- Pagination, pages -->
            <div class="columns cc-align-center">
                <form>
                    <div class="form-item">
                        <select v-model="nbPerPageSelect">
                            <option value="1">1 ligne</option>
                            <option value="5">5 lignes</option>
                            <option value="10">10 lignes</option>
                            <option value="20">20 lignes</option>
                            <option value="50">50 lignes</option>
                        </select>
                    </div>
                </form>

                <pagination class="cc-w-auto" :records="maxUsers" :currentpage="currentPage" :number-per-page="nbPerPage"  @changepage="changePage"></pagination>
            </div>

        </div>

        <!-- else, show errors logs -->
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

    import Pagination from '../utils/pagination.vue'

    // Set const api url to get users
    const api = 'https://randomuser.me/api/?results=50&nat=fr';


    Vue.use(VueAxios, axios)


    export default {
        // Name of the component
        name: 'user',

        // Datas : model
        data () {
            return {
                loading:false,
                error : '',

                // Asc / Desc sort datas
                sortKey: null,
                sortType : ['asc','desc'],

                // Search input
                searchQuery : '',

                // Tab contains all users
                users: [],
                usersSearch: [],

                // Tab contains shown users
                userShowed: [],

                // Current active page (1 by default)
                currentPage: 1,

                // Nb of user per page
                nbPerPage: 5,

                // Select list default value
                nbPerPageSelect: 5
            }
        },

        // Computed datas : Here the total nb of users
        computed: {
            maxUsers: function() {
              return this.usersSearch.length
            }
        },

        // Watchers
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData',

            // When select pagination changes
            nbPerPageSelect : function() {

                // Nb of user per page is set to the select value
                this.nbPerPage = _.toInteger(this.nbPerPageSelect);

                // Set the first pagination active
                this.currentPage = 1;

                // Refresh page
                this.refreshPage();
            },

            // When search input change, launch request
            searchQuery () {
                this.searchInTable();
            }
        },

        // When view is created, launch ajax fetchData
        created () {
            this.fetchData();
        },

        // Methods
        methods: {

            // Ajax to get users
            fetchData () {
                // Reset error msg
                this.error = '';

                // It's loading dude :)
                this.loading = true;


                // AJAX FIRE!
                Vue.axios.get(api, {

                    // params

                }).then(response => {

                    // Loading is finished :)
                    this.loading = false;

                    // Contains all users (100)
                    this.users = response.data.results;
                    this.usersSearch = response.data.results;

                    // Slice users to show the `this.nbPerPage` first users
                    this.userShowed = this.usersSearch.slice(0, this.nbPerPage);

                }).catch(error => {

                    // Set the error msg
                    this.error = 'Users not found';

                    // Loading is finished :)
                    this.loading = false;

                    // Clear users tab
                    this.users = [];
                    this.usersSearch = [];

                });
            },

            // Bind when the page changes
            changePage(index) {

                // Active class to the current number
                this.currentPage = index

                // Refresh page
                this.refreshPage()
            },

            // Refresh page
            refreshPage() {

                // Set start to the first user of the current line
                let start = this.getStartPagination()

                // Set userShow from `start` to `this.nbPerPage`
                this.userShowed = this.usersSearch.slice(start, start + this.nbPerPage)
            },

            // Return the start of the current pagination
            getStartPagination() {
                return (this.currentPage - 1) * this.nbPerPage
            },

            // Ordering datas into table
            sortBy(sortKey) {
                // Order users tabs with lodash
                this.usersSearch = _.orderBy(this.usersSearch, sortKey, [this.sortType[0]]);

                // Reverse sortType for next click (reverse)
                this.sortType = _.reverse(this.sortType);

                // Refresh, always refresh :)
                this.refreshPage();
            },

            // Search in table
            searchInTable() {
                // Refer to the instance
                let that = this

                // Make an array with matching search
                var filtered_users = _.filter(that.users, function(p){
                  return _.includes(p.name.first.toLowerCase(),that.searchQuery.toLowerCase()) || _.includes(p.name.last.toLowerCase(),that.searchQuery.toLowerCase())
                });

                // set usersSearch with filtered results
                that.usersSearch = filtered_users;

                // Refrsh :)
                that.refreshPage();
            }
        },

        // Filters
        filters: {
            // Return a string with a the first letter capitalized
            capitalizeFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            },

            // Return a string with a the first letter capitalized
            toUppercase(str) {
                return str.toUpperCase()
            },

            // Pluralize nb of results found (for <h2> in top of page)
            pluralize(value) {
                return (value > 1) ? value+' users found' : value+ ' user found';
            }
        },

        // Components
        components: {
            Pagination
        }
    }
</script>
