<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div
                v-if="head.show"
                class="text-center c-table__header__item t12 w500"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                {{head.name}}
            </div>
        </template>

      <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <v-menu :location="location">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>
        </v-menu>
      </div>
    </header>
    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

              <div
                  v-if="item.text && header[1].show"
                  class="c-table__contents__item justify-center"
                  :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.text }}
                    </span>
              </div>

              <div
                  v-if=" header[2].show"
                  class="c-table__contents__item justify-center"
                  :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-switch
                    v-model="isActive[index]"
                    inset
                    color="success"
                    @change="toggleActive(index,item)"/>
              </div>

              <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
                <v-menu :close-on-content-click="false" :location="location">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">
                      mdi-dots-vertical
                    </v-icon>
                  </template>

                  <v-list class="c-table__more-options">
                    <v-list-item>
                      <v-list-item-title>
                        <SmsSettingModal :smsSettingData="item" :id="item.id" @getSettingData="settingData"/>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
        </div>
        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="title4 text-black mb-5">لیست خالی!</span>
                <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {isOdd} from '@/assets/js/functions'
import {AxiosCall} from '@/assets/js/axios_call.js'
import SmsSettingModal from "@/components/SmsSetting/Modal/SmsSettingModal.vue";
export default {
  components: {SmsSettingModal},

  props: {
        header: [],
        items: [],
        model: '',
        height: {
            type: String,
            default: '500',
        },
        page: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 1
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

  data() {
    return {
      isActive:[]
    }
  },

  computed: {
    itemsWidth() {
      let headerLength = 0;
      if (this.header && this.header.length > 0) {
        this.header.forEach(element => {
          if (element.show == true) {
            headerLength++;
          }
        });
        const width = 100 / (headerLength + 1);
        return `${width}%`;
      }
      return 'auto';
    },
  },

  methods: {
    async toggleActive(index, item) {
      let formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'system/admin/sms/setting/crud/update/' + item.id
      if (this.isActive[index]) formdata.append('value', 1)
      else formdata.append('value', 0)
      formdata.append('text', item.text)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
    },

    settingData(va) {
      this.$emit('getSmsSetting', va)
    },

    rowIndexTable(index) {
      let rowIndex = 0
      if (this.page === 1) {
        rowIndex = (1 + index)
        return rowIndex
      } else {
        rowIndex = ((this.page - 1) * this.perPage) + index + 1
        return rowIndex
      }
    },

    oddIndex(index) {
      return isOdd(index)
    }
  },

  watch:{
    items(val){
      this.isActive =[]
      val.forEach(sms => {
        if (sms.value === '1') {
          this.isActive.push(true)
        }
        else this.isActive.push(false)
      })
    }
  }
}
</script>
