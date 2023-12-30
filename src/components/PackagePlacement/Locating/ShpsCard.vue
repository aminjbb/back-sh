<template>
  <v-card min-height="104" elevation="2" class="br__12 d-flex justify-center align-center px-2">
    <div>
      <span class="text-gray600">1</span>
    </div>
    <div>
      <img width="64" height="64" :src="shps.image_url">
    </div>
    <div class="ml-5">
      <div>
        <span class="text-black t16400">{{ shps?.product?.lable }}</span>
      </div>
      <div>
        <text-clamp :text='shps?.sku_label' :max-lines='2'
                    autoResize
                    class="text-gray500 t14300 text-right"/>
      </div>

    </div>
    <div class="ml-2">
      <v-card class="br br__12 d-flex justify-center align-center" height="52" width="52">
                    <span class="text-black">
                      {{ shps?.count }}
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