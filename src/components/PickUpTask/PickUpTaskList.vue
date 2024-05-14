<template>
  <div class="h-100 d-flex flex-column align-stretch seller">

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="pickupHeader"
          :items="pickUpTask.data"
          :page="page"
          :perPage="per_page"/>

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


import Table from "@/components/PickUpTask/Table/Table.vue";
import Warehouse from "@/composables/Warehouse";
export default {
  setup(){
    const {pickupHeader , getPickUpTask ,pickUpTask ,pageLength } = new Warehouse()
    return {pickupHeader , getPickUpTask ,pickUpTask , pageLength}
  },
  components: {Table},
  data(){
    return{
      page:1,
      per_page:50
    }
  },

  mounted() {
    const form = {
      per_page: this.per_page,
      page:1
    }
    this.getPickUpTask(form)
  },
  watch:{
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
