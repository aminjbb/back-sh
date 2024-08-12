<template>
<div class="h-100 d-flex flex-column align-stretch">
    <v-card height="80" class="ma-5 br-12 stretch-card-header-90">
        <v-row justify="space-between" align="start" class="px-10 pb-4 pt-6">
            <v-col cols="12" class="d-flex justify-center align-center t16 w500">
                تنظیمات
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch pt-5 scroller px-5" height="580">
        <div v-for="(system , index) in items" :key="`system${index}`" class="mb-10">
            <div class="text-center mb-10 mt-6 t16 w500">
                {{system.title}}
            </div>
            <div v-for="(systemItem , systemItemIndex) in system.items" :key="`systemItem${systemItemIndex}`">
                <div v-for="(systemItemValue , systemItemValueIndex) in systemItem" :key="`systemItemValue${systemItemValueIndex}`">
                    <v-row class="d-flex justify-space-evenly align-center py-5">
                        <v-col cols="4" class="d-flex justify-center">
                            <template v-if="systemItemValue.value === '*****'">هر ۱ دقیقه یکبار</template>
                            <template v-else-if="systemItemValue.value === '****5/*'">هر ۵ دقیقه یکبار</template>
                            <template v-else-if="systemItemValue.value === '****30/*'">هر ۳۰ دقیقه یکبار</template>
                            <template v-else-if="systemItemValue.value === '****0'">هر ۱ ساعت یکبار</template>
                            <template v-else-if="systemItemValue.value === '****6/*0'">هر ۶ ساعت بکیار</template>
                            <template v-else>
                                {{splitChar(systemItemValue.value)}}
                            </template>
                        </v-col>

                        <v-col cols="2" class="d-flex justify-center number-font">
                          <template v-if="systemItemValue.value === '*****'">هر ۱ دقیقه یکبار</template>
                          <template v-else-if="systemItemValue.value === '****5/*'">هر ۵ دقیقه یکبار</template>
                          <template v-else-if="systemItemValue.value === '****30/*'">هر ۳۰ دقیقه یکبار</template>
                          <template v-else-if="systemItemValue.value === '****0'">هر ۱ ساعت یکبار</template>
                          <template v-else-if="systemItemValue.value === '****6/*0'">هر ۶ ساعت بکیار</template>
                          <template v-else>
                            {{splitChar(systemItemValue.value)}}
                          </template>
                        </v-col>

                        <v-col cols="4" class="d-flex justify-center">
                            <v-select
                                v-if="systemItemValue.key === 'elastic_sync_price_cycle'"
                                :ref="`${systemItemValue.id}${systemItemIndex}`"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="selectItems"
                                v-model="itemSelected" />

                            <input v-else style="border: 1px black solid; width: 50%;" type="text" :ref="`${systemItemValue.id}${systemItemIndex}`" variant="outlined" :placeholder="systemItemValue.detail" />
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
            form: [],
            selectItems:[{
                label:'هر ۱ دقیقه یکبار',
                value:'*****'
            },
            {
                label:'هر ۵ دقیقه یکبار',
                value:'****5/*'
            },
            {
                label:'هر ۳۰ دقیقه یکبار',
                value:'****30/*'
            },
            {
                label:'هر ۱ ساعت یکبار',
                value:'****0'
            },
            {
                label:'هر ۶ ساعت بکیار',
                value:'***6/*0'
            }],
            itemSelected:null,
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
