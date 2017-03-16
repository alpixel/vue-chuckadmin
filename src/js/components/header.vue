<template>
	<header id="main-header">
        <div class="cc-inside">
            <div class="columns cc-align-center">
                <div>
                    <router-link :to="{name : 'home'}" exact class="logo cc-primary">
                        ChuckCSS & VueJS Admin
                    </router-link>
                </div>

                <div class="cc-w-auto cc-right">
                    <notifications :loggedUser="loggedUser"></notifications>
                </div>

                <div class="cc-w-auto">
                    <router-link :to="{name : 'home'}"  class="user-box">
                        <!-- User img -->
                        <img :src="loggedUser.picture" :alt="loggedUser.name" />

                        <!-- User name -->
                        <span>{{loggedUser.name|capitalize}}</span>
                    </router-link>
                </div>

                <div class="cc-w-auto">
                    <a href="javascript:void(0)" @click.prevent="logout"  class="logout" title="Logout">
                        <i class="ion-ios-unlocked-outline"></i>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import notifications from './notifications.vue'

	export default {
		name: 'header',
        data() {
            return {
                
            }
        },
		props: {
	        'loggedUser': {
	            type: Object
	        }
	    },
        methods: {
            logout() {

                this.$emit('logout')
            }
        },
        components: {
            notifications
        }
	}

</script>