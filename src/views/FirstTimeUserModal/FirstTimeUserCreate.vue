<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="create-product flex-column d-flex h-100vh">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="600">
          <div class="text-center py-5 t16">
            افزودن مودال
          </div>
          <v-divider/>
          <v-form
              class="create-product__info-form scroller"
              v-model="valid">
            <v-row justify="start" align="center">
              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">عنوان</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-text-field
                    v-model="form.title"
                    placeholder="عنوان مودال را وارد نمایید"
                    variant="outlined"
                    :rules="titleRule"
                    rounded="lg">

                </v-text-field>
              </v-col>

              <v-col cols="6">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">کد تخفیف نظیر به نظیر</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>

                <v-select
                    v-model="form.discountCode"
                    :rules="DiscountCodeRule"
                    variant="outlined"
                    rounded="lg">
                </v-select>
              </v-col>

              <v-col cols="12">
                <div class="text-right my-5">
                  <span class="t14 w500 text-gray600">توضیحات</span>
                  <span class="t14 w500 text-scanError">*</span>
                </div>
                <v-text-field
                    v-model="form.description"
                    placeholder="توضیحات را وارد نمایید"
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
                  <span>IMG- {{ form.image }}</span>
                  <span class="mr-15">
                <v-icon
                    @click="removeItem(form.image , 'mobile')"
                    color="error">mdi-delete</v-icon></span>
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
        <Modal
            ref="modal"
            :title="`تایید مودال`"
            :width="468"
            @successAction="createFirstTimeUserModal()"
            @cancelAction="closeModal()"
            @closeModal="closeModal()">
          <template v-slot:modalBody>
            <div class="text-center">کاربر عزیز مودال  عنوان مدال در وضعیت روشن می باشد در صورت تایید باعث غیر </div>
            <div class="text-center">
              فعال شدن مودال عنوان مدال  میشوید و مودال جدید وضعیت روشن میگردد
            </div>
          </template>

        </Modal>
      </div>
    </v-main>
  </v-layout>
</template>


<script>
import {defineAsyncComponent} from "vue";
import {openConfirm} from "@/assets/js/functions";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const UploadFileSection = defineAsyncComponent(() => import('@/components/Public/UploadFileSection.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Components/Modal/Modal.vue'))

export default {
  name: "FirstTimeUserCreate",

  components: {
    Modal,
    DashboardLayout,
    Header,
    UploadFileSection
  },

  data() {
    return {
      valid: false,
      titleRule: [v => !!v || 'کاربر عزیز عنوان مودال نمیتواند خالی باشد'],
      DiscountCodeRule: [v => !!v || 'کاربر عزیز کد تخفیف گروهی انتخاب نکردین'],

      form:{
        title:'',
        discountCode:'',
        description:'',
        image:''
      }
    }
  },

  methods: {
    getImage(image) {
      this.form.image = image.data.data.image_id
    },

    removeItem(id, status) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, false)
    },

    validate() {
      this.createFirstTimeUserModal.validate()
      setTimeout(()=>{
        if (this.valid) this.createFirstTimeUserModal()
      } , 200)

      // this.$refs.modal.dialog = true
    },

    createFirstTimeUserModal() {
      console.log('create')
    },

    closeModal(){
      this.$refs.modal.dialog = false
    }
  }
}
</script>

<style scoped>

</style>