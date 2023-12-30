<template>
  <div class="text-right ">
      <v-dialog v-model="dialog" width="600" >
          <v-card class="">
              <v-row
                  justify="space-between"
                  align="center"
                  class="pa-1 my-2">
                  <v-col class="mx-10" cols="2">
                      <v-btn @click="close()" variant="icon">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                  </v-col>
  
                  <v-col cols="7" class="t16400 ">
                      ثبت ضایعات
                  </v-col>
              </v-row>
              <v-divider class="center-divider"/>
              <div class=" px-5">
              <v-row justify="center">
                  <v-col cols="12" md="6">
                      <div justify="start" class="text-center mb-3">
                          <span class="t12400 color-grey ">
                                  سریال کالا 
                                  <span class="text-red">*</span>
                              </span>
                      </div>
                          <v-autocomplete
                              :items="sphssList"
                              density="compact"
                              variant="outlined"
                              item-title="label"
                              item-value="id"
                              single-line
                              v-debounce:1s.unlock="searchSku"
                              class="mx-auto" />
                      </v-col>
                  </v-row>
                  <v-row class="justify-between my-2 mx-2">
  
                      <v-col cols="3" class="d-flex mx-10 ">
                          <v-btn
                              @click="print()"
                              height="40"
                              rounded
                              variant="flat"
                              color="primary500"
                              class="px-5 mt-1">
                              تایید
                          </v-btn>
                      </v-col>
                      <v-col cols="3" class="d-flex justify-end mx-10">
                          <btn
                              class="mt-3 mr-2"
                              @click="close()"
                              style="cursor: pointer;">
                              انصراف
                          </btn>
                      </v-col>
                  </v-row>
              </div>
          </v-card>
      </v-dialog>
  </div>
  </template>
  
  <script>
  import BulkLabelPrint from "@/composables/BulkLabelPrint";
  import Table from "@/components/BulkLabelPrint/Table/Table.vue";
  import {
      convertDateToJalai
  } from "@/assets/js/functions";
  export default {
      setup() {
          const {
              
              retailShipments,
              dataTableLength,
              page,
              header,
              loading,
              headerShps
          } = BulkLabelPrint();
  
          return {
              retailShipments,
              dataTableLength,
              page,
              header,
              loading,
              headerShps
          };
      },
      components: {
          
        
  
      },
  
      methods: {
          convertDateToJalai,
  
          close() {
              const form = {
                  dialog: false,
                  object: ''
              }
              this.$store.commit('set_modalDamageShpss', form)
          },
          validate() {
              this.$refs.BlogForm.$refs.addForm.validate()
              setTimeout(() => {
                  if (this.$refs.BlogForm.valid) this.createBlog()
              }, 200)
          },
          searchWarehouse(e) {
              const filter = {
                  name: e
              }
              this.getWarehouseList(filter)
          },
  
      },
  
      computed: {
          dialog() {
              return this.$store.getters['get_modalDamageShpss']
          },
          retailObject() {
              return this.$store.getters['get_modalDamageShpssObject']
          },
      }
  }
  </script>
  