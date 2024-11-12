<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

            <div class="h-100 d-flex flex-column align-stretch ">
                <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
                    <v-row
                        justify="start"
                        align="center"
                        class="px-10 py-5">
                        <v-col cols="6">
                            <v-row justify="start">

                                <v-autocomplete
                                    placeholder="نام کالا یا شماره SHPS را جستجو نمایید"
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
                                                        class="text-gray500 t14 w300 text-right" />
                                                </v-col>
                                            </v-row>
                                        </v-list-item>
                                    </template>
                                </v-autocomplete>
                            </v-row>
                        </v-col>
                        <v-col cols="2">
                            <ModalGroupAdd
                                getEndPoint="shipment/csv/get/template"
                                uploadEndpoint="shipment/csv/bulk"
                                :updateShps="updateShps"
                                :isRetail="true"
                            />
                        </v-col>
                    </v-row>
                </v-card>

                <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
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

<!--                    <template v-slot:customSlot4="item">-->
<!--                      <div @click="updateRetailShipment(item.index, item.data)"-->
<!--                           class="seller__add-sku-btn d-flex justify-center align-center pointer">-->
<!--                        <v-icon size="15"> {{item.data.custom4}}</v-icon>-->
<!--                      </div>-->
<!--                    </template>-->


                    <template v-slot:actionSlot="item">
                      <div class="text-center">
                        <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                          mdi-dots-vertical
                        </v-icon>
                      </div>

                      <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                        <v-list class="c-table__more-options">
                          <v-list-item  >
                            <div  class="ma-5 pointer d--rtl"  @click=" deleteSku(item.data.id)">
                              <v-icon class="text-grey-darken-1" size="small">mdi-delete</v-icon>
                              <span class="mr-2 text-grey-darken-1 t13 w400">
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
                <span class="t14 w300">
                انصراف
              </span>
                                    </v-btn>
                                    <v-btn
                                        :loading="loading"
                                        rounded
                                        color="primary500"
                                        variant="elevated"
                                        width="115"
                                        @click="sendShps()"
                                    >

                <span class="t14 w300">
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
import { openToast } from "@/assets/js/functions";
import { AxiosCall } from "@/assets/js/axios_call";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
    setup() {
        const {
            retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header ,headerShps
        } = RetailShipment();

        return {
            retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header ,headerShps
        };
    },

    data(){
        return{
            skuSearchList:[],
            shpsList:[],
            loading:false,
          itemListTable:[]
        }
    },

    components: {
      ShTable,
        DashboardLayout,
        Header,
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
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
        updateShps(shps){
            shps.forEach(element => {
                const object = {
                    sku :{
                        label:element.sku
                    },
                    id:element.shps,
                    count:element.count
                }
                this.assignSku(object)
            })
        },

        updateList(status) {
            if (status === 'true') {
                this.getSkuSeller();
            }
        },

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
        async sendShps(){
            try {
                this.loading = true
                const formData = new FormData()
                this.itemListTable.forEach((shps , index) => {
                    formData.append(`shps_list[${index}][shps]`, shps.id)
                    formData.append(`shps_list[${index}][count]`, shps.custom)
                    formData.append(`shps_list[${index}][min_tolerance]`, shps.custom2)
                    formData.append(`shps_list[${index}][max_tolerance]`, shps.custom3)
                })
                formData.append('factor_id' , this.$route.params.factorId)
                formData.append('type' , 'consignment')
                const AxiosMethod = new AxiosCall()
                AxiosMethod.using_auth = true
                AxiosMethod.store = this.$store
                AxiosMethod.token = this.$cookies.get('adminToken')
                AxiosMethod.end_point = `shipment/consignment/crud/create`
                AxiosMethod.form = formData
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.loading = true
                    openToast(
                        this.$store,
                        'محموله با موفقیت ایجاد گردید.',
                        "success"
                    );
                    this.$router.push(`/retail-shipment/index?factor_id=${this.$route.params.factorId}`)
                }
                else {
                    this.loading = false
                }
            }
            catch (e) {
                this.loading = false
            }
        },
        async assignSku(shps) {
            // const form = {
            //     shps : shps,
            //     maxTolerance :'200',
            //     minTolerance :'0',
            //     count:shps?.count
            // }
            // this.$refs.retailShipmentShps.form.push(form)
          this.itemListTable.push(
              {
                /*
                custom  count
                custom2  low_tolerance
                custom3  max_tolerance
                custom4  icon
                * */
                data: shps,
                id: shps.id,
                sku_label: shps.sku.label,
                custom:  '',
                custom2:  '0',
                custom3:  '200',
                custom4: 'mdi-plus',
              }
          )

        },
        deleteSku(shps){
            const index = this.itemListTable.findIndex(skuShps => skuShps.id === shps)
            if (index > -1) {
                this.itemListTable.splice(index , 1)
            }
        }
    },

    mounted() {
    },

    watch: {
      shpsList(){
        console.log(this.shpsList , 'shpsList')
        if(this.shpsList) {

          this.itemListTable = []
          this.shpsList.forEach((item) => {

          })
        }
      },

        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {
                    this.getSellerList();
                    openToast(
                        this.$store,
                        'انبار با موفقیت حذف شد',
                        "success"
                    );
                    this.$cookies.remove('deleteItem')
                }
            }
        },
        $route(to, from) {
            this.getSkuSeller()
        }
    }
}
</script>
