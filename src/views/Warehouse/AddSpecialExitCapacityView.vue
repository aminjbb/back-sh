

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <AddSpecialExitCapacity />-->
      <div>
        <v-form ref="addWarehouseExitCapacity"  class="create-product__info-form scroller"  v-model="valid">
          <v-row justify="center" align="center">
            <v-col cols="12">
              <div class="text-center">
                <span class="t14 w500">ظرفیت ویژه خروج</span>
              </div>
              <v-divider class="my-5"/>
            </v-col>
            <v-col cols="6">
              <div class="text-right my-5">
                      <span class="t14 w500 text-gray600">
                          تاریخ
                      </span>
              </div>
              <v-text-field
                  density="compact"
                  variant="outlined"
                  single-line
                  placeholder="بازه زمانی ظرفیت را انتخاب نمایید"
                  :rules="rule"
                  class="custom-input"
                  v-model="form.date"
              />
              <date-picker
                  :min="minDate"
                  clearable
                  range
                  custom-input=".custom-input"
                  format="jYYYY-jMM-jDD"
                  :rules="rule"
                  display-format="jYYYY-jMM-jDD"  v-model="form.date"
              />
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-right my-5">
                      <span class="t14 w500 text-gray600">
                        ظرفیت ویژه خروج
                      </span>
              </div>
              <v-text-field
                  density="compact"
                  variant="outlined"
                  single-line
                  placeholder="ظرفیت را به صورت عدد وارد نمایید"
                  :rules="rule  "
                  v-model="form.capacity"
              />
            </v-col>
            <v-col cols="12">
              <div class="pa-4 d--ltr">
                <v-btn
                    @click="validate()"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 ma-1 "
                >
                  تایید
                </v-btn>
                <v-btn
                    @click="$router.go(-1)"
                    height="40"
                    rounded
                    variant="outlined"
                    class="px-8 mt-1"
                >
                  انصراف
                </v-btn>

              </div>
            </v-col>
            <v-col cols="12">
              <v-card>
                <Table :getWarehouseExitCapacityList="getWarehouseExitCapacityList" :items="warehouseExitCapacityList.data" :header="specialExitCapacityHeader"/>
                <v-pagination
                    v-model="page"
                    :length="exitCapacityPageLength"
                    rounded="circle"
                    size="40"
                    :total-visible="7"
                    prev-icon="mdi-chevron-right"
                    next-icon="mdi-chevron-left" />
              </v-card>
            </v-col>


          </v-row>

        </v-form>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import {defineAsyncComponent} from "vue";
import Table from "@/components/Warehouse/SpecialExitCapacity/SpecialExitCapacityTable.vue";
import Warehouse from "@/composables/Warehouse";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {convertDateToGregorian, gregorian_to_jalali} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
// const AddSpecialExitCapacity = defineAsyncComponent(()=> import ('@/components/Warehouse/SpecialExitCapacity/AddSpecialExitCapacity.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  setup(){
    const {getWarehouseExitCapacityList , warehouseExitCapacityList , exitCapacityPageLength} = new Warehouse()
    return {getWarehouseExitCapacityList , warehouseExitCapacityList , exitCapacityPageLength}
  },
  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  components: {
    Table,
    datePicker: VuePersianDatetimePicker,
    Header,
    DashboardLayout,
  },

  data() {
    return {
      page:1,
      minDate:'',
      form: {
        date: [],
        capacity:null,
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      specialExitCapacityHeader:[
        {name:'تاریخ' , show:true, value:null, order:false},
        {name:'ظرفیت' , show:true, value:'capacity', order:false},
        {name:'ویرایش' , show:true, value:'edit', order:false},

      ],
    }
  },

  methods: {
    router() {
      return router
    },
    /**
     * validate addWarehouseExitCapacity form
     */
    async validate(){
      await this.$refs.addWarehouseExitCapacity.validate()
      if (this.valid) await this.addExitSpecialCapacity()
      this.loading = false
    },

    async addExitSpecialCapacity(){
      this.loading=true
      const startDate = convertDateToGregorian(this.form.date[0] , '-' , false)
      const endDate = convertDateToGregorian(this.form.date[1] , '-' , false)
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      formData.append('start_date' , startDate)
      formData.append('end_date' , endDate)
      formData.append('count', this.form.capacity)
      AxiosMethod.using_auth = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/exit/storage/exception/crud/create/${this.$route.params.warehouseId}`
      let data = await AxiosMethod.axios_post()
      if (data){
        this.getWarehouseExitCapacityList(1)
      }

    }
  },
  mounted() {
    this.getWarehouseExitCapacityList(this.page)
    let date = new Date();
    date.setDate(date.getDate() + 1)
    let dateSplit = date.toISOString()
    dateSplit = dateSplit.split('T')
    const dateObject = dateSplit[0].split('-')
    this.minDate = gregorian_to_jalali(parseInt(dateObject[0]), parseInt(dateObject[1]), parseInt(dateObject[2]))
  },

  watch:{
    page(val){
      this.getWarehouseExitCapacityList(val)
    }
  }
}

</script>

<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>