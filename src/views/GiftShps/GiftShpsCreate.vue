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
                    v-model="form.title"
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

                <v-select
                    class="mt-1"
                    :rules="rule"
                    :items="shpsList"
                    variant="outlined"
                    v-model="form.select_shps"
                    rounded="lg">
                </v-select>

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
              <v-col cols="12" sm="6" v-for="(condition , index) in voucherForm.voucherCondition">
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
                  :loading="loading"
                  @click="validate()"
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
      rule: [v => !!v || 'این فیلد الزامی است'],
      form:{
        title: '',
        shps_count: null,
        select_shps: null
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

      voucherForm: {
        title: null,
        code: null,
        voucherType: null,
        voucherCount: 1,
        voucherAmountType: null,
        voucherAmount: null,
        voucherActive: '1',
        sending: null,
        voucherCondition: new Set()
      },
    }
  },

  methods: {
    addCondition(value){
      this.voucherForm.voucherCondition.add(value)
    },
  }
}
</script>

<style scoped>

</style>