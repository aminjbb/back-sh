<template lang="">
    <div class="text-center c-modal-table-filter">
        <v-btn 
          @click="openModal()" 
          variant="outlined" 
          rounded 
          class="px-3 mt-1 mr-4"
        >
            <template v-slot:prepend>
              <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
            </template>
            فیلتر
        </v-btn>

        <v-dialog
            v-if="dialog"
            v-model="dialog"
            width="1000"
        >
            <v-card>
                <v-row 
                  justify="center" 
                  align="center" 
                  class="pa-5"
                >
                    <v-col cols="5">
                        <v-btn @click="closeModal()" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>

                    <v-col cols="7">
                        <div class="text-left pl-10">
                            <span class="t14300">
                                فیلتر
                            </span>
                        </div>
                    </v-col>
                </v-row>

                <div class="mt-3 mb-8 px-5">
                    <v-divider />
                </div>

                <div>
                    <v-row 
                      justify="center" 
                      align="center" 
                      class="px-10 d--rtl"
                    >
                        <template 
                          v-for="(filter, index) in filterField" 
                          :key="index"
                        >
                            <v-col 
                              v-if="filter.type === 'text'"
                              cols="4" 
                            >
                                <v-text-field 
                                    variant="outlined" 
                                    :placeholder="filter.name"
                                    :name="filter.value "
                                    v-model="values[index].value"
                                />
                            </v-col>

                            <v-col 
                              v-else-if="filter.type === 'select'"
                              cols="4" 
                            >
                                <v-select
                                    v-if="path === 'color/index' || path === 'product/index' ||path === 'categories/index' || path === 'brand/index'"
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    item-title="label"
                                    item-value="value"
                                    :items="activeFilter"
                                    v-model="activeModel"
                                />

                              <v-select
                                  v-if="path === 'attributes/index'"
                                  density="compact"
                                  variant="outlined"
                                  single-line
                                  item-title="label"
                                  item-value="value"
                                  :items="typeFilter"
                                  v-model="typeModel"
                              />

                              <template v-if="path === 'ticket/index'">
                                <v-select
                                  v-if="filter.value == 'status'"
                                  density="compact"
                                  variant="outlined"
                                  single-line
                                  item-title="label"
                                  item-value="value"
                                  :items="statusList"
                                  v-model="statusModel"
                                />
                                <v-select
                                  v-if="filter.value == 'priority'"
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    item-title="label"
                                    item-value="value"
                                    :items="priorityList"
                                    v-model="priorityModel"
                                />
                              </template>
                            </v-col>

                            <v-col cols="4" v-else-if="(path === 'color/index' || path === 'brand/index'|| path === 'attributes/index'
                             ||path === 'categories/index' || path === 'product/index') && filter.type === 'date' && filter.value === 'created_at'" class="mt-3">
                              <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                    range
                                    clearable
                                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                    format="jYYYY-jMM-jDD"
                                    display-format="jYYYY-jMM-jDD"
                                    v-model="createdAtModel"
                                    variant="outlined"
                                    :placeholder="filter.name"
                                />
                                
                                <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
                              </div>
                            </v-col>

                            <v-col cols="4" v-else-if="(path === 'color/index'||  path === 'brand/index' ||path === 'categories/index'
                            || path=== 'attributes/index' || path === 'product/index' ) && filter.type === 'date' && filter.value === 'updated_at'" class="mt-3">
                              <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                  range
                                  class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                  format="jYYYY-jMM-jDD"
                                  display-format="jYYYY-jMM-jDD"
                                  v-model="updatedAtModel"
                                  variant="outlined"
                                  :placeholder="filter.name"
                                />

                                <v-icon @click="updatedAtModel= [] ;gregorianUpdateDate =[]">mdi-close</v-icon>
                              </div>
                            </v-col>
                        </template>
                    </v-row>
                </div>

                <div class="mt-3 mb-5 px-5">
                    <v-divider />
                </div>

                <v-row 
                  justify="center" 
                  align="center" 
                  class="px-5 py-5"
                >
                    <v-col cols="6">
                        <v-btn 
                          @click="removeAllFilters()" 
                          variant="text" height="40" 
                          rounded 
                          class="px-5 mt-1 mr-5"
                        >
                            حذف همه فیلترها
                        </v-btn>
                    </v-col>

                    <v-col cols="6">
                        <div class="text-right" >
                          <v-btn 
                            @click="setFilter()"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5"
                          >
                            مشاهده
                          </v-btn>
                      </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>

import { PanelFilter } from '@/assets/js/filter.js'
import { jalaliToGregorian } from '@/assets/js/functions'
import value from "@/composables/Export";
export default {
  props: {
    filterField: [],
    path: ''
  },

  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      originalData: [],
      filteredData: [],
      activeFilter: [
        {
          label: 'همه',
          value: '',
        },
        {
          label: 'فعال',
          value: '1',
        },
        {
          label: 'غیرفعال',
          value: '0',
        }
      ],
      typeFilter: [
        {
          label: 'همه',
          value: '',
        },
        {
          label: 'عنوان',
          value: 'title',
        },
        {
          label: 'متن',
          value: 'description',
        }
      ],
      statusList: [
        {
          label: 'همه وضعیت‌ها',
          value: ''
        },
        {
          label: 'باز',
          value: 'open'
        },
        {
          label: 'پاسخ داده شده',
          value: 'answered'
        },
        {
          label: 'بسته شده',
          value: 'resolved'
        },
        {
          label: 'متوقف شده',
          value: 'postponed'
        },
        {
          label: 'دیده شده',
          value: 'seen'
        }
      ],
      priorityList:[
        {
          label: 'همه اولیوت‌ها',
          value: ''
        },
        {
          label: 'ضروری',
          value: 'urgent'
        },
        {
          label: 'پایین',
          value: 'low'
        },
        {
          label: 'بالا',
          value: 'high'
        },
        {
          label: 'متوسط',
          value: 'medium'
        }
      ],
      typeModel: '',
      statusModel: '',
      priorityModel: '',
      activeModel: '',
      createdAtModel: null,
      updatedAtModel: null,
      gregorianCreateDate: [],
      gregorianUpdateDate: []
    }
  },

  computed: {
    name() {
      try {
        const nameObject = this.values.find(element => element.name === 'name');
        return nameObject.value
      } catch (error) {
        return ''
      }
    },

    label() {
      try {
        const labelObject = this.values.find(element => element.name === 'label');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

    id() {
      try {
        const idObject = this.values.find(element => element.name === 'id');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    group() {
      try {
        const groupObject = this.values.find(element => element.name === 'group');
        return groupObject.value
      } catch (error) {
        return ''
      }
    },

    createdAt() {
      if (this.createdAtModel) {
        if (this.createdAtModel[0] && !this.createdAtModel[1]) {
          const splitDate = this.createdAtModel[0].split('-')
          this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          this.gregorianCreateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
        }

        else if (this.createdAtModel[0] && this.createdAtModel[1]) {
          const splitDate = this.createdAtModel[0].split('-')
          const splitDateUp = this.createdAtModel[1].split('-')
          this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
        }
      }
      return this.gregorianCreateDate;
    },

    updatedAt() {
      if (this.updatedAtModel) {
        if (this.updatedAtModel[0] && !this.updatedAtModel[1]) {
          const splitDate = this.updatedAtModel[0].split('-')
          this.gregorianUpdateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          this.gregorianUpdateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
        }

        else if (this.updatedAtModel[0] && this.updatedAtModel[1]) {
          const splitDate = this.updatedAtModel[0].split('-')
          const splitDateUp = this.updatedAtModel[1].split('-')
          this.gregorianUpdateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
          this.gregorianUpdateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
        }
      }
      return this.gregorianUpdateDate;
    },

    title() {
      try {
        const titleObject = this.values.find(element => element.name === 'title');
        return titleObject.value
      } catch (error) {
        return ''
      }
    },

    code() {
      try {
        const codeObject = this.values.find(element => element.name === 'code');
        return codeObject.value
      } catch (error) {
        return ''
      }
    },

  },

  methods: {
    value,

    setFilter() {

      const filter = new PanelFilter()
      if (this.name) {
        filter.name = this.name
      }
      else {
        filter.name = null
      }

      if (this.label) {
        filter.label = this.label
      }
      else if (this.$route.query.label) {
        filter.label = null
      }

      if (this.group) {
        filter.group = this.group
      }
      else {
        filter.group = null
      }

      if (this.activeModel === '') {
        filter.active = null
      }
      else if (this.activeModel !== '') {
        filter.active = this.activeModel
      }
      else if (this.$route.query.is_active) {
        filter.active = this.$route.query.is_active
      }

      if (this.createdAt[0]) {
        filter.created_at_from_date = this.createdAt[0]
      }
      else {
        filter.created_at_from_date = null
      }

      if (this.createdAt[1]) {
        filter.created_at_to_date = this.createdAt[1]
      }
      else {
        filter.created_at_to_date = null
      }

      if (this.updatedAt[0]) {
        filter.updated_at_from_date = this.updatedAt[0]
      }
      else {
        filter.updated_at_from_date = null
      }

      if (this.updatedAt[1]) {
        filter.updated_at_to_date = this.updatedAt[1]
      }
      else {
        filter.updated_at_to_date = null
      }

      if (this.typeModel === '') {
        filter.type = ''
      }
      else if (this.typeModel) {
        filter.type = this.typeModel
      }
      else {
        filter.type = null
      }

      if (this.statusModel) {
        filter.status = this.statusModel
      }
      else {
        filter.status = null
      }

      if (this.priorityModel) {
        filter.priority = this.priorityModel
      }
      else {
        filter.priority = null
      }

      if (this.code) {
        filter.code = this.code
      }
      else {
        filter.code = null
      }

      if (this.title) {
        filter.title = this.title
      }
      else {
        filter.title = null
      }

      filter.page = 1;
      if(this.$route.query.per_page){
        filter.per_page = this.$route.query.per_page;
      }
      this.$router.push('/' + this.path + '/' + filter.query_maker());
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];

      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: ''
        }

        this.values.push(form)
        this.dialog = false;
      })
    },

    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    }
  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    })
  }
}
</script>