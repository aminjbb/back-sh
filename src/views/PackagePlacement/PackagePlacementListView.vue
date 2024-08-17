<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <PackagePlacementList />-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card height="300" class="ma-5 br--12 ">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="5">
              <div>
                <div class="text-right d-block mb-2">
                  <span class="text-gray600 t14 w500">شناسه بسته</span>
                  <span class="text-error">*</span>
                </div>
                <div>
                  <v-text-field :autofocus="true" v-model="packageId" variant="outlined"/>
                </div>
              </div>
            </v-col>
            <v-col cols="5">
              <div>
                <div class="text-right d-block mb-2">
              <span class="text-gray600 t14 w500">
                شماره جایگاه
              </span>
                  <span class="text-error">*</span>
                </div>
                <div>
                  <v-autocomplete
                      :items="locatingPlacement"
                      v-model="shelf"
                      variant="outlined"/>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row justify="end" align="center">
            <v-btn
                @click="addPackage()"
                :loading="loadingBtn"
                color="primary500"
                :disabled="!(shelf&&packageId)"
                height="40"
                rounded
                class="ml-15 px-8 mt-2">
              ذخیره
            </v-btn>
          </v-row>
        </v-card>
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
          >
            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">

                  <v-list-item >
                    <v-list-item-title>
                      <div  class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                        حذف
                                  </span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider/>

        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const PackagePlacementList = defineAsyncComponent(()=> import ('@/components/PackagePlacement/PackagePlacementList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import PackagePlacement from '@/composables/PackagePlacement';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  components: {
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    ShTable,
    DashboardLayout,
    Header
  },
  data() {
    return {
      packageId: null,
      shelf: null,
      loadingBtn: false,
      locatingPlacement: [],
      itemListTable: []
    }
  },
  setup() {
    const {
      pageLength,
      packagePlacement,
      addPerPage,
      getPackagePlacement,
      dataTableLength,
      page,
      header,
      item,
      loading
    } = PackagePlacement();
    return {
      pageLength,
      packagePlacement,
      addPerPage,
      getPackagePlacement,
      dataTableLength,
      page,
      header,
      item,
      loading,

    };
  },
  mounted() {
    this.getPackagePlacement()
    for (let number = 1; number <= 500; number++) {
      this.locatingPlacement.push(number)
    }
  },
  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
    splitPackageId() {
      try {
        const splitData = this.packageId.split('-')
        if (splitData[1]) return splitData[1]
        else {
          return this.packageId
        }
      } catch (e) {
        return ''
      }
    }
  },

  watch: {
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getPackagePlacement();
          openToast(
              this.$store,
              'حذف با موفقیت انجام شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    dataTableLength(val) {
      this.addPerPage(val)
    },

    packagePlacement() {
      if(this.packagePlacement.data) {

        this.itemListTable = []
        this.packagePlacement.data.forEach((item) => {
          this.itemListTable.push(
              {
                id: item.id,
                type: this.getStatus(item.shipment_type),
                placement_id: item.placement_id,
              }
          )
        })
      }
    },
  },

  methods: {
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", "package/crud/delete/placement/"+id, true)
    },
    getStatus(shipment_type){
      if (shipment_type === 'consignment_shavaz') return 'انبارش شاواز'
      else if(shipment_type === 'cross_dock_marketplace' )  return 'فروش مارکت'
      else  return 'getStatus'
    },
    async addPackage() {
      try {
        this.loadingBtn = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `placement/assign/package/`
        formData.append('package_id', this.splitPackageId)
        formData.append('placement_id', this.shelf)
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loadingBtn = false;
          this.getPackagePlacement();
        } else {
          this.loadingBtn = false
        }
      } catch (e) {
        this.loadingBtn = false
      }
    }
  },

}
</script>
