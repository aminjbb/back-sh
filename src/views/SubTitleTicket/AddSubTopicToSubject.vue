<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="">
        <v-card class="ma-5 br-12 py-10 position__relative" height="300">
          <div class="text-center t14500 pb-5">افزودن زیر موضوع</div>
          <v-divider/>

          <v-form ref="addForm" v-model="valid">
            <v-row class=" mr-16" justify="center" align="center">
              <v-col cols="12" md="12">
                <div class="text-right my-5">
                  <span class="t12400">عنوان موضوع :</span>
                  <span class="t12400 mr-2">{{ subTitleEdit?.title }}</span>
                </div>
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">عنوان زیرموضوع</span>
                  <span class="text-error mr-1">*</span>
                </div>
                <v-text-field
                    v-model="form.title"
                    density="compact"
                    variant="outlined"
                    single-line
                />
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">فیلدهای اجباری</span>
                </div>

                <v-autocomplete
                    :disabled="!subTitleEdit"
                    v-model="inputData"
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="AllRequiredFiledList"
                    item-title="name"
                    item-value="id">
                  <template v-slot:item="item">
                    <v-list-item>
                      <div class="d-flex justify-end" @click="assignDataInput(item.item)">
                        <div class="text-right my-2 mt-5">
                          <span class="t12 w500">{{ item.item.raw.name }}</span>
                        </div>
                        <v-checkbox
                            :disabled="checkDisabledItem(item.item.raw.value)"
                            hide-details
                            :value="item.item.raw.value"
                            v-model="form.requiredFiled"/>
                      </div>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="2" class="mt-14">
                <v-btn
                    :loading="loading"
                    @click="validate()"
                    color="primary500"
                    rounded>
                  ذخیره
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="300">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="`ticket/topic/crud/update/activation/`">
            <template v-slot:customSlot="item">
              <div class="d-flex justify-center align-center">
                <div
                    v-for="(field, fieldIndex) in item.data.custom"
                    :key="fieldIndex"
                    class="rounded bg-gray200 t14400 px-2 py-1 mx-1">{{ translateMandatoryFields(field) }}</div>
              </div>
            </template>
          </ShTable>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const ShTable = defineAsyncComponent(()=> import('@/components/Components/Table/sh-table.vue'))
import SubTitleTicket from "@/composables/SubTitleTicket";
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  name: "AddSubTopicToSubject",

  components: {
    DashboardLayout,
    Header,
    ShTable
  },

  setup() {
    const {
      getSubTitle,
      subTitleEdit,
      page,
      pageLength,
      dataTableLength
    } = SubTitleTicket()

    return {
      getSubTitle,
      subTitleEdit,
      page,
      pageLength,
      dataTableLength
    }
  },

  data() {
    return {
      valid: false,
      loading: false,
      topicList: [],
      itemListTable:[],
      inputData:[],
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
      form: {
        title: '',
        requiredFiled: []
      },
      header: [
        { name: 'ردیف', title: 'ردیف', show: true, align:'center', sortable: false, key: 'row'},
        { name: 'عنوان زیر موضوع', title: 'عنوان زیر موضوع', show: true, align:'center',sortable: false, key: 'title'},
        { name: 'تاریخ ایجاد', title: 'تاریخ ایجاد', show: true, align:'center', sortable: false, key: 'created_at'},
        { name: 'تاریخ به روزرسانی', title: 'تاریخ به روزرسانی', show: true, align:'center', sortable: false, key: 'updated_at'},
        { name: 'فیلد های اجباری', title: 'فیلد های اجباری', show: true, align:'center',sortable: false, key: 'custom'},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center'},
      ]
    }
  },

  mounted() {
    this.getSubTitle()
  },

  methods: {
    checkDisabledItem(value){
      const findItem = this.subTitleEdit.mandatory_fields.findIndex(element => element == value)
      if (findItem >-1) return true
      return false
    },
    assignDataInput(item) {
      const findItem = this.inputData.findIndex(element => element == item?.props.title)
      if (findItem === -1) this.inputData.push(item.title)
      else {

        const findItemFromServer = this.subTitleEdit.mandatory_fields.findIndex(element => element == item?.raw.value)
        if (findItemFromServer == -1) this.inputData.splice(findItem , 1)
      }

    },

    translateMandatoryFields(text) {
      if (text==='photo') return 'تصویر'
      else if (text==='sku_id') return 'شناسه کالا'
      else if (text==='order_number') return 'شماره سفارش'
    },

    validate() {
      if (this.form.title === '') {
        openToast( this.$store, '.عنوان موضوع را وارد کنید', "error")
      } else {
        this.addTopicToSubject()
      }
    },

    async addTopicToSubject() {
      this.loading = true;
      let formData = new FormData();
      const AxiosMethod = new AxiosCall();
      AxiosMethod.end_point = 'ticket/topic/crud/create';
      formData.append('title', this.form.title);
      formData.append('parent_id', this.$route.params.id);

      this.form.requiredFiled.forEach((item , index) => {
        formData.append(`mandatory_fields[${index}]`,  item)
      })

      AxiosMethod.form = formData;
      AxiosMethod.store = this.$store;
      AxiosMethod.toast_error = true;
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken');
      try {
        let response = await AxiosMethod.axios_post()
        if (response && response.data) {
          openToast(this.$store, 'زیر موضوع با موفقیت ایجاد شد.', "success");
          this.getSubTitle()

          this.form.title =''
          this.inputData = []
          this.form.requiredFiled = []

          this.loading= false
        }
      } catch (error) {
        this.loading= false
      }
    },

    setForm() {
      try {
        if (this.subTitleEdit.mandatory_fields.length){
          this.subTitleEdit.mandatory_fields.forEach(element=>{
            const findItem = this.AllRequiredFiledList.findIndex(item=> item.value == element)
            if (findItem > -1) {
              this.form.requiredFiled.push( this.AllRequiredFiledList[findItem].value)
              this.inputData.push(this.AllRequiredFiledList[findItem].name)
            }
          })
        }
      } catch (e) {}
    }
  },

  watch:{
    subTitleEdit() {
      this.setForm()

      this.itemListTable = []
      this.subTitleEdit.children.forEach((item) => {
        this.itemListTable.push(
            {
              id: item.id,
              title: item.title,
              custom: item.mandatory_fields,
              created_at:  item.created_at_fa + ' ' +item.created_at.split('T')[1].split('.')[0],
              updated_at:  item.updated_at_fa + ' ' +item.updated_at.split('T')[1].split('.')[0],
              is_active: item.is_active,
              is_active_id: item.id,
            }
        )
      })
    },
  }
}
</script>