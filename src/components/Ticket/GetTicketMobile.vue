<template>
  <div class="h-100 d-flex flex-column align-stretch scroller">
    <div class="d-flex justify-end mx-2">
      <v-btn
          :loading="loading"
          variant="outlined"
          @click="$router.push(`/ticket/index`)"
          height="40"
          rounded
          class="px-8 mt-1 w-50">
        بازگشت
      </v-btn>
    </div>

    <v-row class="pa-2">
      <v-col class="ticket-single__sidebar" md="3">
        <div class="bg-indigo-lighten-5 pa-8 h-100">
          <div class="d-flex justify-space-between align-center">
            <div
                v-if="ticketStatus === 'pending' || ticketStatus === 'open'"
                class="d-flex align-center ga-3">
              <span class="title t12 w400">وضعیت در حال بررسی شود </span>
              <v-switch v-model="isSwitchActive"  inset color="success"/>
            </div>
            <v-chip
                class="ma-2 rounded-lg t10 w400"
                :color="getStatusColor(ticketStatus)"
                text-color="white">
              {{getStatusText(ticketStatus)}}
            </v-chip>
          </div>

          <div class="d-flex justify-space-between align-center">
            <div v-if="oneTicket && oneTicket.priority" class="d-flex align-center ticket-single__sidebar__item">
              <span class="title t12 w400">اولویت : </span>
              <div class="pr-2 t12 w400">{{ getPriorityText(oneTicket.priority) }}</div>
            </div>
            <div v-if="oneTicket && oneTicket.created_at" class="d-flex justify-space-between align-center ticket-single__sidebar__item">
              <span class="title t12 w400"> تاریخ ساخت : </span>
              <div class="pr-2 number-font t12 w400">{{ convertDate(oneTicket.created_at) }}</div>
            </div>
          </div>

          <div class="d-flex justify-space-between align-center">
            <div v-if="oneTicket && oneTicket.user" class="d-flex align-center ticket-single__sidebar__item">
              <span class="title t12 w400"> کاربر :</span>
              <div class="pr-2 t12 w400">
                <template v-if="oneTicket.user.first_name">
                  {{ oneTicket.user.first_name }} {{ oneTicket.user.last_name }}
                </template>
                <template v-else>
                  بدون نام
                </template>
              </div>
            </div>

            <div v-if="oneTicket && oneTicket.user" class="ticket-single__sidebar__item">
              <span class="title t12 w400"> موبایل :</span>
              <v-btn @click="redirect()" variant="text" >
                  <span class="number-font t12 w400">
                      {{ oneTicket.user.phone_number }}
                  </span>
              </v-btn>
            </div>
          </div>

          <v-btn
              :loading="loading"
              @click="updateTicket()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1 w-100">
            ثبت
          </v-btn>
        </div>
      </v-col>

      <v-col md="9" class="vh-100">
        <div class="">
          <div class="pl-6">
            <v-card
                v-if="oneTicket && oneTicket.content"
                min-height="100"
                class="mb-10">
              <div class="d-flex justify-space-between pa-6">
                  <span v-if="oneTicket.user" class="t14 w500 text-gray500 mrl10">
                    <template v-if="oneTicket.user.first_name">
                      {{ oneTicket.user.first_name }} {{ oneTicket.user.last_name }}
                    </template>
                    <template v-else>بدون نام</template>
                  </span>
                <span v-if="oneTicket.created_at" class="t14 w500 text-gray500 mr-10 number-font">
                      {{ convertDate(oneTicket.created_at) }}
                  </span>
              </div>

              <v-divider color="black"/>

              <p class="t14 text-justify pa-5" v-html="oneTicket.content"/>
            </v-card>

            <v-card
                v-if="oneTicket && oneTicket.files"
                min-height="100"
                class="mb-10">
              <div class="d-flex justify-space-between pa-6" v-for="file in oneTicket.files" :key="file.id">
                <img width="600" height="600" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                <video v-else-if="file.type === 'video'" :src="file.url" controls/>
              </div>
              <v-divider color="black"/>

              <p class="t14 text-justify pa-5" v-html="oneTicket.content"/>
            </v-card>


            <template v-if="oneTicket && oneTicket.threads">
              <div v-for="ticket in oneTicket.threads"
                   :key="ticket.creator === 'user' ? `userMessage${ticket.id}` : `adminMessage${ticket.id}`">
                <v-card
                    min-height="100"
                    class="mb-10"
                    :color="ticket.creator === 'admin' ? 'grey-lighten-3' : ''">
                  <div class="d-flex justify-space-between pa-6">
                    <span class="t14 w500 text-gray500 ml-10">
                      {{ ticket.threadable.first_name }} {{ ticket.threadable.last_name }}
                    </span>

                    <span class="t14 w500 text-gray500 mr-10 number-font">
                      {{ convertDate(ticket.created_at) }}
                    </span>
                  </div>

                  <v-divider color="black"/>

                  <div class="d-flex justify-space-between pa-6" v-for="file in ticket.files" :key="file.id">
                    <img width="600" height="600" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                    <video v-else-if="file.type === 'video'" :src="file.url" controls/>
                  </div>

                  <p class="t14 text-justify pa-5" v-html="ticket.content"/>
                </v-card>
              </div>
            </template>

            <div>
              <div class="text-right mb-3 t14 w500">ارسال پیام</div>

              <ckeditor
                  v-model="content"
                  :config="editorConfig"
                  class="cke_rtl mb-15"/>

              <v-btn
                  :loading="sendMsgLoading"
                  @click="sendMessage()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                ارسال پیام
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

import Ticket from '@/composables/Ticket'
import {gregorian_to_jalali} from "@/assets/js/functions";
import {component as ckeditor} from '@mayasabha/ckeditor4-vue3'

export default {
  setup() {

    const {
      getTicket,
      oneTicket
    } = new Ticket()
    return {
      getTicket,
      oneTicket
    }
  },

  components: {
    ckeditor
  },

  data: () => ({
    content: null,
    loading: false,
    sendMsgLoading: false,
    statusModel: '',
    editorConfig: {
      language: 'en',
      contentsLangDirection: 'rtl',
    },
    isSwitchActive: false
  }),

  watch: {
    oneTicket(newVal) {
      if (newVal.status === 'pending') {
        this.statusModel = 'pending'
        this.isSwitchActive = true
      }
      else {
        this.statusModel = 'open'
        this.isSwitchActive =false
      }
    },

    isSwitchActive(newVal) {
      if (newVal) {
        this.statusModel = 'pending'
      }
      else {
        this.statusModel = 'open'
      }
    }
  },

  computed: {
    /**
     * Get ticket status
     */
    ticketStatus() {
      try {
        const status = this.oneTicket && this.oneTicket.status ? this.oneTicket.status : '';
        this.statusModel = status;
        return status
      } catch (e) {
        return e
      }
    },
  },

  methods: {
    getStatusColor(status) {
      const color = '';

      if (status == 'open') {
        return 'blue';
      }
      if (status == 'answered') {
        return 'green';
      }
      if (status == 'resolved') {
        return 'grey-lighten-1';
      }
      if (status == 'pending') {
        return 'warning';
      }

      return '';
    },

    /**
     * Update ticket
     */
    async updateTicket() {
      try {
        this.loading = true;
        var formdata = new FormData();

        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `ticket/admin/crud/update/status/${this.$route.params.ticketId}`

        AxiosMethod.form = formdata
        formdata.append('status', this.statusModel)

        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false;
          openToast(
              this.$store,
              'تیکت با موفقیت ویرایش شد',
              "success"
          );
          this.getTicket();

        } else {
          this.loading = false;

          openToast(
              this.$store,
              'درخواست شما با مشکل مواجه شد',
              "error"
          );
        }
      } catch (e) {
        this.loading = false;
      }
    },

    /**
     * Convert date
     * @param {*} dateTime
     */
    convertDate(dateTime) {
      try {
        const date = dateTime.split('T')
        const splitDate = date[0].split('-')
        return gregorian_to_jalali(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
      } catch (e) {
        return e
      }
    },

    /**
     * Send message
     */
    async sendMessage() {
      this.sendMsgLoading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `ticket/admin/crud/update/threads/${this.$route.params.ticketId}`

      formData.append('content', this.content)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.sendMsgLoading = false
        this.content = null
        this.getTicket()
      } else {
        this.sendMsgLoading = false
      }
    },

    /**
     * Get status text
     */
    getStatusText(status) {
      const text = '';

      if (status == 'open') {
        return 'باز';
      }
      if (status == 'answered') {
        return 'پاسخ داده شده';
      }
      if (status == 'resolved') {
        return 'بسته شده';
      }
      if (status == 'postponed') {
        return 'متوقف شده';
      }
      if (status == 'seen') {
        return 'دیده شده';
      }

      return 'نامعلوم';
    },

    /**
     * Get priority text
     */
    getPriorityText(priority) {
      const text = '';

      if (priority == 'urgent') {
        return 'ضروری';
      }
      if (priority == 'low') {
        return 'پایین';
      }
      if (priority == 'high') {
        return 'بالا';
      }
      if (priority == 'medium') {
        return 'متوسط';
      }

      return 'معمولی';
    },

    redirect() {
      window.open(`${import.meta.env.VITE_API_SITEURL}orders/index?user_id=${this.oneTicket.user.id}`, '_blank');

    }
  },

  mounted() {
    this.getTicket();
  },
}
</script>
