<template>
  <div>
    <v-row justify="center">
      <v-col v-for="(number , index) in max" :cols="myCol">
        <ModalAddAdsBanner :getHomePageBanner="getHomePageBanner" :maxWidth="maxWidth" :banner="banners[index]" :device="device"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModalAddAdsBanner from '@/components/HomePage/Modals/ModalAddAdsBanner.vue'
export default {
  components:{
    ModalAddAdsBanner
  },
  computed:{
    myCol(){
      if (this.max == 2) return 5
      if (this.max == 4) return 2
    },
    maxWidth (){
      if (this.max == 2) return 359
      if (this.max == 4) return 210
    }
  },
  props:{
    max:2,
    device:'',
    banners:[],
    getHomePageBanner:{type:Function}
  }
}
</script>