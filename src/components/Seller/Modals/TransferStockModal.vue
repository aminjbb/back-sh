<template>
<div class="text-center">
    <v-dialog v-model="transferStockModal.dialog" width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">انتقال موجودی</span>
                <v-btn
                    class="modal__header__btn"
                    @click="close()"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>
            <div class="mb-5 px-5">
                <v-divider />
            </div>

            <div class="text-right pa-5">
                <span class="t12 w300 modal__label">انتخاب کالا</span>
              <v-autocomplete
                  v-model="shps_id"
                  placeholder="نام کالا یا شماره shps را جستجو نمایید"
                  variant="outlined"
                  prepend-inner-icon-cb="mdi-map-marker"
                  rounded="lg"
                  :items="skuList"
                  item-title="name"
                  item-value="value"
                  v-debounce="searchSku">

              </v-autocomplete>
            </div>

            <div class="mt-5 px-5">
                <v-divider />
            </div>

            <footer class="d--rtl d-flex justify-between align-center pa-4 pt-3">
                <v-btn
                    @click="close()"
                    variant="text"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    انصراف
                </v-btn>

                <v-btn
                    :loading="loading"
                    color="primary500"
                    @click="transferStock()"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    <span>
                        تایید
                    </span>
                </v-btn>
            </footer>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { closeModal } from "@/assets/js/functions_seller";
import { AxiosCall } from '@/assets/js/axios_call.js'
import { defineAsyncComponent } from "vue";
const ShAutocomplete = defineAsyncComponent(()=> import ('@/components/Components/Kits/AutoComplete/sh-autocomplete.vue'))

export default {
  components: {ShAutocomplete},

  data() {
    return {
      loading: false,
      skuSearchList: [],
      shpsSearchList:[],
      shps_id: '',
      destinationShps: {}
    }
  },

  computed: {
    transferStockModal() {
      try {
        return this.$store.getters['get_transferStockModal']
      } catch (error) {
        return ''
      }
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
            value: skuSearch,
            id: skuSearch,
            warehouse_stock: skuSearch.warehouse_stock,
            site_stock: skuSearch.site_stock,
            seller_id: skuSearch.seller_id
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    close() {
      closeModal(this.$store, 'set_transferStockModal');
      this.shps_id= null
    },

    async searchSku(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/sku/search?q=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },

    async assignShps(item) {
      this.shps_id = item
      this.destinationShps = item
    },


    transferStock() {
      this.$emit('closeFirsModal', this.shps_id)
    },

    updateList(status) {
      this.$emit('updateList', status);
    },
  },

  created() {
    this.$watch(
        () => this.transferStockModal.dialog,
        (dialogState) => {
          if (dialogState) {
            // this.getShps();
          }
        }
    );
  },
}
</script>
