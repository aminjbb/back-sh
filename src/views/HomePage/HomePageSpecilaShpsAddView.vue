<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <AddSphsToSpecialSale />-->
      <div class="h-100 d-flex flex-column align-stretch sku-seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-autocomplete
                    placeholder="نام کالا یا شماره SKU را جستجو نمایید"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="skuSearchList"
                    item-title="name"
                    return-object
                    v-debounce="searchSku">

                  <template v-slot:item="item">
                    <v-list-item>
                      <v-row justify="center">

                        <v-col cols="4">

                          <div @click="assignSku(item)" class="seller__add-sku-btn d-flex justify-center align-center">
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


            <v-col cols="6">
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="homePageSkuHeader"
              :items="itemListTable"
            >
              <template v-slot:customSlot="item">
                  <v-text-field  v-model="item.data.priority"  type="number"  variant="outlined" />
              </template>

              <template v-slot:customSlot2="item">
                  <div @click="updateSku(item.data.id , item.data.shps , item.data.priority)"
                      class="seller__add-sku-btn d-flex justify-center align-center pointer">

                      <v-icon size="15">mdi-plus</v-icon>
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
                          <v-list-item-title>
                              <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                  <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        حذف
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list>
                  </v-menu>
              </template>
          </ShTable>
          <v-divider />
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const AddSphsToSpecialSale = defineAsyncComponent(()=> import ('@/components/HomePage/Add/AddShpsToSpecialSale.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Seller from "@/composables/Seller";
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import { AxiosCall } from "@/assets/js/axios_call";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  setup(props) {
    const {
      getSkuSeller , sellerSku,headerSku,
      filterFieldSku ,skuPage ,dataSkuTableLength,addSkuPerPage,pageLength
    } = Seller();
    const {
      homePageSingleSlider ,getHomePageSingleSlider , homePageSkuHeader
    } = new Home()
    return {
      getSkuSeller , sellerSku,headerSku,filterFieldSku,addSkuPerPage , pageLength,
      skuPage ,dataSkuTableLength ,  homePageSingleSlider ,getHomePageSingleSlider, homePageSkuHeader
    };
  },

  data(){
    return{
      skuSearchList:[],
      itemListTable: []
    }
  },

  components: {
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
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
        data.data.data.forEach(element=>{
          const form = {
            name: element?.sku?.label + '(' + element?.id + ')',
            value:element
          }
          this.skuSearchList.push(form)
        })
      }
    },
    async assignSku(item) {
      console.log(item)
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `page/home/section/slider/${this.$route.params.specialId}/sku/attach`
      formData.append('shps', item?.item?.value?.id)
      formData.append('sku_id', item?.item?.value?.sku?.id)
      formData.append('priority', 1)
      formData.append('is_active', 0)
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.getHomePageSingleSlider()
        openToast(
            this.$store,
            'کد کالا با موفقیت افزوده شد.',
            "success"
        );
      }
    },

      removeItem(id) {
        openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", `page/home/section/slider/${this.$route.params.specialId}/sku/detach/`+id, true)
      },
      async updateSku(id, shps, priority) {
          const formData = new FormData()
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.store = this.$store
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = `page/home/section/slider/${this.$route.params.specialId}/sku/attach`
          formData.append('shps', shps)
          formData.append('sku_id', id)
          formData.append('priority', priority)
          AxiosMethod.form = formData
          let data = await AxiosMethod.axios_post()
          if (data) {
              openToast(
                  this.$store,
                  'کد کالا با موفقیت ویرایش شد.',
                  "success"
              );
          }

      },
  },

  mounted() {
    this.getHomePageSingleSlider()
  },

  watch: {
    dataSkuTableLength(val) {
      this.addSkuPerPage(val)
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getHomePageSingleSlider()
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

    homePageSingleSlider() {
        if(this.homePageSingleSlider.skus) {

            this.itemListTable = []
            this.homePageSingleSlider.skus.forEach((item) => {
                this.itemListTable.push(
                    {
                        id: item.id,
                        shps: item.pivot?.shps,
                        label: item.label,
                        seller: item.seller?.full_name,
                        customer_price: item.customer_price ? item.customer_price : '---',
                        priority: item.pivot.priority
                    }
                )
            })
        }
    },
  }
}
</script>
