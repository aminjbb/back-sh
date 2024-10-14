<template>
  <div class="ticket-single h-100 d-flex flex-column align-stretch">
    <v-row class="pa-2 stretch-table">
      <v-col class="ticket-single__sidebar" md="3">
        <div class="bg-indigo-lighten-5 pa-8 h-100 rounded-lg">
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
            <div class="mt-2">
              <v-btn @click="redirect()" variant="text">
                <span class="number-font">{{ oneTicket.user.phone_number }}</span>
              </v-btn>
            </div>
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
          <v-card
              v-if="oneTicket && oneTicket.content"
              min-height="100"
              class="mb-10 rounded-lg px-2">
            <div class="d-flex justify-space-between pa-6">
                <span v-if="oneTicket.user" class="t12 w400 text-gray600 mrl10">
                    <template v-if="oneTicket.user.first_name">
                      <v-icon icon="mdi-account-outline"/>
                      {{ oneTicket.user.first_name }} {{ oneTicket.user.last_name }}
                    </template>
                    <template v-else>بدون نام</template>
                  </span>
              <span
                  v-if="oneTicket.created_at"
                  class="t12 w400 text-gray600 mr-10 number-font">
                  {{ convertDate(oneTicket.created_at) }}
                </span>
            </div>

            <v-divider/>

            <div v-if="oneTicket && oneTicket.files" min-height="100" class="mb-10">
              <div class="d-flex justify-space-between pa-6" v-for="file in oneTicket.files" :key="file.id">
                <img width="600" height="600" v-if="file.type === 'image'" :src="file.url" alt="image"/>
                <video v-else-if="file.type === 'video'" :src="file.url" controls/>
              </div>

              <v-divider color="black"/>

              <div
                  v-if="oneTicket && oneTicket.files"
                  min-height="100"
                  class="mb-10">
                <v-divider color="black"/>

                <p class="t14 text-justify pa-5" v-html="oneTicket.content"/>
              </div>

              <template v-if="oneTicket && oneTicket.threads">
                <div
                    v-for="ticket in oneTicket.threads"
                    :key="ticket.creator === 'user' ? `userMessage${ticket.id}` : `adminMessage${ticket.id}`">
                  <v-card
                      min-height="100"
                      class="mb-10"
                      :color="ticket.creator === 'admin' ? 'grey-lighten-3' : ''">
                    <div class="d-flex justify-space-between pa-6">
                      <div class="">
                        <v-icon icon="mdi-face-agent"/>
                        <span class="t14 w500 text-gray500 ml-10 mr-1">{{ticket.threadable.first_name }} {{ ticket.threadable.last_name }}</span>
                      </div>

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

              </template>

            </div>

            <div>
              <div class="text-right mb-3 text-gray600 t12 w400">ارسال پیام</div>

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
            </div>

            <div class="mt-2 py-2">
              <div class="text-right">
                <span class="text-right text-gray600 mb-5 t12 w400">برچسب</span>
              </div>
              <div class="position position__relative">
                <v-combobox
                    @keyup.enter="attachTageEnter()"
                    v-model="form.tag"
                    v-model:search.sync="search"
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
                    v-for="(label, index) in oneTicket.tags.slice(0,7)"
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
                    v-if="oneTicket.tags.length >= 8"
                    class="text-primary500 t14 w400 cursor-pointer"
                    @click="openModalTage()">
                  <span class="cursor-pointer"> مشاهده بیشتر</span>
                </v-btn>
              </div>
            </div>

            <v-divider/>

            <div class="d-flex justify-between align-center ma-3">
              <v-btn
                  :loading="loading"
                  variant="outlined"
                  @click="$router.push(`/ticket/index`)"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                بازگشت
              </v-btn>
              <v-btn
                  :loading="sendMsgLoading"
                  :disabled="ticketStatus === 'resolved'"
                  @click="sendMessage()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8">
                ارسال
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
      <Modal
          ref="rateModal"
          :title="`امتیاز کاربر به پشتیبانی`"
          :ticket="selectedTicket"
          :has-close="true"
          @closeAction="closeModal"
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
    tagLoading: false,
    sendMsgLoading: false,
    statusModel: '',
    editorConfig: {
      language: 'en',
      contentsLangDirection: 'rtl',
    },
    isSwitchActive: false,
    description: null,
    selectedTicket: null,
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
    },

    search() {
      this.$forceUpdate
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
    async  attachTageEnter(){
      const exists = this.tages.find(label =>label.title === this.form.tag[0])
      if (!exists) {
        this.tagLoading = true;
        const AxiosMethod = new AxiosCall();
        AxiosMethod.end_point = `system/admin/tag/crud/store?title=${this.form.tag[0]}`
        AxiosMethod.store = this.$store;
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken')

        let data = await AxiosMethod.axios_post();
        if (data) {
          this.attachTage(this.$route.params.ticketId ,data?.data?.id )
          openToast(this.$store, data.message, "success")
          this.form.tag = []
          await this.getTages()
          this.search = null
        }
        this.tagLoading = false;
      }
    },
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
        this.tagLoading = false;

        openToast(this.$store, data.message, "success")
        await this.getTicket()
        setTimeout(()=>{
          this.form.tag = []
          this.search = null
        }, 2000)

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
       this.tages.forEach((element)=>{

       })
     }
    },

    openModalTage() {
      this.$refs.readMoreTagModal.dialog = true
    },

    closeModalTag() {
      this.$refs.readMoreTagModal.dialog = false
    },

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
    this.getTages()
    this.getTicket();
    setTimeout(() => {
      this.load = true
    }, 500)
  },
}
</script>
