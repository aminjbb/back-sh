<template>
  <v-card min-height="104" elevation="2" class="br--12 d-flex justify-center align-center px-2">
    <div>
      <span class="text-gray600">{{shps.id}}</span>
    </div>
    <div>
      <img width="64" height="64" :src="shps.sku?.image_url">
    </div>
    <div class="ml-5">
      <div>
        <span class="text-black t16 w400">{{ shps?.product?.lable }}</span>
      </div>
      <div>
        <text-clamp :text='shps?.sku?.label' :max-lines='2'
                    autoResize
                    class="text-gray500 t14 w300 text-right"/>
      </div>

    </div>
    <div class="ml-2">
      <v-card class="br br--12 d-flex justify-center align-center" height="52" width="52">
                    <span class="text-black">
                      {{ shps?.count_for_placing }}
                    </span>
      </v-card>
    </div>
  </v-card>
</template>
<script >
export  default {
  props:{
    shps:null
  },
  data(){
    return {
    }
  },


}
</script>