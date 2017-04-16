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
                    <div class="header-icon">
                        <a href="javascript:void(0);" @click.prevent="openSettingsPanel" @mouseenter="isHoverSettings = true" @mouseleave="delayClosePanel">
                            <i class="ion-ios-gear-outline"></i>
                        </a>

                        <ul class="dropdown" :class="{shown:showSettings}" @mouseenter="isHoverSettings = true" @mouseleave="delayClosePanel">
                            <li class="cc-clearfix">
                                <a href="javascript:void(0)" @click.prevent="closeSettingsPanel" class="cc-red">
                                    <i class="ion-close-round"></i>
                                </a>

                                <p>
                                    Settings
                                </p>
                            </li>
                            <li>
                                <a href="javascript:void(0);" @click.prevent="$store.dispatch('switchTooltips'), closeSettingsPanel()">
                                    <i class="ion-ios-help-outline"></i> {{getTooltipMsg}}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" @click.prevent="logout">
                                    <i class="ion-ios-unlocked-outline"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
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
                showSettings : false,
                isHoverSettings: false
            }
        },
		props: {
	        'loggedUser': {
	            type: Object
	        }
	    },
        computed: {
            getTooltipMsg() {
                return (store.state.showTooltips == true) ? 'Hide Tooltips' : 'Show Tooltips'
            }
        },
        methods: {
            logout() {
                this.$emit('logout')
            },

            // Open Settings panel
            openSettingsPanel() {
                this.showSettings = !this.showSettings
            },

            // Close Settings panel
            closeSettingsPanel() {
                this.showSettings = false
            },

            delayClosePanel() {
                let that = this

                that.isHoverSettings = false

                _.delay(function() {
                    if (!that.isHoverSettings)
                        that.closeSettingsPanel()
                }, 450)
            },
        },
        components: {
            notifications
        }
	}

</script>
