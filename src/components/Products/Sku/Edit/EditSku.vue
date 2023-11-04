<template >

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
</template>
<script>
import { ref } from 'vue'
import EditSkuForm from '@/components/Products/Sku/Edit/EditSkuForm.vue'
import Sku from '@/composables/Sku';
import Size from "@/composables/Size";
import CreateProductFromStep2 from "@/components/Products/Create/Steps/Steps2.vue";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
    components: {
      CreateProductFromStep2,
      EditSkuForm
    },

    setup(props) {
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

  methods:{

  }
}
</script>
