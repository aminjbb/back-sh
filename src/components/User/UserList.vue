<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card
        height="70"
        class="ma-5 br-12 stretch-card-header-70"
    >
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5"
      >
        <v-col cols="6">
          <v-row justify="start">
            <v-btn
                @click="$router.push('/user/create')"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              ساخت کاربر
            </v-btn>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter
                :changeHeaderShow="changeHeaderShow"
                :header="header"
            />

            <PanelFilter
                @resetPage="resetPage"
                path="user/index"
                :filterField="filterField"
                :page="page"
                :perPage="dataTableLength"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card
        class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
        height="580"
    >
      <Table

          class="flex-grow-1"
          :header="header"
          :items="userList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          editUrl="/user/edit/"
          deletePath="user/crud/delete/"
      />

      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
            <ModalExcelDownload getEndPoint="user/csv/get/export"/>
          </v-col>

          <v-col cols="6">
            <div class="text-center" >
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left"
              />
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
              <span class="mt-2"  id="row-selector">
                <v-select
                    v-model="dataTableLength"
                    class="t1330"
                    variant="outlined"
                    :items="[25,50,100]"
                />
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/User/Table/UserTable.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import User from "@/composables/User";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
export default {
  setup() {
    const {
      pageLength,
      users,
      getUsers ,
      dataTableLength ,
      page  ,
      header ,
      userList ,
      getUserList ,
      filterField ,
    } = User();
    return {
      pageLength,
      users,
      getUsers ,
      dataTableLength ,
      page  ,
      header ,
      userList ,
      getUserList ,
      filterField
    };
  },
  components:{
    PanelFilter,
    ModalExcelDownload,
    ModalGroupAdd,
    ModalColumnFilter,
    Table
  },

  data() {
    return {
      perPageFilter:false
    }
  },

  mounted() {
    this.$store.commit('set_avatar' , null)
    this.getUserList()
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

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
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

    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getUserList();
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(to){
      this.getUserList(to)
    },

    page(){
      if (!this.perPageFilter){
        this.getUserList()
      }
    }
  }
}
</script>