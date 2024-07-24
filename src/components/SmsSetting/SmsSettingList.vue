<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          @getSmsSetting="getSmsSettingData"
          @resetPage="resetPage"
          class="flex-grow-1"
          :header="headerSmsSetting"
          :items="smsSettingList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"/>
    </v-card>
</div>
</template>

<script>
import Table from '@/components/SmsSetting/Table/SmsSettingTable.vue'
import SmsNotification from "@/composables/SmsNotification"

export default {
  components: {Table},

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
      perPageFilter:false
    }
  },

  mounted() {
      this.getSmsSettingList()
  },

  methods: {
    getSmsSettingData(v) {
      this.getSmsSettingList()
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
