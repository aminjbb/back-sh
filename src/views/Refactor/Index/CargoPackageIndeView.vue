<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="200"
            class="ma-5 br--12 "
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5"
          >
            <v-col cols="3">
              <div class="d-flex">
            <span>
              شناسه کارگو : {{ cargo?.id }}
            </span>
              </div>
            </v-col>

            <v-col cols="3">
              <div class="d-flex">
            <span>
              نام راننده  : {{ cargo?.driver?.full_name }}
            </span>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="d-flex">
            <span>
             خودرو : {{ cargo?.vehicle?.vehicle_type}} / {{cargo?.vehicle?.license}}
            </span>
              </div>
            </v-col>
            <v-col cols="8">
              <v-row justify="center" align="center">
                <v-col cols="8">
                  <div>
                    <div class="text-right ">
                 <span class="text-gray600 t14 w500">
                   شناسه بسته
                 </span>
                      <span class="text-error">
                  *
                </span>
                    </div>
                    <div>
                      <v-text-field :autofocus="true" @keyup.enter="scanPackageId()" v-model="packageScan" variant="outlined"/>
                    </div>
                  </div>
                </v-col>
                <v-col cols="3">
                  <v-btn
                      @click="assignPackage()"
                      :loading="loading"
                      color="primary500"
                      :disabled="!packageId"
                      height="40"
                      rounded
                      class="px-8 mt-2">
                    تایید
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580"
        >
          <Table
              class="flex-grow-1"
              editUrl="/categories/edit/"
              :deletePath="`cargo/${$route.params.cargoId}/detach/package/`"
              :header="packageHeader"
              :items="packageCargo"
              updateUrl="category/csv/mass-update"
              :page="1"
              :perPage="1000"
              :loading="loading"
          />

          <v-divider/>

          <v-card-actions class="pb-3" >
            <v-row class="px-5 py-2"  justify="end">
              <v-btn
                  :loading="luggageLoading"
                  @click="luggageCargo()"
                  color="primary500"
                  height="40"
                  rounded
                  variant="flat"
                  class="px-8 mt-2">

                تکمیل ظرفیت کارگو
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>


</template>
<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/Cargo/Table/PackageTable.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  components: {
    Table,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo,
    DashboardLayout,
    Header
  },

  data(){
    return {
      packageId:null,
      scanPackage:'',
      loading:false,
      luggageLoading:false,
      packageScan:null
    }
  },

  setup() {
    const {
      getCargo , cargo ,packageHeader ,  getPackageCargo , packageCargo
    } = Cargo();
    return {
      getCargo , cargo ,packageHeader ,  getPackageCargo , packageCargo
    };
  },

  mounted() {
    this.getCargo();
    this.getPackageCargo();
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getPackageCargo()
          openToast(
              this.$store,
              'بسته با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },


  },

  methods: {
    async luggageCargo(){
      try {
        this.luggageLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `cargo/sent/warehouse/${this.$route.params.cargoId}`
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.luggageLoading = false
          this.$router.go(-1)
        }
        else {
          this.luggageLoading = false
        }
      }
      catch (e) {
        this.luggageLoading = false
      }
    },

    async assignPackage(){
      try {
        this.loading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `cargo/crud/attach/package/${this.$route.params.cargoId}`
        formData.append('package_id', this.packageId)
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          this.packageScan = ''
          this.packageId = ''
          this.getPackageCargo()
        }
        else{
          this.loading = false
          this.packageScan = ''
          this.packageId = ''
        }
      }catch (e) {
        this.loading = false
        this.packageScan = ''
        this.packageId = ''
      }
    },

    scanPackageId(){
      if (this.packageScan.includes('-')) {
        const packageSplit = this.packageScan.split('-')
        if (packageSplit[1]) {
          this.packageId = packageSplit[1]
        }
        else{
          this.packageId = this.packageScan
        }
      }
      this.assignPackage()
    },
  }
}

</script>