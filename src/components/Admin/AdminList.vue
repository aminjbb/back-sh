<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn
                        @click="$router.push('/admin/create')"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        ساخت ادمین
                    </v-btn>
                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                  <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                  <PanelFilter
                      @resetPage="resetPage"
                      path="admin/index"
                      :filterField="filterField"
                      :page="page"
                      :perPage="dataTableLength"/>
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            @resetPage="resetPage"
            class="flex-grow-1"
            :header="header"
            :items="adminList"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            editUrl="/admin/edit/"
            updateUrl="admin/csv/mass-update/"
            deletePath="admin/crud/delete/"
            banPath="admin/crud/update/ban/"/>

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3">
                    <ModalExcelDownload getEndPoint="admin/csv/get/export" />
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
import Table from '@/components/Admin/AdminTable/AdminTable.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import Admin from "@/composables/Admin";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
export default {
    setup() {
        const {
            pageLength,
            adminList,
            getAdminList,
            filterField,
            dataTableLength,
            page,
            header,
            loading
        } = Admin();
        return {
            pageLength,
            adminList,
            getAdminList,
            filterField,
            dataTableLength,
            page,
            header,
            loading
        };
    },
    components: {
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
        this.$store.commit('set_avatar', null)
        this.getAdminList()
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
            if (localStorage.getItem('deleteObject') === 'done') {
            if (!val) {
                this.getAdminList();
                openToast(
                    this.$store,
                    'ادمین با موفقیت حذف شد',
                    "success"
                );
                localStorage.removeItem('deleteObject')
            }
            }
      },

      $route(){
        this.getAdminList()
      },

      page(){
        if (!this.perPageFilter){
          this.getAdminList()
        }
      }
    }
}
</script>
