<template>
  <div>
    <div class="cc-loader" v-if="loading">
      <div class="spinner"></div>
    </div>

    <div v-else>
        <div v-if="data.name.first" class="cc-txt-center">
            <p v-if="data.picture.medium">
                <img :src="data.picture.medium" :alt="getFullname" />
            </p>
            <h1>{{getFullname}}</h1>
        </div>

        <div v-else class="alert alert-error">
            {{error}}
        </div>

        <div style="font-size:1rem;">
            <pre>{{$data}}</pre>
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
                data: []
            }
        },
        computed : {
            getFullname () {
                return this.capitalizeFirstLetter(this.data.name.first)+' '+this.data.name.last.toUpperCase()
            }
        },
        props : {
            id : null,
            gender : String
        },
        watch: {
            // When route change, launch fetchData method
            '$route' : 'fetchData'
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.error = null;
                this.loading = true;

                const api = 'https://randomuser.me/api/?gender='+this.gender;

                Vue.axios.get(api, {

                    dataType: 'PrettyJSON'

                }).then(response => {

                    this.loading = false;
                    this.data = response.data.results[0];

                }).catch(error => {

                    this.error = 'User not found';
                    this.loading = false;
                    this.data = [];

                });
            },
            capitalizeFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        }
    }
</script>
