<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="header"
              :items="zoneList.data"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
              :rowList="rowList"
              @updateList="updateList"
              deletePath="placement/crud/delete/"
              model="placement" />
  
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
  import Table from '@/components/Zone/Table/Table.vue'
  import Zone from "@/composables/Zone";
  import Placement from "@/composables/Placement";
  
  export default {
      setup(props) {
          const {
              pageLength,
              getZoneList,
              zoneList,
              dataTableLength,
              page,
              header,
              addPagination,
              addPerPage,
              loading,
          } = Zone();
          const {
              getRowList,
              rowList
          } = Placement();

          return {
              pageLength,
              getZoneList,
              zoneList,
              dataTableLength,
              page,
              header,
              addPagination,
              addPerPage,
              loading,
              getRowList,
              rowList
          };
      },
  
      components: {
          Table,
      },
  
      methods: {
          changeHeaderShow(index, value) {
              this.header[index].show = value
          },
  
          updateList(status) {
              if (status === 'true') {
                  this.getPlacementList();
              }
          },
      },
  
      mounted() {
          this.getZoneList();
          this.getRowList();
      },
  
      watch: {
          dataTableLength(val) {
              this.getZoneList(val)
          },
      }
  }
  </script>