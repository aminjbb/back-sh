<template>
  <div>
    <div >
      <v-icon class="text-grey-darken-1 pointer"  >
              mdi-close-octagon-outline
      </v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300 pointer" @click="dialog= true">
            توقف اختصاص به پیک آپر
      </span>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:default="{ isActive }">
        <v-card width="450" class="px-10 ">

          <div class="my-4">
              <v-icon @click="dialog=false" class="float-left  pointer align-center">
                  mdi-close
              </v-icon>
              <div class="text-center t16700">
                  توقف اختصاص به پیک آپر
              </div>
            </div>

          <v-divider></v-divider>

          <div class=" my-4 py-5  ">
            <div class="text-end me-2 t16400"> : علت </div>

            <v-textarea
                v-model="Description"
                variant="outlined">
            </v-textarea>

            <div class="text-center t14 w400" >
              آیا از انجام این عملیات اطمینان دارید ؟
            </div>
          </div>

          <v-divider></v-divider>

          <v-card-actions class="my-4">
            <v-row justify="space-between" no-gutters>
              <v-btn
                  :loading="loading"
                  :disabled=" Description === '' "
                  @click="sendBug()"
                  height="40"
                  rounded
                  class= " bg-primary500 px-8 "
              >
                تایید
              </v-btn>

              <v-btn
                  @click="modalShow = false"
                  variant="outlined"
                  height="40"
                  rounded
                  class="px-8 "
              >
                انصراف
              </v-btn>
            </v-row>
          </v-card-actions>

      </v-card>
    </template>
  </v-dialog>
  </div>
</template>

<script >
import ReportBugTaskComp from '@/composables/ReportBugTask.js';

export default {

  data(){
    return{
      dialog: false,
      Description: ''
    }
  },

  props:{
    id:null
  },

  setup(){
    const { loading, getReports, sendReportBug} = ReportBugTaskComp();
    return { loading, getReports, sendReportBug}
  },

  methods: {
   async sendBug() {
     await this.sendReportBug(this.id, this.Description)
      this.dialog = false
     this.$emit ( 'reloadNewReports')
    }
  }
}
</script>


