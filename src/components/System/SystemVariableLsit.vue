<template>
<div class="h-100 d-flex flex-column align-stretch">
    <v-card height="80" class="ma-5 br-12 stretch-card-header-90">
        <v-row justify="space-between" align="start" class="px-10 pb-4 pt-6">
            <v-col cols="12" class="d-flex justify-center align-center t16500">
                تنظیمات
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch pt-5 scroller px-5" height="580">
        <div v-for="(system , index) in items" :key="`system${index}`" class="mb-10">
            <div class="text-center mb-10 mt-6 t16500">
                {{system.title}}
            </div>
            <div v-for="(systemItem , systemItemIndex) in system.items" :key="`systemItem${systemItemIndex}`">
                <div v-for="(systemItemValue , systemItemValueIndex) in systemItem" :key="`systemItemValue${systemItemValueIndex}`">
                    <v-row class="d-flex justify-space-evenly align-center py-5">
                        <v-col cols="4" class="d-flex justify-center">
                            {{systemItemValue.detail}}
                        </v-col>

                        <v-col cols="2" class="d-flex justify-center number-font">
                            {{splitChar(systemItemValue.value)}}
                        </v-col>

                        <v-col cols="4" class="d-flex justify-center">
                            <input style="border: 1px black solid; width: 50%;" type="text" :ref="`${systemItemValue.id}${systemItemIndex}`" variant="outlined" :placeholder="systemItemValue.detail" />
                        </v-col>

                        <v-col cols="2" class=" d-flex justify-center">
                            <v-btn @click="updateValueSystem(systemItemValue.id , systemItemIndex)" :ref="`btn${systemItemValueIndex}`" rounded variant="icon">
                                <v-icon color="success">mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider />
                </div>

            </div>
        </div>
    </v-card>
</div>
</template>

<script>
import System from '@/composables/System.js'
import {
    splitChar
} from "../../assets/js/functions";
import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {
    data() {
        return {
            form: []
        }
    },
    methods: {
        splitChar,
        async updateValueSystem(id, index) {
            try {
                const AxiosMethod = new AxiosCall()
                const formData = new FormData()
                formData.append('value', this.$refs[`${id}${index}`][0].value)
                AxiosMethod.end_point = `system/setting/admin/crud/update/${id}`
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.form = formData
                AxiosMethod.using_auth = true
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.getSystemSetting()
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    setup() {
        const {
            getSystemSetting,
            items
        } = new System
        return {
            getSystemSetting,
            items
        }
    },

    watch: {

    },

    mounted() {
        this.getSystemSetting()
    },

}
</script>
