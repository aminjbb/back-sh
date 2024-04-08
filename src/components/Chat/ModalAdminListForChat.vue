<template>
<div class="text-center">
    <v-btn @click="dialog = true" variant="icon" color="primary500">
        <v-icon>
            mdi-plus
        </v-icon>
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" width="468">
        <v-card>
            <div>
                <div v-for="admin in adminList" :key="`admin${admin.id}`" @click="createChat(admin)" class="pointer">
                    <v-row justify="space-between" align="center" class="pa-8">
                        <v-avatar color="surface-variant">
                            <v-img v-if="admin.avatar" alt="Avatar" :src="admin.avatar"></v-img>
                        </v-avatar>

                        <div>
                            <div>
                                <span class="t14500 mr-5">
                                    {{admin.first_name }} {{admin.last_name}}
                                </span>
                            </div>
                        </div>
                    </v-row>
                    <v-divider></v-divider>
                </div>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Admin from "@/composables/Admin";

export default {

    setup() {
        const {
            getAdmins,
            admin
        } = new Admin()
        return {
            getAdmins,
            admin
        }
    },

    data() {
        return {
            dialog: false,

        }
    },

    mounted() {
        const filter = {
            per_page: 10000
        }
        this.getAdmins(filter)
    },

    methods: {
        createChat(admin) {
            this.$store.commit('set_adminNewChat', admin)
            this.$router.push({
                query: {
                    user_type: 'admin',
                    user_id: admin.id
                }
            })
            this.dialog = false
        }
    },
    computed: {
        adminList() {
            try {
                return this.admin.data
            } catch (error) {
                return []
            }
        }
    }
}
</script>
