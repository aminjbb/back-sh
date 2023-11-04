<template>
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

        </v-col>

        <v-col cols="4"  class="mt-3"   v-else-if="filter.type === 'date'">
          <div align="center" class="d-flex pb-5 align-center">
            <date-picker
                range
                clearable
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                format="jYYYY-jMM-jDD"
                display-format="jYYYY-jMM-jDD"
                v-model="createdAtModel"
                variant="outlined"
                :placeholder="filter.name"
            />

            <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
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

import {UserPanelFilter} from "@/assets/js/filter_user";
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

    }
  },

  computed: {
    firstName() {
      try {
        const nameObject = this.values.find(element => element.name === 'first_name');
        return nameObject.value
      } catch (error) {
        return ''
      }
    },

    lastName() {
      try {
        const labelObject = this.values.find(element => element.name === 'last_name');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

    phoneNumber() {
      try {
        const idObject = this.values.find(element => element.name === 'phone_number');
        return idObject.value
      } catch (error) {
        return ''
      }
    },


  },

  methods: {
    value,

    setFilter() {

      const filter = new UserPanelFilter()
      if (this.firstName) {
        filter.firstName = this.firstName
      }
      else {
        filter.firstName = null
      }

      if (this.lastName) {
        filter.lastName = this.lastName
      }
      else {
        filter.lastName = null
      }

      if (this.phoneNumber) {
        filter.phoneNumber = this.phoneNumber
      }
      else {
        filter.phoneNumber = null
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