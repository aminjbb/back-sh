<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
          <v-btn
              @click="$router.push('/menu/create')"
              color="primary500"
              height="40"
              rounded
              class="px-8 ">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن منو
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <ModalTableFilter path="menu/index" :filterField="filterField" />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="menus.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="system/menu/crud/update/activation/"
          deletePath="system/menu/crud/delete/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="page" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
<!--            <ModalExcelDownload getEndPoint="page/csv/get/export" />-->
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
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
import Table from '@/components/Menu/Table/MenuTable.vue'
import Menu from "@/composables/Menu";
import ModalTableFilter from '@/components/Menu/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
export default {
  setup(props) {
    const {
      getMenus , getMenu , menu , menus , pageLength, filterField ,addPerPage, dataTableLength, page, header, loading
    } = new Menu();
    return {
      getMenus , getMenu , menu , menus , pageLength, filterField ,addPerPage, dataTableLength, page, header, loading
    };
  },

  components: {
    Table,
    ModalGroupAdd,
    ModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

  },

  mounted() {
    this.getMenus();
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getMenus();
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
  }
}
</script>
