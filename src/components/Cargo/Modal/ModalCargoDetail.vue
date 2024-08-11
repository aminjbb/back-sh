<template>
  <div class="text-right ">
    <div class=" pointer" @click="getCargoDetail(item)">
      <v-icon class="text-grey-darken-1" size="small">mdi-printer-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            پرینت بسته های کارگو
                                        </span>
    </div>
    <v-dialog v-model="dialog" width="1060">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16400 ">
            پرینت برچسب
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" :id="`printableArea-cargo`">
          <v-card class="content">
              <div class="d-flex justify-space-between pa-5">
                <span>
                  <img :src="basUrl +object?.barcode_image">
                  <br>
                  {{object?.barcode}}
                </span>
                <span>شناسه کارگو : {{ object?.id }}</span>
                <span>راننده : {{ object?.driver?.full_name }}</span>
                <span>خودرو : {{ object?.vehicle?.license }}</span>

              </div>
          </v-card>
          <v-card min-height="500" class="d--rtl mt-2" >
            <Table
                class="flex-grow-1"
                editUrl="/categories/edit/"
                :header="detailCargoHeader"
                :items="object?.active_packages"
                updateUrl="category/csv/mass-update"

            />

          </v-card>
          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="print()"
                  height="40"
                  rounded
                  variant="outlined"
                  prepend-icon="mdi-printer-outline"
                  class="px-5 mt-1">
                پرینت محموله
              </v-btn>
            </v-col>
            <v-col cols="3" class="d-flex justify-end mx-10">
              <btn
                  class="mt-3 mr-2"
                  @click="dialog = false"
                  style="cursor: pointer;">
                انصراف
              </btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Table from "@/components/Cargo/Table/DetailCargoPackageTable.vue";
import Cargo from '@/composables/Cargo'
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
export default {
  setup(){
    const {detailCargoHeader} = new Cargo()
    return { detailCargoHeader }
  },
  components: {
    Table,
  },
  props:{
    item : null
  },
  data() {
    return {
      dialog: false,
      object:null
    }
  },

  methods: {
    async getCargoDetail(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `cargo/crud/get/${item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.object= data.data
        this.dialog = true
      }
    },
    print() {

      window.open(`${ import.meta.env.VITE_API_SITEURL}cargo-management/${this.object.id}/print`, '_blank');


    },


  },

  computed: {
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },

  }
}
</script>
