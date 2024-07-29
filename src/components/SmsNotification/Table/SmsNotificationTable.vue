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
                class="text-center c-table__header__item t12500"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                {{head.name}}
            </div>
        </template>
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
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

              <div
                  v-if="item.phone_number && header[1].show"
                  class="c-table__contents__item justify-center"
                  :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        {{ item.phone_number }}
                    </span>
              </div>

                <div
                    v-if="item.user.first_name && header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        {{ item.user.first_name }} {{ item.user.last_name }}
                    </span>
                </div>

                <div
                    v-if="item.type && header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        {{convertStatus (item.type) }}
                    </span>
                </div>

                <div
                    v-if="item.message && header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        {{ item.message }}
                    </span>
                </div>

              <div
                    v-if=" header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                      {{item.user.created_at_fa}}
                      {{item.user.created_at.split('T')[1].split('.')[0]}}
                    </span>
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
import {isOdd} from '@/assets/js/functions'
export default {
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
        },


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
      convertStatus(status) {
        if (status === 'order_status') {
          return 'تغییر وضعیت سفارش'
        }
        else if (status === 'sms_automation') {
          return 'کمپین پیامکی'
        }
        else if (status === 'mass') {
          return 'ارسال گروهی'
        }
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
    }
}
</script>
