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
            @click="createOrdering(head.value, head.order)"
            class="text-center c-table__header__item t12 w500 text-black"
            :class="head.order == true ? 'pointer' : ''"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">

          {{head.name}}
        </div>
      </template>

      <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
        <v-icon v-bind="props">
          mdi-dots-vertical
        </v-icon>
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
              v-if=" header[1].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500">
                      <img width="100" height="28" class="br--4"  :src="item?.desktop_image?.image_url">
                    </span>
          </div>
          <div
              v-if=" header[2].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 text-center">
                        {{ item.link }}
                    </span>
          </div>
          <div
              v-if="header[3].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{ item.creator?.first_name }} {{ item.creator?.last_name }}
                    </span>
          </div>
          <div
              v-if=" header[4].show"
              class="c-table__contents__item justify-center"
              :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                   <v-switch inset color="success" @change="changeActive(index , item)" v-model="active[index]"></v-switch>

          </div>

          <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
            <v-menu :close-on-content-click="false" :location="location">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" class="text-gray500">
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list  class="c-table__more-options">
                <v-list-item>
                  <v-list-item-title>
                    <AddOccasionBannerModal type="edit" :banner="item"/>
                  </v-list-item-title>
                  <v-list-item-title>
                    <div class="ma-5 pr-7 pointer" @click="removeItem(item.id)">
                      <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            حذف
                                        </span>

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
          <span class="t18 w600 text-black mb-5">لیست خالی!</span>
          <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AxiosCall} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import ActivationModal from "@/components/Public/ActivationModal.vue";
import {openConfirm, isOdd} from "@/assets/js/functions";
import AddOccasionBannerModal from "@/components/OccasionBanner/Modal/AddOccasionBannerModal.vue";
export default {
  components: {
    AddOccasionBannerModal,
    ModalMassUpdate,
    ActivationModal
  },

  props: {
    /**
     * List Items for header
     */
    header: [],

    /**
     * List of items
     */
    items: [],

    /**
     * Model
     */
    model: '',

    /**
     * Height
     */
    height: {
      type: String,
      default: '500',
    },

    /**
     * Delete endpoint for change filter
     */
    deletePath: {
      type: String,
      default: ''
    },

    /**
     * Page on table
     */
    page: {
      type: Number,
      default: 1
    },

    /**
     * PerPage of data
     */
    perPage: {
      type: Number,
      default: 1
    },

    /**
     * Active loading
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Edit endpoint for change active
     */
    activePath: {
      type: String,
      default: ''
    },

  },

  data() {
    return {
      order_type: "desc",
      ordering: {},
      per_page: '25',
      filter: [],
      active: [],
      activeColumn: false,
    }
  },

  computed: {
    /**
     * Get each items table based of header length
     */
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

    /**
     * Check is_active is true or false for show in table
     */
    checkActive() {
      this.header.forEach(element => {
        if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == true) {
          this.activeColumn = true;
        } else if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == false) {
          this.activeColumn = false;
        }
      });
      return this.activeColumn;
    },
  },

  watch: {
    items(val) {
      this.active = []
      val.forEach(element => {
        var active = false
        if (element.is_active == 1) active = true
        this.active.push(active)

      });
    }
  },

  methods: {
    changeValue(index, value) {
      this.active[index] = value
    },
    /**
     * Mass update modal
     */
    massUpdateModal() {
      this.$store.commit('set_massUpdateModal', true)
    },

    /**
     * Get row index in table
     * @param {*} index
     */
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


    /**
     * Get icon
     * @param {*} column
     */
    getIcon(column) {
      return this.ordering[column] ? 'mdi-sort-descending' : 'mdi-sort-ascending';
    },


    /**
     * Change Active
     * @param {*} index
     * @param {*} item
     */
    async changeActive(index, item) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = this.activePath + item.id
      if (this.active[index]) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
    },

    /**
     * Return odd index
     * @param {*} index
     */
    oddIndex(index) {
      return isOdd(index)
    },

    /**
     * Remove Item
     * @param {*} id
     */
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
    },
  },
}
</script>
