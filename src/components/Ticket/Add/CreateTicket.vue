<template>
<div class="h-100 d-flex flex-column align-stretch">

    <v-card height="150" class="ma-5 br--12 ">
        <v-row
            justify="center"
            align="center"
            class="pa-5 pt-7">
            <v-col cols="3">
                <div class="text-right mb-3">
                    <span class="t14 w500">
                        کاربر
                    </span>
                </div>
                <v-autocomplete
                    :items="userList"
                    v-model="selectedUser"
                    return-object
                    clearable
                    variant="outlined"
                    no-data-text="محصولی برای نمایش وجود ندارد"
                    v-debounce="searchUser" />
            </v-col>

            <v-col cols="3">
                <div class="text-right mb-3">
                    <span class="t14 w500">
                        عنوان
                    </span>
                </div>
                <v-text-field
                    v-model="title"
                    clearable
                    variant="outlined"
                    type="text" />
            </v-col>

            <v-col cols="3">
                <div class="text-right mb-3">
                    <span class="t14 w500">
                        اولیت
                    </span>
                </div>
                <v-select
                    v-model="priority"
                    variant="outlined"
                    :items="priorities" />
            </v-col>
        </v-row>
    </v-card>

    <v-card class="pa-15 flex-grow-1 d-flex flex-column align-stretch">
        <v-row justify="center" class="mb-5">
            <v-col cols="10">
                <div class="text-right mb-3">
                    <span class="t14 w500">
                        پیام
                    </span>
                </div>
                <ckeditor
                    v-model="content"
                    :config="editorConfig"
                    class="cke_rtl mb-15" />
            </v-col>
        </v-row>

        <v-card-actions>
            <v-row justify="end">
                <v-btn
                    :loading="loading"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1"
                    variant="outlined"
                    @click="createTicket()">
                    <template v-slot:prepend>
                        <v-icon>mdi-plus</v-icon>
                    </template>
                    تایید
                </v-btn>

                <v-btn
                    @click="$router.go(-1)"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 mr-5">
                    <template v-slot:prepend>
                        <v-icon>mdi-cancel</v-icon>
                    </template>
                    انصراف
                </v-btn>
            </v-row>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import User from '@/composables/User'
import {AxiosCall} from "@/assets/js/axios_call";
import { component as ckeditor } from '@mayasabha/ckeditor4-vue3'

export default {
    setup() {
        const {
            users,
            getUsers
        } = new User
        return {
            users,
            getUsers
        };

    },

    components: {
        ckeditor
    },

    data: () => ({
        selectedUser: null,
        loading: false,
        title: null,
        priority: null,
        content: null,
        priorities: [{
                title: 'فوری',
                value: 'urgent'
            },
            {
                title: 'بالا',
                value: 'high'
            },
            {
                title: 'معمولی',
                value: 'medium'
            },
            {
                title: 'پایین',
                value: 'low '
            },
        ],
        editorConfig: {
            language: 'en',
            contentsLangDirection: 'rtl',
        },
    }),

    methods: {
        searchUser(e) {
            const filter = {
                per_page: 10,
                phone_number: e
            }
            this.getUsers(filter)
        },

        async createTicket() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'ticket/admin/crud/create'
            AxiosMethod.form = formdata
            formdata.append('user_id', this.selectedUser.value)
            formdata.append('title', this.title)
            formdata.append('priority', this.priority)
            formdata.append('content', this.content)
            formdata.append('status', 'open')

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/ticket/index')

            } else {
                this.loading = false
            }
        }
    },

    mounted() {
        const filter = {
            per_page: 10
        }
        this.getUsers(filter)
    },

    computed: {
        userList() {
            try {
                let users = []
                this.users.data.forEach(user => {
                    const form = {
                        title: user.first_name + ' ' + user.last_name + ' (' + user.phone_number + ') ',
                        value: user.id
                    }
                    users.push(form)
                })
                return users
            } catch (e) {
                return []
            }
        }
    }
}
</script>
