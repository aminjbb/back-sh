<template>
<div class="text-center c-modal-table-filter">
  <v-btn
      @click="openModal()"
      variant="outlined"
      rounded
      class="px-3 mt-1 mr-4">
    <template v-slot:prepend>
      <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
    </template>
    فیلتر
  </v-btn>

  <v-dialog
      v-if="dialog"
      v-model="dialog"
      width="1000">
    <v-card>
      <header class="modal__header d-flex justify-center align-center mt-3">
                <span class="t16400 pa-6">
                    فیلتر پیشرفته
                </span>

        <v-btn
            class="modal__header__btn"
            @click="closeModal()"
            variant="icon">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </header>

      <div class="mt-3 mb-8 px-5">
        <v-divider />
      </div>

      <div>
        <v-row
            justify="start"
            align="center"
            class="px-10 d--rtl">
          <template v-for="(filter, index) in filterField" :key="index">
            <v-col
                v-if="filter.type === 'text' && filter.value !== 'paid_price_from' && filter.value !== 'paid_price_to' && filter.value !== 'identification_code' && filter.value !== 'bank_id'"
                cols="4">
              <div class="t13300 text-right mb-2">{{filter.name}}</div>
              <v-text-field
                  variant="outlined"
                  :name="filter.value"
                  hide-details
                  v-model="values[index].value"/>
            </v-col>
            <v-col
                v-if="filter.type === 'text' && filter.value === 'identification_code' || filter.value === 'bank_id'"
                cols="6">
              <div class="t13300 text-right mb-2">{{filter.name}}</div>
              <v-text-field
                  variant="outlined"
                  :name="filter.value"
                  hide-details
                  v-model="values[index].value"/>
            </v-col>

            <v-col v-if="filter.type === 'text' && (filter.value === 'paid_price_from' ||filter.value === 'paid_price_to')" cols="6">
              <div class="t13300 text-right mb-2">{{filter.name}}</div>
              <v-text-field
                  variant="outlined"
                  :name="filter.value"
                  hide-details
                  :placeholder="filter.value === 'paid_price_from' ? 'از' : filter.value === 'paid_price_to' ? 'تا': ''"
                  v-model="values[index].value"/>
            </v-col>

            <v-col v-if="filter.type === 'select' && filter.value !== 'creator_id' && filter.value!=='packed_status' && filter.value!=='shipping_method' && filter.value !== 'receive_state_id' && filter.value !== 'receive_city_id'" cols="4">
              <div class="t13300 text-right mb-2">{{filter.name}}</div>
              <v-select
                  v-if="filter.value ==='status'"
                  density="compact"
                  variant="outlined"
                  single-line
                  hide-details
                  item-title="label"
                  item-value="value"
                  :items="statusList"
                  v-model="statusModel" />

              <v-select
                  v-if="filter.value ==='payment_status'"
                  density="compact"
                  variant="outlined"
                  single-line
                  hide-details
                  item-title="label"
                  item-value="value"
                  :items="paymentStatuses"
                  v-model="paymentStatusModel" />

              <v-select
                  v-if="filter.value ==='payment_method'"
                  density="compact"
                  variant="outlined"
                  single-line
                  hide-details
                  item-title="label"
                  item-value="value"
                  :items="paymentMethods"
                  v-model="paymentMethodModel" />
            </v-col>

            <v-col
                cols="6"
                v-if=" filter.value === 'packed_status' || filter.value === 'shipping_method'|| filter.value === 'receive_state_id' || filter.value === 'receive_city_id'"
                class="mt-3">
              <div class="t13300 text-right mb-2">{{filter.name}}</div>
              <div align="center" class="d-flex pb-5 align-center">
                <v-select
                    v-if="filter.value ==='packed_status'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    item-title="label"
                    item-value="value"
                    :items="packedStatus"
                    v-model="packedStatusModel" />

                <v-select
                    v-if="filter.value ==='shipping_method'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    item-title="label"
                    item-value="value"
                    :items="shippingMethod"
                    v-model="shippingMethodModel" />

                <v-autocomplete
                    v-if="filter.value == 'receive_state_id'"
                    :items="provinceList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    v-model="province"
                    @update:modelValue="getCities()" />

                <v-autocomplete
                    v-if="filter.value == 'receive_city_id'"
                    :items="cityList"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    v-model="city" />
              </div>
            </v-col>

            <v-col
                cols="6"
                v-else-if=" filter.value === 'created_at'"
                class="mt-3">
              <div class="t13300 text-right mb-3">{{filter.name}}</div>
              <div align="center" class="d-flex pb-5 align-center">
                <date-picker
                    range
                    clearable
                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                    format="jYYYY-jMM-jDD"
                    display-format="jYYYY-jMM-jDD"
                    v-model="createdAtModel"
                    variant="outlined" />

                <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
              </div>
            </v-col>

            <v-col cols="6" v-else-if=" filter.value === 'logistic_at'">
              <div class="t13300 text-right mb-4">{{filter.name}}</div>
              <div align="center" class="d-flex pb-5 align-center">
                <date-picker
                    range
                    clearable
                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                    format="jYYYY-jMM-jDD"
                    display-format="jYYYY-jMM-jDD"
                    v-model="logisticAtModel"
                    variant="outlined" />

                <v-icon @click="logisticAtModel= [] ;gregorianLogisticDate =[]">mdi-close</v-icon>
              </div>
            </v-col>
          </template>
        </v-row>
      </div>

      <div class="mt-3 mb-5 px-5">
        <v-divider />
      </div>

      <v-row
          justify="center"
          align="center"
          class="px-5 py-5">
        <v-col cols="6">
          <v-btn
              @click="removeAllFilters()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1 mr-5">
            حذف همه فیلترها
          </v-btn>
        </v-col>

        <v-col cols="6">
          <div class="text-right">
            <v-btn
                @click="setFilter()"
                color="primary500"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              اعمال تغییرات
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    filterField: [],
    path: null,
  },

  setup(){
    const dialog = ref(false)

    const statusList = ref([
      {
        label: 'پیش پردازش',
        value: 'pre_progress'
      },
      {
        label: 'ارسال شده',
        value: 'sending'
      },
      {
        label: 'تحویل داده شده',
        value: 'received'
      },
      {
        label: 'انقضای سفارش',
        value: 'payment_out_date'
      }
    ])
    const statusModel= ref(null)

    const packedStatus= ref( [
      {
      label: 'بارگیری شده',
      value: '1'
    },
      {
        label: 'بارگیری نشده',
        value: '0'
      }
    ])
    const packedStatusModel= ref(null)

    const paymentStatuses = ref([
      {
        label: 'پرداخت شده',
        value: 'successful'
      },
      {
        label: 'در انتظار پرداخت',
        value: 'payment_in_progress'
      },
      {
        label: 'انقضای پرداخت',
        value: 'payment_out_date'
      }
    ])
    const paymentStatusModel = ref(null)

    const paymentMethods = ref([
          {
            label: 'کیف پول',
            value: 'wallet'
          },
          {
            label: 'آنلاین',
            value: 'online'
          },
          {
            label: 'اسنپ پی',
            value: 'snap_pay'

          }
        ])
    const paymentMethodModel = ref(null)

    const shippingMethod = ref([
      {
        label: 'نفیس اکپرس',
        value: 'nafis'
      },
      {
        label: 'پست',
        value: 'post'
      },
      {
        label: 'پست پیشتاز',
        value: 'pishtaz'
      },
      {
        label: 'تیپاکس',
        value: 'tipax'
      },
    ])
    const shippingMethodModel = ref(null)

    const province = ref(null)
    const city = ref(null)

    const createdAtModel = ref(null)
    const gregorianCreateDate = ref([])

    const logisticAtModel = ref(null)
    const  gregorianLogisticDate = ref([])

    function openModal() {
     dialog.value = true
    }

    function closeModal() {
      dialog.value = false
    }
    function setFilter(){}

    return {
      dialog,
      statusList,
      statusModel,
      packedStatus,
      packedStatusModel,
      paymentStatuses,
      paymentStatusModel,
      paymentMethods,
      paymentMethodModel,
      shippingMethod,
      shippingMethodModel,
      province,
      city,
      createdAtModel,
      gregorianCreateDate,
      logisticAtModel,
      gregorianLogisticDate,
      openModal,
      closeModal,
      setFilter
    }
  },


  data() {
    return {
      values: []
    }
  },

  methods: {
    removeAllFilters() {
      this.$router.push('/' + this.path);

      this.values = [];
      this.statusModel = null;
      this.paymentMethodModel = null;
      this.packedStatusModel = null;
      this.packedStatusModel = null;
      this.createdAtModel = null;
      this.logisticAtModel = null;
      this.userModal = null;

      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: null
        }

        this.values.push(form)
        this.dialog = false;
      })
    },
  },
  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    });
  }
}

</script>


<style scoped>

</style>