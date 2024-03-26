<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="80" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="space-between"
          align="start"
          class="px-10 py-5">
        <v-col
            cols="12"
            class="d-flex justify-center align-center t14500">
            تنظیمات
        </v-col></v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch pt-5 scroller"  height="580">
      <div v-for="(system , index) in items" :key="`system${index}`">
        <div class="text-center my-10">
          {{system.title}}
        </div>
        <div  v-for="(systemItem , systemItemIndex) in system.items" :key="`systemItem${systemItemIndex}`" >

            <div v-for="(systemItemValue , systemItemValueIndex) in systemItem" :key="`systemItemValue${systemItemValueIndex}`">
              <div class="d-flex justify-space-evenly align-center py-5">
                <div>
                  {{systemItemValue.detail}}
                </div>
                <div>
                  {{splitChar(systemItemValue.value)}}
                </div>
                <div style="width: 200px">
                  <input style="border: 1px black solid;" type="text" :ref="`${systemItemValue.id}${systemItemIndex}`" variant="outlined" :placeholder="systemItemValue.detail"/>
                </div>
                <div style="width: 200px">
                  <v-btn  @click="updateValueSystem(systemItemValue.id , systemItemIndex)" :ref="`btn${systemItemValueIndex}`" rounded variant="icon" >
                    <v-icon color="success">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-divider/>
            </div>

        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import System from '@/composables/System.js'
import {splitChar} from "../../assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  data(){
    return{
      form : []
    }
  },
  methods: {
    splitChar,
   async updateValueSystem(id , index){
      try {
        const AxiosMethod = new AxiosCall()
        const formData = new FormData()
        formData.append('value' ,this.$refs[`${id}${index}`][0].value)
        AxiosMethod.end_point = `system/setting/admin/crud/update/${id}`
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.form = formData
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.getSystemSetting()
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  setup(){
    const {getSystemSetting , items} = new System
    return {
      getSystemSetting,
      items
    }
  },

  watch:{

  },

  mounted() {
    this.getSystemSetting()
  },

}
</script>