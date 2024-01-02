<template>
  <div class="text-right ">
    <v-dialog v-model="dialog" width="1060">
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
            پرینت برچسب
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" :id="`printableArea-cargo`">
          <v-card class="content">
              <div class="d-flex justify-space-between pa-5">
                <span><img :src="basUrl +object?.barcode_image"></span>
                <span>شناسه کارگو : {{ object?.id }}</span>
                <span>راننده : {{ object?.driver?.full_name }}</span>
                <span>خودرو : {{ object?.vehicle?.license }}</span>

              </div>
          </v-card>
          <v-card min-height="500" class="d--rtl mt-2" >
            <Table
                class="flex-grow-1"
                editUrl="/categories/edit/"
                activePath="category/crud/update/activation/"
                deletePath="category/crud/delete/"
                :header="detailCargoHeader"
                :items="object?.packages"
                updateUrl="category/csv/mass-update"

            />

          </v-card>
          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="print()"
                  height="40"
                  rounded
                  variant="outlined"
                  prepend-icon="mdi-printer-outline"
                  class="px-5 mt-1">
                پرینت محموله
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
import Table from "@/components/Cargo/Table/DetailCargoPackageTable.vue";
import Cargo from '@/composables/Cargo'

export default {
  setup(){
    const {detailCargoHeader} = new Cargo()
    return { detailCargoHeader }
  },
  components: {
    Table,
  },

  methods: {
    print() {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}cargo-management/${this.object.id}/print`, '_blank');


    },
    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_ModalCargoDetail', form)
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
    basUrl(){
      return 'https://api.shvz.ir/'
    },
    dialog() {
      return this.$store.getters['get_ModalCargoDetail']
    },
    object() {
      return this.$store.getters['get_ModalCargoDetailObject']
    },
  }
}
</script>
