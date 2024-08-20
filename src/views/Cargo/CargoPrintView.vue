<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <!--      <PrintCargo/>-->
      <div class="  text-center px-5 d--ltr" :id="`printableArea-cargo`">
        <v-card class="content mt-2" >
          <div class="d-flex justify-center pt-2">
         <span>
          <img :src="basUrl +object?.barcode_image">
            <br>
                  {{object?.barcode}}
        </span>
          </div>
          <div class="d-flex justify-space-between pa-5 d--rtl ">
            <span>شناسه کارگو : {{ object?.id }}</span>
            <span>راننده : {{ object?.driver?.full_name }}</span>
            <span>خودرو : {{ object?.vehicle?.license }}</span>
          </div>

        </v-card>
        <v-card min-height="500" class="d--rtl mt-2" >
          <Table
              class="flex-grow-1"
              editUrl="/categories/edit/"
              activePath="category/crud/update/activation/"
              deletePath="category/crud/delete/"
              :header="detailCargoHeader"
              :items="object?.active_packages"
              updateUrl="category/csv/mass-update" />
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
// import {defineAsyncComponent} from "vue";
// const PrintCargo = defineAsyncComponent(()=> import ('@/components/Cargo/Print/PrintCargo.vue'))
import Table from "@/components/Cargo/Table/DetailCargoPackageTable.vue";
import Cargo from '@/composables/Cargo'
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  setup(){
    const {detailCargoHeader} = new Cargo()
    return { detailCargoHeader }
  },
  data(){
    return{
      object : null
    }
  },
  components:{
    Table
  },
  mounted() {
    this.getCargoDetail()
  },
  computed:{
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },
  },
  methods:{
    async getCargoDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `cargo/crud/get/${this.$route.params.cargoId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.object = data.data
        setTimeout(() => {
          var myElement = document.getElementById('printableArea-cargo');
          window.onafterprint = function() {window.close()};
          window.print(myElement);
        }, 1000);
      }
    },
  }
}
</script>

