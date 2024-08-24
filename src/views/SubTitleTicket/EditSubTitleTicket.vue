<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <v-card class="ma-5 br-12 pa-10 position__relative" height="650">
        <div class="text-center t14500 pb-5"> ویرایش موضوع</div>
        <v-divider/>
        <v-form ref="addForm" v-model="valid">
          <v-row class="mt-3" justify="space-between" align="center">
            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">عنوان موضوع</span>
                <span class="text-error mr-1">*</span>
              </div>
              <v-text-field
                  v-model="form.title"
                  density="compact"
                  variant="outlined"
                  single-line
              />
            </v-col>

            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">فیلدهای اجباری</span>
              </div>

              <v-autocomplete
                  v-model="form.requiredFiled"
                  density="compact"
                  variant="outlined"
                  single-line
                  :items="AllRequiredFiledList"
                  item-title="name"
                  item-value="id">
                <template v-slot:item="item">
                  <v-list-item>
                    <div class="d-flex justify-end">
                      <div class="text-right my-2 mt-5">
                        <span class="t12 w500">{{ item.item.title }}</span>
                      </div>
                      <v-checkbox
                          hide-details
                          :value="item.item.value"
                          v-model="form.requiredFiled"/>
                    </div>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">زیرموضوع ها</span>
              </div>
              <v-autocomplete
                  v-model="form.topic"
                  variant="outlined"
                  prepend-inner-icon-cb="mdi-map-marker"
                  rounded="lg"
                  :items="form.topic"
                  item-title="name"
                  item-value="value">
                <template v-slot:item="item">
                  <v-list-item>
                    <v-row justify="center">
                      <v-col cols="4">
                        <div
                            @click="removeItem(item.item.raw.id)"
                            class="d-flex justify-start align-center">
                          <v-icon color="error">mdi-trash-can-outline</v-icon>
                        </div>

                      </v-col>
                      <v-col cols="8">
                        <text-clamp
                            :text='item.item.raw.title'
                            :max-lines='1'
                            autoResize
                            location="start"
                            class="text-gray500 t14 w300 text-right" />
                      </v-col>
                    </v-row>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-form>

        <div class="d-flex justify-end position__absolute bottom left">
          <v-btn
              :loading="loading"
              @click="updateSubTitleTicket()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            تایید
          </v-btn>

          <v-btn
              @click="$router.go(-1)"
              variant="outlined"
              height="40"
              rounded
              class="px-8 mt-1 mr-5">
            <template v-slot:prepend>
              <v-icon>mdi-cancel</v-icon>
            </template>
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
import SubTitleTicket from "@/composables/SubTitleTicket";
import {openConfirm, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  name: "EditSubTitleTicket",

  components: {
    DashboardLayout,
    Header
  },

  props: {
    items: Object
  },

  setup() {
    const {getSubTitle, subTitleEdit} = SubTitleTicket()

    return {getSubTitle, subTitleEdit}
  },

  data() {
    return {
      form: {
        title: '',
        requiredFiled: [],
        topic:[],
      },
      removeTableItem: {
        text: "با حذف زیر موضوع دیگر به جزئیات آن دسترسی نخواهید داشت.\n" +
            "آیا از انجام این کار مطمئن هستید؟؟",
        title: "حذف آیتم",
        path: "ticket/topic/crud/delete/",
      },
      loading: false,
      AllRequiredFiledList:[
        {
          id:1,
          name:'شناسه کالا',
          value:'sku_id'
        },
        {
          id:2,
          name:'شماره سفارش',
          value:'order_number'
        },
        {
          id:3,
          name:'تصویر',
          value:'photo'
        }
      ],
    }
  },

  mounted() {
    this.getSubTitle()
  },

  methods: {
    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },

    setForm(){
      try {
        this.form.title = this.subTitleEdit.title
        this.form.requiredFiled = [...this.subTitleEdit.mandatory_fields]
        this.form.topic = this.subTitleEdit.children.map((child) => ({
          id: child.id,
          title: child.title,
        }))
      } catch (error) {}
    },

    async updateSubTitleTicket() {
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `ticket/topic/crud/update/${this.$route.params.id}`
      formData.append('title' , this.form.title)
      this.form.requiredFiled.forEach((item , index) => {
        formData.append(`mandatory_fields[${index}]`,  item)
      })

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        openToast(this.$store, 'ویرایش با موفقیت ذخیره شد.', "success");
        this.$router.push('/sub-title/index')
      }
      else{
        this.loading=false
      }
    },

  },

  watch: {
    subTitleEdit() {
      this.setForm()
    }
  },
}
</script>