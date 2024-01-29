<template>
  <div class="  text-center px-5 d--ltr" :id="`printableArea-cargo`">
    <v-card class="content " >
      <div class="d-flex justify-space-between pa-5 d--rtl ">
        <span><img :src="basUrl +object?.barcode_image"></span>
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
          :items="object?.packages"
          updateUrl="category/csv/mass-update"

      />

    </v-card>

  </div>
</template>
<script >
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
      return 'https://api.shvz.ir/'
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
          window.print(myElement);
        }, 1000);
      }
    },
  }
}
</script>