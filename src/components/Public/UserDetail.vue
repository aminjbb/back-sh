<template>
<div>
    <v-row justify="center" align="center">
      <v-menu :location="location">
        <template v-slot:activator="{ props }">
          <div class="user-detail-box mx-6 pointer" v-bind="props">
            <v-row
                justify="center"
                align="center"
                class="px-5 pt-3">
              <div class="mt-1">
                <img src="@/assets/img/bottomArrow.svg" alt="shavaz image">
              </div>

              <div class="pb-1">
                    <span class="t13300">
                        {{ fullName }}
                    </span>
              </div>

              <div class="mt-1 ml-2">
                <img src="@/assets/img/User.svg" alt="shavaz image">
              </div>
            </v-row>
          </div>
        </template>

        <v-list class="c-table__more-options">
          <v-list-item>
            <v-list-item-title @click="logOut()">
              <div class="ma-5 pointer">
                <v-icon class="text-grey-darken-1">mdi-exit-to-app</v-icon>
                <span class="mr-2 text-grey-darken-1 t14300">
                  خروج
                </span>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


        <div class="mr-9 pt-2">
            <v-menu>
                <template v-slot:activator="{ props: menu }">
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-row justify="center" align="center">
                                <v-badge class="pointer" v-bind="mergeProps(menu)" color="pink-accent-3" size="small" :content="unSeenNotification ? unSeenNotification : '0'">
                                    <img src="@/assets/img/Notif.svg" alt="shavaz image">
                                </v-badge>
                            </v-row>
                        </template>
                    </v-tooltip>
                </template>

                <v-list>
                    <template v-if="notificationsData && notificationsData.length">
                        <v-list-item v-for="(item, index) in notificationsData" :key="index">
                            <v-list-item-title>
                                <div :class="item.seen_at == null ? 'notification__seen-active' : 'notification__seen'">
                                    <v-row
                                        justify="end"
                                        align="center"
                                        class="px-5 py-5"
                                        @click="gotoNotification(item)">
                                        <span class="t12 w400 mr-1">{{ item.title }}</span>
                                        <v-icon size="xsmall">mdi-cloud-download</v-icon>
                                    </v-row>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </template>

                    <sapn class="pa-2" v-else>
                        پیامی وجود ندارد
                    </sapn>
                </v-list>
            </v-menu>
        </div>

        <div class="pt-2">
            <v-row justify="center" align="center">
                <div class="mr-3">
                    <span class="t14300 number-font">
                        {{ date }}
                    </span>
                </div>
                <img src="@/assets/img/calendar-2.svg" alt="shavaz image">
            </v-row>
        </div>

    </v-row>
</div>
</template>

<script>
import {
    mergeProps
} from 'vue'
import {
    gregorian_to_jalali
} from '@/assets/js/functions'
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    data: () => ({
        date: ''
    }),
    methods: {
        mergeProps,
        gotoNotification(item) {
            if (item.url) window.open(item.url)

        },
      async logOut(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'auth/admin/logout'
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading=false
          localStorage.removeItem('fullName' )
          localStorage.removeItem('userId' )
          this.$cookies.remove('adminToken');
          this.$router.push('/login')
        }
        else{
          this.loading=false
        }
      }
    },

    computed: {
        fullName() {
            try {
                return localStorage.getItem('fullName')
            } catch (error) {
                return ''
            }
        },

        notifications() {
            try {
                return this.$store.getters['get_menuNotifications']
            } catch (error) {
                return ''
            }
        },

        notificationsData() {
            try {
                return this.notifications.data.data.slice(0,5)
            } catch (error) {
                return []
            }
        },

        unSeenNotification() {
            try {
                return this.notifications.unseen_count
            } catch (error) {
                return ''
            }
        }
    },

    mounted() {
        const date = new Date();
        let dateSplit = date.toISOString()
        dateSplit = dateSplit.split('T')
        const dateObject = dateSplit[0].split('-')
        this.date = gregorian_to_jalali(parseInt(dateObject[0]), parseInt(dateObject[1]), parseInt(dateObject[2]))
    }
}
</script>
