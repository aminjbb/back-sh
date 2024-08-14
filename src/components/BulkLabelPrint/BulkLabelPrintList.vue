<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="200" class="ma-5 br--12 stretch-card-header-90">
      <v-row
          justify="start"
          align="start"
          class="px-10 py-5">
        <v-col
            cols="12"
            class="d-flex justify-center align-center t14 w500">
          اسکن شناسه بسته
        </v-col>
        <v-divider color="grey"/>
        <v-col cols="12" md="6">
          <div class="text-right ">
            <span class="text-gray600 t14 w500">شناسه بسته</span>
            <span class="text-error">*</span>
          </div>
          <div>
            <v-text-field
                :autofocus="true"
                variant="outlined"
                :rules="rule"
                @keyup.enter="scanPackageId()"
                v-model="scanPackage"/>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="text-right ">
            <span class="text-gray600 t14 w500">شناسه کالا</span>
            <span class="text-error">*</span>
          </div>
          <div>
            <v-text-field
                variant="outlined"
                v-model="barcodeShps"/>
          </div>
        </v-col>

        <v-col cols="3">
          <div class="d-flex justify-start pt-5">
            <v-btn
                color="primary500"
                @click="filterShps()"
                height="40"
                rounded
                class="px-8 mt-1">
              ثبت
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="cargoReceivingHeader"
          :items="itemListTable"
          :page="1"
          :perPage="1000"
          :loading="loading"

          :getShpsList="getShpsList"
      >

          <template v-slot:customSlot="item">
              <div class="seller__add-sku-btn d-flex justify-center align-center pointer"
                  @click="submitShipmentsForm(item.data.id , item.data.shipment_id , item.data.shps)">
                  <v-icon size="15">
                      {{ submittedItemId === item.data.id || item.data.label_printed === 1 ? 'mdi-check' : 'mdi-plus' }}
                  </v-icon>
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
                      <v-list-item>
                          <v-list-item-title>
                              <div
                                  class="ma-5 pointer"
                                  @click=packageManagement(item.data)>
                                  <v-icon size="small" class="text-grey-darken-1">mdi-pen</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14300">
                                      مدیریت بسته
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                          <v-list-item-title>
                              <div
                                  class="ma-5 pointer"
                                  @click=print(item.data)>
                                  <v-icon size="small" class="text-grey-darken-1">mdi-pen</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14300">
                                      پرینت
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list-item>


                  </v-list>
              </v-menu>
          </template>
      </ShTable>
      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="px-5 py-2" justify="end">
          <v-btn
              @click="packingData()"
              color="primary500"
              height="40"
              rounded
              variant="flat"
              class="px-8 mt-2">
            بستن بسته
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

  <PackageManagementModal :getShpsList="getShpsList" :packageId="packageId" :shpsId="shps_id" :shipmentId="shipmentId"/>
  </div>
</template>

<script>
//Components
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import BulkLabelPrintList from '@/composables/BulkLabelPrint';
import {openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from '@/assets/js/axios_call.js'
import ShTable from "@/components/Components/Table/sh-table.vue";
import PackageManagementModal from "@/components/BulkLabelPrint/Modal/PackageManagementModal.vue";


export default {
  components: {
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    PackageManagementModal,
    ShTable,
  },

  data() {
    return {
      scanPackage:'',
      packageId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      closePackageLoading :false,
      shipmentShpsListFilterd:[],
      barcodeShps:null,
      itemListTable: [],
      submittedItemId: null,
      shps_id: null,
      shipmentId: null,
    }
  },

  setup() {
    const {
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      filterField,
      loading,
      getShpsList,
      shpsList
    } = BulkLabelPrintList();
    return {
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      filterField,
      loading,
      getShpsList,
      shpsList
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal;
    }
  },

  watch: {
    barcodeShps(value) {
      if (value === '' || !value) {
        this.shipmentShpsListFilterd = this.shpsList.shps_list
      }
    },
    shpsList(){
      this.shipmentShpsListFilterd = this.shpsList.shps_list
    },
    cargo(newCargoId) {
      if (newCargoId) {
        this.fetchCargoData(newCargoId);
        this.updatePackageIdInStore();
      }
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getCategories()
          this.$cookies.remove('deleteItem')
        }
      }
    },
    dataTableLength(val) {
      this.addPerPage(val)
    },
    $route() {
      this.fetchCargoData();
    },

    shipmentShpsListFilterd() {
          this.itemListTable = []
          this.shipmentShpsListFilterd.forEach((item) => {
              this.itemListTable.push(
                  {
                      shps: item.shps,
                      sku_label: item.sku.label ? item.sku.label : 'نامعلوم',
                      packed_count: item.packed_count ? item.packed_count : 'نامعلوم',
                      shipment_id: item.shipment_id ? item.shipment_id : 'نامعلوم',
                      custom: null,
                      id: item.id,
                      label_printed: item.label_printed
                  }
              )
          })
      },
  },

  methods: {
    async filterShps() {
      if (this.barcodeShps && this.barcodeShps !== "") {
        const filterData = this.shipmentShpsListFilterd.find(element => {
          return element.sku.barcode == this.barcodeShps
        })

        if (filterData) {
          this.shipmentShpsListFilterd = []

          this.shipmentShpsListFilterd.push(filterData)
        } else {
          openToast(this.$store, 'شناسه کالا وجود ندارد')
        }
      } else {
        this.shipmentShpsListFilterd = this.shipmentShpsList
      }
    },
    scanPackageId(){

      const packageSplit = this.scanPackage.split('-')
      let PackageScan = ''
      if (packageSplit[1]){
        this.packageId = packageSplit[1]
        PackageScan = packageSplit[1]
      }
      else{
        this.packageId = this.scanPackage
        PackageScan = this.scanPackage
      }
      this.scanPackage = ''
      this.getShpsList(PackageScan, this.$store);
    },
    async packingData() {
      try {
        let packageId = null
        if (this.packageId.includes('-')) {
          const cargoSplit = this.packageId.split('-')
          if (cargoSplit[1]) packageId = cargoSplit[1]
          else packageId = this.packageId
        } else packageId = this.packageId
        this.closePackageLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `package/crud/update/status/${packageId}`
        AxiosMethod.form = formData
        formData.append('status', 'received_by_warehouse')
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.shipmentShpsListFilterd= []
          this.closePackageLoading = false
          openToast(
              this.$store,
              'بسته با موفقیت ویرایش گردید',
              "success"
          );
        }
      }
      catch (e) {
        this.closePackageLoading = false
      }
    },

    updatePackageIdInStore() {
      this.$store.commit('set_packageId', this.cargo);
    },

    filterDataById(id) {
      if (!id) {
        this.filteredCargoData = this.allCargoData;
        return;
      }
      this.filteredCargoData = this.allCargoData.filter(item => item.id === id);
    },

    /**
     * Change Header Status
     * @param {*} index
     * @param {*} value
     */
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },


      print(item) {
          window.open(`${import.meta.env.VITE_API_SITEURL}processing-shipment/${item.shipment_id}/${item.shps}/${this.packageId}/barcode-print`, '_blank');
      },
      packageManagement(item){
          this.shipmentId = item.shipment_id
          this.shps_id = item.shps
          this.$store.commit('set_packageManagementModal' , true)
      },

      async submitShipmentsForm(itemId, shipmentId , shps) {
          let packageId = null
          if (this.packageId.includes('-')) {
              const cargoSplit = this.packageId.split('-')
              if (cargoSplit[1]) packageId = cargoSplit[1]
              else packageId = this.packageId
          } else packageId = this.packageId
          let formdata = new FormData();
          const AxiosMethod = new AxiosCall();
          AxiosMethod.end_point = 'package/shps/print/label';
          AxiosMethod.form = formdata

          formdata.append('package_id', packageId);

          formdata.append('shps', shps);
          formdata.append(`shipment_id`, shipmentId);
          AxiosMethod.store = this.$store;
          AxiosMethod.using_auth = true;
          AxiosMethod.token = this.$cookies.get('adminToken');

          try {
              let data = await AxiosMethod.axios_post();
              if (data) {
                  openToast(this.$store, 'با موفقیت ذخیره شد', "success");
                  this.submittedItemId = itemId

                  this.submitShipmentsForm()
              }
          } catch (error) {
              console.error("Error submitting form:", error);
          }
      },
  }
}
</script>
