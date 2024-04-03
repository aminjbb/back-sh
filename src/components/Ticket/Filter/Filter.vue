<template>
<div class="text-center c-modal-table-filter">
    <v-btn @click="openModal()" variant="outlined" rounded class="px-3 mt-1 mr-4">
        <template v-slot:prepend>
            <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
        </template>
        فیلتر
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" width="1000">
        <v-card>
            <v-row justify="center" align="center" class="pa-5">
                <v-col cols="5">
                    <v-btn @click="closeModal()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7">
                    <div class="text-left pl-10">
                        <span class="t14300">
                            فیلتر
                        </span>
                    </div>
                </v-col>
            </v-row>

            <div class="mt-3 mb-8 px-5">
                <v-divider />
            </div>

            <div>
                <v-row justify="center" align="center" class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <v-col v-if="filter.type === 'text'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>

                            <v-text-field variant="outlined" :name="filter.value " v-model="values[index].value" />
                        </v-col>

                        <v-col cols="4" v-else-if="filter.type === 'select' && filter.value === 'user_id'">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                           <v-autocomplete
                                placeholder="شماره تلفن کاربر را وارد کنید"
                                variant="outlined"
                                prepend-inner-icon-cb="mdi-map-marker"
                                rounded="lg"
                                v-model="userModal"
                                :items="userList"
                                item-title="name"
                                item-value="value"
                                v-debounce="searchUser" />
                        </v-col>

                        <v-col cols="4" v-else-if="filter.type === 'select' && filter.value !== 'user_id'">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>

                            <v-select v-if="filter.value == 'status'" density="compact" variant="outlined" single-line item-title="label" item-value="value" :items="statusList" v-model="statusModel" />
                            <v-select v-if="filter.value == 'priority'" density="compact" variant="outlined" single-line item-title="label" item-value="value" :items="priorityList" v-model="priorityModel" />
                        </v-col>
                    </template>
                </v-row>
            </div>

            <div class="mt-3 mb-5 px-5">
                <v-divider />
            </div>

            <v-row justify="center" align="center" class="px-5 py-5">
                <v-col cols="6">
                    <v-btn @click="removeAllFilters()" variant="text" height="40" rounded class="px-5 mt-1 mr-5">
                        حذف همه فیلترها
                    </v-btn>
                </v-col>

                <v-col cols="6">
                    <div class="text-right">
                        <v-btn @click="setFilter()" color="primary500" height="40" rounded class="px-5 mt-1 mr-5">
                            مشاهده
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    PanelFilter
} from '@/assets/js/filter.js'
import value from "@/composables/Export";
import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {
    props: {
        filterField: [],
        path: ''
    },

    data() {
        return {
            dialog: false,
            active: false,
            values: [],
            originalData: [],
            filteredData: [],
            statusList: [{
                    label: 'همه وضعیت‌ها',
                    value: ''
                },
                {
                    label: 'باز',
                    value: 'open'
                },
                {
                    label: 'پاسخ داده شده',
                    value: 'answered'
                },
                {
                    label: 'بسته شده',
                    value: 'resolved'
                },
                {
                    label: 'متوقف شده',
                    value: 'postponed'
                },
                {
                    label: 'دیده شده',
                    value: 'seen'
                }
            ],
            priorityList: [{
                    label: 'همه اولیوت‌ها',
                    value: ''
                },
                {
                    label: 'ضروری',
                    value: 'urgent'
                },
                {
                    label: 'پایین',
                    value: 'low'
                },
                {
                    label: 'بالا',
                    value: 'high'
                },
                {
                    label: 'متوسط',
                    value: 'medium'
                }
            ],
            statusModel: '',
            priorityModel: '',
            userSearchList: [],
            userModal: null,
        }
    },

    computed: {
        userList(){
            try {
                let users = []
                this.userSearchList.forEach(user => {
                    const name = user && user.first_name!==null ? user.first_name :'بدون نام';
                    const family = user && user.last_name!==null ? user.last_name :'';
                const form = {
                    name: name + ' ' + family + '(' + user.phone_number + ')',
                    value: user
                }
                users.push(form)
                })
                return users
            } catch (e) {
                return e
            }
        },

        id() {
            try {
                const idObject = this.values.find(element => element.name === 'id');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        title() {
            try {
                const titleObject = this.values.find(element => element.name === 'title');
                return titleObject.value
            } catch (error) {
                return ''
            }
        },

        code() {
            try {
                const codeObject = this.values.find(element => element.name === 'code');
                return codeObject.value
            } catch (error) {
                return ''
            }
        },

    },

    methods: {
        value,

        setFilter() {

            const filter = new PanelFilter()

            if (this.statusModel) {
                filter.status = this.statusModel
            } else {
                filter.status = null
            }

            if (this.userModal && this.userModal.id) {
                filter.user_id = this.userModal.id
            } else if (this.$route.query.id) {
                filter.user_id = null
            }

            if (this.priorityModel) {
                filter.priority = this.priorityModel
            } else {
                filter.priority = null
            }

            if (this.code) {
                filter.code = this.code
            } else {
                filter.code = null
            }

            if (this.title) {
                filter.title = this.title
            } else {
                filter.title = null
            }

            if (this.$route.query.per_page) {
                filter.per_page = this.$route.query.per_page;
            }
            filter.page = 1;
            this.$router.push('/' + this.path + '/' + filter.query_maker());
            this.dialog = false;
        },

        removeAllFilters() {
            this.$router.push('/' + this.path);
            this.values = [];
            this.userModal = null;

            this.filterField.forEach(el => {
                const form = {
                    name: el.value,
                    value: ''
                }

                this.values.push(form)
                this.dialog = false;
            })
        },

        async searchUser(search) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.userSearchList = data.data.data
            }
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        }
    },

    mounted() {
        this.filterField.forEach(el => {
            const form = {
                name: el.value,
                value: ''
            }
            this.values.push(form)
        })
    }
}
</script>I
