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

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch pt-5" height="580">
      <div v-for="(system , index) in items" :key="`system${index}`">
        <div class="text-center">
          {{system.title}}
        </div>
        <div  v-for="(systemItem , systemItemIndex) in system.items" :key="`systemItem${systemItemIndex}`" >

            <div v-for="(systemItemValue , systemItemValueIndex) in systemItem" :key="`systemItemValue${systemItemValueIndex}`">
              <div class="d-flex justify-space-evenly align-center py-5">
                <div>
                  {{systemItemValue.detail}}
                </div>
                <div>
                  {{splitChar(systemItemValue.value)}} تومان
                </div>
                <div style="width: 200px">
                  <v-text-field v-model="form[systemItemValueIndex].value" variant="outlined" placeholder="قیمت جدید"></v-text-field>
                </div>
                <div style="width: 200px">
                  <v-btn :loading="form[systemItemValueIndex].loading" @click="updateValueSystem(systemItemValue.id , systemItemValueIndex)" :ref="`btn${systemItemValueIndex}`" rounded variant="icon" >
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
        this.form[index].loading = true
        const AxiosMethod = new AxiosCall()
        const formData = new FormData()
        formData.append('value' , this.form[index].value)
        AxiosMethod.end_point = `system/setting/admin/crud/update/${id}`
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.form = formData
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.form[index].loading = false
          this.getSystemSetting()
        }
      }
      catch (e) {
        this.form[index].loading = false
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
    items(){
      const findItem = this.items.find(item=> item.title == 'ارسال سفارش')
      if (findItem){
        findItem.items.forEach(item=>{
          item.forEach(newItem=>{
            const form ={
              value :'',
              loading :false
            }
            this.form.push(form)
          })
        })
      }


    }
  },

  mounted() {
    this.getSystemSetting()
  },

}
</script>