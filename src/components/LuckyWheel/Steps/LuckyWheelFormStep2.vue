<template>
  <div class="create-lucky-wheel__info-form scroller">
    <div class="text-center py-3 ">
      <span class="t14500">
        افزودن جایزه
      </span>
    </div>
    <v-divider/>
    <div >
      <v-form ref="LuckyWheelStep1Form" v-model="valid">
        <v-row justify="start" align="end" class="pa-5">
          <v-col cols="3">
            <div>
              <span>کد تخفیف </span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-autocomplete variant="outlined" v-model=" form.label" :rules="rule"/>
            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <span>نام جایزه</span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-text-field variant="outlined" v-model=" form.name" :rules="rule"/>
            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <span>لیبل جایزه</span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-text-field variant="outlined" v-model=" form.startDate" :rules="rule"/>

            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <span>میزان درصد شانس </span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-text-field class="input-end-date" variant="outlined" v-model=" form.endDate" :rules="rule"/>
            </div>
          </v-col>
          <v-col cols="3">
            <div>
              <span>مدت زمان استفاده ( ساعت ) </span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-text-field variant="outlined" v-model=" form.chance" :rules="rule"/>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <span>توضیحات </span>
              <span class="text-error">*</span>
            </div>
            <div class="mt-2">
              <v-text-field variant="outlined" v-model=" form.chance" :rules="rule"/>
            </div>
          </v-col>
          <v-col cols="10">
            <div class="text-right mb-3">
                  <span>
                   تصویر کد تخفیف
                  </span>
              <span class="text-error">*</span>
            </div>
            <UploadFileSection @getImage="getImage()"/>
            <div class="d-flex align-center mt-5" v-if="form.imageMobile">
              <span>IMG-{{ form.imageMobile }}</span>
              <span class="mr-15"><v-icon @click="removeItem(form.imageMobile , 'mobile')"
                                          color="error">mdi-delete</v-icon></span>
            </div>
          </v-col>
          <v-col cols="2">
            <v-btn
                @click="createPrize()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="prizesHeader"
            :items="[]"
            :page="1"
            :perPage="25"
            :loading="loading"
            deletePath="report/crud/delete/"
            model="report" />
      </v-card>
    </div>

  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {openConfirm} from "@/assets/js/functions";
import LuckyWheel from "@/composables/LuckyWheel";
const Table = defineAsyncComponent(()=> import('@/components/LuckyWheel/Table/PrizesTable.vue'))
const UploadFileSection = defineAsyncComponent(() => import('@/components/Public/UploadFileSection.vue'))
export default {
  setup() {

    const {
      pageLength,
      prizesHeader,
      loading
    } = LuckyWheel();
    return {
      pageLength,
      prizesHeader,
      loading,
    };
  },
  data() {
    return {
      imageId: null,
      valid: true,
      rule: [v => !!v || "این فیلد الزامی است"],
      form: {
        label: null,
        name: null,
        startDate: null,
        endDate: null,
        chance: null,
        image: null
      }
    }
  },
  components: {
    datePicker: VuePersianDatetimePicker,
    UploadFileSection,
    Table
  },
  methods: {
    getImage(image) {
      this.form.image = image.data.data.image_id
    },

    removeItem(id, status) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, false)
    },
    createPrize() {

    }
  }
}
</script>

<style>
.create-lucky-wheel__info-form {
  padding: 0;
  height: calc(100% - 85px);
}
</style>