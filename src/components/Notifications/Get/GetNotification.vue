<template lang="">
    <v-card height="100vh" class="ma-5 br-12 pa-10" v-if="notification">
        <v-card-title v-if="notification.title" class="mb-5 t20600">
            <span class="d-inline-block d--ltr">{{notification.title}}</span>
        </v-card-title>
        <v-divider v-if="notification.title"></v-divider>

        <v-card-text v-if="notification.content" class="mt-5 t14500">
            {{notification.content}}
      </v-card-text>
    </v-card>
</template>
<script>
import Notifications from '@/composables/Notifications';

export default {
    setup(props) {
        const {notification, getNotification} = Notifications();
        return {notification, getNotification};
    },

    mounted(){
        this.getNotification();
    },
}
</script>