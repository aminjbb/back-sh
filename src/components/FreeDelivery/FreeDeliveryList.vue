<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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
  
      <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">

        <Table
            class="flex-grow-1"
            :header="headerFreeDelivery"
            :items="freeDeliveryList"
            :page="page"
            :perPage="dataTableLength"
            activePath="admin/delivery-discount/activation/"
            @updateList="updateList"
            deletePath="admin/delivery-discount/crud/delete/"
            model="order" />
  
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
  import Table from '@/components/FreeDelivery/Table/Table.vue'
  import FreeDelivery from "@/composables/FreeDelivery";
  import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
  
  export default {
    data() {
      return {
        perPageFilter:false
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
      Table
    },
  
    computed: {
      confirmModal() {
        return this.$store.getters['get_confirmForm'].confirmModal
      }
    },
  
    methods: {
      changeHeaderShow(index, value) {
        this.headerFreeDelivery[index].show = value
      },
  
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
      }
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
      }
    }
  }
  </script>
  