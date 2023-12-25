<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="150" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="center"
          class="px-10 py-5">
        <v-col cols="5">
            <v-form v-model="valid" ref="shipmentId" class="">
              <div class="text-right ">
                 <span class="text-gray600 t14500">
                   شناسه بسته
                 </span>
                <span class="text-error">
                  *
                </span>
              </div>
              <div>
                <v-text-field @keyup="setpackId()" variant="outlined" :rules="rule" v-model="boxId" />
              </div>
            </v-form>
        </v-col>
        <v-col cols="3">
          <div class="d-flex justify-start pt-5">
            <v-btn
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              تکمیل ظرفیت بسته
            </v-btn>
        </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          ref="processingShipmentShps"
          class="flex-grow-1"
          :header="headerShps"
          :items="processingShipment"
          editUrl=""
          activePath=""
          deletePath=""
          changeStatusUrl=""
          updateSkuUrl=""
          :loading="loading"
          updateUrl="seller/csv/mass-update"
          model="processingShipmentShps" />
      <v-divider />
      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">

          </v-col>

          <v-col cols="6" class="d-flex justify-center">

          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div  class="d-flex align-center">
              <v-btn
                  :loading="loading"
                  rounded
                  variant="text"
                  width="115"
                  @click="$router.go(-1)"
              >
                <span class="t14300">
                اتمام محموله
              </span>
              </v-btn>


            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script >
import Table from "@/components/ProcessingShipment/Table/Table.vue";
import ProcessingShipment from "@/composables/ProcessingShipment";

export default  {
  setup(props) {
    const {
      processingShipment, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
    } = ProcessingShipment();

    return {
      processingShipment, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
    };
  },
  components: {Table},
  data(){
    return {
      boxId:null,
      rule:[v=>!!v || 'این فیلد الزامی است']
    }
  },
  methods:{
    setpackId(){
      localStorage.setItem('packId' , this.boxId)
    }
  }
}
</script>