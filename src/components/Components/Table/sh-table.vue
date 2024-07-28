<template>
  <div class="c-table rounded-t-lg">
    <v-data-table
        class="table mt-5"
        :headers="headers"
        :items="items"
        :show-select="isSelect"
        hide-default-footer

        item-value="index"
        :loading="loading">
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10" ></v-skeleton-loader>
            </template>
<!--
        item.key refers to key in header
        = {value} refers usage in column (like index of row)
-->

        <template v-slot:item.row="{ item, index }">
            <span class="t14300 text-gray500 number-font">
                {{rowIndexTable(index)}}
            </span>
      </template>

        <template v-slot:item.sku.id="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.sku?.id }}
            </span>
        </template>

        <template v-slot:item.id="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.id }}
            </span>
        </template>

        <template v-slot:item.sku.label="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.sku?.label }}
            </span>
        </template>

        <template v-slot:item.warehouse_stock="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.warehouse_stock }}
            </span>
        </template>

        <template v-slot:item.site_stock="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.site_stock }}
            </span>
        </template>

        <template v-slot:item.customer_price="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ splitChar(item.customer_price) }}
            </span>
        </template>

        <template v-slot:item.base_discount="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.base_discount }}
            </span>
        </template>

        <template v-slot:item.marketing_discount="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ item.marketing_discount }}
            </span>
        </template>

        <template v-slot:item.site_price="{ item }">
            <span class="t14300 text-gray500 number-font">
                {{ splitChar(item.site_price) }}
            </span>
        </template>

        <template v-slot:item.is_active="{ item, index }">
            <span class="t14300 ">
                <v-switch
                    v-model="activeStatus[index]"
                    inset
                    color="success"
                    @change="changeSellable(index,item)" />
            </span>
        </template>

        <template v-slot:item.is_sellable="{ item, index }">
            <v-switch
                v-model="sellableStatus[index]"
                inset
                color="success"
                @change="changeActive(index,item)" />
        </template>




        <template v-slot:item.created_at_fa="{ item }">
        <span class="t14300 text-gray500  number-font">
          {{ item.created_at_fa}}
        </span>
      </template>

      <template v-slot:item.updated_at_fa="{ item }">
        <span class="t14300 text-gray500  number-font">
          {{ item.updated_at_fa}}
        </span>
      </template>

      <template v-slot:item.identification_code="{ item }">
        <span class="t14300 text-gray500  number-font">
          {{ item.identification_code}}
        </span>
      </template>

      <template v-slot:item.phone_number="{ item }">
        <span class="t14300 text-gray500  number-font">
          {{ item.phone_number}}
        </span>
      </template>

      <template v-slot:item.action="{ item }">
        <v-menu :close-on-content-click="false" :location="location" ref="menu">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list class="c-table__more-options">
            <v-list-item v-for="(actionItem, i) in menuTable" :key="i">
              <v-list-item-title>
                <div
                    class="ma-5 pointer"
                    @click="action(actionItem, item)">
                  <v-icon size="small" class="text-grey-darken-1">
                      {{actionItem.icon}}
                  </v-icon>
                  <span class="mr-2 text-grey-darken-1 t14300">
                                                {{actionItem.text}}
                                                </span>
                </div>
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="delete">
              <v-list-item-title>
                <div class="ma-5 pointer" @click="removeItem(item.id)">
                  <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 t14300">
                                                حذف
                                            </span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <div class="d-flex justify-center align-center flex-column py-14">
          <img src="@/assets/img/NullTable.png" alt="shavaz image">
          <div class="d-flex justify-center align-center flex-column">
            <span class="text-gray500 text-center text-body-1">اطلاعاتی برای نمایش وجود ندارد.</span>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import {openConfirm, splitChar} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  name: "Table",

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: Array,
    loading: Boolean,
    isSelect: Boolean,
    page: {
        type: Number,
        default: 1
    },
    perPage:Number,
    delete: Object,
    activePath: {
      type: String,
      default: ''
    },
    sellablePath: {
      type: String,
      default: ''
    },
    model: null, /** for custom table **/
    menuTable: Array,
/**  each action should have only emit or to
     menuTable: [ {icon: '', text: '', to:``,   params: true,     type:'sku or none for sku_id or id',    emit: "for modals use all emits as events"}]
**/
  },

    data(){
      return{
          activeStatus: [],
          sellableStatus: [],
      }
    },

/**
fill active status : array of booleans
*/
    watch: {
        items(val) {
            this.activeStatus = []
            val.forEach(element => {
                let active = false
                if (element.is_active == 1) {
                    active = true
                    this.activeStatus.push(active)
                }
            });

            this.sellableStatus = []
            val.forEach(element => {
                var sellable = false
                if (element.is_sellable == 1) {
                    sellable = true
                    this.sellable.push(sellable)
                }
            });

        }
    },

    methods: {
        splitChar,
        rowIndexTable(index) {
          let rowIndex = 0
          if (this.page === 1) {
            rowIndex = (1 + index)
            return rowIndex
          } else {
            rowIndex = ((this.page - 1) * this.perPage) + index + 1
            return rowIndex
          }
        },
        removeItem(id) {
          openConfirm(this.$store, this.delete.text, this.delete.title ,"delete", this.delete.path + id, true)
        },

        async changeActive(index, item){
          var formdata = new FormData();
          const AxiosMethod = new AxiosCall()
          AxiosMethod.end_point = this.activePath + item.id
          if (this.activeStatus[index])
            { formdata.append('is_active', 1)}
          else
            { formdata.append('is_active', 0)}
          AxiosMethod.store = this.$store
          AxiosMethod.form = formdata

          AxiosMethod.using_auth = true
          AxiosMethod.token = this.$cookies.get('adminToken')
          let data = await AxiosMethod.axios_post()
        },
        async changeSellable(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.sellablePath + item.id
            if (this.sellableStatus[index])
                { formdata.append('is_sellable', 1)}
            else
                { formdata.append('is_sellable', 0)}
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
        },

        action(actionItem, item){
        if(actionItem.to) {
            if(actionItem.params){
                if(actionItem.type === 'sku') {
                    this.$router.push(actionItem.to + item.sku.id)
                } else {
                    this.$router.push(actionItem.to + item.id)
                }
            }
            /** without params & type**/
            else{
                this.$router.push(actionItem.to)
            }

        }
        /** @emitName(item)="" in component comes from emit keys of MenuTable in Data Array **/
        else if (actionItem.emit) {
            this.$emit(actionItem.emit, item)
        }
      }
  },
}
</script>

