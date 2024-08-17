
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <SmsNotificationList/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading" />
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
    </v-main>
  </v-layout>
</template>
<script>
import {defineAsyncComponent} from "vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import SmsNotification from "@/composables/SmsNotification";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
// const SmsNotificationList = defineAsyncComponent(()=> import ('@/components/SmsNotification/SmsNotificationList.vue'))

export default {
  components: { ShTable , Header , DashboardLayout },

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
      perPageFilter:false,
      itemListTable:[]
    }
  },

  mounted() {
    this.getSmsNotificationList()
  },

  methods: {
    convertStatus(status) {
      if (status === 'order_status') {
        return 'تغییر وضعیت سفارش'
      }
      else if (status === 'sms_automation') {
        return 'کمپین پیامکی'
      }
      else if (status === 'mass') {
        return 'ارسال گروهی'
      }
    },

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
    smsList() {
      this.itemListTable = []

      this.smsList.forEach((item) =>
          this.itemListTable.push(
              {
                phone_number: item.phone_number,
                full_name: item.user.first_name + ' ' +item.user.last_name,
                type: this.convertStatus(item.type),
                created_at: item.user.created_at.split('T')[1].split('.')[0] + ' ' +item.user.created_at_fa,
                sms: item.message,
              },
          ),
      )
    },

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
