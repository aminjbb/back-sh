

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <SmsSettingList/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerSmsSetting"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading">
            <template v-slot:switchSlot="item">
              <v-switch
                  :true-value="`1`"
                  :false-value="`0`"
                  v-model="item.data.switch"
                  inset
                  color="success"
                  @change="toggleActive(item.data.id, item.data.switch, item.data.description)"/>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <SmsSettingModal :smsSettingData="item.data" :id="item.data.id"/>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
        </v-card>
      </div>

    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import SmsSettingModal from "@/components/SmsSetting/Modal/SmsSettingModal.vue";
import SmsNotification from "@/composables/SmsNotification";
import {AxiosCall} from "@/assets/js/axios_call";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
// const SmsSettingList = defineAsyncComponent(()=> import ('@/components/SmsSetting/SmsSettingList.vue'))
export default {
  components: { SmsSettingModal,ShTable ,Header,DashboardLayout},

  setup() {
    const {
      getSmsSettingList,
      smsSettingList,
      pageLength,
      dataTableLength,
      page,
      headerSmsSetting,
      loading
    } = SmsNotification();
    return {
      getSmsSettingList,
      smsSettingList,
      pageLength,
      dataTableLength,
      page,
      headerSmsSetting,
      loading
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: []
    }
  },

  mounted() {
    this.getSmsSettingList()
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
    },

    async toggleActive(id, banItem, text) {
      console.log('banItem', banItem)
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "system/admin/sms/setting/crud/update/"+id
      formdata.append('value', banItem)
      formdata.append('text', text)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        banItem.switch = false
      }
    },
  },

  watch: {
    smsSettingList() {
      this.itemListTable = []

      this.smsSettingList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                text: item.text,
                switch: item.value,
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
      this.getSmsSettingList()
    },

    page(){
      if (!this.perPageFilter){
        this.getSmsSettingList()
      }
    }
  }
}
</script>
