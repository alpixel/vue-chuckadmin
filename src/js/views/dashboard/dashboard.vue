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
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Widgets -->
                <div class="cc-8 columns">

                    <!-- HighCharts -->
                    <div class="cc-12">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-purple">Widget 1</h2>
                            </div>

                            <widget-highcharts-one></widget-highcharts-one>
                        </div>
                    </div>

                    <div class="cc-8">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-orange">Widget 2</h2>
                            </div>

                            <widget-highcharts-two></widget-highcharts-two>
                        </div>
                    </div>

                    <div class="cc-4">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-red">Widget 3</h2>
                            </div>

                            <widget-highcharts-three></widget-highcharts-three>
                        </div>
                    </div>

                    <div class="cc-8">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-primary">Widget 4</h2>
                            </div>
                        </div>
                    </div>

                    <div class="cc-4">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-yellow">Widget 5</h2>
                            </div>
                        </div>
                    </div>

                    <div class="cc-4">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-blue">Widget 6</h2>
                            </div>
                        </div>
                    </div>

                    <div class="cc-8">
                        <div class="boxed widget">
                            <div class="widget-title">
                                <h2 class="cc-purple">Widget 7</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Widget Timeline -->
                <div class="cc-4 widget-timeline">
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


    export default {
        name: 'home',
        data () {
            return {
                msg: 'Dashboard',
                loading:true,

                // Timeline Widget
                nbEventToShow: 7
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


            /*
                * EventBus Listener *
                @emiter file: notifications.vue
                @emiter method: deleteNotif()
            */
            // EventBus.$on('deleteNotif', payload => {
            //     this.nbEventToShow = payload
            // })
        },

        // Components : Widgets
        components: {
            widgetHighchartsOne,
            widgetHighchartsTwo,
            widgetHighchartsThree,
            widgetTimeline
        }
    }
</script>
