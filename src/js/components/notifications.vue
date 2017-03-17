<template>
    <div class="user-notif">

        <a href="javascript:void(0)" class="notifications" @click.prevent="openNotifsPanel">
            <span v-if="nbNotif > 0">
                {{nbNotifString}}
            </span>

            <i class="ion-ios-bell-outline" :class="{'shake': nbNotif > 0 && !showNotifs}"></i>
        </a>

        <ul class="notifs-dropdown" :class="{shown:showNotifs}" @mouseenter="isHoverNotifs = true" @mouseleave="delayClosePanel">
            <li class="cc-clearfix">
                <a href="javascript:void(0)" @click.prevent="closeNotifsPanel" class="cc-red">
                    <i class="ion-close-round"></i>
                </a>

                <p>
                    Notifications
                    <span class="badge">{{nbNotif}}</span>
                </p>
            </li>
            <li v-for="(notif, index) in loggedUser.notifications">
                <h4 class="cc-clearfix">
                    <span class="notif-date">
                        <i class="ion-ios-clock-outline"></i> {{notif.date|fromnow('fr')}}
                    </span>

                    {{ notif.user | capitalize }}
                </h4>
                
                <div class="notif-detail cc-clearfix">
                    <a href="javascript:void(0)" @click.prevent="deleteNotif(index)">
                        <i class="ion-close-round"></i>
                    </a>

                    <p>
                        {{ notif.action | capitalize }}
                    </p>
                </div>
                
            </li>

            <li class="cc-txt-center" v-if="nbNotif > 0">
                <a href="javascript:void(0)" class="btn cc-thin cc-bg-red" @click.prevent="deleteAll">
                    Delete all
                </a>
            </li>

            <li v-if="nbNotif < 1">
                <div class="notif-detail cc-clearfix">
                    <p>
                        Aucune notification !
                    </p>
                </div>
            </li>
        </ul>

    </div>
	
</template>

<script>
	export default {
		name: 'notifications',
        data() {
            return {
                showNotifs : false,
                isHoverNotifs: false
            }
        },
		props: {
	        'loggedUser': {
	            type: Object
	        }
	    },
        computed: {

            // Return the number of notifications
            nbNotif() {
                return this.loggedUser.notifications.length
            },

            nbNotifString() {
                return (this.loggedUser.notifications.length > 99) ? '+99' : this.loggedUser.notifications.length
            }

        },
        methods: {

            // Open Notifs panel
            openNotifsPanel() {

                this.showNotifs = !this.showNotifs
            },

            // Close Notifs panel
            closeNotifsPanel() {

                this.showNotifs = false
            },

            delayClosePanel() {
                let that = this

                that.isHoverNotifs = false

                _.delay(function() {
                    if (!that.isHoverNotifs)
                        that.closeNotifsPanel()
                }, 450)
            },

            // Delete a notification
            deleteNotif(index) {

                // Splice notif
                this.loggedUser.notifications.splice(index,1)
            },

            // Delete all notifications
            deleteAll() {
                this.loggedUser.notifications = []

                // close Notifications Panel
                this.delayClosePanel()
            }
        }
	}

</script>