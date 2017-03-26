<template>
  <div class="dashboard">

    <div class="cc-loader" v-if="loading">
        <div class="spinner"></div>
    </div>

    <div v-else>
        <div class="top-page">
            <div class="cc-inside">
                <h1>
                  {{msg}}
                </h1>
            </div>
        </div>

        <div class="cc-inside">

            <!-- PUSHES STATISTICS -->
            <div class="columns">
                <!-- Users -->
                <div>
                    <div class="push-item">
                        <span class="push-icon cc-bg-primary">
                            <i class="ion-android-contacts"></i>
                        </span>
                        <div class="push-infos">
                            <p class="push-title">
                                Users
                            </p>
                            <p class="push-number cc-primary">
                                {{pushes.users | formatNumber(0, ' ') }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Sales -->
                <div>
                    <div class="push-item">
                        <span class="push-icon cc-bg-green">
                            <i class="ion-android-cart"></i>
                        </span>
                        <div class="push-infos">
                            <p class="push-title">
                                Sales
                            </p>
                            <p class="push-number cc-green">
                                {{pushes.total | formatMoney('€', 2, ' ', ',', '%v%s') }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Other -->
                <div>
                    <div class="push-item">
                        <span class="push-icon cc-bg-purple">
                            <i class="ion-android-globe"></i>
                        </span>
                        <div class="push-infos">
                            <p class="push-title">
                                Other
                            </p>
                            <p class="push-number cc-purple">
                                {{ pushes.other | formatNumber(2, ' ', ',') }} %
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <!-- WIDGETS -->
            <div class="columns cc-align-start">
                <!-- TODOS -->
                <div class="cc-12" style="display:none">
                    <div class="boxed widget">
                        <div class="widget-title">
                            <h2 class="cc-green">Todos</h2>
                        </div>
                        <div>
                            <ul>
                                <li>Statistiques</li>
                                <li>Logs</li>
                                <li>Notify</li>
                                <li>vue-ua</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Widgets -->
                <div class="cc-8-m columns">

                    <!-- HighCharts -->
                    <div class="cc-12-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-purple">Monthly Average Temperature</h2>
                            </div>

                            <widget-highcharts-one></widget-highcharts-one>
                        </div>
                    </div>

                    <!-- HighCharts -->
                    <div class="cc-8-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-orange">Browsers statistics</h2>
                            </div>

                            <widget-highcharts-two></widget-highcharts-two>
                        </div>
                    </div>

                    <!-- HighCharts -->
                    <div class="cc-4-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-red">Users & Admins</h2>
                            </div>

                            <widget-highcharts-three></widget-highcharts-three>
                        </div>
                    </div>

                    <!-- Last registered users -->
                    <div class="cc-12-m">
                        <div class="boxed widget">
                            <div class="widget-title has-btn">
                                <h2 class="cc-primary">Last registered users</h2>
                                <router-link :to="{name:'users'}" class="btn cc-bg-primary">
                                    <i class="ion-arrow-right-b"></i>
                                    <span>Users list</span>
                                </router-link>
                            </div>

                            <widget-last-users></widget-last-users>
                        </div>
                    </div>


                    <div class="cc-4-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-yellow">Widget 5</h2>
                            </div>
                        </div>
                    </div>

                    <div class="cc-8-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-blue">Widget 6</h2>
                            </div>
                        </div>
                    </div>

                    <div class="cc-12-m">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-purple">Widget 7</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Widget Timeline -->
                <div class="cc-4-m widget-timeline">
                    <div class="widget boxed">
                        <div class="widget-title">
                            <h2 class="cc-green">
                                Timeline
                                <small>
                                • {{nbEventToShow}} last events •
                                </small>
                            </h2>
                        </div>

                        <widget-timeline :nbItemToShow="nbEventToShow"></widget-timeline>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

    import { EventBus } from '../../components/bus.js'

    // Import Widgets
    import widgetHighchartsOne from '../../components/widget-highcharts-1.vue'
    import widgetHighchartsTwo from '../../components/widget-highcharts-2.vue'
    import widgetHighchartsThree from '../../components/widget-highcharts-3.vue'
    import widgetTimeline from '../../components/widget-timeline.vue'
    import widgetLastUsers from '../../components/widget-lastusers.vue'


    export default {
        name: 'home',
        data () {
            return {
                msg: 'Dashboard',
                loading:true,

                // Timeline Widget
                nbEventToShow: 7,

                // Pushes
                pushes: {
                    users : 2589,
                    total: 1234567.89,
                    other: 48.7
                }
            }
        },

        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: this.msg,
                    separator: '-',
                    complement: 'Made by ALPIXEL agency'
                }
            },
            meta() {
                return [
                    { name: 'application-name', content: 'ChuckAdmin' },
                    { name: 'description', content: 'A VueJS & ChuckCSS administration', id: 'desc' }, // id to replace intead of create element
                    // ...
                    // Twitter
                    { name: 'twitter:title', content: 'ChuckAdmin' },
                    // with shorthand
                    { n: 'twitter:description', c: 'A VueJS & ChuckCSS administration'},
                    // ...
                    // Google+ / Schema.org
                    { itemprop: 'name', content: 'ChuckAdmin' },
                    { itemprop: 'description', content: 'A VueJS & ChuckCSS administration' }
                    // ...
                    // Facebook / Open Graph
                    // { property: 'fb:app_id', content: '123456789' },
                    // { property: 'og:title', content: 'Content Title' },
                    // with shorthand
                    // { p: 'og:image', c: 'https://example.com/image.jpg' }
                ]
            }
        },

        // Created : remove loader
        created () {
            this.loading = false
        },

        // Components : Widgets
        components: {
            widgetHighchartsOne,
            widgetHighchartsTwo,
            widgetHighchartsThree,
            widgetTimeline,
            widgetLastUsers
        }
    }
</script>
