<template>
    <div class="text-center c-modal-table-filter">
        <v-btn
            @click="openModal()"
            variant="outlined"
            rounded
            class="px-3 mt-1 mr-4">
            <template v-slot:prepend>
                <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
            </template>
            فیلتر
        </v-btn>
    
        <v-dialog
            v-if="dialog"
            v-model="dialog"
            width="1000">
            <v-card>
                <v-row
                    justify="center"
                    align="center"
                    class="pa-5">
                    <v-col cols="5">
                        <v-btn @click="closeModal()" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
    
                    <v-col cols="7">
                        <div class="text-left pl-10">
                            <span class="t14300">
                                فیلتر پیشرفته
                            </span>
                        </div>
                    </v-col>
                </v-row>
    
                <div class="mt-3 mb-8 px-5">
                    <v-divider />
                </div>
    
                <div>
                    <v-row
                        justify="center"
                        align="center"
                        class="px-10 d--rtl">
                        <template v-for="(filter, index) in filterField" :key="index">
                            <v-col v-if="filter.type === 'text'" cols="4">
                                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                                <v-text-field
                                v-if="filter.value == 'id'"
                                    variant="outlined"
                                    :name="filter.value"
                                    v-model="values[index].value" />
                                    </v-col>      
                                    <v-col v-if="filter.type === 'number'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                v-if="filter.value == 'shps_count_from'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder=" از "
                                v-model="values[index].value" />
                            <v-text-field
                                v-if="filter.value == 'shps_count_to'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder=" تا "
                                v-model="values[index].value" />
                            <v-text-field
                                v-if="filter.value == 'shps_variety_from'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder=" از "
                                v-model="values[index].value" />
                            <v-text-field
                                v-if="filter.value == 'shps_variety_to'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder=" تا "
                                v-model="values[index].value" />                
                            
                        </v-col>
                                        
                            <v-col v-else-if="filter.type === 'select'" cols="4">
                                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                                
                                    
                                <v-select
                                    v-if="filter.value === 'status'"
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    item-title="label"
                                    item-value="value"
                                    :items="activeFilter"
                                    v-model="activeModel" />
                                <v-select
                                    v-if="filter.value === 'creator_id'"
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    item-title="label"
                                    item-value="value"
                                    :items="creator"
                                    v-model="followModel" />
                                <v-select
                                    v-if="filter.value === 'type'"
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    item-title="label"
                                    item-value="value"
                                    :items="type"
                                    v-model="indexModel" />
                                
                                
                                
                            </v-col>
    
                            <v-col
                                cols="4"
                                v-else-if=" filter.value === 'sent_to_warehouse_at'"
                                class="mt-3">
                                <div class="t13300 text-right mb-1">{{filter.name}}</div>
                                <div align="center" class="d-flex pb-5 align-center">
                                    <date-picker
                                        
                                        clearable
                                        class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                                        format="jYYYY-jMM-jDD"
                                        display-format="jYYYY-jMM-jDD"
                                        v-model="createdAtModel"
                                        variant="outlined" />
    
                                    
                                </div>
                            </v-col>
                            
                        </template>
                    </v-row>
                </div>
                
    
                <div class="mt-3 mb-5 px-5">
                    <v-divider />
                </div>
    
                <v-row
                    justify="center"
                    align="center"
                    class="px-5 py-5">
                    <v-col cols="6">
                        <v-btn
                            @click="removeAllFilters()"
                            variant="text"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5">
                            حذف همه فیلترها
                        </v-btn>
                    </v-col>
    
                    <v-col cols="6">
                        <div class="text-right">
                            <v-btn
                                @click="setFilter()"
                                color="primary500"
                                height="40"
                                rounded
                                class="px-5 mt-1 mr-5">
                                اعمال تغییرات
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
    } from '@/assets/js/filter_request_shipment.js'
    import {
        AxiosCall
    } from "@/assets/js/axios_call";
    
    import { jalaliToGregorian } from '@/assets/js/functions'
    
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
                createdAtModel: null,
                activeModel: '',
                followModel: '',
                // indexModel: '',
                // pageTypeModel: '',
                gregorianCreateDate: [],
    
                activeFilter: [{
                        label: 'در انتظار',
                        value: 'waiting',
                    },
                    {
                        label: 'در حال بررسی',
                        value: 'in_review',
                    },
                    {
                        label: 'رد شده',
                        value: 'rejected',
                    },
                    {
                        label: ' تایید شده',
                        value: 'approved',
                    }
                ],
                type: [{
                        label: 'همه',
                        value: '',
                    },
                    {
                        label: 'فعال',
                        value: '1',
                    },
                    {
                        label: 'غیرفعال',
                        value: '0',
                    }
                ],
                creator: [{
                        label: 'همه',
                        value: '',
                    },
                    {
                        label: 'حسین نظر زاده',
                        value: 'creator_id',
                    },
                   
                ],
               
            }
        },
    
        computed: {
            label() {
                try {
                    const labelObject = this.values.find(element => element.name === 'label');
                    return labelObject.value
                } catch (error) {
                    return ''
                }
            },
    
            createdAt() {
                if (this.createdAtModel) {
                    if (this.createdAtModel[0] && !this.createdAtModel[1]) {
                        const splitDate = this.createdAtModel[0].split('-')
                        this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                        this.gregorianCreateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                    } else if (this.createdAtModel[0] && this.createdAtModel[1]) {
                        const splitDate = this.createdAtModel[0].split('-')
                        const splitDateUp = this.createdAtModel[1].split('-')
                        this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                        this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
                    }
                }
                return this.gregorianCreateDate;
            },
        },
    
        methods: {
            setFilter() {
            const filter = new PanelFilter()

            if (this.id) {
                filter.id = this.id
            } else if (this.$route.query.id) {
                filter.id = null
            }

            if (this.sentToWarehouseAt && this.sentToWarehouseAt[0]) {
                filter.sent_to_warehouse_at_from = this.sentToWarehouseAt[0]
            } else {
                filter.sent_to_warehouse_at_from = null
            }
            if (this.sentToWarehouseAt && this.sentToWarehouseAt[1]) {
                filter.sent_to_warehouse_at_to = this.sentToWarehouseAt[1]
            } else {
                filter.sent_to_warehouse_at_to = null
            }
            
            if (this.createdAt && this.createdAt[0]) {
                filter.created_at_from_date = this.createdAt[0]
            } else {
                filter.created_at_from_date = null
            }

            if (this.createdAt && this.createdAt[1]) {
                filter.created_at_to_date = this.createdAt[1]
            } else {
                filter.created_at_to_date = null
            }

            if (this.shpsVariety && this.shpsVariety[0]) {
                filter.shps_variety_from = this.shpsVariety[0]
            } else {
                filter.shps_variety_from = null
            }

            if (this.shpsVariety && this.shpsVariety[1]) {
                filter.shps_variety_to = this.shpsVariety[1]
            } else {
                filter.shps_variety_to = null
            }

            if (this.shpsCount && this.shpsCount[1]) {
                filter.shps_count_from = this.shpsCount[1]
            } else {
                filter.shps_count_from = null
            }

            if (this.shpsCount && this.shpsCount[1]) {
                filter.shps_count_to = this.shpsCount[1]
            } else {
                filter.shps_count_to = null
            }

            if (this.type === '') {
                filter.type = null
            } else if (this.type !== '') {
                filter.type = this.type
            } else if (this.$route.query.type) {
                filter.type = this.$route.query.type
            }
            
            console.log(this.type);

            if (this.creatorModel === '') {
                filter.creator_id = null
            } else if (this.creatorModel !== '') {
                filter.creator_id = this.creatorModel
            } else if (this.$route.query.creator_id) {
                filter.creator_id = this.$route.query.creator_id
            }

            console.log(this.creatorModel);

            if (this.statusModel === '') {
                filter.status = null
            } else if (this.statusModel !== '') {
                filter.status = this.statusModel
            } else if (this.$route.query.status) {
                filter.status = this.$route.query.status
            }

            filter.page = 1;

            if (this.$route.query.per_page) {
                filter.per_page = this.$route.query.per_page;
            }

            this.$router.push('/' + this.path + '/' + filter.query_maker());
            this.dialog = false;
        },
    
            removeAllFilters() {
                this.$router.push('/' + this.path);
                this.values = [];
                this.activeModel= '';
                this.followModel= '';
                this.indexModel= '';
                this.filterField.forEach(el => {
                    const form = {
                        name: el.value,
                        value: ''
                    }
    
                    this.values.push(form)
                    this.dialog = false;
                })
            },
    
            openModal() {
                this.dialog = true;
            },
    
            closeModal() {
                this.dialog = false;
            },
    
            async getProvince() {
                const form = {
                    per_page: 10000
                }
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.form = form
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `system/state/crud/index`
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.provinces = data.data.data
                }
            },
    
            async getCities() {
                this.cities = []
                this.cityModel = null
                const form = {
                    per_page: 10000
                }
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.form = form
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `system/state/crud/get/${this.provinceModel}`
                let data = await AxiosMethod.axios_get()
                if (data) {
                    this.cities = data.data.cities
                }
            },
        },
    
        mounted() {
            this.filterField.forEach(el => {
            const form = {
                name: el.value,
                value: ''
            }
            this.values.push(form)
        });
    
            this.getProvince();
        }
    }
    </script>
    