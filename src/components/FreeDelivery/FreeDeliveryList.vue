<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
          <v-col cols="6" >

            <v-btn
                @click="$router.push('/free-delivery/create')"
                color="primary500"
                height="40"
                rounded
                class="px-8 ">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>
          </v-col>
  
          <v-col cols="6">
            <v-row justify="end" class="mt-0">
              <PanelFilter
                  @resetPage="resetPage"
                  path="free-delivery/index"
                  :filterField="indexFilterField"
                  :sendingItems="sendingMethods"
                  :statusItems="activeFilter"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
  
      <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
            class="flex-grow-1"
            :headers="headerFreeDelivery"
            :items="itemListTable"
            :page="page"
            :perPage="dataTableLength"
            activePath="admin/delivery-discount/activation/"
            >
              <template v-slot:actionSlot="item">
                  <div class="text-center">
                      <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                          mdi-dots-vertical
                      </v-icon>
                  </div>

                  <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                      <v-list class="c-table__more-options">
                          <v-list-item-title>
                              <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.data.id}/shps`)">
                                  <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                    نمایش کالاهای تخفیف
                                  </span>
                              </div>
                          </v-list-item-title>

                          <v-list-item-title>
                              <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.data.id}/customer`)">
                                  <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        نمایش مشتری های تخفیف
                                  </span>
                              </div>
                          </v-list-item-title>

                          <v-list-item-title>
                              <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.data.id}/orderList`)">
                                  <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        لیست سفارشات
                                  </span>
                              </div>
                          </v-list-item-title>

                          <v-list-item-title>
                              <div class="ma-3 pointer d--rtl" @click="removeItem(item.data.id)">
                                  <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        حذف
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list>
                  </v-menu>
              </template>
          </ShTable>
  
        <v-divider />
  
        <v-card-actions class="pb-3">
          <v-row class="px-8">
            <v-col cols="3" class="d-flex justify-start" />
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
  import FreeDelivery from "@/composables/FreeDelivery";
  import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
  import ShTable from "@/components/Components/Table/sh-table.vue";
  import {openConfirm, splitChar} from "@/assets/js/functions";

  export default {
    data() {
      return {
        perPageFilter:false,
        itemListTable: []
      }
    },
    setup() {
     const sendingMethods= [
       {
         title: 'همه',
         value: ''
       },
        {
          title: ' نفیس اکسپرس',
          value: 'nafis'
        },

        {
          title: 'تیپاکس',
          value: 'tipax'
        },
        {
          title: 'پست پیشتاز ',
          value: 'pishtaz'
        },
        {
          title: 'پست ',
          value: 'post'
        },

      ]
      const activeFilter= [
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

      const {
       headerFreeDelivery,
        filterField ,
        page ,
        freeDeliveryList ,
        dataTableLength ,
        pageLength ,
        getFreeDeliveryList,
        indexFilterField
      } = FreeDelivery();
      return {
        headerFreeDelivery,
        filterField ,
        page ,
        freeDeliveryList ,
        dataTableLength ,
        pageLength ,
        getFreeDeliveryList ,
        indexFilterField,
        sendingMethods,
        activeFilter
      };
    },
  
    components: {
    PanelFilter,
    ShTable
    },
  
    methods: {
      updateList(status) {
        if (status === 'true') {
          this.getFreeDeliveryList();
        }
      },
      resetPage(){
        this.perPageFilter = true
        this.page = 1
        setTimeout(()=>{
          this.perPageFilter = false
        }, 1000)
      },

        removeItem(id) {
            openConfirm(this.$store, "از حذف آیتم مورد نظر اطمینان دارید؟", "حذف", "delete", 'admin/delivery-discount/crud/delete/' + id, true);
        },
    },
  
    mounted() {
      this.getFreeDeliveryList()
    },
  
    watch: {
      $route(){
        this.getFreeDeliveryList()
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
          this.getFreeDeliveryList()
        }
      },

        freeDeliveryList() {
            this.itemListTable = []
            this.freeDeliveryList.forEach((item) => {
                this.itemListTable.push(
                    {
                        id: item.id,
                        name: item.name,
                        nafis: item.nafis === true ? 'mdi-check|success' : 'mdi-close|error',
                        pishtaz: item.pishtaz === true ? 'mdi-check|success' : 'mdi-close|error',
                        post: item.post === true ? 'mdi-check|success' : 'mdi-close|error',
                        tpax: item.tpax === true ? 'mdi-check|success' : 'mdi-close|error',
                        start_time_fa: item.start_time_fa,
                        end_time_fa: item.end_time_fa,
                        is_active: item.is_active === true ? 1 : 0,
                        is_active_id: item.id,
                    }
                )
            })
        },

    }
  }
  </script>
  