<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />

      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push(`/first-time-user/create`)"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  افزودن
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
<!--                <PanelFilter-->
<!--                    @resetPage="resetPage"-->
<!--                    path="first-time-user/index"-->
<!--                    :page="page"-->
<!--                    :perPage="dataTableLength"/>-->
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :activePath="`page/modal/crud/update/activation/`"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading">
            <template v-slot:customSlot2="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.custom2"
                  inset
                  color="success"
                  @change="changeActive(item,item.data.id)"/>
            </template>

            <template v-slot:customSlot="item">
              <img :src="item.data.custom" alt="image"/>
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
                      <div class="ma-5 pointer" @click="removeItem(item.data.id, item.data.name)">
                        <v-icon size="small" class="text-grey-darken-1" icon="mdi-trash-can-outline"/>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                        <Modal
                            ref="modal"
                            :title="`تایید مودال`"
                            :width="468"
                            @successAction="confirmed(item.data.id)"
                            @cancelAction="closeModal()"
                            @closeModal="closeModal()">
                          <template v-slot:modalBody>
                            <div class="d-flex justify-center ga-1">
                              <div>اطمینان دارید ؟</div>
                              <div> {{ item.data.name }} </div>
                              <div>کاربر عزیز آیا از حذف مودال</div>
                            </div>
                          </template>
                        </Modal>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ml-16">
                        <div class="pointer" @click="$router.push(`/first-time-user/${item.data.id}/modal-edit`)">
                          <v-icon size="x-small" class="text-grey-darken-1">
                            mdi-text-box-multiple-outline
                          </v-icon>
                          <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                        </div>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start"/>

              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                  <v-pagination
                      v-model="page"
                      :length="pageLength"
                      rounded="circle"
                      size="40"
                      :total-visible="7"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left"/>
                </div>
              </v-col>

              <v-col cols="3" class="d-flex justify-end">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center">
                  <span class="ml-5">تعداد سطر در هر صفحه</span>
                  <span class="mt-2" id="row-selector">
                    <v-select
                        v-model="dataTableLength"
                        class="t1330"
                        variant="outlined"
                        :items="[25,50,100]"/>
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
import shBtn from "@/components/Components/Kits/Buttons/sh-btn.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Components/Modal/Modal.vue'))

import FirstTimeUser from "@/composables/FirstTimeUser";
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  name: "FirstTimeUserModalView",

  components: {
    ShTable,
    ModalColumnFilter,
    shBtn,
    DashboardLayout,
    Header,
    PanelFilter,
    Modal
  },

  setup() {
    const {
      header,
      getAllFirstTimeUserList,
      firstTimeUserList,
      pageLength,
      dataTableLength,
      page,
      loading
    } = FirstTimeUser()

    return {
      header,
      getAllFirstTimeUserList,
      firstTimeUserList,
      pageLength,
      dataTableLength,
      page,
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
    this.getAllFirstTimeUserList()
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods:{
    async changeActive(item, id) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'page/modal/crud/update/activation/' + id
      formdata.append('is_active', item.is_active)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        item.is_active = false
        this.getAllFirstTimeUserList()
      }
    },

    removeItem() {
      this.$refs.modal.dialog = true
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    async confirmed(id) {
      try {
        this.loading = true;
        const AxiosMethod = new AxiosCall();
        AxiosMethod.end_point = `page/modal/crud/delete/${id}?accept`;
        AxiosMethod.store = this.$store;
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken');
        AxiosMethod.toast_error = true;
        let data = await AxiosMethod.axios_delete();

        if (data) {
          await this.getAllFirstTimeUserList();
          openToast(this.$store, 'مودال با موفقیت حذف شد', "success")
        }
      } catch (error) {}
      finally {
        this.loading = false;
        this.$refs.modal.dialog = false;
      }
    },

    closeModal(){
      this.$refs.modal.dialog = false
    }
  },

  watch: {
    firstTimeUserList() {
      this.itemListTable = []
      this.firstTimeUserList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                name:item.name,
                voucher_code: item.voucher_code,
                content: item.content,
                custom: item.image_url,
                created_at: item.created_at_fa,
                updated_at_fa: item.updated_at_fa,
                custom2: item.is_active,
                is_active_id: item.id
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

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getAllFirstTimeUserList();
          openToast(
              this.$store,
              'مودال با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(){
      this.getAllFirstTimeUserList()
    },

    page(){
      if (!this.perPageFilter){
        this.getAllFirstTimeUserList()
      }
    }
  }
}
</script>
