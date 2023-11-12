<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="start"
            align="center"
            class="px-10 py-3">
            <v-col cols="6">
                <v-autocomplete
                    placeholder="شماره SHPS را جستجو نمایید"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="skuSearchList"
                    item-title="id"
                    class="number-font"
                    return-object
                    v-debounce:1s.unlock="searchSku">

                    <template v-slot:item="item">
                        <v-list-item>
                            <v-row justify="center" align="center">
                                <v-col cols="4">
                                    <div @click="assignSkuToSlider(item.props.value.id,item.props.value.sku_id)" class="seller__add-sku-btn d-flex justify-center align-center">
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
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="SliderSkuHeader"
            :items="skuList.skus"
            :page="page"
            :perPage="dataTableLength"
            activePath="page/crud/update/activation/"
            :loading="loading"
            updateUrl="page/csv/mass-update"
            :deletePath="`page/slider/${$route.params.sliderId}/sku/detach/`"
            model="page"
            @updateList="updateList" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start">
                    <ModalExcelDownload getEndPoint="page/csv/get/export" />
                    

                </v-col>

                <v-col cols="6" class="d-flex justify-center">
                    <div class="text-center">
                        <v-pagination
                            v-model="page"
                            :length="pageLength"
                            rounded="circle"
                            size="40"
                            :total-visible="4"
                            prev-icon="mdi-chevron-right"
                            next-icon="mdi-chevron-left" />
                    </div>
                </v-col>

                <v-col cols="3" class="d-flex justify-end">
                    <div
                        align="center"
                        id="rowSection"
                        class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>

                        
                        <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
                        
                       
                    </div>
                </v-col>
            </v-row>
            
        </v-card-actions>
        <v-divider />
        <v-card-actions class="mt-auto">
        <v-row justify="end" class="px-8 py-4">
          <v-btn
            color="white"
            height="40"
            rounded
            style="background-color: #E91E63;"
            class="px-8"
            @click="goBack"
          >
            تایید و ثبت
          </v-btn>
        </v-row>
      </v-card-actions>

    </v-card>
</div>
</template>

<script>
import Table from '@/components/PageSliders/Table/SkuTable.vue'
import Page from "@/composables/Page";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
import {
    AxiosCall
} from "@/assets/js/axios_call";

export default {
    data() {
        return {
            skuSelected: null,
            skuSearchList: []
        }
    },
    setup(props) {
        const {
            pageLength,
            getSliderSkuList,
            skuList,
            filterField,
            dataTableLength,
            page,
            SliderSkuHeader,
            addPagination,
            addPerPage,
            loading,
        } = Page();
        return {
            pageLength,
            getSliderSkuList,
            skuList,
            filterField,
            dataTableLength,
            page,
            SliderSkuHeader,
            addPagination,
            addPerPage,
            loading,
        };
    },

    components: {
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },
    },

    methods: {
        changeHeaderShow(index, value) {
            this.SliderHeader[index].show = value
        },
        async searchSku(search) {
            this.skuSearchList = []

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/sku/search?id=${search}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.skuSearchList = data.data.data
            }
        },

        async assignSkuToSlider(id, skuId) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `page/slider/${this.$route.params.sliderId}/sku/attach`

            formData.append('shps', id)
            formData.append('sku_id', skuId)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                openToast(
                    this.$store,
                    'کد کالا با موفقیت افزوده شد.',
                    "success"
                );
                this.getSliderSkuList();
            } else {
                openToast(
                    this.$store,
                    'افزودن کالا با مشکل مواجع شد.',
                    "error"
                );
            }
        },

        goBack() {
    if (this.$router) {
      this.$router.back();
    } else {
      console.error('Router instance is not available');
    }
  },
        updateList(status) {
            if (status === 'true') {
                this.getSliderSkuList();
            }
        },
    },

    mounted() {
        this.getSliderSkuList();
        this.searchSku('')
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {
                    this.getSliderSkuList();
                    openToast(
                        this.$store,
                        'اسلایدر مورد نظر با موفقیت حذف شد',
                        "success"
                    );
                    this.$cookies.remove('deleteItem')
                }
            }
        },
    }
}
</script>
