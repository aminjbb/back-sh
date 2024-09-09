<template>
  <div
      :class="variant == 'outlined' ? 'table-outlined': ''"
      :style="{height: height}"
      class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading"/>

    <header class="c-table__header d-flex justify-between">
      <template v-for="(head, index) in header">
        <template v-if="head.value">
          <div
              v-if="head.show"
              @click="createOrdering(head.value, head.order)"
              class="text-center c-table__header__item t11500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true"/>
            {{ head.name }}
          </div>
        </template>
        <template v-else>
          <div
              v-if="head.show"
              class="text-center c-table__header__item t11500"
              :class="head.order == true ? 'pointer' : ''"
              :key="index"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-if="head.order == true"/>
            {{ head.name }}
          </div>
        </template>
      </template>
      <div
          class="c-table__header__item"
          :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <v-menu :location="location">
          <template v-slot:activator="{ props }">
            <span v-bind="props">عملیات</span>
          </template>
        </v-menu>
      </div>
    </header>
    <div class="stretch-table">
      <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
        <div
            v-for="(item , index) in items"
            :key="index"
            class="d-flex justify-between"
            :class="getBackground(item)">
          <div
              class="c-table__contents__item"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center">
              <span class="t14300 text-gray500 py-5 number-font">{{ rowIndexTable(index) }}</span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
              <span class="t14300 text-gray500 py-5 number-font">{{ item.old_barcode }}</span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
              <span class="t14300 text-gray500 py-5 number-font">{{ item.new_barcode }}</span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
              <span class="t14300 text-gray500 py-5 number-font">{{ item.new_sending_method }}</span>
            </div>
          </div>
          <div
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <div class="d-flex align-center ">
              <span class="t14300 text-gray500 py-5 number-font">{{ item.last_mod }}</span>
            </div>
          </div>

          <div
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
              class="c-table__contents__item">
            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>
                    <SingleEditModal :deliveryItem="item"/>
                  </v-list-item-title>

                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <div class="ma-5 pointer" @click="removeItem(index)">
                      <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14300">حذف</span>
                    </div>
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
          <span class="t14300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const SingleEditModal = defineAsyncComponent(() => import ('@/components/DeliveryCode/Modal/SingleEditModal.vue'))

export default {
  components: {
    SingleEditModal
  },

  props: {
    header: [],
    items: [],

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

  data(){
    return {
      statuses:[]
    }
  },

  computed: {
    itemsWidth () {
      let headerLength = 0;
      if (this.header && this.header.length > 0) {
        this.header.forEach(element => {
          if (element.show == true) {
            headerLength++;
          }
        });
        const width = 100 / (headerLength + 1);
        return `${ width }%`;
      }
      return 'auto';
    },
  },

  methods: {
    getBackground(item){
      if (item.badge == 'urgent') return 'bg-primary400'
      return ''
    },
    rowIndexTable (index) {
      let rowIndex = 0
      if (this.page === 1) {
        rowIndex = (1 + index)
        return rowIndex
      } else {
        rowIndex = ((this.page - 1) * this.perPage) + index + 1
        return rowIndex
      }
    },

    removeItem (index) {
      this.$emit('remove', index)
    },

    changeStatus(index , text){
      this.statuses[index] = text
    }
  }
}
</script>
