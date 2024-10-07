<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />

      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1 rounded-lg" height="600">
          <div class="t14 w500 text-center my-4">ساخت کالای هدیه</div>
          <v-divider class="mt-3"/>
          <v-form
              ref="createGift"
              class="create-product__info-form scroller"
              v-model="valid">
            <v-row justify="start" align="center">
              <v-col cols="6">
                <div class="text-right mt-5">
                  <span class="t12 text-gray600">عنوان</span>
                  <span class="t12 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    class="mt-1"
                    variant="outlined"
                    :rules="rule"
                    v-model="form.name"
                    rounded="lg">

                </v-text-field>
              </v-col>
              <v-col cols="6">
                <div class="text-right mt-5">
                  <span class="t12 text-gray600">تعداد کالا</span>
                  <span class="t12 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    class="mt-1"
                    variant="outlined"
                    :rules="rule"
                    v-model="form.shps_count"
                    rounded="lg">

                </v-text-field>
              </v-col>
              <v-col cols="6">
                <div class="text-right mt-5">
                  <span class="t12 text-gray600">انتخاب کالا</span>
                  <span class="t12 w500 text-scanError">*</span>
                </div>

                <v-autocomplete
                    v-model="form.shps_id"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :rules="rule"
                    :items="shpsList"
                    item-title="name"
                    item-value="value"
                    v-debounce="searchSku"/>

              </v-col>
              <v-col cols="6">
                <div class="text-right mt-5">
                  <span class="t12 text-gray600">افرودن شرط</span>
                </div>

                <v-autocomplete
                    :items="voucherConditions"
                    variant="outlined"
                    return-object
                    rounded="lg">
                  <template v-slot:item="{ props , item}">
                    <v-list-item>
                      <v-row justify="center">

                        <v-col cols="4">

                          <div @click="addCondition(item)" class="seller__add-sku-btn d-flex justify-center align-center">
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
              </v-col>
              <!--   for condition   -->
              <v-col cols="12" sm="6" v-for="(condition , index) in form.voucherCondition">
                <div class="text-right mt-5 mb-1">
                <span class="t12 text-gray600">
                   {{ condition.title }}
                </span>
                </div>
                <template v-if="condition.raw.inputType === 'text'">
                  <v-text-field
                      v-model="condition.raw.data"
                      variant="outlined"
                      rounded="lg">
                  </v-text-field>
                </template>
                <template v-else-if="condition.raw.inputType === 'date'">
                  <v-row justify="center">
                    <v-col cols="12" sm="6">
                      <v-text-field
                          v-model="condition.raw.data[0]"
                          variant="outlined"
                          class="custom-input-start-date"
                          clearable
                          rounded="lg">
                      </v-text-field>
                      <date-picker
                          type="datetime"
                          class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                          v-model="condition.raw.data[0]"
                          variant="outlined"
                          placeholder="تاریخ تولد"
                          custom-input=".custom-input-start-date"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                          v-model="condition.raw.data[1]"
                          variant="outlined"
                          class="custom-input-end-date"
                          clearable
                          rounded="lg">
                      </v-text-field>
                      <date-picker
                          type="datetime"
                          class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                          v-model="condition.raw.data[1]"
                          variant="outlined"
                          placeholder="تاریخ تولد"
                          custom-input=".custom-input-end-date"
                      />
                    </v-col>
                  </v-row>
                </template>
              </v-col>
            </v-row>

          </v-form>

          <footer class="create-warehouse__actions">
            <v-row justify="space-between" class="mx-5 pt-5">
              <v-btn
                  variant="outlined"
                  @click="$router.go(-1)"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                بازگشت
              </v-btn>
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                تایید
              </v-btn>
            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian, openToast} from "@/assets/js/functions";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  name: "GiftShpsCreate",

  components: {
    datePicker: VuePersianDatetimePicker,
    DashboardLayout,
    Header
  },

  data() {
    return {
      valid: false,
      loading: false,

      rule: [v => !!v || 'این فیلد الزامی است'],

      form:{
        name: null,
        shps_count: null,
        shps_id: '',
        voucherCondition: new Set()
      },
      voucherConditions: [
        {
          title: 'چندمین سفارش',
          value: 'order_count',
          data:null,
          inputType:'text'
        },
        {
          title: 'تعداد استفاده کاربر',
          value: 'user_limit',
          data:null,
          inputType:'text'
        },
        {
          title: 'حداقل هزینه سفارش',
          value: 'min_order_price',
          data:null,
          inputType:'text'
        },
        {
          title: 'زمان شروع و پایان',
          value: 'start-and-end-time',
          data:[],
          inputType:'date'
        }
      ],
      skuSearchList: [],
    }
  },

  computed: {
    shpsList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
            value: skuSearch.id,
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

    addCondition(value){
      this.form.voucherCondition.add(value)
    },

    validate(){
      this.$refs.createGift.validate()
      setTimeout(()=>{
        if (this.valid) this.createGift()
      }, 200)
    },

   async createGift() {
     try {
       this.loading = true
       let formData = new FormData();
       const AxiosMethod = new AxiosCall()
       AxiosMethod.end_point = 'gift/crud/create'
       formData.append('name', this.form.name)
       formData.append('shps_count', this.form.shps_count)
       formData.append('shps', this.form.shps_id)
       this.form.voucherCondition.forEach((condition, index) => {
         if (condition.value === 'start-and-end-time'){
           const startDateSplit = condition.raw.data[0].split(' ')
           const endDateSplit = condition.raw.data[1].split(' ')
           formData.append('start_time', convertDateToGregorian(startDateSplit[0] , '/' , false) + ' ' + startDateSplit[1]+':00')
           formData.append('end_time', convertDateToGregorian(endDateSplit[0] , '/' , false) +  ' ' + endDateSplit[1]+':00')
         }
         else {
           formData.append(condition.value, condition.raw.data)
         }
       })
       AxiosMethod.form = formData
       AxiosMethod.store = this.$store
       AxiosMethod.toast_error = true
       AxiosMethod.using_auth = true
       AxiosMethod.token = this.$cookies.get('adminToken')
       let data = await AxiosMethod.axios_post()
       if (data) {
         this.loading = false
         openToast(this.$store, '. کالای هدیه با موفقیت ایجاد شد', "success")
         this.$router.push('/gift-shps/index')
       }
       else {
         this.loading = false
       }
     }
     catch (e) {
       const errorMsg = e.response?.data?.message
       openToast(this.$store, errorMsg, "error")
       this.loading = false
     }
    }
  }
}
</script>

<style scoped>

</style>