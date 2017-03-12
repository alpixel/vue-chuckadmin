<template>
  <div class="users-home">

    <!-- If loading -->
    <div class="cc-loader" v-if="loading">
      <div class="spinner"></div>
    </div>

    <!-- else -->
    <div v-else>

        <!-- If no errors after fetching datas -->
        <div v-if="!error">

            <h1 class="cc-txt-center">
                Administrators<br />
                <small>• {{maxUsers|pluralize}} •</small>
            </h1>

            <!-- Pagination, pages -->
            <div class="filters boxed">
                <form class="columns">
                    <div class="form-item cc-txt-center cc-w-auto">
                        <div class="form-ps">
                            <span>Search</span>
                            <input type="text" v-model="searchQuery" placeholder="Search by names, ID" />
                        </div>
                    </div>

                    <div class="form-item  cc-txt-center cc-w-auto cc-right">
                        <div class="form-ps">
                            <span>Nb per page</span>
                            <select v-model="nbPerPageSelect">
                                <option value="1">1 ligne</option>
                                <option value="5">5 lignes</option>
                                <option value="10">10 lignes</option>
                                <option value="20">20 lignes</option>
                                <option value="50">50 lignes</option>
                            </select>
                        </div>
                    </div>                    

                    <div class="form-item cc-txt-center cc-w-auto" v-if="maxUsers > nbPerPage">
                        <div class="form-ps">
                            <span>Go to page</span>
                            <input type="number" class="small" v-model.number="currentPage" min="1" />
                        </div>
                    </div>
                </form>

                
            </div>

            <pagination class="cc-w-auto" :records="maxUsers" :currentpage="currentPage" :number-per-page="nbPerPage"  @changepage="changePage"></pagination>


            <!-- Results table datas -->
            <div class="boxed cc-ma-0" v-show="userShown.length >= 1">
                <table class="cc-equal-cols">
                    <thead>
                        <tr>
                            <th @click="sortBy('id.value')" :class="[{ active: sortKey == 'id.value' },sortType[0], 'sort']">
                                ID
                            </th>
                            <th>
                                Picture
                            </th>
                            <th @click="sortBy('name.first')" :class="[{ active: sortKey == 'name.first' },sortType[0], 'sort']">
                                Firstname
                            </th>
                            <th @click="sortBy('name.last')" :class="[{ active: sortKey == 'name.last' },sortType[0], 'sort']">
                                Lastname
                            </th>
                            <th @click="sortBy('registered')" :class="[{ active: sortKey == 'registered' },sortType[0], 'sort']">
                                Date inscription
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tfoot>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Picture
                            </th>
                            <th>
                                Firstname
                            </th>
                            <th>
                                Lastname
                            </th>
                            <th>
                                Date inscription
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </tfoot>

                    <tbody>
                        <tr v-for="(user, index) in userShown">
                            <td>
                                {{user.id.value}}
                            </td>
                            <td>
                                <img :src="user.picture.thumbnail" :alt="user.name.first" />
                            </td>
                            <td>
                                {{user.name.first|capitalize}}
                            </td>
                            <td>
                                {{user.name.last|upper}}
                            </td>
                            <td>
                                {{user.registered | formatDate('fr','[Le] DD.MM.YYYY')}}
                            </td>
                            <td>
                                <router-link class="btn cc-bg-primary fa-edit" :to="{name:'admin-profile', params:{id: user.id.value}}">Edit</router-link>

                                <a @click.prevent="openModal(user.id.value,index)" class="btn cc-thin cc-bg-red fa-times">Del.</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="alert alert-error" v-show="userShown.length < 1">
                No users found, please change your filters
            </div>


            <!-- MODAL SHOWN BEFORE DELETING USER -->
            <div id="modal-id" :class="[{'active' : showModal}, 'modal']">
                <!-- Close button -->
                <button class="modal-close" @click="showModal = false"></button>
                <!-- Overlay -->
                <div class="modal-overlay"></div>
                <!-- Modal content -->
                <div class="modal-content">
                    <div class="modal-header">
                        Confirmer la suppression ?
                    </div>
                    <div class="modal-body">
                        Confirmer la suppression de l'utilisateur <strong v-if="userToDelete.firstname">{{userToDelete.firstname|capitalize}} {{userToDelete.lastname|upper}}</strong> ?
                    </div>
                    <div class="modal-footer">
                        <button class="cc-bg-primary" @click.prevent="deleteUser">Confirmer</button>
                    </div>
                </div>
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
    import Pagination from '../utils/pagination.vue'

    // Set const api url to get users
    const api = 'https://randomuser.me/api/?results=5&nat=fr';


    export default {
        // Name of the component
        name: 'user',

        // Datas : model
        data () {
            return {
                // ============
                // General datas
                // ============
                // Is the page loading ?
                loading:false,

                // If fetchData() returns an error, will be filled with error detail
                error : '',

                // Set to true for modal appearance
                showModal : false,


                // ============
                // Sort datas
                // ============
                // Asc / Desc sort datas
                sortType : ['desc','asc'],

                // Default sort table (ie. "sort by registration date")
                sortKey: 'registered',

                // Search input
                searchQuery : '',


                // ============
                // Users datas
                // ============
                // Tab contains all users - used for back-up users (when searching users)
                users: [],

                // Tab contains users when searching in names
                usersFiltered: [],

                // Tab contains shown users
                userShown: [],

                // Array with infos about user to delete
                userToDelete : {},


                // ============
                // Pagination datas
                // ============
                // Current active page (1 by default)
                currentPage: 1,

                // Nb of user per page
                nbPerPage: 10,

                // Select list default value
                nbPerPageSelect: 10
            }
        },

        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: 'Admins panel',
                    separator: '-',
                    complement: 'Made by ALPIXEL agency'
                }
            },
            meta() {
                return [
                ]
            }
        },

        // Computed datas : Here the total nb of users
        computed: {
            maxUsers () {
                console.log('admins - computed maxUsers')

                return this.usersFiltered.length
            }
        },

        // Watchers
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData',

            // When select pagination changes
            nbPerPageSelect () {
                console.log('admins - watch nbPerPageSelect')


                // Nb of user per page is set to the select value
                this.nbPerPage = _.toInteger(this.nbPerPageSelect)

                // Set the first pagination active
                this.currentPage = 1

                // Refresh page
                this.refreshPage()
            },

            // When search input change, launch request
            searchQuery () {
                console.log('admins - watch searchQuery')

                // Launch search
                this.searchInTable()
            },

            // When the table pagiantion section shows 0 user (by deleting the last user on the table for example)
            userShown () {
                console.log('admins - watch userShown')

                if(this.userShown.length < 1 && this.usersFiltered.length > 0 && this.users.length > 0) {
                    this.currentPage = 1
                    this.refreshPage()
                }
            },

            // Input "Go to page" binding value
            currentPage() {
                console.log('admins - watch currentPage')

                this.changePage(this.currentPage);
            }

            // genders () {
            //     this.sortByGender();
            // }
        },

        // When view is created, launch ajax fetchData
        created () {
            console.log('admins - created')
            this.fetchData()
        },

        // Methods
        methods: {

            // Ajax to get users
            fetchData () {
                console.log('admins - methods fetchData')

                // Reset error msg
                this.error = ''

                // It's loading dude :)
                this.loading = true


                // AJAX FIRE!
                Vue.axios.get(api, {

                    // params

                }).then(response => {

                    // Loading is finished :)
                    this.loading = false

                    // Contains all users (100)
                    this.users = response.data.results
                    this.usersFiltered = response.data.results

                    // Slice users to show the `this.nbPerPage` first users
                    this.userShown = this.usersFiltered.slice(0, this.nbPerPage)

                    // Sort table by default sortKey
                    this.sortBy(this.sortKey)

                }).catch(error => {

                    // Set the error msg
                    this.error = 'Users not found'

                    // Loading is finished :)
                    this.loading = false

                    // Clear users tab
                    this.users = []
                    this.usersFiltered = []

                })
            },

            // Bind when the page changes
            changePage(index) {
                console.log('admins - methods changePage')
                // Active class to the current number
                this.currentPage = index

                // Refresh page
                this.refreshPage()

            },

            // Refresh page
            refreshPage() {
                console.log('admins - methods refreshPage')

                // Set start to the first user of the current line
                let start = this.getStartPagination()

                // Set userShown from `start` to `this.nbPerPage`
                this.userShown = this.usersFiltered.slice(start, start + this.nbPerPage)
            },

            // Return the start of the current pagination
            getStartPagination() {
                console.log('admins - methods getStartPagination')

                return (this.currentPage - 1) * this.nbPerPage
            },

            // Ordering datas into table
            sortBy(key) {
                console.log('admins - methods sortBy')

                // Order users tabs with lodash _.orderBy method
                this.usersFiltered = _.orderBy(this.usersFiltered, key, [this.sortType[0]])

                // Reverse sortType for next click (reverse order)
                this.sortType = _.reverse(this.sortType)

                // Set `this.sortKey`to the 'key value for active class on <th> elements
                this.sortKey = key

                // Refresh, always refresh :)
                this.refreshPage()
            },

            // Search in table
            searchInTable() {
                console.log('admins - methods searchInTable')

                // Refer to the instance
                let that = this

                // Make an array with matching search
                var filtered_users = _.filter(that.users, function(p){
                  return _.includes(p.name.first.toLowerCase(),that.searchQuery.toLowerCase()) || _.includes(p.name.last.toLowerCase(),that.searchQuery.toLowerCase()) || _.includes(p.id.value,that.searchQuery.toLowerCase())
                })

                // set usersFiltered with filtered results
                that.usersFiltered = filtered_users

                // Set the first pagination active
                this.currentPage = 1

                // Refresh :)
                that.refreshPage()
            },

            // Open Modal before deleting user
            openModal(id_user,index) {
                console.log('admins - methods openModal')

                let user = this.userShown[index]

                // Fill the user to delete
                this.userToDelete = {
                    'index' : index,
                    'id' : id_user,
                    'firstname' : user.name.first,
                    'lastname' : user.name.last
                }

                this.showModal = true
            },

            // Delete a user
            deleteUser() {
                console.log('admins - methods deleteUser')

                let
                    idSearch = this.userToDelete.id,
                    indexSearch = this.userToDelete.index

                // I. this.users
                var user = _.findIndex(this.users,function(o) {
                    return o.id.value == idSearch
                })
                this.users.splice(user,1)


                // II. this.userShown
                this.userShown.splice(indexSearch,1)


                // III. this.usersFiltered
                var user = _.findIndex(this.usersFiltered,function(o) {
                    return o.id.value == idSearch
                })
                this.usersFiltered.splice(user,1)



                // Hide modal
                this.showModal = false

                // Reset userToDelete array
                this.userToDelete = {}
            }
        },

        // Filters
        filters: {

            // Pluralize nb of results found (for <h2> in top of page)
            pluralize(value) {
                return (value > 1) ? value+' admins found' : value+ ' admin found'
            }
        },

        // Components
        components: {
            Pagination
        }
    }
</script>
