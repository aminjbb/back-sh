<template>
  <div class="h-100 d-flex flex-column align-stretch">
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
          <v-row justify="start pt-2">
            <CreateCargo :getCargoList="getCargoList"/>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
<!--            <ModalColumnFilter-->
<!--                :changeHeaderShow="changeHeaderShow"-->
<!--                :header="header"-->
<!--            />-->

<!--            <ModalTableFilter-->
<!--                path="categories/index"-->
<!--                :filterField="filterField"-->
<!--            />-->
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
          deletePath="cargo/crud/delete/"
          :header="header"
          :items="cargoList.data"
          updateUrl="category/csv/mass-update"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      />

      <v-divider/>

      <v-card-actions class="pb-3" >
        <v-row class="pr-5">
          <v-col cols="3">
          </v-col>
          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left"
              />
            </div>
          </v-col>
          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center"
            >
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
</template>

<script>
import {ref} from 'vue'
//Components
import Table from '@/components/Cargo/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';
import {openToast} from "@/assets/js/functions";

export default {
  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo
  },

  setup(props) {
    const {
      pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , header , item , filterField ,loading
    } = Cargo();
    return {
      pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , header , item , filterField ,loading
    };
  },
  mounted() {
    this.getCargoList()
  },
  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getCargoList();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    dataTableLength(val) {
      this.addPerPage(val)
    },
    $route(){
      this.getCargoList()
    }

  },

  methods: {
    /**
     * Change Header Status
     * @param {*} index
     * @param {*} value
     */
    changeHeaderShow(index, value) {
      this.header[index].show = value
    }
  }
}
</script>
