<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            @resetPage="resetPage"
            class="flex-grow-1"
            :header="header"
            :items="smsList"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"/>

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3"/>

                <v-col cols="6">
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

                <v-col cols="3">
                    <div
                        align="center"
                        id="rowSection"
                        class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
                        <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
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
import Table from '@/components/SmsNotification/Table/SmsNotificationTable.vue'
import SmsNotification from "@/composables/SmsNotification"

export default {
  components: { Table },

  setup() {
    const {
      getSmsNotificationList,
      pageLength,
      dataTableLength,
      page,
      header,
      smsList,
      loading
    } = SmsNotification();

    return {
      getSmsNotificationList,
      pageLength,
      dataTableLength,
      page,
      header,
      smsList,
      loading
    };
  },

  data() {
    return {
      perPageFilter:false
    }
  },

  mounted() {
      this.getSmsNotificationList()
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  watch: {
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      }
      else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },

    $route(){
      this.getSmsNotificationList()
    },

    page(){
      if (!this.perPageFilter){
        this.getSmsNotificationList()
      }
    }
  }
}
</script>
