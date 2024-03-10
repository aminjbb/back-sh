<template>
  <v-card height="100vh">
    <v-row>
      <v-col cols="12" class="text-center">
        <HandheldDrawer/>
        <span class="t20400">
          انبارگردانی
        </span>
      </v-col>
    </v-row>
    <v-row class="mx-2">
      <v-col cols="12">
        شلف
        <v-text-field
            hint="شلف را اسکن کنید"
            v-model="shelfBarcode"
        />
      </v-col>
      Sku
      <v-col cols="12">
        <v-text-field
            hint="sku را اسکن کنید"
            v-model="skuBarcode"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
            type="number"
            hint="تعداد"
            v-model="count"
        />
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn width="150" @click="submit" color="success">تایید</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

export default {
  components: {HandheldDrawer},
  data() {
    return {
      shelfBarcode: null,
      skuBarcode: null,
      count: 0,
    }
  },
  methods:{
    submit(){

    }
  }
}
</script>
<style>
.pick-up__counter {
  position: absolute;
  top: 36px;
}
</style>