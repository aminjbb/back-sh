<template>
  <div class="px-2 py-2 h-100">
    <div class="d-flex justify-center my-5">
            <span class="t14500">
              ارسال به انبار
            </span>
    </div>
    <v-divider/>
    <v-form
        v-model="valid"
        ref="CrossDock3"
        class="create-product__info-form scroller"
    >
      <v-row
          justify="center"
          align="center"
      >
        <v-col cols="12">

        </v-col>
        <v-col cols="6">
          <div class="text-right my-5">
                <span class="t14500">
                   انبار
                  <span class="text-error">
                    *
                  </span>
                </span>
          </div>
          <v-autocomplete
              variant="outlined"
              single-line
              v-model="warehouse"
              :items="warehouseData"
              item-title="name"
              item-value="id"
              v-debounce:1s.unlock="searchWarehouse"
              :rules="rule"

          />
        </v-col>

        <v-col cols="6">
          <div class="d-flex text-right mt-15">
                <span class="t14500">
                    تاریخ ارسال فروشنده به انبار :
                </span>
                <span class="t14500 mr-2 text-gray500">
                   {{ minDate }}
                </span>
          </div>

        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import {ref} from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import Warehouse from "@/composables/Warehouse";
export default {
  components:{
    datePicker: VuePersianDatetimePicker,
    UploadFileSection
  },
  data(){
    return{
      warehouse:'',
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid:true
    }
  },
  setup(){
    const {getWarehouseList ,  warehouseList} = new Warehouse()
    return {getWarehouseList ,  warehouseList}
  },
  computed:{
    warehouseData(){
      try {
        return this.warehouseList.data
      }
      catch (e) {
        return []
      }
    },

    minDate(){
      const shpsSelected = this.$store.getters['get_crossDockSelectedShps']
      const min = new Date(
          Math.min(
              ...shpsSelected.map(element => {
                return new Date(element.warehouse_deadline);
              }),
          ),
      );
      const yyyy = min.getFullYear();
      let mm = min.getMonth() + 1; // month is zero-based
      let dd = min.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formatted = yyyy + '-' + mm + '-' +dd ;
      return formatted
    }
  },

  methods:{
    searchWarehouse(e){
      const filter = {
        name: e
      }
      this.getWarehouseList(filter)
    },
  },

  mounted() {
    // if (this.$store.getters['get_legalSellerStep1']!= null){
    //   this.form = this.$store.getters['get_legalSellerStep1']
    // }
  }
}
</script>