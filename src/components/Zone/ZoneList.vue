<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="1"
              :perPage="25"
              :loading="loading"
              :rowList="rowList"
          >
              <template v-slot:actionSlot="item">
                  <div class="text-center">
                      <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                          mdi-dots-vertical
                      </v-icon>
                  </div>

                  <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                      <v-list class="c-table__more-options">
                          <v-list class="c-table__more-options">
                              <v-list-item-title>
                                  <div class="ma-3 pointer d--rtl" @click="openPickUpperModal(item.data.id)">
                                      <v-icon class="text-grey-darken-1">mdi-distribute-vertical-top</v-icon>
                                      <span class="mr-2 text-grey-darken-1 t14300">
                                       ویرایش ناحیه
                                    </span>
                                  </div>
                                  <ModalPickUpper :ref="`pickUpper`" :id="item.data.id" :rowList="rowList"/>

                              </v-list-item-title>


                              <v-list-item-title>
                                  <div class="ma-3 pointer d--rtl" @click="openEditAdminModal(item.data.id)">
                                      <v-icon class="text-grey-darken-1">mdi-account</v-icon>
                                      <span class="mr-2 text-grey-darken-1 t14300">
                                       ویرایش پیکاپر
                                    </span>
                                  </div>
                                  <ModalUpdateAdmin :ref="`updateAdminZone`" :id="item.data.id" :rowList="rowList"/>

                              </v-list-item-title>
                          </v-list>
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
                      </div>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-end">
                  </v-col>
              </v-row>
          </v-card-actions>
      </v-card>
  </div>
  </template>
  
  <script>
  import Zone from "@/composables/Zone";
  import Placement from "@/composables/Placement";
  import ShTable from "@/components/Components/Table/sh-table.vue";
  import ModalUpdateAdmin from "@/components/Zone/Modal/ModalUpdateAdmin.vue";
  import ModalPickUpper from "@/components/Zone/Modal/PickUpperModal.vue";

  export default {
      data(){
          return{
              itemListTable: []
          }
      },
      setup() {
          const {
            zoneList, getZoneList, header,loading
          } = Zone();
          const {
              getRowList,
              rowList
          } = Placement();

          return {
              zoneList, getZoneList, header,loading, getRowList, rowList
          };
      },
  
      components: {
          ModalPickUpper, ModalUpdateAdmin,
          ShTable
      },
  
      methods: {
          changeHeaderShow(index, value) {
              this.header[index].show = value
          },

          openPickUpperModal(id){
              this.$refs.pickUpper.openModal();
          },
          openEditAdminModal(id){
              this.$refs.updateAdminZone.openModal();
          },
      },
  
      mounted() {
          this.getZoneList();
          this.getRowList();
      },

      watch:{
          zoneList() {

          this.itemListTable = []
          this.zoneList.forEach((item) => {
              this.itemListTable.push(
                  {
                      id: item.id,
                      label: item.label,
                      name: item.name ? item.name : '-',
                  }
              )
          })
        }
     },
  }
  </script>