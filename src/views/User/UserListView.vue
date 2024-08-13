<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <UserList />-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card
            height="70"
            class="ma-5 br--12 stretch-card-header-70"
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
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580"
        >
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading">

            <template v-slot:switchSlot="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.switch"
                  inset
                  color="success"
                  @change="changeBan(item.data.id,item.data.switch)"/>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto">
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/user/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push('/wallet/index?user_id='+item.id)">
                        <v-icon class="text-grey-darken-1">mdi-wallet-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">کیف پول</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="user/csv/get/export"/>
              </v-col>

              <v-col cols="6">
                <div class="text-center">
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
                  <span class="mt-2" id="row-selector">
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

    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import User from "@/composables/User";
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToJalai, openConfirm, openToast} from "@/assets/js/functions";

const UserList = defineAsyncComponent(() => import ('@/components/User/UserList.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))

export default {
  components: {
    Header,
    DashboardLayout,
    ShTable,
    ModalColumnFilter,
    PanelFilter,
    ModalExcelDownload,
  },
  setup() {
    const {
      pageLength,
      users,
      getUsers,
      dataTableLength,
      page,
      header,
      userList,
      getUserList,
      filterField,
      loading
    } = User();
    return {
      pageLength,
      users,
      getUsers,
      dataTableLength,
      page,
      header,
      userList,
      getUserList,
      filterField,
      loading
    };
  },

  data() {
    return {
      perPageFilter: false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: `user/crud/delete/`,
      },
    }
  },

  mounted() {
    this.$store.commit('set_avatar', null)
    this.getUserList()
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    async changeBan(id, banItem) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "user/crud/update/ban/" + id
      formdata.append('is_ban', banItem)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        banItem.switch = false
      }
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    userList() {
      this.itemListTable = []

      this.userList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                phone_number: item.phone_number,
                created_at: convertDateToJalai(item.created_at, '-', true),
                email: item.email ? item.email : '-',
                switch: item.is_ban,
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
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getUserList();
          openToast(this.$store, 'کاربر با موفقیت حذف شد', "success")
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(to) {
      this.getUserList(to)
    },

    page() {
      if (!this.perPageFilter) {
        this.getUserList()
      }
    }
  }
}
</script>

