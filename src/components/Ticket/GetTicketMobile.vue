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
              <span class="title t12 w400">وضعیت در حال بررسی شود</span>
              <v-switch v-model="isSwitchActive" inset color="success"/>
            </div>
            <v-chip
                class="ma-2 rounded-lg t10 w400"
                :color="getStatusColor(ticketStatus)"
                text-color="white">
              {{ getStatusText(ticketStatus) }}
            </v-chip>
          </div>

          <div class="d-flex justify-space-between align-center">
            <div
                v-if="oneTicket && oneTicket.priority"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
              <span class="title t12 w400">اولویت : </span>
              <div class="pr-2 t12 w400">{{ getPriorityText(oneTicket.priority) }}</div>
            </div>
            <div
                v-if="oneTicket && oneTicket.created_at"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
              <span class="title t12 w400"> تاریخ ساخت : </span>
              <div class="pr-2 number-font t12 w400">{{ convertDate(oneTicket.created_at) }}</div>
            </div>
          </div>

          <div class="d-flex justify-space-between align-center">
            <div
                v-if="oneTicket && oneTicket.user"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
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

            <div
                v-if="oneTicket && oneTicket.user"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
              <span class="title t12 w400"> موبایل :</span>
              <v-btn @click="redirect()" variant="text">
                  <span class="number-font t12 w400">
                      {{ oneTicket.user.phone_number }}
                  </span>
              </v-btn>
            </div>
          </div>

          <div class="d-flex justify-space-between align-center">
            <div
                v-if="oneTicket && oneTicket.order_number"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
              <div class="title t12 w400"> شماره سفارش :</div>
              <div class="pr-2 t12 w400 number-font">{{ oneTicket.order_number }}</div>
            </div>

            <div
                v-if="oneTicket && oneTicket.seller_sku_id"
                class="d-flex justify-start align-center ticket-single__sidebar__item">
              <v-icon icon="mdi-circle-small"/>
              <div class="title t12"> شناسه کالا :</div>
              <div class="number-font t12">{{ oneTicket.seller_sku_id }}</div>
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

      <v-col md="9" class="h-100vh">
        <div class="">
          <div class="">
            <v-card
                v-if="oneTicket && oneTicket.content"
                min-height="100"
                class="mb-10 rounded-e-xl rounded-b-xl">
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

              <div v-if="!oneTicket.files" >
                <p  class="t14 text-justify pa-5" v-html="oneTicket.content"/>
              </div>
              <div v-else-if="oneTicket && oneTicket.files">
                <div class="d-flex justify-center pa-6" v-for="file in oneTicket.files" :key="file.id">
                  <img width="200" height="200" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                  <video width="300" height="200" v-else-if="file.type === 'video'" :src="file.url" controls/>
                </div>
                <v-divider color="black"/>

                <p class="t14 text-justify pa-5" v-html="oneTicket.content"/>
              </div>
            </v-card>

            <template v-if="oneTicket && oneTicket.threads">
              <div v-for="ticket in oneTicket.threads"
                   :key="ticket.creator === 'user' ? `userMessage${ticket.id}` : `adminMessage${ticket.id}`">
                <v-card
                    min-height="100"
                    class="mb-10 rounded-s-xl rounded-t-xl"
                    :color="ticket.creator === 'admin' ? 'grey-lighten-3' : ''">
                  <div class="d-flex justify-space-between pa-6">
                    <span class="t14 w500 text-gray500 ml-10">
                      {{ ticket.threadable.first_name }} {{ ticket.threadable.last_name }}
                    </span>
                    <div class="d-flex align-center">
                      <span class="t14 w500 text-gray500 mr-10 number-font">
                      {{ convertDate(ticket.created_at) }}
                    </span>
                      <BottomSheetRateTicket
                          v-if="ticket.creator === 'admin'"
                          :item="ticket"
                          :userDetail="oneTicket.user"
                          :title="`امتیاز کاربر به پشتیبانی`"/>
                    </div>
                  </div>

                  <v-divider color="black"/>

                  <div class="d-flex justify-center pa-6" v-for="file in ticket.files" :key="file.id">
                    <img width="200" height="200" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                    <video width="300" height="200" v-else-if="file.type === 'video'" :src="file.url" controls/>
                  </div>

                  <p class="t14 text-justify pa-5" v-html="ticket.content"/>
                </v-card>
              </div>
            </template>

            <div>
              <div class="text-right mb-3 t14 w500">ارسال پیام</div>
              <keep-alive>
                <TinymceVue
                    ref="tinymceEditor"
                    @input="fillDescription"
                    v-if="load"
                    :value="content"
                    id="d2"
                    class="mb-8"
                    :other_options="options">
                </TinymceVue>
              </keep-alive>
            </div>

            <div class="mt-2 py-2">
              <div class="text-right">
                <span class="text-right text-gray600 mb-5 t12 w400">برچسب</span>
              </div>
              <div class="position position__relative">
                <v-combobox
                    v-model="form.tag"
                    v-model:search="search"
                    :hide-no-data="false"
                    :items="tagList"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker"
                    item-title="label"
                    item-value="id"
                    hide-selected
                    multiple
                    persistent-hint
                    small-chips>
                  <template v-slot:item="item">
                    <v-list-item>
                      <div @click="attachTage(oneTicket.id,item.item.raw.value)" class="d-flex justify-end align-center cursor-pointer">
                        <div class="text-gray500 t14 w300 text-right mt-4">{{item?.item?.raw?.label}}</div>
                        <v-checkbox :value="item.item.raw.value" class="mr-1" />
                      </div>
                    </v-list-item>
                  </template>
                  <template v-slot:prepend-inner>
                    <v-btn
                        :disabled="isDisable"
                        size="27"
                        rounded
                        flat
                        :color="isDisable? 'gray100' :'primary400'"
                        class="position__absolute top-0 left-0 mt-2 ml-2 d-flex justify-center items-center"
                        @click="createTage()">
                      <v-icon
                          icon="mdi-plus"
                          size="16"/>
                    </v-btn>
                  </template>
                </v-combobox>
              </div>

              <div v-if="oneTicket && oneTicket.tags" class="d-flex justify-start align-center ga-2 mt-2">
                <div
                    v-for="(label, index) in oneTicket.tags.slice(0,3)"
                    :key="index"
                    class="d-flex align-center bg-gray200 rounded-xl px-2">
                  <span class="t14 w400">{{ label.title }}</span>
                  <v-icon
                      class="mr-1 cursor-pointer"
                      color="gray500"
                      icon="mdi-close"
                      size="12"
                      @click="removeLabel(oneTicket.id,label.id)"/>
                </div>

                <v-btn
                    variant="text"
                    v-if="oneTicket.tags.length >= 3"
                    class="text-primary t14 w400 cursor-pointer"
                    @click="openModalTage()">
                  <span class="cursor-pointer"> مشاهده بیشتر</span>
                </v-btn>
              </div>
            </div>

            <div class="d-flex justify-center">
              <v-btn
                  :loading="sendMsgLoading"
                  @click="sendMessage()"
                  color="primary500"
                  height="40"
                  width="328"
                  rounded
                  class="px-8 mt-1 my-3">
                ارسال
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
      <Modal
          ref="readMoreTagModal"
          :title="`برچسب های تیکت`"
          :has-close="true"
          :width="468"
          @closeAction="closeModalTag"
      >
        <template v-slot:modalBody>
          <div class="d-flex flex-wrap justify-end align-center ga-2 mt-2">
            <div
                v-for="(tag, index) in oneTicket.tags"
                :key="index"
                class="bg-gray200 rounded-xl px-2">
              <v-icon
                  class="mr-1 cursor-pointer"
                  color="gray500"
                  icon="mdi-close"
                  size="12"
                  @click="removeLabel(oneTicket.id, tag.id)"/>
              <span class="t14 w400">{{ tag.title }}</span>
            </div>
          </div>
        </template>
      </Modal>
    </v-row>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openConfirm, openToast} from "@/assets/js/functions";

import Ticket from '@/composables/Ticket'
import {gregorian_to_jalali} from "@/assets/js/functions";
import TinymceVue from "@/components/Public/TinymceVue.vue";
import BottomSheetRateTicket from "@/components/BottomSheetRateTicket.vue";
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
    BottomSheetRateTicket,
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
    search: null,
    tages: [],
    form:{
      tag: null,
    }
  }),

  watch: {
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getTicket();
          openToast(this.$store, 'برچسب با موفقیت حذف شد', "success",);
          localStorage.removeItem('deleteObject')
        }
      }
    },

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
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

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

    tagList(){
      try {
        let label = []
        this.tages.forEach(item => {
          const form = {
            label: item.title,
            value: item.id
          }
          label.push(form)
        })
        return label
      } catch (e) {
        return []
      }
    },

    isDisable() {
      return (this.search === null || this.search ==='') || this.tagList.some((tag) => tag.label === this.search)
    }
  },

  methods: {
    async createTage() {
      if (this.search) {
        const exists = this.tages.find(label =>label.title === this.search)
        if (!exists) {
          this.tagLoading = true;
          const AxiosMethod = new AxiosCall();
          AxiosMethod.end_point = `system/admin/tag/crud/store?title=${this.search}`
          AxiosMethod.store = this.$store;
          AxiosMethod.using_auth = true;
          AxiosMethod.token = this.$cookies.get('adminToken')

          let data = await AxiosMethod.axios_post();
          if (data) {
            console.log(data)
            this.attachTage(this.$route.params.ticketId ,data?.data?.id )
            openToast(this.$store, data.message, "success")
            await this.getTages()
            this.form.tag = null
            this.search = null
          }
          this.tagLoading = false;
        }
      }
    },

    async attachTage(ticketId,tagId) {
      this.tagLoading = true;
      const AxiosMethod = new AxiosCall();
      AxiosMethod.end_point = `ticket/admin/${ticketId}/attach-tag?tag_id=${tagId}`
      AxiosMethod.store = this.$store;
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');

      let data = await AxiosMethod.axios_post();
      if (data) {
        openToast(this.$store, data.message, "success")
        await this.getTicket()
        this.tagLoading = false;
        this.form.tag = null
        this.search = null
      }
    },

    removeLabel(ticketId,tagId) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", `ticket/admin/${ticketId}/detach-tag?tag_id=${tagId}`, true)
    },

    async getTages(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/admin/tag/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.tages = data.data
      }
    },

    openModalTage() {
      this.$refs.readMoreTagModal.dialog = true
    },

    closeModalTag() {
      this.$refs.readMoreTagModal.dialog = false
    },

    fillDescription(e) {
      this.content = e
    },
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
      if (status == 'pending') {
        return 'در حال بررسی';
      }

      return 'نامعلوم';
    },

    /**
     * Get priority text
     */
    getPriorityText(priority) {
      const text = '';

      if (priority == 'urgent') {
        return 'فوری';
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
    this.getTages()
    this.getTicket();
    setTimeout(() => {
      this.load = true
    }, 500)
  },
}
</script>
