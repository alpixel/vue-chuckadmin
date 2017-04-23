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

                    <div class="push-item" v-tooltip="{title: 'Here my awesome title'}">
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
                            <div class="widget-title">
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
    // Import Widgets
    import widgetHighchartsOne from '../../components/widget-highcharts-1.vue'
    import widgetHighchartsTwo from '../../components/widget-highcharts-2.vue'
    import widgetHighchartsThree from '../../components/widget-highcharts-3.vue'
    import widgetTimeline from '../../components/widget-timeline.vue'
    import widgetLastUsers from '../../components/widget-lastusers.vue'


    export default {
        name: 'dashboard',
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
                    inner: this.msg
                }
            },
            meta() {
                return [
                    // Meta Description
                    { 
                        n: 'description', 
                        c: 'A VueJS & ChuckCSS administration'
                    },

                    // Twitter card
                    { n: 'twitter:card', c:'summary' },
                    // { n: 'twitter:site', c:'@site_account' },
                    // { n: 'twitter:creator', c:'@individual_account' },
                    { n: 'twitter:url', c:'' },
                    { n: 'twitter:title', c:'A VueJS & ChuckCSS administration' },
                    { n: 'twitter:image', c:'' },
                    { n: 'twitter:description', c: 'A VueJS & ChuckCSS administration' },

                    // FaceBook / Open Graph
                    { p: 'fb:app_id', c:'' },
                    { p: 'og:url', c:'' },
                    { p: 'og:type', c:'website' },
                    { p: 'og:title', c:'A VueJS & ChuckCSS administration' },
                    { p: 'og:image', c:'' },
                    { p: 'og:description', c: 'A VueJS & ChuckCSS administration' },
                    { p: 'og:site_name', c: 'VueJS & ChuckCSS administration' },
                    { p: 'og:locale', c: 'en_US' },
                    { p: 'article:author', c: 'ALPIXEL Agency' },

                    // Google+ / Schema.org : itemprop meta
                    { ip: 'name', c: 'ChuckAdmin' },
                    { ip: 'description', c: 'A VueJS & ChuckCSS administration' }
                ]
            },
            link() {
                return [
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
