<template>
  <div class="d-flex justify-space-between align-center pa-5">
    <div >
        <span class="t20400">
        مجموع اقلام
        </span>
    </div>
    <v-card class="br br__12 d-flex justify-center align-center" height="52" width="52" color="primary500">
            <span class="text-white">
              10
            </span>
    </v-card>
  </div>
  <v-row justify="center" align="start" class="px-2 mt-5 locating_box">
    <v-col cols="12" v-for="(shps , index) in shpsList?.shps_list">
      <ShpsCard :shps="shps"/>
    </v-col>

  </v-row>
  <div class="bottom-box">
    <v-btn
        color="primary500"
        height="40"
        width="348"
        rounded
        @click="scanShelf()"
        class="px-8 mt-5">
      <template v-slot:prepend>
        <v-icon>mdi-barcode-scan</v-icon>
      </template>
      اسکن شلف
    </v-btn>
  </div>
</template>
<script>
import ShpsCard from "@/components/PackagePlacement/Locating/ShpsCard.vue";
export default {
  props:{
    shpsList:[],
    scanShelf:{
      type:Function
    }
  },
  components:{
    ShpsCard
  },

}
</script>

<style>
.locating_box{
  overflow-x: auto !important;
  height: calc(100% - 245px) !important;
}

</style>