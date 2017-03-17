<template>

    <div class="wrap-widget">
        <div class="cc-loader" v-if="loading">
            <div class="spinner"></div>
        </div>

        <div v-else>
            <div v-if="!fetchError">
                <div class="timeline-legend columns">
                    <div class="user">
                        Standart user
                    </div>
                    <div class="admin">
                        Administrator
                    </div>
                </div>


                <ul class="timeline-list">
                    <li v-for="(event, index) in timeline" v-if="index < nbItemToShow" :class="event.role.toLowerCase()">

                        <p class="timeline-date">
                            <i class="ion-ios-clock-outline"></i> {{event.date|fromnow('fr')}}
                        </p>

                        <div class="timeline-action">
                            <strong>{{ event.user | capitalize }}</strong>
                            {{event.action}}
                        </div>

                    </li>
                </ul>
            </div>

            <div v-else class="alert alert-error">
                {{fetchError}}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    const api = 'src/js/fakeapi/widget-timeline.json'

	export default {
		name: 'widget-timeline',
        data() {
            return {
                loading:true,
                timeline: {},
                fetchError: null
            }
        },
        props: {
            'nbItemToShow': {
                type: Number,
                required : true,
                validator: function (value) {
                    return value > 0
                }
            }
        },
        created() {
            this.fetchTimeline()
        },
        methods: {
            fetchTimeline() {

                this.fetchError = null

                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    if(response.data.error) {

                        this.showError('data.error : JSON file return an error value')

                    } else {

                        this.loading = false
                        this.timeline = _.reverse(_.sortBy(response.data.timeline, 'date'));

                    }

                }).catch(error => {

                    this.showError('JSON not found')

                })

            },

            // Show error message
            showError(msg) {
                this.fetchError = msg
                this.loading = false
                this.timeline = {}
            }
        }
	}

</script>