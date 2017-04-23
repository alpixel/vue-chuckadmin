<template>
    <div>
        <!-- My component / page template -->
        <my-awesome-component></my-awesome-component>

        <!-- Computed + filter -->
        {{ proutDouble|pluralize }}

    </div>
</template>

<script>
    import Vue from 'vue'
    import myAwesomecomponent from './pathtocomponent/my-awesome-component.vue'
    import { alpha,alphaNum,and,between,email,maxLength,minLength,numeric,or,required,sameAs } from 'vuelidate/lib/validators

	export default {        
        name: 'trololo',

        // LifeCycle Diagram 
        // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        created () {
            // Called synchronously after the instance is created. At this stage, the instance has finished processing the options which means the following have been set up: data observation, computed properties, methods, watch/event callbacks. However, the mounting phase has not been started, and the $el property will not be available yet.
            this.prout = !this.prout
        },
        mounted () {
            // Called after the instance has just been mounted where el is replaced by the newly created vm.$el. If the root instance is mounted to an in-document element, vm.$el will also be in-document when mounted is called.
            var vm = this
        },
        beforeUpdate(){
            // Called when the data changes, before the virtual DOM is re-rendered and patched. You can perform further state changes in this hook and they will not trigger additional re-renders.
        },
        updated() {
            // Called after a data change causes the virtual DOM to be re-rendered and patched.
            // The component’s DOM will have been updated when this hook is called, so you can perform DOM-dependent operations here. However, in most cases you should avoid changing state inside the hook. To react to state changes, it’s usually better to use a computed property or watcher instead.
        },
        beforeDestroy () {
            // Called right before a Vue instance is destroyed. At this stage the instance is still fully functional.
        },

        // Options / Datas
        data () {
            return {
                prout: false,
                proutPower : 10
            }
        },
        computed: {
            proutDouble: {
                get(){
                    return this.proutPower * 2

                },
                set(val){
                    this.prout = val * 2
                }
            }
        },
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'myRouteChanged',

            // Refer to data
            proutPower (newPower) {
                // do something with this new power
            },
        },
        methods: {
            // Call in 'watch' property
            myRouteChanged() {
            },

            method1(param) {
                return 'Such Sun!'
            }
        },

        // Options / Assets
        filters: {
            pluralize(value) {
                return (value > 1) ? value+' prouts' : value+ ' prout'
            }
        },
        directive: {
            makeNoise: {

            }
        },
        components: {
            myAwesomecomponent
        },



        // Only for components
        props: {
            'isSick': {
                type: Boolean,
                default: false,
                require: true
            }
        },



        // Custom properties : not Vue native
        // Meta <head> Plugin
        head: {
            title() {
                return {
                }
            },
            meta() {
                return [
                ]
            }
        },
        // Form validations
        validations: {
            login: {
                loginInput: {
                    required,
                    minLength: minLength(4)
                },
                loginPass: {
                    required,
                    minLength: minLength(4)
                }
            }
        },
	}

</script>
