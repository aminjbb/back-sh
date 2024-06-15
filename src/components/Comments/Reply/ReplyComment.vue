<template>
  <div >
<!-- header -->
    <v-card
        height="70"
        class="mx-5 mt-3 rounded-t-lg rounded-b-0 d-flex justify-center align-center">
      <span class="t16400">
          اطلاعات کالا
      </span>
    </v-card>

<!-- details-->
    <v-card class="mx-5 my-3 px-5 py-2 rounded-0 " >
      <v-sheet width="80%" height="220" class="mx-auto d-flex t16400" >
        <v-row justify="center" align="center" class="t16500">
            <v-col cols="8" >
              نام کالا :
              <span class="t14500 text-gray500" >
                {{userComment?.sku?.label}}
              </span>
            </v-col>
            <v-col cols="4" class="d-flex align-center" >
              امتیاز :
                    <v-rating
                        v-model="userComment.score"
                        half-increments
                        readonly
                        class="me-3"
                        style="direction: ltr!important;">
                      <template v-slot:item="props">
                        <v-icon
                            size="x-large"
                            :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                          mdi-star
                        </v-icon>
                      </template>
                    </v-rating>
            </v-col>
            <v-col cols="4">
              SKU شناسه :
              <span class="t14500 text-gray500 number-font" >
                {{userComment?.sku_id}}
              </span>
            </v-col>
            <v-col cols="4">
              برند :
              <span class="t14500 text-gray500" >
                {{userComment?.sku?.brand?.label}}
              </span>
            </v-col>
            <v-col cols="4" class="d-flex align-center" >
              وضعیت :
<!--status-->
              <v-sheet width="200" class="ms-2">
                <v-select
                    density="compact"
                    variant="solo"
                    flat
                    :bg-color="colorStatus()"
                    hide-selected
                    item-title="label"
                    item-value="value"
                    :items="selectStatus"
                    v-model="updatedStatus"
                />
              </v-sheet>
            </v-col>
        </v-row>
      </v-sheet>
      <v-divider/>
<!-- accept -->
      <v-row no-gutters justify="end">
        <v-btn
            :loading="loading1"
            @click="acceptStatus()"
            height="40"
            rounded
            class="bg-primary500 px-8 mt-1 ">
          تایید
        </v-btn>
    </v-row>
    </v-card>

<!-- comment and reply -->
    <v-card class="mx-5 mt-3 px-5 py-2 rounded-t-0   scroller">
      <v-sheet class="d-flex flex-column mx-auto" width="60%">
<!-- comment -->
        <span class="ma-2 t16400 " >
          {{userComment?.user?.first_name}} {{userComment?.user?.last_name}}
        </span>
        <v-sheet  variant="solo-inverted" min-height="120" color="gray" class="pa-3 br-12 t14500 text-gray500">
          {{userComment?.comment }}
        </v-sheet>
        <span class="text-end number-font ma-2 ">
          {{userComment?.created_at_fa }}
        </span>

<!-- reply -->
        <v-sheet class="mt-n3" v-if="userComment?.status === 'approved' ">
          <div class="ma-2">
            پاسخ
          </div>
          <v-textarea :rows="3" variant="outlined" v-model="adminReply">
          </v-textarea>
        </v-sheet>
      </v-sheet>

      <!-- btns -->
      <v-divider/>
      <v-card-actions>
        <v-row justify="space-between" no-gutters>
          <v-btn
              @click="$router.go(-1)"
              variant="outlined"
              height="40"
              rounded
              class="px-8 mt-1 mr-5">
            بازگشت
          </v-btn>
          <v-btn
              :loading="loading2"
              @click="confirmReply()"
              height="40"
              rounded
              :disabled= " !adminReply "
              :class= "[ adminReply !== null  ? 'bg-primary500' : 'bg-grey', 'px-8','mt-1']"
              >
              ثبت پاسخ
          </v-btn>
<!---->
        </v-row>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script >
import commentsComposable from '@/composables/Comments';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  data() {
    return {
      adminReply: null,
      loading1: false,
      loading2: false,
      updatedStatus: null,
      selectStatus : [
        {
          label: 'تایید شده',
          value: 'approved'
        },
        {
          label: 'رد شده',
          value: 'rejected'
        },
        {
          label: 'در انتظار',
          value: 'waiting'
        }
      ]
    }
  },

  setup(){
    const {userComment, getComment} = commentsComposable();
    return{ userComment, getComment}
  },

  methods:  {

    colorStatus() {
      if (this.updatedStatus === 'waiting') return '#FFF3E0'
      else if (this.updatedStatus === 'rejected') return '#FFEBEE'
      else if (this.updatedStatus === 'approved') return '#E8F5E9'
    },

    async acceptStatus(){
      this.loading1 = true
      const AxiosMethod = new AxiosCall()
      let formData = new FormData();
      AxiosMethod.form = formData
      formData.append('status', this.updatedStatus)
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/comment/crud/update/status/`  + this.$route.params.id
      let res = await AxiosMethod.axios_post()
      if (res) {
        this.getComment()
        this.loading1=false
        openToast(
            this.$store,
            'وضعیت کامنت با موفقیت تغییر کرد ',
            "success")
      }
      else{
        this.loading1=false
        openToast(
            this.store,
            'انجام عملیات با مشکل مواجه شذ ',
            "error"
        );
      }
    },

    async confirmReply() {
      this.loading2 = true
      const AxiosMethod = new AxiosCall()
      let formData = new FormData();
      AxiosMethod.form = formData
      formData.append('comment', this.adminReply)
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/comment/crud/create/`  + this.$route.params.id
      let res = await AxiosMethod.axios_post()
      if (res) {
        this.loading2=false
        openToast(
            this.$store,
            'پاسخ شما ثبت شد',
            "success")
        }
      else{
        this.loading2=false
        openToast(
            this.store,
            'انجام عملیات با مشکل مواجه شذ ',
            "error"
        );

      }
    },
  },

  mounted() {
    this.getComment()
  },

  watch:{
    userComment(newVal){
      if(newVal && newVal !== null){
        this.updatedStatus = newVal?.status
        console.log('newVal?.status',newVal?.status)
      }
    }
  }
}

</script>
