<template>
  <div class="text-center c-modal-table-filter">
    <v-btn
        @click="openModal()"
        variant="outlined"
        rounded
        class="px-3 mt-1 mr-4">
      <template v-slot:prepend>
        <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
      </template>
      فیلتر
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="1000">
      <v-card>
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    فیلتر پیشرفته
                </span>

          <v-btn
              class="modal__header__btn"
              @click="closeModal()"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div>
          <v-row
              justify="start"
              align="center"
              class="px-10 d--rtl">
            <template v-for="(filter, index) in filterField" :key="index">
              <v-col v-if="filter.type === 'text' " cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    hide-details
                    v-model="values[index].value" />
              </v-col>



              <v-col v-if="filter.type === 'select'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>


                <v-select
                    v-if="filter.value ==='sending_method'"
                    density="compact"
                    variant="outlined"
                    multiple
                    hide-details
                    :items="sendingMethods"
                    v-model="sendingItem" />
                <v-select
                    v-if="filter.value ==='is_active'"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    item-title="label"
                    item-value="value"
                    :items="activeFilter"
                    v-model="activeModel" />
              </v-col>

              <v-col
                  cols="4"
                  v-else-if=" filter.value === 'submit_date'"
                  class="mt-3">
                <div class="t13300 text-right mb-3">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      variant="outlined" />

                  <v-icon>mdi-close</v-icon>
                </div>
              </v-col>

              <v-col cols="4" v-else-if=" filter.type === 'date' ">
                <div class="t13300 text-right mb-3">{{filter.name}}</div>
                <div align="center" class="d-flex pb-5 align-center" v-if=" filter.value === 'start_time' ">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="start_time"
                      variant="outlined" />

                </div>
                <div align="center" class="d-flex pb-5 align-center" v-else-if=" filter.value === 'end_time' ">
                  <date-picker
                      range
                      clearable
                      class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                      format="jYYYY-jMM-jDD"
                      display-format="jYYYY-jMM-jDD"
                      v-model="end_time"
                      variant="outlined" />

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
            class="px-5 py-5">
          <v-col cols="6">
            <v-btn
                @click="removeAllFilters()"
                variant="text"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              حذف همه فیلترها
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="text-right">
              <v-btn
                  @click="setFilter()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5">
                اعمال تغییرات
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  PanelFilter
} from '@/assets/js/filter_free_delivery.js'
import {convertDateToGregorian} from "@/assets/js/functions";

export default {
  props: {
    filterField: [],
    path: null,
  },

  data() {
    return {
      dialog: false,
      values: [],
      activeModel: '',
      activeFilter: [{
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
      sendingMethods: [
        {
          title: ' نفیس اکسپرس',
          value: 'nafis'
        },

        {
          title: 'تیپاکس',
          value: 'tipax'
        },
        {
          title: 'پست پیشتاز ',
          value: 'pishtaz'
        },
        {
          title: 'پست ',
          value: 'post'
        },

      ],
      sendingItem: null,
      start_time:[],
      end_time:[],
    }
  },

  computed: {
    name() {
      try {
        const idObject = this.values.find(element => element.name === 'name');
        return idObject.value
      } catch (error) {
        return ''
      }
    },

    start_time_from() {
      try {
        const gregorianDate = convertDateToGregorian( this.start_time[0] , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },
    start_time_to() {
      try {
        const gregorianDate = convertDateToGregorian( this.start_time[1] , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },
    end_time_to() {
      try {
        const gregorianDate = convertDateToGregorian( this.end_time[1] , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },
    end_time_from() {
      try {
        const gregorianDate = convertDateToGregorian( this.end_time[0] , '-' , false)
        return gregorianDate
      } catch (error) {
        return ''
      }
    },

  },

  methods: {

    setFilter() {
      const filter = new PanelFilter()

      if (this.name) {
        filter.name = this.name
      } else if (this.$route.query.name) {
        filter.name = null
      }

      if (this.sendingItem) {
        filter.sending_method = this.sendingItem
      } else if (this.$route.query.sending_method) {
        filter.sending_method = null
      }
      if(this.start_time_to) {
        filter.start_time_to = this.start_time_to
      } else if (this.$route.query.start_time_to) {
        filter.start_time_to = null
      }
      if(this.start_time_from) {
        filter.start_time_from = this.start_time_from
      } else if (this.$route.query.start_time_from) {
        filter.start_time_from = null
      }

      if(this.end_time_to) {
        filter.end_time_to = this.end_time_to
      } else if (this.$route.query.end_time_to) {
        filter.end_time_to = null
      }

      if(this.end_time_from) {
        filter.end_time_from = this.end_time_from
      } else if (this.$route.query.end_time_from) {
        filter.end_time_from = null
      }

      if (this.activeModel === '') {
        filter.active = null
      } else if (this.activeModel !== '') {
        filter.active = this.activeModel
      } else if (this.$route.query.is_active) {
        filter.active = this.$route.query.is_active
      }

      filter.page = 1;

      if (this.$route.query.per_page) {
        filter.per_page = this.$route.query.per_page;
      }

      this.$router.push('/' + this.path + '/' + filter.query_maker());
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];
      this.statusModel = null;
      this.typeModel = null;
      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: 'null'
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
    },
  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)
    });


  }
}
</script>
