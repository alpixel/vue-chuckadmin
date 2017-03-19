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

                <ul>
                    <li v-for="(event, index) in timeline" v-if="index < nbItemToShow" class="list-complete-item" :class="event.role.toLowerCase()" :key="event">

                        <p class="timeline-date">
                            <i class="ion-ios-clock-outline"></i> {{event.date|fromnow('fr')}} {{event.date|formatDate('fr', '[le] DD.MM.YYYY [à] HH:mm')}}
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
                fetchError: null,
                interval: null
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

            // this.interval = setInterval(function () {
            //     this.fetchTimeline();
            // }.bind(this), 3000); 
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

                        let toCompare = _.reverse(_.sortBy(response.data.timeline, 'date'))

                        if(!_.isEqual(this.timeline, toCompare)) {
                            this.timeline = _.reverse(_.sortBy(response.data.timeline, 'date'));
                        }

                        this.loading = false

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