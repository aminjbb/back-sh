<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <div class="text-center py-5 t16">
            ویرایش مودال
            {{detailFirstTimeUser.name}}
          </div>
          <v-divider/>
          <v-form
              ref="form"
              class="create-product__info-form scroller"
              v-model="valid">
            <v-row justify="start" align="center">
              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">عنوان مودال</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    v-model="form.name"
                    variant="outlined"
                    :rules="titleRule"
                    rounded="lg"/>
              </v-col>

              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">کد تخفیف نظیر به نظیر</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-autocomplete
                    v-model="form.voucher_id"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="voucherList"
                    :rules="DiscountCodeRule"
                    item-title="name"
                    item-value="id"
                    v-debounce="searchVoucher"/>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">توضیحات</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    v-model="form.content"
                    placeholder="توضیحات را وارد نمایید"
                    :rules="contentRule"
                    density="compact"
                    variant="outlined"
                    single-line/>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">تصویر</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>
                <UploadFileSection @getImage="getImage"/>
                <div class="d-flex align-center mt-5" v-if="form.image">
                  <span>IMG-{{ form.image }}</span>
                  <span class="mr-15">
                <v-icon
                    @click="removeItem(form.image)"
                    icon="mdi-delete"
                    color="error"/>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-form>

          <footer class="create-warehouse__actions">
            <v-row justify="end" class="pl-10 pt-5">
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                تایید
              </v-btn>
            </v-row>
          </footer>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>


<script>
import {defineAsyncComponent} from "vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import FirstTimeUser from "@/composables/FirstTimeUser";
import {AxiosCall} from "@/assets/js/axios_call";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const UploadFileSection = defineAsyncComponent(() => import('@/components/Public/UploadFileSection.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Components/Modal/Modal.vue'))

export default {
  name: "FirstTimeUserEdit",

  components: {
    Modal,
    DashboardLayout,
    Header,
    UploadFileSection
  },

  setup(){
    const { getDetailFirstTimeUser, detailFirstTimeUser } = FirstTimeUser()

    return { getDetailFirstTimeUser, detailFirstTimeUser }
  },

  data() {
    return {
      valid: false,
      loading: false,
      imageId:null,

      titleRule: [v => !!v || 'کاربر عزیز عنوان مودال نمیتواند خالی باشد'],
      contentRule: [v => !!v || 'این فیلد الزامی است'],
      DiscountCodeRule: [v => !!v || 'کاربر عزیز کد تخفیف گروهی انتخاب نکردین'],

      vouchersList: [],
      form:{
        name:'',
        voucher_id:'',
        voucher_name:'',
        content:'',
        image:''
      },
    }
  },

  mounted() {
    this.getDetailFirstTimeUser()
  },

  computed: {
    confirmModal(){
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    voucherList() {
      try {
        let voucher = []
        this.vouchersList.forEach(item => {
          const form = {
            name: item.name + '(' + item.id + ')',
            id: item.id,
          }
          voucher.push(form)
        })
        return voucher
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    getImage(image) {
      this.form.image = image.data.data.image_id
    },

    removeItem(id) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },

    async searchVoucher(e) {
      const filter = {
        per_page: 10,
        name: e,
        is_active: 1,
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = 'page/modal/vouchers/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.vouchersList = data.data.data
      }
    },

    async searchVoucherWithCode(e) {
      const filter = {
        per_page: 10,
        code: e,
        is_active: 1,
      }
      console.log(filter.name, 'id')
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.form = filter
      AxiosMethod.end_point = 'page/modal/vouchers/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.vouchersList = data.data.data
      }
    },

    validate() {
      if (!this.form.image) {
        openToast(this.$store, 'حتما باید عکس اضافه کنید', 'error');
        return;
      }
      this.$refs.form.validate();

      if (!this.valid) {
        return;
      }

      this.$refs.form.validate();

      if (this.valid) {
        this.updateFirstTimeUserModal();
      }
    },

    async updateFirstTimeUserModal() {
      this.loading = true
      let formData = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/modal/crud/update/${this.$route.params.id}`
      formData.append('name', this.form.name)
      formData.append('voucher_id', this.form.voucher_id)
      formData.append('content', this.form.content)
      formData.append('image_id', this.form.image)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        openToast(this.$store, 'مودال با موفقیت ویرایش شد.', "success")
        this.$router.push('/first-time-user/index')

      } else {
        this.loading = false
      }
    },

    closeModal(){
      this.$refs.modal.dialog = false
    },

    setForm() {
      try {
        this.form.name = this.detailFirstTimeUser.name
        this.form.voucher_id = this.detailFirstTimeUser.voucher_id
        this.searchVoucherWithCode(this.detailFirstTimeUser.voucher_code)
        this.form.content = this.detailFirstTimeUser.content
        this.form.image = this.detailFirstTimeUser.image_id
      } catch (e) {}
    }
  },

  watch: {
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.form.image = ''
          localStorage.removeItem('deleteObject')
        }
      }
    },

    detailFirstTimeUser:{
      handler(newData) {
        if (newData) {
          this.setForm()
        }
      },
      immediate: true
    }
  }
}
</script>