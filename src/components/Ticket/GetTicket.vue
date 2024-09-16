<template>
  <div class="ticket-single h-100 d-flex flex-column align-stretch">
    <v-row class="pa-2 stretch-table">
      <v-col class="ticket-single__sidebar" md="3">
        <div class="bg-indigo-lighten-5 pa-8 h-100">
          <div class="ticket-single__sidebar__item">
            <span class="title">وضعیت : </span>
            <div class="pr-2 mt-2">{{ getStatusText(ticketStatus) }}</div>
          </div>

          <div v-if="ticketStatus === 'pending' || ticketStatus === 'open'"
               class="ticket-single__sidebar__item d-flex align-center ga-3">
            <span class="title">وضعیت در حال بررسی شود </span>
            <v-switch v-model="isSwitchActive" inset color="success"/>
          </div>

          <div v-if="oneTicket && oneTicket.priority" class="ticket-single__sidebar__item">
            <span class="title">اولویت : </span>
            <div class="pr-2 mt-2">{{ getPriorityText(oneTicket.priority) }}</div>
          </div>

          <div v-if="oneTicket && oneTicket.created_at" class="ticket-single__sidebar__item">
            <span class="title"> تاریخ ساخت : </span>
            <div class="pr-2 mt-2 number-font">{{ convertDate(oneTicket.created_at) }}</div>
          </div>

          <div v-if="oneTicket && oneTicket.user" class="ticket-single__sidebar__item">
            <span class="title"> کاربر :</span>
            <div class="pr-2 mt-2">
              <template v-if="oneTicket.user.first_name">
                {{ oneTicket.user.first_name }} {{ oneTicket.user.last_name }}
              </template>
              <template v-else>
                بدون نام
              </template>
            </div>
          </div>

          <div v-if="oneTicket && oneTicket.user" class="ticket-single__sidebar__item">
            <span class="title"> موبایل :</span>
            <v-btn @click="redirect()" variant="text">
              <span class="number-font">{{ oneTicket.user.phone_number }}</span>
            </v-btn>
          </div>

          <div v-if="oneTicket && oneTicket.order_number" class="ticket-single__sidebar__item">
            <span class="title">شماره سفارش</span>
            <div class="pr-2 mt-2 number-font">
              {{ oneTicket.order_number }}
            </div>
          </div>

          <div v-if="oneTicket && oneTicket.seller_sku_id" class="ticket-single__sidebar__item">
            <span class="title">شناسه کالا</span>
            <div class="pr-2 mt-2 number-font">
              {{ oneTicket.seller_sku_id }}
            </div>
          </div>

          <v-btn
              :loading="loading"
              @click="updateTicket()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1 w-50">
            ثبت
          </v-btn>
        </div>
      </v-col>

      <v-col md="9" class="h-100vh">
        <div class="stretch-table">
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
                <span v-if="oneTicket.created_at"
                      class="t14 w500 text-gray500 mr-10 number-font">{{ convertDate(oneTicket.created_at) }}</span>
              </div>

              <v-card v-if="oneTicket && oneTicket.files" min-height="100" class="mb-10">
                <div class="d-flex justify-space-between pa-6" v-for="file in oneTicket.files" :key="file.id">
                  <img width="600" height="600" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                  <video v-else-if="file.type === 'video'" :src="file.url" controls/>
                </div>

                <v-divider color="black"/>

                <v-card
                    v-if="oneTicket && oneTicket.files"
                    min-height="100"
                    class="mb-10">
                  <v-divider color="black"/>

                  <p class="t14 text-justify pa-5" v-html="oneTicket.content"/>
                </v-card>

                <template v-if="oneTicket && oneTicket.threads">
                  <div
                      v-for="ticket in oneTicket.threads"
                      :key="ticket.creator === 'user' ? `userMessage${ticket.id}` : `adminMessage${ticket.id}`">
                    <v-card
                        min-height="100"
                        class="mb-10"
                        :color="ticket.creator === 'admin' ? 'grey-lighten-3' : ''">
                      <div class="d-flex justify-space-between pa-6">
                        <span class="t14 w500 text-gray500 ml-10">{{ticket.threadable.first_name }}{{ ticket.threadable.last_name }}</span>
                        <div class="">
                          <span class="t14 w500 text-gray500 mr-10 number-font">
                            {{convertDate(ticket.created_at)}}
                          </span>
                          <span>
                             <v-icon
                                 v-if="ticket.creator === 'admin'"
                                 @click="openModal(ticket)"
                                 color="primary500"
                                 icon="mdi-eye-outline"
                                 size="18.33"
                                 class="mr-2"/>
                          </span>
                        </div>
                      </div>

                      <v-divider color="black"/>

                      <div class="d-flex justify-space-between pa-6" v-for="file in ticket.files" :key="file.id">
                        <img width="600" height="600" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                        <video v-else-if="file.type === 'video'" :src="file.url" controls/>
                      </div>

                      <p class="t14text-justify pa-5" v-html="ticket.content"/>
                    </v-card>
                  </div>

                  <Modal
                      ref="rateModal"
                      :ticket="selectedTicket"
                      @successAction="closeModal()"
                      @cancelAction="closeModal">
                    <template v-slot:modalBody="item">
                     <div class="d-flex align-center justify-between d--rtl">
                       <div class="d-flex align-center ga-2">
                         <div class="t12 text-gray600">نام کاربر</div>
                         <div class="t14"> {{ oneTicket.user.first_name }} {{ oneTicket.user.last_name }}</div>
                       </div>

                       <div class="d-flex align-center ga-2">
                         <div class="t12 text-gray600">نام پشتیبان</div>
                         <div class="t14"> {{selectedTicket.threadable.full_name}}</div>
                       </div>

                       <div class="d-flex align-center ga-2">
                         <div class="t12 text-gray600">امتیاز</div>
                         <v-rating
                             v-model="selectedTicket.rate"
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
                       </div>
                     </div>
                      <div class="text-right mt-5 mb-2">
                        <span class="t12 text-gray600">توضیحات</span>
                      </div>
                      <v-textarea
                          readonly
                          max-rows="3"
                          density="compact"
                          variant="outlined"
                          v-model="selectedTicket.rate_note"/>
                    </template>
                  </Modal>
                </template>
                <div>
                  <div class="text-right mb-3 t14 w500">ارسال پیام</div>

                  <keep-alive>
                    <TinymceVue
                        ref="tinymceEditor"
                        @input="fillDescription"
                        v-if="load"
                        :value="content"
                        id="TinymceVue4"
                        class="mb-8"
                        :other_options="options">
                    </TinymceVue>
                  </keep-alive>
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
              </v-card>
            </v-card>
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
import TinymceVue from "@/components/Public/TinymceVue.vue";
import Modal from "@/components/Components/Modal/Modal.vue";

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
    Modal,
    TinymceVue
  },

  data: () => ({
    options: {
      height: 500,
    },
    load: false,
    content: null,
    loading: false,
    sendMsgLoading: false,
    statusModel: '',
    editorConfig: {
      language: 'en',
      contentsLangDirection: 'rtl',
    },
    isSwitchActive: false,
    description: null,
    selectedTicket: null
  }),

  watch: {
    oneTicket(newVal) {
      if (newVal.status === 'pending') {
        this.statusModel = 'pending'
        this.isSwitchActive = true
      } else {
        this.statusModel = 'open'
        this.isSwitchActive = false
      }
    },

    isSwitchActive(newVal) {
      if (newVal) {
        this.statusModel = 'pending'
      } else {
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
    openModal(ticket){
      this.selectedTicket = ticket
      this.$refs.rateModal.dialog = true
    },

    closeModal() {
      this.$refs.rateModal.dialog = false
    },

    fillDescription(e) {
      this.content = e
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
        this.$refs.tinymceEditor.editor.setContent('')
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
    setTimeout(() => {
      this.load = true
    }, 500)
  },
}
</script>
