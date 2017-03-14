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
                    <router-link :to="{name : 'home'}"  class="notifications">
                        <span v-if="loggedUser.notif > 0">
                            {{loggedUser.notif}}
                        </span>

                        <i class="ion-ios-bell-outline" :class="{'shake': loggedUser.notif > 0}"></i>
                    </router-link>
                </div>

                <div class="cc-w-auto">

                    <router-link :to="{name : 'home'}"  class="user-box">
                        <!-- User img -->
                        <img :src="loggedUser.picture.thumbnail" :alt="loggedUser.name.first" />

                        <!-- User name -->
                        <span>{{loggedUser.name.first|capitalize}}</span>
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
	import Vue from 'vue'

	export default {
		name: 'header',
		props: {
	        'loggedUser': {
	            type: Object
	        }
	    },
        methods: {
            logout() {
                this.$emit('logout')
            }
        }
	}

</script>