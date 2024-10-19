<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh scroller">
      <Header/>
      <div class="">
        <v-card class="mx-5 my-3 rounded-lg">
          <div class="t14 w500 text-center py-3">اطلاعات کالا</div>
          <v-divider/>

          <v-row justify="center" align="center" class="px-10 py-7">
            <v-col cols="8">
              <span class="t12 w500"> نام کالا : </span>
              <span class="t12 w500 text-gray500">{{userFakeComment?.sku?.label}}</span>
            </v-col>

            <v-col cols="4" class="d-flex align-center">
              <span class="t12 w500"> امتیاز : </span>
              <v-rating
                  v-model="userFakeComment.score"
                  half-increments
                  readonly
                  class="me-3"
                  style="direction: ltr!important;">
                <template v-slot:item="props">
                  <v-icon
                      size="large"
                      :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                    mdi-star
                  </v-icon>
                </template>
              </v-rating>
            </v-col>

            <v-col cols="4">
              <span class="t12 w500">  SKU شناسه : </span>
              <span class="t12 w500 text-gray500 number-font">{{userFakeComment?.sku_id}}</span>
            </v-col>

            <v-col cols="4">
              <span class="t12 w500">  برند : </span>
              <span class="t12 w500 text-gray500">{{userFakeComment?.sku?.brand?.label}}</span>
            </v-col>

            <v-col cols="4" class="d-flex align-center">
              <span class="t12 w500">  وضعیت : </span>
              <v-sheet width="144" class="ms-2 t12 w500">
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

          <v-divider/>
          <!-- accept -->
          <v-row no-gutters justify="end">
            <v-btn
                :loading="loading"
                @click="acceptStatus()"
                height="40"
                rounded
                class="bg-primary500 mx-8 px-8 my-3">
              تایید
            </v-btn>
          </v-row>
        </v-card>

        <!-- fake comment and reply -->
        <v-card class="mx-5 mb-2 mt-3 py-2 rounded-lg">
          <v-sheet class="d-flex flex-column mx-auto" width="60%">
            <span class="ma-2 text-left t14 w400 text-gray600">
              {{userFakeComment?.user?.first_name}} {{userFakeComment?.user?.last_name}}
            </span>
            <v-sheet
                variant="solo-inverted"
                min-height="120"
                color="gray"
                class="pa-3 br--12 t14 w500 text-gray500">
              {{userFakeComment?.comment }}
            </v-sheet>
            <span class="text-end t14 w400 text-gray500 number-font ma-1">{{userFakeComment?.created_at_fa}}</span>

            <!-- reply -->
            <v-sheet class="mt-n3" v-if="userFakeComment?.status === 'approved'">
              <div class="ma-2 t14 w500 text-gray600">پاسخ</div>
              <v-textarea :rows="3" variant="outlined" v-model="adminReply" />
            </v-sheet>
          </v-sheet>

          <v-divider/>
          <v-card-actions>
            <v-row justify="space-between" class="px-8">
              <v-btn
                  @click="$router.go(-1)"
                  variant="outlined"
                  height="40"
                  rounded
                  class="px-8 mt-1 mr-5">
                بازگشت
              </v-btn>
              <v-btn
                  :loading="confirmedLoading"
                  @click="confirmReply()"
                  height="40"
                  rounded
                  :disabled= "!adminReply"
                  :class= "[ adminReply !== null  ? 'bg-primary500' : 'bg-grey', 'px-8','mt-1']">
                ثبت پاسخ
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
import commentsComposable from '@/composables/Comments';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {
  components: {
    Header,
    DashboardLayout
  },

  data() {
    return {
      adminReply: null,
      loading: false,
      confirmedLoading: false,
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
    const {getFakeComment, userFakeComment} = commentsComposable();
    return {getFakeComment, userFakeComment}
  },

  methods:  {
    colorStatus() {
      if (this.updatedStatus === 'waiting') return '#FFF3E0'
      else if (this.updatedStatus === 'rejected') return '#FFEBEE'
      else if (this.updatedStatus === 'approved') return '#E8F5E9'
    },

    async acceptStatus(){
      this.loading = true
      const AxiosMethod = new AxiosCall()
      let formData = new FormData();
      AxiosMethod.form = formData
      formData.append('status', this.updatedStatus)
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/comment/crud/fake/update/status/`  + this.$route.params.id
      let res = await AxiosMethod.axios_post()
      if (res) {
       await this.getFakeComment()
        this.loading=false
        openToast(this.$store, 'وضعیت کامنت با موفقیت تغییر کرد ', "success")
      }
      else{
        this.loading=false
        openToast(this.store, 'انجام عملیات با مشکل مواجه شد ', "error")
      }
    },

    async confirmReply() {
      this.confirmedLoading = true
      const AxiosMethod = new AxiosCall()
      let formData = new FormData();
      AxiosMethod.form = formData
      formData.append('comment', this.adminReply)
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/comment/crud/fake/create/answer/`  + this.$route.params.id
      let res = await AxiosMethod.axios_post()
      if (res) {
        this.confirmedLoading=false
        openToast(this.$store, 'پاسخ شما ثبت شد', "success")
      }
      else{
        this.confirmedLoading=false
        openToast(this.store, 'انجام عملیات با مشکل مواجه شد ', "error")

      }
    },
  },

  mounted() {
    this.getFakeComment()
  },

  watch:{
    userFakeComment(newVal){
      if(newVal && newVal !== null){
        this.updatedStatus = newVal?.status
      }
    }
  }
}
</script >