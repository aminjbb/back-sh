<template>
  <div class="h-100 d-flex flex-column align-stretch seller">

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="pickupHeader"
          :items="itemListTable"
          :page="page"
          :perPage="per_page"
          activePath="product/sku/crud/update/activation/">
        <template v-slot:customSlot="item">
          <v-text-field variant="outlined" v-model="form[item.index].priority"></v-text-field>
        </template>

        <template v-slot:saveSlot="item">
           <span class="t14300 text-gray500 py-5 number-font">
             <v-btn @click="savePickupChange(item.index , item.data.id)" variant="text">
               <v-icon color="success">mdi-plus</v-icon>
             </v-btn>
           </span>
        </template>

        <template v-slot:showSlot="item">
          <span class="t14300 text-gray500 py-5 number-font">
            <ModalOrdersShow :orders="item.data.orders"/>
          </span>
        </template>
      </ShTable>

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start" />

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
            </div>
          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
              <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="per_page"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Warehouse from "@/composables/Warehouse";
import ShTable from "@/components/Components/Table/sh-table.vue";
import { AxiosCall } from "../../assets/js/axios_call";
import { openToast } from "@/assets/js/functions";
import ModalOrdersShow from '@/components/PickUpTask/Modal/ModalOrdersShow.vue'

export default {
  setup(){
    const {
      pickupHeader,
      getPickUpTask,
      pickUpTask,
      pageLength
    } = new Warehouse()

    return {
      pickupHeader,
      getPickUpTask,
      pickUpTask,
      pageLength
    }
  },

  components: {ShTable, ModalOrdersShow},

  data(){
    return{
      page:1,
      per_page:50,
      itemListTable: [],
      form:[]
    }
  },

  mounted() {
    const form = {
      per_page: this.per_page,
      page:1
    }
    this.getPickUpTask(form)
  },

  methods:{
    updateTable(){
      this.pickUpTask =[]
      const form = {
        per_page: this.per_page,
        page:this.page
      }
      this.getPickUpTask(form)
    },

    async savePickupChange(index , id){
      const formData= new FormData()
      formData.append('pickup_task_id' , id)
      formData.append('priority' , this.form[index].priority)
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/order/pickup/change-priority`
      let data = await AxiosMethod.axios_post()
      if (data){
        this.$emit('updateTable')
        openToast(this.$store , 'با موفقیت ویرایش شد' , 'success')
      }
    },
  },

  watch:{
    pickUpTask(newVal) {
      if (newVal.length) {
        newVal.forEach(element => {
          const form = {
            priority: element.priority
          };
          this.form.push(form);
        });
      } else {
        this.form = [];
      }

      this.itemListTable = [];

      this.pickUpTask.forEach((item) => {
        this.itemListTable.push({
          id: item.id,
          shps: item.seller_sku_id,
          placement: item.placement?.shelf_number + '-' + item.placement?.step_number + '-' + item.placement?.placement_number + '-' + item.placement?.row_number,
          status: item.status,
          turn: item.turn,
          count: item.count,
          custom: item.priority,
          data: item,
        });
      });
    },

    page(val){
      const form = {
        per_page: this.per_page,
        page:val
      }
      this.getPickUpTask(form)
    },

    per_page(val){
      this.page = 1
      const form = {
        per_page:val,
        page:1
      }
      this.getPickUpTask(form)
    }
  }
}
</script>
