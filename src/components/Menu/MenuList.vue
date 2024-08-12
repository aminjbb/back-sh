<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
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

            <PanelFilter
                @resetPage="resetPage"
                path="menu/index"
                :filterField="filterField"
                :statusItems="status"
                :statusHasOption="hasOption"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading"
          :page="page"
          :perPage="dataTableLength">
        <template v-slot:customSlot="item">
          <ActivationModal
              :changeValue="changeValue"
              :url="'system/menu/crud/update/activation/'"
              :id="item.data.id"
              :index="item.index"
              :active="item.data.custom"/>
        </template>

        <template v-slot:actionSlot="item">
          <div class="text-center">
            <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
              mdi-dots-vertical
            </v-icon>
          </div>

          <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
            <v-list class="c-table__more-options">
              <v-list-item>
                <v-list-item-title>
                  <div class="ma-5 pointer" @click="$router.push(`/menu/update/${item.data.id}`)">
                    <v-icon size="small" class="text-grey-darken-1">
                      mdi-pen
                    </v-icon>
                    <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                    <v-icon size="small" class="text-grey-darken-1">
                      mdi-trash-can-outline
                    </v-icon>
                    <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list-item-title>
                <div class="ma-5 pointer" @click="$router.push(`/menu/${item.data.id}/add/image`)">
                  <span class="mr-2 text-grey-darken-1 t14 w300">بارگذاری تصویر</span>
                  <v-icon class="text-grey-darken-1">mdi-image</v-icon>
                </div>
              </v-list-item-title>
            </v-list>
          </v-menu>
        </template>
      </ShTable>

      <v-divider />

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
import Menu from "@/composables/Menu";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ShTable from "@/components/Components/Table/sh-table.vue";
import {openConfirm,openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ActivationModal from "@/components/Public/ActivationModal.vue";

export default {
  data() {
    return {
      perPageFilter:false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "system/menu/crud/delete/",
      },
    }
  },
  setup() {
    const status = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'فعال',
        value: '1',
      },
      {
        label: 'غیرفعال',
        value: '0',
      }
    ]
   const hasOption=[
      {
        label: 'دارد',
        value: '1',
      },
      {
        label: 'ندارد',
        value: '0',
      },
    ]

    const {
      getMenus ,
      getMenu ,
      menu ,
      menus ,
      pageLength,
      filterField ,
      dataTableLength,
      page,
      header,
      loading
    } = new Menu();
    return {
      getMenus ,
      getMenu ,
      menu ,
      menus ,
      pageLength,
      filterField ,
      dataTableLength,
      page,
      header,
      loading,
      status,
      hasOption
    };
  },

  components: {
    ActivationModal,
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeValue(index, value) {
      index = value
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
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    }
  },

  mounted() {
    this.getMenus();
  },

  watch: {
    menus() {
      this.itemListTable = []

      this.menus.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                label: item.label,
                name: item.name,
                level: item.level,
                menu: item?.parent?.label,
                priority: item.priority,
                custom: item.is_active,
                custom_id: item.id,
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

    page(){
      if (!this.perPageFilter){
        this.getMenus()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getMenus();
          openToast(this.$store,  'منو مورد نظر با موفقیت حذف شد', "success",);
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(){
      this.getMenus()
    }
  }
}
</script>
