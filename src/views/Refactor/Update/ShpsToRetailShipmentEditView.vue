<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

            <div class="h-100 d-flex flex-column align-stretch ">
                <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
                    <v-row
                        justify="start"
                        align="center"
                        class="px-10 py-5">
                        <v-col cols="6">
                            <v-row justify="start">

                                <v-autocomplete
                                    placeholder="نام کالا یا شماره shps را جستجو نمایید"
                                    variant="outlined"
                                    prepend-inner-icon-cb="mdi-map-marker"
                                    rounded="lg"
                                    :items="skuList"
                                    item-title="name"
                                    item-value="value"
                                    v-debounce="searchSku">

                                    <template v-slot:item="item">
                                        <v-list-item>
                                            <v-row justify="center">

                                                <v-col cols="4">

                                                    <div @click="assignSku(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
                                                        <v-icon>mdi-plus</v-icon>
                                                    </div>

                                                </v-col>
                                                <v-col cols="8">
                                                    <text-clamp
                                                        :text='item?.props?.title'
                                                        :max-lines='1'
                                                        autoResize
                                                        location="start"
                                                        class="text-gray500 t14300 text-right" />
                                                </v-col>
                                            </v-row>
                                        </v-list-item>
                                    </template>
                                </v-autocomplete>
                            </v-row>
                        </v-col>
                        <v-col cols="2">

                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
                    <ShTable
                        ref="retailShipmentShps"
                        class="flex-grow-1"
                        :headers="headerShps"
                        :items="itemListTable"
                    >
                        <template v-slot:customSlot="item">
                            <v-text-field v-model="item.data.custom" variant="outlined"/>
                        </template>
                        <template v-slot:customSlot2="item">
                            <v-text-field v-model="item.data.custom2" variant="outlined"/>
                        </template>
                        <template v-slot:customSlot3="item">
                            <v-text-field v-model="item.data.custom3" type="number" variant="outlined"/>
                        </template>

                        <template v-slot:customSlot4="item">
                            <div @click="updateRetailShipment(item.index, item.data)"
                                 class="seller__add-sku-btn d-flex justify-center align-center pointer">
                                <v-icon size="15"> {{item.data.custom4}}</v-icon>
                            </div>
                        </template>


                        <template v-slot:actionSlot="item">
                            <div class="text-center">
                                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                                    mdi-dots-vertical
                                </v-icon>
                            </div>

                            <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                                <v-list class="c-table__more-options">
                                    <v-list-item  :disabled="retailShipment?.status === 'in_review' || retailShipment?.status === 'approved'">
                                        <div  class="ma-5 pointer d--rtl"  @click=" removeItem(item.data.id)">
                                            <v-icon class="text-grey-darken-1" size="small">mdi-delete</v-icon>
                                            <span class="mr-2 text-grey-darken-1 t13400">
                                                حذف
                                            </span>
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </ShTable>
                    <v-divider />

                    <v-card-actions class="pb-3">
                        <v-row class="px-8">
                            <v-col cols="3" class="d-flex justify-start">

                            </v-col>

                            <v-col cols="6" class="d-flex justify-center">

                            </v-col>

                            <v-col cols="3" class="d-flex justify-end">
                                <div  class="d-flex align-center">
                                    <v-btn
                                        :loading="loading"
                                        rounded
                                        variant="text"
                                        width="115"
                                        @click="$router.go(-1)"
                                    >
                <span class="t14300">
                انصراف
              </span>
                                    </v-btn>
                                    <v-btn
                                        :loading="loading"
                                        rounded
                                        color="primary500"
                                        variant="elevated"
                                        width="115"
                                        @click="$router.go(-1)"
                                    >

                <span class="t14300">
                تایید
              </span>
                                    </v-btn>


                                </div>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>

        </v-main>
    </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

import RetailShipment from "@/composables/RetailShipment";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
    setup() {
        const {
            retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
        } = RetailShipment();

        return {
            retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
        };
    },

    data(){
        return{
            skuSearchList:[],
            shpsList:[],
            loading:false,
            retailShipment:null,
            itemListTable: [],
        }
    },

    components: {
        DashboardLayout,
        Header,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
        ShTable
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },

        skuList() {
            try {
                let sku = []
                this.skuSearchList.forEach(skuSearch => {
                    const form = {
                        name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
                        value: skuSearch
                    }
                    sku.push(form)
                })
                return sku
            } catch (e) {
                return []
            }
        },
    },

    methods: {
        async searchSku(search) {
            this.skuSearchList = []

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/sku/search?q=${search}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.skuSearchList = data.data.data
            }
        },
        async getRetailShipmentDetail(item) {

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/consignment/crud/get/${this.$route.params.retailId}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.retailShipment =data.data
            }
        },
        async assignSku(shps) {
            const AxiosMethod = new AxiosCall()
            const formData = new FormData()
            AxiosMethod.using_auth = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/consignment/${ this.$route.params.retailId }/attach/shps`
            formData.append('shps' , shps.id)
            formData.append('count' , 1)
            formData.append('min_tolerance' , 1)
            formData.append('max_tolerance' , 100)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = true
                const form = {
                    shps : shps.id,
                    maxTolerance :100,
                    minTolerance :1,
                    count:1
                }
                this.$refs.retailShipmentShps.form.push(form)
                this.getRetailShipmentDetail()
                openToast(
                    this.$store,
                    'محموله با موفقیت ایجاد گردید.',
                    "success"
                );
            }
            else {
                this.loading = true
            }

        },

        removeItem(id) {
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", `shipment/consignment/${this.$route.params.retailId}/detach/shps/` + id, true)
        },
        async updateRetailShipment(index, item) {
            try {
                if (parseInt(item.custom) >= 0 && parseInt(item.custom2) >= 0 && parseInt(item.custom3) >= 0) {
                    if (parseInt(item.custom2) > parseInt(item.custom3)) {
                        openToast(
                            this.$store,
                            'تلورانس پایین نمیتواند بیشتر از تلورانس بالا باشد',
                            "error"
                        );
                    } else {
                        const formData = new FormData()
                        const AxiosMethod = new AxiosCall()
                        AxiosMethod.using_auth = true
                        AxiosMethod.store = this.$store
                        AxiosMethod.token = this.$cookies.get('adminToken')
                        AxiosMethod.end_point = `shipment/consignment/${this.$route.params.retailId}/attach/shps`
                        formData.append('shps', item.id)
                        formData.append('count', item.custom)
                        formData.append('min_tolerance', item.custom2)
                        formData.append('max_tolerance', item.custom3)
                        AxiosMethod.form = formData
                        let data = await AxiosMethod.axios_post()
                        if (data) {
                            openToast(
                                this.$store,
                                ' کالا با موفقیت ویرایش شد.',
                                "success"
                            );
                        }
                    }
                } else {
                    openToast(
                        this.$store,
                        ' وارد کردن عدد منفی مجاز نیست .',
                        "error"
                    );
                }
            } catch (e) {

            }
        },

    },

    mounted() {
        this.getRetailShipmentDetail()
    },

    watch: {
        dataSkuTableLength(val) {
        },
        confirmModal(val) {
            if (localStorage.getItem('deleteObject') === 'done') {
                if (!val) {
                    this.getRetailShipmentDetail();
                    openToast(
                        this.$store,
                        'محصول با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },
        $route(to, from) {
            this.getSkuSeller()
        },

        retailShipment() {
            if(this.retailShipment.shps_list) {

                this.itemListTable = []
                this.retailShipment.shps_list.forEach((item) => {
                    this.itemListTable.push(
                        {
                            /*
                            custom  count
                            custom2  low_tolerance
                            custom3  max_tolerance
                            custom4  icon
                            * */
                            data: item,
                            id: item.id,
                            sku_label: item.sku_label,
                            custom:  item.shps_count,
                            custom2: item.min_tolerance_percent,
                            custom3: item.max_tolerance_percent,
                            custom4: 'mdi-plus',
                        }
                    )
                })
            }
        },
    }
}
</script>
