<template>
<div class="h-100 d-flex flex-column align-stretch position__relative">
    <div class="chat__user-box flex-grow-1 stretch-table w-100">
        <v-tabs
            v-model="tab"
            color="deep-purple-accent-4"
            align-tabs="center">
            <v-tab :value="1">ادمین ها</v-tab>
            <v-tab :value="2">کاربران</v-tab>

        </v-tabs>
        <div v-if="tab === 1">
            <div
                v-for="admin in adminList"
                :key="`adminChat${admin.id}`"
                class="pointer"
                @click="getConversation(admin.id ,'admin' , admin.user)">
                <v-row
                    justify="start"
                    align="center"
                    class="pa-8">
                    <v-badge color="primary500" v-if="admin.unseen_count >0 ">
                        <img v-if="admin.user" alt="Avatar" :src="admin.user.avatar" width="40" height="40">
                        <v-avatar v-else color="surface-variant"></v-avatar>
                    </v-badge>
                    <div v-else>
                        <img v-if="admin.user" alt="Avatar" :src="admin.user.avatar" width="40" height="40">
                        <v-avatar v-else color="surface-variant"></v-avatar>
                    </div>

                    <div>
                        <div>
                            <span class="t14500 mr-5">
                                {{admin.user.first_name }} {{admin.user.last_name }}
                            </span>
                        </div>
                        <div>
                        </div>
                    </div>
                </v-row>
                <v-divider></v-divider>
            </div>

        </div>
        <div v-if="tab === 2">
            <div
                v-for="user in userList"
                :key="`userChat${user.id}`"
                class="pointer"
                @click="getConversation(user.id,'user' , user.user)">
                <v-row
                    justify="start"
                    align="center"
                    class="pa-8">
                    <v-badge color="primary500" v-if="user.unseen_count >0 ">
                        <img v-if="user.user" alt="Avatar" :src="user.user.avatar" width="40" height="40">
                        <v-avatar v-else color="surface-variant"></v-avatar>
                    </v-badge>
                    <div v-else>
                        <img v-if="user.user" alt="Avatar" :src="user.user.avatar" width="40" height="40">
                        <v-avatar v-else color="surface-variant"></v-avatar>
                    </div>

                    <div>
                        <div>
                            <span v-if="user.user == null" class="t14500 mr-5">
                                ناشناس
                            </span>
                            <span v-else class="t14500 mr-5">
                                {{ user.user.first_name }} {{ user.user.last_name }}
                            </span>
                        </div>

                    </div>
                </v-row>
                <v-divider></v-divider>
            </div>

        </div>

        <div v-if="tab === 1" class="position__fixed position__bottom-left">
            <ModalAdminListForChat />
        </div>
    </div>
</div>
</template>

<script>
import ModalAdminListForChat from '@/components/Chat/ModalAdminListForChat.vue'
export default {
    props: {
        userList: [],
        adminList: [],
        getConversation: {
            type: Function
        }
    },
    data: () => ({
        tab: 1
    }),
    components: {
        ModalAdminListForChat
    }

}
</script>
