<template>
  <v-card height="100vh">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-row justify="end" class="pa-5">
          <HandheldDrawer/>
        </v-row>
        <span class="t20 w400">
          انبارگردانی
        </span>
      </v-col>
    </v-row>
    <v-row class="mx-2">
      <v-col cols="12">
        شلف
        <v-text-field
            @keyup.enter.prevent="goTo('sku')"
            ref="shelf"
            variant="solo"
            hint="شلف را اسکن کنید"
            v-model="shelfBarcode"
        />
      </v-col>
      بارکد کالا
      <v-col cols="12">
        <v-text-field
            @keyup.enter.prevent="goTo('count')"
            ref="sku"
            variant="solo"
            hint="کالا را اسکن کنید"
            v-model="skuBarcode"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
            @keyup.enter.prevent="submit"
            ref="count"
            variant="solo"
            type="number"
            hint="تعداد"
            v-model="count"
        />
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn :loading="loading" width="150" @click="submit" color="success">تایید</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {
  openToast,
} from "@/assets/js/functions";

export default {
  components: {HandheldDrawer},
  data() {
    return {
      shelfBarcode: null,
      skuBarcode: null,
      count: null,
      loading: false,
    }
  },
  methods: {
    goTo(field) {
      if (field === 'sku') this.$refs.sku.focus()
      if (field === 'count') this.$refs.count.focus()
    },
    async submit() {
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('sku_barcode', this.skuBarcode)
        formData.append('count', this.count)
        formData.append('shelf_barcode', this.shelfBarcode)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.using_auth = true
        AxiosMethod.form = formData
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.end_point = `warehouse/relocate`
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.shelfBarcode = null
          this.skuBarcode = null
          this.count = null
          this.loading = false
          openToast(this.$store, 'کالای مورد نظر با موفقیت به شلف افزوده شد.', "success")
        }
        this.$refs.shelf.focus()
      } catch (e) {
        this.loading = false
        if (e.response.data.message) {
          openToast(
              this.$store,
              e.response.data.message,
              "error"
          );
        }
        this.shelfBarcode = null
        this.skuBarcode = null
        this.count = null
      }
    },
  }
}
</script>
<style>

</style>