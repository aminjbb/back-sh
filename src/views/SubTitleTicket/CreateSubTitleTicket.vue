<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="">
        <v-card class="ma-5 br-12 pa-10 position__relative" height="850">
          <div class="text-center t14500 pb-5">ساخت موضوع</div>
          <v-divider/>
          <v-form ref="addForm" v-model="valid">
            <v-row class="mt-3" justify="space-around" align="center">
              <v-col cols="12" md="4">
                <div class="text-right my-5">
                  <span class="t12400">عنوان موضوع</span>
                  <span class="text-error mr-1">*</span>
                </div>
                <v-text-field
                    v-model="form.subject"
                    density="compact"
                    variant="outlined"
                    single-line
                />
              </v-col>

              <v-col cols="12" md="4">
                <div class="text-right my-5">
                  <span class="t12400">فیلدهای اجباری</span>
                </div>
                <v-autocomplete
                    v-model="form.requiredFiled"
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="requiredFiledList"
                    item-title="name"
                    item-value="id"
                />
              </v-col>
            </v-row>
          </v-form>

          <div class="d-flex justify-end position__absolute bottom left">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              تایید
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
              <template v-slot:prepend>
                <v-icon>mdi-cancel</v-icon>
              </template>
              انصراف
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import {openToast} from "@/assets/js/functions";

export default {
  name: "CreateSubTitleTicket",

  components: {
    DashboardLayout,
    Header
  },

  data() {
    return {
      loading: false,
      valid: false,

      AllRequiredFiledList:[
        {
          id:1,
          name:'شناسه کالا',
          value:'shps_id'
        },
        {
          id:2,
          name:'شماره سفارش',
          value:'order_number'
        },
        {
          id:3,
          name:'تصویر',
          value:'image'
        },


      ],

      form: {
        subject: '',
        requiredFiled:''
      },

    }
  },

  computed:{
    requiredFiledList(){
      try {
        let requiredFiled = []
        this.AllRequiredFiledList.forEach(element =>{
          const form = {
            name : element.name,
            id : element.id
          }
          requiredFiled.push(form)
        })
        return requiredFiled
      }
      catch (e){}
    }
  },

  methods: {
    validate() {
      if (this.form.subject === '') {
        openToast( this.$store, '.عنوان موضوع را وارد کنید', "error")
      } else {
        console.log('hello')
      }
    }
  }
}
</script>

<style scoped>

</style>