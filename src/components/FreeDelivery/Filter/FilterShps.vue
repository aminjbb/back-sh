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
} from '@/assets/js/filter_free_delivery_Shps.js'
import FreeDelivery from "@/composables/FreeDelivery.js";


export default {
  props: {
    filterField: [],
    path: null,
  },

  data() {
    return {
      dialog: false,
      values: [],

    }
  },
  setup() {
    const {
      header,
      loading,
      filterFieldCustomer

    } = FreeDelivery()
    return {
      header,
      loading,
      filterFieldCustomer

    }
  },

  computed: {
    id() {
      try {
        const idObject = this.values.find(element => element.name === 'id');
        return idObject.value
      } catch (error) {
        return ''
      }
    },

    first_name() {
      try {
        const idObject = this.values.find(element => element.name === 'first_name');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    last_name() {
      try {
        const idObject = this.values.find(element => element.name === 'last_name');
        return idObject.value
      } catch (error) {
        return ''
      }
    },
    phone_number() {
      try {
        const idObject = this.values.find(element => element.name === 'phone_number');
        return idObject.value
      } catch (error) {
        return ''
      }
    },

  },

  methods: {

    setFilter() {
      const filter = new PanelFilter()

      if (this.id) {
        filter.id = this.id
      } else if (this.$route.query.id) {
        filter.id = null
      }

      if (this.first_name) {
        filter.first_name = this.first_name
      } else if (this.$route.query.first_name) {
        filter.first_name = null
      }
      if(this.last_name) {
        filter.last_name = this.last_name
      } else if (this.$route.query.last_name) {
        filter.last_name = null
      }
      if(this.phone_number) {
        filter.phone_number = this.phone_number
      } else if (this.$route.query.phone_number) {
        filter.phone_number = null
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
