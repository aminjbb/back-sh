<template>
  <div class="text-right">

    <v-btn
        @click="openModal()"
        color="primary500"
        height="40"
        rounded
        class="px-8">
      <template v-slot:prepend>
        <v-icon>mdi-plus</v-icon>
      </template>
      افزودن
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
      <v-card>
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                   ساخت کارگو
                </span>

          <v-btn
              class="modal__header__btn"
              @click="closeModal()"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-2 mb-2 px-5">
          <v-divider />
        </div>

        <div>
          <v-form ref="addCargo" v-model="valid" >
            <v-row
                justify="center"
                align="center"
                class="px-5">
              <v-col cols="12">
                <div class="text-right mt-4 mb-2">
                            <span class="t12 w300">
                               راننده
                            </span>
                  <span class="text-error">
                              *
                            </span>
                </div>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    placeholder="برای مثال : وانت سواری"
                    item-title="name"
                    item-value="id"
                    :items="drivers"
                    :rules="rule"
                    v-model="form.driver" >
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <div class="text-right mt-4 mb-2">
                            <span class="t12 w300">
                              خودرو
                            </span>
                  <span class="text-error">
                              *
                            </span>
                </div>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="vehicles"
                    item-title="name"
                    :rules="rule"
                    item-value="id"
                    v-model="form.vehicle" />
              </v-col>
            </v-row>
          </v-form>

        </div>

        <div class="mt-3 mb-3 px-5">
          <v-divider />
        </div>

        <v-row
            justify="space-between"
            align="center"
            class="pb-4 ma-0">
          <v-col cols="6" class="">
            <div class="text-left">
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5">
                تایید
              </v-btn>
            </div>
          </v-col>

          <v-col cols="6" class="text-right">
            <v-btn
                @click="closeModal()"
                variant="text"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              انصراف
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  openToast
} from "@/assets/js/functions";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import Vehicle from '@/composables/Vehicle'
import DriverManagement from '@/composables/DriverManagement'
export default {
  setup(){
      const {vehicleList, getAllVehicleList} = new Vehicle()
      const {getAllDriverList , DriverManagementList} = new DriverManagement()
      return {
        vehicleList, getAllVehicleList,
        getAllDriverList , DriverManagementList
      }
  },
  props:{
    getCargoList:{type:Function}
  },
  data() {
    return {
      dialog: false,
      form: {
        vehicle: '',
        driver: '',
      },
      loading:false,
      valid:false,
      rule:[v=> !!v || 'این فیلد الزامی است']
    }
  },
  mounted() {
    this.getAllVehicleList()
    this.getAllDriverList()
  },
  methods: {
    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },
    /**
     * validate form
     */
    validate(){
      this.$refs.addCargo.validate()
      setTimeout(()=>{
        if (this.valid) this.createCargo()
      })
    },

    /**
     * Submit form
     */
    async createCargo() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'cargo/crud/create'
      AxiosMethod.form = formdata;

      formdata.append('driver_id', this.form.driver)
      formdata.append('vehicle_id', this.form.vehicle);

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.updateList('true');
        openToast(this.$store,
            'کارگو با موفقیت ایجاد شد.',
            "success");
        this.dialog = false;
        this.getCargoList()
        this.form.driver = '';
        this.form.vehicle = ''


      } else {
        this.loading = false
      }
    },

    /**
     * Update list
     * @param {*} status
     */
    updateList(status) {
      this.$emit('updateList', status);
    },

  },
  computed:{
    vehicles(){
      let vehicles = []
      this.vehicleList.data.forEach(vehicle=>{
        const form = {
          name : vehicle.vehicle_type + ' ('+vehicle.license+')',
          id :vehicle.id
        }
        vehicles.push(form)
      })
      return vehicles
    },
    drivers(){
      let drivers = []
      this.DriverManagementList.data.forEach(driver=>{
        const form = {
          name : driver.full_name,
          id :driver.id
        }
        drivers.push(form)
      })
      return drivers
    }
  }
}
</script>
