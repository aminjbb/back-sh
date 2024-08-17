

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <EditSku/>-->
      <div class="h-100vh" >

        <EditSkuForm
            ref="EditSkuForm"
            :sku="sku"
            :heightList="heightList"
            :widthList="widthList"
            :lengthLis="lengthList"
            :weightList="weightList"
            :volumeUnitList="volumeUnitList"/>
      </div>

    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import EditSkuForm from "@/components/Products/Sku/Edit/EditSkuForm.vue";
import Sku from "@/composables/Sku";
import Size from "@/composables/Size";
const EditSku = defineAsyncComponent(()=> import ('@/components/Products/Sku/Edit/EditSku.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    Header,
    DashboardLayout,
    EditSkuForm,
  },

  setup() {
    const {  sku, getSkue } = Sku();
    const {size, getSize} = Size()
    return { sku, getSkue , size, getSize, };
  },
  mounted() {
    const filterPerPag = {
      per_page: 10000
    }

    this.getSkue()
    this.getSize(filterPerPag)
  },

  computed:{
    /**
     * create height list for select
     */
    heightList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'height')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    /**
     * create width list for select
     */
    widthList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'width')
        const width = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          width.push(form)
        });
        return width
      } catch (error) {
        return []
      }
    },

    /**
     * create length list for select
     */
    lengthList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'length')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    /**
     * create weight list for select
     */
    weightList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'weight')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    volumeUnitList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'volume')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },
  },
}
</script>
