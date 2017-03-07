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

            <h2 class="cc-txt-center cc-purple ion-ios-people">{{maxUsers|pluralize}}</h2>

            <!-- Pagination, pages -->
            <div class="columns cc-align-center">
                <form>
                    <div class="form-item cc-inline">
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

                    <div class="form-item cc-inline">
                        <div class="form-ps">
                            <span>Search</span>
                            <input type="text" v-model="searchQuery" placeholder="Search by names, ID" />
                        </div>
                    </div>

                    <!-- <div class="form-item cc-inline">
                        <div class="form-checkbox">
                            <label>
                                <input type="checkbox" name="gender" value="male" v-model="checkedGender" />
                                Men only
                            </label>
                        </div>
                        <div class="form-checkbox">
                            <label>
                                <input type="checkbox" name="gender" value="female" v-model="checkedGender"/>
                                Women only
                            </label>
                        </div>
                    </div> -->
                </form>

                <pagination class="cc-w-auto" :records="maxUsers" :currentpage="currentPage" :number-per-page="nbPerPage"  @changepage="changePage"></pagination>
            </div>

            <!-- Results table datas -->
            <table v-show="userShown.length >= 1" class="cc-equal-cols">
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
                <tbody>
                    <tr v-for="(user,index) in userShown">
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
                            {{user.registered | formatDate('fr','[le] DD.MM.YYYY')}}
                        </td>
                        <td>
                            <router-link class="btn cc-bg-primary fa-edit" :to="{name : 'user', params: {id: user.id.value}}">Edit</router-link>

                            <a @click.prevent="openModal(user.id.value,index)" class="btn cc-thin cc-bg-red fa-times">Del.</a>
                        </td>
                    </tr>
                </tbody>
            </table>


            <div class="alert alert-error" v-show="userShown.length < 1">
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
    const api = 'https://randomuser.me/api/?results=10&nat=fr';


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

                // If fetchData return an error, will be filled with error detail
                error : '',

                // Set to true for modal appearance
                showModal : false,

                // ============
                // Sort datas
                // ============
                // Asc / Desc sort datas
                sortType : ['asc','desc'],

                // Default sort table (ie. "sort by lastname")
                sortKey: 'name.last',

                // Search input
                searchQuery : '',

                // Gender checkboxes
                // checkedGender : [],

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

        // Computed datas : Here the total nb of users
        computed: {
            maxUsers: function() {
              return this.usersFiltered.length
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
                this.nbPerPage = _.toInteger(this.nbPerPageSelect)

                // Set the first pagination active
                this.currentPage = 1

                // Refresh page
                this.refreshPage()
            },

            // When search input change, launch request
            searchQuery () {
                this.searchInTable()
            },

            // // When checked gender change
            // checkedGender() {
            //     this.filterGender()
            // }
        },

        // When view is created, launch ajax fetchData
        created () {
            this.fetchData()
        },

        // Methods
        methods: {

            // Ajax to get users
            fetchData () {
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

                // Active class to the current number
                this.currentPage = index

                // Refresh page
                this.refreshPage()
            },

            // Refresh page
            refreshPage() {

                // Set start to the first user of the current line
                let start = this.getStartPagination()

                // Set userShown from `start` to `this.nbPerPage`
                this.userShown = this.usersFiltered.slice(start, start + this.nbPerPage)
            },

            // Return the start of the current pagination
            getStartPagination() {
                return (this.currentPage - 1) * this.nbPerPage
            },

            // Ordering datas into table
            sortBy(key) {
                // Order users tabs with lodash _.orderBy method
                this.usersFiltered = _.orderBy(this.usersFiltered, key, [this.sortType[0]])

                // Reverse sortType for next click (reverse order)
                this.sortType = _.reverse(this.sortType)

                // Set `this.sortKey`to the 'key' value for active class on <th> elements
                this.sortKey = key

                // Refresh, always refresh :)
                this.refreshPage()
            },

            // Search in table
            searchInTable() {
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

            // Filter results by gender
            // filterGender() {
            //     // Refer to instance
            //     let that = this

            //     if(_.isEmpty(that.checkedGender)) {

            //     } else {
            //         var filtered_users = _.filter(that.usersFiltered, function(p) {
            //           return _.some(that.checkedGender, (el) => _.includes(p.gender, el));
            //         })

            //         that.usersFiltered = filtered_users

            //         // Set the first pagination active
            //         this.currentPage = 1

            //         // Refreshpage
            //         that.refreshPage()
            //     }
            // },

            // Open Modal before deleting user
            openModal(id_user,index) {

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
                return (value > 1) ? value+' users found' : value+ ' user found'
            }
        },

        // Components
        components: {
            Pagination
        }
    }
</script>
